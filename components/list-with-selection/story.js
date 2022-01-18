/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	withDocs,
	action,
	boolean,
	number
} from 'base-storybook';
import ListWithSelection from './list-with-selection';
import sampleData from './sample-data.story.js';
import README from './README.md';

const StoryWrap = styled.div`
	ul {
		max-width: 400px;
	}
`;

const items = sampleData.map(name => (<div key={name}>{name}</div>));

storiesOf('3. Elements|Form/Select', module)
	.addDecorator(withDocs(README))
	.add('List With Selection', () => (
		<StoryWrap>
			<p>Click inside the story area to ensure the component has focus.</p>
			<ListWithSelection
				onSelect={action('Selected')}
				allowNavigation={boolean('Keyboard events', true)}
				height={number('Height', 300)}
			>
				{items}
			</ListWithSelection>
		</StoryWrap>
	));
