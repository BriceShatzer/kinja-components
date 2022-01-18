/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import autobind from 'autobind-decorator';
import isEqual from 'lodash/isEqual';

import { OptionItem } from './option';
import Toggle from '../../hoc/toggle';
import ListWithSelection from '../../list-with-selection';
import { EnsureDefaultTheme } from '../../theme';
import type { FunctionOrClassComponent } from '../../../utils/types';
import type { ToggleInjectedProps } from '../../hoc/toggle';

// ICONS
import ChevronUpIcon from '../../icon19/ChevronUp';
import ChevronDownIcon from '../../icon19/ChevronDown';

type OptionProps<V> = {
	value: V,
	selected?: boolean,
	stringRepresentation: string
};
type Option<V> = FunctionOrClassComponent<OptionProps<V>, void>;

type Props<V> = {
	children: React.ChildrenArray<React.Element<Option<V>>>,
	description?: string,
	disabled?: boolean,
	error?: string,
	height?: number,
	labelPosition?: 'below' | 'above',
	name: string,
	onChange: V => void,
	predictive?: boolean,
	simplified?: boolean,
	value?: V
};

type State = {
	input: string
};

/* styled-components */
export const SelectLabel = styled.label`
	width: 100%;

	${props => props.labelPosition === 'below' && css`
		margin-bottom: 1.5rem;
		max-width: 400px;
	`}
`;

export const selectHeight = 36;

const LabelText = styled.span`
	margin-right: 10px;
	line-height: ${selectHeight}px;
	${props => props.labelPosition === 'below' && css`
		color: ${props => props.theme.color.gray};
		display: block;
		position: relative;
	`}
	${props => props.labelPosition === 'above' && css`
		color: ${props => props.theme.color.darkgray};
		font-size: 16px;
		margin-right: 0;
	`}
`;

export const SelectValue = styled.div`
	color: ${props => props.theme.color.darksmoke};
	line-height: 34px;
	padding-left: 10px;
	padding-right: 10px;
	width: 100%;
	outline: none;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const SelectControl = styled.div`
	align-items: center;
	background-color: ${props => props.theme.color.white};
	border-color: #d9d9d9 ${props => props.theme.color.midgray} #b3b3b3;
	border-radius: 4px;
	border: 1px solid ${props => props.theme.color.midgray};
	color: ${props => props.theme.color.darksmoke};
	display: flex;
	height: ${selectHeight}px;
	outline: none;
	overflow: hidden;
	position: relative;
	padding-right: 10px;
	width: 100%;
	min-width: 100px;

	button {
		background: transparent;
		border: none;
		padding: 0;
		height: auto;
		line-height: auto;
		border-radius: 0;

		&:hover,
		&:active,
		&:focus {
			background: transparent;
		}
	}
`;

export const LabelSelect = styled.div`
	position: relative;
	width: 100%;
	outline: none;
	cursor: pointer;

	${props => props.isOpen && css`
		${SelectControl} {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			border-color: ${props => props.theme.color.primary};

			${SelectValue} {
				color: ${props => props.theme.color.darksmoke};
			}
		}
	`}

	${props => props.disabled && css`
		${SelectControl} {
			border-color: #ddd;

			${SelectValue} {
				color: #ddd;
			}
		}
	`}
`;

const FilterInput = styled.input`
	border: none;
	color: #222;
	line-height: 34px;
	width: 100%;
	font-size: 14px;

	&:focus {
		outline: none;
	}
`;

export const SelectOptionsList = styled.div`
	background-color: ${props => props.theme.color.white};
	border-color: #d9d9d9 ${props => props.theme.color.midgray} #b3b3b3;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	border: 1px solid ${props => props.theme.color.midgray};
	border-top: none;
	color: ${props => props.theme.color.midgray};
	cursor: default;
	outline: none;
	overflow-y: scroll;
	position: absolute;
	width: 100%;
	min-width: 100px;
	height: auto;
	top: ${selectHeight}px;
	left: 0;
	right: 0;
	z-index: 501;

	${ props => props.height && `max-height: ${props.height}px;` }

	${ props => props.hasList && 'overflow: hidden;' }
