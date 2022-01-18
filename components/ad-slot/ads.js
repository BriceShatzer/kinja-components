// @flow

import * as React from 'react';
import styled from 'styled-components';
import media from '../../style-utils/media';
import classnames from 'classnames';
import { gridValue } from '../grid-utils';
import { SpaceBetweenBlocks } from '../curation-block/layouts/layout-styles';
import CommerceLinkPreview from 'kinja-components/components/postbody/link-preview/link-preview-commerce';
import type { CommerceModulePost } from 'kinja-components/components/sidebar/commerce/commerce-module-post';
import CommercePostPreview from 'kinja-components/components/postbody/link-preview/link-preview-post-commerce';


import AdSlot from './ad-slot';

/**
 * Top Banner Ad (970x90, 728x90)
 */
export const TopBannerAd = () => <AdSlot type="TOP_BANNER" position="top" cssClass="top-banner" blockthroughId="5d1b8a5c7d-384" />;

/**
 * Superhero splashytop (above the header)
 */
export const SplashyTop = ({ hasImpactNav }: { hasImpactNav: boolean }) => (
	<div
		id="splashy-ad-container-top"
		className="splashy-ad-container no-overflow"
		style={{ display: 'none' }}
	>
		<AdSlot type="SPLASHY_TOP" position="splashytop" cssClass={classnames('splashy-top', { 'with-impact-nav': hasImpactNav })} />
	</div>
);

/**
 *  NOTE: Hide the video container on desktop, since we only show recent videos
 * 		on permalinks on mobile
 * */
export const InStreamVideoContainer = styled.div`
	${media.largeUp`
		display: none;
	`}
`;

export const InStreamNativeVideo = ({
	mobile,
	isVideoPermalink
}: {
	mobile?: boolean,
	isVideoPermalink?: boolean
}) => {
	const slotType = `instream-native-video--${mobile ? 'mobile' : 'desktop'}`;
	return <>
		{mobile && <MobileInPostAd swappableMobileAd={true} />}
		{!isVideoPermalink && <InStreamVideoContainer className={`instream-native-video instream-permalink ${slotType}`} />}
	</>;
};

/**
 * Dynamically loaded ad in the sidebar (sticky)
 */
export const LeftRailDynamicAd = () => <AdSlot
	type="LEFT_RAIL_DYNAMIC"
	position="left_dynamic"
	cssClass="left-rail dfp-left-rail-dynamic"
	blockthroughId="5d1b8a672c-384"
/>;

/**
 * Native ads loaded in the sidebar (sticky)
 */
export const PromotionNativeSidebarAd = ({ nativeStyleTemplate }: { nativeStyleTemplate?: string }) => <AdSlot
	type="PROMOTION_NATIVE_SIDEBAR"
	position="promotion_native_sidebar"
	cssClass="promotion-sidebar"
	nativeStyleTemplate={nativeStyleTemplate}
/>;

/**
 * Native ads loaded adjacent to edit posts on the homepage
 */
export const PromotionNativeAd = ({ ppPosition, nativeStyleTemplate }: { ppPosition: string, nativeStyleTemplate?: string }) => <AdSlot
	type="PROMOTION_NATIVE"
	position="promotion_native_frontpage"
	ppPosition={ppPosition}
	cssClass="promotion-native"
	nativeStyleTemplate={nativeStyleTemplate}
/>;

/**
 * Ad on the top of the sidebar that is loaded with the page load
 */
export const LeftTopAd = () => <AdSlot
	type="LEFT_TOP"
	position="left_top"
	cssClass="left-top"
	blockthroughId="5d1b8a73ac-384"
/>;

/**
 * Ad on the top of the sidebar that is loaded with the page load, on slideshow permalinks
 */
export const SlideshowLeftTopAd = () => <AdSlot
	type="SLIDESHOW_LEFT_TOP"
	position="left_top"
	cssClass="left-top"
	blockthroughId="5d1b8a73ac-384"
/>;

/**
 * Ad between the YMAL module and popular posts, sticky and dynamically loaded
 */
export const LeftRailAd = (props: {
	postId?: string,
	blogName?: string,
	tags?: string,
	adZone?: string
}) => (<AdSlot
	type="LEFT_RAIL"
	position="left"
	cssClass="left-rail"
	postId={props.postId}
	blogName={props.blogName}
	tags={props.tags}
	forcedAdZone={props.adZone}
	blockthroughId="5d1b8a6193-384"
/>
);

