/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import media from '../../style-utils/media';
import NukaCarousel from 'nuka-carousel';
import VideoImageOrThumbnail from 'kinja-components/components/story-cards-stream/figure/video-image-or-thumbnail';
import Headline from 'kinja-components/components/post-elements/headline';
import Button from 'kinja-components/components/buttons';
import ArrowRight from 'kinja-components/components/icon19/ArrowRight';
import ArrowLeft from 'kinja-components/components/icon19/ArrowLeft';
import Link from 'kinja-components/components/elements/link';

const StyledHeadline = styled(Headline)`
	font-size: 1rem;
	line-height: 1.3rem;
	margin-top: 8px;

	&:hover {
		text-decoration: underline;
	}
`;

type Props = {
	posts?: Array<*>,
	className?: string
};

const Items = styled.div`
	width: inherit;
	height: inherit;
	position: inherit;
	display: grid;
	grid-template-rows: minmax(232px, max-content);
`;

const Item = styled.div`
	display: static;
	height: inherit;
	${media.largeUp`
		display: grid;
		grid-template-rows: minmax(130px, auto);
	`}
`;

/* 42px icon, 2rem offset */
const StyledPrevButton = styled(Button)`
	position: absolute;
	top: -72px;
	left: calc(-42px + -2rem);
	margin: 0;
	padding: 0 11px;
`;

const StyledNextButton = styled(Button)`
	position: absolute;
	top: -72px;
	right: calc(-42px + -2rem);
	margin: 0;
	padding: 0 11px;
`;
/* 42px icon, 2rem offset */

function Carousel(props: Props) {
	const { posts, ...rest } = props;
	return posts && posts.length > 0 ? (
		<Items {...rest}>
			<NukaCarousel
				cellSpacing={32}
				disableEdgeSwiping
				edgeEasing={'linear'}
				enableKeyboardControls={false}
				frameOverflow={'normal'}
				initialSlideWidth={223}
				slidesToScroll={4}
				slidesToShow={4}
				slideHeight={'auto'}
				speed={300}
				// hooks
				renderAnnounceSlideMessage={() => null}
				renderTopCenterControls={() => null}
				renderCenterLeftControls={({ previousSlide, currentSlide, slideCount }) => slideCount > 4 ? (
					<StyledPrevButton
						icon={<ArrowLeft />}
						kind="circle"
						onClick={previousSlide}
						disabled={currentSlide === 0}
					/>
				) : null}
				renderCenterRightControls={({ nextSlide, currentSlide, slideCount, slidesToShow }) => slideCount > 4 ? (
					<StyledNextButton
						icon={<ArrowRight />}
						kind="circle"
						onClick={nextSlide}
						disabled={currentSlide === slideCount - slidesToShow}
					/>
				) : null}
				renderBottomCenterControls={() => null}
			>
				{posts.map((post, index) => {
					const showVideoThumbnail = post.isVideo;
					const thumbnail = post.image && {
						...post.image,
						id: post.image.uid || post.image.id
					};
					return thumbnail && (
						<Link
							key={thumbnail.id}
							href={post.permalink}
							events={[['Video Player Interaction', `Carousel click - position ${index}`, post.permalink]]}
						>
							<Item>
								{thumbnail && thumbnail.id && (
									<VideoImageOrThumbnail
										image={thumbnail}
										showVideoThumbnail={showVideoThumbnail}
										isLeftOfHeadline
										noLazy
									/>
								)}
								<StyledHeadline level="4">{post.headline}</StyledHeadline>
							</Item>
						</Link>
					);
				})}
			</NukaCarousel>
		</Items>
	) : null;
}

export default Carousel;
