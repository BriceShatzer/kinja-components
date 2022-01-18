// @flow

import dataStore from '../data-store';
import type { CardIndex } from '../undo-stack';
import type { ResolvedCurationBlockList } from 'kinja-magma/controllers/front-page/getCurationBlockData';
import type { Action } from '../reducer';
import type { PostId } from 'kinja-magma/models/Id';
import isValidUrl from './isValidUrl';


// adds a post when a valid kinja url is typed into en empty card
export default function addPost({
	pos,
	url,
	cache,
	dispatch,
	ga
}: {
	pos: CardIndex,
	url: string,
	cache: ResolvedCurationBlockList,
	dispatch: Action => void,
	ga: (...Array<mixed>) => void
}): Promise<?[PostId, ResolvedCurationBlockList]> | void {
	if (!isValidUrl(url)) {
		dispatch({ type: 'CardErrorAction', pos, error: 'Invalid url' });
	} else {
		dispatch({ type: 'CardErrorAction', pos, error: null });
	}
	dispatch({ type: 'CardLoadingAction', pos, isLoading: true });

	return dataStore.getDataForUrl(cache, url).then((response: ?[PostId, ResolvedCurationBlockList]) => {
		if (!response) {
			dispatch({ type: 'CardLoadingAction', pos, isLoading: false });
			dispatch({ type: 'CardErrorAction', pos, error: 'Only valid kinja urls are allowed.' });
			return;
		}
		const [postId, newCache] = response;
		dispatch({ type: 'CardLoadingAction', pos, isLoading: false });
		dispatch({
			type: 'AddPostAction',
			pos,
			postId,
			newCache
		});
		ga('Curation Tools', 'Curation Module - Add Article');
	}).catch(err => {
		console.error('error', err);
		dispatch({ type: 'CardLoadingAction', pos, isLoading: false });
		dispatch({ type: 'CardErrorAction', pos, error: 'An unexpected error happened.' });
	});
}
