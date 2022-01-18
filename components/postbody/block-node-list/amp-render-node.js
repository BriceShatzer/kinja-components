// @flow

import * as React from 'react';

import InlineNodes from '../inline-node';
import ParagraphContainer from '../paragraph/paragraphContainer';
import AmpImageNode from '../amp-image-node';
import AmpInstagramNode from '../amp-instagram-node';
import { AmpYoutubeNode, AmpYoutubePlaylistNode } from '../amp-youtube-node';
import { AmpFacebookNode, AmpFacebookPostNode } from '../amp-facebook-node';
import AmpTwitterNode from '../amp-twitter-node';
import Heading from '../heading';
import PullQuote from '../pull-quote';
import HorizontalRule from '../horizontal-rule';
import AmpVimeoNode from '../amp-vimeo-node';
import AmpVineNode from '../amp-vine-node';
import AmpLinkSupport from '../amp-linksupport-embed';
import { AmpSoundCloudNode, AmpSoundCloudPlayListNode } from '../amp-soundcloud-node';
import AmpImgurNode from '../amp-imgur-node';
import AmpDailyMotionNode from '../amp-dailymotion-node';
import AmpMegaphoneNode from '../amp-megaphone-node';
import AmpFullBleedWidget from '../amp-full-bleed-widget';
import AmpSlideshow from '../amp-slideshow';
import ReviewInset from '../review-inset';
import CommerceLink from '../commerce-link';
import Roundup from '../roundup';
import Quotable from '../quotable';
import ReplyInset from '../reply-inset';
import LinkPreview from '../link-preview';
import AmpAdSlot, {
	slotNameFromBlogSalesMeta,
	makeAdJson,
	makeAmpJson
} from '../../amp-ad-slot';
import AmpIframe from '../amp-iframe';
import { CommercePostModule } from 'kinja-components/components/ad-slot/ads';

import { IframeContainer, Message, ExternalSource } from '../embed-frame/iframe-placeholder';
import { ImageNodeWrapper } from 'kinja-components/components/postbody/image-node/image-node';
import ImageIcon from 'kinja-components/components/icon19/Image';
import DisabledIcon from 'kinja-components/components/icon19/Disabled';

import { prepareLink } from 'postbody/CommerceUtils';
import AmpKinjaVideo from '../amp-kinja-video';

import type { PostBodyNode } from './block-node-list';
import type { KinjaMeta } from '../../hoc/context';
import type { Logger } from '../../hoc/logging-provider';

