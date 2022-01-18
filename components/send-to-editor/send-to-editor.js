/* @flow */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';


import createTranslate from '../translator';
import type { TranslateFunction } from '../translator';
import type { Locale } from 'kinja-magma/models/Locale';
import translations from './translations';

import Button from '../buttons';
import Textarea from '../form/textarea';
import ButtonGroup, { ButtonGroupItem } from '../button-group';

export type ArticleStatus = 'Freelancer Filed' | 'Ready for Copy Desk';
export type DraftPostDetails = {
	notes: string,
	status: string 	// TODO: To make this ArticleStatus we have to add it as a generic to ButtonGroup
					// that'd make ButtonGroup<T> where T is ArticleStatus, but I don't yet know how
					// to use the component with generic types in the render method.
}

export type Props = {
	initialValues?: {
		notes: string
	},
	language: Locale,
	onCancel: () => void,
	onSubmit: (DraftPostDetails) => void
};

type State = DraftPostDetails;

class SendToEditorForm extends Component<Props, State> {
	translate: TranslateFunction;
	submit: () => void;

	constructor(props: Props) {
		super(props);
		this.state = {
			status: 'Freelancer Filed',
			...props.initialValues
		};

		this.translate = createTranslate(translations, props.language);
		this.submit = this.submit.bind(this);
	}

	@autobind
	onStatusChange(status: string) {
		this.setState({
			...this.state,
			status
		});
	}

	@autobind
	onNotesChange(notes: string) {
		this.setState({
			...this.state,
			notes
		});
	}

	componentWillReceiveProps(nextProps: Props) {
		const { language } = nextProps;

		if (language !== this.props.language) {
			this.translate = createTranslate(translations, language);
		}
	}

	submit() {
		this.props.onSubmit(this.state);
	}

	render() {
		const { onCancel } = this.props;
		const defaultNotes = this.props.initialValues ? this.props.initialValues.notes : '';

		return (
			<div className="send-to-editor-form">
				<h2 className="modal-title">{this.translate('Send to Editors')}</h2>
				<div className="form-group flex-row flex-row--align-middle">
					<div className="flex-row__column small-4">
						<h3 className="form-group_label">{this.translate('Article Status')}</h3>
					</div>
					<div className="flex-row__column small-8">
						<ButtonGroup onChange={this.onStatusChange}>
							<ButtonGroupItem
								label={this.translate('Freelancer Filed')}
								value="Freelancer Filed"
								selected
							/>
							<ButtonGroupItem
								label={this.translate('Ready for Copy Desk')}
								value="Ready for Copy Desk"
							/>
						</ButtonGroup>
					</div>
				</div>
				<div className="form-group flex-row">
					<div className="flex-row__column small-4">
						<h3 className="form-group_label">{this.translate('Additional Notes')}</h3>
					</div>
					<div className="flex-row__column small-8">
						<Textarea
							value={this.state.notes || defaultNotes}
							label={this.translate('Run date, word count, graphics, photo credit, etc.')}
							name="notes"
							onChange={this.onNotesChange}
							rows={5}
						/>
					</div>
				</div>
				<footer className="form-buttons">
					<Button
						weight='secondary'
						className="form-button"
						label={this.translate('Cancel')}
						onClick={onCancel}
						type="button"
					/>
					<Button
						weight='primary'
						className="form-button"
						label={this.translate('Send')}
						onClick={this.submit}
						type="submit"
					/>
				</footer>
			</div>
		);
	}
}

export default SendToEditorForm;
