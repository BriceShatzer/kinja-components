// @flow

import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';
import classnames from 'classnames';

import media from '../../style-utils/media';
import { LazyResponsiveImage } from '../elements/image';
import { EnsureDefaultTheme } from '../theme';
import { PlayIconSVG, PlayIconContainer } from '../video-player/video-player';

type Props = {
	thumbnailId: string,
	nowPlaying?: boolean,
	standalone?: boolean,
	width?: number,
	preventFullsize?: boolean,
	className?: string,
	height?: number,
	preventFullsize?: boolean,
	draggable?: boolean | 'auto',
	sizes?: string,
	noLazy?: boolean
};

const Container = styled.div`
	padding-bottom: ${9 / 16 * 100}%;
	position: relative;
	width: 100%;
	height: 0;
	overflow: hidden;
`;

export const Wrapper = styled.div`
	position: relative;
`;

const ThumbOverlay = styled.div`
	position: absolute;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.55);
	transition: all 0.2s ease-in;
	transform-origin: center;

	${media.smallOnly`
		svg {
			width: 18px;
			height: 18px;
			stroke-width: 1px;
		}
	`}

	${props => props.fullSize && media.smallOnly`
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	`}

	${props => !props.nowPlaying && !props.fullSize && media.smallOnly`
		width: 37px;
		height: 37px;
		left: calc(50% - 18.5px);
		top: calc(50% - 18.5px);
		right: calc(50% + 18.5px);
		bottom: calc(50% + 18.5px);
		border-radius: 10px;
	`}

	${props => !props.nowPlaying && media.mediumUp`
		width: ${props => props.overlaySize};
		height: ${props => props.overlaySize};
		left: calc(50% - (${props => props.overlaySize} / 2));
		top: calc(50% - (${props => props.overlaySize} / 2));
		right: calc(50% + (${props => props.overlaySize} / 2));
		bottom: calc(50% + (${props => props.overlaySize} / 2));
		border-radius: 10px;
	`}

	${props => props.nowPlaying && `
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	`}

	svg {
		color: ${({ theme }) => theme.color.white};
	}
`;

const fadeIn = keyframes`
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
`;

const fadeInAnimation = css`
	animation: ${fadeIn} 0.5s;
`;

const PlayingLabel = styled.div`
	color: ${props => props.theme.color.white};
	text-transform: uppercase;
	font-size: 15px;
	${fadeInAnimation};

	${media.smallOnly`
		font-size: 12px;
	`}
`;

const FullHeightPlayIconContainer = styled(PlayIconContainer)`
	.icon {
		padding-top: 0;
	}
`;

const VideoThumbnail = ({
	thumbnailId,
	nowPlaying,
	width,
	preventFullsize,
	className,
	height,
	draggable,
	sizes,
	noLazy
}: Props) => (
	<EnsureDefaultTheme>
		<Wrapper>
			<Container className={noLazy ? '' : classnames(className, { 'js_lazy-image': true })}>
				<LazyResponsiveImage
					id={thumbnailId}
					width={width}
					height={height}
					relative={false}
					croppedImage
					isVideo
					draggable={draggable}
					sizes={sizes}
					noLazy={noLazy}
				/>
			</Container>
			{nowPlaying ?
				<ThumbOverlay fullSize={!preventFullsize} nowPlaying={nowPlaying} overlaySize="37px">
					<PlayingLabel>Now playing</PlayingLabel>
				</ThumbOverlay>
				: <FullHeightPlayIconContainer dangerouslySetInnerHTML={{__html: PlayIconSVG}} />
			}
		</Wrapper>
	</EnsureDefaultTheme>
);

export default VideoThumbnail;
