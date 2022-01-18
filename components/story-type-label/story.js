/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	boolean,
	text
} from 'base-storybook';
import StoryTypeLabel from './story-type-label';
import Theme from '../theme';
import { blogThemes as Themes } from '../theme/themes';
import README from './README.md';

storiesOf('3. Elements|Post Elements/Story Type Label', module)
	.addDecorator(withDocs(README))
	.add('Story Type Label', () => (
		<div style={{ display: 'flex' }}>
			{Object.keys(Themes).map(blog => (
				<Theme blog={blog} key={blog}>
					<div>
						<p>{blog}</p>
						<StoryTypeLabel
							featured={boolean('Featured', false)}
							outlined={boolean('Outlined', true)}
							tall={boolean('Tall', true)}
							tag={text('Tag', 'Reviews')}
						/>
					</div>
				</Theme>
			))}
		</div>
	));
