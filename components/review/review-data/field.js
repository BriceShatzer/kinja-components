/* @flow */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import styled from 'styled-components';

import Textfield18 from 'kinja-components/components/form/textfield18';
import Button from '../../buttons';
import type { ReviewText } from 'postbody/blockNodes/ReviewBox';
import translations from './translations';
import createTranslate from '../../translator';
import type { TranslateFunction } from '../../translator';
import TrashcanIcon from '../../icon19/Trashcan';
import type { Locale } from 'kinja-magma/models/Locale';


const Wrapper = styled.div`
	align-items: center;
`;


type Props = {
	value: ReviewText,
	name: string,
	onChange: ReviewText => void,
	onDelete: () => void,
	onEnter?: () => void,
	language: Locale
};

class FieldInput extends Component<Props> {
	translate: TranslateFunction;
	labelInput: ?HTMLInputElement;
	valueInput: ?HTMLInputElement;

	constructor(props: Props) {
		super(props);
		this.translate = createTranslate(translations, props.language);
	}

	static defaultProps = {
		language: 'en-US'
	};

	@autobind
	handleLabelChange(label: string) {
		this.props.onChange({
			label,
			value: this.props.value.value
		});
	}

	@autobind
	handleValueChange(value: string) {
		this.props.onChange({
			label: this.props.value.label,
			value
		});
	}

	@autobind
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && this.props.onEnter) {
			this.props.onEnter();
			event.preventDefault();
		}
	}

	focusLabelField() {
		this.labelInput && this.labelInput.focus();
	}

	focusValueField() {
		this.valueInput && this.valueInput.focus();
	}

	render() {
		const { name, onDelete, value } = this.props;
		return (
			<Wrapper className="flex-row">
				<div className="flex-row__column medium-4">
					<Textfield18
						inputRef={input => { this.labelInput = input; }}
						label={this.translate('Label')}
						name={`${name}-label`}
						onChange={this.handleLabelChange}
						value={value.label}
					/>
				</div>
				<div className="flex-row__column">
					<Textfield18
						inputRef={input => { this.valueInput = input; }}
						label={this.translate('Value')}
						name={`${name}-value`}
						onChange={this.handleValueChange}
						onKeyDown={this.handleKeyDown}
						value={value.value}
					/>
				</div>
				<div className="flex-row__column flex-row__column--fixed">
					<Button
						small
						weight='secondary'
						onClick={onDelete}
						type="button"
						icon={<TrashcanIcon />}
					/>
				</div>
			</Wrapper>
		);
	}
}

export default FieldInput;
