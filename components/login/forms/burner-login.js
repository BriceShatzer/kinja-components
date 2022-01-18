/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import TextField from '../../form/textfield18';
import Button from '../../buttons';

// ICON
import ArrowLeftIcon from '../../icon19/ArrowLeft';
import ArrowRightIcon from '../../icon19/ArrowRight';
import CloseIcon from '../../icon19/Close';

import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';
import Analytics from '../../hoc/analytics';
import type { AnalyticsInjectedProps } from '../../hoc/analytics';
import { Form, CloseButton, Footer, MobileH1, MobileBackButton } from '../common';
import type { TranslateFunction } from '../../translator';

const TextFieldWithoutMargin = styled(TextField)`
	margin-bottom: 0;
`;

type Props = {
	onLogin: (credentials: { screenName: string, token: string }) => Promise<void>,
	onCreateClick: () => void,
	onCloseClick: () => void,
	onBackClick: () => void,
	onInputChange: () => void,
	loading: boolean,
	translate: TranslateFunction
} & AnalyticsInjectedProps;

type State = {
	screenName: string,
	token: string
};

class BurnerLogin extends React.Component<Props, State> {
	loginBurner: () => void;
	onCreateClick: () => void;
	onScreenNameChange: (value: string) => void;
	onTokenChange: (value: string) => void;
	state = {
		screenName: '',
		token: ''
	}
	constructor(props: Props) {
		super(props);
		this.loginBurner = this.loginBurner.bind(this);
		this.onScreenNameChange = this.onScreenNameChange.bind(this);
		this.onTokenChange = this.onTokenChange.bind(this);
		this.onCreateClick = this.onCreateClick.bind(this);
	}

	onScreenNameChange(value: string) {
		this.setState({
			screenName: value
		});
		this.props.onInputChange();
	}

	onTokenChange(value: string) {
		this.setState({
			token: value
		});
		this.props.onInputChange();
	}

	loginBurner() {
		this.props.onLogin({ screenName: this.state.screenName, token: this.state.token })
			.then(() => {
				this.props.ga('Authentication flow', 'Button click', 'Burner sign-in');
			})
			.catch(() => {
				this.props.ga('Authentication flow', 'Button click', 'Failed burner sign-in');
			});
	}

	onCreateClick() {
		this.props.ga('Authentication flow', 'Button click', 'Burner sign-up modal');
		this.props.onCreateClick();
	}

	render() {
		return (
			<EnsureDefaultTheme>
				<Form>
					<MobileBackButton>
						<a role="button" tabIndex="0" onClick={this.props.onBackClick} onKeyPress={this.props.onBackClick}>
							<ArrowLeftIcon /> {this.props.translate('Back')}
						</a>
					</MobileBackButton>
					<MobileH1>
						{this.props.translate('Connect with a burner account')}
					</MobileH1>
					<CloseButton>
						<a role="button" tabIndex="0" onClick={this.props.onCloseClick} onKeyPress={this.props.onCloseClick}>
							<CloseIcon />
						</a>
					</CloseButton>
					<div>
						<TextField
							inlineHelp=""
							placeholder={this.props.translate('Type your User Name here')}
							label={this.props.translate('User Name')}
							name="screenName"
							onChange={this.onScreenNameChange}
							className="js_input-username"
						/>
						<TextFieldWithoutMargin
							inlineHelp=""
							type="password"
							placeholder={this.props.translate('Type your Password here')}
							label={this.props.translate('Password')}
							name="token"
							onChange={this.onTokenChange}
							className="js_input-password"
						/>
					</div>
					<Footer>
						<Button
							icon={this.props.loading ? undefined : <ArrowRightIcon />}
							label={this.props.loading ? this.props.translate('Loading...') : this.props.translate('Sign in')}
							labelPosition='before'
							weight='primary'
							disabled={this.props.loading || this.state.screenName.length === 0 || this.state.token.length === 0}
							onClick={this.loginBurner}
							className="js_button-login"
						/>
						<Button
							label={this.props.translate('Create a burner account')}
							weight='secondary'
							onClick={this.onCreateClick}
							disabled={this.props.loading}
						/>
					</Footer>
				</Form>
			</EnsureDefaultTheme>
		);
	}
}

export default Analytics(BurnerLogin);
