// @flow
import { updateCard, swapCards, moveBlock, removeBlock, addBlock, updateBlock } from './undo-stack';
import { parseCurationBlock } from 'kinja-magma/models/CurationBlock';
import { createPostId, createCategoryId } from 'kinja-magma/models/Id';

jest.mock('uuid/v4', () => {
	function* getId() {
		let index = 0;
		while (true) {
			yield index++;
		}
	}
	const generator = getId();
	return () => (generator.next().value || 0) + '';
});


const standardHorizontalList = parseCurationBlock({
	type: 'Standard',
	layout: {
		type: 'CompactHorizontalList'
	},
	cards: [
		{ postId: '312'},
		{ postId: '61241'},
		{ postId: '9920' }
	]
});

const standardFourCard = parseCurationBlock({
	type: 'Standard',
	layout: {
		type: 'FourCardModular'
	},
	cards: [
		{ postId: '119' },
		{ postId: '122' },
		{ postId: '434' },
		{ postId: '254' }
	]
});

const standardFiveCard = parseCurationBlock({
	type: 'Standard',
	layout: { type: 'FiveCardModular' },
	cards: [
		{ postId: '119' },
		{ postId: '122' },
		{ postId: '434' },
		{ postId: '254' },
		{ postId: '211' }
	]
});

const videoBlock = parseCurationBlock({
	type: 'Video'
});

