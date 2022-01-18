/* eslint no-new-func:0 */
import React from 'react';
import {
	storiesOf,
	withDocs,
	text,
	blogGroup
} from 'base-storybook';
import README from './README.md';
import  NetworkTile from './network-tile';

storiesOf('4. Components|Navigation/Header/Elements', module)
	.add('Network Tile',
		withDocs(README, () => {
			const selectedSite = blogGroup('site','gizmodo');
			const taglineText = text('Tagline Text', 'Lorem ipsum dolor sit amet.');
			return (
				<NetworkTile blogName={selectedSite} tagline={taglineText} />
			);
		})
	);
