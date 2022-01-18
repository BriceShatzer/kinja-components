// @flow

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action,
	boolean
} from 'base-storybook';

import VideoSearchResult from 'kinja-magma/models/VideoSearchResult';
import {
	VideoSearchItem
} from './';
import VideoSearch from './';
import Theme from '../theme';
import README from './README.md';
import videoSearchResults from './__fixtures__/index.json';

storiesOf('4. Components|Video search', module)
	.addDecorator(withDocs(README))
	.add('Video search item', () => {
		const item = VideoSearchResult.fromJSON(videoSearchResults[1]);

		return (
			<Theme>
				<VideoSearchItem
					item={item}
					onClick={action('clicked on item')}
				/>
			</Theme>
		);
	})
	.add('Video search', () => {
		const items = videoSearchResults.map(r => VideoSearchResult.fromJSON(r));
		const isLoading = boolean('Is loading?', false);
		const hasResults = boolean('Has results?', true);

		return (
			<Theme>
				<VideoSearch
					items={hasResults ? items : []}
					onItemClick={action('clicked on item')}
					onSearchForVideos={action('search for videos')}
					isLoading={isLoading}
				/>
			</Theme>
		);
	});
