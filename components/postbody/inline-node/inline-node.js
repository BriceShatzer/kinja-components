// @flow

import * as React from 'react';
import styled from 'styled-components';

import { mainBlogNames } from '../../../config/consts';
import { EnsureDefaultTheme } from '../../theme';
import Link from '../../elements/link';
import { INLINENODE, validateLinkTarget, LinkNodeWithAnalytics, TextNode } from 'postbody/InlineNode';
import type { InlineNode, ValidLinkTaget } from 'postbody/InlineNode';
import type { KinjaMetaInjectedProps } from '../../hoc/context';
import { withKinjaMeta, withPlatform } from '../../hoc/context';
import styleToNodeName from './styleToNodeName';
import { filterXssUrl, unexpectedCase } from '../../../utils';
import {
	AmazonCommerceLink,
	isAmazonUri,
	isGmgBlogByBlogObject,
	getAmazonData
} from 'postbody/CommerceUtils';
import shortid from 'shortid';

type InlineNodesProps = KinjaMetaInjectedProps & {
	nodes: $ReadOnlyArray<InlineNode>,
	// Specifies the type of renderer, e.g. editor, web
	renderer?: string,
	events?: Array<Array<?string | { [key: string]: mixed }>>,
	platform: string
};

type TextNodeValues = {
	value: string,
	styles: Array<string>
};

export const Anchor = styled(Link)`
	color: ${props => props.theme.color.bodytext};
	transition: color ${props => props.theme.linkTransition};
	box-shadow: inset 0 -2px 0 ${props => props.theme.color.primary};
	text-decoration: none;
	&:hover {
		color: ${props => props.theme.color.primary};
		text-decoration: none;
	}
`;

/**
 * Consume an array of textnodes that share a container and return a react node with them
 */
function parseArray(arrayOfNodes: $ReadOnlyArray<TextNodeValues>, wrapper: string | null): React$Node {
	const key = shortid.generate();
	const firstNodeWithStyle = arrayOfNodes.find(node => node.styles.length > 0);
	if (!firstNodeWithStyle) {
		if (wrapper === null) {
			return arrayOfNodes.map(node => node.value.replace(/\n/g, ' '));
		}
		return React.createElement(wrapper, { key }, arrayOfNodes.map(node => node.value.replace(/\n/g, ' ')).join(''));
	}
	const differentArrays: Array<Array<TextNodeValues>> = [[]];
	const styleToCheck = firstNodeWithStyle.styles[0];
	let lastHadStyle = arrayOfNodes[0].styles.indexOf(styleToCheck) > -1;
	const shouldWrap = [lastHadStyle];
	let i = 0;
	arrayOfNodes.forEach(node => {
		const newNode = { ...node, styles: node.styles.filter(s => s !== styleToCheck) };
		const hasStyle = node.styles.indexOf(styleToCheck) > -1;
		if (hasStyle === lastHadStyle) {
			differentArrays[i].push(newNode);
		} else {
			i = i + 1;
			differentArrays.push([]);
			differentArrays[i].push(newNode);
			lastHadStyle = !lastHadStyle;
			shouldWrap.push(lastHadStyle);
		}
	});
	const nodes = differentArrays.map((array, index) => parseArray(array, shouldWrap[index] ? styleToCheck : null));
	if (wrapper === null) {
		return nodes;
	}
	return React.createElement(wrapper, { key }, nodes);
}

/**
 * Render an array of textnodes with styles
 */
function styledTextNodes(nodes: Array<TextNode>): React$Node {
	return parseArray(
		nodes.map(node => ({
			value: node.value,
			styles: node.styles.map(s => styleToNodeName(s))
		})), null);
}

/**
 * Preprocesses text nodes for rendering MSN and Yahoo RSS feeds, where only a limited set of styling is allowed.
 */
function restyleTextNodesForMsnYahoo(nodes: Array<TextNode>): Array<TextNode> {
	return nodes.map((node, index) => {
		const isStruck = node.styles.indexOf('Struck') >= 0;
		const startsStruck =
			isStruck && (index === 0 || nodes[index - 1].styles.indexOf('Struck') === -1);
		const endsStruck =
			isStruck && (index === nodes.length - 1 || nodes[index + 1].styles.indexOf('Struck') === -1);

		const value = (startsStruck ? '/' : '') + node.value + (endsStruck ? '/' : '');
		const styles = node.styles.map(style => {
			switch (style) {
				case 'Struck': return 'Italic';
				case 'Code': return undefined;
				case 'Underline': return undefined;
				default: return style;
			}
		}).filter(Boolean);
		return new TextNode(value, styles);
	});
}

/**
 * Render an array of inline nodes
 * Blocks of simple text get grouped together to resolve styling containers
 * Linebreaks and links break these groups
 */
