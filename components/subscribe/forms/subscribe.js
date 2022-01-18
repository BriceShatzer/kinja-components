/* @flow */

import * as React from 'react';
import autobind from 'autobind-decorator';

import Analytics from '../../hoc/analytics';
import type { AnalyticsInjectedProps }  from '../../hoc/analytics';
import BlogLogo from '../../blog-logo';
import Button from '../../buttons';
import { Checkbox, validators } from '../../form';
import getMailingLists from '../getMailingLists';
import { SINGLE_OPT_IN_COUNTRY_CODES } from '../../../config/consts';

import type { TranslateFunction } from '../../translator';
import styled from 'styled-components';
import media from '../../../style-utils/media';
import { EnsureDefaultTheme } from '../../theme';

import type { SubscribeProps } from '../subscribe';
import type { Validator } from '../../form/validators/types';
import type { MailingList, MailingListId } from '../getMailingLists';

type SubscribeFormProps = SubscribeProps & AnalyticsInjectedProps & {
	// Translator for translated messages
	translate: TranslateFunction,
	onSubscribeFail?: () => void
};

type SubscribeFormState = {
	emailAddress: string,
	errors: Array<string>,
	isSubmitting: boolean,
	lists: Array<MailingListId>,
	previousAttempt: ?string,
};

export const FormWrapper = styled.div`
	padding: 30px;
	background-color: ${props => props.theme.color.whitesmoke};
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	text-align: center;
	line-height: 24px;
	max-width: 540px;

	${media.xlargeUp`
		max-width: 362px;
	`}
`;

const Content = styled.div`
	width: 300px;
`;

const Label = styled.label`
	&& {
		padding: 0;
		margin-bottom: 20px;
	}
`;

export const EmailField = styled.input.attrs({
	type: 'text'
})`
	&& {
		text-align: center;
		font-size: 1.125rem;
		padding-right: 0;
		width: 100%;
		height: 30px;
		line-height: 2rem;
		border-bottom: 1px solid ${props => props.theme.color[props.hasErrors ? 'error' : 'darkgray']};

		background: ${props => props.theme.color.whitesmoke};
		border-top: none;
		border-left: none;
		border-right: none;
		font-family: ${props => props.theme.typography.primary.fontFamily};
		transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;

		&:active,
		&:hover,
		&:focus {
			border-color: ${props => props.theme.color.primary};
			color: ${props => props.theme.color.primary};
		}

		&::placeholder {
			color: ${props => props.theme.color.midgray};
		}
	}
`;

const Copy = styled.div`
	font-size: 20px;
	margin-top: 15px;
	margin-bottom: 10px;

	${media.largeUp`
		font-size: 16px
	`}
`;

const LegalCopy = styled.div`
	margin-top: 40px;
	font-size: 14px;
	color: ${props => props.theme.color.darkgray};
`;

const MailingLists = styled.div`
	display: flex;
	flex-direction: column;
	margin: 8px auto;
	width: 210px;
`;

const MailingListItem = styled.div`
	font-size: 14px;
	text-align: left;
`;

export const ErrorMessage = styled.div`
	color: ${props => props.theme.color.error};
	font-size: 14px;
	margin-top: 2px;
`;
export const SubscribeButton = styled(Button)`
	background-color: ${props => props.theme.color.darkgray};
	cursor: pointer;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	letter-spacing: 0.5px;
	margin-top: 0;

	&:hover,
	&:active,
	&:focus {
		background-color: ${props => props.theme.color.darksmoke};
	}
`;

export class SubscribeForm extends React.Component<SubscribeFormProps, SubscribeFormState> {
	mailingLists: Array<MailingList>;
	emailValidators: Array<Validator>;

	constructor(props: SubscribeFormProps) {
		super(props);

		this.mailingLists = getMailingLists(props.blogGroup);

		const mailingListIds = this.mailingLists.map(l => l.id);

		const { format, required } = validators;
		this.emailValidators = [
			required.required(props.translate('Please enter an email address.')),
			format.email(props.translate('Please enter a valid email address.'))
		];

		this.state = {
			emailAddress: '',
			errors: [],
			isSubmitting: false,
			lists: mailingListIds,
			previousAttempt: null
		};
	}

