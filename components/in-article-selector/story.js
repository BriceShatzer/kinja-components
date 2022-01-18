// @flow

import * as React from 'react';
import {
	storiesOf,
	action
} from 'base-storybook';

import videoSearchResults from '../video-search/__fixtures__/index.json';
import InArticleSelector from './';
import Theme from '../theme';
import VideoSearchResult from 'kinja-magma/models/VideoSearchResult';

storiesOf('4. Components|In article selector', module)
	.add('In article selector', () => {
		const items = videoSearchResults.map(r => VideoSearchResult.fromJSON(r));

		const videoSearch = () => Promise.resolve(items);

		return (
			<Theme>
				<InArticleSelector
					videoSearch={videoSearch}
					onClose={action('closed modal')}
					onVideoSelected={action('selected video:')}
				/>
			</Theme>
		);
	});
