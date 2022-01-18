// @flow

import * as React from 'react';

import Button19 from '../button19';
import { EnsureDefaultTheme } from '../theme';
import translations from './translations';
import createTranslate from '../translator';

import type { Locale } from 'kinja-magma/models/Locale';


type ConverstaionButtonProps = {
	label: string,
	locale: Locale,
	onClick?: () => void
}

const ConverstationButton = (props: ConverstaionButtonProps) => {
	const { label, locale, onClick } = props;
	const translate = createTranslate(translations, locale);

	return (
		<EnsureDefaultTheme>
			<Button19 label={translate(label)} {...onClick ? { onClick } : null} />
		</EnsureDefaultTheme>
	);
};

ConverstationButton.defaultProps = {
	locale: 'en-US'
};

export default ConverstationButton;