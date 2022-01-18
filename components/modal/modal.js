/* @flow */

import * as React from 'react';
import CloseIcon from '../icon19/Close';
import { Loading } from 'kinja-components/components/elements/loader';
import styled, { css, keyframes } from 'styled-components';
import { transparentize } from 'polished';
import { EnsureDefaultTheme } from '../theme';
import media from '../../style-utils/media';

export type ModalProps = {
	blur?: boolean,
	children?: React.Node,
	fullscreen?: boolean,
	isOpen?: boolean,
	closeOnBodyClick?: boolean,
	onClose?: () => void,
	transparent?: boolean,
	contentDirection?: string,
	showBackground?: boolean,
	scrollable?: boolean,
	showPreloader?: boolean,
	backgroundColor?: string,
	isLightbox?: boolean,
	animatedBackground?: boolean,
	label?: string,
	overflow?: 'auto' | 'hidden'
};

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}

	100% {
		opacity: 0.97;
	}
`;

const FullscreenContainer = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	${({animatedBackground}) => animatedBackground && css`
		will-change: opacity;
		animation: ${fadeIn} 0.3s cubic-bezier(0.2, 0.2, 0, 1);
		animation-fill-mode: forwards;
	`}
	z-index: 300;
	top: 0;
	left: 0;
	pointer-events: none;
	background: ${({backgroundColor, theme}) => backgroundColor && backgroundColor || theme.color.white};
`;

export const ScrollableContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	padding: 2rem;

	> * {
		margin: 0 auto;
	}
`;

export const ChildrenWrapper = styled.div`
	opacity: 0;
	transition: 0.4s opacity;

	${({ showChildren }) => showChildren && css`
		opacity: 1;
	`}
`;

export const Container = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.05);
	min-width: 320px;
	min-height: 320px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 999;
	padding: 2rem;
	background: ${({backgroundColor, theme}) => backgroundColor || theme.color.white};
	color: ${({backgroundColor, theme}) =>
		backgroundColor && (backgroundColor === theme.color.blackOverlay || theme.color.darkBlackOverlay)
			? theme.color.whiteOverlay : theme.color.bodytext};
	border: 1px solid ${({ theme }) => theme.color.lightgray};

	${({ isLightbox }) => isLightbox && css`
		img,
		video {
			max-height: 80%;
		}
	`}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: ${({backgroundColor, theme}) =>
		backgroundColor && (backgroundColor === theme.color.blackOverlay || theme.color.darkBlackOverlay)
			? theme.color.whiteOverlay : theme.color.bodytext};
	}

	${({ overflow }) => overflow && css`
		overflow: ${overflow};
	`}

	${ChildrenWrapper} {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		${({ isLightbox }) => isLightbox && css`
			div {
				margin: 5px 10px;
				max-height: 80%;

				img,
				video {
					max-height: 100%;
				}
			}

			${media.mediumDown`
				img,
				video {
					max-height: 100%;
				}
			`}
		`}
	}

	${({ contentDirection }) => contentDirection && css`
		flex-direction: ${contentDirection};
	`}

	${({ transparent, theme }) => transparent && css`
		background: ${transparentize(0.05, theme.color.white)};
	`}

	${({ blur, theme }) => blur && css`
		background: ${transparentize(0.6, theme.color.black)};
	`}

	${({ regular }) => regular && css`
		padding: 30px 40px;
		width: 50%;
	`}

	${({ fullscreen }) => fullscreen && css`
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		transform: none;
	`}

	${({ contentPadding }) => contentPadding && css`
		padding: 100px 0;
		width: 100%;
	`}

	${({ contentPadding, regular }) => contentPadding && regular && css`
		padding: 100px 50px;
		width: 50%;
	`}

	${({ scrollable }) => scrollable && css`
		padding: 0;
	`}

	${media.mediumDown`
		${({ regular }) => regular && css`
			height: 100%;
			width: 100%;
		`}

		${({ isLightbox }) => isLightbox && css`
			padding: 20px 0;

		`}
	`}
`;

export const Close = styled.div`
	position: absolute;
	top: 35px;
	right: 30px;
	cursor: pointer;

	${({ overflow }) => overflow === 'auto' && css`
		position: fixed;
	`};

	${({ backgroundColor, theme }) => backgroundColor
		&& (backgroundColor === theme.color.blackOverlay || theme.color.darkBlackOverlay) && css`
		svg {
			opacity: 0.7;
			color: ${theme.color.white};
		}
	`}
`;

const PreloaderWrapper = styled.div`
	position: absolute;
`;

const stopPropagation = (event: SyntheticMouseEvent<HTMLDivElement>) => event.stopPropagation();

const Modal = (props: ModalProps) => {
	const {contentDirection = 'column',
		showBackground = true,
		closeOnBodyClick = false,
		backgroundColor,
		isLightbox = false,
		onClose,
		showPreloader,
		animatedBackground = true,
		overflow}  = props;
	const containerProps = {
		backgroundColor,
		isLightbox,
		contentDirection,
		...props,
		onClick: stopPropagation,
		onDragStart: stopPropagation,
		onDragEnter: stopPropagation,
		onDragEnd: stopPropagation,
		onDragOver: stopPropagation,
		onDragLeave: stopPropagation,
		onDrop: stopPropagation,
		onWheel: stopPropagation
	};

	if (!props.isOpen) {
		return null;
	} else {
		const children = props.scrollable ? <ScrollableContainer>{props.children}</ScrollableContainer> : props.children;

		return (
			<EnsureDefaultTheme>
				<React.Fragment>
					<Container {...containerProps}
						onClick={closeOnBodyClick ? onClose : undefined}>
						{onClose && <Close overflow={overflow} backgroundColor={backgroundColor} onClick={onClose}><CloseIcon /></Close>}
						{showPreloader && <PreloaderWrapper><Loading /></PreloaderWrapper>}
						<ChildrenWrapper showChildren={!showPreloader}>{children}</ChildrenWrapper>
					</Container>
					{showBackground && <FullscreenContainer
						backgroundColor={backgroundColor}
						animatedBackground={animatedBackground}
					/>}
				</React.Fragment>
			</EnsureDefaultTheme>
		);
	}
};

export default Modal;
