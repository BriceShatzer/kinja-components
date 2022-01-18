// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { PermalinkProps } from '../';
import PermalinkPost from '../../post-elements/permalink-post';
import { parseNode } from 'postbody/BlockNode';
import { parseSlides } from 'postbody/utils/slideshow-utils';
import media from '../../../style-utils/media';
import { MobileInPostAd } from '../../ad-slot/ads';
import PermalinkMeta from '../permalink-meta';
import PermalinkHeader from '../permalink-header';
import { shareToolsClassname } from '../../share-toolbar/share-toolbar-container';
import CommerceDisclaimer from '../../post-elements/commerce-disclaimer';
import PermalinkBelowPost from '../permalink-below-post';

const Slide = styled.section`
	${media.largeUp`
		display: none;

		&.active {
			display: block;
		}
	`}
`;

const MetaContainer = styled.div`
	margin-bottom: 24px;

	.${shareToolsClassname} {
		${media.largeUp`
			display: none;
		`}
	}
`;

const SlideshowPermalink = (props: PermalinkProps) => {

	const {
		blog,
		blogSales,
		features,
		links,
		embeddedVideos,
		parentBlog,
		postNeighbors,
		specialSectionBlog,
		specialSectionData,
		starterPost,
		slideIndex,
		isDraft
	} = props;

	const nodes = starterPost.body ? starterPost.body.map(node => parseNode(node)) : [];
	const slides = parseSlides(nodes);
	const indexToShow = typeof slideIndex !== 'number' ? 0 : Math.max(Math.min(slideIndex - 1, slides.length), 0);

	return (
		<>
			{slides.map<React.Node>((slide, index) => (
				<Slide
					key={index} // eslint-disable-line react/no-array-index-key
					className={`js_slide ${indexToShow === index ? 'active' : ''}`}
				>
					{index === 0 && (
						<>
							{blog && blog.isCommerce && !starterPost.sponsored && <CommerceDisclaimer locale={blog.locale} />}
							<PermalinkHeader starterPost={starterPost} blog={blog} isDraft={isDraft || null} />
							<MetaContainer>
								<PermalinkMeta {...props} />
							</MetaContainer>
						</>
					)}
					<PermalinkPost
						canonicalHost={(parentBlog || blog).canonicalHost}
						category={starterPost.categoryData}
						links={links}
						embeddedVideos={embeddedVideos}
						postBody={slide.nodes}
						postNeighbors={postNeighbors}
						specialSectionBlog={specialSectionBlog}
						specialSectionData={specialSectionData}
						adsEnabled={false}
						features={features}
						post={starterPost}
						blog={blog}
						blogSales={blogSales}
						storyType={index === 0 ? starterPost.storyType : undefined}
					/>
					<MobileInPostAd />
				</Slide>
			))}
			<Slide key="final-slide" className={`js_slide ${indexToShow === slides.length ? 'active' : ''}`} >
				<PermalinkBelowPost {...props} hideShareFooter />
			</Slide>
		</>
	);
};

export default SlideshowPermalink;