	validateEmail = () => {
		const { emailAddress } = this.state;
		const firstError = this.emailValidators.map(validator => validator(emailAddress)).find(e => Boolean(e));
		this.setState({
			previousAttempt: emailAddress,
			errors: firstError ? [firstError] : []
		});

		return firstError ? false : this.validateEmailAsync();
	}

	validateMailingLists = () => {
		const needsMailingList = this.state.lists.length === 0 && this.mailingLists.length > 0;
		const errors = needsMailingList ? [this.props.translate('You need to select at least one of our lists to subscribe.')] : [];

		this.setState({ errors });

		return !needsMailingList;
	}

	validateEmailAsync = () => {
		// TODO - check MX records for email existence
		const errors = false;

		if (errors) {
			return false;
		} else {
			return true;
		}
	}

	@autobind
	handleListChange(id: MailingListId) {
		this.setState(prevState => {
			const { lists } = prevState;
			let { errors } = prevState;
			const currentIndex = lists.indexOf(id);

			if (currentIndex > -1) {
				lists.splice(currentIndex, 1);
			} else {
				lists.push(id);
			}

			if (lists.length === 0) {
				errors = [this.props.translate('You need to select at least one of our lists to subscribe.')];
			}

			return {
				errors,
				lists
			};
		});

	}

	@autobind
	handleEmailChange(event: SyntheticInputEvent<HTMLInputElement>) {
		const {target: { value: emailAddress }} = event;
		this.setState({ emailAddress });
	}

	handleSubmit = (e: ?SyntheticEvent<HTMLFormElement>) => {
		e && e.preventDefault();

		const validEmail = this.validateEmail();

		let validInput = true;
		if (validEmail && this.mailingLists.length > 0) {
			validInput = this.validateMailingLists();
		}

		if (validEmail && validInput) {
			this.beforeSubscribe();
		}
	}

	/*
	 * Async call to profile api before subscribe if singleOptIn is unknown
	 */
	beforeSubscribe() {
		const { getGeoCC } = this.props;

		if (getGeoCC) {
			getGeoCC()
				.then(geocc => {
					const countryAllowsSingleOptIn = geocc && SINGLE_OPT_IN_COUNTRY_CODES.includes(geocc.toLowerCase());
					this.subscribe({doubleOptIn: !countryAllowsSingleOptIn});
				});
		} else { // default to doubleOptIn if unable to sort out geoip status
			this.subscribe({doubleOptIn: true});
		}
	}

	/*
	 * Subscribes a user to a newsletter
	 */
	subscribe(params: {doubleOptIn?: boolean}) {
		const hasMultipleLists = this.mailingLists.length > 0 && this.mailingLists[0].provider === 'CampaignMonitor';
		const isConfigured = hasMultipleLists || Boolean(this.props.campaignMonitorNewsletterName);

		if (!isConfigured) {
			this.setState({
				errors: [this.props.translate('Newsletter is not configured for this site')]
			});
		} else {
			this.setState({
				isSubmitting: true
			});

			const doubleOptIn = params && params.doubleOptIn;

			const onSubscribeFail = response => {
				if (this.props.onSubscribeFail) {
					this.props.onSubscribeFail();
				} else if (response && response.error && response.error.message) {
					console.error(response.error.message);
				}

				this.setState({
					errors: [this.props.translate('An error happened. Please try again!')],
					isSubmitting: false
				});
			};

			const onSubscribeSuccess = () => {
				if (this.props.ga) {
					let successText = 'Success';

					if (this.state.lists.length > 0) {
						const selectedLists = this.state.lists.map(listId => this.mailingLists.find(list => listId === list.id));
						successText += ` | ${selectedLists.map(list => list && list.name).join(', ')}`;
					}
					this.props.ga('Newsletter', 'Sign Up - Footer', successText, {metric27: 1});
				}
				if (this.props.onSubscribeSuccess) {
					this.props.onSubscribeSuccess(doubleOptIn);
				}
			};

			let newsletters = [];

			if (hasMultipleLists) {
				newsletters = this.state.lists;
			} else if (this.props.campaignMonitorNewsletterName) {
				newsletters = [this.props.campaignMonitorNewsletterName];
			}
			const subscribeParams = {
				doubleOptIn: Boolean(doubleOptIn),
				email: this.state.emailAddress,
				newsletters,
				referralSource: document.referrer,
				referralUrl: document.location.href,
				sourceId: this.props.sourceId
			};

			return this.props.subscriptionsApi && this.props.subscriptionsApi.subscribe(subscribeParams)
				.then(onSubscribeSuccess, onSubscribeFail);
		}
	}