/**
 * Mobile only ad served just above the footer on stream pages
 */
export const MobileBottomAd = () => <AdSlot
	type="MOBILE_BOTTOM"
	position="mobile_bottom"
	cssClass="mobile"
	blockthroughId="5d260a0e24-384"
/>;

/**
 * Mobile only ad served only in tertiary curation zone
 */
export const MobileCurationAd = () => <AdSlot
	type="MOBILE_CURATION"
	position="mobile_curation"
	cssClass="mobile"
	blockthroughId="5d260800ab-384"
/>;

/**
 * Mobile ads served on stream pages in between story cards
 */
export const MobileAd = () => <AdSlot
	type="MOBILE"
	position="mobile"
	cssClass="mobile"
	blockthroughId="5d2607fb74-384"
/>;

/**
 * Dynamically-loaded mobile in-post ad (300x250, 300x50)
 */
const MobileInPostBorder = styled.div`
	margin-left: 40px;
	margin-right: 40px;
`;

const MobileInPostAdTopBorder = styled(MobileInPostBorder)`
	border-top: 1px solid ${props => props.theme.color.lightgray};
	padding-bottom: 10px;
`;

const MobileInPostAdBottomBorder = styled(MobileInPostBorder)`
	border-bottom: 1px solid ${props => props.theme.color.lightgray};
`;

const MobileInPostWrapper = styled.div`
	margin: 10px 0 20px 0;
`;

// TODO: The !important can be removed, once all the _ads.scss is moved to styled components
const MobileInPostContentWrapper = styled.div`
	margin: 0 !important;
`;

const MobileHeaderWrapper = styled.div`
	text-transform: uppercase;
	font-size: 14px;
	letter-spacing: 2px;
	color: ${props => props.theme.color.midgray};
	margin-bottom: 10px;
`;

export const MobileInPostAd = (props: {
	swappableMobileAd?: boolean,
	isDeluxe?: boolean
}) => {
	const id = props.swappableMobileAd ? 'swappable-mobile-ad-container' : '';

	return (
		<MobileInPostWrapper
			id={id}
			className={`js_ad-mobile-dynamic ${props.swappableMobileAd ? 'swappable-mobile-ad-container' : ''} js_ad-dynamic ad-mobile-dynamic movable-ad`}
		>
			<MobileInPostAdTopBorder />
			<MobileInPostContentWrapper className="ad-unit ad-mobile">
				<MobileHeaderWrapper>Advertisement</MobileHeaderWrapper>
				<AdSlot
					type={`${props.isDeluxe ? 'MOBILE_INPOST_DELUXE' : 'MOBILE_IN_POST' }`}
					position="mobile_inpost"
					cssClass="mobile"
					swappableMobileAd={props.swappableMobileAd}
					blockthroughId="5d260804c9-384"
				/>
			</MobileInPostContentWrapper>
			<MobileInPostAdBottomBorder />
		</MobileInPostWrapper>
	);
};

/**
 * Billboard ad (970x90, 728x90) on the bottom of the page, above footer / newsletter module
 */
export const BillboardAd = (props: { position?: string }) => {
	return <AdSlot type="BILLBOARD" position={props.position} cssClass="billboard" blockthroughId="5d260915a6-384" />;
};

/**
 * Mobile footer ad displays on the bottom of non-stream pages in the same
 * container as the Billboard ad or where a MOBILE_BOTTOM ad is not present
 */
export const MobileFooterAd = () => <AdSlot
	type="MOBILE_FOOTER"
	position="mobile_footer"
	cssClass="mobile-footer"
	blockthroughId="5d260910b6-384"
/>;

/**
 * MidBanner ad (970x250, 728x90, 300x250).
 * Used on the featured permalink page
 */
const MovableAd = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
`;
const AdLabel = styled.label`
	font-family: ${props => props.theme.typography.utility.fontFamily};
	color: ${props => props.theme.color.midgray};
	font-size: 0.875rem;
	width: 100%;
	margin-left: 0;
	margin-right: 0;
	letter-spacing: 0.1rem;
	text-transform: uppercase;
	line-height: 28px;

	${media.mediumUp`
		line-height: 29px;
	`}
