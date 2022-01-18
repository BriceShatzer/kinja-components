/* @flow */

import * as React from 'react';
import TextField from '../../form/textfield18';
import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';
import { screenNameRegex } from '../common';
import type { TranslateFunction } from '../../translator';

type Props = {
	onChange: (screenName: ?string) => void, // Called with screen name or null if there was an error
	userNameTaken: boolean,
	inlineHelp: string,
	label: string,
	placeholder: string,
	translate: TranslateFunction
};

type State = {
	screenName: string,
	error: string,
	displayErrors: boolean,
	startedTyping: boolean
};

/**
 * This form is shown after a user connects with OAuth and doesn't have a screenName set yet,
 * indicatad by their 'incomplete' status
 */
class ScreenNameInput extends React.Component<Props, State> {
	onScreenNameChange: (value: string) => void;

	state = {
		screenName: '',
		error: '',
		displayErrors: false,
		startedTyping: false
	};

	constructor(props: Props) {
		super(props);
		this.onScreenNameChange = this.onScreenNameChange.bind(this);
	}

	onScreenNameChange(value: string) {
		// If this is the first time the user starts typing, start a timer before we display validation errors
		if (!this.state.startedTyping) {
			this.setState({
				startedTyping: true
			});
			setTimeout(() => this.setState({
				displayErrors: true
			}), 1000);
		}
		// Validate input
		if (value.length < 3 || value.length > 63) {
			return this.setState({
				screenName: value,
				error: this.props.translate('Your user name must be between 3 and 63 characters')
			}, () => this.props.onChange(this.state.error ? null : this.state.screenName));
		}
		if (value[0] === '-') {
			return this.setState({
				screenName: value,
				error: this.props.translate('Your user name can\'t start with a dash')
			}, () => this.props.onChange(this.state.error ? null : this.state.screenName));
		}
		if (!value.match(screenNameRegex)) {
			return this.setState({
				screenName: value,
				error: this.props.translate('Your user name can only contain letters of the English alphabet, numbers and dashes')
			}, () => this.props.onChange(this.state.error ? null : this.state.screenName));
		}
		// If the input is a valid username, clear error
		this.setState({
			screenName: value,
			error: ''
		}, () => this.props.onChange(this.state.error ? null : this.state.screenName));
	}

	render() {
		const displayError = this.state.displayErrors || this.props.userNameTaken;
		const isError = this.state.error !== '' || this.props.userNameTaken;
		const errorMessage = this.props.userNameTaken ? this.props.translate('The user name is taken, please choose another.') : this.state.error;
		return (
			<EnsureDefaultTheme>
				<React.Fragment>
					<TextField
						inlineHelp={this.props.inlineHelp}
						placeholder={this.props.placeholder}
						label={this.props.label}
						name="screenName"
						error={displayError && isError ? errorMessage : undefined}
						onChange={this.onScreenNameChange}
					/>
				</React.Fragment>
			</EnsureDefaultTheme>
		);
	}
}

export default ScreenNameInput;
