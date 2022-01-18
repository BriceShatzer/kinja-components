// @flow

import * as React from 'react';
import EditableField, { StyledContentEditable, type Props } from './editable-field';
import { TextNode, LinkNode } from 'postbody/InlineNode';
import { Provider, type Context } from '../../editor-context';
import renderer from 'react-test-renderer';

const Wrapper = ({ children }) => <div>{children}</div>;

/**
 * Helper for generating a component with default values
 */
const stubComponent = (props?: $Shape<Props> = {}, context?: $Shape<Context> = {}) => (
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
		<EditableField
			defaultValue={props.defaultValue || 'Default value'}
			customValue={props.customValue || undefined}
			cardIndex={props.cardIndex || [0, 0]}
			fieldName={props.fieldName || 'customHeadline'}
			container={props.container || Wrapper}
			onStartEditing={props.onStartEditing || (() => undefined)}
			onEndEditing={props.onEndEditing || (() => undefined)}
			containerRef={props.containerRef || { current: document.createElement('div')} }
			whiteText={props.whiteText || false}
			parentIsDraggable={props.parentIsDraggable || true}
		/>
	</Provider>
);

/**
 * Helper for creating an event target for the contentEditable span
 */
const span = (text: string) => {
	const element = document.createElement('span');
	const textNode = document.createTextNode(text);
	element.appendChild(textNode);
	return element;
};

describe('CurationBlock - EditableField', () => {
	it('renders the default value if no customValue is present', () => {
		const wrapper = renderer.create(stubComponent());
		expect(wrapper.root.findByType(StyledContentEditable).props.html).toBe('Default value');
	});
	it('renders the custom value as text if the customValue prop is provided, including italic characters', () => {
		const wrapper = renderer.create(stubComponent({
			customValue: [
				new TextNode('Custom value'),
				new LinkNode([new TextNode(' with link', ['Italic', 'Bold'])], '')
			]
		}));
		expect(wrapper.root.findByType(StyledContentEditable).props.html).toBe('Custom value<em> with link</em>');
	});
	it('renders deault value if a customValue is provided but with length 0', () => {
		const wrapper = renderer.create(stubComponent({
			customValue: []
		}));
		expect(wrapper.root.findByType(StyledContentEditable).props.html).toBe('Default value');
	});
	it('renders deault value if the rendered custom value is empty', () => {
		const wrapper = renderer.create(stubComponent({
			customValue: [new TextNode('', ['Italic'])]
		}));
		expect(wrapper.root.findByType(StyledContentEditable).props.html).toBe('Default value');
	});
	it('should not allow selecting when we are not in card editing mode', () => {
		const onStartEditing = jest.fn();
		const wrapper = renderer.create(stubComponent({
			onStartEditing
		}, {
			editMode: 'BlockEditing'
		}));
		expect(wrapper.root.findByType(Wrapper).props.canSelect).toBe(false);
		renderer.act(() => {
			wrapper.root.findByType(Wrapper).props.onClick();
		});
		expect(onStartEditing).not.toHaveBeenCalled();
		expect(wrapper.root.findByType(StyledContentEditable).props.disabled).toBe(true);
	});
	it('should not allow selecting when the current card is not selected', () => {
		const onStartEditing = jest.fn();
		const wrapper = renderer.create(stubComponent({
			onStartEditing
		}, {
			selectedCardIndex: [3, 3]
		}));
		renderer.act(() => {
			wrapper.root.findByType(Wrapper).props.onClick();
		});
		expect(onStartEditing).not.toHaveBeenCalled();
		expect(wrapper.root.findByType(StyledContentEditable).props.disabled).toBe(true);
	});
	it('should activate the field when clicked and the card is selected', () => {
		const onStartEditing = jest.fn();

		const wrapper = renderer.create(stubComponent({
			onStartEditing,
			cardIndex: [1, 1]
		}, {
			selectedCardIndex: [1, 1]
		}));

		renderer.act(() => {
			wrapper.root.findByType(Wrapper).props.onClick();
		});
		expect(wrapper.root.findByType(Wrapper).props.isCardSelected).toBe(true);
		expect(wrapper.root.findByType(Wrapper).props.canSelect).toBe(true);
		expect(wrapper.root.findByType(Wrapper).props.isSelected).toBe(true);
		expect(wrapper.root.findByType(StyledContentEditable).props.disabled).toBe(false);
		expect(onStartEditing).toHaveBeenCalledTimes(1);
	});
	it('should send update event on blur', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({
			cardIndex: [1, 1]
		}, {
			dispatch,
			selectedCardIndex: [1, 1]
		}));

		renderer.act(() => {
			wrapper.root.findByType(StyledContentEditable).props.onBlur({ target: span('Test') });
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'UpdateCardAction',
			update: {
				customHeadline: [new TextNode('Test')]
			},
			pos: [1, 1]
		});
	});
	it('should not send update event when you exit without typing, starting on default value', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({}, {
			dispatch
		}));

		renderer.act(() => {
			wrapper.root.findByType(StyledContentEditable).props.onBlur({ target: span('Default value') });
		});
		expect(dispatch).not.toHaveBeenCalled();
	});
	it('should not send update event when you exit without typing, starting on custom value', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({
			customValue: [new TextNode('Test')]
		}, {
			dispatch
		}));

		renderer.act(() => {
			wrapper.root.findByType(StyledContentEditable).props.onBlur({ target: span('Test') });
		});
		expect(dispatch).not.toHaveBeenCalled();
	});
	it('should not send update event when you exit with empty string, after being on default value', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({
		}, {
			dispatch
		}));

		renderer.act(() => {
			wrapper.root.findByType(StyledContentEditable).props.onBlur({ target: span('') });
		});
		expect(dispatch).not.toHaveBeenCalled();
		expect(wrapper.root.findByType(StyledContentEditable).props.html).toBe('Default value');
	});
	it('should send an update with null if you delete all contents and you had a custom value', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({
			customValue: [new TextNode('Test')]
		}, {
			dispatch
		}));

		renderer.act(() => {
			wrapper.root.findByType(StyledContentEditable).props.onBlur({ target: span('') });
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'UpdateCardAction',
			update: {
				customHeadline: null
			},
			pos: [0, 0]
		});
	});
	it('should blur field when enter is pressed', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({
		}, {
			dispatch
		}));

		const contentEditableSpan = span('Text');
		const blur = jest.spyOn(contentEditableSpan, 'blur');

		renderer.act(() => {
			wrapper.root.findByType(StyledContentEditable).props.onKeyDown({ key: 'Enter', target: contentEditableSpan });
		});
		expect(blur).toHaveBeenCalled();
	});
	it('should send a null event when reverting back to the default value', () => {
		const dispatch = jest.fn();
		const wrapper = renderer.create(stubComponent({
			customValue: [new TextNode('Custom value')]
		}, {
			dispatch
		}));

		renderer.act(() => {
			wrapper.root.findByType(StyledContentEditable).props.onBlur({ target: span('Default value') });
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'UpdateCardAction',
			update: {
				customHeadline: null
			},
			pos: [0, 0]
		});
	});
});