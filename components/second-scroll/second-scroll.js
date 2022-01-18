// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import { chunk } from 'lodash';
import shortid from 'shortid';

import media from 'kinja-components/style-utils/media';
import { gridValue } from 'kinja-components/components/grid-utils';

import {
	InfiniteScrollAd,
	InfiniteScrollMobileAd,
	LeftRailAd,
	PermalinkRecircAd,
	PermalinkRecircMobileAd,
	NativeBelowArticleAd
} from 'kinja-components/components/ad-slot/ads';
import LoadWhenVisible from 'kinja-components/components/load-when-visible';
import {
	Main,
	Page,
	Page19,
	HorizontalAdContainer,
	SidebarWrapper,
	SidebarAdModule
} from 'kinja-components/components/page-layout';
import { SidebarWrapper as SidebarWrapperElement } from 'kinja-components/components/page-layout/sidebar';
import { DesktopHorizontalAdContainer, MobileHorizontalAdContainer } from 'kinja-components/components/page-layout/horizontal-ad-container';
import { StickyContainer, Sticky } from 'kinja-components/components/sticky';
import FeedItem from 'kinja-components/components/stream-new/feed-item.v2';
import { StyledAsideTools } from 'kinja-components/components/stream-new/feed-stream';
import PermalinkSecondScrollPost from 'kinja-components/components/permalink-second-scroll-post';
import FeaturedSecondScrollPost from 'kinja-components/components/featured-second-scroll-post';
import FeaturedContentContainer from 'kinja-components/components/permalink/featured-permalink-content-container';
import MoreOnModule, { Container as MoreOnModuleContainer } from 'kinja-components/components/more-on-module';
import { STICKY_CONTAINER_HEIGHT } from 'kinja-magma/client/sidebar-dynamic-ads';

import Post from 'kinja-magma/models/Post';
import type { PageType } from 'kinja-magma/models/PageType';
import type { Lookup } from 'kinja-magma/utils/resolve';
import type User from 'kinja-magma/models/User';
import type Link from 'kinja-magma/models/Link';
import type Blog from 'kinja-magma/models/Blog';
import type { PostId } from 'kinja-magma/models/Id';
import type BlogSalesMetadata from 'kinja-magma/models/BlogSalesMetadata';
import type { FeatureType } from 'kinja-magma/models/Feature';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import type { VideoPlayerProps } from 'kinja-components/components/video-player/video-player';

type SecondScrollProps = {
	blog?: Blog,
	post: Post,
	pageType: PageType,
	scrollListItems?: Array<Post>,
	loadedAdIndexes?: Array<number>,
	disableAds?: boolean,
	blogName?: ?string,
	blogSales?: ?BlogSalesMetadata,
	authors?: Lookup<PostId, User>,
	blogs?: Lookup<PostId, Blog>,
	links?: Lookup<PostId, Link>,
	mostPopularPosts?: Array<Post>,
	loadAd?: (HTMLElement) => void,
	feature?: FeatureType,
	parentIsFeatured?: boolean,
	features?: { [name: string]: boolean },
	videoMetadata: Array<VideoMeta>,
	useVideoJs?: boolean,
	videoJSPlayerProps?: ?VideoPlayerProps
};

export const NativeAdIndexes = [2, 5];
const MaxNumberOfRecircularItems = 8;
const AdBreakIndex = 4;

const ReadingListItem = styled.div`
	${props => props.withStandardGrid ? '' : 'padding: 0 24px;'}
	margin: 0 auto;

	> * {
		padding-bottom: 24px;
		margin-bottom: 30px;
		border-bottom: 1px solid ${p => p.theme.color.lightgray};
	}

	${props => props.lastItem && `
		> * {
			border-bottom: none;
			margin-bottom: 0;
		}
	`}

	${props => props.isAd && `
		> * {
			border-bottom: none;
			padding: 0;
			margin: 0 -24px 6px;
		}
	`}

	&:last-child > * {
		border-bottom: none;
		margin-bottom: 0;
	}

	${media.mediumUp`
		width: 100%;
		${props => props.withStandardGrid ? '' : 'max-width: 872px;'}
		margin: 0 auto;

		> * {
			padding-bottom: 35px;
			margin-bottom: 35px;
		}

		${props => props.lastItem && `
			> * {
				border-bottom: none;
				margin-bottom: 0;
			}
		`}

		${props => props.isAd && `
			> * {
				border-bottom: none;
				padding: 0;
				margin: 0 -24px 6px;
			}
		`}

	`}

	${media.smallOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.small('6c') : '100%'};
	`}

	${media.mediumOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.medium('6c') : '872px;'};
	`}

	${media.largeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.large('8c') : '872px'};
		padding-left: ${props => props.withStandardGrid ? gridValue.large('1c1g') : '0'};
	`}

	${media.xlargeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.xlarge('8c') : '872px'};
		padding-left: ${props => props.withStandardGrid ? gridValue.xlarge('1c1g') : '0'};
	`}

	${props => props.wideRail ? css`
		${media.xxlargeOnly`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('8c') : '872px'};
			padding-left: ${props => props.withStandardGrid ? gridValue.xxlarge('1c1g') : '0'};
		`}
		${media.xxxlargeUp`
			max-width: ${props => props.withStandardGrid ? gridValue.xxxlarge('8c') : '872px'};
			padding-left: ${props => props.withStandardGrid ? gridValue.xxxlarge('1c1g') : '0'};
		`}
	` : css`
		${media.xxlargeUp`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('8c') : '872px'};
			padding-left: ${props => props.withStandardGrid ? gridValue.xxlarge('1c1g') : '0'};
		`}
	`}
`;