export default function renderNode(node: PostBodyNode, index: number, context: KinjaMeta, logger: Logger): React.Node {
	const { config = {}, features } = context;

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
		case 'Image': {
			return (
				<AmpImageNode
					key={index}
					{...node}
					attributionsEnabled={config.attributionsEnabled}
					captionsEnabled={config.captionsEnabled}
					language={context.language}
				/>
			);
		}
		case 'Header':
			return <Heading key={index} {...node} />;
		case 'HorizontalRule':
			return <HorizontalRule key={index} {...node} />;
		case 'Instagram':
			return <AmpInstagramNode key={index} {...node} />;
		case 'YoutubeVideo':
			return <AmpYoutubeNode key={index} {...node} />;
		case 'YoutubePlaylist':
			return <AmpYoutubePlaylistNode key={index} {...node} />;
		case 'Facebook':
			return <AmpFacebookNode key={index} id={node.id} />;
		case 'FacebookPost':
			return <AmpFacebookPostNode key={index} url={node.url} />;
		case 'Twitter':
			return <AmpTwitterNode key={index} id={node.id} />;
		case 'TikTok':
			return <AmpLinkSupport key={index} id={`tiktok-${node.id}`} height={1280} width={640} />;
		case 'PullQuote':
			return <PullQuote key={index} {...node} isAmp={true} />;
		case 'Vimeo':
			return <AmpVimeoNode key={index} id={node.id} />;
		case 'Vine':
			return <AmpVineNode key={index} id={node.id} />;
		case 'SoundCloud':
			return <AmpSoundCloudNode key={index} id={node.id} />;
		case 'SoundCloudPlaylist':
			return <AmpSoundCloudPlayListNode key={index} id={node.id} />;
		case 'Mixcloud':
			return <AmpLinkSupport key={index} id={`mixcloud-${node.url}`} height={180} width={640} />;
		case 'Tumblr':
			return <AmpLinkSupport key={index} id={`tumblr-post-${node.id}-${node.user}`} height={800} width={480} />;
		case 'Ooyala':
			// TODO: amp support natively
			// TODO: Ooyala is gone
			return <AmpLinkSupport key={index} id={`ooyala-${node.id}-${node.playerId}`} height={360} width={640} />;
		case 'Waywire':
			// TODO: Waywire is gone
			return <AmpLinkSupport key={index} id={`waywire-${node.id}`} height={360} width={640} />;
		case 'Typeform':
			return <AmpLinkSupport key={index} id={`typeform-${node.user}-${node.id}`} height={640} width={640} />;
		case 'MovementVentures':
			// TODO: MovementVentures is Qzzr
			return <AmpLinkSupport key={index} id={`movementventures-${node.id}`} height={750} width={640} />;
		case 'Qzzr':
			return <AmpLinkSupport key={index} id={`qzzr-${node.height}-${node.id}`} height={node.height} width={640} />;
		case 'Megaphone':
			return <AmpMegaphoneNode key={index} id={node.id} />;
		case 'UstreamLive':
			// TODO: Ustream is gone
			return <AmpLinkSupport key={index} id={`ustream-channel-${node.id}`} height={360} width={640} />;
		case 'Ustream':
			// TODO: Ustream is gone
			return <AmpLinkSupport key={index} id={`ustream-video-${node.id}`} height={360} width={640} />;
		case 'DailyMotion':
			return <AmpDailyMotionNode key={index} id={node.id} />;
		case 'MsnVideo':
			return <AmpLinkSupport key={index} id={`msn-${node.id}`} height={360} width={640} />;
		case 'TwitchStream':
			return <AmpLinkSupport key={index} id={`twitch-stream-${node.id}`} height={360} width={640} />;
		case 'TwitchVideo':
			return <AmpLinkSupport key={index} id={`twitch-video-${node.id}`} height={360} width={640} />;
		case 'PollDaddyQuiz':
			return <AmpLinkSupport key={index} id={`polldaddy-quiz-${node.user}.${node.id}`} height={800} width={480} />;
		case 'PollDaddy':
			return <AmpLinkSupport key={index} id={`polldaddy-tag-${node.id}`} height={800} width={480} />;
			// TODO: use amp native gist tag
		case 'GithubGist':
			return <AmpLinkSupport key={index} id={`gist-${node.id}`} height={640} width={480} />;
		case 'DocumentCloud':
			return <AmpLinkSupport key={index} id={`docCloud-doc-${node.id}`} height={800} width={800} />;
		case 'Imgur':
			return <AmpImgurNode key={index} id={node.id} />;
		case 'Viddler':
			return <AmpLinkSupport key={index} id={`viddler-${node.id}`} height={480} width={640} />;
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

			return <AmpFullBleedWidget key={index} {...props} />;
		}
		case 'Slideshow':
			return (
				<AmpSlideshow
					key={index}
					aspectRatio={node.aspectRatio}
					slides={node.slides}
				/>
			);
		case 'ContainerBreak':
			return '';
		case 'PageBreak':
			return '';
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
						isAmp
					/>
				);
			}
		}
		case 'Roundup':
			return <Roundup key={index} {...node} />;
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
		case 'LegacyRawHtml':
			return (
				<ImageNodeWrapper style={{width: '100%', height: '150px'}}>
					<IframeContainer>
						<ExternalSource as="div" isUnsupported>
							<Message>
								<DisabledIcon />
								<span>
									We can&apos;t show this content on this platform.
									<br />
									Please <a href={context.permalinkUrl}>tap here</a> to read on the full site.
								</span>
							</Message>
						</ExternalSource>
					</IframeContainer>
				</ImageNodeWrapper>
			);
		case 'OldLivestream':
			return <AmpLinkSupport key={index} id={`livestream-channel:${node.linksupportId}`} height={360} width={640} />;
		case 'NewLivestream':
			return <AmpLinkSupport key={index} id={`livestream-account:${node.linksupportId}`} height={360} width={640} />;
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
		case 'CommerceLink':
			return (
				<CommerceLink
					key={index}
					text={node.text}
					url={node.url}
				/>
			);
		case 'AdSlotNode': {
			const {
				adNetworkId,
				adSiteName,
				indexExchangeAmpSiteId,
				adZone,
				postId,
				storyType,
				categoryData,
				subcategoryData,
				tags
			} = context;
			const mobileSlotIndex = node.mobileSlotIndex || 0;
			const dataSlot = slotNameFromBlogSalesMeta({adNetworkId, adSiteName, adZone});
			const medianetAmpSiteId = features && features.medianet_headerbidding_amp && features.medianet_headerbidding ? '8CUL2TG3D' : undefined;
			const ampJson = makeAmpJson(indexExchangeAmpSiteId, medianetAmpSiteId);
			const dataJson = makeAdJson({
				postId,
				storyType,
				categoryData,
				subcategoryData,
				tags,
				adZone,
				pos: mobileSlotIndex
			});

			return (
				<>
					{index === 6 &&
					context.commercePermalinkPosts && context.commercePermalinkPosts.length &&
					<CommercePostModule commercePost={context.commercePermalinkPosts[0]}/>}
					<AmpAdSlot
						dataSlot={dataSlot}
						ampJson={ampJson}
						dataJson={dataJson}
					/>
				</>
			);
		}
		case 'Iframe':
			return <AmpIframe key={index} {...node} />;
		case 'KinjaVideo':
			if (context.embeddedVideos && context.embeddedVideos.length) {
				const videoMeta = context.embeddedVideos.find(v => v.id === node.id);

				if (!videoMeta) {
					return <p>Video not found.</p>;
				}

				return <AmpKinjaVideo
					videoMeta={videoMeta}
					title={context.postHeadline}
					isFeatured={context.postIsFeatured}
					isSponsored={context.sponsored}
					isVideo={context.postIsVideo}
					siteSection={context.blogName}
					website={context.blogGroup}
					pageType={context.pageType}
					disableAds={context.disableAds} />;
			}
			return <p>Video not found.</p>;
		case 'DeletedEmbed': {
			const message = (contentType => {
				switch (contentType) {
					case 'Storify':
						return (
							<Message>
								There used to be a Storify embed here, but
								<a href="https://storify.com/faq-eol" target="_blank" rel="noopener noreferrer"> Storify doesn’t exist anymore.</a>
							</Message>
						);
					case 'Image':
					case 'FullBleedWidget':
						return (
							<Message>
								<ImageIcon />
								<span>This image was removed due to legal reasons.</span>
							</Message>
						);
					default:
						return <Message><span>This content is no longer available. :(</span></Message>;
				}
			})(node.originalContent.type);

			return (
				<ImageNodeWrapper style={{width: '100%', height: '250px'}}>
					<IframeContainer>
						<ExternalSource as="div" isUnsupported>
							{message}
						</ExternalSource>
					</IframeContainer>
				</ImageNodeWrapper>
			);
		}
		default:
			return <p><code>{`[Unimplemented "${node.type}" node]`}</code></p>;
	}
}
