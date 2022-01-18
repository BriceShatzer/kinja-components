/* @flow */

import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import media from '../../style-utils/media';

type Props = {
	onClick: () => void,
	onAnimationEnd: () => void,
	duration: string,
	isVisible: boolean,
	inSidebar: boolean
};

const fillFromLeft = keyframes`
	from {
		transform: translate(-100%, 0);
	}

	to {
		transform: translate(0, 0);
	}
`;

const fillFromLeftAnimation = props => css`
	animation-name: ${fillFromLeft};
	animation-duration: ${props.duration};
	animation-timing-function: linear;
`;

const Container = styled.div`
	${media.smallOnly`
		display: inline-block;
		background: ${props => props.theme.color.primary};
		border-radius: 50%;
		width: 32px;
		height: 32px;
		margin: 0 5px;
		line-height: 32px;
	`}

	${props => props.inSidebar && css`
		display: inline-block;
		background: ${props => props.theme.color.primary};
		border-radius: 50%;
		width: 32px;
		height: 32px;
		margin: 0 5px;
		line-height: 32px;
	`}
`;

const SVG = styled.svg.attrs({
	viewBox: '0 0 48 60'
})`
	overflow: visible;
	width: 48px;
	height: 60px;
	display: inline-block;
	vertical-align: middle;
	cursor: pointer;

	${media.smallOnly`
		width: 12px;
		height: 16px;
		margin-left: 1px;
	`}

	${props => props.inSidebar && css`
		width: 12px;
		height: 16px;
		margin-left: 1px;
	`}
`;
SVG.displayName = 'PlayButtonSVG';

const Border = styled.polygon.attrs({
	points: '0,0 48,30 0,60'
})`
	stroke: white;
	stroke-width: 2px;
	stroke-linecap: round;
	stroke-linejoin: round;
	fill: none;

	${media.smallOnly`
		stroke-width: 4px;
	`}

	${props => props.inSidebar && css`
		stroke-width: 4px;
	`}
`;

const Fill = styled.rect.attrs({
	x: '0',
	y: '0',
	width: '100%',
	height: '100%'
})`
	${fillFromLeftAnimation};
	fill: white;
	animation-play-state: ${props => props.isVisible ? 'running' : 'paused'};
`;
Fill.displayName = 'PlayButtonFill';

const PlayButton = ({
	onClick,
	onAnimationEnd,
	duration,
	isVisible = true,
	inSidebar
}: Props) => (
	<EnsureDefaultTheme>
		<Container inSidebar={inSidebar}>
			<SVG onClick={onClick} inSidebar={inSidebar}>
				<defs>
					<clipPath id="play-button__clip">
						<polygon points="0,0 48,30 0,60"></polygon>
					</clipPath>
				</defs>
				<Border inSidebar={inSidebar} />
				<g clipPath="url(#play-button__clip)">
					<Fill
						duration={duration}
						onAnimationEnd={onAnimationEnd}
						isVisible={isVisible}
					/>
				</g>
			</SVG>
		</Container>
	</EnsureDefaultTheme>
);

export default PlayButton;
