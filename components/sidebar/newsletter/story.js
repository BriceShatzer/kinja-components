// @flow

import React from 'react';
import {
	storiesOf,
	withDocs,
	select
} from 'base-storybook';
import { blogThemes } from 'kinja-components/components/theme/themes';
import NewsletterPromoModule from './';
import Blog from 'kinja-magma/models/Blog';
import gizmodoJSON from 'kinja-components/__stubs__/gizmodo.json';
import README from './README.md';


storiesOf('4. Components|Post Promotion/Sidebar', module)
	.addDecorator(withDocs(README))
	.add('Newsletter', () => {
		const json = gizmodoJSON;
		const displayNames = {
			avclub: 'AV Club',
			clickhole: 'ClickHole',
			deadspin: 'Deadspin',
			earther: 'Earther',
			gizmodo: 'Gizmodo',
			jalopnik: 'Jalopnik',
			jezebel: 'Jezebel',
			kinjadeals: 'Kinja Deals',
			kotaku: 'Kotaku',
			lifehacker: 'Lifehacker',
			patriothole: 'PatriotHole',
			splinter: 'Splinter',
			theinventory: 'The Inventory',
			theroot: 'The Root',
			theonion: 'The Onion',
			thetakeout: 'The Takeout',
			default: 'Kinja'
		};

		const blog = select('Blog', Object.keys(blogThemes), 'gizmodo');

		json.name =  blog;
		json.displayName = displayNames[blog];
		json.properties.blogGroup = blog;

		return (
			<div style={{ width: '410px' }}>
				<NewsletterPromoModule
					blog={Blog.fromJSON(json)}
				/>
			</div>
		);
	});
