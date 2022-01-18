/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import Carousel from './carousel';
import README from './README.md';
import posts from 'kinja-components/__stubs__/postObjects.json';

storiesOf('4. Components|Carousel', module)
	.addDecorator(withDocs(README))
	.add('Post Carousel', () => (
		<div style={{ maxWidth: '1080px', height: '180px', margin: '0 auto' }}>
			<Carousel posts={posts.items.slice(0, 15)} />
		</div>
	));
