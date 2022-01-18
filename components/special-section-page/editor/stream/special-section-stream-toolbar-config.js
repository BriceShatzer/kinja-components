/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import findIndex from 'lodash/findIndex';
import type { LunchboxEditorProps } from 'kinja-magma/models/Lunchbox';
import type { HeaderAlignment } from 'postbody/blockNodes/Header';
import Lunchbox from 'kinja-magma/models/Lunchbox';

// ICONS
import LinkIcon from '../../../icon19/Link';
import ArrowTopIcon from '../../../icon19/ArrowTop';
import ArrowBottomIcon from '../../../icon19/ArrowBottom';
import TrashcanIcon from '../../../icon19/Trashcan';
import AlignLeftIcon from '../../../icon19/AlignLeft';
import AlignCenterIcon from '../../../icon19/AlignCenter';
import ColorPickerIcon from '../../../icon19/ColorPicker';


const isFirstModule = (customContent, currentModuleId) => {
	const moduleIndex = findIndex(customContent, mod => mod.id === currentModuleId);
	return moduleIndex === 0;
};

const isLastModule = (customContent, currentModuleId) => {
	const moduleIndex = findIndex(customContent, mod => mod.id === currentModuleId);
	return moduleIndex === customContent.length - 1;
};

const InputColor = styled.input`
	&& {
		cursor: pointer;
		margin-top: -1px;
		margin-left: -1px;
		position: absolute;
	}
`;

type SpecialSectionStreamToolbarConfigType = {
	customContent: Array<LunchboxEditorProps>,
	addBackgroundColor: (moduleId: string, props: { backgroundColor: string }) => void,
	moveModule: (moduleId: string, direction: 'up' | 'down') => void,
	deleteModule: (moduleId: string) => void,
	currentModuleId: string,
	addLinkToModule: (moduleId: string) => void,
	textAlignment: HeaderAlignment,
	updateTextAlignment: (moduleId: string, props: { textAlignment: HeaderAlignment }) => void
};

export default function specialSectionStreamToolbarConfig({
	customContent,
	addBackgroundColor,
	moveModule,
	deleteModule,
	currentModuleId,
	addLinkToModule,
	textAlignment,
	updateTextAlignment
}: SpecialSectionStreamToolbarConfigType) {
	const toolbarItems = [
		{
			title: 'add link to module',
			showTitle: false,
			onClick: () => addLinkToModule(currentModuleId),
			icon: <LinkIcon />
		},
		{
			title: 'move module up',
			showTitle: false,
			disabled: isFirstModule(customContent, currentModuleId),
			onClick: () => moveModule(currentModuleId, 'up'),
			icon: <ArrowTopIcon />
		},
		{
			title: 'move module down',
			showTitle: false,
			disabled: isLastModule(customContent, currentModuleId),
			onClick: () => moveModule(currentModuleId, 'down'),
			icon: <ArrowBottomIcon />
		},
		{
			title: 'delete module',
			showTitle: false,
			onClick: () => deleteModule(currentModuleId),
			icon: <TrashcanIcon />
		}
	];
	let currentLayout;
	const currentLunchbox = customContent.find(lunchbox => lunchbox.id === currentModuleId);
	if (currentLunchbox) {
		currentLayout = currentLunchbox.currentLayout;
		if (
			Lunchbox.Layouts.include(
				currentLayout,
				currentLayout => currentLayout.indexOf('Header') > 0 || currentLayout.indexOf('Paragraph') > 0
			)
		) {
			toolbarItems.unshift(
				{
					title: 'align text left',
					showTitle: false,
					onClick: () => updateTextAlignment(currentModuleId, { textAlignment: 'Left' }),
					icon: <AlignLeftIcon />,
					active: textAlignment === 'Left'
				},
				{
					title: 'align text center',
					showTitle: false,
					onClick: () => updateTextAlignment(currentModuleId, { textAlignment: 'Center' }),
					icon: <AlignCenterIcon />,
					active: textAlignment === 'Center'
				}
			);
		}
		if (!(currentLayout === Lunchbox.Layouts.Image.Bleed || currentLayout === Lunchbox.Layouts.Image.Parallax)) {
			toolbarItems.unshift({
				title: 'adjust background color',
				showTitle: false,
				onClick: () => {},
				icon: <ColorPickerIcon />,
				children: (
					<InputColor
						onChange={event => addBackgroundColor(currentModuleId, { backgroundColor: event.currentTarget.value })}
						type="color"
					/>
				)
			});
		}
	}
	return toolbarItems;
}
