// @flow

import type { CurationBlockLayoutTypeString, CurationBlockTypeString, CurationBlockLayout } from 'kinja-magma/models/CurationBlock';

export function getLayoutLength(blockType: CurationBlockTypeString, layoutType: CurationBlockLayoutTypeString | null) {
	switch (blockType) {
		case 'Video': return 4;
		case 'Standard':
			switch (layoutType) {
				case 'SingleStory': return 1;
				case 'FeaturedStory': return 1;
				case 'HorizontalList': return 4;
				case 'CompactHorizontalList': return 4;
				case 'ThreeCardHorizontalList': return 3;
				case 'FourCardModular': return 4;
				case 'FiveCardModular': return 5;
				case 'FiveCardTwoColumn': return 5;
				case 'EightCardModular': return 8;
				case 'SixCardGrid': return 6;
				case 'SixCardModularWithLatest': return 13;
				case null: return 4;
				default:
					(layoutType: empty);
					throw new Error('Invalid CurationStandardBlock layout type');
			}
		case 'Podcast':
		case 'Ad':
			return 1;
		default:
			(blockType: empty);
			throw new Error('Invalid CurationBlock type');
	}
}

export function getBlockTypeByLayout(layoutType: CurationBlockLayoutTypeString | CurationBlockTypeString) {
	switch (layoutType) {
		case 'SingleStory':
		case 'FeaturedStory':
		case 'HorizontalList':
		case 'CompactHorizontalList':
		case 'ThreeCardHorizontalList':
		case 'FourCardModular':
		case 'FiveCardModular':
		case 'FiveCardTwoColumn':
		case 'EightCardModular':
		case 'SixCardGrid':
		case 'SixCardModularWithLatest':
		case 'Standard': return 'Standard';
		case 'Video': return 'Video';
		case 'Ad': return 'Ad';
		case 'Podcast': return 'Podcast';
		default:
			(layoutType: empty);
			throw new Error('Invalid CurationStandardBlock layout type');
	}
}

export function getLayoutByType(layoutType: CurationBlockLayoutTypeString | CurationBlockTypeString): CurationBlockLayout | null {
	switch (layoutType) {
		case 'SingleStory': return { type: 'SingleStory' };
		case 'FeaturedStory': return { type: 'FeaturedStory' };
		case 'HorizontalList': return { type: 'HorizontalList' };
		case 'CompactHorizontalList': return { type: 'CompactHorizontalList' };
		case 'ThreeCardHorizontalList': return { type: 'ThreeCardHorizontalList' };
		case 'FourCardModular': return { type: 'FourCardModular' };
		case 'FiveCardModular': return { type: 'FiveCardModular' };
		case 'FiveCardTwoColumn': return { type: 'FiveCardTwoColumn' };
		case 'SixCardModularWithLatest': return { type: 'SixCardModularWithLatest' };
		case 'EightCardModular': return { type: 'EightCardModular' };
		case 'SixCardGrid': return { type: 'SixCardGrid' };
		case 'Standard':
		case 'Video':
		case 'Ad':
		case 'Podcast': return null;
		default:
			(layoutType: empty);
			throw new Error('Invalid CurationStandardBlock layout type');
	}
}