describe('CuratedHomepageEditor - undo stack', () => {
	describe('updateCard', () => {
		it('should correctly change a card, implementing undo stack', () => {
			const result = updateCard({
				editStack: [[standardHorizontalList, standardFourCard]],
				undoPointer: null
			}, { postId: createPostId(6) }, [0, 1]);
			// Stack contains two elements
			expect(result.editStack.length).toBe(2);
			// 2nd element in first block at the head of the stack is now 6
			expect(result.editStack[0][0].type === 'Standard' && result.editStack[0][0].cards[1] && result.editStack[0][0].cards[1].postId).toBe('6');
			// 2nd element in first block at the old version in the stack is still 61241
			expect(result.editStack[1][0].type === 'Standard' && result.editStack[1][0].cards[1] && result.editStack[1][0].cards[1].postId).toBe('61241');
			expect(result).toMatchSnapshot();
		});
	});

	describe('swapCards', () => {
		it('should correctly swap cards from different blocks', () => {
			const result = swapCards({
				editStack: [[standardHorizontalList, standardFourCard]],
				undoPointer: null
			}, [0, 2], [1, 0]);
			// Stack contains two elements
			expect(result.editStack.length).toBe(2);
			// 3rd element in first block at the head of the stack is now 6
			expect(result.editStack[0][0].type === 'Standard' && result.editStack[0][0].cards[2] && result.editStack[0][0].cards[2].postId).toBe('119');
			// 1st element in second block at the head of the stack is now 9920
			expect(result.editStack[0][1].type === 'Standard' && result.editStack[0][1].cards[0] && result.editStack[0][1].cards[0].postId).toBe('9920');
			// 3rd element in first block at the old version in the stack is still 61241
			expect(result.editStack[1][0].type === 'Standard' && result.editStack[1][0].cards[2] && result.editStack[1][0].cards[2].postId).toBe('9920');
			// 1st element in second block at the old version in the stack is still 61241
			expect(result.editStack[1][1].type === 'Standard' && result.editStack[1][1].cards[0] && result.editStack[1][1].cards[0].postId).toBe('119');
			expect(result).toMatchSnapshot();
		});
		it('should correctly swap cards inside the same block', () => {
			const result = swapCards({
				editStack: [[standardHorizontalList, standardFourCard]],
				undoPointer: null
			}, [0, 2], [0, 0]);
			// Stack contains two elements
			expect(result.editStack.length).toBe(2);
			// 3rd element in first block at the head of the stack is now 6
			expect(result.editStack[0][0].type === 'Standard' && result.editStack[0][0].cards[2] && result.editStack[0][0].cards[2].postId).toBe('312');
			// 1st element in first block at the head of the stack is now 9920
			expect(result.editStack[0][0].type === 'Standard' && result.editStack[0][0].cards[0] && result.editStack[0][0].cards[0].postId).toBe('9920');
			// 3rd element in first block at the old version in the stack is still 61241
			expect(result.editStack[1][0].type === 'Standard' && result.editStack[1][0].cards[2] && result.editStack[1][0].cards[2].postId).toBe('9920');
			// 1st element in second block at the old version in the stack is still 61241
			expect(result.editStack[1][1].type === 'Standard' && result.editStack[1][1].cards[0] && result.editStack[1][1].cards[0].postId).toBe('119');
			expect(result).toMatchSnapshot();
		});
		it('should remove the unused part of the undo stack on update', () => {
			if (standardHorizontalList.type !== 'Standard') {
				throw new Error('unexpected block type');
			}
			const result = swapCards({
				editStack: [[parseCurationBlock({
					type: 'Standard',
					layout: {
						type: 'FourCardModular'
					},
					cards: []
				}), standardFourCard], [standardHorizontalList, standardFourCard]],
				undoPointer: 1
			}, [0, 2], [0, 0]);
			expect(result.editStack.length).toBe(2);
			expect(result.undoPointer).toBe(null);
			expect(result.editStack[0][0].type === 'Standard' && result.editStack[0][0].layout.type).toBe('CompactHorizontalList');
			expect(result).toMatchSnapshot();
		});
	});

	describe('moveBlock', () => {
		it('should correctly move a block down', () => {
			const result = moveBlock({
				editStack: [[standardHorizontalList, standardFourCard, videoBlock]],
				undoPointer: null
			}, 1, 1);
			expect(result.editStack[0][1]).toEqual(videoBlock);
			expect(result.editStack[0][2]).toEqual(standardFourCard);
			expect(result.editStack.length).toBe(2);
		});
		it('should correctly move a block up', () => {
			const result = moveBlock({
				editStack: [[standardHorizontalList, standardFourCard, videoBlock]],
				undoPointer: null
			}, 1, -1);
			expect(result.editStack[0][0]).toEqual(standardFourCard);
			expect(result.editStack[0][1]).toEqual(standardHorizontalList);
			expect(result.editStack.length).toBe(2);
		});
		it('should not update the undo stack when trying to move the first block upward', () => {
			const result = moveBlock({
				editStack: [[standardHorizontalList, standardFourCard]],
				undoPointer: null
			}, 0, -1);
			expect(result.editStack.length).toBe(1);
			expect(result.editStack[0][0]).toEqual(standardHorizontalList);
			expect(result.editStack[0][1]).toEqual(standardFourCard);
		});
		it('should not update the undo stack when trying to move the last block downward', () => {
			const result = moveBlock({
				editStack: [[standardHorizontalList, standardFourCard]],
				undoPointer: null
			}, 1, 1);
			expect(result.editStack.length).toBe(1);
			expect(result.editStack[0][0]).toEqual(standardHorizontalList);
			expect(result.editStack[0][1]).toEqual(standardFourCard);
		});
	});

	describe('removeBlock', () => {
		it('should correctly remove a block', () => {
			const result = removeBlock({
				editStack: [[standardHorizontalList, standardFourCard, videoBlock]],
				undoPointer: null
			}, 1);
			expect(result.editStack).toEqual([
				[standardHorizontalList, videoBlock],
				[standardHorizontalList, standardFourCard, videoBlock]
			]);
		});
	});

	describe('addBlock', () => {
		it('should correctly add a block to the start of the list', () => {
			const result = addBlock({
				editStack: [[standardHorizontalList, standardFourCard]],
				undoPointer: null
			}, videoBlock);
			expect(result.editStack).toEqual([
				[videoBlock, standardHorizontalList, standardFourCard],
				[standardHorizontalList, standardFourCard]
			]);
		});
	});

	describe('updateBlock', () => {
		it('should update a standardFiveCard block to a standardFourCard block', () => {
			const currentBlockIndex = 0;
			const newBlock = {
				layout: { type: 'FourCardModular' },
				blockType: 'Standard'
			};
			const result = updateBlock({
				editStack: [[standardFiveCard]],
				undoPointer: null
			}, currentBlockIndex, newBlock);

			expect(result.editStack).toEqual([[{
				...standardFourCard,
				id: standardFiveCard.id
			}], [standardFiveCard]]);
		});

		it('should update a standardFourCard block to a standardFiveCard block with one null card', () => {
			const currentBlockIndex = 0;
			const newBlock = {
				layout: { type: 'FiveCardModular' },
				blockType: 'Standard'
			};
			const result = updateBlock({
				editStack: [[standardFourCard]],
				undoPointer: null
			}, currentBlockIndex, newBlock);

			if (standardFourCard.type !== 'Standard') {
				throw new Error();
			}

			expect(result.editStack).toEqual([[{
				...standardFiveCard,
				id: standardFourCard.id,
				cards: [...standardFourCard.cards, null]
			}], [standardFourCard]]);
		});

		it('should update a videoBlock to a standardFiveCard block filled with null card', () => {
			const currentBlockIndex = 0;
			const newBlock = {
				layout: { type: 'FiveCardModular' },
				blockType: 'Standard'
			};
			const result = updateBlock({
				editStack: [[videoBlock]],
				undoPointer: null
			}, currentBlockIndex, newBlock);

			expect(result.editStack).toEqual([[{
				...standardFiveCard,
				id: videoBlock.id,
				cards: new Array(5).fill(null)
			}], [videoBlock]]);
		});

		it('should update a standardFiveCard block to a videoBlock', () => {
			const currentBlockIndex = 0;
			const newBlock = {
				blockType: 'Video'
			};
			const result = updateBlock({
				editStack: [[standardFiveCard]],
				undoPointer: null
			}, currentBlockIndex, newBlock);

			expect(result.editStack).toEqual([[{
				type: 'Video',
				id: standardFiveCard.id
			}], [standardFiveCard]]);
		});

		it('should update a non-autofill block to an autofill block', () => {
			const editStack = [[standardFiveCard]];
			const currentBlockIndex = 0;
			const newBlock = {
				blockType: 'Standard',
				layout: { type: 'FourCardModular' },
				autofill: {
					type: 'CategoryAutofill',
					categoryId: createCategoryId(1)
				}
			};
			const result = updateBlock({
				editStack,
				undoPointer: null
			}, currentBlockIndex, newBlock);
			const expectedBlock = result.editStack[0][0];

			if (!expectedBlock.autofill) {
				throw new Error();
			}

			expect(expectedBlock.autofill).toEqual({
				type: 'CategoryAutofill',
				categoryId: createCategoryId(1)
			});
		});

		it('should update to an autofill block with the autofill options of current block', () => {
			const currentBlock = parseCurationBlock({
				type: 'Standard',
				layout: { type: 'FiveCardModular' },
				cards: [
					{ postId: '119' },
					{ postId: '122' },
					{ postId: '434' },
					{ postId: '254' },
					{ postId: '211' }
				],
				autofill: {
					type: 'CategoryAutofill',
					categoryId: createCategoryId(1)
				}
			});
			const editStack = [[currentBlock]];
			const currentBlockIndex = 0;
			const newBlock = {
				blockType: 'Standard',
				layout: { type: 'FourCardModular' }
			};
			const result = updateBlock({
				editStack,
				undoPointer: null
			}, currentBlockIndex, newBlock);

			expect(result.editStack).toEqual([[{
				...standardFourCard,
				id: currentBlock.id,
				autofill: {
					type: 'CategoryAutofill',
					categoryId: createCategoryId(1)
				},
				cards: []
			}], [currentBlock]]);
		});

		it('should update from an autofill block to a non-autofill block', () => {
			const currentBlock = parseCurationBlock({
				type: 'Standard',
				layout: { type: 'FiveCardModular' },
				cards: [
					{ postId: '119' },
					{ postId: '122' },
					{ postId: '434' },
					{ postId: '254' },
					{ postId: '211' }
				],
				autofill: {
					type: 'CategoryAutofill',
					categoryId: createCategoryId(1)
				}
			});
			const editStack = [[currentBlock]];
			const currentBlockIndex = 0;
			const newBlock = {
				blockType: 'Standard',
				layout: { type: 'FiveCardModular' },
				autofill: undefined
			};
			const result = updateBlock({
				editStack,
				undoPointer: null
			}, currentBlockIndex, newBlock);

			expect(result.editStack).toEqual([[{
				...standardFiveCard,
				id: currentBlock.id,
				autofill: undefined,
				cards: [null, null,  null, null, null]
			}], [currentBlock]]);
		});
	});
});