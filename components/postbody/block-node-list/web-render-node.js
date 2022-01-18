// @flow

import * as React from 'react';
import InlineNodes from '../inline-node';
import ParagraphContainer from '../paragraph/paragraphContainer';
import EmbedFrame, {
	BasicEmbedFrame,
	DeletedEmbed,
	Iframe,
	MixcloudFrame
} from '../embed-frame';
import KinjaVideo from '../kinja-video';
import FullBleedWidget from '../full-bleed-widget';
import Heading from '../heading';
import HorizontalRule from '../horizontal-rule';
import ImageNodeComponent from '../image-node';
import LegacyRawHtml from '../legacy-raw-html';
import LinkPreview from '../link-preview';
import PullQuote from '../pull-quote';
import Quotable from '../quotable';
import ReviewInset from '../review-inset';
import CommerceLink from '../commerce-link';
import ReplyInset from '../reply-inset';
import Roundup from '../roundup';
import Slideshow from '../../slideshow/slideshow';
import InPostContainer from '../../ad-slot/in-post-container';
import { prepareLink } from 'postbody/CommerceUtils';
import { type BlockNodeJSON, type FeaturedMedia } from 'postbody/BlockNode';
import type { KinjaMeta } from '../../hoc/context';
import type { PostBodyNode } from './block-node-list';
import type { BlockNode } from 'postbody/BlockNode';
import type { Logger } from '../../hoc/logging-provider';

export function isBasicVideo(node: BlockNode) {
	switch (node.type) {
		case 'YoutubeVideo':
		case 'YoutubePlaylist':
		case 'KinjaVideo':
		case 'Ustream':
		case 'UstreamLive':
		case 'DailyMotion':
		case 'MsnVideo':
		case 'Vimeo':
			return true;
		default:
			return false;
	}
}

export function isRecommendedNode(node: FeaturedMedia, mainMedia?: ?BlockNodeJSON): boolean {
	if (mainMedia) {
		switch (mainMedia.type) {
			case 'Image':
			case 'KinjaVideo':
			case 'YoutubeVideo':
				return (node.id || '') === mainMedia.id;
		}
	}
	return false;
}

/**
 * Render a single node
 */