`;

const Error = styled.div`
	display: block;
	position: relative;
	top: ${props => props.labelPosition === 'below' ? '0' : '5px;'};
	transition: color 0.2s ease-in-out;
	color: ${props => props.theme.color.error};
	line-height: ${props => props.labelPosition === 'below' ? '36px' : '1.1rem'};
`;

const SelectWrapper = styled.div`
	display: ${props => props.labelPosition === 'above' ? 'block' : 'flex'};
`;

const Controls = styled.div`
	width: 12px;
	${({ disabled, theme }) => disabled && `
		svg {
			color: ${theme.color.gray};
		}
	`}
	${({ isOpen, disabled, theme }) => !disabled && `
		svg {
			color: ${isOpen ? theme.color.primary : theme.color.black};
		}
	`}
`;
/* /styled-components */

/**
 * Get the values of children and map them to their string representation
 */
function mapValues<V>(children: React.ChildrenArray<React.Element<Option<V>>>): { [string]: V } {
	return React.Children.map(
		children, (child: React.Element<Option<V>>) => ({ [child.props.stringRepresentation]: child.props.value })
	).reduce((acc, value) => ({ ...acc, ...value }), {});
}

/**
 * The V type parameter represents any value type you want to use as the value of the select component
 */
export class Select<V> extends React.Component<Props<V> & ToggleInjectedProps, State> {
	handleChange: SyntheticEvent<HTMLSelectElement> => void;
	toggle: () => void;
	selectHandlers: Array<Event => void> = [];
	inputRef: ?HTMLInputElement;
	values: { [string]: V } = {};

	constructor(props: Props<V> & ToggleInjectedProps) {
		super(props);
		this.state = {
			input: ''
		};
		this.toggle = this.toggle.bind(this);
	}

	@autobind
	handleChange(event: SyntheticEvent<HTMLSelectElement>) {
		if (event.currentTarget && event.currentTarget.value) {
			this.props.onChange(this.values[event.currentTarget.value]);
		}
	}

	handleSelect(value: V, event: Event) {
		if (event) {
			event.preventDefault();
		}
		if (this.props.disabled) {
			return;
		}
		if (this.props.toggle) {
			this.props.toggle();
		}
		this.props.onChange(value);
	}

	@autobind
	handleInputChange(event: Event) {
		if (event.currentTarget instanceof HTMLInputElement) {
			this.setState({
				input: event.currentTarget.value
			});
		}
	}

	/**
	 * This is a simplified representation for mobile devices.
	 * It uses the build-in select element that has native support on mobile OS-es
	 */
	renderSimplified() {
		const { children, name, description, error, disabled } = this.props;
		const { value } = this.props;
		const stringRepresentationOfValue = Object.keys(this.values).find(key => this.values[key] === value);
		const errorText = error ? (<Error>{error}</Error>) : '';
		return (
			<SelectLabel htmlFor={name}>
				<SelectWrapper>
					{description && (<LabelText>{description}</LabelText>)}
					<select onChange={this.handleChange} name={name} disabled={disabled} value={stringRepresentationOfValue}>
						{React.Children.map(children, child => (
							<option value={child.props.stringRepresentation}>
								{child.props.stringRepresentation}
							</option>
						)
						)}
					</select>
				</SelectWrapper>
				{errorText}
			</SelectLabel>
		);
	}

	getSelectedChild(): React.Element<Option<V>> {
		return React.Children.toArray(this.props.children)
			.filter(child => isEqual(child.props.value, this.props.value))[0];
	}

	renderOptionList() {
		if (!this.props.isOpen) {
			return '';
		}
		if (this.props.predictive) {
			return this.renderOptionListPredictive();
		}
		return this.renderOptionListSimple();
	}

	/**
	 * This is how the option list renders when `predictive` is on
	 */
	renderOptionListPredictive() {
		const { input } = this.state;
		const { height } = this.props;
		const children = React.Children.toArray(this.props.children);
		const matching = children.filter(child =>
			child.props.stringRepresentation.toLowerCase().indexOf(input.toLowerCase()) > -1);
		return (
			<SelectOptionsList height={height} hasList>
				<ListWithSelection
					onSelect={(component: React.Element<Option<V>>, event: Event) => {
						let matchingComponent;
						for (let i = 0; i < children.length; i += 1) {
							if (children[i].key === component.key) {
								matchingComponent = children[i];
								break;
							}
						}
						if (matchingComponent) {
							this.selectHandlers[children.indexOf(matchingComponent)](event);
						}
					}}
					allowNavigation
					height={height}
				>
					{matching}
				</ListWithSelection>
			</SelectOptionsList>
		);
	}

	/**
	 * This is how the option list renders when `predictive` is off
	 */
	renderOptionListSimple() {
		const { height } = this.props;
		const children = React.Children.map(this.props.children, (child, index) => {
			const selected = child.props.value === this.props.value;
			return (
				<OptionItem
					onClick={this.selectHandlers[index]}
					role="option"
					selected={selected}
					aria-selected={selected}
					tabIndex="-1"
				>
					{React.cloneElement(child, {
						selected
					})}
				</OptionItem>
			);
		});
		return (
			// className="select-component-list"
			<SelectOptionsList height={height}>
				{children}
			</SelectOptionsList>
		);
	}

	toggle(event: Event) {
		event.preventDefault();
		// Reset input when it opens
		if (!this.props.isOpen) {
			this.setState({
				input: ''
			});
		}

		// Open or close the dropdown
		if (!this.props.disabled && this.props.toggle) {
			this.props.toggle(() => {
				// Make sure the input is selected
				if (this.props.isOpen) {
					if (this.inputRef) {
						this.inputRef.focus();
					}
					if (this.inputRef) {
						this.inputRef.select();
					}
				}
			});
		}
	}

	componentDidMount() {
		// Create select handlers for options
		this.selectHandlers = React.Children.map(
			this.props.children, (child: React.Element<Option<V>>) => this.handleSelect.bind(this, child.props.value)
		);
		this.values = mapValues(this.props.children);
	}

	componentWillReceiveProps(nextProps: Props<V>) {
		// Recreate select handlers when we get new children
		if (!isEqual(nextProps.children, this.props.children)) {
			this.selectHandlers = React.Children.map(
				nextProps.children, (child: React.Element<Option<V>>) => this.handleSelect.bind(this, child.props.value)
			);
			this.values = mapValues(nextProps.children);
		}
	}

	render() {
		const {
			description,
			disabled,
			error,
			insideReference,
			isOpen,
			labelPosition,
			name,
			predictive,
			simplified
		} = this.props;
		const { input } = this.state;
		if (simplified) {
			return (
				<EnsureDefaultTheme>
					{this.renderSimplified()}
				</EnsureDefaultTheme>
			);
		}
		const selectedChild = this.getSelectedChild();
		const value = selectedChild || '';
		const descriptionText = description && (<LabelText labelPosition={labelPosition}>{description}</LabelText>);
		const errorText = error ? (<Error labelPosition={labelPosition}>{error}</Error>) : '';
		const valueDisplay = isOpen && predictive ? (<FilterInput
			type="text"
			value={input}
			onChange={this.handleInputChange}
			ref={el => { this.inputRef = el; }}
		/>) : value;

		return (
			<EnsureDefaultTheme>
				<SelectLabel htmlFor={name} ref={insideReference} labelPosition={labelPosition}>
					<SelectWrapper labelPosition={labelPosition}>
						{(labelPosition !== 'below' && description) && (<LabelText labelPosition={labelPosition}>{description}</LabelText>)}
						<LabelSelect
							open={isOpen}
							disabled={disabled}
							onClick={this.toggle}
							role="button"
							tabIndex="0"
						>
							<SelectControl isOpen={isOpen} description={description}>
								<SelectValue>
									{valueDisplay}
								</SelectValue>
								<Controls disabled={disabled} isOpen={isOpen}>
									{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
								</Controls>
							</SelectControl>
							{this.renderOptionList()}
						</LabelSelect>
					</SelectWrapper>
					{(errorText || ((labelPosition === 'below' && description) && descriptionText))}
				</SelectLabel>
			</EnsureDefaultTheme>
		);
	}
}

export default Toggle(Select, { isOutsideClickEnabled: true });
