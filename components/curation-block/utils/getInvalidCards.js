// @flow

import type { CurationBlock, Card } from 'kinja-magma/models/CurationBlock';
import type { CardIndex } from '../undo-stack';

/**
 * Helper for determinign which cards are invalid in a list of curation blocks
 */
export default function getInvalidCards(blocks: Array<CurationBlock>): Array<CardIndex> {
	const invalidCards: Array<CardIndex> = [];

	blocks.forEach((block, blockIndex) => {
		if (block.type === 'Standard' && !block.autofill) {
			(block.cards: Array<Card>).forEach((card, cardIndex) => {
				if (card === null) {
					invalidCards.push([blockIndex, cardIndex]);
				}
			});
		}
	});

	return invalidCards;
}