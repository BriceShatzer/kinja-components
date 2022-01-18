// @flow

import AmpAdSlot from './amp-ad-slot';

import type TypedTagData from 'kinja-magma/models/TypedTagData';
import type StoryType from 'kinja-magma/models/StoryType';

export const slotNameFromBlogSalesMeta = ({
	adNetworkId,
	adSiteName,
	adZone
}: {
	adNetworkId?: ?number,
	adSiteName?: ?string,
	adZone?: string
}) => {
	return `/${adNetworkId || ''}/${adSiteName || ''}.amp${adZone === 'partners' ? '/partners' : ''}`;
};

export const makeAdJson = ({
	postId,
	storyType,
	categoryData,
	subcategoryData,
	tags,
	pos,
	adZone
}: {
	postId?: string,
	storyType?: ?StoryType,
	categoryData?: ?TypedTagData,
	subcategoryData?: ?TypedTagData,
	tags?: ?Array<string>,
	pos: number,
	adZone?: string
}) => {
	return {
		targeting: {
			page: 'amp',
			postId,
			pos: `amp_${pos}`,
			tags,
			category: [
				...(storyType ? [storyType.canonical] : []),
				...(categoryData ? [categoryData.canonicalName] : []),
				...(subcategoryData ? [subcategoryData.canonicalName] : [])
			],
			forcedAdZone: adZone || ''
		}
	};
};

export const makeAmpJson = (ampId: ?string, ampCid: ?string) => {
	return {
		vendors: {
			indexexchange: {SITE_ID: ampId},
			medianet: {CID: ampCid}
		}
	};
};

export default AmpAdSlot;
