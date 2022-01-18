// @flow

import React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../../theme';
import PopularPostOverlay, { Overlay } from '../popular-posts/popular-post-overlay';
import Image from '../../elements/image';
import placeholderImage from 'kinja-images/placeholderImage';
import { LazyResponsiveImage, MAX_SIDEBAR_IMAGE_WIDTH } from '../../elements/image';
import { imageFormatFromString } from 'postbody/Image';
import type SidebarPost from 'kinja-magma/models/SidebarPost';

export const Image16by9Container = styled.div`
	height: 0;
	width: 100%;
	padding-bottom: 56.25%;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-color: ${props => props.theme.color.whitesmoke};
	overflow: hidden;
	position: relative;

	&:hover ${Overlay} {
		bottom: 0;
	}

	img,
	video {
		width: 100%;
	}
`;

type Props = {
	post: SidebarPost,
	withOverlay?: boolean,
	hideRecommendations?: boolean,
	hideViewcounts?: boolean,
	commentsDisabled?: boolean,
	blogGroup: string
};

const SidebarImage = (props: Props) => {
	const { post,
		withOverlay,
		hideRecommendations,
		hideViewcounts,
		commentsDisabled,
		blogGroup
	} = props;
	const { image } = post;

	const contents = () => {
		if (image && image.format) {
			return (
				<LazyResponsiveImage
					alt={post.headline}
					ariaLabel={post.headline}
					format={imageFormatFromString(image.format || '')}
					width={MAX_SIDEBAR_IMAGE_WIDTH}
					id={image.id}
					transform="KinjaCenteredLargeAuto"
					croppedImage
				/>
			);
		} else {
			return null;
		}
	};

	if (image && image.format) {
		return (
			<EnsureDefaultTheme>
				<Image16by9Container className='js_lazy-image'>
					{withOverlay &&
					<PopularPostOverlay
						post={post}
						hideRecommendations={hideRecommendations}
						hideViewcounts={hideViewcounts}
						commentsDisabled={commentsDisabled}
					/>}
					{contents()}
				</Image16by9Container>
			</EnsureDefaultTheme>
		);
	} else {
		return <Image
			noLazy
			source={placeholderImage(blogGroup)}
		/>;
	}
};

export default SidebarImage;
