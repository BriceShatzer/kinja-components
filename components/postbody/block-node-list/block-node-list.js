// @flow
import * as React from 'react';
import renderContainer from './renderContainer';
import isEqual from 'lodash/isEqual';
import head from 'lodash/head';
import tail from 'lodash/tail';
import some from 'lodash/some';
import packBy from './packBy';
import { EnsureDefaultTheme } from '../../theme';
import shortid from 'shortid';
import { withKinjaMeta } from '../../hoc/context';
import { withLogger } from '../../hoc/logging-provider';
import getContainers from 'postbody/utils/getContainers';
import Paragraph from 'postbody/blockNodes/Paragraph';
import Header from 'postbody/blockNodes/Header';
import HorizontalRule from 'postbody/blockNodes/HorizontalRule';
import { insertStandardPermalinkAds } from 'postbody/ads/standard-permalink-ads';
import { insertFeaturedPermalinkAds } from 'postbody/ads/featured-permalink-ads';
import { insertStandardAmpPermalinkAds } from 'postbody/ads/amp-standard-permalink-ads';
import { insertFeaturedAmpPermalinkAds } from 'postbody/ads/amp-featured-permalink-ads';
import { insertVideoAmpPermalinkAds } from 'postbody/ads/amp-video-permalink-ads';

import type AdSlotNode from 'postbody/ads/AdSlotNode';
import type { BlockNode } from 'postbody/BlockNode';
import type { ContainerNode } from 'postbody/ContainerNode';
import type { KinjaMeta, KinjaMetaInjectedProps } from '../../hoc/context';
import type { Logger, LoggerInjectedProps } from '../../hoc/logging-provider';
import type { AdSettings} from 'kinja-magma/models/Post';

export type PostBodyNode = BlockNode | AdSlotNode;

export type NodeRendererFunction = (node: PostBodyNode, index: number, kinjaMeta: KinjaMeta, logger: Logger) => React$Node;

type BlockNodeListProps = KinjaMetaInjectedProps & LoggerInjectedProps & {
	nodes: Array<BlockNode>,
	renderNode: NodeRendererFunction,
	adSettings?: ?AdSettings,
	shiftNodes?: boolean
};

function applyContainers(
	nodes: Array<PostBodyNode>,
	renderNode: NodeRendererFunction,
	kinjaMeta: KinjaMeta,
	logger: Logger
): React$Node {
	// Pack nodes by their first containers
	const packed = packBy(nodes, (a: PostBodyNode, b: PostBodyNode) => isEqual(head(getContainers(a) || []), head(getContainers(b) || [])));
	return (
		<React.Fragment>
			{
				packed.map(pack => {
					// Render the container, it's contents being either the rendered nodes themselves,
					// or if there are more containers on some of the nodes, the recursive call to the same function
					const someNodesHaveMoreContainers = some(pack, c => {
						const containers = getContainers(c);
						return containers && containers.length > 1;
					});
					if (someNodesHaveMoreContainers) {
						return renderWithContainer(
							applyContainers(pack.map(node => shiftContainers(node)), renderNode, kinjaMeta, logger),
							head(getContainers(pack[0]))
						);
					}
					return renderWithContainer(
						pack.map((node, index) => renderNode(node, index, kinjaMeta, logger)),
						head(getContainers(pack[0]))
					);
				})
			}
		</React.Fragment>
	);
}

/**
 * Returns a non-mutated copy of a blocknode where we remove the first of its containers
 */
function shiftContainers(node: PostBodyNode): PostBodyNode {
	switch (node.type) {
		case 'Paragraph':
			return new Paragraph(node.value, tail(node.containers));
		case 'Header':
			return new Header({
				...node,
				containers: tail(node.containers)
			});
		case 'HorizontalRule':
			return new HorizontalRule(node.style, tail(node.containers));
		default:
			return node;
	}
}

/**
 * Wrap React nodes in a container
 */
function renderWithContainer(
	nodes: React$Node,
	container: ContainerNode
): React$Node {
	if (!container) {
		return React.Children.map(nodes, node => node && React.cloneElement(node, { key: shortid.generate()}));
	}
	const containerFunction = renderContainer(container, shortid.generate());
	return containerFunction({
		children: nodes
	});
}

/**
 * A component that renders a list of BlockNodes including resolving their containers
 */
const BlockNodeList = (props: BlockNodeListProps) => {
	const { nodes, renderNode, kinjaMeta, logger } = props;

	// spread nodes to new array to cast to Array<PostBodyNode>
	return (
		<EnsureDefaultTheme>
			{applyContainers([...nodes], renderNode, kinjaMeta, logger)}
		</EnsureDefaultTheme>
	);
};

const PostBodyBlockNodeList = (props: BlockNodeListProps) => {
	const {
		nodes,
		renderNode,
		kinjaMeta,
		adSettings,
		shiftNodes,
		logger
	} = props;
	const {
		postIsFeatured,
		adZone,
		features
	} = kinjaMeta;

	const nodesWithAds = postIsFeatured
		? insertFeaturedPermalinkAds({
			nodes,
			adZone,
			adSettings,
			features: features || {}
		})
		// NOTE: currently handles standard and video permalinks
		: insertStandardPermalinkAds({
			body: nodes,
			isFeatured: Boolean(postIsFeatured),
			adZone,
			shiftNodes,
			features: features || {}
		});

	return (
		<EnsureDefaultTheme>
			{applyContainers(nodesWithAds, renderNode, kinjaMeta, logger)}
		</EnsureDefaultTheme>
	);
};

const AmpPostBodyBlockNodeList = (props: BlockNodeListProps) => {
	const {
		nodes,
		renderNode,
		kinjaMeta,
		adSettings,
		shiftNodes,
		logger
	} = props;
	const {
		postIsFeatured,
		postIsVideo,
		postIsSlideshow,
		adZone,
		features
	} = kinjaMeta;

	const nodesWithAds = (() => {
		if (postIsFeatured) {
			return insertFeaturedAmpPermalinkAds({
				nodes,
				adZone,
				adSettings,
				shiftNodes,
				features: features || {}
			});
		} else if (postIsSlideshow) {
			// lets be explicit here. no need for separate slideshow rendering FOR NOW but WHO KNOWS
			return insertStandardAmpPermalinkAds({
				body: nodes,
				isFeatured: Boolean(postIsFeatured),
				adZone,
				adSettings,
				shiftNodes,
				features: features || {}
			});
		} else if (postIsVideo) {
			return insertVideoAmpPermalinkAds({
				body: nodes,
				isFeatured: Boolean(postIsFeatured),
				adZone,
				adSettings,
				shiftNodes,
				features: features || {}
			});
		} else {
			return insertStandardAmpPermalinkAds({
				body: nodes,
				isFeatured: Boolean(postIsFeatured),
				adZone,
				adSettings,
				shiftNodes,
				features: features || {}
			});
		}
	})();

	return (
		<EnsureDefaultTheme>
			{applyContainers(nodesWithAds, renderNode, kinjaMeta, logger)}
		</EnsureDefaultTheme>
	);
};

export const BlockNodeListWithAds = withLogger(withKinjaMeta(PostBodyBlockNodeList));
export const AmpBlockNodeListWithAds = withLogger(withKinjaMeta(AmpPostBodyBlockNodeList));

export default withLogger(withKinjaMeta(BlockNodeList));
