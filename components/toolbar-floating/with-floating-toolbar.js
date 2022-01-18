/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import FloatingToolbar, { ToolbarWrapper } from './floating-toolbar';
import ToolbarItem from '../toolbar-item';
import type { Props as ToolbarItemProps } from '../toolbar-item/toolbar-item';

type ToolbarPosition = 'Left' | 'Center' | 'Right';

function getTranslate(toolbarPosition: ToolbarPosition) {
	switch (toolbarPosition) {
		case 'Left': {
			return '';
		}
		case 'Center': {
			return 'transform: translateX(-50%);';
		}
		case 'Right': {
			return '';
		}
		default: {
			return '';
		}
	}
}

function getHorizontalOffset(toolbarPosition: ToolbarPosition) {
	switch (toolbarPosition) {
		case 'Left': {
			return '';
		}
		case 'Center': {
			return 'left: 50%;';
		}
		case 'Right': {
			return 'right: 0; left: unset;';
		}
		default: {
			return '';
		}
	}
}

export const WithFloatingToolbarWrapper = styled.div`
	position: relative;
	${ToolbarWrapper} {
		position: absolute;
		top: 0;
		${({ toolbarPosition }) => getHorizontalOffset(toolbarPosition)}
		${({ toolbarPosition }) => getTranslate(toolbarPosition)}
	}
`;

// WithFLoatingToolbar renders react children wrapped in a div with the floating toolbar attached.
// We use this in the CustomModules component to render Lunchbox and Curation components with their own toolbars.

function WithFloatingToolbar({
	children,
	toolbarItems,
	showToolbar,
	onClick,
	toolbarPosition
}: {
	showToolbar?: boolean,
	children?: React.Node,
	toolbarItems: Array<ToolbarItemProps>,
	onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void,
	toolbarPosition: 'Left' | 'Right' | 'Center'
}) {
	return (
		<WithFloatingToolbarWrapper onClick={onClick} toolbarPosition={toolbarPosition}>
			{children}
			{showToolbar && (
				<FloatingToolbar display="inline-block">
					{toolbarItems.map(toolbarItem => (
						<ToolbarItem key={toolbarItem.title} {...toolbarItem} />
					))}
				</FloatingToolbar>
			)}
		</WithFloatingToolbarWrapper>
	);
}

WithFloatingToolbar.defaultProps = {
	toolbarPosition: 'Center'
};

export default WithFloatingToolbar;
