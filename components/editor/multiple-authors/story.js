/* @flow */

import * as React from 'react';
import {
	action,
	boolean,
	storiesOf,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';

import MultipleAuthors from './MultipleAuthors';
import README from './README.md';
import sampleData from './sample-data.story.js';


const Container = styled.div`
	width: 600px;
`;

storiesOf('4. Components|Editor/Multiple Authors', module)
	.addDecorator(withDocs(README))
	.add('Multiple Authors', () => {
		const user = [sampleData[Math.floor(Math.random() * sampleData.length)]];

		return (
			<Container>
				<MultipleAuthors
					authors={user}
					authorsList={sampleData}
					autofocus
					onChange={action('Change')}
					onClose={action('Close')}
					passive={boolean('Passive', false)}
				/>
			</Container>
		);
	});