	renderMailingLists() {
		if (this.mailingLists.length) {
			return (
				<MailingLists>
					{this.mailingLists.map(list => (
						<MailingListItem key={list.key}>
							<Checkbox
								name={list.id}
								checked={this.state.lists.indexOf(list.id) > -1}
								label={list.name}
								onChange={() => this.handleListChange(list.id)}
								inlineHelp={list.description}
							/>
						</MailingListItem>)
					)}
				</MailingLists>
			);
		} else {
			return null;
		}
	}

	renderErrors(hasErrors: boolean): React.Node {
		return hasErrors ? this.state.errors.map(error => <ErrorMessage key={String(error)}>{String(error)}</ErrorMessage>) : null;
	}

	render() {
		const { blogGroup, displayName, translate } = this.props;
		const { emailAddress, isSubmitting } = this.state;
		const hasUnchangedEmail = emailAddress === this.state.previousAttempt;
		const hasUncheckedBoxes = this.mailingLists.length > 0 && this.state.lists.length === 0;
		const hasErrors = (hasUnchangedEmail || hasUncheckedBoxes) && !isSubmitting;

		const copy = {
			'avclub': translate('Newsletters for the pop culture obsessed.'),
			'clickhole': translate('Get ClickHole delivered straight to your spam folder.'),
			'deadspin': translate('Sports news without access, favor, or discretion.'),
			'gizmodo': translate('We come from the future — but our emails go right to your inbox.'),
			'jalopnik': translate('Follow the cult of cars and everything that moves you.'),
			'jezebel': translate('Celebrity, sex, and fashion news for women. Without airbrushing.'),
			'kotaku': translate('Your guide to everything happening in the gaming world.'),
			'lifehacker': translate('Hacking literally your entire life, starting with your inbox.'),
			'theonion': translate('Give your spam filter something to do.'),
			'theroot': translate('Commentary and news from a variety of black perspectives.')
		};

		const customSubscribeCopy = copy[blogGroup];
		const shouldUseCustomCopy = this.props.customSubscribeCopyEnabled && customSubscribeCopy;
		const subscribeCopy = shouldUseCustomCopy ?
			customSubscribeCopy :
			translate('Want {blog_name}’s email newsletter?', { blog_name: displayName });

		const mailingLists = this.renderMailingLists();
		const errors = this.renderErrors(hasErrors);

		return (
			<EnsureDefaultTheme>
				<FormWrapper>
					<Form onSubmit={this.handleSubmit}>
						<BlogLogo name={blogGroup} scale={0.5} />
						<Copy>{subscribeCopy}</Copy>
						<Content>
							{mailingLists}
							<Label className="field">
								<EmailField
									hasErrors={hasErrors}
									name="emailAddress"
									onChange={this.handleEmailChange}
									placeholder="Your email address"
								/>
							</Label>
							{errors}
							<SubscribeButton
								disabled={hasErrors}
								hasErrors={hasErrors}
								label={translate('Subscribe')}
								type="submit"
								small
							/>
						</Content>
					</Form>
					<LegalCopy>
						{/* eslint-disable-next-line max-len */}
						By subscribing you agree to our <a href="https://g-omedia.com/terms-of-service/">Terms of Use</a> and <a href="https://g-omedia.com/privacy-policy/">Privacy Policy</a>.
					</LegalCopy>
				</FormWrapper>
			</EnsureDefaultTheme>
		);
	}
}

export default Analytics(SubscribeForm);
