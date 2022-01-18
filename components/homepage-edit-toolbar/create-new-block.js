// @flow

import type { LayoutString } from './layout-selector';
import { type CurationBlock, CurationVideoBlock, CurationStandardBlock, CurationPodcastBlock, CurationAdBlock } from 'kinja-magma/models/CurationBlock';

export default function createNewBlock(layoutString: LayoutString): CurationBlock {
	switch (layoutString) {
		case 'Video':
			return new CurationVideoBlock({});
		case 'Podcast':
			return new CurationPodcastBlock();
		case 'Ad':
			return new CurationAdBlock();
		case 'Standard':
			// Should not be present in dropdown
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'FiveCardModular'
				},
				cards: new Array(5).fill(null)
			});
		case 'SingleStory':
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'SingleStory'
				},
				cards: Array(1).fill(null)
			});
		case 'FeaturedStory':
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'FeaturedStory'
				},
				cards: Array(1).fill(null)
			});
		case 'EightCardModular':
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'EightCardModular'
				},
				cards: Array(8).fill(null)
			});
		case 'SixCardModularWithLatest':
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'SixCardModularWithLatest'
				},
				cards: Array(13).fill(null)
			});
		case 'FiveCardModular':
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'FiveCardModular'
				},
				cards: Array(5).fill(null)
			});
		case 'FiveCardTwoColumn':
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'FiveCardTwoColumn'
				},
				cards: Array(5).fill(null)
			});
		case 'FourCardModular':
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'FourCardModular'
				},
				cards: Array(4).fill(null)
			});
		case 'SixCardGrid':
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'SixCardGrid'
				},
				cards: Array(6).fill(null)
			});
		case 'HorizontalList':
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'HorizontalList'
				},
				cards: Array(4).fill(null)
			});
		case 'CompactHorizontalList':
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'CompactHorizontalList'
				},
				cards: Array(4).fill(null)
			});
		case 'ThreeCardHorizontalList':
			return new CurationStandardBlock({
				type: 'Standard',
				layout: {
					type: 'ThreeCardHorizontalList'
				},
				cards: Array(3).fill(null)
			});

		default:
			(layoutString: empty);
			throw new Error(
				'Unknown CurationBlock or CurationStandardBlockLayout type'
			);
	}
}