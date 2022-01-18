// @flow

import * as React from 'react';
import styled from 'styled-components';

import createTranslate from 'kinja-components/components/translator';

import Button, { ButtonWrapper } from 'kinja-components/components/buttons';
import ChevronUp from 'kinja-components/components/icon19/ChevronUp';
import ChevronDown from 'kinja-components/components/icon19/ChevronDown';
import Trashcan from 'kinja-components/components/icon19/Trashcan';

import type { Locale } from 'kinja-magma/models/Locale';

import translations from './translations';

const MovableAdSlotWrapper = styled.div`
	border: 1px dashed ${({ theme }) => theme.color.midgray};
	background-color: ${({ theme }) => theme.color.white};
	display: flex;
	height: 100%;
	width: 100%;
	align-items: center;
	justify-content: center;
	left: 0;
	position: absolute;
	top: 0;

	${ButtonWrapper} {
		margin: 10px;
	}
`;

type Props = {
	onMoveUp: () => void,
	onRemove: ?(() => void),
	onMoveDown: () => void,
	locale: Locale
};

export default function MovableAdSlot({ onMoveUp, onMoveDown, onRemove, locale }: Props) {
	const translate = createTranslate(translations, locale);
	return (
		<MovableAdSlotWrapper>
			<Button
				title={translate('Move ad slot up')}
				sort="circle"
				onClick={onMoveUp}
				icon={<ChevronUp />}
			/>
			{onRemove && <Button
				title={translate('Remove ad slot')}
				sort="circle"
				weight="secondary"
				onClick={onRemove}
				icon={<Trashcan />}
			/>}
			<Button
				title={translate('Move ad slot down')}
				sort="circle"
				onClick={onMoveDown}
				icon={<ChevronDown />}
			/>
		</MovableAdSlotWrapper>
	);
}
