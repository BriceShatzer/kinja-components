// @flow

import React from 'react';
import styled from 'styled-components';

import createTranslate from 'kinja-components/components/translator';
import type { Locale } from 'kinja-magma/models/Locale';
import translations from './translations';

const Label = styled.span`
	font-family: ${props => props.theme.typography.utility.fontFamily};
	font-size: 15px;
	font-weight: bold;
	line-height: 25px;
	text-transform: uppercase;
	color: ${props => props.theme.color.darksmoke};
`;

type Props = {
	className?: string,
	isEditorial?: boolean,
	isBranded?: boolean,
	locale: Locale
};

const SponsoredLabel = (props: Props) => {
	const translate = createTranslate(translations, props.locale);
	const { isEditorial, isBranded } = props;
	let sponsoredText = translate('Sponsored');

	if (isEditorial) {
		sponsoredText = translate('Promoted');
	}
	if (isBranded) {
		sponsoredText = translate('Branded Content');
	}

	return <Label className={props.className}>{sponsoredText}</Label>;
};

SponsoredLabel.defaultProps = {
	locale: 'en-US'
};

export default SponsoredLabel;
