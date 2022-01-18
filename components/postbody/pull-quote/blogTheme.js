// @flow

import { css } from 'styled-components';
import type { BlogThemeName } from '../../theme/theme';
import media from '../../../style-utils/media';
import PullQuoteContent from './pull-quote-content';
import PullQuoteHelper from './pull-quote-helper';

/* eslint-disable max-len */
const avc = 'url(\'data:image/svg+xml;utf8,<svg width="33" height="23" viewBox="0 0 33 23" xmlns="http://www.w3.org/2000/svg"><title>avc-pq</title><path d="M22.725 4.39c-1.04 1.14-1.763 2.345-2.157 3.61-.274.894-.41 1.736-.41 2.53 0 .496.06 1.055.186 1.674 1.362-1.586 3.223-2.38 5.58-2.38 2.03 0 3.657.577 4.872 1.727 1.213 1.16 1.822 2.76 1.822 4.82 0 1.987-.656 3.58-1.97 4.78-1.316 1.204-3.038 1.806-5.17 1.806-1.34 0-2.53-.243-3.57-.723-1.043-.487-1.86-1.187-2.455-2.103-.573-.745-1.03-1.76-1.377-3.05-.348-1.29-.52-2.69-.52-4.204 0-2.652.682-5.094 2.044-7.326 1.362-2.23 3.37-3.956 6.025-5.17l.67 1.376c-1.34.62-2.53 1.502-3.57 2.64m-17.518 0C4.165 5.53 3.447 6.734 3.05 8c-.274.894-.41 1.736-.41 2.53 0 .496.062 1.055.188 1.674 1.362-1.586 3.22-2.38 5.578-2.38 2.032 0 3.66.577 4.872 1.727 1.215 1.16 1.822 2.76 1.822 4.82 0 1.987-.656 3.58-1.97 4.78-1.316 1.204-3.05 1.806-5.208 1.806-1.315 0-2.492-.243-3.533-.723-1.048-.487-1.86-1.187-2.46-2.103-.57-.77-1.035-1.795-1.395-3.07C.18 15.78 0 14.382 0 12.87c0-2.653.69-5.095 2.062-7.327 1.38-2.23 3.392-3.956 6.047-5.17l.66 1.377c-1.338.62-2.53 1.5-3.57 2.64" fill="%231C263C" fill-rule="evenodd"/></svg>\')';
const deadspinCarrot = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="4" viewBox="0 0 26 4"><title>deadspin-quote-carrot-aligned-w-bgr-2</title><path d="M10,3.5l3-3,3,3Z" style="fill:%23ffffff; stroke:%23ffffff;"/><path d="M0,3.5H10l3-3,3,3H26" style="fill:none; stroke:%231b3a4d;"/></svg>\')';
const deadspinTopLeft = 'url(\'data:image/svg+xml;utf8,<svg width="19" height="9" viewBox="0 0 19 9" xmlns="http://www.w3.org/2000/svg"><title>deadspin-quote-topleft</title><path d="M.5 8.5c0-4.43 3.655-8.054 8-8h10" stroke="%231B3A4D" fill="none" stroke-linecap="square" stroke-linejoin="round"/></svg>\')';
const earther = 'url(\'data:image/svg+xml;utf8,<svg width="30" height="30" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><title>pq-earther</title><path d="M4 0h36v8H8v32H0V0h4z" fill="%230075B2" fill-rule="evenodd"/></svg>\')';
const gizmodo = 'url(\'data:image/svg+xml;utf8,<svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg"><title>gizmodo-quote</title><g fill="none" fill-rule="evenodd"><path d="M41.95 20.974c0 11.583-9.392 20.974-20.976 20.974S0 32.558 0 20.974 9.39 0 20.974 0 41.95 9.39 41.95 20.974" fill="%2318AFED"/><path d="M21.8 21.422c0-6.874 3.744-9.434 9.622-9.623l.76 3.46c-3.178.38-4.74 1.894-4.647 4.453h3.51l-.002 9.245H21.8v-7.54zm-12.562 0c0-6.874 3.697-9.434 9.622-9.623l.71 3.46c-3.175.38-4.74 1.894-4.597 4.453h3.508l.004 9.245H9.238v-7.54z" fill="%23ffffff"/></g></svg>\')';
const jalopnikTop = 'url(\'data:image/svg+xml;utf8,<svg width="219" height="8" viewBox="0 0 219 8" xmlns="http://www.w3.org/2000/svg"><title>jalopnik - quote - top</title > <defs><linearGradient x1="0%" y1="50%" y2="50%" id="a"><stop stop-color="%23FFB200" offset="0%" /><stop stop-color="%23FF4E00" offset="100%" /></linearGradient></defs> <g fill="none" fill-rule="evenodd"><path fill="url%28%23a%29" transform="matrix%28-1 0 0 1 265 0%29" d="M46 0h170l3 4H49" /><path fill="%23FF4D00" d="M116 4H2L0 8h114" /></g></svg > \')';
const jalopnikBottom = 'url(\'data:image/svg+xml;utf8,<svg width="116" height="8" viewBox="0 0 116 8" xmlns="http://www.w3.org/2000/svg"><title>jalopnik - quote - bottom</title > <defs><linearGradient x1="0%" y1="50%" y2="50%" id="a"><stop stop-color="%23FFB200" offset="0%" /><stop stop-color="%23FF4E00" offset="100%" /></linearGradient></defs> <g fill="none" fill-rule="evenodd"><path fill="%23FF4D00" d="M116 0H48l-1 4h68" /><path fill="url(%23a)" transform="matrix(-1 0 0 1 84 0)" d="M0 4h83l1 4H1" /></g></svg > \')';
const jezebel = 'url(\'data:image/svg+xml;utf8,<svg width="23" height="18" viewBox="0 0 23 18" xmlns="http://www.w3.org/2000/svg"><title>jezbel - quote</title > <path d="M23 13.46c0 1.253-.45 2.323-1.345 3.21-.897.887-1.977 1.33-3.243 1.33-1.69 0-2.968-.548-3.837-1.644-.87-1.095-1.306-2.426-1.306-3.99 0-2.192.76-4.435 2.29-6.73C17.09 3.338 19.252 1.46 22.05 0L23 1.41c-1.32 1.147-2.36 2.347-3.125 3.598-.765 1.253-1.358 2.48-1.78 3.68 1.53.104 2.73.613 3.6 1.525.87.913 1.305 1.995 1.305 3.248m-12.385 0c0 1.258-.457 2.328-1.373 3.21-.915.89-2 1.33-3.256 1.33-1.622 0-2.878-.543-3.767-1.64-.89-1.1-1.34-2.43-1.34-3.99 0-2.194.756-4.437 2.273-6.73C4.677 3.335 6.85 1.46 9.673 0l.86 1.41c-1.305 1.147-2.34 2.347-3.1 3.598-.755 1.253-1.344 2.48-1.762 3.68 1.52.104 2.72.613 3.61 1.525.89.913 1.338 1.995 1.338 3.248" fill="%23EC1238" fill-rule="evenodd" /></svg > \')';
const kotakuTop = 'url(\'data:image/svg+xml;utf8,<svg width="244" height="7" viewBox="0 0 244 7" xmlns="http://www.w3.org/2000/svg"><title>kotaku - quote - top</title > <g fill="none" fill-rule="evenodd"><path d="M243 4H1" stroke="%23B12460" stroke-linecap="round" /><path d="M177.167 6.972c2.622.13 5.38-1.883 6.14-4.54L184 .022 64.833.002v.004c-2.622-.13-5.38 1.884-6.14 4.54L58 6.956l.01.044 119.157-.028z" fill="%23FBC000" /></g></svg > \')';
const kotakuBottom = 'url(\'data:image/svg+xml;utf8,<svg width="129" height="7" viewBox="0 0 129 7" xmlns="http://www.w3.org/2000/svg"><title>kotaku - quote - bottom</title > <g fill="none" fill-rule="evenodd"><path d="M128 4H1" stroke="%23B12460" stroke-linecap="round" /><path d="M81.075 6.972c2.657.13 5.452-1.883 6.224-4.54l.7-2.41-40.076-.02v.004c-2.657-.13-5.452 1.884-6.224 4.54l-.7 2.41.01.044 40.065-.028z" fill="%23FBC000" /></g></svg > \')';
const kotakuLeftTop = 'url(\'data:image/svg+xml;utf8,<svg width="243" height="7" viewBox="0 0 243 7" xmlns="http://www.w3.org/2000/svg"><title>kotaku - quote - lefttop</title > <g fill="none" fill-rule="evenodd"><path d="M242.5 3.688H.5" stroke="%23B12460" stroke-linecap="round" /><path d="M157.912 6.845c2.375.128 4.872-1.85 5.562-4.457L164.1.02 41.194.004v.003c-2.374-.128-4.87 1.85-5.56 4.457l-.628 2.367.01.043 122.896-.027z" fill="%23FBC000" /></g></svg > \')';
const kotakuLeftBottom = 'url(\'data:image/svg+xml;utf8,<svg width="117" height="7" viewBox="0 0 117 7" xmlns="http://www.w3.org/2000/svg"><title>kotaku - quote - leftbottom</title > <g fill="none" fill-rule="evenodd"><path d="M116.5 3.688H.5" stroke="%23B12460" stroke-linecap="round" /><path d="M74.912 6.845c2.375.128 4.872-1.85 5.562-4.457L81.1.02 41.194.004v.003c-2.374-.128-4.87 1.85-5.56 4.457l-.628 2.367.01.043 39.896-.027z" fill="%23FBC000" /></g></svg > \')';
const lifehacker = 'url(\'data:image/svg+xml;utf8,<svg width="46" height="36" viewBox="0 0 46 36" xmlns="http://www.w3.org/2000/svg"><title>lifehacker - quote</title > <path d="M36 0L25 18v18h21V17h-8l8-17M11 0L0 18v18h21V17h-8l8-17" fill="%2394B330" fill-rule="evenodd" /></svg > \')';
const splinter = 'url(\'data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>splinter - pq</title > <g fill="none" fill-rule="evenodd"><path fill="%23F85637" d="M0 32h32V0H0" /><path d="M14 7.466c-.015-.227.162-.42.39-.423L17.657 7c.233-.002.417.195.398.427C17.82 10.26 16.49 26.06 15.94 26.06c-.547 0-1.735-15.805-1.94-18.593z" fill="%23ffffff" /></g></svg > \')';
const therootGreen = 'url(\'data:image/svg+xml;utf8,<svg width="15" height="32" viewBox="0 0 15 32" xmlns="http://www.w3.org/2000/svg"><title>theroot - quote - green</title > <path d="M14.345 0H0v32h3.627" fill="%23509B22" fill-rule="evenodd" /></svg > \')';
const therootRed = 'url(\'data:image/svg+xml;utf8,<svg width="14" height="32" viewBox="0 0 14 32" xmlns="http://www.w3.org/2000/svg"><title>theroot - quote - red</title > <path d="M0 32h14V0h-4" fill="%23DD6634" fill-rule="evenodd" /></svg > \')';
const thetakeout = 'url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="79" height="33" aria-label="pq-thetakeout" viewBox="0 0 79 33"%3E%3Cdefs%3E%3Cpolygon id="takeout-new-a" points="22.7 0 22.7 18.4 0 18.4 0 0 22.7 0"/%3E%3C/defs%3E%3Cg fill="none" transform="translate(-30 -1)"%3E%3Cg transform="translate(58 15)"%3E%3Cmask id="takeout-new-b" fill="%23fff"%3E%3Cuse xlink:href="%23takeout-new-a"/%3E%3C/mask%3E%3Cpath fill="%23FBC000" d="M12.2 11.3c0-6.5 4.4-9.9 5.8-11 .4-.3.8-.5 1.3 0l1 1c.4.5.2 1-.1 1.4-.7.5-4.3 3.2-4.4 7.3 0 0 1-.4 2.5-.4 2.4 0 4.4 2 4.4 4.4 0 2.4-2 4.4-4.9 4.4-2.3 0-5.6-1.8-5.6-7.1M0 11.3C0 4.8 4.3 1.4 5.7.3c.5-.3.9-.5 1.4 0l.9 1c.4.5.3 1 0 1.4-.7.5-4.4 3.2-4.4 7.3 0 0 1-.4 2.4-.4 2.4 0 4.5 2 4.5 4.4 0 2.4-2 4.4-4.9 4.4-2.3 0-5.6-1.8-5.6-7.1" mask="url(%23takeout-new-b)"/%3E%3C/g%3E%3Cpath fill="%23FBC000" d="M106 8c-.3-4-3.6-7-7.5-7H40.3c-4 0-7.2 3-7.5 7L32 22.5c0 .8-.7 1.5-1.6 1.5H4a4 4 0 0 0-4 4v146.2a4 4 0 0 0 4 4h327.2a4 4 0 0 0 4-4V28.1a4 4 0 0 0-4-4H108.4c-.9 0-1.6-.7-1.6-1.5L106 7.9zm-.2 14.7a2.6 2.6 0 0 0 2.6 2.4h222.8a3 3 0 0 1 3 3v146.2a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V28.1a3 3 0 0 1 3-3h26.4c1.4 0 2.5-1 2.6-2.4L33.8 8c.3-3.4 3-6 6.5-6h58.2c3.4 0 6.2 2.6 6.5 6l.8 14.7z"/%3E%3C/g%3E%3C/svg%3E \')';
/* eslint-enable max-len */