export default function renderNode(node: PostBodyNode, index: number, context: KinjaMeta, logger: Logger): React.Node {
	const { config = {} } = context;

	switch (node.type) {
		case 'Paragraph': {
			// If we are inside a list container, don't add a wrapper element
			const listContainers = node.containers.filter(container => container.type === 'List' || container.type === 'Code');
			const { dropCapEnabled } = context;
			if (listContainers.length) {
				return <InlineNodes nodes={node.value} key={index} />;
			}
			return <ParagraphContainer key={index} dropCapEnabled={dropCapEnabled}>
				<InlineNodes nodes={node.value} key={index} />
			</ParagraphContainer>;
		}
		case 'Qzzr':
			return <BasicEmbedFrame key={index} id={node.id} {...node} embedHost={config.embedHost} />;
		case 'Mixcloud':
			return <MixcloudFrame key={index} {...node} />;
		case 'DailyMotion':
		case 'DocumentCloud':
		case 'Facebook':
		case 'GithubGist':
		case 'Imgur':
		case 'Instagram':
		case 'Megaphone':
		case 'MovementVentures':
		case 'MsnVideo':
		case 'PollDaddy':
		case 'SoundCloud':
		case 'SoundCloudPlaylist':
		case 'TwitchStream':
		case 'TwitchVideo':
		case 'Twitter':
		case 'TikTok':
		case 'Ustream':
		case 'UstreamLive':
		case 'Viddler':
		case 'Vimeo':
		case 'Vine':
		case 'Waywire':
			return <EmbedFrame key={index} id={node.id} {...node}
				captionsEnabled={config.captionsEnabled}
				embedHost={config.embedHost}
			/>;
		case 'YoutubeVideo':
			return <EmbedFrame key={index} id={node.id} {...node}
				captionsEnabled={config.captionsEnabled}
				embedHost={config.embedHost}
				isRecommended={isRecommendedNode(node, context.mainMedia)}
			/>;
		case 'Ooyala':
		case 'PollDaddyQuiz':
		case 'Tumblr':
			return <EmbedFrame key={index} id={node.id} {...node}
				linksupportId={node.linksupportId}
				captionsEnabled={config.captionsEnabled}
				embedHost={config.embedHost}
			/>;
		case 'YoutubePlaylist':
			return <EmbedFrame key={index} id={node.id} {...node}
				linksupportId={node.initialVideo ? node.linksupportId : undefined}
				captionsEnabled={config.captionsEnabled}
				embedHost={config.embedHost}
			/>;
		case 'FacebookPost':
			return <EmbedFrame key={index} id={node.url} {...node}
				linksupportId={node.linksupportId}
				captionsEnabled={config.captionsEnabled}
				embedHost={config.embedHost}
			/>;
		case 'NewLivestream':
		case 'OldLivestream':
			return <EmbedFrame key={index} id="" {...node}
				linksupportId={node.linksupportId}
				captionsEnabled={config.captionsEnabled}
				embedHost={config.embedHost}
			/>;
		case 'Typeform':
			return <EmbedFrame key={index} id={node.id} {...node}
				linksupportId={node.linksupportId}
				captionsEnabled={config.captionsEnabled}
				embedHost={config.embedHost}
				isLazy
			/>;
		case 'FullBleedWidget': {
			const {captionsEnabled, attributionsEnabled} = config;
			const {language} = context;
			const props = {
				image: node.image,
				overlay: node.overlay || undefined,
				caption: node.caption || undefined,
				attribution: node.attribution || undefined,
				syndicationRights: node.syndicationRights || undefined,
				anchorTag: node.anchorTag || undefined,
				isParallax: node.isParallax || undefined,
				captionsEnabled,
				attributionsEnabled,
				language
			};

			return (
				<div className="js_full-bleed-widget" data-props={JSON.stringify(props)}>
					<FullBleedWidget
						key={index}
						{...props}
					/>
				</div>
			);
		}
		case 'Header':
			return <Heading key={index} {...node} />;
		case 'HorizontalRule':
			return <HorizontalRule key={index} {...node} />;
		case 'Iframe':
			return <Iframe key={index} {...node} isLazy isStarter={context.starterPost} />;
		case 'Image':
			return <ImageNodeComponent
				key={index}
				{...node}
				attributionsEnabled={config.attributionsEnabled}
				captionsEnabled={config.captionsEnabled}
				lazyload={!config.clientRendering}
				postHeadline={context.postHeadline}
				language={context.language}
				isStarterPost={context.starterPost}
				isRecommended={isRecommendedNode(node, context.mainMedia)}
			/>;
		case 'KinjaVideo': {
			if (!context.embeddedVideos) {
				logger.error('Video meta data missing from context.');
				return '';
			}
			const videoMeta = context.embeddedVideos.find(v => v.id === node.id);
			if (!videoMeta) {
				logger.error(`Video meta data for video #${node.id} missing from context.`);
				return '';
			}
			return (
				<KinjaVideo
					captionsEnabled={true}
					caption={node.caption}
					id={node.id}
					key={index}
					videoMeta={videoMeta}
					thumbnailOnly={context.isSecondScroll}
				/>
			);
		}
		case 'LegacyRawHtml':
			return <LegacyRawHtml key={index} {...node} />;
		case 'LinkPreview': {
			if (!context.links) {
				logger.error('Encountered a LinkPreview, but there was no links information in the context.');
				return '';
			}
			// TODO: Additional information from context
			const link = context.links.find(link => link.url === node.url);
			if (!link) {
				logger.error(`Link object used in LinkPreview not present in links array for url: ${node.url}`);
				return '';
			}
			return (
				<LinkPreview
					key={index}
					{...node}
					link={prepareLink(link)}
					lazyload={!config.clientRendering}
				/>
			);
		}
		case 'PageBreak':
			return null;
		case 'PullQuote':
			return <PullQuote key={index} value={node.value} alignment={node.alignment} disableBranding={config.disablePullQuoteBranding} />;
		case 'Quotable':
			return <Quotable key={index} {...node} />;
		case 'ReplyInset': {
			if (!context.links) {
				logger.error('Encountered a ReplyInset, but there was no links information in the context');
				return '';
			}
			const link = context.links.find(link => link.url === node.url);
			if (!link) {
				logger.error(`Link object used in ReplyInset not present in links array for url: ${node.url}`);
				return '';
			}
			return (
				<ReplyInset
					key={index}
					link={link}
					originalLink={node.url}
					insetPrefix={config.insetPrefix || 'https://api.kinja.com'}
				/>
			);
		}
		case 'ReviewBox': {
			if (node.hide === true) {
				return '';
			} else {
				const { categoryData, subcategoryData, storyType } = context;
				const reviewText = node.text.map(obj => ({[obj.label]: obj.value})); // todo: only for backward compatibility
				return (
					<ReviewInset
						key={index}
						{...node}
						categoryData={categoryData}
						subcategoryData={subcategoryData}
						storyType={storyType}
						reviewText={reviewText}
						reviewImage={node.image}
					/>
				);
			}
		}
		case 'Roundup':
			return <Roundup key={index} {...node} />;
		case 'Slideshow':

			return node.slides.length > 0 && (
				<aside className="slideshow-inset js_slideshow align--bleed">
					<Slideshow
						aspectRatio={node.aspectRatio}
						slides={node.slides}
						thumbnail={node.thumbnail}
						adsEnabled={config.adsEnabled}
						language={context.language}
						headline={context.postHeadline || ''}
						desktop // TODO: how do we set this on the server
						facebookShareUrl={context.facebookShareUrl || ''}
						twitterShareUrl={context.twitterShareUrl || ''}
						renderInlineDataForHydration
						preLoadFirstSlide
						preloadAmount={4}
						adsFrequency={4}
						adDelay={1000}
					/>
				</aside>
			);
		case 'ContainerBreak':
			return '';
		case 'AdSlotNode':
			return <InPostContainer key={index}
				{...node}
				index={index}
				features={context.features || {}}
				isVideoPermalink={context.postIsVideo}
				commercePost={context.commercePermalinkPosts && context.commercePermalinkPosts[0]}
				blogGroup={context.blogGroup}
			/>;
		case 'DeletedEmbed':
			return (
				<DeletedEmbed
					key={index}
					originalContent={node.originalContent}
				/>
			);
		case 'CommerceLink':
			return (
				<CommerceLink
					key={index}
					text={node.text}
					url={node.url}
				/>
			);
		default:
			return <p><code>{`[Unimplemented "${node.type}" node]`}</code></p>;
	}
}
