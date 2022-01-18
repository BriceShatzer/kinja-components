/* @flow */

import styled from 'styled-components';
import { KinjaFormFieldWrapper } from '../form/textfield18/textfield';
import { Wrapper } from '../form/field/field';
import media from '../../style-utils/media';
import withFade from '../../style-utils/animation';
import { WithFloatingToolbarWrapper } from '../toolbar-floating/with-floating-toolbar';
import { ToolbarWrapper } from '../toolbar-floating/floating-toolbar';

// Lunchbox layout styled component wrappers. Can be overridden as more layouts are added.
// Styles are shared between the read only and editable version of components.

/*
 * Lunchbox Wrapper Styles
 */

export const LunchboxContainer = styled.section`
	background-color: ${({ backgroundColor, theme }) => (backgroundColor ? backgroundColor : theme.color.white)};
	position: relative;
	width: 100%;
`;

export const LunchboxInnerContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column-reverse;
	justify-content: center;
	position: static;
	margin: auto;
	max-width: 1216px;
	width: 100%;
	padding: 48px;

	${media.largeUp`
		flex-direction: row;
	`}

	${media.mediumDown`
		padding: 40px;
	`}

	${media.smallOnly`
		padding: 40px 18px;
	`}
	${WithFloatingToolbarWrapper} {
		margin-bottom: 24px;
		${ToolbarWrapper} {
			margin: 16px;
		}
		${media.largeUp`
			margin-bottom: 0;
			width: 50%;
		`}
		div {
			width: 100%;
		}
	}
`;

/*
 * Lunchbox Image Layout Styles
 */
export const LunchboxImageWrapper = styled.div`
	position: relative;

	img {
		width: 100%;
	}

	${media.mediumDown`
		width: 100%;
	`}
`;

export const LunchboxImagePaddingWrapper = styled.div`
	img,
	video {
		position: ${({paddingBottom}) => paddingBottom ? 'absolute' : 'relative'};
	}

	padding-bottom: ${({paddingBottom}) => paddingBottom ? `${paddingBottom}%` : '0'};
`;

export const InlineImageWrapper = styled(LunchboxImageWrapper)`
	margin: auto;
	max-width: 1216px;
	width: 100%;
	padding: 48px;
`;

export const LunchboxImageInnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const FullBleedImageWrapper = styled(LunchboxImageWrapper)`
	width: 100%;
`;

export const ImagePlaceholder = styled(LunchboxImageWrapper)`
	align-items: center;
	border: 1px dotted ${({ theme }) => theme.color.lightgray};
	display: flex;
	justify-content: center;
	padding: 50px;
`;

export const FullbleedImagePlaceholder = styled(ImagePlaceholder)`
	width: 100%;
	margin: 20px;
`;

/*
 * Lunchbox Text Layout Styles
 */
export const LunchboxTextWrapper = styled.div`
	align-items: ${({ paragraphTextAlignment }) => (paragraphTextAlignment === 'Left' ? 'flex-start' : 'center')};
	display: flex;
	flex-direction: column;
	width: 100%;
	${media.largeUp`
		width: 50%;
	`}
	/* overiding form styles */
	label {
		margin-bottom: 0;
	}
	/* we're using an id here to override TextAreaAutoGrow styles */
	p,
	#Paragraph {
		border-bottom: none;
		font-size: 17px;
		line-height: 32px;
		margin-bottom: 24px;
		padding: 0;
		text-align: ${({ paragraphTextAlignment }) => (paragraphTextAlignment ? paragraphTextAlignment : 'center')};
		width: 100%;
	}
	h3,
	#Header {
		border-bottom: none;
		font-size: 28px;
		font-weight: 700;
		line-height: 1.3;
		margin-bottom: 8px;
		padding: 0;
		text-align: ${({ paragraphTextAlignment }) => (paragraphTextAlignment ? paragraphTextAlignment : 'center')};
		width: 100%;

		${media.largeUp`
			font-size: 36px;
			margin-bottom: 16px;
		`}

		${media.smallOnly`
			font-size: 26px;
		`}
	}
	${KinjaFormFieldWrapper} {
		width: 100%;
	}
	/* This too generic and should be changed */
	${Wrapper} {
		max-width: 100%;
	}

	h3 + a {
		margin-top: 8px;

		${media.smallOnly`
			margin-top: 16px;
		`}
	}
`;

/*
 * Lunchbox ImageText Layout Styles (includes Hero Layouts)
 */

export const LunchboxImageTextContainer = styled(LunchboxInnerContainer)``;

export const LunchboxImageTextContainerReversed = styled(LunchboxInnerContainer)`
	${media.largeUp`
		flex-direction: row-reverse;
	`}
`;

export const LunchboxImageTextVerticalContainer = styled(LunchboxInnerContainer)`
	img,
	video {
		width: 100%;
	}
	${LunchboxTextWrapper} {
		margin-top: 30px;
	}
	${media.largeUp`
		flex-direction: column-reverse;
	`}
	${InlineImageWrapper} {
		padding: 0;
	}
	${WithFloatingToolbarWrapper} {
		${media.largeUp`
			margin-bottom: 0;
			width: 100%;
		`}
	}
`;

export const LunchboxImageTextVerticalInvertedContainer = styled(LunchboxImageTextVerticalContainer)`
	${LunchboxTextWrapper} {
		margin-bottom: 30px;
	}
	${media.largeUp`
		flex-direction: column;
	`}
`;

export const LunchboxImageTextTextWrapper = styled(LunchboxTextWrapper)`
	align-items: ${({ paragraphTextAlignment }) => (paragraphTextAlignment === 'Left' ? 'flex-start' : 'center')};

	h3,
	#Header {
		font-size: 28px;
		line-height: 1.3;

		${media.largeUp`
			font-size: 36px;
		`}

		${media.smallOnly`
			font-size: 24px;
		`}
	}

	${KinjaFormFieldWrapper} {
		width: 100%;
	}
`;

export const AnimatedLunchboxImageTextTextWrapper = styled(LunchboxImageTextTextWrapper)`
	opacity: 0;

	${({ isVisible, origin, animateFirst }) => isVisible && (
		withFade({ durationMs: 800, delayMs: (animateFirst ? 0 : 200) , inOrOut: 'in', origin })
	)}
`;

export const LunchboxImageTextImageWrapper = styled(LunchboxImageWrapper)`
	margin-bottom: 24px;
	${media.largeUp`
		margin-bottom: 0;
		width: 50%;
	`}
`;

export const AnimatedLunchboxImageTextImageWrapper = styled(LunchboxImageTextImageWrapper)`
	opacity: 0;

	${({ isVisible, origin, animateFirst }) => isVisible && (
		withFade({ durationMs: 800, delayMs: (animateFirst ? 0 : 200) , inOrOut: 'in', origin })
	)}
`;

export const Gutter = styled.span`
	width: 0;
	${media.largeUp`
		width: 32px;
	`}
`;