`;
const Midbanner = styled.div`
	text-align: center;
	border-bottom: ${props => props.theme.color.lightgray} 1px solid;
	border-top: ${props => props.theme.color.lightgray} 1px solid;
	box-sizing: content-box;
	padding: 1rem 0;

	position: relative;
	margin: 1rem 0;
	width: 100%;

	${media.largeUp`
		min-width: 728px;
		min-height: 90px;
	`}
`;
export const MidBannerAd = () => {
	return (
		<MovableAd className="js_movable_ad_slot">
			<Midbanner>
				<AdLabel>Advertisement</AdLabel>
				<AdSlot
					type="MID_BANNER"
					position="mid_banner"
					cssClass="middleboard"
					blockthroughId="5d1b8a6cd5-384"
				/>
			</Midbanner>
		</MovableAd>
	);
};


export const HomepageAdContainer = styled.div`
	width: 100vw;

	div[data-ad-load-state~="empty"] {
		padding: 0;
		margin: 0;
	}

	div[data-ad-load-state~="loaded"] {
		display: flex;
		justify-content: center;
		padding: 2rem 0;
		margin-bottom: ${SpaceBetweenBlocks};
		background: ${props => props.theme.color.whitesmoke};
	}

	${media.smallOnly`
		transform: translateX(calc((${gridValue.small('6c')} - 100vw)/2));
	`}

	${media.mediumOnly`
		transform: translateX(calc((${gridValue.medium('6c')} - 100vw)/2));
	`}

	${media.largeOnly`
		transform: translateX(calc((${gridValue.large('8c')} - 100vw)/2));
	`}

	${media.xlargeOnly`
		transform: translateX(calc((${gridValue.xlarge('12c')} - 100vw)/2));
	`}

	${media.xxlargeOnly`
		transform: translateX(calc((${gridValue.xxlarge('12c')} - 100vw)/2));
	`}

	${media.xxxlargeUp`
		transform: translateX(calc((${gridValue.xxlarge('12c')} - 100vw)/2));
	`}
