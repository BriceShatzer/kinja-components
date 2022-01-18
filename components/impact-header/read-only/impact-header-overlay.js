// @flow

import * as React from 'react';
import styled from 'styled-components';
import { ImpactHeaderTitleAlignments, ImpactHeaderTitleOverlays } from '../consts';
import { EnsureDefaultTheme } from '../../theme';
import type {
	ImpactHeaderOverlay as ImpactHeaderOverlayType,
	ImpactTitleAlignment
} from 'postbody/blockNodes/ImpactHeader';

const getOverlayBackground = (overlay: ImpactHeaderOverlayType, theme) => {
	return `linear-gradient(transparent, ${
		overlay === ImpactHeaderTitleOverlays.White ? theme.color.whiteOverlay : theme.color.blackOverlay
	}) bottom repeat;`;
};

const Overlay = styled.div`
	align-items: center;
	display: flex;
	height: 100%;
	top: 0;
	justify-content: center;
	position: absolute;
	width: 100%;
	z-index: 10;

	&::after {
		background: ${({ overlay, theme }) => getOverlayBackground(overlay, theme)};
		bottom: 0;
		content: '';
		display: block;
		height: 100%;
		position: absolute;
		width: 100%;
	}
`;

export default function ImpactHeaderOverlay({
	overlay,
	titleAlignment,
	children
}: {
	overlay: ImpactHeaderOverlayType,
	titleAlignment: ImpactTitleAlignment,
	children: React.Node
}) {
	return (
		<EnsureDefaultTheme>
			{titleAlignment === ImpactHeaderTitleAlignments.Below ? (
				children
			) : (
				<Overlay overlay={overlay} titleAlignment={titleAlignment}>
					{children}
				</Overlay>
			)}
		</EnsureDefaultTheme>
	);
}
