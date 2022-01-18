// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { PermalinkProps } from './';
import media from '../../style-utils/media';
import PermalinkPost from '../post-elements/permalink-post';
import { parseNode } from 'postbody/BlockNode';
import SharingFooter from '../post-elements/sharing-footer';
import PermalinkBelowPost from './permalink-below-post';
import Button from '../buttons';
import Carousel from '../carousel';
import ExpandableContainer from '../expandable-container/expandable-container';
import RevcontentWidget from '../revcontent';

const CarouselContainer = styled.div``;

const CarouselContainers = styled.div`
	margin: 2rem auto;
	max-width: ${props => props.theme.pageWidth};
	display: block;
	position: relative;

	${CarouselContainer} {
		display: block;
		position: relative;
		padding-top: 20px;
		border-top: 1px solid ${props => props.theme.color.lightgray};
		border-bottom: 1px solid ${props => props.theme.color.lightgray};

		${media.largeDown`
			h4 {
				color: ${props => props.theme.color.gray};
				text-transform: uppercase;
				margin: 0 0 0.5rem;
			}
		`}

		&:first-child {
			border-bottom: 0;
		}

		& .slider-frame {
			max-width: ${props => props.theme.pageWidth} !important;
			position: absolute !important;
			width: 100% !important;
			overflow: hidden;
		}

		${media.largeDown`
			& .slider,
			& .slider-frame {
				overflow: scroll;
			}
			& .slider-list[style] {
				width: auto !important;
				display: flex !important;
				flex-wrap: nowrap !important;
				align-items: start;
				margin: 0 -8px !important;
			}
			& .slider-slide[style] {
				flex-shrink: 0 !important;
				width: 235px !important;
				position: relative !important;
				left: initial !important;
				margin: 0 8px !important;
			}
			& .slider-item {
				display: block;
			}
			& .slider-control-centerleft,
			& .slider-control-centerright {
				display: none;
			}
		`}
	}
`;

const TaboolaWidget = styled.div`
	&.trc_related_container {
		padding: 0;
	}

	.thumbnails-a {
		padding: 0;
	}
`;

const RelatedContentContainer = styled.div`
	margin: 40px auto 0;
	max-width: ${props => props.theme.postContentMaxWidth};
`;


const PermalinkContent = (props: PermalinkProps) => {
	const {
		adsEnabled,
		blog,
		blogSales,
		commercePermalinkPosts,
		features,
		links,
		embeddedVideos,
		parentBlog,
		postNeighbors,
		specialSectionBlog,
		specialSectionData,
		videoPermalinkRecircPosts,
		starterPost
	} = props;

	const {
		facebookShareUrl, twitterShareUrl, storyType
	} = starterPost;

	return (
		<React.Fragment>
			{features && features.magma_permalink_video_truncation && starterPost.isVideo ? (
				<React.Fragment>
					<div className="js_expandable-container">
						<ExpandableContainer
							truncateLines={13}
							ExpandButton={({ onClick }) =>
								<Button
									onClick={onClick}
									className='js_expandable-container-button'
									halfwidth
									label="Continue reading"
									margin='0 25%'
									small
								/>
							}
						>
							<div>
								<PermalinkPost
									canonicalHost={(parentBlog || blog).canonicalHost}
									category={starterPost.categoryData}
									links={links}
									embeddedVideos={embeddedVideos}
									postBody={starterPost.body.map(node => parseNode(node))}
									postNeighbors={postNeighbors}
									storyType={storyType}
									specialSectionBlog={specialSectionBlog}
									specialSectionData={specialSectionData}
									adsEnabled={adsEnabled}
									features={features}
									post={starterPost}
									blog={blog}
									blogSales={blogSales}
									commercePermalinkPosts={commercePermalinkPosts}
								/>
								<PermalinkBelowPost {...props} withoutTaboola />
							</div>
						</ExpandableContainer>
					</div>
					<CarouselContainers>
						{videoPermalinkRecircPosts && videoPermalinkRecircPosts.recentVideoPosts && (
							<CarouselContainer>
								<h3>Latest on {blog.displayName}</h3>
								<Carousel className='js_carousel' data-source='recentVideoPosts' posts={videoPermalinkRecircPosts.recentVideoPosts} />
							</CarouselContainer>
						)}
						{videoPermalinkRecircPosts && videoPermalinkRecircPosts.popularVideoPosts && (
							<CarouselContainer>
								<h3>Most Popular</h3>
								<Carousel className='js_carousel' data-source='popularVideoPosts' posts={videoPermalinkRecircPosts.popularVideoPosts} />
							</CarouselContainer>
						)}
					</CarouselContainers>
					<RelatedContentContainer>
						{features && features.revcontent ? (
							<RevcontentWidget blogGroup={blog.blogGroup} />
						) : (
							<TaboolaWidget id="taboola-below-article-thumbnails"/>
						)}
					</RelatedContentContainer>
				</React.Fragment>
			) : (
				<React.Fragment>
					<PermalinkPost
						canonicalHost={(parentBlog || blog).canonicalHost}
						category={starterPost.categoryData}
						links={links}
						embeddedVideos={embeddedVideos}
						postBody={starterPost.body.map(node => parseNode(node))}
						postNeighbors={postNeighbors}
						storyType={storyType}
						specialSectionBlog={specialSectionBlog}
						specialSectionData={specialSectionData}
						adsEnabled={adsEnabled}
						features={features}
						post={starterPost}
						blog={blog}
						blogSales={blogSales}
						commercePermalinkPosts={commercePermalinkPosts}
					/>
					<PermalinkBelowPost {...props} />
				</React.Fragment>
			)}
			<SharingFooter facebookShareUrl={facebookShareUrl} twitterShareUrl={twitterShareUrl} />
		</React.Fragment>
	);
};

export default PermalinkContent;
