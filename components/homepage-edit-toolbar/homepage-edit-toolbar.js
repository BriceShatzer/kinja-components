/* @flow */

import * as React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import Button, { ButtonWrapper } from '../button19';
import Trashcan from '../icon19/Trashcan';
import Undo from '../icon19/Undo';
import Redo from '../icon19/Redo';
import ArrowBottom from '../icon19/ArrowBottom';
import ArrowTop from '../icon19/ArrowTop';
import Close from '../icon19/Close';
import Gear from '../icon19/Gear';
import Image from '../icon19/Image';
import Checkmark from '../icon19/Checkmark';
import { IconWrapper } from '../icon19/icon19';
import InsertModule from '../icon19/InsertModule';
import LayoutHorizontal from '../icon19/LayoutHorizontal';
import Plus from '../icon19/Plus';
import TileBackground from '../icon19/TileBackground';
import Analytics from '../hoc/analytics';
import LayoutSelector from './layout-selector';
import createNewBlock from './create-new-block';
import EditorContext from '../curation-block/editor-context';
import { getBlockTypeByLayout, getLayoutByType } from '../curation-block/utils/updateBlockUtils';
import DragAndDropHOC, { type DragAndDropProps, type DragAndDropInjectedProps } from '../curation-block/hoc/drag-and-drop';
import { TriggerContainer } from '../dropdown/dropdown';
import StandardBlockSettings from '../curation-block/block-settings/standard-block-settings';
import CardThumbnailModal from '../curation-block/card-thumbnail-modal';

import type { AnalyticsInjectedProps } from '../hoc/analytics';
import type { Action, EditMode } from '../curation-block/reducer';
import { type CurationBlockLayout } from 'kinja-magma/models/CurationBlock';
import type { LayoutString } from './layout-selector';
import type { SimpleImageJSON } from 'kinja-magma/models/SimpleImage';

import Modal from '../modal';

export const TOOLBAR_HEIGHT = '3rem';

export type Props = {|
	showEditor: boolean,
	mode: EditMode,
	blogName: string,
	hasFocusedElement: boolean,
	cardIsDragging: boolean,
	container: HTMLDivElement,
	dispatch: Action => void,
	onCancel: () => void,
	onSave: () => void,
	canUndo: boolean,
	canRedo: boolean
|} & AnalyticsInjectedProps;

const VerticalSeparator = styled.div`
	border: 0.5px solid ${props => props.theme.color.midgray};
	width: 0;
	height: 2rem;
	margin: 0 0.25rem;
`;

export const Container = styled.div`
	display: flex;
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 0.25rem 0.5rem 1rem;
	box-shadow: '0 0 10px 0 rgba(0, 0, 0, 0.25)';
	background: white;
	z-index: 200;

	${props => props.preloader && css`
		height: 100px;
		box-shadow: none;
	`}

	${props => props.cardIsDragging && css`
		padding: 0;
	`}
`;

const SubContainer = styled.div`
	display: flex;
	align-items: center;

	${ButtonWrapper},
	${VerticalSeparator},
	${TriggerContainer} {
		margin: 0 0.25rem;
	}

	${TriggerContainer} ${ButtonWrapper} {
		margin: 0;
	}
`;

export const DropContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${props => props.theme.color.error};
	font-size: 1.125rem;
	font-weight: bold;
	line-height: 1.5rem;
	color: white;
	text-align: center;
	width: 100%;
	height: ${TOOLBAR_HEIGHT};

	${IconWrapper} {
		margin-right: 0.25rem;
	}
`;

export const Title = styled.h4`
	font-size: 1.125rem;
	font-weight: bold;
	line-height: 1.5rem;
	color: ${props => props.theme.color.darksmoke};
	margin: 0;
	padding-right: 0.75rem;
	margin-right: 0.25rem;