`;
export const HomepageAd = () => (
	<HomepageAdContainer>
		<AdSlot
			type="MID_BANNER"
			position="mid_banner"
			cssClass="middleboard"
			blockthroughId="5d1b8a6cd5-384"
		/>
	</HomepageAdContainer>
);

/**
 * Special Section Top Ad (many sizes).
 */
export const SpecialSectionTopAd = () => <AdSlot
	type="SPECIAL_SECTION_TOP"
	position="special_section_top"
	cssClass="special-section-top"
/>;

/**
 * Special Section Mid Ad (many sizes). Currently unused.
 */
export const SpecialSectionMidAd = () => <AdSlot
	type="SPECIAL_SECTION_MID"
	position="special_section_mid"
	cssClass="special-section-mid"
/>;

/**
 * Special Section Bottom Ad (many sizes).
 */
export const SpecialSectionBottomAd = () => <AdSlot
	type="SPECIAL_SECTION_BOTTOM"
	position="special_section_bottom"
	cssClass="special-section-bottom"
/>;

/**
 * Section Sponsorship
 */
export const SectionSponsorshipAd = () => <AdSlot
	type="SECTION_SPONSORSHIP"
	position="section_sponsorship"
	cssClass="section_sponsorship"
/>;

/*
 * Ad between infinite scroll articles (970x250, 728x90)
 */
export const InfiniteScrollAd = (props: {
	postId?: string,
	blogName?: string,
	tags?: string,
	adZone?: string
}) => (
	<div className="ad-unit ad-infinite-scroll-ad js_ad-dynamic">
		<AdSlot
			type="INFINITE_SCROLL_BETWEEN_POSTS"
			position="scrollArticle"
			cssClass="infinite-scroll-ad"
			postId={props.postId}
			blogName={props.blogName}
			tags={props.tags}
			forcedAdZone={props.adZone}
			blockthroughId="5d1b8a976f-384"
		/>
	</div>
);

/*
 * Ad between infinite scroll articles on mobile (300x250, 300x600)
 */
export const InfiniteScrollMobileAd = (props: {
	postId?: string,
	blogName?: string,
	tags?: string,
	adZone?: string
}) => (
	<div className="ad-unit ad-infinite-scroll-ad-mobile js_ad-dynamic">
		<AdSlot
			type="INFINITE_SCROLL_BETWEEN_POSTS_MOBILE"
			position="scrollArticle_mobile"
			cssClass="infinite-scroll-ad-mobile"
			postId={props.postId}
			blogName={props.blogName}
			tags={props.tags}
			forcedAdZone={props.adZone}
			blockthroughId="5d26090a8c-384"
		/>
	</div>
);

/**
 * Infinite scroll out of page slot for getting a promotion id
 */
export const InfinitePromotionAd = () => <AdSlot
	type="INFINITE_PROMOTION"
	cssClass="infinite-promotion"
	ppPosition="scroll"
	position="scroll"
/>;

/*
 * Ad between permalink recirc articles (970x250, 728x90)
 */
export const PermalinkRecircAd = (props: {
	postId?: string,
	blogName?: string,
	tags?: string,
	adZone?: string
}) => (
	<div className="ad-unit ad-infinite-scroll-ad js_ad-dynamic">
		<AdSlot
			type="PERMALINK_RECIRC"
			position="bottom_recirc"
			cssClass="permalink-recirc-ad"
			postId={props.postId}
			blogName={props.blogName}
			tags={props.tags}
			forcedAdZone={props.adZone}
		/>
	</div>
);

/*
 * Ad between permalink recirc articles on mobile (300x250, 300x600)
 */
export const PermalinkRecircMobileAd = (props: {
	postId?: string,
	blogName?: string,
	tags?: string,
	adZone?: string
}) => (
	<div className="ad-unit ad-infinite-scroll-ad js_ad-dynamic">
		<div className="ad-mobile-dynamic">
			<AdSlot
				type="PERMALINK_RECIRC_MOBILE"
				position="bottom_recirc"
				cssClass="permalink-recirc-ad-mobile"
				postId={props.postId}
				blogName={props.blogName}
				tags={props.tags}
				forcedAdZone={props.adZone}
			/>
		</div>
	</div>
);

/**
 * Ad in the recirculation module post list
 */
export const NativeBelowArticleAd = (props: {
	ppPosition?: string,
	adIndex?: string,
	nativeStyleTemplate?: string
}) =>
	<AdSlot
		type="NATIVE_BELOW_ARTICLE"
		position="native_below_article"
		cssClass="native-below-article"
		ppPosition={props.ppPosition}
		adIndex={props.adIndex}
		nativeStyleTemplate={props.nativeStyleTemplate}
	/>;

/**
 * Teads ad unit
 */
export const TeadsOutstreamAd = (props: {mobile?: boolean}) => <AdSlot
	type={`${props.mobile ? 'TEADS_PERMALINK_OUTSTREAM_MOBILE' : 'TEADS_PERMALINK_OUTSTREAM'}`}
	position='outstream'
	cssClass='teads-outstream'
/>;

/**
 * Replacement for Teads when teads is disabled
 */
export const TeadsPassbackAd = () => <AdSlot
	type="OUTSTREAM_PASSBACK"
	position='outstream_passback'
	cssClass='teads-outstream teads-wrapper'
/>;

/**
 * Commerce module to add to the TeadsAds
 */


const CommerceLinkPreviewWrapper = styled.div`
	${media.mediumUp`
	display: none;
	`}
`;

export const CommercePostModule = ({ commercePost }: { commercePost: CommerceModulePost }) => {
	const { link, post } = commercePost;
	const { headline, permalink, image } = post;

	return <CommerceLinkPreviewWrapper>
		{link && <CommerceLinkPreview
			showDetails={true}
			style="CommerceCondensed"
			url={link.url}
			link={link}
			mobileDesign={true}
		/>}
		{!link && <CommercePostPreview url={permalink} headline={headline} image={image}  />}
	</CommerceLinkPreviewWrapper>;
};

/**
 * Container with TeadsOutstreamAd and populated commerce inset into the postbody for mobile
 */

export const TeadsOutstreamAdWithCommerce = ({ commercePost }: { commercePost: ?CommerceModulePost }) => {
	return <>
		{commercePost && <CommercePostModule commercePost={commercePost} />}
		<TeadsOutstreamAd mobile={true}/>
	</>;
};

/**
 * Container with TeadsPassbackAd and populated commerce inset into the postbody for mobile
 */
export const TeadsPassbackAdWithCommerce = ({ commercePost }: { commercePost: ?CommerceModulePost }) => {
	return <>
		{commercePost && <CommercePostModule commercePost={commercePost} />}
		<TeadsPassbackAd />
	</>;
};