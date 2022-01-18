// @flow
import type { CurationBlock, Card } from 'kinja-magma/models/CurationBlock';
import { CurationStandardBlock, CurationVideoBlock, CurationPodcastBlock, CurationAdBlock } from 'kinja-magma/models/CurationBlock';
import type { CurationBlockLayout, CurationBlockTypeString, Autofill, CurationBlockLayoutTypeString } from 'kinja-magma/models/CurationBlock';
import { getLayoutLength } from './utils/updateBlockUtils';

export type CardIndex = [number, number]; // [index of block, index of card inside block]
export type EditState = {
	editStack: Array<Array<CurationBlock>>,
	undoPointer: number | null
}

/**
 * Replace a value in an array immutably, returning a new array
 */
function updateArrayAt<T>(array: Array<T>, at: number, newValue: T): Array<T> {
	return array.map((value, index) => index === at ? newValue : value);
}

/**
 * Add a new state to the front undo stack, deleting redo versions
 */
function update(state: EditState, newBlockArray: Array<CurationBlock>): EditState {
	return {
		editStack: [newBlockArray, ...state.editStack.slice(state.undoPointer || 0)],
		undoPointer: null
	};
}

/**
 * Update a single card in a block
 */
function updateCard(state: EditState, newCard: Card | null, at: CardIndex): EditState {
	const currentArray = state.editStack[state.undoPointer || 0];
	const [blockIndex, cardIndex] = at;
	const targetBlock = currentArray[blockIndex];
	if (targetBlock.type !== 'Standard') {
		throw new Error('Trying to edit non-standard block\'s cards');
	}
	const newCardsArray = updateArrayAt(targetBlock.cards, cardIndex, newCard);
	const newBlockArray = updateArrayAt(currentArray, blockIndex, new CurationStandardBlock({
		type: 'Standard',
		layout: targetBlock.layout,
		autofill: targetBlock.autofill || undefined,
		cards: newCardsArray,
		id: targetBlock.id
	}));
	return update(state, newBlockArray);
}

/**
 * Swap the position of two cards, either from the same or different blocks
 */
function swapCards(state: EditState, from: CardIndex, to: CardIndex): EditState {
	const currentArray = state.editStack[state.undoPointer || 0];
	const fromBlock = currentArray[from[0]];
	const toBlock = currentArray[to[0]];
	if (fromBlock.type !== 'Standard' || toBlock.type !== 'Standard') {
		throw new Error('Trying to swap cards between non-standard blocks');
	}
	const fromCard = fromBlock.cards[from[1]];
	const toCard = toBlock.cards[to[1]];
	if (from[0] !== to[0]) {
		const newFromBlock = new CurationStandardBlock({
			type: 'Standard',
			layout: fromBlock.layout,
			autofill: fromBlock.autofill || undefined,
			cards: updateArrayAt(fromBlock.cards, from[1], toCard),
			id: fromBlock.id
		});
		const newToBlock = new CurationStandardBlock({
			type: 'Standard',
			layout: toBlock.layout,
			autofill: toBlock.autofill || undefined,
			cards: updateArrayAt(toBlock.cards, to[1], fromCard),
			id: toBlock.id
		});
		const blocksArrayWithFromUpdated = updateArrayAt(currentArray, from[0], newFromBlock);
		const blocksArrayWithBothUpdated = updateArrayAt(blocksArrayWithFromUpdated, to[0], newToBlock);
		return update(state, blocksArrayWithBothUpdated);
	} else {
		const newBlockWithFromCardUpdated = new CurationStandardBlock({
			type: 'Standard',
			layout: fromBlock.layout,
			autofill: fromBlock.autofill || undefined,
			cards: updateArrayAt(fromBlock.cards, from[1], toCard),
			id: fromBlock.id
		});
		const newBlockWithBothUpdated = new CurationStandardBlock({
			type: 'Standard',
			layout: newBlockWithFromCardUpdated.layout,
			autofill: newBlockWithFromCardUpdated.autofill || undefined,
			cards: updateArrayAt(newBlockWithFromCardUpdated.cards, to[1], fromCard),
			id: newBlockWithFromCardUpdated.id
		});
		const updatedBlockList = updateArrayAt(currentArray, from[0], newBlockWithBothUpdated);
		return update(state, updatedBlockList);
	}
}

function removeCard(state: EditState, pos: CardIndex): EditState {
	return updateCard(state, null, pos);
}

/**
 * Update a block without its cards being updated
 */
