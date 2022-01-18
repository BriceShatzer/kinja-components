// @flow

import React from 'react';
import styled from 'styled-components';

import Theme from 'kinja-components/components/theme';
import Button19 from 'kinja-components/components/button19';
import createTranslate from 'kinja-components/components/translator';
import translations from './translations';
import getNewsletterCopy from 'kinja-components/components/newsletter/newsletterCopy';
import type Blog from 'kinja-magma/models/Blog';
import type { Locale } from 'kinja-magma/models/Locale';
import BlogAvatar, {BlogAvatarWrapper, blogAvatars} from 'kinja-components/components/blog-avatar';

const Container = styled.div`
	width: 100%;
	font-weight: 700;
	display: flex;
	flex-direction: column;

	button {
		margin-top: 16px;
		justify-content: center;
	}
	${BlogAvatarWrapper} {
		margin-right: 16px;
		min-width: 64px;

		svg[aria-label="GO avatar"] {
			background-color: ${({ theme }) => theme.color.logo};

			path {
				fill: ${({ theme }) => theme.color.white};
			}
		}
	}
`;

const Header = styled.div`
	text-transform: uppercase;
	font-size: 16px;
	padding-bottom: 3px;
	margin-bottom: 12px;
	border-bottom: 1px solid ${({ theme }) => theme.color.lightgray};
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: row;
	font-size: 18px;
	
	color: ${({ theme }) => theme.color.darksmoke};
`;

const FallbackAnchor = styled.a`
	&:hover { text-decoration: none; }

	button {
		width: 100%;
	}
`;

type Props = {
	blog: Blog,
	locale: Locale,
	action?: Function
}

export default function NewsletterPromoModule(props: Props) {
	const {
		blog,
		locale,
		action
	} = props;
	const translate = createTranslate(translations, locale);
	const isAvailableAvatar = (value: string) => Object.keys(blogAvatars).includes(value);
	let avatarName;

	if (isAvailableAvatar(blog.name)) {
		avatarName = blog.name;
	} else if (blog.properties.blogGroup && isAvailableAvatar(blog.properties.blogGroup)) {
		avatarName = blog.properties.blogGroup;
	} else {
		avatarName = 'gomedia';
	}

	const SubscribeButton = () => {
		return action ? (
			<Button19
				label={'Subscribe'}
				onClick={()=>action()}
			/>
		) : (
			<FallbackAnchor href={`//${blog.canonicalHost}/newsletter`}>
				<Button19 label={'Subscribe'} />
			</FallbackAnchor>
		);
	};

	return (
		<Theme blog={blog.blogTheme}>
			<Container>
				<Header>{translate('Subscribe To Our Newsletter')}</Header>
				<ContentContainer>
					<BlogAvatar name={avatarName} />
					{getNewsletterCopy(blog)}
				</ContentContainer>
				<SubscribeButton />
			</Container>
		</Theme>
	);
}

NewsletterPromoModule.defaultProps = {
	locale: 'en-US'
};