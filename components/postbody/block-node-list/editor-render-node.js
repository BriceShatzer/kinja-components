// @flow

import * as React from 'react';
import InlineNodes from '../inline-node';
import { BasicEmbedFrame, MixcloudFrame } from '../embed-frame';
import DeletedEmbedInEditor from '../embed-frame/deleted-embed-placeholder-in-editor';
import EmbedFrameInEditor from '../embed-frame/embed-frame-in-editor';
import IframeInEditor from '../embed-frame/iframe-in-editor';
import FullBleedWidgetInEditor from '../full-bleed-widget/full-bleed-widget-in-editor';
import Heading from '../heading';
import HorizontalRule from '../horizontal-rule';
import ImageNodeComponent from '../image-node';
import LegacyRawHtml from '../legacy-raw-html';
import PageBreak from '../page-break';
import PullQuote from '../pull-quote';
import Quotable from '../quotable';
import ReviewInset from '../review-inset';
import CommerceLink from '../commerce-link';
import SlideshowInEditor from '../../slideshow/in-editor';
import type { KinjaMeta } from '../../hoc/context';
import type { PostBodyNode } from './block-node-list';
import { Theme } from '../../theme';

/**
 * Render a single node
 */
export default function renderNode(node: PostBodyNode, index: number, context: KinjaMeta): * {
	let { config } = context;
	if (!config) {
		config = {};
	}

	switch (node.type) {
		case 'Paragraph': {
			// If we are inside a list container, don't add a wrapper element
			const listContainers = node.containers.filter(container => container.type === 'List' || container.type === 'Code');
			if (listContainers.length) {
				return <InlineNodes nodes={node.value} key={index} renderer="editor" />;
			}
			return <p key={index}><InlineNodes nodes={node.value} renderer="editor" /></p>;
		}

		case 'Qzzr':
			return <BasicEmbedFrame key={index} id={node.id} {...node} aspectRatio="Custom" />;

		case 'Mixcloud':
			return <MixcloudFrame key={index} {...node} />;

		case 'MovementVentures':
		case 'Ooyala':
		case 'Viddler':
		case 'Vimeo':
		case 'Waywire':
		case 'YoutubePlaylist':
		case 'YoutubeVideo':
		case 'MsnVideo':
		case 'NewLivestream':
		case 'OldLivestream':
		case 'SoundCloud':
		case 'SoundCloudPlaylist':
		case 'TwitchStream':
		case 'TwitchVideo':
		case 'Typeform':
		case 'Ustream':
		case 'UstreamLive':
		case 'DailyMotion':
		case 'Megaphone':
			return <EmbedFrameInEditor node={node} captionsEnabled />;
		case 'DocumentCloud':
		case 'Facebook':
		case 'FacebookPost':
		case 'GithubGist':
		case 'Imgur':
		case 'Instagram':
		case 'PollDaddy':
		case 'PollDaddyQuiz':
		case 'Twitter':
		case 'TikTok':
		case 'Tumblr':
		case 'Vine':
			return <EmbedFrameInEditor node={node} autoResize captionsEnabled />;
		case 'KinjaVideo':
			return (
				<EmbedFrameInEditor
					node={node}
					urlParams={{ platform: 'editor' }}
					sizeClasses="flex-video widescreen"
					captionsEnabled
				/>
			);
		case 'Iframe':
			// TODO: toolbarEnabled should only be true on desktop
			return <IframeInEditor node={node} toolbarEnabled />;
		case 'FullBleedWidget':
			return (
				<Theme>
					<FullBleedWidgetInEditor
						key={index}
						image={node.image}
						overlay={node.overlay || undefined}
						caption={node.caption || undefined}
						attribution={node.attribution || undefined}
						syndicationRights={node.syndicationRights || undefined}
						anchorTag={node.anchorTag || undefined}
						isParallax={node.isParallax || undefined}
						attributionsEnabled={config.attributionsEnabled}
						captionsEnabled={config.captionsEnabled}
					/>
				</Theme>
			);
		case 'Header':
			return <Heading key={index} {...node} />;
		case 'HorizontalRule':
			return <HorizontalRule key={index} {...node} editable />;
		case 'Image':
			return (
				<ImageNodeComponent
					key={index}
					{...node}
					attributionsEnabled={config.attributionsEnabled}
					captionsEnabled={config.captionsEnabled}
					editable
				/>
			);
		case 'LegacyRawHtml':
			return <LegacyRawHtml key={index} {...node} />;
		case 'LinkPreview': {
			// In the editor we don't display a link inset - we just display a link that the editor will resolve
			let variant = 'normal';
			if (node.style === 'CommerceList') {
				variant = 'list';
			} else if (node.style === 'CommerceCondensed') {
				variant = 'condensed';
			}
			return <p key={index}><a href={node.url} x-inset="1" x-inset-variant={variant}>{node.url}</a></p>;
		}
		case 'PageBreak':
			return <PageBreak key={index} />;
		case 'PullQuote':
			return <PullQuote key={index} {...node} editable />;
		case 'Quotable':
			return <Quotable key={index} {...node} editable />;
		case 'ReplyInset': {
			// In the editor we don't display a link inset - we just display a link that the editor will resolve
			return <p key={index}><a href={node.url} x-inset="1">{node.url}</a></p>;
		}
		case 'ReviewBox': {
			const { category, subcategory } = context;
			const text = node.text.map(obj => ({[obj.label]: obj.value})); // todo: only for backward compatibility
			return <ReviewInset
				key={index}
				{...node}
				reviewImage={node.image}
				text={node.text}
				reviewText={text}
				// $FlowFixMe
				storyType={{}}
				// $FlowFixMe
				{...category ? { categoryData: { valueDisplay: category }} : null}
				// $FlowFixMe
				{...subcategory ? { subcategoryData: { valueDisplay: subcategory }} : null}
				editable
			/>;
		}
		case 'Slideshow':
			return <SlideshowInEditor key={index} {...node} />;
		case 'ContainerBreak':
			return <span />;
		case 'AdSlotNode':
			return <span />;
		case 'Roundup':
			// <KinjaRoundup> component handles the Editor portion
			return <span />;
		case 'DeletedEmbed':
			return <DeletedEmbedInEditor key = {index} originalContent = {node.originalContent} reason = {node.reason} />;
		case 'CommerceLink':
			return (
				<CommerceLink
					key={index}
					text={node.text}
					url={node.url}
					editable
				/>
			);
		default:
			return <p><code>{`[Unimplemented "${node.type}" node]`}</code></p>;
	}
}
