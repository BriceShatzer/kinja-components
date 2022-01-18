/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import Reload from 'kinja-components/components/icon19/Reload';
import Checkmark from 'kinja-components/components/icon19/Checkmark';

import type { Locale } from 'kinja-magma/models/Locale';

import createTranslate from '../../translator';
import savingTranslations from './savingTranslations';

type Props = {
	// Indicates whether or not the component is in the saving state.
	isSaving: boolean,
	// Indicates what language to use for the messages. Defaults to 'en-US'.
	language?: Locale
};

const SavingSpan = styled.span`
	color: ${props => props.theme.color.gray};
	font-size: 0.94rem;
	margin-left: 20px;
	display: flex;
	align-items: center;
`;

const SpinningReload = styled(Reload)`
	margin-top: -7px;
	animation: rotate 0.7s linear infinite;
	transform-origin: 10px 11px;
`;

const Label = styled.span`
	margin-left: 5px;
`;

function Saving(props: Props) {
	const { isSaving, ...rest } = props;
	const translate = createTranslate(savingTranslations, props.language);

	return (
		<SavingSpan {...rest}>
			{isSaving ? <SpinningReload /> : <Checkmark />}
			<Label>{isSaving ? translate('Saving…') : translate('Saved')}</Label>
		</SavingSpan>
	);
}

export default Saving;
