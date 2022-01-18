/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import { FloatingToolbar } from '../../toolbar-floating';
import ToolbarItem from '../../toolbar-item';
import { ImpactHeaderTitleAlignments, ImpactHeaderTitleOverlays } from '../consts';
import type { ImpactHeaderOverlay, ImpactTitleAlignment } from 'postbody/blockNodes/ImpactHeader';

// ICONS
import TrashcanIcon from '../../icon19/Trashcan';
import FeaturedHeaderImpactIcon from '../../icon19/FeaturedHeaderImpact';
import FeaturedHeaderClassicReversedIcon from '../../icon19/FeaturedHeaderClassicReversed';
import AlignBottomLeftIcon from '../../icon19/AlignBottomLeft';
import AlignBottomRightIcon from '../../icon19/AlignBottomRight';
import AlignBottomCenterIcon from '../../icon19/AlignBottomCenter';
import AlignMiddleCenterIcon from '../../icon19/AlignMiddleCenter';
import OverlayLightIcon from '../../icon19/OverlayLight';
import OverlayDarkIcon from '../../icon19/OverlayDark';

const ImpactHeaderToolbarContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 58px;
	right: 16px;
	z-index: 1000;

	svg[name='overlay-dark'],
	svg[name='overlay-light'] {
		color: ${props => props.theme.color.black};
	}
`;

const impactHeaderToolbarConfig = ({
	handleDelete,
	handleUpdateTitleAlignment,
	handleUpdateOverlay,
	isStandardVideo,
	overlay,
	titleAlignment
}) => {
	const toolbarItems = {
		header: [
			{
				icon: <TrashcanIcon />,
				onClick: handleDelete,
				title: 'Delete image'
			}
		],
		layouts:
			titleAlignment === ImpactHeaderTitleAlignments.Below
				? []
				: [
					{
						icon: <AlignBottomLeftIcon />,
						onClick: () => handleUpdateTitleAlignment(ImpactHeaderTitleAlignments.Left),
						active: titleAlignment === ImpactHeaderTitleAlignments.Left,
						title: 'Align the impact header title left'
					},
					{
						icon: <AlignBottomCenterIcon />,
						onClick: () => handleUpdateTitleAlignment(ImpactHeaderTitleAlignments.CenterBottom),
						active: titleAlignment === ImpactHeaderTitleAlignments.CenterBottom,
						title: 'Align the impact header title bottom & center'
					},
					{
						icon: <AlignBottomRightIcon />,
						onClick: () => handleUpdateTitleAlignment(ImpactHeaderTitleAlignments.Right),
						active: titleAlignment === ImpactHeaderTitleAlignments.Right,
						title: 'Align the impact header title right'
					},
					{
						icon: <AlignMiddleCenterIcon />,
						onClick: () => handleUpdateTitleAlignment(ImpactHeaderTitleAlignments.CenterCenter),
						active: titleAlignment === ImpactHeaderTitleAlignments.CenterCenter,
						title: 'Align the impact header title center & center'
					},
					{
						icon: <OverlayDarkIcon />,
						onClick: () => handleUpdateOverlay(ImpactHeaderTitleOverlays.Black),
						active: overlay === ImpactHeaderTitleOverlays.Black,
						title: 'Sets title to be white text on a dark overlay'
					},
					{
						icon: <OverlayLightIcon />,
						onClick: () => handleUpdateOverlay(ImpactHeaderTitleOverlays.White),
						active: overlay === ImpactHeaderTitleOverlays.White,
						title: 'sets title to be black text on a light overlay'
					}
				]
	};
	if (!isStandardVideo) {
		toolbarItems.header.unshift(
			{
				icon: <FeaturedHeaderImpactIcon />,
				onClick: () => handleUpdateTitleAlignment(ImpactHeaderTitleAlignments.CenterBottom),
				title: 'Title On Image',
				active: titleAlignment !== ImpactHeaderTitleAlignments.Below,
				disabled: isStandardVideo
			},
			{
				icon: <FeaturedHeaderClassicReversedIcon />,
				onClick: () => handleUpdateTitleAlignment(ImpactHeaderTitleAlignments.Below),
				title: 'Title Below Image',
				active: titleAlignment === ImpactHeaderTitleAlignments.Below
			}
		);
	}
	return toolbarItems;
};

export type ImpactHeaderToolbarEventHandlers = {
	handleDelete: () => void,
	handleUpdateOverlay: (overlay: ImpactHeaderOverlay) => void,
	handleUpdateTitleAlignment: (titleAlignment: ImpactTitleAlignment) => void
};

type ImpactHeaderToolbarProps = {
	eventHandlers: ImpactHeaderToolbarEventHandlers,
	isStandardVideo?: boolean,
	overlay: ImpactHeaderOverlay,
	titleAlignment: ImpactTitleAlignment
};

const ImpactHeaderToolbar = (props: ImpactHeaderToolbarProps) => {
	const headerConfig = impactHeaderToolbarConfig({ ...props.eventHandlers, ...props });

	return (
		<EnsureDefaultTheme>
			<ImpactHeaderToolbarContainer>
				<FloatingToolbar>
					{headerConfig.header.map(headerToolbarItem => (
						<ToolbarItem {...headerToolbarItem} key={headerToolbarItem.title} />
					))}
				</FloatingToolbar>
				{headerConfig.layouts.length > 0 && (
					<FloatingToolbar>
						{headerConfig.layouts.map(layoutToolbarItem => (
							<ToolbarItem {...layoutToolbarItem} key={layoutToolbarItem.title} />
						))}
					</FloatingToolbar>
				)}
			</ImpactHeaderToolbarContainer>
		</EnsureDefaultTheme>
	);
};

export default ImpactHeaderToolbar;
