/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Button from '../../buttons';
import Facebook from '../../icon19/Facebook';
import Twitter from '../../icon19/Twitter';
import Instagram from '../../icon19/Instagram';
import Youtube from '../../icon19/Youtube';
import Rss from '../../icon19/RSS';
import { EnsureDefaultTheme } from '../../theme';
import Link from '../../elements/link';

import type { AnalyticsInjectedProps } from '../types';

type FooterSocialProps = {
	canonicalHost: ?string,
	facebookScreenName: ?string,
	instagramScreenName: ?string,
	twitterScreenName: ?string,
	youtubeUrl: ?string,
	gaEvent?: string => Array<?string | {[key: string]: mixed}>
};

export const FooterSocialWrap = styled.div`
	padding-top: 24px;
	padding-bottom: 40px;
`;

const FooterSocialLinks = styled.ul`
	align-items: center;
	display: flex;
	justify-content: center;
	margin: 0 auto;

	li {
		padding: 0 3.5px;

		svg[name="rss"] {
			width: 14px;
		}
	}
`;

const FooterSocial = ({
	canonicalHost,
	facebookScreenName,
	instagramScreenName,
	twitterScreenName,
	youtubeUrl,
	gaEvent
}: AnalyticsInjectedProps & FooterSocialProps) => {
	const socialMedia = [{
		name: 'facebook',
		url: facebookScreenName && `https://facebook.com/${facebookScreenName}`,
		value: facebookScreenName
	}, {
		name: 'twitter',
		url: twitterScreenName && `https://twitter.com/${twitterScreenName}`,
		value: twitterScreenName
	}, {
		name: 'instagram',
		url: instagramScreenName && `https://instagram.com/${instagramScreenName}`,
		value: instagramScreenName
	}, {
		name: 'youtube',
		url: youtubeUrl,
		value: youtubeUrl
	}, {
		name: 'rss',
		url: canonicalHost && `https://${canonicalHost}/rss`,
		value: canonicalHost
	}];

	const makeIcon = name => {
		switch (name) {
			case 'facebook':
				return <Facebook/>;
			case 'twitter':
				return <Twitter/>;
			case 'instagram':
				return <Instagram/>;
			case 'youtube':
				return <Youtube/>;
			case 'rss':
				return <Rss/>;
			default:
				return;
		}
	};

	return (
		<EnsureDefaultTheme>
			<FooterSocialWrap>
				<FooterSocialLinks>
					{socialMedia.map(medium => (
						medium.value && <li key={medium.name}>
							<Link
								href={medium.url}
								target="_blank"
								rel="noopener"
								events={[
									gaEvent ? gaEvent(medium.name) : ['Footer', 'click', medium.name, { metric21: 1 }]
								]}
							>
								<Button variant={medium.name} sort='circle' small icon={makeIcon(medium.name)} />
							</Link>
						</li>
					))}
				</FooterSocialLinks>
			</FooterSocialWrap>
		</EnsureDefaultTheme>
	);
};

export default FooterSocial;
