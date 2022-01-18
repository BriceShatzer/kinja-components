// @flow

import * as React from 'react';
import styled from 'styled-components';

import { gridValue } from '../grid-utils';
import media from '../../style-utils/media';
import Button19, { ButtonWrapper } from '../button19';
import Checkmark from '../icon19/Checkmark';
import translations from './translations';
import createTranslate from '../translator';
import Theme from '../theme';
import { colors } from '../theme/themes';

import Blog from 'kinja-magma/models/Blog';
import type { Newsletter } from 'kinja-magma/models/Newsletter';

const Wrapper = styled.div`
	height: 100vh;

	${media.smallOnly`
		width: ${gridValue.small('6c')};
	`}
	${media.mediumOnly`
		width: ${gridValue.medium('6c')};
	`}
	${media.mediumDown`
		margin: 1rem auto;
	`}
	${media.largeUp`
		margin: 3rem auto;
	`}
	${media.largeOnly`
		width: ${gridValue.large('6c')};
	`}
	${media.xlargeOnly`
		width: ${gridValue.xlarge('8c')};
	`}
	${media.xxlargeUp`
		width: ${gridValue.xxlarge('6c')};
	`}

	${ButtonWrapper} {
		width: 100%;

		label {
			margin: auto;
		}
	}
`;

const Head = styled.h2`
	color: ${props => props.green ? colors.success : 'inherit'};
	font-family: ${props => props.theme.typography.headline.fontFamily};
	display: flex;
	align-items: center;

	${media.mediumDown`
		font-size: ${props => props.theme.typography.headline.fontSizes.medium};
		line-height: ${props => props.theme.typography.headline.lineHeights.medium};
	`}
	${media.largeUp`
		font-size: ${props => props.theme.typography.headline.fontSizes.large};
		line-height: ${props => props.theme.typography.headline.lineHeights.large};
	`}
`;

const Text = styled.p`
	font-family: ${props => props.theme.typography.body.fontFamily};
	font-size: ${props => props.theme.typography.body.fontSizes.small};
	line-height: ${props => props.theme.typography.body.lineHeights.small};
`;

const TwoButtons = styled.div`

	${ButtonWrapper} {
		float: left;
		width: 48%;
		margin-right: 4%;
	}

	${ButtonWrapper}:last-child {
		float: none;
		margin-right: 0;
	}
`;

type Props = {
	newsletter: Newsletter,
	blog: Blog
};

export const Subscribed = ({newsletter, blog}: Props) => {
	const translate = createTranslate(translations, blog.locale);

	return (
		<Theme blog={blog && blog.blogTheme}>
			<Wrapper>
				<Head green={true}>
					<Checkmark css='margin-right: 8px;'/>
					{translate('You’re subscribed!')}
				</Head>
				<Text>
					{translate('Your email is confirmed and you’ve been added to our list. Thank you for signing up to {name}.', {
						name: newsletter.title
					})}
				</Text>
				<Button19
					tag='a'
					href={`//${blog.canonicalHost}/`}
					rel='noopener noreferrer'
					label={translate('Go to {blog}', {blog: blog.displayName})}
					variant='secondary'
				/>
			</Wrapper>
		</Theme>
	);
};

export const Unsubscribe = ({
	newsletter,
	blog,
	subscriptionToken
}: Props & {
	subscriptionToken: string
}) => {
	const translate = createTranslate(translations, blog.locale);

	return (
		<Theme blog={blog && blog.blogTheme}>
			<Wrapper>
				<Head>{translate('Please confirm your unsubscription')}</Head>
				<Text>
					{translate('We’re sad to see you go. Please confirm that you want to unsubscribe from the {name} list. ')}
					{translate('If you changed your mind, just hit Cancel or close this window.', {
						name: newsletter.title
					})}
				</Text>
				<TwoButtons>
					<Button19
						tag='a'
						href={`/newsletter/unsubscribe/confirm?subscriptionToken=${subscriptionToken}`}
						rel='noopener noreferrer'
						label={translate('Unsubscribe')}
						variant='secondary'
					/>
					<Button19
						tag='a'
						href={'/'}
						rel='noopener noreferrer'
						label={translate('Cancel')}
						variant='secondary'
					/>
				</TwoButtons>
			</Wrapper>
		</Theme>
	);
};


export const Unsubscribed = ({newsletter, blog}: Props) => {
	const translate = createTranslate(translations, blog.locale);

	return (
		<Theme blog={blog && blog.blogTheme}>
			<Wrapper>
				<Head>{translate('You successfully unsubscribed')}</Head>
				<Text>{translate('You’ve been removed from the {name} list and won’t receive any further emails from this list.', {
					name: newsletter.title
				})}</Text>
				<Text>{translate('If you unsubscribed in error you can re-subscribe here:')}</Text>
				<Button19
					tag='a'
					href='/newsletter'
					rel='noopener noreferrer'
					label={translate('Re-subscribe')}
					variant='secondary'
				/>
			</Wrapper>
		</Theme>
	);
};