export default (blog: BlogThemeName) => {
	switch (blog) {
		case 'avclub':
			return css`
				border: 2px solid ${props => props.theme.color.primaryLight};
				color: ${props => props.theme.color.logo};
				padding: 30px;
				position: relative;
				font-weight: normal;
				font-style: normal;

				&::before {
					border: 0;
					height: 30px;
					width: 40px;
					position: absolute;
					left: -14px;
					top: -14px;
					background-repeat: no-repeat;
					background-color: ${props => props.theme.color.white};
					background-image: ${avc};
				}

				&::after {
					display: none;
				}

				${props => props.alignment === 'Left' && css`
					text-align: center;

					${media.mediumUp`
						margin-bottom: 1rem;
					`}
				`}
			`;
		case 'deadspin':
			return css`
				border-top: 1px solid ${props => props.theme.color.pullquote};
				border-bottom: 1px solid ${props => props.theme.color.pullquote};
				color: ${props => props.theme.color.logo};
				padding: 30px 0;
				position: relative;
				font-size: 22px;
				line-height: 32px;
				font-weight: bold;
				text-align: center;

				${media.mediumUp`
					${props => props.alignment === 'Left' && css`
						margin-bottom: 1rem;
						text-align: center;
					`}
				`}

				&::before,
				&::after {
					border: 0;
					height: 4px;
					width: 26px;
					position: absolute;
					left: calc(50% - 13px);
					background-image: ${deadspinCarrot};
				}

				&::before {
					top: -4px;
				}

				&::after {
					bottom: -4px;
					transform: rotate(180deg);
				}

				${PullQuoteHelper} {
					display: block;
					position: absolute;
					width: 100%;

					&:first-child {
						top: 0;
					}

					&:last-child {
						bottom: 6px;
					}

					&::before,
					&::after {
						display: block;
						content: '';
						height: 9px;
						width: 18px;
						position: absolute;
						top: -1px;
						background-color: ${props => props.theme.color.white};
					}

					&::before {
						left: 0;
					}

					&::after {
						right: 0;
					}

					&:last-child::before,
					&:last-child::after {
						top: -2px;
					}

					&:first-child::before,
					&:first-child::after,
					&:last-child::before,
					&:last-child::after {
						background-image: ${deadspinTopLeft};
					}

					&:first-child::after {
						transform: scaleX(-1);
					}

					&:last-child::before {
						transform: scaleY(-1);
					}

					&:last-child::after {
						transform: rotate(180deg);
					}
				}
			`;
		case 'earther':
			return css`
				border-top: none;
				border-bottom: none;
				padding: 30px;
				position: relative;
				font-size: 22px;
				line-height: 32px;
				text-align: center;

				${props => props.alignment === 'Left' && css`
					${media.mediumUp`
						margin-bottom: 1rem;
						text-align: center;
					`}
				`}

				&::before,
				&::after {
					border: 0;
					height: 30px;
					width: 30px;
					position: absolute;
					background-image: ${earther};
					margin: 0;
				}

				&::before {
					top: 0;
					left: 0;
				}

				&::after {
					bottom: 0;
					right: 0;
					transform: rotate(180deg);
				}

				${PullQuoteContent} {
					padding: 0;
				}
			`;
		case 'gizmodo':
			return css`
				border-top: 2px solid ${props => props.theme.color.logo};
				border-bottom: 2px solid ${props => props.theme.color.logo};
				padding-top: 30px;
				padding-bottom: 30px;
				position: relative;

				&::before {
					border: 0;
					height: 42px;
					width: 42px;
					position: absolute;
					left: calc(50% - 21px);
					top: -21px;
					background-image: ${gizmodo};
				}

				&::after {
					display: none;
				}

				${props => props.alignment === 'Left' && css`
					${media.mediumUp`
						margin-bottom: 1rem;
						text-align: center;
					`}
				`}
			`;
		case 'jalopnik':
			return css`
				font-size: 22px;
				line-height: 32px;
				font-weight: bold;

				&::before,
				&::after {
					border: 0;
				}

				&::before {
					height: 8px;
					width: 219px;
					background-image: ${jalopnikTop};
				}

				&::after {
					height: 8px;
					width: 116px;
					background-image: ${jalopnikBottom};
				}

				${PullQuoteContent} {
					padding-left: 0;
					padding-right: 0;
				}
			`;
		case 'jezebel':
			return css`
				position: relative;
				padding: 36px 0;
				text-transform: uppercase;
				font-weight: 100;
				color: ${props => props.theme.color.primary};
				font-size: 31px;
				line-height: 33px;

				&::before,
				&::after {
					border: 0;
					display: block;
					content: '';
					position: absolute;
					width: 23px;
					height: 18px;
					left: calc(50% - 12px);
					background-image: ${jezebel};
				}

				&::before {
					top: -6px;
				}

				&::after {
					bottom: -6px;
					transform: rotate(180deg);
				}

				${PullQuoteContent} {
					padding-left: 0;
					padding-right: 0;
				}

				${PullQuoteHelper} {
					display: block;
					position: absolute;
					height: 7px;
					width: calc(50% - 20px);
					background-color: ${props => props.theme.color.pullquote};
					transform: skewX(-7deg);

					&:first-child {
						top: 0;
						left: 0;
					}

					&:last-child {
						bottom: 0;
						right: 0;
					}
				}

				${props => props.alignment === 'Left' && css`
					${media.mediumUp`
						padding: 31px 0 0;
						text-align: left;
						margin-bottom: 1rem;

						&::before,
						&::after,
						${PullQuoteHelper}:last-child {
							display: none;
						}
					`}
				`}
			`;
		case 'kotaku':
			return css`
				font-size: 22px;
				line-height: 32px;
				font-weight: bold;

				&::before,
				&::after {
					border: 0;
				}

				&::before {
					height: 7px;
					width: 244px;
					background-image: ${kotakuTop};
				}

				&::after {
					height: 7px;
					width: 129px;
					background-image: ${kotakuBottom};
				}

				${props => props.alignment === 'Left' && css`
					${media.mediumUp`

						&::before {
							background-image: ${kotakuLeftTop};
						}

						&::after {
							background-image: ${kotakuLeftBottom};
						}
					`}
				`}

				${PullQuoteContent} {
					padding-left: 0;
					padding-right: 0;
				}
			`;
		case 'lifehacker':
			return css`
				padding: 0 23px 0 61px;
				text-align: left;
				max-width: 400px;

				&::before,
				&::after {
					display: none;
				}

				${PullQuoteContent} {
					display: inline;
					background-color: ${props => props.theme.color.primary};
					box-shadow:
						10px 0 0 ${props => props.theme.color.primary},
						-10px 0 0 ${props => props.theme.color.primary};
					box-decoration-break: clone;
					color: white;
					padding: 4px 0 3px;
					line-height: 40px;
					position: relative;

					&::before,
					&::after {
						display: block;
						content: '';
						position: absolute;
					}

					&::before {
						width: 46px;
						height: 36px;
						left: -61px;
						top: 0;
						background-image: ${lifehacker};
					}

					&::after {
						width: 10px;
						height: 36px;
						background-color: ${props => props.theme.color.primaryLight};
						right: -23px;
						bottom: 0;
					}
				}

				${props => props.alignment === 'Left' && css`
					${media.mediumUp`
						margin-bottom: 1rem;
					`}
				`}
			`;
		case 'splinter':
			return css`
				border-top: 4px solid ${props => props.theme.color.logo};
				padding-top: 30px;
				padding-bottom: 0;
				position: relative;
				font-weight: bold;
				font-style: normal;

				&::before {
					border: 0;
					height: 32px;
					width: 32px;
					position: absolute;
					left: calc(50% - 18px);
					top: -18px;
					background-image: ${splinter};
				}

				&::after {
					display: none;
				}

				${props => props.alignment === 'Left' && css`
					${media.mediumUp`
						margin-bottom: 1rem;
					`}
				`}
			`;
		case 'theroot':
			return css`
				padding: 0 20px;
				max-width: 400px;

				&::before,
				&::after {
					display: none;
				}

				${PullQuoteContent} {
					display: inline;
					background-color: ${props => props.theme.color.black};
					box-shadow:
						20px 0 0 ${props => props.theme.color.black},
						-20px 0 0 ${props => props.theme.color.black};
					box-decoration-break: clone;
					color: ${props => props.theme.color.white};
					padding: 1px 0;
					line-height: 37px;
					font-size: 26px;
					font-weight: normal;
					font-style: normal;
					position: relative;

					&::before,
					&::after {
						display: block;
						content: '';
						position: absolute;
					}

					&::before {
						width: 15px;
						height: 32px;
						left: -20px;
						top: 0;
						background-image: ${therootGreen};
					}

					&::after {
						width: 14px;
						height: 32px;
						right: -20px;
						bottom: 0;
						background-image: ${therootRed};
					}
				}

				${props => props.alignment === 'Left' && css`
					${media.mediumUp`
						margin-bottom: 1rem;
					`}
				`}
			`;
		case 'theonion':
			return css`
				border-top: none;
				border-bottom: 8px solid ${props => props.theme.color.primary};
				padding: 0 0 30px;
				position: relative;
				font-size: 28px;
				line-height: 1.3;
				text-align: left;
				font-family: ${props => props.theme.typography.serif.fontFamily};
				font-weight: bold;
				color: ${props => props.theme.color.primary};

				${media.mediumUp`
					${props => props.alignment === 'Left' && css`
						margin-top: 0;
					`}
				`}

				&::before,
				&::after {
					display: none;
				}

				${PullQuoteContent} {
					padding: 0;
				}
			`;
		case 'thetakeout':
			return css`
				padding: 30px;
				max-width: 400px;
				border: 1px solid ${props => props.theme.color.primaryLight};
				border-radius: 5px;
				font-style: normal;
				text-align: left;
				position: relative;
				margin-top: 3rem;

				${media.smallOnly`
					margin-top: 3rem;
				`}

				&::after {
					display: none;
				}

				&::before {
					border: 0;
					display: block;
					content: '';
					position: absolute;
					margin: 0;
					width: 79px;
					height: 33px;
					background-color: ${props => props.theme.color.white};
					background-image: ${thetakeout};
					left: 30px;
					top: -24px;
				}

				${PullQuoteContent} {
					padding: 0;
				}

				${props => props.alignment === 'Left' && css`
					${media.mediumUp`
						margin-top: 1.5rem;
						margin-bottom: 1rem;
					`}

					${media.smallOnly`
						margin-top: 3rem;
					`}
				`}
			`;
		default:
			return;
	}
};
