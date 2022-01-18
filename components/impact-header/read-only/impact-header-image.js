/* @flow */
import * as React from 'react';
import media from '../../../style-utils/media';
import styled from 'styled-components';
import imageUrl from 'kinja-images';
import type { ImageProperties } from 'postbody/Image';
import Video from '../../elements/video';
import Image from '../../elements/image';

const ImpactHeaderImageContainer = styled.div`
	background-attachment: fixed;
	background-size: cover;
	background-position: top center;
	background-repeat: no-repeat;
	height: 100vh;
	padding-bottom: ${({ featuredMedia }) => Math.floor((featuredMedia.height / featuredMedia.width) * 100)}%;
	background-image: ${({ featuredMedia, imageUrl }) => `url(${imageUrl(featuredMedia.id, 'WideSuperLargeAuto', featuredMedia.format)})`};

	@media (max-width: 768px) {
		background-image: ${({ featuredMedia, imageUrl }) => `url(${imageUrl(featuredMedia.id, 'KinjaCenteredMediumAuto', featuredMedia.format)})`};
	}

	picture {
		visibility: hidden;
	}

	${media.largeDown`background-attachment: scroll;`};
`;

const FullWidthImage = styled(Image)`
	width: 100%;
`;

type ImpactHeaderImageProps = {
	featuredMedia: ImageProperties,
	inline?: boolean
};

const ImpactHeaderImage = (props: ImpactHeaderImageProps) => {
	const { featuredMedia, inline } = props;
	const isAnimated = featuredMedia.format === 'gif';
	return inline ? (
		<FullWidthImage
			noLazy
			id={featuredMedia.id}
			format={featuredMedia.format}
			transform="WideSuperLargeAuto"
		/>
	) : (
		<ImpactHeaderImageContainer
			featuredMedia={featuredMedia}
			imageUrl={imageUrl}
		>
			{isAnimated && (
				<Video
					videoOptions={['autoPlay', 'playsInline', 'loop', 'muted']}
					id={featuredMedia.id}
					posterFormat={'jpg'}
					posterTransform={'WideSuperLargeAutoFrozen'}
				/>
			)}
		</ImpactHeaderImageContainer>
	);
};

export default ImpactHeaderImage;
