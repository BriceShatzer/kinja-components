// @flow

import React from 'react';
import FolderIcon from '../icon19/Folder';
import FolderVideoIcon from '../icon19/FolderVideo';

const folderWidth = 200;
const folderCount = 3;
const folderCountMultipleSelection = 2;
const browserHeight = 398;
const footerPaddingVertical = 8;
const footerPaddingHorizontal = 14;
const lineColor = (props: {theme: any}) => props.theme.color.lightgray;
const selectedColor = (props: {theme: any}) => props.theme.color.primary;
const selectedParentColor = '#B2DFFA';
const itemPaddingVertical = 7;
const itemPaddingHorizontal = 15;
const chevronMargin = 4;
const currentPathIconMargin = 8;
const footerPathMaxWidth = 250;
const folderSelectorWidth = 600;
const footerPathMaxChar = 42;
const defaultIcon = ({ isVideo }: { isVideo?: boolean }) =>
	(isVideo ? <FolderVideoIcon /> : <FolderIcon />);

export {
	folderWidth,
	folderCount,
	folderCountMultipleSelection,
	browserHeight,
	footerPaddingVertical,
	footerPaddingHorizontal,
	lineColor,
	selectedColor,
	selectedParentColor,
	itemPaddingVertical,
	itemPaddingHorizontal,
	chevronMargin,
	currentPathIconMargin,
	defaultIcon,
	footerPathMaxWidth,
	footerPathMaxChar,
	folderSelectorWidth
};
