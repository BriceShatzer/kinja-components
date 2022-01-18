/* @flow */

import * as React from 'react';
import {
	storiesOf,
	select,
	boolean,
	withDocs
} from 'base-storybook';

import { Theme } from '../theme';
import { blogThemes } from '../theme/themes';

import {
	Page,
	Main
} from '../page-layout';

import StoryTypeBox from './story-type-box';
import { componentStates } from './__fixtures__/componentStates';
import README from './README.md';

const wrap = component => (
	<Page featured={false}>
		<Main>
			{component}
		</Main>
	</Page>
);

const stories = storiesOf('4. Components|Post Body/Story Type Box', module)
	.addDecorator(withDocs(README));

Object.keys(componentStates).forEach(key => {
	stories.add(componentStates[key].name, () => {

		const selectedBlog = select('Blog', Object.keys(blogThemes), 'default');
		const wrapComponent = boolean('Wrapped in layout components', true);

		const storyTypeBox = <StoryTypeBox {...componentStates[key].props} />;

		return (
			<Theme blog={selectedBlog}>
				{wrapComponent ? wrap(storyTypeBox) : storyTypeBox}
			</Theme>
		);

	});
});
