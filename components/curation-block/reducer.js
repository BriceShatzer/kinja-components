// @flow
import type { CurationBlock, CurationBlockLayout, Autofill, CurationBlockTypeString } from 'kinja-magma/models/CurationBlock';
import CurationHeartbeat from 'kinja-magma/models/CurationHeartbeat';
import type { ResolvedCurationBlockList } from 'kinja-magma/controllers/front-page/getCurationBlockData';
import { type CardIndex, removeCard, updateCard, moveBlock, removeBlock, addBlock, updateBlock, swapCards } from './undo-stack';
import type { PostId } from 'kinja-magma/models/Id';
import type { InlineNode } from 'postbody/InlineNode';
import type { SimpleImageJSON } from 'kinja-magma/models/SimpleImage';
import { type ConcurrentEditWarningType } from './utils/shouldShowWarning';

type UndoAction = {|
	type: 'UndoAction'
|}

type RedoAction = {|
	type: 'RedoAction'
|}

type SelectCardAction = {|
	type: 'SelectCardAction',
	pos: CardIndex
|}

type SelectBlockAction = {|
	type: 'SelectBlockAction',
	index: number
|}

type RemoveSelectedCardAction = {|
	type: 'RemoveSelectedCardAction'
|}

type AddPostAction = {|
	type: 'AddPostAction',
	pos: CardIndex,
	postId: PostId,
	newCache: ResolvedCurationBlockList
|}

type UpdateCardAction = {|
	type: 'UpdateCardAction',
	pos: CardIndex,
	update: {
		customHeadline?: ?Array<InlineNode>,
		customExcerpt?: ?Array<InlineNode>,
		customThumbnail?: ?SimpleImageJSON
	}
|}

type CardErrorAction = {|
	type: 'CardErrorAction',
	pos: CardIndex,
	error: ?string
|}

type CardLoadingAction = {|
	type: 'CardLoadingAction',
	pos: CardIndex,
	isLoading: boolean
|}

type BlockLoadingAction = {|
	type: 'BlockLoadingAction',
	pos: number,
	isLoading: boolean
|}

type MoveSelectedBlockAction = {|
	type: 'MoveSelectedBlockAction',
	direction: 'UP' | 'DOWN'
|}

type RemoveSelectedBlockAction = {|
	type: 'RemoveSelectedBlockAction',
|}

type AddBlockAction = {|
	type: 'AddBlockAction',
	block: CurationBlock,
	toEnd?: boolean
|}

type UpdateBlockAction = {|
	type: 'UpdateBlockAction',
	blockIndex: number,
	newBlock: {|
		autofill?: Autofill | null,
		layout?: CurationBlockLayout,
		blockType: CurationBlockTypeString,
		unbranded?: boolean
	|},
	newCache: ResolvedCurationBlockList
|}

type EnterBlockModeAction = {|
	type: 'EnterBlockModeAction'
|}

type EnterCardModeAction = {|
	type: 'EnterCardModeAction'
|}

type SwapCardsAction = {|
	type: 'SwapCardsAction',
	to: CardIndex
|}

type CardDragStartAction = {|
	type: 'CardDragStartAction'
|}

type CardDragEndAction = {|
	type: 'CardDragEndAction'
|}

type UpdateHeartbeatDataAction = {|
	type: 'UpdateHeartbeatDataAction',
	data: CurationHeartbeat
|}

type UpdateLastEditTimestamp = {|
	type: 'UpdateLastEditTimestamp'
|}

type UpdateClosedConcurrentEditingWarningLevel = {|
	type: 'UpdateClosedConcurrentEditingWarningLevel',
	data: ConcurrentEditWarningType | null
|}

export type EditMode = 'CardEditing' | 'BlockEditing';

export type Action =
	UpdateLastEditTimestamp	|
	UndoAction |
	RedoAction |
	SelectCardAction |
	SelectBlockAction |
	RemoveSelectedCardAction |
	AddPostAction |
	CardErrorAction |
	UpdateCardAction |
	CardLoadingAction |
	MoveSelectedBlockAction |
	RemoveSelectedBlockAction |
	AddBlockAction |
	UpdateBlockAction |
	EnterBlockModeAction |
	EnterCardModeAction |
	BlockLoadingAction |
	SwapCardsAction |
	CardDragStartAction |
	CardDragEndAction |
	UpdateHeartbeatDataAction |
	UpdateClosedConcurrentEditingWarningLevel

export type State = {|
	editStack: Array<Array<CurationBlock>>, // head is the current state
	undoPointer: number | null, // If we're on the top of the edit stack, this is null. Otherwise, if undo was used, this points to the edit stack
	selectedCardIndex: ?CardIndex,
	selectedBlockIndex: ?number,
	cache: ResolvedCurationBlockList,
	cardErrors: { [CardIndex]: ?string },
	loadingCards: Array<CardIndex>,
	loadingBlocks: Array<number>,
	editMode: EditMode,
	cardIsDragging: boolean,
	lastEditActionTimestamp: number | null,
	heartbeatData?: CurationHeartbeat | null,
	closedConcurrentEditingWarningLevel: ConcurrentEditWarningType | null
|}

