// @flow

import * as React from 'react';
import EditableCard, { EditableCardContainer, DisabledEditableCardContainer } from './editable-card';
import type { NonEmptyCardProps } from './card';
import { TextNode } from 'postbody/InlineNode';
import { Provider, type Context } from '../editor-context';
import renderer from 'react-test-renderer';
import Post from 'kinja-magma/models/Post';
import postStub from '../../../__stubs__/stubbedPost.json';
import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';
import EditableField from './components/editable-field';

const post = Post.fromJSON(postStub);

/**
 * Helper for generating a component with default values
 */
const stubComponent = (props?: $Shape<NonEmptyCardProps> = {}, context?: $Shape<Context> = {}) => (
	<EnsureDefaultTheme>
		<Provider value={{
			dispatch: context.dispatch || (() => undefined),
			addPost: context.addPost || (() => undefined),
			updateBlock: context.updateBlock || (() => undefined),
			selectedCard: context.selectedCard || null,
			selectedCardIndex: context.selectedCardIndex || null,
			selectedCardsBlock: context.selectedCardsBlock || null,
			selectedBlockIndex: context.selectedBlockIndex || null,
			selectedBlock: context.selectedBlock || null,
			editMode: context.editMode || 'CardEditing',
			cardErrors: context.cardErrors || {},
			loadingCards: context.loadingCards || [],
			loadingBlocks: context.loadingBlocks || [],
			numberOfBlocks: context.numberOfBlocks || 0
		}}>
			<EditableCard
				showExcerpt={props.showExcerpt || false}
				showThumbnail={props.showThumbnail || false}
				categorizedPost={null}
				blockIndex={props.blockIndex || 0}
				index={props.index || 0}
				post={props.post || post}
				isAutofill={props.isAutofill || false}
				customHeadline={props.customHeadline || null}
				customExcerpt={props.customExcerpt || null}
				customThumbnail={props.customThumbnail || null}
				onDrop={() => {}}
			/>
		</Provider>
	</EnsureDefaultTheme>
);

