/* @flow */

import * as React from 'react';
import styled from 'styled-components';

// ICONS
import PromotionIcon from '../../icon19/Promotion';

import { EnsureDefaultTheme } from '../../theme';
import media from '../../../style-utils/media';
import createTranslate from '../../translator';
import translations from './translations';

import type { Locale } from 'kinja-magma/models/Locale';

const Container = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 92px;
	border: 2px solid ${props => props.theme.color.midgray};

	> svg {
		position: absolute;
		left: 10px;
		align-self: center;
	}

	${media.smallOnly`
		justify-content: flex-start;
		padding-left: 90px;
	`}
`;
const Label = styled.p`
	margin: 0;
	font-size: 24px;
	font-weight: bold;
	line-height: 32px;
`;

type Props = {
	locale: Locale
}

const PromotedSplice = (props: Props) => {
	const translate = createTranslate(translations, props.locale);
	const promotedText = translate('Promoted Post');

	return (
		<EnsureDefaultTheme>
			<Container>
				<PromotionIcon />
				<Label>{promotedText}</Label>
			</Container>
		</EnsureDefaultTheme>
	);
};

PromotedSplice.defaultProps = {
	locale: 'en-US'
};

export default PromotedSplice;