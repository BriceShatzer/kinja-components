// @flow

import reducer, { type State } from './reducer';
import { CurationStandardBlock } from 'kinja-magma/models/CurationBlock';

const block = CurationStandardBlock.fromJSON({
	type: 'Standard',
	layout: {
		type: 'FourCardModular'
	},
	cards: [{
		postId: 1
	}, {
		postId: 2
	}, {
		postId: 3
	}, {
		postId: 4
	}]
});

const defaultState: State = {
	editStack: [[block]],
	selectedCardIndex: null,
	selectedBlockIndex: null,
	undoPointer: null,
	cache: {
		curationBlocks: [],
		posts: [],
		authors: {},
		videos: [],
		postCategorization: [],
		autofillIdsByBlock: {}
	},
	cardErrors: {},
	loadingCards: [],
	loadingBlocks: [],
	editMode: 'CardEditing',
	cardIsDragging: false,
	lastEditActionTimestamp: null,
	closedConcurrentEditingWarningLevel: null
};

describe('CuratedHomepageEditor - state reducer', () => {
	describe('UndoAction', () => {
		it('should increase the undo pointer', () => {
			const newState = reducer({
				...defaultState,
				editStack: [[block], [block], [block]]
			}, {
				type: 'UndoAction'
			});
			expect(newState.undoPointer).toBe(1);
		});
		it('should not increase the undo pointer above the length of the undo stack', () => {
			const newState = reducer({
				...defaultState,
				editStack: [[block], [block], [block]],
				undoPointer: 2
			}, {
				type: 'UndoAction'
			});
			expect(newState.undoPointer).toBe(2);
		});
	});
	describe('RedoAction', () => {
		it('should decrease the undo pointer', () => {
			const newState = reducer({
				...defaultState,
				editStack: [[block], [block], [block]],
				undoPointer: 2
			}, {
				type: 'RedoAction'
			});
			expect(newState.undoPointer).toBe(1);
		});
		it('should not decrease the undo pointer below null', () => {
			const newState = reducer({
				...defaultState,
				editStack: [[block], [block], [block]]
			}, {
				type: 'RedoAction'
			});
			expect(newState.undoPointer).toBe(null);
		});
		it('should set the undo pointer to null when it reaches 0', () => {
			const newState = reducer({
				...defaultState,
				editStack: [[block], [block], [block]],
				undoPointer: 1
			}, {
				type: 'RedoAction'
			});
			expect(newState.undoPointer).toBe(null);
		});
	});
	describe('SelectCardAction', () => {
		it('should allow you to mark a card as selected', () => {
			const newState = reducer(defaultState, {
				type: 'SelectCardAction',
				pos: [0, 3]
			});
			expect(newState.selectedCardIndex).toEqual([0, 3]);
		});
	});
	describe('RemoveSelectedCardAction', () => {
		it('should remove the selected card from the current edit state and not affect other states on the stack', () => {
			const newState = reducer({
				...defaultState,
				editStack: [[block], [block]],
				selectedCardIndex: [0, 2]
			}, {
				type: 'RemoveSelectedCardAction'
			});
			expect(newState.editStack[0][0] instanceof CurationStandardBlock && newState.editStack[0][0].cards).toMatchSnapshot();
			expect(newState.editStack[1][0] instanceof CurationStandardBlock && newState.editStack[1][0].cards).toMatchSnapshot();
		});
		it('should not change anything if there is no current card selected', () => {
			const newState = reducer(defaultState, {
				type: 'RemoveSelectedCardAction'
			});
			expect(newState.editStack[0][0]).toEqual(defaultState.editStack[0][0]);
		});
	});
	describe('CardLoadingAction', () => {
		it('should add a given card to the list of loading cards', () => {
			const newState = reducer(defaultState, {
				type: 'CardLoadingAction',
				pos: [0, 0],
				isLoading: true
			});
			expect(newState.loadingCards).toEqual([[0, 0]]);
		});
		it('should remove a card from the array', () => {
			const newState = reducer({
				...defaultState,
				loadingCards: [[0, 0], [0, 1], [0, 2], [0, 0]]
			}, {
				type: 'CardLoadingAction',
				pos: [0,0],
				isLoading: false
			});
			expect(newState.loadingCards).toEqual([[0, 1], [0, 2]]);
		});
	});
	describe('BlockLoadingAction', () => {
		it('should add a given block to the list of loading blocks', () => {
			const newState = reducer(defaultState, {
				type: 'BlockLoadingAction',
				pos: 0,
				isLoading: true
			});
			expect(newState.loadingBlocks).toEqual([0]);
		});
		it('should remove a block from the array', () => {
			const newState = reducer({
				...defaultState,
				loadingBlocks: [0, 3, 1, 0]
			}, {
				type: 'BlockLoadingAction',
				pos: 0,
				isLoading: false
			});
			expect(newState.loadingBlocks).toEqual([3, 1]);
		});
	});
	describe('RemoveSelectedBlockAction', () => {
		it('should remove a block from the list', () => {
			const newState = reducer({
				...defaultState,
				editStack: [[block, block, block]],
				selectedBlockIndex: 0
			}, {
				type: 'RemoveSelectedBlockAction'
			});
			expect(newState.editStack[0]).toEqual([block, block]);
		});
	});
});