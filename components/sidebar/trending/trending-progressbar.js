// @flow

import React from 'react';
import classNames from 'classnames';
import styled, { css, keyframes } from 'styled-components';
import range from 'lodash/range';

import { EnsureDefaultTheme } from '../../theme';

const progressScaled = keyframes`
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(0);
	}
`;

const progressScaledAnimation = props => css`
	animation: ${progressScaled} ${24000 / props.count}ms linear;
	animation-fill-mode: both;
`;

const Progress = styled.div`
	margin-bottom: 2px;
	margin-left: 1px;
	margin-right: 1px;
	display: flex;
`;

export const Segment = styled.div`
	flex: 1;
	height: 2px;
	position: relative;
	background-color: ${props => props.theme.color.midgray};
	overflow: hidden;
`;

const SegmentFill = styled.div`
	content: '';
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 1.5px;
	z-index: 1;
	left: 0;
	top: 0;
	bottom: 0;
	background-color: ${props => props.theme.color.gray};
	transform-origin: 0 0 0;
	transform: translateX(-100%);

	&.ticking {
		${progressScaledAnimation};
	}
`;

type Props = {
	count: number,
	activeItem: number,
	resetLoop: boolean,
	onNextTick: () => mixed
};

const TrendingProgressBar = (props: Props) => {
	const { count, activeItem, resetLoop, onNextTick } = props;

	return (
		<EnsureDefaultTheme>
			<Progress
				className="progress"
				onAnimationEnd={onNextTick}
			>
				{range(count).map(index =>
					<Segment
						key={index}
						count={count}
					>
						<SegmentFill
							className={classNames('segment', {
								ticking: index <= activeItem && !resetLoop
							})}
							count={count}
						/>
					</Segment>
				)}
			</Progress>
		</EnsureDefaultTheme>
	);
};

export default TrendingProgressBar;
