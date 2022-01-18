/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import type { Locale } from 'kinja-magma/models/Locale';
import translations from './translations';
import BlogLogo, { LogoWrapper } from 'kinja-components/components/blog-logo';
import createTranslate from 'kinja-components/components/translator';
import { theInventoryUrl } from 'kinja-magma/config/server';

const Wrapper = styled.div`
	${LogoWrapper} {
		margin-bottom: 10px;
	}
`;

const CommerceTagDisclaimerWrapper = styled.div`
	display: flex;
	margin-bottom: 20px;

	span {
		margin-left: 10px;
	}

	&::before {
		content: '';
		border-left: 2px solid ${({theme}) => theme.color.primary};
		margin: 4px 0 6px;
	}
`;

const Link = styled.a`
	color: ${({theme}) => theme.color.primary};

	&:hover {
		color: ${({theme}) => theme.color.primary};
	}
`;

const CommerceTagDisclaimer = ({
	locale = 'en-US',
	postType
}: {
	locale: Locale,
	postType: string
}) => {
	const translate = createTranslate(translations, locale);
	return postType === 'theinventory' && <EnsureDefaultTheme>
		<Wrapper>
			<BlogLogo name='theinventory' scale={0.8} />
			<CommerceTagDisclaimerWrapper>
				<span>
					{`${translate('Commerce Content is produced by The Inventory.')} `}
					{`${translate('It is independent of Jalopnik Editorial and Advertising')} `}
					{`${translate('and if you buy something through our posts, we may get a small share of the sale.')} `}
					<Link href={theInventoryUrl}>
						{` ${translate('Click here')}`}
					</Link>
					{` ${translate('for more.')}`}
				</span>
			</CommerceTagDisclaimerWrapper>
		</Wrapper>
	</EnsureDefaultTheme>;
};

export default CommerceTagDisclaimer;
