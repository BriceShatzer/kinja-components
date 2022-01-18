/* @flow */

import React, { Component } from 'react';
import FieldInput from './field';
import Button from '../../buttons';
import type { ReviewText } from 'postbody/blockNodes/ReviewBox';
import translations from './translations';
import createTranslate from '../../translator';
import type { TranslateFunction } from '../../translator';
import autobind from 'autobind-decorator';
import type { Locale } from 'kinja-magma/models/Locale';

type Field = {
	index: number,
	data: ReviewText,
	changeHandler: ReviewText => void,
	deleteHandler: () => void
};

type Props = {
	value: Array<ReviewText>,
	onChange: Array<ReviewText> => void,
	language: Locale,
	name: string
};

type State = {
	fields: Array<Field>,
	index: number
}

class ReviewData extends Component<Props, State> {
	translate: TranslateFunction;
	lastField: ?FieldInput;

	constructor(props: Props) {
		super(props);

		this.state = {
			index: props.value ? props.value.length - 1 : -1,
			fields: props.value ? props.value.map(this.createFieldData) : []
		};
		this.translate = createTranslate(translations, props.language);
	}

	static defaultProps = {
		language: 'en-US'
	};

	@autobind
	onStateChange() {
		this.props.onChange(this.state.fields.map(field => field.data));
	}

	/**
	 * Triggered on every input change
	 */
	handleChange(index: number, value: ReviewText) {
		this.setState(prevState => ({
			fields: prevState.fields.map(field => field.index === index ? this.createFieldData(value, index) : field)
		}), this.onStateChange);
	}

	/**
	 * Triggered when the user clicks on the delete button of a field
	 */
	handleDelete(index: number) {
		this.setState(prevState => ({
			fields: prevState.fields.filter(field => field.index !== index)
		}), this.onStateChange);
	}

	/**
	 * Create a new field, adding a new line of inputs
	 */
	@autobind
	addField() {
		this.setState(prevState => {
			const index = prevState.index + 1;
			const newField = this.createFieldData({ label: '', value: '' }, index);
			return {
				index,
				fields: prevState.fields.concat(newField)
			};
		}, () => {
			this.onStateChange();
			if (this.lastField) {
				this.lastField.focusLabelField();
			}
		});
	}

	/**
	 * Helper for creating correct field data with correct event handlers
	 */
	@autobind
	createFieldData(data: ReviewText = { label: '', value: ''}, index: number): Field {
		return {
			index,
			data,
			changeHandler: this.handleChange.bind(this, index),
			deleteHandler: this.handleDelete.bind(this, index)
		};
	}

	render() {
		const { fields } = this.state;
		const { language, name } = this.props;
		const lastIndex = fields.length - 1;
		return (
			<div>
				{fields.map((field, index) => {
					const isLastField = index === lastIndex;
					return (
						<FieldInput
							name={`${name}-field-${field.index}`}
							value={field.data}
							key={field.index}
							onChange={field.changeHandler}
							onDelete={field.deleteHandler}
							language={language}
							onEnter={isLastField ? this.addField : undefined}
							ref={el => { if (isLastField) { this.lastField = el; } }}
						/>
					);
				})}
				<Button
					label={this.translate('Add field')}
					type="button"
					small
					weight='secondary'
					onClick={this.addField}
				/>
			</div>
		);
	}
}

export default ReviewData;
