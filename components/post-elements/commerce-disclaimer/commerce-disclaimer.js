/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import type { Locale } from 'kinja-magma/models/Locale';
import translations from './translations';
import createTranslate from 'kinja-components/components/translator';
import { theInventoryUrl } from 'kinja-magma/config/server';

const CommerceDisclaimerWrapper = styled.div`
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

const CommerceDisclaimer = ({locale = 'en-US'}: {locale: Locale}) => {
	const translate = createTranslate(translations, locale);
	return (<EnsureDefaultTheme>
		<CommerceDisclaimerWrapper>
			<span>
				{`${translate('Commerce Content is independent of Editorial and Advertising,')} `}
				{`${translate('and if you buy something through our posts, we may get a small share of the sale.')} `}
				<Link href={theInventoryUrl}>
					{` ${translate('Click here')}`}
				</Link>
				{` ${translate('for more.')}`}
			</span>
		</CommerceDisclaimerWrapper>
	</EnsureDefaultTheme>);
};

export default CommerceDisclaimer;