`;

function HomepageEditToolbar(props: {| ...Props, ...DragAndDropProps, ...DragAndDropInjectedProps |}) {
	const { dispatch, eventProps, canUndo, canRedo, ga, blogName, showEditor = true } = props;
	const {
		updateBlock,
		selectedBlockIndex,
		selectedBlock,
		selectedCardIndex,
		selectedCard,
		selectedCardsBlock,
		numberOfBlocks
	} = React.useContext(EditorContext);
	const isSelectedBlockFirst = selectedBlockIndex === 0;
	const isSelectedBlockLast = selectedBlockIndex === numberOfBlocks - 1;
	const isCardEditing = props.mode === 'CardEditing';
	const isBlockEditing = props.mode === 'BlockEditing';
	const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
	const [isThumbnailModalOpen, setIsThumbnailModalOpen] = React.useState(false);
	const EnterCardModeCallback = React.useCallback(() => {
		dispatch({ type: 'EnterCardModeAction' });
		ga('Curation Tools', 'Curation Module - Enter Article Editing Mode');
	}, [dispatch, ga]);
	const EnterBlockModeCallback = React.useCallback(() => {
		dispatch({ type: 'EnterBlockModeAction' });
		ga('Curation Tools', 'Curation Module - Enter Block Editing Mode');
	}, [dispatch, ga]);
	const AddBlockCallback = React.useCallback((blockType: LayoutString) => {
		dispatch({
			type: 'AddBlockAction',
			block: createNewBlock(blockType)
		});
		dispatch({
			type: 'SelectBlockAction',
			index: 0
		});
		ga('Curation Tools', 'Curation Module - Add Block', blockType);
	}, [dispatch, ga]);
	const UpdateBlockCallback = React.useCallback((layoutType: LayoutString) => {
		if (selectedBlockIndex === null || selectedBlockIndex === undefined) {
			return;
		}
		const layout = getLayoutByType(layoutType);
		const blockType = getBlockTypeByLayout(layoutType);
		const newBlock = layout ? { layout, blockType } : { blockType };
		updateBlock(selectedBlockIndex, newBlock);
		ga('Curation Tools', 'Curation Module - Change Block Layout', layoutType);
	}, [selectedBlockIndex, updateBlock, ga]);
	const RemoveSelectedCardCallback = React.useCallback(() => {
		dispatch({ type: 'RemoveSelectedCardAction' });
		ga('Curation Tools', 'Curation Module - Delete Article');
	}, [dispatch, ga]);
	const MoveSelectedBlockUpCallback = React.useCallback(() => {
		dispatch({ type: 'MoveSelectedBlockAction', direction: 'UP' });
		ga('Curation Tools', 'Curation Module - Move Block Up');
	}, [dispatch, ga]);
	const MoveSelectedBlockDownCallback = React.useCallback(() => {
		dispatch({ type: 'MoveSelectedBlockAction', direction: 'DOWN' });
		ga('Curation Tools', 'Curation Module - Move Block Down');
	}, [dispatch, ga]);
	const RemoveSelectedBlockCallback = React.useCallback(() => {
		dispatch({ type: 'RemoveSelectedBlockAction' });
		ga('Curation Tools', 'Curation Module - Delete Block');
	}, [dispatch, ga]);
	const UndoCallback = React.useCallback(() => {
		dispatch({ type: 'UndoAction' });
		ga('Curation Tools', 'Curation Module - Undo');
	}, [dispatch, ga]);
	const RedoCallback = React.useCallback(() => {
		dispatch({ type: 'RedoAction' });
		ga('Curation Tools', 'Curation Module - Redo');
	}, [dispatch, ga]);
	const OpenSettingsModalCallback = React.useCallback(() => setIsSettingsModalOpen(true), []);
	const CloseSettingsModalCallback = React.useCallback(() => setIsSettingsModalOpen(false), []);
	const CommitBlockSettingsCallback = React.useCallback(({ autofill, header, unbranded, storyLabel }) => {
		if (selectedBlockIndex === undefined || selectedBlockIndex === null || !selectedBlock || selectedBlock.type !== 'Standard')	{
			return;
		}
		// $FlowFixMe this is a bug on 0.110, it is fixed in 0.111, we need to update flow
		const layout: CurationBlockLayout = { ...selectedBlock.layout,
			header: header || undefined,
			customStoryLabel: storyLabel || undefined
		};

		updateBlock(
			selectedBlockIndex,
			{
				autofill,
				blockType: 'Standard',
				layout,
				unbranded
			}
		);
		if (unbranded !== selectedBlock.unbranded) {
			ga('Curation Tools', 'Curation Module - Change Block Style');
		}
		if (autofill !== selectedBlock.autofill) {
			ga('Curation Tools', 'Curation Module - Change Block Fill Method');
		}
		if (header !== selectedBlock.layout.header) {
			ga('Curation Tools', 'Curation Module - Change Block Header Settings');
		}
		setIsSettingsModalOpen(false);
	}, [selectedBlock, selectedBlockIndex, updateBlock, ga]);
	const CloseThumbnailModalCallback = React.useCallback(() => setIsThumbnailModalOpen(false), []);
	const CommitThumbnailChangeCallback = React.useCallback((thumbnail: ?SimpleImageJSON) => {
		if (selectedCardIndex === undefined || selectedCardIndex === null) {
			return;
		}

		dispatch({
			type: 'UpdateCardAction',
			pos: selectedCardIndex,
			update: {
				customThumbnail: thumbnail
			}
		});
		ga('Curation Tools', 'Curation Module - Article Thumbnail Change');

		setIsThumbnailModalOpen(false);
	}, [selectedCardIndex, dispatch, ga]);

	const imageAssetType: 'background' | 'thumbnail' =
		selectedCardsBlock && selectedCardsBlock.type === 'Standard' && selectedCardsBlock.layout.type === 'FeaturedStory' ?
			'background' : 'thumbnail';

	return ReactDOM.createPortal(
		<Container cardIsDragging={props.cardIsDragging} {...eventProps}>
			{props.cardIsDragging ? (
				<DropContainer>
					<Trashcan /> Drop here to remove from homepage
				</DropContainer>
			) : (
				<>
					<SubContainer>
						<Title hasFocusedElement={props.hasFocusedElement}>
								Editing {`${props.blogName}'s`} homepage
						</Title>
						<VerticalSeparator />
						{showEditor && <>
							<Button
								isSmall
								icon={<InsertModule />}
								labelPosition="after"
								label="Edit stories"
								onClick={EnterCardModeCallback}
								variant={isCardEditing ? 'toggleActive' : 'toggleInactive'}
							/>
							<Button
								isSmall
								icon={<LayoutHorizontal />}
								labelPosition="after"
								label="Edit layout"
								onClick={EnterBlockModeCallback}
								variant={isBlockEditing ? 'toggleActive' : 'toggleInactive'}
							/>
						</>}
						{showEditor && isBlockEditing && (
							<>
								<VerticalSeparator />
								<LayoutSelector
									icon={<Plus />}
									label="Add block"
									onSelect={AddBlockCallback}
									variant="tertiary"
									isSmall
								/>
							</>
						)}
						{showEditor && isCardEditing && props.hasFocusedElement && (
							<>
								<VerticalSeparator />
								<Button
									isSmall
									icon={<Image />}
									labelPosition="after"
									variant="tertiary"
									label={imageAssetType === 'background' ? 'Change background image' : 'Change thumbnail'}
									onClick={() => setIsThumbnailModalOpen(true)}
								/>
								<Button
									isSmall
									icon={<Trashcan />}
									labelPosition="after"
									variant="tertiary"
									label="Remove article"
									onClick={RemoveSelectedCardCallback}
									className="js_homepage-remove-card-button"
								/>
							</>
						)}
						{showEditor && isBlockEditing && props.hasFocusedElement && (
							<>
								<VerticalSeparator />
								<LayoutSelector
									icon={<TileBackground />}
									label="Layout"
									onSelect={UpdateBlockCallback}
									variant="tertiary"
									isSmall
								/>
								{selectedBlock && selectedBlock.type === 'Standard' && <Button
									isSmall
									icon={<Gear />}
									label="Settings"
									variant="tertiary"
									labelPosition="after"
									onClick={OpenSettingsModalCallback}
								/>}
								<Button
									isSmall
									icon={<ArrowTop />}
									variant="tertiary"
									onClick={MoveSelectedBlockUpCallback}
									disabled={isSelectedBlockFirst}
								/>
								<Button
									isSmall
									icon={<ArrowBottom />}
									variant="tertiary"
									onClick={MoveSelectedBlockDownCallback}
									disabled={isSelectedBlockLast}
								/>
								<Button
									isSmall
									icon={<Trashcan />}
									variant="tertiary"
									onClick={RemoveSelectedBlockCallback}
								/>
							</>
						)}
					</SubContainer>
					{showEditor && <SubContainer>
						<Button
							isSmall
							icon={<Undo />}
							labelPosition="after"
							variant="tertiary"
							label="Undo"
							disabled={!canUndo}
							onClick={UndoCallback}
						/>
						<Button
							isSmall
							icon={<Redo />}
							labelPosition="after"
							variant="tertiary"
							label="Redo"
							disabled={!canRedo}
							onClick={RedoCallback}
						/>
						<VerticalSeparator />
						<Button
							isSmall
							icon={<Close />}
							labelPosition="after"
							variant="tertiary"
							label="Cancel"
							onClick={props.onCancel}
						/>
						<Button
							isSmall
							icon={<Checkmark />}
							labelPosition="after"
							label="Save"
							onClick={props.onSave}
							className="js_homepage-save-button"
						/>
					</SubContainer>}
				</>
			)}
			<Modal fullscreen={true}
				overflow="auto"
				label="settings-modal"
				isOpen={isSettingsModalOpen}
				onClose={CloseSettingsModalCallback}>
				<StandardBlockSettings
					blogName={blogName}
					selectedBlock={selectedBlock}
					isOpen={isSettingsModalOpen}
					defaultAutofill={selectedBlock && selectedBlock.type === 'Standard' ? selectedBlock.autofill : undefined}
					defaultHeader={selectedBlock && selectedBlock.type === 'Standard' ? selectedBlock.layout.header : undefined}
					defaultUnbranded={selectedBlock && selectedBlock.type === 'Standard' ? selectedBlock.unbranded : undefined}
					onCancel={CloseSettingsModalCallback}
					onSave={CommitBlockSettingsCallback}
				/>
			</Modal>
			<Modal label="thumbnail-modal" isOpen={isThumbnailModalOpen} onClose={CloseThumbnailModalCallback}>
				<CardThumbnailModal
					onCancel={CloseThumbnailModalCallback} onSave={CommitThumbnailChangeCallback}
					defaultThumbnail={selectedCard && selectedCard.customThumbnail ? selectedCard.customThumbnail : undefined}
					imageAssetType={imageAssetType}
				/>
			</Modal>
		</Container>, props.container);
}

export default DragAndDropHOC(Analytics(HomepageEditToolbar));
