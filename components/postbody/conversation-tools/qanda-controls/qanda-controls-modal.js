// @flow

import React from 'react';
import styled from 'styled-components';

import Modal, { ChildrenWrapper } from 'kinja-components/components/modal/modal';
import TabBar from 'kinja-components/components/elements/tab-bar';
import Textfield18 from 'kinja-components/components/form/textfield18';
import { validators } from 'kinja-components/components/form';
import Button19 from 'kinja-components/components/button19';
import AvatarUploader from 'kinja-components/components/avatar-uploader';
import { Loading, Spinner } from 'kinja-components/components/elements/loader';
import media from 'kinja-components/style-utils/media';
import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';

import type { Image as ImageType } from 'kinja-components/components/types';
import type { Locale } from 'kinja-magma/models/Locale';
import type { Props as AvatarUploaderProps } from 'kinja-components/components/avatar-uploader/avatar-uploader';
import type { TranslateFunction } from 'kinja-components/components/translator';
import type { Validator } from 'kinja-components/components/form/validators/types';


const TextfieldWrapper = styled.div`
	display: flex;
	justify-content: space-between;

	> * {
		flex-basis: auto;
		width: 47%;
	}
`;

const FormContentWrapper = styled.div`
	display: flex;

	> * {
		width: 50%;
	}

	${TextfieldWrapper} {
		flex-direction: column;

		> * {
			width: 100%;
		}
	}
`;

const Form = styled.form`
	width: 100%;
`;

const StyledModal = styled(Modal)`
	${ChildrenWrapper} {
		width: 100%;
	}

	${Spinner} {
		float: left;
	}

	${media.mediumUp`
		&& {
			justify-content: ${({ displaySuccessMessage }) => displaySuccessMessage ? 'center' : 'flex-start'};
			max-width: 860px;
			height: 450px;
		}
	`}
`;


export type SubmitType = {
	avatar?: ?ImageType,
	displayName?: string,
	emailAddress: string,
	screenName: string
}

type Props = {
	avatarUploaderProps: AvatarUploaderProps,
	getNewParticipants: () => void,
	locale: Locale,
	isOpen: boolean,
	onClose: () => void,
	onSubmit: SubmitType => Promise<*>
}

type DefaultProps = {
	locale: Locale
}

type State = {
	activeTab: string,
	avatar: ?ImageType,
	displayName: string,
	displayNameErrorMessage: string,
	emailAddress: string,
	emailErrorMessage: string,
	isLoading?: boolean,
	isModalOpen: boolean,
	hasInviteBeenSent: boolean,
	requestErrorMessage?: string,
	screenName: string,
	screenNameErrorMessage: string
};

export default class QAndAControlsModal extends React.Component<Props, State> {
	emailValidators: Array<Validator>;
	initialState: State;
	inputValidators: Array<Validator>;
	translate: TranslateFunction;
	tabs: Array<string>;

	static defaultProps: DefaultProps = {
		locale: 'en-US'
	}

	constructor(props: Props) {
		super(props);
		this.translate = createTranslate(translations, props.locale);
		this.tabs = [this.translate('Invite new user'), this.translate('Invite existing user')];

		this.state = {
			...this.initialState,
			activeTab: this.tabs[0],
			isLoading: false
		};

		this.initialState = {
			activeTab: '',
			avatar: null,
			displayName: '',
			displayNameErrorMessage: '',
			emailAddress: '',
			emailErrorMessage: '',
			isModalOpen: false,
			hasInviteBeenSent: false,
			requestErrorMessage: '',
			screenName: '',
			screenNameErrorMessage: ''
		};

		this.emailValidators = [
			validators.required.required(this.translate('Please enter an email address.')),
			validators.format.email(this.translate('Please enter a valid email address.'))
		];

		this.inputValidators = [
			validators.length.minLength(3, this.translate('Please enter a user name that is at least three characters long.')),
			validators.length.maxLength(63, this.translate('Display name must be no longer than 63 characters.')),
			validators.format.doesntStartWithDash(this.translate('Your user name must begin with a number or a letter.'))
		];
	}

	componentDidMount() {
		this.setState({ activeTab: this.tabs[0] });
	}

	emailErrorMessage = (): string => {
		return this.emailValidators.map(validator => validator(this.state.emailAddress)).find(err => Boolean(err)) || '';
	}

	usernameErrorMessage = (): string => {
		if (!this.state.screenName) {
			return this.translate('Please enter a valid a username.');
		} else {
			return this.inputValidators.map(validator => validator(this.state.screenName)).find(err => Boolean(err)) || '';
		}
	}

	displayNameErrorMessage(): string {
		if (!this.state.displayName) {
			return this.translate('Please enter a valid a display name.');
		} else {
			return this.inputValidators.map(validator => validator(this.state.displayName)).find(err => Boolean(err)) || '';
		}
	}

	onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { activeTab, avatar, displayName, emailAddress, screenName } = this.state;
		const forNewUser = this.tabs.indexOf(activeTab) === 0;
		const emailErrorMessage = this.emailErrorMessage() || '';
		const screenNameErrorMessage = this.usernameErrorMessage() || '';
		const displayNameErrorMessage = forNewUser ? this.displayNameErrorMessage() || '' : '';
		const hasNoErrorMessages = !emailErrorMessage && !screenNameErrorMessage && !displayNameErrorMessage;

		if (hasNoErrorMessages) {
			const participantObject = { avatar, displayName, emailAddress, forNewUser, screenName };
			this.setState({ isLoading: true }, () => {
				this.props.onSubmit(participantObject).then(res => {
					if (res.status) {
						this.setState({ ...this.initialState, hasInviteBeenSent: true, isLoading: false }, () => {
							this.props.getNewParticipants();
						});
					} else {
						this.setState({
							...this.initialState,
							hasInviteBeenSent: true,
							isLoading: false,
							requestErrorMessage: res.message
						});
					}
				});
			});
		} else {
			this.setState({ displayNameErrorMessage, emailErrorMessage, screenNameErrorMessage });
		}
	}

	onAvatarUploadSuccess = (image: ImageType) => {
		this.setState({ avatar: image });
	}

	onTabChange = (activeTab: string) => {
		this.setState({ ...this.initialState, activeTab });
	}

	onDisplayNameChange = (displayName: string) => {
		this.setState({ displayName, displayNameErrorMessage: '' });
	}

	onEmailChange = (emailAddress: string) => {
		this.setState({ emailAddress, emailErrorMessage: '' });
	}

	onUsernameChange = (screenName: string) => {
		this.setState({ screenName, screenNameErrorMessage: '' });
	}

	onModalClose = () => {
		this.props.onClose();
		this.setState({ hasInviteBeenSent: false });
	}

	render() {
		const { activeTab, displayNameErrorMessage, emailErrorMessage, hasInviteBeenSent, isLoading, requestErrorMessage, screenNameErrorMessage } = this.state;
		const activeTabIndex = this.state.activeTab ? this.tabs.indexOf(activeTab) : 0;
		const isInviteNewUserTabActive = activeTabIndex === 0;
		const { avatarUploaderProps, isOpen } = this.props;
		const inviteText = requestErrorMessage ? this.translate('Something went wrong') : this.translate('The invite has been sent');

		return (
			<StyledModal isOpen={isOpen} onClose={this.onModalClose} regular displaySuccessMessage={hasInviteBeenSent}>
				{hasInviteBeenSent
					? (
						<React.Fragment>
							<h3>{inviteText}.</h3>
							{requestErrorMessage
								? <p>{requestErrorMessage}</p>
								: <Button19 label="Ok" onClick={this.onModalClose} />
							}
						</React.Fragment>
					) : (
						<React.Fragment>
							<TabBar activeTab={this.tabs[activeTabIndex]} tabs={this.tabs} onChange={this.onTabChange} />
							<Form onSubmit={this.onSubmit} isInviteNewUserTabActive={isInviteNewUserTabActive}>
								{activeTabIndex === 0
									? (
										<FormContentWrapper>
											<TextfieldWrapper>
												<Textfield18 inlineHelp={this.translate('Display Name')}
													name="displayName"
													onChange={this.onDisplayNameChange}
													type="text"
													error={displayNameErrorMessage}
												/>
												<Textfield18 inlineHelp={this.translate('Email Address')}
													name="email"
													onChange={this.onEmailChange}
													type="email"
													error={emailErrorMessage}
												/>
												<Textfield18 inlineHelp={this.translate('Username')}
													name="username"
													onChange={this.onUsernameChange}
													type="text"
													error={screenNameErrorMessage}
												/>
											</TextfieldWrapper>

											<AvatarUploader {...avatarUploaderProps} onChange={this.onAvatarUploadSuccess} />
										</FormContentWrapper>
									) : (
										<TextfieldWrapper>
											<Textfield18 inlineHelp={this.translate('Email Address')}
												name="email"
												onChange={this.onEmailChange}
												type="email"
												error={emailErrorMessage}
											/>
											<Textfield18 inlineHelp={this.translate('Username')}
												name="username"
												onChange={this.onUsernameChange}
												type="text"
												error={screenNameErrorMessage}
											/>
										</TextfieldWrapper>
									)}

								{isLoading
									? <Loading />
									: <Button19 label={this.translate('Send Invite')} type="submit" />
								}
							</Form>
						</React.Fragment>
					)}
			</StyledModal>
		);
	}
}