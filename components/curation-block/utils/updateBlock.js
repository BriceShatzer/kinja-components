// @flow

import { uniqBy } from 'lodash';

import Logger from 'kinja-magma/utils/logger';
import getCurationBlockData from 'kinja-magma/controllers/front-page/getCurationBlockData';
import { CurationStandardBlock, CurationVideoBlock, CurationPodcastBlock, CurationAdBlock } from 'kinja-magma/models/CurationBlock';

import type { Autofill, CurationBlock, CurationBlockLayout, CurationBlockTypeString } from 'kinja-magma/models/CurationBlock';
import type { AutofillResponse } from 'kinja-magma/controllers/front-page/getCurationBlockData';
import type { State, Action } from '../reducer';
import type { BlogId } from 'kinja-magma/models/Id';


export default function updateBlock({
	blockIndex,
	newBlock,
	blogId,
	state,
	dispatch,
	useVideoPlaylist,
	onError
}: {
	blockIndex: number,
	newBlock: {|
		autofill?: Autofill | null,
		layout?: CurationBlockLayout,
		blockType: CurationBlockTypeString,
		unbranded?: boolean
	|},
	blogId: BlogId,
	state: State,
	dispatch: Action => void,
	useVideoPlaylist: boolean,
	onError: string => void
}): Promise<?AutofillResponse> | void {
	if (!newBlock.autofill && newBlock.blockType !== 'Video') {
		dispatch({
			type: 'UpdateBlockAction',
			blockIndex,
			newBlock,
			newCache: state.cache
		});
		return;
	}

	dispatch({ type: 'BlockLoadingAction', isLoading: true, pos: blockIndex });

	const currentBlock = state.editStack[state.undoPointer || 0][blockIndex];
	const newCurationBlock = getNewCurationBlock(newBlock, currentBlock);

	return getCurationBlockData.resolveCurationBlocks([newCurationBlock], blogId, new Logger('magma:curation'), useVideoPlaylist)
		.then(response => {
			const newCache = {
				curationBlocks: response.curationBlocks ?
					uniqBy([...response.curationBlocks, ...state.cache.curationBlocks], 'id') : state.cache.curationBlocks,
				authors: response.authors ? {...state.cache.authors, ...response.authors} : state.cache.authors,
				videos: response.videos ? uniqBy([...response.videos, ...state.cache.videos], 'id') : state.cache.videos,
				postCategorization: response.postCategorization ?
					uniqBy([...response.postCategorization, ...state.cache.postCategorization], 'post') : state.cache.postCategorization,
				posts: response.posts ? uniqBy([...response.posts, ...state.cache.posts], 'id') : state.cache.posts,
				autofillIdsByBlock: response.autofillIdsByBlock ?
					{...state.cache.autofillIdsByBlock, ...response.autofillIdsByBlock} : state.cache.autofillIdsByBlock
			};

			dispatch({
				type: 'UpdateBlockAction',
				blockIndex,
				newBlock,
				newCache
			});

			dispatch({ type: 'BlockLoadingAction', isLoading: false, pos: blockIndex });
		}).catch(() => {
			dispatch({ type: 'BlockLoadingAction', isLoading: false, pos: blockIndex });
			onError('The posts cannot be loaded for this block. Please try again later.');
		});
}

function getNewCurationBlock(newBlock, currentBlock): CurationBlock {
	switch (newBlock.blockType) {
		case 'Standard':
			return new CurationStandardBlock({
				id: currentBlock.id,
				type: newBlock.blockType,
				layout: newBlock.layout || (currentBlock.type === 'Standard' ? currentBlock.layout : { type: 'SingleStory' }),
				autofill: newBlock.autofill || undefined,
				unbranded: newBlock.unbranded,
				cards: []
			});
		case 'Video':
			return new CurationVideoBlock({ id: currentBlock.id });
		case 'Podcast':
			return new CurationPodcastBlock(currentBlock.id);
		case 'Ad':
			return new CurationAdBlock(currentBlock.id);
		default:
			(newBlock.blockType: empty);
			throw new Error('Unexpected curation block type');
	}
}