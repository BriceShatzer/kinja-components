// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';

type Props = {
	score: string
};

export const SmallSize = css`
	border: 1px solid ${props => props.theme.color.white};
	left: 0.25rem;
	top: 0.25rem;
	font-size: 0.75rem;
	line-height: 0.75rem;
	width: 1.5rem;
	height: 1.5rem;
`;

export const MediumSize = css`
	border: 2px solid ${props => props.theme.color.white};
	left: 0.5rem;
	top: 0.5rem;
	font-size: 1.125rem;
	line-height: 1.125rem;
	width: 2rem;
	height: 2rem;
`;

export const LargeSize = css`
	border: 2px solid ${props => props.theme.color.white};
	left: 1rem;
	top: 1rem;
	font-size: 1.5rem;
	line-height: 1.5rem;
	width: 3rem;
	height: 3rem;
`;

export const ReviewBadge = styled.div`
	background-color: ${props => props.theme.color.primary};
	border-radius: 50%;
	color: ${props => props.theme.color.white};
	font-family: ${props => props.theme.typography.headline.fontFamily};
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1;
	position: absolute;
`;

const Score = styled.div`
	transform: translate(1%, 2%);
	/* this is a manual visual adjustment to make review scores appear centered. */
	/* it's needed because fonts are vertically centered for lowercase letters, and review grades are uppercase. */
	/* the value is an approximation, bigger badges would require a bit more and smaller ones a bit less. */
`;

const ReviewScore = ({ score }: Props) =>
	<ReviewBadge>
		<Score>{score}</Score>
	</ReviewBadge>;

export default ReviewScore;