describe('CurationBlock - EditableCard', () => {
	it('renders unselected by default', () => {
		const wrapper = renderer.create(stubComponent());
		expect(wrapper.root.findByType(EditableCardContainer).props.isSelected).toBeFalsy();
		expect(wrapper.root.findByType(EditableCardContainer).props.canSelect).toBe(true);
	});
	it('renders selected', () => {
		const wrapper = renderer.create(stubComponent({}, {
			selectedCardIndex: [0, 0]
		}));
		expect(wrapper.root.findByType(EditableCardContainer).props.isSelected).toBe(true);
	});
	it('should be unselectable when not in card editing mode', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({}, {
			editMode: 'BlockEditing',
			dispatch
		}));
		expect(wrapper.root.findByType(EditableCardContainer).props.canSelect).toBe(false);
		renderer.act(() => {
			expect(wrapper.root.findByType(EditableCardContainer).props.onClick());
		});
		expect(dispatch).not.toHaveBeenCalled();
	});
	it('should be selectable when in card editing mode', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({
			blockIndex: 3,
			index: 5
		}, {
			dispatch
		}));
		renderer.act(() => {
			expect(wrapper.root.findByType(EditableCardContainer).props.onClick());
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'SelectCardAction',
			pos: [3, 5]
		});
	});
	it('should not be selectable when the card is autofilled', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({
			isAutofill: true
		}, {
			dispatch
		}));
		renderer.act(() => {
			expect(wrapper.root.findByType(DisabledEditableCardContainer).props.onClick());
		});
		expect(dispatch).not.toHaveBeenCalled();
	});
	it('should pass in custom headline when provided', () => {
		const wrapper = renderer.create(stubComponent({
			customHeadline: [new TextNode('Custom headline')]
		}));
		const textfields = wrapper.root.findAllByType(EditableField);
		expect(textfields[0].props.customValue).toEqual([new TextNode('Custom headline')]);
		expect(textfields[0].props.defaultValue).toEqual(post.formattedHeadline);
	});
	it('should display excerpt when showExcerpt is true and pass in custom excerpt', () => {
		const wrapper = renderer.create(stubComponent({
			customExcerpt: [new TextNode('Custom headline')],
			showExcerpt: true
		}));
		const textfields = wrapper.root.findAllByType(EditableField);
		expect(textfields[1].props.customValue).toEqual([new TextNode('Custom headline')]);
		expect(textfields[1].props.fieldName).toBe('customExcerpt');
	});
	it('should not send delete event when the card is not selected and backspace is pressed', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({}, {
			dispatch
		}));
		renderer.act(() => {
			expect(wrapper.root.findByType(EditableCardContainer).props.onKeyDown({ key: 'Backspace' }));
		});
		expect(dispatch).not.toHaveBeenCalled();
	});
	it('should send delete event when the card is selected and backspace is pressed', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({}, {
			dispatch,
			selectedCardIndex: [0, 0]
		}));
		renderer.act(() => {
			expect(wrapper.root.findByType(EditableCardContainer).props.onKeyDown({ key: 'Backspace' }));
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'RemoveSelectedCardAction'
		});
	});
	it('should not send delete event when headline is being edited', () => {
		const dispatch = jest.fn();
		let wrapper;

		renderer.act(() => {
			wrapper = renderer.create(stubComponent({}, {
				dispatch,
				selectedCardIndex: [0, 0]
			}));
		});
		renderer.act(() => {
			const textfields = wrapper.root.findAllByType(EditableField);
			textfields[0].props.onStartEditing();
		});
		renderer.act(() => {
			expect(wrapper.root.findByType(EditableCardContainer).props.onKeyDown({ key: 'Backspace' }));
		});

		expect(dispatch).not.toHaveBeenCalled();
	});
	it('should not send delete event when exerpt is being edited', () => {
		const dispatch = jest.fn();
		let wrapper;

		renderer.act(() => {
			wrapper = renderer.create(stubComponent({
				showExcerpt: true
			}, {
				dispatch,
				selectedCardIndex: [0, 0]
			}));
		});
		renderer.act(() => {
			const textfields = wrapper.root.findAllByType(EditableField);
			textfields[1].props.onStartEditing();
		});
		renderer.act(() => {
			expect(wrapper.root.findByType(EditableCardContainer).props.onKeyDown({ key: 'Backspace' }));
		});

		expect(dispatch).not.toHaveBeenCalled();
	});
	it('should trigger delete and add article events on paste', () => {
		const dispatch = jest.fn();
		const addPost = jest.fn();
		const wrapper = renderer.create(stubComponent({
			blockIndex: 2,
			index: 3
		}, {
			dispatch,
			addPost,
			selectedCardIndex: [2, 3]
		}));
		renderer.act(() => {
			const container = wrapper.root.findByType(EditableCardContainer);
			container.props.onPaste({
				clipboardData: {
					getData: () => 'testurl'
				}
			});
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'RemoveSelectedCardAction'
		});
		expect(addPost).toHaveBeenCalledWith([2, 3], 'testurl');
	});
	it('should not trigger delete and add article events on paste while a field is editing', () => {
		const dispatch = jest.fn();
		const addPost = jest.fn();
		let wrapper;

		renderer.act(() => {
			wrapper = renderer.create(stubComponent({
				blockIndex: 2,
				index: 3
			}, {
				dispatch,
				addPost,
				selectedCardIndex: [2, 3]
			}));
		});
		renderer.act(() => {
			const textfields = wrapper.root.findAllByType(EditableField);
			textfields[0].props.onStartEditing();
		});
		renderer.act(() => {
			const container = wrapper.root.findByType(EditableCardContainer);
			container.props.onPaste({
				clipboardData: {
					getData: () => 'testurl'
				}
			});
		});

		expect(dispatch).not.toHaveBeenCalled();
		expect(addPost).not.toHaveBeenCalled();
	});
});