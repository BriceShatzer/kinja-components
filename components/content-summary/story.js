/* @flow */

import * as React from 'react';
import {
	storiesOf,
	boolean,
	withDocs,
	blogGroup
} from 'base-storybook';
import { Theme } from '../theme';
import { componentStates } from './__fixtures__/componentStates';
import {
	Page,
	Main
} from '../page-layout';
import ContentSummary from './content-summary';
import README from './README.md';

const wrap = component => (
	<Page featured={false}>
		<Main>
			{component}
		</Main>
	</Page>
);

const stories = storiesOf('4. Components|Post Body/Content Summary', module)
	.addDecorator(withDocs(README));

Object.keys(componentStates).forEach(key => {
	stories.add(componentStates[key].name, () => {
		const wrapComponent = boolean('Wrapped in layout components', false);
		const summary = <ContentSummary {...componentStates[key].props} hideNavigation={boolean('hide navigation element', false)}/>;
		return (
			<Theme blog={blogGroup()}>
				{wrapComponent ? wrap(summary) : summary}
			</Theme>
		);
	});
});