const VisibilityContainer = styled.div`
	${props => props.isHidden && `
		display: none;
	`}
`;

const HorizontalDivider = styled.div`
	border-bottom: 1px solid ${props => props.theme.color.lightgray};
	margin-bottom: 30px;
`;

const FeaturedMain = styled(FeaturedContentContainer)`
	padding-bottom: 40px;
	${media.xlargeUp`
		${props => !props.withStandardGrid && `width: ${props.theme.mainContainerWidth};`}
	`}

	${media.largeOnly`
		width: ${props => props.withStandardGrid ? gridValue.large('8c') : props.theme.mainContainerWidth};
	`}

	${media.xlargeOnly`
		width: ${props => props.withStandardGrid ? gridValue.xlarge('8c') : props.theme.mainContainerWidth};
	`}

	${media.xxlargeUp`
		width: ${props => props.withStandardGrid ? gridValue.xxlarge('8c') : props.theme.mainContainerWidth};
	`}
`;

const RecircularItems = styled.div`
	padding: 20px 1.125rem;

	${media.mediumUp`
		padding: 20px 1.125rem 0 48px;
	`}

	${media.largeUp`
		padding: 20px 1.125rem 0 78px;
	`}

	${media.xlargeUp`
		width: 66.5%;
	`}
`;

const ReadingListItemsContainer = styled.div`
	${SidebarWrapper} {
		padding: 0 1.125rem;
	}

	${SidebarWrapper} {
		width: 33.5%;
		padding-top: 20px;
	}

	${MoreOnModuleContainer} {
		margin: 0;
	}
`;

const AdWrapper = styled.div`
	${({ withoutMargin }) => withoutMargin && css`
		${DesktopHorizontalAdContainer},
		${MobileHorizontalAdContainer} {
			margin-bottom: 0;
		}
	`}
`;

const getNativeStyleTemplate = (feature?: FeatureType) => {
	if (feature) {
		if (feature.isOn('native_recirc_magma_rendered_test')) {
			return 'recirc_native_ad_test';
		} else if (feature.isOn('native_recirc_magma_rendered')) {
			return 'recirc_native_ad';
		}
	}
	return '';
};

