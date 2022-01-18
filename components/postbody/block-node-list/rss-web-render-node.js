// @flow

import * as React from 'react';

import webRenderNode from './web-render-node';
import InlineNodes from '../inline-node';
import RssImageNode1 from '../rss-image-node/rss-image-node-1';
import RssImageNode2 from '../rss-image-node/rss-image-node-2';
import type { KinjaMeta } from 'kinja-components/components/hoc/context';
import type { Logger } from 'kinja-components/components/hoc/logging-provider';
import type { PostBodyNode } from './block-node-list';
import { Iframe, getLinkSupportUrl } from '../embed-frame';
import Dimension from 'postbody/Dimension';
import { filterXssUrl } from '../../../utils';

const rssWebRenderNode = (feedType: string) =>
	(node: PostBodyNode, index: number, context: KinjaMeta, logger: Logger): React.Node => {
		const { config = {} } = context;

		switch (node.type) {
			case 'Paragraph': {
				// If we are inside a list container, don't add a wrapper element
				const listContainers = node.containers.filter(container => container.type === 'List' || container.type === 'Code');
				if (listContainers.length) {
					return <InlineNodes nodes={node.value} key={index} />;
				}
				return <p key={index}>
					<InlineNodes nodes={node.value} />
				</p>;
			}
			case 'Image':
				if (feedType === 'smartview') {
					return <RssImageNode2 key={index} {...node} />;
				}
				return <RssImageNode1 key={index} {...node} />;

			case 'FullBleedWidget':
				return <RssImageNode1
					key={index}
					id={node.image.id}
					format={node.image.format}
					width={800}
					height={450}
					alignment="FullWidth"
					caption={node.caption}
					attribution={node.attribution}
				/>;

			case 'LinkPreview': {
				const link = (context.links || []).find(link => link.url === node.url);
				if (!link) {
					return '';
				}
				return <p><a href={node.url}>{link.headline}</a></p>;
			}

			case 'ReplyInset': {
				const link = (context.links || []).find(link => link.url === node.url);
				if (!link) {
					return '';
				}
				const postId = link.meta.postId;
				const host = config.embedHost || 'kinja.com';

				return <p><a href={`https://${host}/embed/thread/${postId}`}>Reply</a></p>;
			}

			case 'CommerceLink':
				return <p>
					<a href={filterXssUrl(node.url)}>
						<strong>{node.text}</strong>
					</a>
					<small> - G/O Media may get a commission</small>
				</p>;

			case 'Twitter':
				if (feedType === 'p4rtn3rs') {
					return <Iframe
						key={index}
						id={`twitter-${node.id}`}
						source={getLinkSupportUrl(node.id, node.type, config.embedHost, { autosize: '1' })}
						width={new Dimension(500, 'Pixel')}
						height={new Dimension(100, 'Percent')}
						scrollable={false}
						aspectRatio="Custom"
						{...node}
					/>;
				}
				return webRenderNode(node, index, context, logger);

			case 'YoutubeVideo':
				if (feedType === 'p4rtn3rs') {
					return <Iframe
						key={index}
						id={`youtube-video-${node.id}`}
						source={`https://www.youtube.com/embed/${node.id}`}
						width={new Dimension(560, 'Pixel')}
						height={new Dimension(315, 'Pixel')}
						scrollable={false}
						aspectRatio="Custom"
						{...node}
					/>;
				}
				return webRenderNode(node, index, context, logger);

			default:
				return webRenderNode(node, index, context, logger);
		}
	};

export default rssWebRenderNode;
