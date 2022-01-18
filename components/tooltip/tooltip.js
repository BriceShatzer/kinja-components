/* @flow */

import * as React from 'react';
import styled, {css} from 'styled-components';
import compare from 'react-fast-compare';
import {EnsureDefaultTheme} from '../theme';
import autobind from 'autobind-decorator';

type Props = {
	content?: string | React.Element<*>,
	width?: number,
	maxWidth?: number,
	topOffset: number,
	leftOffset?: number,
	updatePosition?: boolean,
	elementRef: ?HTMLElement,
};

type Ref = {
	current: null | HTMLDivElement
};

const TooltipBubble = styled.div`
	position: absolute;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
	border-radius: 3px;
	padding: 2px 8px;
	background: ${props => props.theme.color.black};
	color: ${props => props.theme.color.white};
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	white-space: nowrap;
	z-index: 1000;

	&::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 50%;
		display: block;
		width: 10px;
		height: 10px;
		transform: rotate(45deg);
		margin-left: -4px;
		background: ${props => props.theme.color.black};
	}

	${props => {
		if (props.customWidth || props.customMaxWidth) {
			const width = props.customWidth && parseInt(props.customWidth);
			const maxWidth = props.customMaxWidth && parseInt(props.customMaxWidth);

			if (maxWidth) {
				return css`
					max-width: ${maxWidth}px;
				`;
			} else if (width) {
				return css`
					width: ${width}px;
				`;
			}
		}
	}}
`;

const TooltipBubbleWrapper = styled.div`
	position: fixed;
	z-index: 100;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	pointer-events: none;
`;

const Wrapper = styled.div`
	position: relative;

	&:hover {
		${TooltipBubbleWrapper} {
			visibility: visible;
		}
	}
`;

function offset(el: HTMLElement) {
	const rect = el.getBoundingClientRect();

	return {top: rect.top, left: rect.left};
}

export default class Tooltip extends React.Component<Props> {
	bubbleRef: Ref = React.createRef()

	componentDidMount() {
		this.updatePosition();
		document.addEventListener('scroll', this.updatePosition);
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.updatePosition);
	}

	componentDidUpdate(prevProps: Props) {
		if (!compare(prevProps, this.props)) {
			this.updatePosition();
		}
	}

	@autobind
	updatePosition() {
		this.updateVerticalPosition();
		this.updateHorizontalPosition();
	}

	updateHorizontalPosition() {
		const bubble = this.bubbleRef.current;
		const elementRef = this.props.elementRef;
		const leftOffset = this.props.leftOffset;
		if (bubble && elementRef && leftOffset) {
			bubble.style.left
				= `${offset(elementRef).left
				- (bubble.offsetWidth / 2)
				+ (elementRef.offsetWidth / 2)
				- leftOffset}px`;
		} else if (bubble && elementRef) {
			bubble.style.left
				= `${offset(elementRef).left
				- (bubble.offsetWidth / 2)
				+ (elementRef.offsetWidth / 2)
				}px`;
		}
	}

	updateVerticalPosition() {
		const bubble = this.bubbleRef.current;
		const elementRef = this.props.elementRef;
		if (bubble && elementRef) {
			bubble.style.top
				= `${offset(elementRef).top
					- (elementRef.offsetHeight / 2)
					- this.props.topOffset}px`;
		}
	}

	render() {
		const { props, bubbleRef } = this;
		const { content, maxWidth, width } = props;

		if (!content) {
			return '';
		}

		return (
			<EnsureDefaultTheme>
				<Wrapper>
					<TooltipBubbleWrapper>
						<TooltipBubble
							customWidth={width}
							customMaxWidth={maxWidth}
							ref={bubbleRef}
						>
							{content}
						</TooltipBubble>
					</TooltipBubbleWrapper>
				</Wrapper>
			</EnsureDefaultTheme>
		);
	}
}