export default function curatedHomepageEditorReducer(state: State, action: Action): State {
	switch (action.type) {
		case 'UpdateLastEditTimestamp':
			return {
				...state,
				lastEditActionTimestamp: Date.now()
			};
		case 'UndoAction':
			return {
				...state,
				undoPointer: Math.min(state.undoPointer + 1, state.editStack.length - 1)
			};
		case 'RedoAction':
			return {
				...state,
				undoPointer: state.undoPointer === 1 || state.undoPointer === null ? null : state.undoPointer - 1
			};
		case 'SelectCardAction':
			return {
				...state,
				selectedCardIndex: action.pos
			};
		case 'SelectBlockAction':
			return {
				...state,
				selectedBlockIndex: action.index
			};
		case 'RemoveSelectedCardAction':
			if (!state.selectedCardIndex) {
				return state;
			}
			return {
				...state,
				...removeCard({
					editStack: state.editStack,
					undoPointer: state.undoPointer
				}, state.selectedCardIndex)
			};
		case 'AddPostAction':
			return {
				...state,
				...updateCard({
					editStack: state.editStack,
					undoPointer: state.undoPointer
				}, { postId: action.postId}, action.pos),
				cache: action.newCache
			};
		case 'UpdateCardAction': {
			const editState = state.editStack[state.undoPointer || 0];
			const block = editState[action.pos[0]];
			if (block.type !== 'Standard') {
				throw new Error('Trying to change card in non-standard block');
			}
			const card = block.cards[action.pos[1]];

			if (!card) {
				throw new Error('Trying to change empty card');
			}
			return {
				...state,
				...updateCard({
					editStack: state.editStack,
					undoPointer: state.undoPointer
				}, {
					...card,
					...action.update
				}, action.pos)
			};
		}
		case 'CardErrorAction': {
			const { pos, error } = action;
			return {
				...state,
				cardErrors: {
					...state.cardErrors,
					[pos]: error
				}
			};
		}
		case 'CardLoadingAction': {
			return {
				...state,
				loadingCards: action.isLoading ? [...state.loadingCards, action.pos] :
					state.loadingCards.filter(card => !(card[0] === action.pos[0] && card[1] === action.pos[1]))
			};
		}
		case 'BlockLoadingAction': {
			return {
				...state,
				loadingBlocks: action.isLoading ? [...state.loadingBlocks, action.pos] :
					state.loadingBlocks.filter(block => block !== action.pos)
			};
		}
		case 'MoveSelectedBlockAction': {
			if (state.selectedBlockIndex === null || typeof state.selectedBlockIndex === 'undefined') {
				return state;
			}
			const modifier = action.direction === 'UP' ? -1 : 1;
			return {
				...state,
				...moveBlock({
					editStack: state.editStack,
					undoPointer: state.undoPointer
				}, state.selectedBlockIndex, modifier),
				selectedBlockIndex: state.selectedBlockIndex + modifier
			};
		}
		case 'RemoveSelectedBlockAction': {
			if (state.selectedBlockIndex === null || typeof state.selectedBlockIndex === 'undefined') {
				return state;
			}
			return {
				...state,
				...removeBlock({
					editStack: state.editStack,
					undoPointer: state.undoPointer
				}, state.selectedBlockIndex)
			};
		}
		case 'AddBlockAction': {
			return {
				...state,
				...addBlock({
					editStack: state.editStack,
					undoPointer: state.undoPointer
				}, action.block, action.toEnd)
			};
		}
		case 'UpdateBlockAction': {
			return {
				...state,
				...updateBlock({
					editStack: state.editStack,
					undoPointer: state.undoPointer
				}, action.blockIndex, action.newBlock),
				cache: action.newCache
			};
		}
		case 'EnterCardModeAction': {
			return {
				...state,
				editMode: 'CardEditing',
				selectedCardIndex: null,
				selectedBlockIndex: null
			};
		}
		case 'EnterBlockModeAction': {
			return {
				...state,
				editMode: 'BlockEditing',
				selectedCardIndex: null,
				selectedBlockIndex: null
			};
		}
		case 'SwapCardsAction': {
			return state.selectedCardIndex ? {
				...state,
				...swapCards({
					editStack: state.editStack,
					undoPointer: state.undoPointer
				}, state.selectedCardIndex, action.to),
				selectedCardIndex: action.to
			} : state;
		}
		case 'CardDragStartAction':
			return {
				...state,
				cardIsDragging: true
			};
		case 'CardDragEndAction':
			return {
				...state,
				cardIsDragging: false
			};
		case 'UpdateHeartbeatDataAction':
			return {
				...state,
				heartbeatData: action.data
			};
		case 'UpdateClosedConcurrentEditingWarningLevel':
			return {
				...state,
				closedConcurrentEditingWarningLevel: action.data
			};
		default:
			(action.type: empty);
			throw new Error('Unexpected action in reducer');

	}
}