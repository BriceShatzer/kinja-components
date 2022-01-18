// @flow

import * as React from 'react';
import styled from 'styled-components';

import Button19, { ButtonWrapper } from '../button19';
import Link from '../elements/link';
import translations from './translations';
import createTranslate from '../translator';

import type { Locale } from 'kinja-magma/models/Locale';

const SubscribeModule = styled.div`
	margin: 1rem auto 2rem;
	padding: 1rem;
	background-color: ${props => props.theme.color.whitesmoke};
	text-align: center;
	max-width: 350px;

	${ButtonWrapper} {
		margin: 0 auto;
	}
`;

const Label = styled.span`
	display: block;
	line-height: 1rem;
	padding-bottom: 1rem;
`;

const AmpNewsletter = ({
	blogName,
	blogHost,
	locale
}: {
	blogName: string,
	blogHost: string,
	locale: Locale
}) => {
	const translate = createTranslate(translations, locale);

	return (
		<SubscribeModule>
			<Label>
				{translate('Want {blogName}’s email newsletter?', { blogName })}
			</Label>
			<Link href={`//${blogHost}/newsletter`} target="_blank" rel="noopener noreferrer">
				<Button19 label={translate('Subscribe')} />
			</Link>
		</SubscribeModule>
	);
};

export default AmpNewsletter;
