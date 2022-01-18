// @flow
import React from 'react';
import styled, { css } from 'styled-components';
import autobind from 'autobind-decorator';
import classNames from 'classnames';

import clickOutside from 'kinja-components/components/hoc/click-outside';
import type { ClickOutsideInjectedProps } from 'kinja-components/components/hoc/click-outside';

import type { DropdownOptions, DropdownProps } from './';

const noop = () => undefined;

/*
	Dropdown content wrapper, absolute positioning
*/
export const DropdownWrapper = styled.div`
	position: absolute;
	display: none;

	&.open {
		display: block;
	}

	${({options}: {options: DropdownOptions}) => {
		if (options.upwards) {
			return css`
				bottom: 100%;
			`;
		} else {
			return css`
				top: 100%;
			`;
		}
	}}

	${({options}: {options: DropdownOptions}) => {
		let alignmentStyles;
		switch (options.align) {
			case 'left':
				alignmentStyles = css`
					left: 0;
				`;
				break;
			case 'right':
				alignmentStyles = css`
					right: 0;
				`;
				break;
			case 'center':
				alignmentStyles = css`
					left: 50%;
					transform: translateX(-50%);
				`;
				break;
			// defaults to 'fullwidth'
			default:
				alignmentStyles = css`
					left: 0;
					right: 0;
				`;
				break;
		}
		return alignmentStyles;
	}}
`;

/*
	Dropdown container used in the byline for the tag dropdown and PostTools dropdown.
	This is not a generic component, and is styled specically for those use cases.
	Should not be part of the generic dropdown component.
*/
export const DropdownContainer = styled.div`
	z-index: 98; /* same as in mantle */
	position: relative;
	margin-top: 5px;
	background: ${props => props.theme.color.white};
	border-radius: 5px;
	border: 1px solid ${props => props.theme.color.midgray};
	min-width: 174px;
	&::before,
	&::after {
		content: "";
		display: block;
		position: absolute;
		height: 0;
		width: 0;
		border-bottom-style: solid;
	}
	&::after {
		border: inset 6px;
		border-color: transparent transparent ${props => props.theme.color.white} transparent;
		top: -12px;
		right: 14px;
	}
	&::before {
		border: inset 7px;
		border-color: transparent transparent ${props => props.theme.color.midgray} transparent;
		top: -14px;
		right: 13px;
	}
`;

/*
	Trigger container, dropdown contents are positioned relative to this.
*/
export const TriggerContainer = styled.div`
	display: inline-block;
	position: relative;
`;

/*
	Wrapper enhanced with clickOutside.
	Some prop drilling is unavoidable.
*/
const TriggerWrapper = clickOutside((props: ClickOutsideInjectedProps & {
	onClick: (e: SyntheticEvent<*>) => void,
	onMouseEnter: (e: SyntheticEvent<*>) => void,
	onMouseLeave: (e: SyntheticEvent<*>) => void
}) => (
	<TriggerContainer
		{...props} // this will also pass chilren
		ref={props.insideReference}
	/>
));

type DropdownState = {
	isOpen: boolean
}

export class Dropdown extends React.PureComponent<DropdownProps & ClickOutsideInjectedProps, DropdownState> {

	state = {
		isOpen: false
	};

	/*
		Treat this as a getter/computed value
		It is here to make sure that `isOpen` state gets overriden by `isOpen` prop consistently
	*/
	@autobind
	isOpen() {
		return this.props.isOpen || this.state.isOpen;
	}

	@autobind
	toggle(e: SyntheticEvent<*>) {
		this.isOpen() ? this.close(e) : this.open(e);
	}

	@autobind
	open(e: SyntheticEvent<*>) {
		(!this.isOpen()) && this.setState({
			isOpen: true
		}, this.props.onOpen && this.props.onOpen(e));
	}

	@autobind
	close(e: SyntheticEvent<*> | MouseEvent) {
		(this.isOpen()) && this.setState({
			isOpen: false
		}, this.props.onClose && this.props.onClose(e));
	}

	render() {

		const {
			useHover = false,
			useClick = true
		} = this.props.options || {};

		const isOpen = this.isOpen();

		const clickHandler = useClick
			? this.toggle
			: noop;

		const clickOutsideHandler = this.props.onClickOutside || useClick
			? this.close
			: noop;

		const mouseEnterhandler = useHover
			? this.open
			: this.props.onMouseEnter || noop;

		const mouseLeavehandler = useHover
			? this.close
			: this.props.onMouseLeave || noop;

		const DropdownContainer = this.props.dropdownContainer || React.Fragment;

		return (
			<TriggerWrapper
				onClick={clickHandler}
				onMouseEnter={mouseEnterhandler}
				onMouseLeave={mouseLeavehandler}
				handleClickOutside={clickOutsideHandler}
			>
				{this.props.trigger}
				<DropdownWrapper
					options={this.props.options || {}}
					className={classNames('js_dropdown', {'open': isOpen})}
				>
					<DropdownContainer upwards={Boolean(this.props.options && this.props.options.upwards)}>
						{this.props.children}
					</DropdownContainer>
				</DropdownWrapper>
			</TriggerWrapper>
		);
	}
}
