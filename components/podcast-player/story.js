// @flow
import * as React from 'react';
import { storiesOf, withDocs } from 'base-storybook';
import README from './README.md';
import PodcastPlayer from './podcast-player';

storiesOf('4. Components|Podcast Player', module)
	.addDecorator(withDocs(README))
	.add('Podcast Player', () => (
		<div
			style={{
				maxWidth: '1080px',
				height: '180px',
				marginTop: '100px',
				width: '800px'
			}}
		>
			<PodcastPlayer podcastId='SONY6345768755' />
		</div>
	));