const SecondScroll = ({
	blog,
	mostPopularPosts,
	post,
	scrollListItems = [],
	disableAds,
	blogName,
	blogSales,
	pageType,
	authors,
	blogs,
	links,
	loadedAdIndexes = [],
	loadAd,
	feature,
	parentIsFeatured,
	features,
	videoMetadata,
	useVideoJs,
	videoJSPlayerProps
}: SecondScrollProps) => {
	const tags = post.tags.map(t => t.displayName).join(',');
	const recircularItems = scrollListItems.slice(0, MaxNumberOfRecircularItems);
	const adBreakProps = {
		...(blogName ? { blogName } : null)
	};
	const adProps = {
		postId: post.id,
		adZone: post.adZone || undefined,
		tags: tags || undefined,
		blogName: blogName || undefined
	};

	const postType = Post.getType(post);
	const SecondScrollComponent = postType === 'FEATURED' || postType === 'VIDEO' ?
		FeaturedSecondScrollPost : PermalinkSecondScrollPost;

	const postAuthors = authors && authors[post.id];
	const postBlog = blogs && blogs[post.id][0];
	const postLinks = links && links[post.id] || [];

	const nativeStyleTemplate = getNativeStyleTemplate(feature);

	const onAdShow = adContainer => {
		if (adContainer && loadAd) {
			const ads = adContainer.getElementsByClassName('dfp');
			Array.from(ads).map(ad => loadAd(ad));
		}
	};

	const MainWrapper = parentIsFeatured ? FeaturedMain : Main;
	const PageWrapper = feature && feature.isOn('grid_standard') ? Page19 : Page;

	const adContainer = (betweenContents?: boolean, isInfiniteScrollAd?: boolean) => (
		<AdWrapper withoutMargin={betweenContents}>
			<LoadWhenVisible onLoaded={onAdShow}>
				<HorizontalAdContainer
					position='bottom'
					desktopAd={isInfiniteScrollAd ? <InfiniteScrollAd {...adProps}/> : <PermalinkRecircAd {...adBreakProps}/>}
					mobileAd={isInfiniteScrollAd ? <InfiniteScrollMobileAd {...adProps}/> : <PermalinkRecircMobileAd {...adBreakProps}/>}
				/>
			</LoadWhenVisible>
		</AdWrapper>
	);

	const getListItem = (post: Post, index: number, shouldInsertAdBreak?: boolean) => (
		<React.Fragment>
			<ReadingListItem
				isAd={loadedAdIndexes.includes(index)}
				lastItem={shouldInsertAdBreak}
				withStandardGrid={feature && feature.isOn('grid_standard')}
			>
				<VisibilityContainer isHidden={loadedAdIndexes.includes(index)}>
					<FeedItem
						index={index}
						post={post}
						pageType={pageType}
						authors={authors && authors[post.id]}
						blog={blogs && blogs[post.id][0]}
						isV2
						isV3={false}
						withAuthorAvatar
						AsideToolsComponent={StyledAsideTools}
						oneRowOnMobile
					/>
				</VisibilityContainer>
				{NativeAdIndexes.includes(index) &&
					<VisibilityContainer isHidden={!loadedAdIndexes.includes(index)}>
						<NativeBelowArticleAd
							ppPosition={String(index)}
							adIndex={String(NativeAdIndexes.indexOf(index) + 1)}
							nativeStyleTemplate={nativeStyleTemplate}
						/>
					</VisibilityContainer>
				}
			</ReadingListItem>
			{shouldInsertAdBreak && adContainer()}
		</React.Fragment>
	);

	const getHorizontalDivider = recircularItems => {
		let divider = null;
		if (recircularItems.length > 0) {
			divider = <HorizontalDivider/>;
		}
		return divider;
	};


	return (
		<React.Fragment>
			{!disableAds && adContainer(true, true)}
			<PageWrapper>
				{!parentIsFeatured && <SidebarWrapper>
					{!disableAds && (
						<SidebarAdModule>
							<StickyContainer minHeight={STICKY_CONTAINER_HEIGHT}>
								<Sticky>
									<LeftRailAd {...adProps}/>
								</Sticky>
							</StickyContainer>
						</SidebarAdModule>
					)}
				</SidebarWrapper>}
				{postAuthors && postBlog && postLinks && <MainWrapper withStandardGrid={feature && feature.isOn('grid_standard')}>
					<SecondScrollComponent
						post={post}
						blog={postBlog}
						blogSales={blogSales}
						pageType={pageType}
						authors={postAuthors}
						links={postLinks}
						features={features}
						videoMetadata={videoMetadata}
						useVideoJs={useVideoJs}
						videoJSPlayerProps={videoJSPlayerProps}
					/>
				</MainWrapper>}
			</PageWrapper>

			{!disableAds ? adContainer(true) : getHorizontalDivider(recircularItems)}

			{recircularItems.length > 0 &&
				<div>
					{/* Add sidebar next to the recirculation items */}
					{features && features.recirc_sidebar
						? (() => {
							const secondScrollRecircItemsBlock = (posts: Array<Post>, sidebarContent?: React.Node) => (
								<PageWrapper>
									<RecircularItems>
										{posts.map((post, index) => getListItem(post, index))}
									</RecircularItems>
									<SidebarWrapperElement>
										{sidebarContent}
									</SidebarWrapperElement>
								</PageWrapper>
							);

							const recircularItemsWithSidebar = disableAds
								? secondScrollRecircItemsBlock(recircularItems)
								: chunk(recircularItems, AdBreakIndex).map((posts, index) => {
									const isFirstChunk = index === 0;
									const sidebarContent = blog && mostPopularPosts && (
										<MoreOnModule
											blog={blog}
											posts={mostPopularPosts}
											source="BLOG_POPULAR"
										/>
									);

									return (
										<React.Fragment key={shortid.generate()}>
											{secondScrollRecircItemsBlock(posts, isFirstChunk ? sidebarContent : null)}
											{isFirstChunk && adContainer(true)}
										</React.Fragment>
									);
								});

							return (
								<ReadingListItemsContainer>
									{recircularItemsWithSidebar}
								</ReadingListItemsContainer>
							);
						})() : (
							<React.Fragment>
								{recircularItems.map((post, index) => {
									const shouldInsertAdBreak = !disableAds && index === AdBreakIndex - 1;
									return getListItem(post, index, shouldInsertAdBreak);
								})}

							</React.Fragment>
						)
					}
				</div>
			}

			{!disableAds && adContainer()}
		</React.Fragment>
	);
};

export default SecondScroll;
