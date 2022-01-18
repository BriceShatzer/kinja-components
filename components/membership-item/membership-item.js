/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import Button from '../buttons';
import BlogLogo from '../blog-logo';

type Props = {
	name: string
};

const MembershipItemWrapper = styled.div`
	background-color: #f5f5f5;
	display: flex;
	height: 285px;
	margin-bottom: 80px;
`;

const Image = styled.img`
	height: 260px;
	margin: 12px 36px 13px 17px;
	width: 248px;
`;

const Content = styled.div`
	padding: 19px 0 34px;
`;

const SiteTitlePlus = styled.h2`
	color: #249d9d;
	display: inline-flex;
	font-size: 35px;
	font-style: italic;
	font-weight: 600;

	& > div {
		margin-right: 17px;
	}
`;

const Title = styled.h3`
	font-size: 23px;
	margin-bottom: 1rem;
`;

const Text = styled.p`
	font-size: 1rem;
`;

function MembershipItem(props: Props) {
	const { name } = props;

	return (
		<EnsureDefaultTheme>
			<MembershipItemWrapper>
				<Image
					src="//i.kinja-img.com/gawker-media/image/upload/s--bCAlKex3--/c_scale,f_auto,fl_progressive,q_80,w_800/xciiect2tjatxutysymu.png"
					alt="Limited Edition Black Hoodie with Deadspin logo"
				/>
				<Content>
					<SiteTitlePlus>
						<BlogLogo key={name} name={name} /> Plus
					</SiteTitlePlus>
					<Title>Claim your Limited Edition Hoodie!</Title>
					<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet turpis ante, eget congue.</Text>
					<Button primary onClick={e => e.preventDefault()} label="Redeem" />
				</Content>
			</MembershipItemWrapper>
		</EnsureDefaultTheme>
	);
}

export default MembershipItem;