function InlineNodes(props: InlineNodesProps) {
	const { kinjaMeta, nodes, events, platform } = props;
	const inEditor = props.renderer === 'editor';
	const inRss = kinjaMeta && kinjaMeta.config && typeof kinjaMeta.config.rssFeedType !== 'undefined';
	const inMsnOrYahoo = kinjaMeta && kinjaMeta.config &&
		['msn', 'yahoo'].indexOf(kinjaMeta.config.rssFeedType) >= 0;
	const restyle = inMsnOrYahoo ? restyleTextNodesForMsnYahoo : (nodes => nodes);

	const renderedList = [];
	let textNodes = [];
	nodes.forEach(node => {
		switch (node.type) {
			case INLINENODE.LINEBREAK:
				if (textNodes.length) {
					renderedList.push(styledTextNodes(restyle(textNodes)));
					textNodes = [];
				}
				renderedList.push(<br key={shortid.generate()} />);
				break;
			case INLINENODE.TEXT: {
				textNodes.push(node);
				break;
			}
			case INLINENODE.LINK: {
				if (textNodes.length) {
					renderedList.push(styledTextNodes(restyle(textNodes)));
					textNodes = [];
				}
				const { reference } = node;
				const href = filterXssUrl(reference);
				let parsed;
				try {
					parsed = new URL(href);
				} catch (e) {
					parsed = { protocol: '', hostname: '' };
				}
				const isInternalLink = href === '' || // empty link or filtered out by filterXssUrl
					!parsed.hostname || // relative URL
					mainBlogNames.find(blog => (parsed.hostname || '').indexOf(blog) > -1) || // known host name
					parsed.protocol === 'mailto:' || // email link
					href[0] === '#'; // fragment
				// NOTE: hardcoding target to _blank, as long as we load the discussion module in an iframe
				//       to make sure we're not opening the link in the iframe.
				const target: ?ValidLinkTaget = kinjaMeta.starterPost === false ? '_blank' : validateLinkTarget(node.target);
				const customEvents = node instanceof LinkNodeWithAnalytics ?
					node.events :
					[['Embedded Url', `${isInternalLink ? 'Internal' : 'External'} link`, href, {metric25: 1}]];
				const isAmazon = isAmazonUri(reference);
				let linkAttributes = {
					events: !inEditor && platform !== 'amp' && [
						...(events || []),
						...customEvents
					],
					href,
					// external links open in new tabs unless explicitly specified
					target: target || (!isInternalLink ? '_blank' : undefined),
					// always forbid window.open and referrer on external links
					rel: (!isInternalLink && !isAmazon) ? 'noopener noreferrer' : undefined

				};
				if (isAmazon && (kinjaMeta.config && kinjaMeta.config.shouldAffiliatizeAmazonUris)) {
					const blog = {
						blogGroup: kinjaMeta.blogGroup,
						name: kinjaMeta.blogName,
						isGmgBlog: kinjaMeta.isGmgBlog
					};
					const isGmgBlog = isGmgBlogByBlogObject(blog);
					const postTitleOrId = kinjaMeta.postHeadline || kinjaMeta.postId;
					const postBlogName = kinjaMeta.blogName;
					const { tag, subtag, asin, url } = getAmazonData({
						url: reference,
						blog,
						affiliateTag: kinjaMeta.amazonAffiliateTag,
						postId: kinjaMeta.postId,
						authorId: kinjaMeta.authorId,
						postIsStarter: kinjaMeta.starterPost,
						commerceLinkType: AmazonCommerceLink.CommerceTextLink
					});
					linkAttributes = {
						...linkAttributes,
						'data-amazonasin': isGmgBlog ? asin : undefined,
						'data-amazontag': isGmgBlog ? tag : undefined,
						'data-amazonsubtag': isGmgBlog ? subtag : undefined,
						events: [isGmgBlog && ['Commerce', `${postBlogName || ''} - ${postTitleOrId || ''}`, asin || ''], ...(events || [])],
						href: url,
						target: '_top'
					};
				}
				if (inEditor || inRss) {
					const textNodes: Array<TextNode> = node.value;
					renderedList.push(
						<Anchor {...linkAttributes} key={shortid.generate()}>
							<InlineNodes nodes={textNodes} kinjaMeta={kinjaMeta} platform={platform} />
						</Anchor>
					);
				} else {
					const textNodes: Array<TextNode> = node.value;
					renderedList.push(
						<span key={shortid.generate()}>
							<Anchor {...linkAttributes}>
								<InlineNodes nodes={textNodes} kinjaMeta={kinjaMeta} platform={platform} />
							</Anchor>
						</span>
					);
				}
				break;
			}
			default: {
				(node.type: empty);
				unexpectedCase(node.type);
			}
		}
	});
	if (textNodes.length) {
		renderedList.push(styledTextNodes(restyle(textNodes)));
	}
	return <EnsureDefaultTheme>
		<React.Fragment>
			{renderedList}
		</React.Fragment>
	</EnsureDefaultTheme>;
}

export default withKinjaMeta(withPlatform(InlineNodes));
