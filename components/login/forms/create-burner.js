/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import media from '../../../style-utils/media';
import Button from '../../buttons';

// ICONS
import ArrowLeftIcon from '../../icon19/ArrowLeft';
import ArrowRightIcon from '../../icon19/ArrowRight';
import CloseIcon from '../../icon19/Close';

import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';
import { Form, Footer, CloseButton, MobileH1, MobileBackButton } from '../common';
import ScreenNameInput from './screen-name-input';
import type { TranslateFunction } from '../../translator';
import Analytics from '../../hoc/analytics';
import type { AnalyticsInjectedProps } from '../../hoc/analytics';

const Captcha = styled.div`
	background-color: ${props => transparentize(0.5, props.theme.color.whitesmoke)};

	${media.largeUp`
		width: 243px;
		height: 62px;
		justify-content: flex-start !important;

		> div {
			transform-origin: top left;
			transform: scale(0.8);
		}
	`}

	${media.mediumDown`
		transform: none;

		> div {
			transform-origin: center;
			transform: scale(0.9);
		}
	`}
`;

type Props = {
	onCreateClick: ({
		screenName: string,
		captchaResponse: string
	}) => void,
	onCloseClick: () => void,
	onBackClick: () => void,
	userNameTaken?: boolean,
	onInputChange: () => void,
	loading: boolean,
	translate: TranslateFunction
} & AnalyticsInjectedProps;

type State = {
	screenName: string,
	captchaResponse?: string,
	error: boolean
};

class CreateBurner extends React.Component<Props, State> {
	createBurner: () => void;
	onScreenNameChange: (screenName: ?string) => void;
	state = {
		screenName: '',
		error: false
	};
	constructor(props: Props) {
		super(props);
		this.createBurner = this.createBurner.bind(this);
		this.onScreenNameChange = this.onScreenNameChange.bind(this);
	}

	componentDidMount() {
		if (window.grecaptcha) {
			return this.renderCaptcha();
		}
		// Add captcha script
		const script = document.createElement('script');
		script.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaLoaded&render=explicit';
		script.async = true;
		document.body && document.body.appendChild(script);
		window.recaptchaLoaded = this.renderCaptcha.bind(this);
	}

	onScreenNameChange(screenName: ?string) {
		if (screenName === null) {
			this.setState({
				screenName: '',
				error: true
			});
		} else {
			this.setState({
				screenName,
				error: false
			});
		}
		// Notify the controller that input has changes, so we can clear errors passed down
		this.props.onInputChange();
	}

	renderCaptcha() {
		window.grecaptcha.render('g-recaptcha', {
			sitekey: '6Le48RcUAAAAALSUKGfgGRny9I8OWca3Z-rShqjI',
			callback: resp => this.setState({ captchaResponse: resp }),
			['expired-callback']: () => this.setState({ captchaResponse: '' })
		});
	}

	componentDidUpdate(prevProps: Props) {
		// Rerender captcha after an error
		if (!prevProps.userNameTaken && this.props.userNameTaken) {
			window.grecaptcha.reset();
		}
	}

	createBurner() {
		if (this.state.captchaResponse) {
			this.props.onCreateClick({
				screenName: this.state.screenName,
				captchaResponse: this.state.captchaResponse
			});
			this.props.ga('Authentication flow', 'Button click', 'Burner sign-up');
		} else {
			throw new Error('Tried to create burner without captcha response');
		}
	}

	render() {
		const disclaimer =
			this.props.translate(`
			By creating an account, you’re agreeing to our
			 <a href="https://g-omedia.com/terms-of-service/">
				 Terms of Use
			</a> and
			<a href="https://g-omedia.com/privacy-policy/">
				Privacy Policy
			</a>.`);
		return (
			<EnsureDefaultTheme>
				<Form>
					<MobileBackButton>
						<a role="button" tabIndex="0" onClick={this.props.onBackClick} onKeyPress={this.props.onBackClick}>
							<ArrowLeftIcon /> {this.props.translate('Back')}
						</a>
					</MobileBackButton>
					<MobileH1>
						{this.props.translate('Create a burner account')}
					</MobileH1>
					<CloseButton>
						<a role="button" tabIndex="0" onClick={this.props.onCloseClick} onKeyPress={this.props.onCloseClick}>
							<CloseIcon />
						</a>
					</CloseButton>
					<div>
						<ScreenNameInput
							inlineHelp={this.props.translate('You can change this later in Account Settings')}
							label={this.props.translate('Set your User Name')}
							placeholder={this.props.translate('Set your User Name here')}
							userNameTaken={Boolean(this.props.userNameTaken)}
							onChange={this.onScreenNameChange}
							translate={this.props.translate}
						/>
						<Captcha id="g-recaptcha" className="g-recaptcha" />
					</div>
					<Footer>
						<Button
							icon={this.props.loading ? undefined : <ArrowRightIcon />}
							label={this.props.loading ? this.props.translate('Loading...') : this.props.translate('Create Account')}
							labelPosition='before'
							weight='primary'
							disabled={!this.state.captchaResponse ||
								this.state.screenName.length === 0 ||
								this.props.userNameTaken ||
								this.props.loading ||
								this.state.error
							}
							onClick={this.createBurner}
						/>
						<div dangerouslySetInnerHTML={{
							__html: disclaimer
						}} />
					</Footer>
				</Form>
			</EnsureDefaultTheme>
		);
	}
}

export default Analytics(CreateBurner);
