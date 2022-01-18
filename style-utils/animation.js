// @flow

import { keyframes, css } from 'styled-components';
import media from './media';
export type Origin = 'left' | 'right' | 'top' | 'bottom';
export type InOrOut = 'in' | 'out';

function getStartingTranslate(inOrOut: InOrOut, origin: Origin) {
	if (inOrOut === 'out') {
		return 'translate3d(0,0,0)';
	}

	switch (origin) {
		case 'left': {
			return 'translate3d(-2vw,0,0)';
		}
		case 'right': {
			return 'translate3d(2vw,0,0)';
		}
		case 'top': {
			return 'translate3d(0,-2vw,0)';
		}
		case 'bottom': {
			return 'translate3d(0,2vw,0)';
		}
	}
	return 'translate3d(0,0,0)';
}

function getEndingTranslate(inOrOut: InOrOut, origin: Origin) {
	if (inOrOut === 'in') {
		return 'translate3d(0,0,0)';
	}

	switch (origin) {
		case 'left': {
			return 'translate3d(-2vw,0,0)';
		}
		case 'right': {
			return 'translate3d(2vw,0,0)';
		}
		case 'top': {
			return 'translate3d(0,-2vw,0)';
		}
		case 'bottom': {
			return 'translate3d(0,2vw,0)';
		}
	}
	return 'translate3d(0,0,0)';
}

/*
 * produces necessary keyframes for the fade.
 */
function getFadeKeyframes(inOrOut: InOrOut, origin: ?Origin) {
	return keyframes`
	from {
		${origin ? `transform: ${getStartingTranslate(inOrOut, origin)};` : ''}
		opacity: ${inOrOut === 'in' ? '0' : '1'};
	}
	to {
		${origin ? `transform: ${getEndingTranslate(inOrOut, origin)};` : ''}
		opacity: ${inOrOut === 'in' ? '1' : '0'};
	}
`;
}

/*
 * a css mixin to add a fade-in to a styled-component of your choice.
 * Note that the fade will occur when the DOM element is rendered, not when it scrolls into view,
 * so you might want to reach for the scrollIntoView HOC instead of using this mixin directly.
 */
export default function withFade({ inOrOut, durationMs, delayMs, origin }: {
	inOrOut: InOrOut,
	durationMs: number,
	delayMs: number,
	origin: ?Origin
}) {
	return css`
		animation: ${getFadeKeyframes(inOrOut)} ${durationMs}ms cubic-bezier(0.215, 0.61, 0.355, 1) ${delayMs}ms 1 both;
		opacity: ${inOrOut === 'in' ? 1 : 0};

		${media.largeUp`
			animation: ${getFadeKeyframes(inOrOut, origin)} ${durationMs}ms cubic-bezier(0.215, 0.61, 0.355, 1) ${delayMs}ms 1 both;
		`}
	`;
}
