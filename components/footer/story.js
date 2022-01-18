/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	boolean,
	select,
	storiesOf,
	withDocs
} from 'base-storybook';

import Footer from './footer';
import {
	FooterLegal,
	FooterLinks,
	FooterLogo,
	FooterNetwork,
	FooterSocial
} from './subcomponents';
import { StoreRedirect } from './modals';

import footerTranslations from './footerTranslations';
import Modal from '../modal';
import createTranslate from '../translator';
import { NETWORK_BLOGS } from '../../config/consts';
import README from './README.md';

import blog1 from '../../__stubs__/gizmodo.json';
import blog2 from '../../__stubs__/theonion.json';
import blog3 from '../../__stubs__/avclub.json';
import Blog from 'kinja-magma/models/Blog';

const blogs = {
	[blog1.displayName]: Blog.fromJSON(blog1),
	[blog2.displayName]: Blog.fromJSON(blog2),
	[blog3.displayName]: Blog.fromJSON(blog3)
};

const blogOptions = Object.keys(blogs);

const CenteredGreyDiv = styled.div`
	align-items: center;
	background: #222;
	display: flex;
	justify-content: space-around;
`;

const wrapInFooter = child => (
	<CenteredGreyDiv>
		{child}
	</CenteredGreyDiv>
);

const FullWidthWrapper = styled.div`
	flex: 1;
`;

storiesOf('4. Components|Navigation/Footer', module)
	.addDecorator(withDocs(README))
	.add('Blog Footer', () => {
		const blog = blogs[select('blog', blogOptions, blogOptions[0])];
		const isNonBlogPage = boolean('Non-blog page', false);
		const showFooterLogo = boolean('Show Footer Logo', true);
		const enableStoreLink = boolean('Enable store link', true);

		const language = select('Locale', {
			'en-US': 'English (en)',
			'es-ES': 'Spanish (es)'
		}, 'en-US');

		const footerProps = {
			blog: isNonBlogPage ? undefined : blog,
			feature: { isOn: () => true },
			ga: (s1: mixed, s2: mixed, s3: mixed) => action('ga event')(...[s1, s2, s3]),
			language,
			showFooterLogo: !isNonBlogPage && showFooterLogo,
			enableStoreLink,
			enableSitemap: false
		};

		return (
			<FullWidthWrapper>
				<Footer {...footerProps} />
			</FullWidthWrapper>
		);
	})
	.add('Generic Footer', () => {
		const language = select('Locale', {
			'en-US': 'English (en)',
			'es-ES': 'Spanish (es)'
		}, 'en-US');

		const footerProps = {
			feature: { isOn: () => true },
			ga: (s1: mixed, s2: mixed, s3: mixed) => action('ga event')(...[s1, s2, s3]),
			language,
			enableSitemap: false
		};

		return (
			<FullWidthWrapper>
				<Footer {...footerProps} redirectHandler={(url: string) => action('redirect')(url)}/>
			</FullWidthWrapper>
		);
	})
	.add('Legal', () => {
		const blog = blogs[select('blog', blogOptions, blogOptions[0])];

		const legalProps = {
			blogGroup: blog.blogGroup
		};

		return wrapInFooter(
			<FooterLegal {...legalProps} />
		);
	})
	.add('Links', () => {
		const translate = createTranslate(footerTranslations, select('Locale', {
			'en-US': 'English (en)',
			'es-ES': 'Spanish (es)'
		}, 'en-US'));

		const blog = blogs[select('blog', blogOptions, blogOptions[0])];

		const linksProps = {
			showAboutLink: Boolean(blog.properties.aboutPostId),
			feature: { isOn: () => true },
			ga: (s1: mixed, s2: mixed, s3: mixed) => action('ga event')(...[s1, s2, s3]),
			toggleStoreModal: () => action('opening store modal!'),
			translate,
			enableSitemap: false
		};

		return wrapInFooter(
			<FooterLinks {...linksProps} />
		);
	})
	.add('Logo', () => {
		const blog = blogs[select('blog', blogOptions, blogOptions[0])];

		const logoProps = {
			blogGroup: blog.blogGroup
		};

		return wrapInFooter(
			<FooterLogo {...logoProps} />
		);
	})
	.add('Network', () => {
		const blog = blogs[select('blog', blogOptions, blogOptions[0])];

		const networkProps = {
			blogGroup: blog.blogGroup,
			networkBlogs: NETWORK_BLOGS,
			ga: (s1: mixed, s2: mixed, s3: mixed) => action('ga event')(...[s1, s2, s3])
		};

		return wrapInFooter(
			<FooterNetwork {...networkProps} />
		);
	})
	.add('Social', () => {
		const blog = blogs[select('blog', blogOptions, blogOptions[0])];

		const {
			facebookScreenName,
			twitterScreenName,
			instagramScreenName,
			youtubeUrl,
			canonicalHost
		} = blog;

		const socialProps = {
			canonicalHost,
			facebookScreenName,
			ga: (s1: mixed, s2: mixed, s3: mixed) => action('ga event')(...[s1, s2, s3]),
			instagramScreenName,
			twitterScreenName,
			youtubeUrl
		};

		return wrapInFooter(
			<FooterSocial {...socialProps} />
		);
	})
	.add('Store Redirect Modal', () => {
		const blog = blogs[select('blog', blogOptions, blogOptions[0])];

		const modalProps = {
			blur: true,
			fullscreen: true,
			isOpen: boolean('Is open', true),
			onClose: () => action('modal')('close')
		};

		const storeRedirectProps = {
			blogGroup: blog.blogGroup,
			displayName: blog.displayName,
			redirectHandler: (url: string) => action('redirect')(url),
			toggleStoreModal: () => action('modal')('close')
		};

		return (
			<Modal {...modalProps} >
				<StoreRedirect {...storeRedirectProps} />
			</Modal>
		);
	});
