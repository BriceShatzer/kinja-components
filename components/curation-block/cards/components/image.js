// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import styled from 'styled-components';
import VideoImageOrThumbnail from '../../../story-cards-stream/figure/video-image-or-thumbnail';
import type { SimpleImageJSON } from 'kinja-magma/models/SimpleImage';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import HeadlineImage from 'kinja-magma/models/HeadlineImage';

type Props = {
	post: Post,
	aboveHeadline?: boolean,
	draggable?: boolean | 'auto',
	sizes?: string,
	noLazy?: boolean,
	customImage?: ?SimpleImageJSON,
	className?: string
}

export const LazyLoadContainer = styled.div`
	padding-bottom: ${9 / 16 * 100}%;
	position: relative;
	height: 0;
`;

export const ImageWrapper = styled.div`
	overflow: hidden;
`;

export default function CardImage(props: Props) {
	const { post, aboveHeadline, draggable, sizes, customImage, noLazy, className } = props;
	const { leftOfHeadline } = post;

	const customHeadlineImage = React.useMemo(() => customImage ? new HeadlineImage({
		...leftOfHeadline,
		id: customImage.id,
		image: SimpleImage.fromJSON(customImage)
	}) : null, [customImage, leftOfHeadline]);

	if (!leftOfHeadline || (!leftOfHeadline && !customHeadlineImage)) {
		return null;
	}

	const showVideoThumbnail = !customImage && (leftOfHeadline.isVideo || post.isVideo);
	return (
		<ImageWrapper className={className}>
			<LazyLoadContainer className={showVideoThumbnail || noLazy ? '' : 'js_lazy-image'}>
				<VideoImageOrThumbnail
					image={customHeadlineImage || leftOfHeadline}
					isAboveHeadline={aboveHeadline || false}
					showVideoThumbnail={showVideoThumbnail}
					croppedImage={true}
					isLeftOfHeadline={!aboveHeadline}
					draggable={draggable}
					sizes={sizes}
					noLazy={noLazy}
				/>
			</LazyLoadContainer>
		</ImageWrapper>
	);
}