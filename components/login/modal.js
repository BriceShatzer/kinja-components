/* @flow */

import styled, { keyframes } from 'styled-components';
import media from '../../style-utils/media';
import Modal, { ScrollableContainer } from '../modal/modal';

const slideIn = keyframes`
	0% {
		opacity: 0;
		transform: translate(-50%, calc(-50% + 30px)) scale(0.95);
		perspective: 100px;
	}

	100% {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
`;

export default styled(Modal)`
	min-width: initial;
	min-height: initial;
	padding: 0;
	border-radius: 3px;
	will-change: transform, opacity;
	animation: ${slideIn} 0.3s cubic-bezier(0.2, 0.2, 0, 1);
	animation-fill-mode: forwards;
	max-height: 100vh;

	${media.largeUp`
		overflow: hidden;
	`}
	
	${media.largeDown`
		@media (orientation: landscape) {
			justify-content: flex-start;
		}
	`}

	${media.smallOnly`
		width: 100%;
		overflow-y: scroll;
		animation: none;
		animation-fill-mode: none;
		justify-content: flex-start;
		border-radius: unset;
	`}

	${ScrollableContainer} {
		padding: 0;
	}
`;
