/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import { BLOG_GROUPS } from '../../config/consts';
import footerTranslations from './footerTranslations';
import Analytics from '../hoc/analytics';
import type { AnalyticsInjectedProps }  from '../hoc/analytics';
import OnScreen from '../hoc/on-screen';
import type { OnScreenInjectedProps } from '../hoc/on-screen';
import {
	FooterLegal,
	FooterLinks,
	FooterLogo,
	FooterNetwork,
	FooterSocial
} from './subcomponents';
import createTranslate from '../translator';
import type { TranslateFunction } from '../translator';
import { EnsureDefaultTheme } from '../theme';

import { FooterList } from './subcomponents';
import Link from '../elements/link';

import type Blog from 'kinja-magma/models/Blog';

type FooterProps = {
	blog?: ?Blog,
	enableStoreLink?: boolean,
	enableSourcePoint?: boolean,
	enableSitemap: boolean,
	hideContentGuide?: boolean,
	language?: string,
	showFooterLogo?: boolean
} & AnalyticsInjectedProps & OnScreenInjectedProps;

const FooterWrap = styled.footer`
	padding-bottom: 0;
	width: 100%;
`;

const FooterNav = styled.div`
	background-color: ${props => props.theme.color.darksmoke};
	padding-top: 40px;

	@media and (max-width: ${props => props.theme.breakpointMedium}) {
		overflow-x: hidden;
	}
`;

const SourcePointListWrapper = styled.div`
	padding-bottom: 38px;
`;
const SourcePointList = styled(FooterList)``;

export class Footer extends React.Component<FooterProps> {
	static displayName = 'Footer';

	static defaultProps = {
		language: 'en-US'
	};

	translate: TranslateFunction;

	constructor(props: FooterProps) {
		super(props);

		this.translate = createTranslate(footerTranslations, props.language);
	}

	componentWillReceiveProps = (newProps: FooterProps) => {
		if (this.props.language !== newProps.language) {
			this.translate = createTranslate(footerTranslations, newProps.language);
		}
		if (!this.props.isVisible && newProps.isVisible) {
			this.props.ga('Footer', 'scroll', 'complete', {nonInteraction: 1});
		}
	}

	renderGenericFooter() {
		const footerLinksProps = {
			ga: this.props.ga,
			translate: this.translate,
			enableSitemap: false
		};

		return (
			<EnsureDefaultTheme>
				<FooterWrap className="js_footer">
					<FooterNav>
						<FooterLinks {...footerLinksProps} />
						<FooterNetwork ga={this.props.ga} />
						<FooterLegal />
					</FooterNav>
				</FooterWrap>
			</EnsureDefaultTheme>
		);
	}

	renderBlogFooter(blog: Blog) {
		const { enableStoreLink, ga, hideContentGuide, showFooterLogo, enableSourcePoint, enableSitemap } = this.props;
		const { blogGroup } = blog;
		const displayName = BLOG_GROUPS[blogGroup] || blog.displayName;
		const showAboutLink = Boolean(blog.properties && blog.properties.aboutPostId);
		const footerLinksProps = {
			enableStoreLink,
			enableSitemap,
			blogGroup,
			displayName,
			hideContentGuide,
			showAboutLink,
			ga,
			translate: this.translate
		};

		const footerNetworkProps = {
			blogGroup,
			ga
		};

		const footerSocialProps = {
			canonicalHost: blog.canonicalHost,
			facebookScreenName: blog.facebookScreenName,
			ga,
			instagramScreenName: blog.instagramScreenName,
			showFooterLogo,
			twitterScreenName: blog.twitterScreenName,
			youtubeUrl: blog.youtubeUrl
		};

		const shouldRenderConsentLink = enableSourcePoint && window.__consent__ !== undefined;
		const gdprMessage = this.translate('Manage Privacy Settings');
		const ccpaMessage = this.translate('Do Not Sell My Data');

		const renderGdprLink = () => {
			return <SourcePointList>
				<li>
					<Link onClick={() => window._sp_.loadPrivacyManagerModal(6626, '5e2889d2f2436f01dc3c1135')}>
						{gdprMessage}
					</Link>
				</li>
			</SourcePointList>;
		};

		const renderCcpaLink = () => {
			return <SourcePointList>
				<li>
					<Link onClick={() => window._sp_ccpa.loadPrivacyManagerModal(null, '5e1e327bf97533429a96040b')}>
						{ccpaMessage}
					</Link>
				</li>
			</SourcePointList>;
		};

		const sourcePointLinks = () => {
			const isGdpr = shouldRenderConsentLink && window.__consent__ === 'GDPR';
			const isCcpa = shouldRenderConsentLink && window.__consent__ === 'CCPA';
			if (isGdpr) {
				return renderGdprLink();
			} else if (isCcpa) {
				return renderCcpaLink();
			}
		};

		return (
			<EnsureDefaultTheme>
				<FooterWrap className="js_footer">
					<FooterNav>
						{showFooterLogo ? <FooterLogo blogGroup={blogGroup} /> : <div className="js_footer-logo"/>}
						<FooterSocial {...footerSocialProps} />
						<FooterLinks {...footerLinksProps} />
						{shouldRenderConsentLink &&
							<SourcePointListWrapper>
								{sourcePointLinks()}
							</SourcePointListWrapper>
						}
						<FooterNetwork {...footerNetworkProps} />
						<FooterLegal blogGroup={blogGroup} />
					</FooterNav>
				</FooterWrap>
			</EnsureDefaultTheme>
		);
	}

	render() {
		const { blog } = this.props;

		return blog && blog.name ? this.renderBlogFooter(blog) : this.renderGenericFooter();
	}
}

export default OnScreen(Analytics(Footer));
