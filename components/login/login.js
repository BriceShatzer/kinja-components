/* @flow */

import * as React from 'react';
import Layout from './login-form-layout';
import createTranslate from '../translator';
import type { TranslateFunction } from '../translator';
import translations from './translations';
import Analytics from '../hoc/analytics';
import type { AnalyticsInjectedProps } from '../hoc/analytics';
// Info screens
import InfoAside from './info-screens/info-aside';
import BurnerInfoAside from './info-screens/burner-info-aside';
import WelcomeInfoAside from './info-screens/welcome-info-aside';
// Forms
import OAuthLogin from './forms/oauth-login';
import BurnerLogin from './forms/burner-login';
import CreateBurner from './forms/create-burner';
import BurnerCreated from './forms/burner-created';
import SetScreenName from './forms/set-screen-name';

import type { Provider } from './forms/oauth-login';
import type Blog from 'kinja-magma/models/Blog';
import type { Locale } from 'kinja-magma/models/Locale';

/**
 * The steps are the following:
 * OAuth: log in with any oauth provider. Logging in with a burner account is hidden behind a link.
 * Burner: Log in with a burner account. Can go back to OAuth, and there is a link for new Burner creation.
 * Create: create a new burner account. Can go back to burner login.
 * CreationSuccessful: After a burner registration completes, shows you the password sent by the server
 * SetScreenName: after you connect for the first time with an OAuth provider, shows you a screen where you need to set your sreen name
 */
opaque type Step = 'OAuth' | 'Burner' | 'Create' | 'CreationSuccessful' | 'SetScreenName';

export type Props = {|
	blog?: Blog,
	onLoggedIn: () => void,
	loginBurner: (credentials: { screenName: string, token: string }) => Promise<void>,
	onOAuthLoginStarted: () => void,
	setScreenName: (screenName: string) => void,
	createBurner: ({
		screenName: string,
		captchaResponse: string
	}) => void,
	onClose: () => void,
	onInputChange: () => void,
	onNavigation: () => void,
	password?: ?string,
	userNameTaken?: boolean,
	error: ?string,
	loading: boolean,
	incompleteRegistration: boolean,
	locale: Locale
|} & AnalyticsInjectedProps;

type State = {
	step: Step,
	provider: Provider
};

class Login extends React.Component<Props, State> {
	state: State = {
		step: 'OAuth',
		provider: 'google'
	};
	loginOAuth: (provider: Provider) => void;
	switchToBurnerScreen: () => void;
	backFromBurnerScreen: () => void;
	switchToOAuthScreen: () => void;
	switchToCreateScreen: () => void;
	backFromCreateScreen: () => void;
	onCloseClick: () => void;
	translate: TranslateFunction;

	constructor(props: Props) {
		super(props);
		this.loginOAuth = this.loginOAuth.bind(this);
		this.switchToBurnerScreen = this.switchToBurnerScreen.bind(this);
		this.backFromBurnerScreen = this.backFromBurnerScreen.bind(this);
		this.switchToOAuthScreen = this.switchToOAuthScreen.bind(this);
		this.switchToCreateScreen = this.switchToCreateScreen.bind(this);
		this.backFromCreateScreen = this.backFromCreateScreen.bind(this);
		this.onCloseClick = this.onCloseClick.bind(this);
		this.translate = createTranslate(translations, props.locale);
	}

	componentDidMount() {
		if (this.props.incompleteRegistration) {
			this.setState({
				step: 'SetScreenName'
			});
		}
	}

	componentDidUpdate(prevProps: Props) {
		if (!prevProps.locale !== this.props.locale) {
			this.translate = createTranslate(translations, this.props.locale);
		}

		if (prevProps.password !== this.props.password) {
			this.setState({
				step: 'CreationSuccessful'
			});
		}

		if (!prevProps.incompleteRegistration && this.props.incompleteRegistration) {
			this.setState({
				step: 'SetScreenName'
			});
		}
	}

