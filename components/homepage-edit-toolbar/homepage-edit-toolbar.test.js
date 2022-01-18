// @flow
import HomepageEditToolbar, { type Props, DropContainer } from './homepage-edit-toolbar';
import * as React from 'react';
import { Provider, type Context } from '../curation-block/editor-context';
import renderer from 'react-test-renderer';
import EnsureDefaultTheme from '../theme/ensureDefaultTheme';
import Button from '../button19';
import { CurationStandardBlock } from 'kinja-magma/models/CurationBlock';
import Modal from '../modal';
import StandardBlockSettings from '../curation-block/block-settings/standard-block-settings';

const container = document.createElement('div');

jest.mock('react-dom', () => ({
	createPortal: jest.fn(element => {
		return element;
	})
}));

/**
 * Helper for generating a component with default values
 */
const stubComponent = (props?: $Shape<Props> = {}, context?: $Shape<Context> = {}) => (
	<EnsureDefaultTheme>
		<Provider value={{
			dispatch: context.dispatch || (() => undefined),
			addPost: context.addPost || (() => undefined),
			updateBlock: context.updateBlock || (() => undefined),
			selectedCardIndex: context.selectedCardIndex || null,
			selectedCard: context.selectedCard || null,
			selectedCardsBlock: context.selectedCardsBlock || null,
			selectedBlockIndex: context.selectedBlockIndex || null,
			selectedBlock: context.selectedBlock || null,
			editMode: context.editMode || 'CardEditing',
			cardErrors: context.cardErrors || {},
			loadingCards: context.loadingCards || [],
			loadingBlocks: context.loadingBlocks || [],
			numberOfBlocks: context.numberOfBlocks || 0
		}}>
			<HomepageEditToolbar
				showEditor={true}
				container={props.container || container}
				blogName={props.blogName || 'BlogName'}
				hasFocusedElement={props.hasFocusedElement || false}
				cardIsDragging={props.cardIsDragging || false}
				onCancel={props.onCancel || (() => undefined)}
				onSave={props.onSave || (() => undefined)}
				dispatch={props.dispatch || (() => undefined)}
				mode={props.mode || 'CardEditing'}
				canUndo={true}
				canRedo={true}
			/>
		</Provider>
	</EnsureDefaultTheme>
);

