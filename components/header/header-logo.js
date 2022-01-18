// @flow

import React from 'react';
import styled from 'styled-components';

import { mainBlogNames } from '../../config/consts';
import BlogLogo, { LogoWrapper } from '../blog-logo';
import HeaderTitle from './header-title';
import type Blog from 'kinja-magma/models/Blog';
import { EnsureDefaultTheme } from '../theme';
import type { AnalyticsInjectedProps } from '../hoc/analytics';
import media from '../../style-utils/media';
import imageUrl from 'kinja-images/imageUrl';
import {
	withPlatform,
	type PlatformInjectedProps
} from '../hoc/context';

import type SimpleImage from 'kinja-magma/models/SimpleImage';

type Props = {
	blog?: Blog,
	title?: string,
	mobileTitle?: string,
	subTitle?: string,
	isScrollback: boolean
}
& AnalyticsInjectedProps
& PlatformInjectedProps;

export const LogoLink = styled.a`
	height: 100%;
	font-size: 1.5rem;
	color: ${props => props.theme.color.darksmoke};
	font-weight: bold;
	display: flex;
	align-items: center;

	&:hover {
		text-decoration: none;
		color: ${props => props.theme.color.black};
	}

	${LogoWrapper} {
		--scale: 0.8;
	}

	${media.largeDown`
		${LogoWrapper} {
			--scale: 0.6;
		}
	`}
`;

const ImageLogo = styled.img`
	vertical-align: middle;
	margin-top: 0;
	height: auto;
	max-width: 100%;
	max-height: 30px;
`;

const sitesWithLogoOverride = [
	'esgizmodo'
];

const AmpLogo = ({logo}: {logo: SimpleImage}) => {
	const logosrc = imageUrl(logo.id, 'AmpBlogLogo', logo.format);
	return <amp-img src={logosrc} width="270" height="30" noloading=""/>;
};

const Logo = ({blog, platform}: {blog?: Blog, platform?: string}) => {
	if (blog && mainBlogNames.includes(blog.blogGroup) && !sitesWithLogoOverride.includes(blog.name)) {
		return <BlogLogo name={blog.blogGroup} />;
	} else if (blog && blog.logo) {
		if (platform === 'amp') {
			return <AmpLogo logo={blog.logo}/>;
		}

		const logoSrc = imageUrl(blog.logo.id, 'BlogLogoTall', blog.logo.format);
		return <ImageLogo src={logoSrc} />;
	} else if (blog && blog.displayName) {
		return (<HeaderTitle
			title={blog.displayName}
		/>);
	} else {
		return <BlogLogo name="kinja" />;
	}
};

const getLogoContent = (props: Props) => {
	const { title, mobileTitle, blog, platform } = props;

	if (title) {
		return <HeaderTitle title={title} mobileTitle={mobileTitle} />;
	} else {
		return (<Logo
			blog={blog}
			platform={platform}
		/>);
	}
};

const HeaderLogo = (props: Props) => {
	const { blog, ga, isScrollback } = props;
	const hasParent = blog && blog.parentId;
	const eventAction = `${hasParent ? 'Vertical logo click' : 'Logo click'}${isScrollback ? ' - scroll back' : ''}`;
	return (
		<EnsureDefaultTheme>
			<LogoLink
				href={blog && `//${blog.canonicalHost}`}
				title={blog && blog.displayName}
				onClick={() => ga('Sub navigation', eventAction, blog && blog.displayName)}
			>
				{getLogoContent(props)}
			</LogoLink>
		</EnsureDefaultTheme>
	);
};

export default withPlatform(HeaderLogo);
