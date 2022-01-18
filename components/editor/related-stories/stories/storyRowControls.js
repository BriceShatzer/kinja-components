/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import Button from 'kinja-components/components/buttons';
import PlusIcon from 'kinja-components/components/icon19/Plus';
import TrashcanIcon from 'kinja-components/components/icon19/Trashcan';

type Props = {
	currentCount: number,
	index: number,
	maxRows: number,
	addRow?: () => void,
	deleteRow?: (index: number) => void
};

const StoryRowControlWrapper = styled.div`
	position: absolute;
	right: 0;
	height: 113px;
	width: 30px;
	z-index: 1;
`;

const ButtonItem = styled(Button)`
	left: 50%;
	position: absolute;

	&:first-child {
		top: 18%;
	}

	&:nth-child(2) {
		bottom: 18%;
	}
	
	&:only-child {
		top: 32%;
	}
`;

const StoryRowControls = (props: Props) => {

	const minMaxRows = 3;

	const addRow = () => {
		if (props.addRow) {
			props.addRow();
		}
	};

	const deleteRow = () => {
		if (props.deleteRow) {
			props.deleteRow(props.index);
		}
	};

	const addButton = <ButtonItem
		key={ 'add' }
		icon={<PlusIcon />}
		type='primary'
		small
		kind='circle'
		onClick={addRow.bind(this)}
	/>;

	const removeButton = <ButtonItem
		key={ 'remove' }
		icon={<TrashcanIcon />}
		type='primary'
		small
		kind='circle'
		onClick={deleteRow.bind(this)}
	/>;

	let buttons;
	if (props.currentCount === 1) {
		buttons = addButton;
	} else if (props.currentCount < minMaxRows || props.currentCount < props.maxRows) {
		buttons = props.index === 0 ? removeButton : [addButton, removeButton];
	} else if (props.currentCount === props.maxRows) {
		buttons = removeButton;
	}

	return (
		<EnsureDefaultTheme>
			<StoryRowControlWrapper>
				{ buttons }
			</StoryRowControlWrapper>
		</EnsureDefaultTheme>
	);
};

export default StoryRowControls;
