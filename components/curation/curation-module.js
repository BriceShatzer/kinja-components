/* @flow */

import * as React from 'react';

import media from '../../style-utils/media';
import styled from 'styled-components';
import shortid from 'shortid';
import clickoutsideHOC from '../hoc/click-outside';
import CurationLayout from '../curation-layout';
import LayoutToolbar from '../toolbar-layout';
import Grid from '../grid';
import FrontPageCard from './card-types/frontpage-card';
import { controlsClassName } from 'kinja-components/components/curation';
import type { CurationSettings, CurationCustomOptions } from '../types';
import type { ClickOutsideInjectedProps } from '../hoc/click-outside';
import type { CurationItemProps } from 'kinja-magma/models/CurationItem';


type Props = {
	activeCard: *,
	activeItem: number | null,
	activeTertiary: number | null,
	cardOnBlur: (event: *, model: *, itemIndex: number, tertiaryIndex?: number) => mixed,
	cardOnClick: (event: *, model: *, itemIndex: number, tertiaryIndex?: number) => mixed,
	setActiveCard: (model: CurationItemProps | null, itemIndex?: number, tertiaryIndex?: number) => void,
	handleClickOutside?: (MouseEvent => void),
	isBlogVertical?: boolean,
	isEditMode: boolean,
	isEditing: (model: *) => boolean,
	isSaving: boolean,
	isCloseButton: boolean,
	isOpenButton: boolean,
	layoutProps: CurationSettings,
	curationCustomOptions: CurationCustomOptions,
	resetToggleState: (isEditMode?: boolean, isSaving?: boolean, isCloseButton?: boolean, isOpenButton?: boolean) => void,
	disableAds?: boolean,
	clearCuration: boolean
} & ClickOutsideInjectedProps;


const LayoutToolbarWrapper = styled.div`
	position: absolute;
	left: 10px;
	top: 67px;
	z-index: 100;

	${media.mediumDown`
		display: none;
	`}

	&:hover {
		> div {
			display: flex;
		}
	}
`;

class CurationModule extends React.Component<Props> {
	render() {
		const { isEditMode,
			isSaving,
			isEditing,
			isOpenButton,
			isCloseButton,
			cardOnBlur,
			cardOnClick,
			activeCard,
			activeItem,
			activeTertiary,
			resetToggleState,
			curationCustomOptions,
			layoutProps,
			setActiveCard,
			disableAds,
			clearCuration
		} = this.props;


		return (
			<CurationLayout {...layoutProps}
				isOpenButton={isOpenButton}
				isCloseButton={isCloseButton}
				isSaving={isSaving}
				isEditMode={isEditMode}
				setActiveCard={setActiveCard}
				resetToggleState={resetToggleState}
				clearCuration={clearCuration}>
				{layoutSpecificProps => {
					const { curationType } = curationCustomOptions;
					const {
						gridConfig,
						setLayout,
						toolbarItems
					} = layoutSpecificProps || {};

					const { items, layout } = gridConfig;
					const layoutGroup = layout && layout.group;
					const numberOfItems = layoutGroup === 'Modular' && items && items.some(item => item && Object.keys(item).length && item.hasChildren) ?
						items && items.length + 3 : items && items.length;
					const numberOfZones = layout && layout.zones.length;
					const hasNonEmptyItems = items && items.reduce((prv, cur) => cur && Object.keys(cur).length + prv, 0) > 0;
					const shouldRenderInNonEditMode = !isEditMode && hasNonEmptyItems;

					const headline = { ...toolbarItems.headline, isFirst: true, isBetween: false, isLast: false };
					const modular = { ...toolbarItems.modular, isFirst: false, isBetween: true, isLast: false };
					const equal = { ...toolbarItems.equal, isFirst: false, isBetween: false, isLast: true };
					const toolbar = { headline, modular, equal };

					const activeKey = Object.keys(toolbar).filter(type => toolbar[type].active)[0];

					const SortableLayoutToolbar = [
						<LayoutToolbar key={shortid.generate()} type='headline' {...headline} />,
						<LayoutToolbar key={shortid.generate()} type='modular' {...modular} />,
						<LayoutToolbar key={shortid.generate()} type='equal' {...equal} />
					];

					const SortedLayoutToolbarBy = filterFn => SortableLayoutToolbar.filter(filterFn);

					const SortedLayoutToolbar = [
						...SortedLayoutToolbarBy(item => item.props.type === activeKey),
						...SortedLayoutToolbarBy(item => item.props.type !== activeKey)
					];

					if (clearCuration) {
						return null;
					} else {
						return [
							isEditMode ? (
								<LayoutToolbarWrapper key={shortid.generate()} className={'layout__toolbar ' + controlsClassName}>
									{SortedLayoutToolbar}
								</LayoutToolbarWrapper>
							) : null,
							<div key='module' className='layout__module'>
								{isEditMode || shouldRenderInNonEditMode ?
									<Grid
										key='grid'
										{...gridConfig}
										isEditMode={isEditMode}
										zonesDraggable={activeCard === null}
										setLayout={setLayout}
										showZoneBorders={!curationCustomOptions.isOnion}
									>
										{({ renderWithZones }) => (
											renderWithZones(({ model, itemIndex, zoneIndex, zoneSize, draggable }) => {
												const cardProps = {
													model,
													isEditMode,
													isEditing,
													itemIndex,
													zoneIndex,
													zoneSize,
													layoutGroup,
													numberOfItems,
													numberOfZones,
													cardOnBlur,
													cardOnClick,
													activeCard,
													activeItem,
													activeTertiary,
													disableAds,
													draggable,
													curationCustomOptions,
													layoutSpecificProps
												};

												switch (curationType) {
													case 'permalink':
														return 'this is a permalink card';
													default:
														// TODO: we can pass card types in curationType object
														//	instead of hardcoding them
														return <FrontPageCard {...cardProps} />;
												}
											})
										)}
									</Grid> : null}
							</div>
						];
					}
				}}
			</CurationLayout>
		);
	}
}

export default clickoutsideHOC(CurationModule);
