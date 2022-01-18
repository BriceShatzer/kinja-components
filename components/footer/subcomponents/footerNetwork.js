/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import BlogAvatar from '../../blog-avatar';
import { EnsureDefaultTheme } from '../../theme';

import { NETWORK_BLOGS } from '../../../config/consts';
import type { AnalyticsInjectedProps } from '../types';
import { FooterList } from './footerLinks';
import Link from '../../elements/link';

const blogs = [
	...NETWORK_BLOGS.filter(blog => !blog.isSatire && !blog.isCommerce).sort((a, b) => a.name.replace('the', '') < b.name.replace('the', '') ? -1 : 1),
	...NETWORK_BLOGS.filter(blog => blog.isSatire).sort((a, b) => a.name.replace('the', '') < b.name.replace('the', '') ? -1 : 1),
	...NETWORK_BLOGS.filter(blog => blog.name === 'theinventory')
];

const FooterNetworkWrap = styled.div`
	padding-bottom: 38px;

	li {
		padding: 0 5px;

		@media and (max-width: ${props => props.theme.breakpointMedium}) {
			padding: 0 3px;
		}
	}
`;

const FooterNetworkLabel = styled.p`
	color: ${props => props.theme.color.darkgray};
	font-size: 14px;
	margin: 0 auto;
	text-align: center;
`;

const FooterNetworkBrand = styled.span`
	color: ${props => props.theme.color.darkgray};
`;

type FooterNetworkProps = {
	blogGroup?: string,
};

const FooterNetwork = ({
	blogGroup,
	ga
}: AnalyticsInjectedProps & FooterNetworkProps) => {
	const blogElements = blogs.filter(blog => blogGroup !== blog.name).map(blog =>
		<li key={blog.name}>
			<Link
				href={blog.url}
				events={[['Footer', 'click', `${String(blog.name)} logo`, {metric21: 1}]]}
				onClick={() => ga('Footer', 'click', `${String(blog.name)} logo`, {metric21: 1})}
				target="_blank"
				rel="noopener">
				<FooterNetworkBrand>
					<BlogAvatar name={blog.name} monochrome size={22} />
				</FooterNetworkBrand>
			</Link>
		</li>
	);

	return (
		<EnsureDefaultTheme>
			<FooterNetworkWrap>
				<FooterNetworkLabel>More from our network</FooterNetworkLabel>
				<FooterList>{blogElements}</FooterList>
			</FooterNetworkWrap>
		</EnsureDefaultTheme>
	);
};

export default FooterNetwork;
