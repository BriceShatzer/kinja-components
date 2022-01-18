// @flow

import * as React from 'react';
import styled from 'styled-components';

import { colors } from  '../theme/themes';
import Button from '../buttons';
import Loading from '../elements/loader/load-indicator';
import TextField18 from '../form/textfield18';
import Theme from 'kinja-components/components/theme';
import BlogLogo, { LogoWrapper } from '../blog-logo';
import Close24 from '../icon19/Close24';
import Blog from 'kinja-magma/models/Blog';
import getNewsletterCopy from './newsletterCopy';

import type { OnChangeCallback } from '../form/textfield18/textfield';

export type NewsletterProps = {
	blog: Blog,
	closeModal: () => void,
	emailAddress: string,
	error: string,
	loading: boolean,
	setEmailAddress: OnChangeCallback,
	subscribeClick: () => Promise<void>,
	successful: boolean,
	doubleOptIn?: boolean
};

const ModalContainer = styled.div`
	display: flex;
	margin: 20px 0;
	width: 480px;
	flex-direction: column;
	justify-content: flex-start;
`;

const HeaderContainer = styled.div`
	display: flex;
	position: relative;
	top: -40px;
	left: -40px;
	width: 560px;
	flex-direction: row;
	height: 112px;
	flex-shrink: 0;
	flex-grow: 0;
	background-color: ${props => props.theme.color.logo};
	margin-top: 0;
	padding-right: 40px;
`;

const BlogLogoContainer = styled.div`
	display: flex;
	flex-grow: 1;
	height: 100%;
	align-items: center;
	margin-left: 40px;

	${LogoWrapper} {
		--scale: 1;
		color: ${props => props.theme.color.white};
	}
`;

const CloseModalContainer = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	align-self: flex-end;
	color: ${props => props.theme.color.white};
	cursor: pointer;

	&:hover {
		color: ${props => props.theme.color.lightgray};
	}
`;

const SubscribeToOurNewsletter = styled.div`
	color: ${colors.darksmoke};
	font-size: 32px;
	font-weight: bold;
	font-family: "ProximaNovaCond", sans-serif;
	line-height: 36px;
`;

const BlurbContainer = styled.div`
	color: ${colors.darksmoke};
	font-family: "ElizabethSerif", Georgia, serif;
	font-size: 17px;
	line-height: 32px;
	margin-top: 16px;
`;

const EmailInputContainer = styled.div`
	margin-top: 32px;
`;

const TermsAndPrivacyContainer = styled.div`
	font-family: "ProximaNovaCond", sans-serif;
	color: ${colors.gray};
	margin-top: -24px;
	font-size: 14px;
	line-height: 21px;
`;

const SubscribeButtonContainer = styled.div`
	margin-top: 40px;
	width: 123px;
	height: 42px;
`;

const LoaderContainer = styled.div`
	display: flex;
	align-items: center;
	height: 200px;
`;

const SuccessfulSignUp = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 200px;
	color: ${props => props.theme.color.success};
	font-size: 18px;
`;



const Newsletter = (props: NewsletterProps) => {
	const { blog, closeModal, loading, successful, subscribeClick, error, emailAddress, setEmailAddress, doubleOptIn } = props;
	const validateEmail = () => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
	};

	const blogTheme = blog && blog.blogTheme;
	const blogName = blog && blog.blogGroup;

	const successMessage = doubleOptIn ?
		'Thanks for subscribing! You should receive a confirmation email shortly' :
		'You are signed up!';

	return (
		<Theme blog={blogTheme}>
			<ModalContainer>
				<HeaderContainer>
					<BlogLogoContainer>
						<BlogLogo name={blogName} monochrome />
					</BlogLogoContainer>
					<CloseModalContainer onClick={closeModal}>
						<Close24 />
					</CloseModalContainer>
				</HeaderContainer>
				<div>
					<SubscribeToOurNewsletter>
						Subscribe to our Newsletter!
					</SubscribeToOurNewsletter>
					<BlurbContainer>
						{getNewsletterCopy(blog)}
					</BlurbContainer>
					{!loading && successful &&
						<SuccessfulSignUp>{successMessage}</SuccessfulSignUp>
					}
					{loading && <LoaderContainer><Loading /></LoaderContainer>}
					{!loading && !successful && <>
						<EmailInputContainer>
							<TextField18
								name="newsletter_modal"
								label="Your e-mail address"
								description="Your e-mail address"
								value={emailAddress}
								onChange={setEmailAddress}
								type="email"
								error={error}
							/>
						</EmailInputContainer>
						<TermsAndPrivacyContainer>By subscribing you agree to our
							<a href="https://g-omedia.com/terms-of-service/"> Terms of Use</a> and
							<a href="https://g-omedia.com/privacy-policy/"> Privacy Policy</a>.
						</TermsAndPrivacyContainer>
						<SubscribeButtonContainer>
							<Button
								label="Subscribe"
								onClick={subscribeClick}
								disabled={!validateEmail()}
							/>
						</SubscribeButtonContainer>
						</>
					}
				</div>
			</ModalContainer>
		</Theme>
	);
};

export default Newsletter;
