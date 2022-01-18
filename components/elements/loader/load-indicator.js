/* @flow */

import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const bouncedelay = keyframes`
	0%,
	80%,
	100% {
		transform: scale(0.8);
	}

	40% {
		transform: scale(1);
	}
`;

const One = styled.span``;
const Two = styled.span``;
const Three = styled.span``;

export const Spinner = styled.span`
	display: block;
	width: 62px;
	height: 18px;
	margin: auto;
	text-align: center;

	& > * {
		width: 18px;
		height: 18px;
		background-color: ${props => props.theme.color.midgray};
		border-radius: 100%;
		display: inline-block;
		animation: ${bouncedelay} 0.8s infinite ease-in-out;
		animation-fill-mode: both;
	}

	&& ${One} {
		animation-delay: -0.32s;
	}

	&& ${Two} {
		animation-delay: -0.16s;
	}
`;

const Loading = () => (
	<Spinner>
		<One />
		<Two />
		<Three />
	</Spinner>
);

export default Loading;
