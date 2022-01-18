// @flow
import * as React from 'react';
import type { CardIndex } from './undo-stack';
import type { Action, EditMode } from './reducer';
import type { Autofill, CurationBlockLayout, CurationBlockTypeString, CurationBlock, Card } from 'kinja-magma/models/CurationBlock';

export type Context = {|
	dispatch: Action => void,
	addPost: (pos: CardIndex, url: string) => void,
	updateBlock: (
		blockIndex: number,
		newBlock: {|
			autofill?: Autofill | null,
			layout?: CurationBlockLayout,
			blockType: CurationBlockTypeString,
			unbranded?: boolean
		|}) => void,
	selectedCardIndex: ?CardIndex,
	selectedCard: ?Card,
	selectedCardsBlock: ?CurationBlock,
	selectedBlockIndex: ?number,
	selectedBlock: ?CurationBlock,
	editMode: ?EditMode,
	cardErrors: { [CardIndex]: ?string },
	loadingCards: Array<CardIndex>,
	loadingBlocks: Array<number>,
	numberOfBlocks: number
|}

const CuratedHomepageEditorContext = React.createContext<Context>({
	dispatch: () => undefined,
	addPost: () => undefined,
	updateBlock: () => undefined,
	selectedCardIndex: null,
	selectedCard: null,
	selectedCardsBlock: null,
	selectedBlockIndex: null,
	selectedBlock: null,
	editMode: null,
	cardErrors: {},
	loadingCards: [],
	loadingBlocks: [],
	numberOfBlocks: 0
});

const { Provider, Consumer } = CuratedHomepageEditorContext;

export default CuratedHomepageEditorContext;

export {
	Consumer,
	Provider
};