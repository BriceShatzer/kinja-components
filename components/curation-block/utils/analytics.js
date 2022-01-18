// @flow
import type { CurationBlockLayoutTypeString } from 'kinja-magma/models/CurationBlock';

const getEventData = (layoutType: CurationBlockLayoutTypeString) => {
	switch (layoutType) {
		case 'FeaturedStory':
			return {
				action: 'Classic Module',
				totalCards: 1
			};
		case 'SingleStory':
			return {
				action: 'Classic Module',
				totalCards: 1
			};
		case 'CompactHorizontalList':
			return {
				action: 'Ticker',
				totalCards: 4
			};
		case 'HorizontalList':
			return {
				action: 'Classic Module',
				totalCards: 4
			};
		case 'ThreeCardHorizontalList':
			return {
				action: 'Classic Module',
				totalCards: 3
			};
		case 'SixCardGrid':
			return {
				action: 'Classic Module',
				totalCards: 6
			};
		case 'FourCardModular':
			return {
				action: 'Modular Curation',
				totalCards: 4
			};
		case 'FiveCardModular':
			return {
				action: 'Modular Curation',
				totalCards: 5
			};
		case 'FiveCardTwoColumn':
			return {
				action: 'Modular Curation',
				totalCards: 5
			};
		case 'EightCardModular':
			return {
				action: 'Modular Curation',
				totalCards: 8
			};
		case 'SixCardModularWithLatest':
			return {
				action: 'Modular Curation',
				totalCards: 13
			};
		default:
			(layoutType: empty);
			throw new Error('Unknown CurationStandardBlock layout type');
	}
};

const getEventAction = (
	blockLayoutType: CurationBlockLayoutTypeString,
	blockIndex: number,
	cardIndex: number,
	clickType: string = 'Story'
) => {
	const eventData = getEventData(blockLayoutType);
	const totalCards = eventData.totalCards || '';

	return `${eventData.action} ${clickType} Click - slot ${blockIndex + 1} - story ${cardIndex + 1} of ${totalCards}`;
};

export default getEventAction;
