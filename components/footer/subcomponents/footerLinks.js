/* @flow */

import React from 'react';
import styled from 'styled-components';

import type { AnalyticsInjectedProps } from '../../hoc/analytics';
import type { TranslateFunction } from '../../translator';
import { EnsureDefaultTheme } from '../../theme';
import Link from '../../elements/link';
import { storeUrls } from '../constants';

type FooterLinksProps = {
	...AnalyticsInjectedProps,
	blogGroup?: string,
	displayName?: string,
	enableStoreLink?: boolean,
	hideContentGuide?: boolean,
	enableSitemap: boolean,
	showAboutLink?: boolean,
	toggleStoreModal?: (?string) => void,
	translate: TranslateFunction
};

type FooterLinksState = {
	showStoreModal: boolean
};

const FooterLinksWrap = styled.div`
	padding-bottom: 40px;
`;

export const FooterList = styled.ul`
	display: flex;
	justify-content: center;
	flex-flow: row wrap;
	margin: 0 auto;
	max-width: 100%;

	@media and (min-width: ${props => props.theme.breakpointMedium}) {
		max-width: 500px;
		justify-content: center;
	}

	li {
		color: ${props => props.theme.color.darkgray};
		display: flex;
		flex-grow: 0;
		flex-shrink: 1;
		justify-content: space-around;
		line-height: 32px;
		padding: 0 24px;

		a {
			color: ${props => props.theme.color.gray};
			font-size: 16px;
			white-space: nowrap;

			&:hover {
				color: ${props => props.theme.color.gray};
			}
		}

		@media and (min-width: ${props => props.theme.breakpointMedium}) {
			width: initial;
			padding: 0 14px;
		}
	}
`;

export const linkTypes = {
	About: {
		url: '/about',
		text: 'About'
	},
	Help: {
		url: 'https://kinja.zendesk.com/',
		text: 'Need Help?'
	},
	ContentGuidelines: {
		url: 'https://legal.kinja.com/content-guidelines-90185358',
		text: 'Content Guide'
	},
	Privacy: {
		url: 'https://g-omedia.com/privacy-policy/',
		text: 'Privacy'
	},
	TermsOfUse: {
		url: 'https://g-omedia.com/terms-of-service/',
		text: 'Terms of Use'
	},
	Advertising: {
		url: 'https://g-omedia.com',
		text: 'Advertising'
	},
	TheTopical: {
		url: 'https://www.theonion.com/about-the-topical-1841330855',
		text: 'The Topical'
	},
	Jobs: {
		url: '/careers',
		text: 'Jobs'
	}
};

export class FooterLinks extends React.Component<FooterLinksProps, FooterLinksState> {
	constructor(props: FooterLinksProps) {
		super(props);

		this.state = {
			showStoreModal: false
		};

	}

	toggleStoreModal = (displayName: ?string) => {
		if (displayName) {
			this.props.ga('Footer', 'click', `${String(displayName)} Store`);
		}

		return this.setState(prevState => ({
			...prevState,
			showStoreModal: !prevState.showStoreModal
		}));
	}

	// NOTE: kept onClick event for mantle use.
	renderLink = (link: string, gaOverride: ?string) => (
		<li key={link}>
			<Link
				href={this.props.translate(linkTypes[link].url)}
				events={[['Footer', 'click', gaOverride || link]]}
				onClick={() => this.props.ga('Footer', 'click', gaOverride || link)}>
				{this.props.translate(linkTypes[link].text)}
			</Link>
		</li>
	)

	render() {
		const {
			showAboutLink,
			blogGroup,
			displayName,
			enableStoreLink,
			enableSitemap,
			hideContentGuide,
			translate
		} = this.props;

		const storeUrl = blogGroup ? storeUrls[blogGroup] : null;

		return (
			<EnsureDefaultTheme>
				<FooterLinksWrap>
					<FooterList>
						{enableSitemap ? (
							<li>
								<Link href="/sitemap" events={displayName ? [['Footer', 'click', `${displayName} sitemap`]] : []}>
									{translate('Sitemap')}
								</Link>
							</li>
						) : null}
						{showAboutLink ? this.renderLink('About') : null}
						{this.renderLink('Help')}
						{hideContentGuide ? null : this.renderLink('ContentGuidelines', 'Content Guidelines')}
						{enableStoreLink && storeUrl && displayName ? <li>
							<Link className="js_store-link"
								events={[['Footer', 'click', `${displayName} Store`]]}
								href={storeUrl}
								target="_blank">
								{displayName} Shop
							</Link>
						</li> : null}
						{this.props.blogGroup === 'theonion' && this.renderLink('TheTopical')}
						{['Privacy', 'TermsOfUse', 'Advertising', 'Jobs'].map(link => this.renderLink(link))}
					</FooterList>
				</FooterLinksWrap>
			</EnsureDefaultTheme>
		);
	}
}

export default FooterLinks;