	loginOAuth(provider: Provider) {
		this.props.onOAuthLoginStarted();
		window.open(`/oauthlogin?provider=${provider}`);
		this.setState({ provider });
	}

	switchToBurnerScreen() {
		this.setState({
			step: 'Burner'
		});
		this.props.onNavigation();
	}

	backFromBurnerScreen() {
		this.props.ga('Authentication flow', 'Button click', 'Cancel burner sign-in modal');
		this.switchToOAuthScreen();
	}

	switchToOAuthScreen() {
		this.setState({
			step: 'OAuth'
		});
		this.props.onNavigation();
	}

	switchToCreateScreen() {
		this.setState({
			step: 'Create'
		});
		this.props.onNavigation();
	}

	backFromCreateScreen() {
		this.props.ga('Authentication flow', 'Button click', 'Cancel burner sign-up modal');
		this.switchToBurnerScreen();
	}

	onCloseClick() {
		this.props.ga('Authentication flow', 'Button click', 'Dismiss modal');
		this.props.onClose();
	}

	render() {
		let infoComponent: React.Node;
		let formComponent: React.Node;
		let columnLayout: boolean = false;
		switch (this.state.step) {
			case 'OAuth':
				infoComponent = <InfoAside blog={this.props.blog} translate={this.translate} />;
				formComponent = <OAuthLogin
					blog={this.props.blog}
					onOAuthClick={this.loginOAuth}
					onBurnerClick={this.switchToBurnerScreen}
					onCloseClick={this.onCloseClick}
					translate={this.translate}
				/>;
				break;
			case 'SetScreenName':
				infoComponent = <WelcomeInfoAside blog={this.props.blog} provider={this.state.provider} translate={this.translate} />;
				formComponent = <SetScreenName
					loading={this.props.loading}
					onInputChange={this.props.onInputChange}
					onSubmit={this.props.setScreenName}
					userNameTaken={this.props.userNameTaken}
					translate={this.translate}
				/>;
				columnLayout = true;
				break;
			case 'Burner':
				infoComponent = <BurnerInfoAside
					blog={this.props.blog}
					onBackClick={this.backFromBurnerScreen}
					canGoBack={true}
					create={false}
					translate={this.translate}
				/>;
				formComponent = <BurnerLogin
					onLogin={this.props.loginBurner}
					onCloseClick={this.onCloseClick}
					onCreateClick={this.switchToCreateScreen}
					onBackClick={this.backFromBurnerScreen}
					onInputChange={this.props.onInputChange}
					loading={this.props.loading}
					translate={this.translate}
				/>;
				break;
			case 'Create':
				infoComponent = <BurnerInfoAside
					blog={this.props.blog}
					onBackClick={this.backFromCreateScreen}
					canGoBack={true}
					create={true}
					translate={this.translate}
				/>;
				formComponent = <CreateBurner
					onCloseClick={this.onCloseClick}
					onCreateClick={this.props.createBurner}
					onBackClick={this.backFromCreateScreen}
					onInputChange={this.props.onInputChange}
					userNameTaken={this.props.userNameTaken}
					loading={this.props.loading}
					translate={this.translate}
				/>;
				break;
			case 'CreationSuccessful':
				if (!this.props.password) {
					throw new Error('Got to burner created step without a password.');
				}
				infoComponent = <WelcomeInfoAside blog={this.props.blog} provider="burner" translate={this.translate} />;
				formComponent = <BurnerCreated
					onCloseClick={this.onCloseClick}
					password={this.props.password}
					translate={this.translate}
				/>;
				columnLayout = true;
				break;
			default:
				(this.state.step: empty);
				throw new Error('Unexpected step');
		}
		return (
			<Layout infoComponent={infoComponent} formComponent={formComponent} columnLayout={columnLayout} blog={this.props.blog} />
		);
	}
}

export default Analytics(Login);
