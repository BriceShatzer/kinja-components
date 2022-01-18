// @flow

import * as React from 'react';
import type Blog from 'kinja-magma/models/Blog';

// ICONS
import CloseIcon from '../../icon19/Close';
import FacebookIcon from '../../icon19/Facebook';
import TwitterIcon from '../../icon19/Twitter';
import GoogleIcon from '../../icon19/GoogleColor';


import Button from '../../buttons';
import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';
import Analytics from '../../hoc/analytics';
import type { AnalyticsInjectedProps } from '../../hoc/analytics';
import { Form, CloseButton, Footer, MobileH1 } from '../common';
import type { TranslateFunction } from '../../translator';

export type Provider = 'google' | 'twitter' | 'facebook';

type Props = {
	blog?: Blog,
	onOAuthClick: (provider: Provider) => void,
	onBurnerClick: () => void,
	onCloseClick: () => void,
	translate: TranslateFunction,
	blog?: Blog
} & AnalyticsInjectedProps;

function OAuthLogin(props: Props) {
	const disclaimer = props.translate(`
		By connecting, you’re agreeing to our
		<a href="https://g-omedia.com/terms-of-service/">
			Terms of Use
		</a> and
		<a href="https://g-omedia.com/privacy-policy/">
			Privacy Policy
		</a>.`);
	const mobileHeading = props.translate('Log in to {blogName}', { blogName: props.blog ? props.blog.displayName : 'Kinja' });
	return (
		<EnsureDefaultTheme>
			<Form>
				<MobileH1>{mobileHeading}</MobileH1>
				<CloseButton>
					<a role="button" tabIndex="0" onClick={props.onCloseClick} onKeyPress={props.onCloseClick}>
						<CloseIcon />
					</a>
				</CloseButton>
				<div>
					<Button
						icon={<FacebookIcon />}
						sort='social'
						label={props.translate('Connect with Facebook')}
						labelPosition='after'
						variant='facebook'
						weight='primary'
						onClick={() => {
							props.ga('Authentication flow', 'Button click', 'Facebook');
							props.onOAuthClick('facebook');
						}}
					/>
					<Button
						icon={<TwitterIcon />}
						sort='social'
						label={props.translate('Connect with Twitter')}
						labelPosition='after'
						variant='twitter'
						weight='primary'
						onClick={() => {
							props.ga('Authentication flow', 'Button click', 'Twitter');
							props.onOAuthClick('twitter');
						}}
					/>
					<Button
						icon={<GoogleIcon />}
						label={props.translate('Connect with Google')}
						labelPosition='after'
						variant='google'
						weight='tertiary'
						onClick={() => {
							props.ga('Authentication flow', 'Button click', 'Google');
							props.onOAuthClick('google');
						}}
					/>
				</div>
				<Footer>
					<ul>
						<li>
							<span>
								{props.translate('You can also')}&nbsp;
								<a role="button" tabIndex="0" onClick={() => {
									props.ga('Authentication flow', 'Button click', 'Burner sign-in modal');
									props.onBurnerClick();
								}} onKeyPress={props.onBurnerClick} className="js_switch-to-burner-login">
									{props.translate('connect anonymously with a burner account.')}
								</a>
							</span>
						</li>
						<li>
							<span dangerouslySetInnerHTML={{ __html: disclaimer }} />
						</li>
					</ul>
				</Footer>
			</Form>
		</EnsureDefaultTheme>
	);
}

export default Analytics(OAuthLogin);
