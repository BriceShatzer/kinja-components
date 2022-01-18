/* @flow */

import * as React from 'react';
import {
	boolean,
	storiesOf,
	withDocs,
	withKnobs
} from 'base-storybook';
import styled from 'styled-components';

import RelatedStoriesController from './RelatedStoriesController';
import RelatedStories from './RelatedStories';
import README from './README.md';

import * as tagsuggestions from './stubs/tagsuggestions.json';
import * as storysuggestions from './stubs/storysuggestions.json';


const Container = styled.div`
	width: 636px;
	margin: 0 auto;
`;

const post1 = storysuggestions.data.items[0];

storiesOf('4. Components|Editor/Related Stories', module)
	.addDecorator(withDocs(README))
	.addDecorator(withKnobs)
	.add('Controller Mode', () => {
		const externalAPI = {
			resolveItem: () => Promise.resolve(post1),
			returnValidModel: () => post1,
			tagSuggestions: () => Promise.resolve(tagsuggestions),
			storySuggestions: () => Promise.resolve(storysuggestions),
			onStoryGridUpdated: ()=>Promise.resolve()
		};

		return (
			<Container>
				<RelatedStoriesController externalAPI={externalAPI}  stories={[]}/>
			</Container>
		);
	})
	.add('Static Mode', () => {
		const isStatic = boolean('Static rendering', true);
		return (
			<Container>
				<RelatedStories isStatic={isStatic} stories={storysuggestions.data.items} />
			</Container>
		);
	});