describe('CurationBlock - HomepageEditToolbar', () => {
	it('renders in card edit mode without a card selected', () => {
		const wrapper = renderer.create(stubComponent());
		const buttons = wrapper.root.findAllByType(Button);
		// Displays correct buttons
		expect(buttons.map(button => button.props.label)).toMatchSnapshot();
		// Edit stories button is active
		const editStoriesButton = buttons.find(button => button.props.label === 'Edit stories');
		const editBlocksButton = buttons.find(button => button.props.label === 'Edit layout');
		expect(editStoriesButton && editStoriesButton.props.variant).toBe('toggleActive');
		expect(editBlocksButton && editBlocksButton.props.variant).toBe('toggleInactive');
	});
	it('fires edit mode change, undo, redo, cancel and save events', () => {
		const dispatch = jest.fn();
		const onCancel = jest.fn();
		const onSave = jest.fn();
		const wrapper = renderer.create(stubComponent({
			onCancel,
			onSave,
			dispatch
		}));
		const buttons = wrapper.root.findAllByType(Button);
		renderer.act(() => {
			const cancelButton = buttons.find(button => button.props.label === 'Cancel');
			cancelButton && cancelButton.props.onClick();
		});
		expect(onCancel).toHaveBeenCalled();
		renderer.act(() => {
			const saveButton = buttons.find(button => button.props.label === 'Save');
			saveButton && saveButton.props.onClick();
		});
		expect(onSave).toHaveBeenCalled();
		renderer.act(() => {
			const undoButton = buttons.find(button => button.props.label === 'Undo');
			undoButton && undoButton.props.onClick();
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'UndoAction'
		});
		renderer.act(() => {
			const redoButton = buttons.find(button => button.props.label === 'Redo');
			redoButton && redoButton.props.onClick();
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'RedoAction'
		});
		renderer.act(() => {
			const blockEditingButton = buttons.find(button => button.props.label === 'Edit layout');
			blockEditingButton && blockEditingButton.props.onClick();
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'EnterBlockModeAction'
		});
		renderer.act(() => {
			const cardEditingButton = buttons.find(button => button.props.label === 'Edit stories');
			cardEditingButton && cardEditingButton.props.onClick();
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'EnterCardModeAction'
		});
	});
	it('displays the correct buttons in card editing mode when a card is selected', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({
			hasFocusedElement: true,
			dispatch
		}));
		const buttons = wrapper.root.findAllByType(Button);
		// Displays correct buttons
		expect(buttons.map(button => button.props.label)).toMatchSnapshot();
		renderer.act(() => {
			const removeArticleButton = buttons.find(button => button.props.label === 'Remove article');
			removeArticleButton && removeArticleButton.props.onClick();
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'RemoveSelectedCardAction'
		});
	});
	it('can switch to block editing mode', () => {
		const wrapper = renderer.create(stubComponent({
			mode: 'BlockEditing'
		}));
		// Displays correct buttons
		const buttons = wrapper.root.findAllByType(Button);
		// Buttons stay the same
		expect(buttons.map(button => button.props.label)).toMatchSnapshot();
		// Edit layout button is active
		const editStoriesButton = buttons.find(button => button.props.label === 'Edit stories');
		const editBlocksButton = buttons.find(button => button.props.label === 'Edit layout');
		expect(editStoriesButton && editStoriesButton.props.variant).toBe('toggleInactive');
		expect(editBlocksButton && editBlocksButton.props.variant).toBe('toggleActive');
	});
	it('displays the correct buttons in block editing mode when a block is selected', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({
			mode: 'BlockEditing',
			hasFocusedElement: true,
			dispatch
		}));
		const buttons = wrapper.root.findAllByType(Button);
		// Displays correct buttons
		expect(buttons.map(button => button.props.label || button.props.icon.type.name)).toMatchSnapshot();
	});
	it('displays the correct buttons in block editing mode when a STANDARD block is selected', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({
			mode: 'BlockEditing',
			hasFocusedElement: true,
			dispatch
		}, {
			selectedBlock: new CurationStandardBlock({
				cards: [],
				type: 'Standard',
				layout: {
					type: 'FourCardModular'
				}
			})
		}));
		const buttons = wrapper.root.findAllByType(Button);
		// Displays correct buttons
		expect(buttons.map(button => button.props.label || button.props.icon.type.name)).toMatchSnapshot();
		// Fires movement and delete events
		renderer.act(() => {
			const moveUpButton = buttons.find(button => button.props.icon && button.props.icon.type.name === 'ArrowTopIcon');
			moveUpButton && moveUpButton.props.onClick();
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'MoveSelectedBlockAction',
			direction: 'UP'
		});
		renderer.act(() => {
			const moveDownButton = buttons.find(button => button.props.icon && button.props.icon.type.name === 'ArrowBottomIcon');
			moveDownButton && moveDownButton.props.onClick();
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'MoveSelectedBlockAction',
			direction: 'DOWN'
		});
		renderer.act(() => {
			const removeButton = buttons.find(button => button.props.icon && button.props.icon.type.name === 'TrashcanIcon');
			removeButton && removeButton.props.onClick();
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'RemoveSelectedBlockAction'
		});
	});
	it('shows, closes the settings modal', () => {
		const updateBlock = jest.fn();
		const wrapper = renderer.create(stubComponent({
			mode: 'BlockEditing',
			hasFocusedElement: true
		}, {
			selectedBlockIndex: 6,
			selectedBlock: new CurationStandardBlock({
				cards: [],
				type: 'Standard',
				layout: {
					type: 'FourCardModular'
				}
			}),
			updateBlock
		}));
		const buttons = wrapper.root.findAllByType(Button);
		const settingsButton = buttons.find(button => button.props.label === 'Settings');
		const modals = wrapper.root.findAllByType(Modal);
		const settingsModal = modals.find(modal => modal.props.label === 'settings-modal');

		expect(settingsModal && settingsModal.props.isOpen).toBe(false);
		renderer.act(() => {
			settingsButton && settingsButton.props.onClick();
		});
		expect(settingsModal && settingsModal.props.isOpen).toBe(true);
		renderer.act(() => {
			const blockSettingsForm = wrapper.root.findByType(StandardBlockSettings);
			blockSettingsForm.props.onCancel();
		});
		expect(settingsModal && settingsModal.props.isOpen).toBe(false);
		renderer.act(() => {
			settingsButton && settingsButton.props.onClick();
		});
		renderer.act(() => {
			const blockSettingsForm = wrapper.root.findByType(StandardBlockSettings);
			blockSettingsForm.props.onSave({
				autofill: null,
				header: null
			});
		});
		expect(updateBlock).toHaveBeenCalledWith(6, {
			autofill: null,
			layout: {
				type: 'FourCardModular',
				header: undefined
			},
			blockType: 'Standard'
		});
		expect(settingsModal && settingsModal.props.isOpen).toBe(false);
	});
	it('should display special drop area while a card is dragging', () => {
		const wrapper = renderer.create(stubComponent({
			cardIsDragging: true
		}));
		expect(wrapper.root.findByType(DropContainer)).toBeTruthy();
		expect(wrapper.root.findAllByType(Button).length).toBe(0);
	});
});