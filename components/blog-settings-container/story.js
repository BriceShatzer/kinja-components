/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import BlogSettingsContainer from './blog-settings-container';
import README from './README.md';

storiesOf('4. Components|Form/Blog Settings Container', module)
	.addDecorator(withDocs(README))
	.add('BlogSettingsContainer', () => (
		<div style={{ width: 800 }}>
			<BlogSettingsContainer
				blogProperties={[]}
				profileApi={{
					createBlogProperty: () =>
						Promise.resolve({
							key: 'hideViewCounts',
							value: true,
							id: 1,
							blogId: 1
						}),
					updateBlogProperty: () =>
						Promise.resolve({
							key: 'hideViewCounts',
							value: true,
							id: 1,
							blogId: 1
						}),
					getBlogProperties: () => Promise.resolve([])
				}}
				currentBlogId={0}
			/>
		</div>
	));
