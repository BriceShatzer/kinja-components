/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import imageUrl from 'kinja-images/imageUrl';
import type { ImageFormat } from 'postbody/Image';
import media from '../../style-utils/media';

const ParallaxImageDiv = styled.div`
	/* parallax effect styles */
	background-attachment: fixed;
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: url('');

	${media.largeUp`
		background-image: url('${props => props.source}');
		height: 100vh;
		width: 100vw;
	`}

	img {
		display: block;
		position: relative;
		visibility: visible;
		width: 100%;
		${media.largeUp`
			visibility: hidden;
		`}
	}
`;

type Props = {
	id: string,
	format?: ImageFormat,
	noAnimate?: boolean
}

const ParallaxImage = ({ id, format = 'jpg', noAnimate }: Props) => {
	const transformType = 'CenteredWideSuperLarge';
	const isAnimated = format.toLowerCase() === 'gif';
	const finalFormat = isAnimated && noAnimate ? 'jpg' : format;
	const superLargeSource = imageUrl(id, transformType, finalFormat);

	return (
		<ParallaxImageDiv source={superLargeSource}>
			<img src={superLargeSource} data-id={id}/>
		</ParallaxImageDiv>
	);
};

export default ParallaxImage;
