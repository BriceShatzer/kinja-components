import { css } from 'styled-components';
export default function aspectRatio(width, height, selector) {
	return css`
		position: relative;
		&::after {
			content: '';
			display: block;
			padding-top: calc((${height} / ${width}) * 100%);
			width: 100%;
		}
		> ${selector} {
			bottom: 0;
			left: 0;
			position: absolute;
			right: 0;
			top: 0;
		}
	`;
}