function updateBlock(state: EditState, blockIndex: number, newBlock: {|
	autofill?: Autofill | null,
	layout?: CurationBlockLayout,
	blockType: CurationBlockTypeString,
	unbranded?: boolean
|}): EditState  {
	const currentArray = state.editStack[state.undoPointer || 0];
	const currentBlock: CurationBlock = currentArray[blockIndex];
	const currentLayoutType: CurationBlockLayoutTypeString | null = currentBlock.type === 'Standard' ? currentBlock.layout.type : null;
	const currentBlockLength = getLayoutLength(currentBlock.type, currentLayoutType);
	const newBlockLayoutType = newBlock.layout ? newBlock.layout.type : null;
	const newBlockLength = getLayoutLength(newBlock.blockType, newBlockLayoutType);

	let newBlockAutofill: ?Autofill;

	if (newBlock.hasOwnProperty('autofill')) {
		newBlockAutofill = newBlock.autofill;
	} else if (!newBlock.hasOwnProperty('autofill') && currentBlock.type === 'Standard' && currentBlock.autofill) {
		newBlockAutofill = currentBlock.autofill;
	}

	let newBlockCards: Array<Card> = [];

	if (currentBlock.type !== 'Standard') {
		newBlockCards = new Array(newBlockLength).fill(null);
	} else if (currentBlock.type === 'Standard' && newBlock.blockType === 'Standard') {
		if (currentBlock.autofill && !newBlockAutofill) {
			newBlockCards = new Array(newBlockLength).fill(null);
		} else {
			newBlockCards = [
				...currentBlock.cards.slice(0, newBlockLength),
				...new Array(Math.max(newBlockLength - currentBlockLength, 0)).fill(null)
			];
		}
	}

	let newBlocksArray: Array<CurationBlock> = [];

	switch (newBlock.blockType) {
		case 'Standard': {
			const currentUnbranded = currentBlock.type === 'Standard' ? currentBlock.unbranded : undefined;
			const unbranded = newBlock.hasOwnProperty('unbranded') ? newBlock.unbranded : currentUnbranded;
			newBlocksArray = updateArrayAt(currentArray, blockIndex, new CurationStandardBlock({
				type: 'Standard',
				layout: newBlock.layout || (currentBlock.type === 'Standard' ? currentBlock.layout : { type: 'CompactHorizontalList' }),
				autofill: newBlockAutofill || undefined,
				cards: newBlockAutofill ? [] : newBlockCards,
				id: currentBlock.id,
				unbranded
			}));
			break;
		}
		case 'Video':
			newBlocksArray = updateArrayAt(currentArray, blockIndex, new CurationVideoBlock({id: currentBlock.id}));
			break;
		case 'Podcast':
			newBlocksArray = updateArrayAt(currentArray, blockIndex, new CurationPodcastBlock(currentBlock.id));
			break;
		case 'Ad':
			newBlocksArray = updateArrayAt(currentArray, blockIndex, new CurationAdBlock(currentBlock.id));
			break;
		default:
			(newBlock.blockType: empty);
			throw new Error('Selected blocktype is invalid');
	}

	return update(state, newBlocksArray);
}


/**
 * Move a block up or down one in the list
 */
function moveBlock(state: EditState, blockIndex: number, direction: 1 | -1): EditState {
	const currentArray = state.editStack[state.undoPointer || 0];
	// Don't update the stack on no-op
	if (blockIndex < 0 || blockIndex > currentArray.length - 1 ||
		(blockIndex === 0 && direction === -1) ||
		(blockIndex === currentArray.length - 1 && direction === 1)
	) {
		return state;
	}
	const blockToMove = currentArray[blockIndex];
	const neightborBlock = currentArray[blockIndex + direction];
	const newBlocksArray = updateArrayAt(
		updateArrayAt(currentArray, blockIndex + direction, blockToMove),
		blockIndex,
		neightborBlock
	);
	return update(state, newBlocksArray);
}

/**
 * Remove a block from the list
 */
function removeBlock(state: EditState, blockIndex: number): EditState {
	const currentArray = state.editStack[state.undoPointer || 0];
	return update(state, [...currentArray.slice(0, blockIndex), ...currentArray.slice(blockIndex + 1)]);
}

/**
 * Add a block to the beginning/end of the list
 */
function addBlock(state: EditState, block: CurationBlock, toEnd?: boolean): EditState {
	const currentArray = state.editStack[state.undoPointer || 0];
	const newArray = toEnd ? [...currentArray, block] : [block, ...currentArray];
	return update(state, newArray);
}

export {
	updateCard,
	swapCards,
	removeCard,
	moveBlock,
	removeBlock,
	addBlock,
	updateBlock
};