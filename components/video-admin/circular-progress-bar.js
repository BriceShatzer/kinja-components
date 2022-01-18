// @flow

import * as React from 'react';
import styled from 'styled-components';

import { defaultTheme } from '../theme';

const StyledSvg = styled.svg`
	width: 100%;
	max-width: 20px;
	vertical-align: middle;
	overflow: hidden;

	path {
		vector-effect: unset;
	}
`;

const CircularProgressBarTrail = styled.path`
	stroke: ${defaultTheme.color.lightgray};
	stroke-linecap: butt;
	stroke-dasharray: 157.08px, 157.08px;
	stroke-dashoffset: 0;
`;

const CircularProgressBarPath = styled.path`
	stroke: ${defaultTheme.color.darksmoke};
	transition: stroke-dashoffset 2.5s ease 0s;
	stroke-linecap: butt;
	stroke-dasharray: 157.08px, 157.08px;
	stroke-dashoffset: 157.08;
`;

const diameter = 157.07963267948966;
const getPathRatio = (progress: number) => {
	const boundedValue = Math.min(Math.max(progress, 0), 100);
	return boundedValue / 100;
};

export default function CircularProgressBar({
	progress = 0
}: {
	progress: number
}) {
	const pathRatio = getPathRatio(progress);
	const dashRatio = pathRatio * 1;
	const gapLength = (1 - dashRatio) * diameter;

	return (
		<StyledSvg
			className="CircularProgressbar "
			viewBox="0 0 100 100"
			data-test-id="CircularProgressbar"
		>
			<CircularProgressBarTrail
				className="CircularProgressbar-trail"
				d="M 50,50 m 0,-25 a 25,25 0 1 1 0,50 a 25,25 0 1 1 0,-50"
				strokeWidth="50"
				fillOpacity="0"
			/>
			<CircularProgressBarPath className="CircularProgressbar-path"
				d="M 50,50 m 0,-25 a 25,25 0 1 1 0,50 a 25,25 0 1 1 0,-50"
				strokeWidth="50"
				fillOpacity="0"
				style={{
					strokeDasharray: `${diameter}px ${diameter}px`,
					strokeDashoffset: `${gapLength}px`
				}}
			/>
		</StyledSvg>
	);
}