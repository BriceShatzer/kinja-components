/* @flow */

import { chunk } from 'lodash';
import * as React from 'react';
import {
	boolean,
	storiesOf,
	withDocs,
	withKnobs
} from 'base-storybook';

import RelatedStoryItem from './relatedStoryItem';
import ManualStoryItem from './manualStoryItem';
import RelatedStoryList from './relatedStoryList';
import README from './README.md';

import * as strorysuggestions from './../stubs/storysuggestions.json';

storiesOf('4. Components|Editor/Related Stories/Stories', module)
	.addDecorator(withDocs(README))
	.addDecorator(withKnobs)
	.add('Editable Story Item', () => {
		return (
			<div className="meta-container">
				<ManualStoryItem />
			</div>
		);
	})
	.add('Story Item', () => {
		const post = [].concat(strorysuggestions.data.items)[0];
		return (
			<div className="meta-container">
				<RelatedStoryItem post={ post } />
			</div>
		);
	})
	.add('Story List With Controls', () => {
		const getStoryRows = () => {
			const storyList = strorysuggestions.data.items;
			const renderlist = storyList.slice(0, 9);
			return chunk(renderlist, 3);
		};

		const filled = boolean('Prefilled', true);
		const ctrls = boolean('With controls', false);
		const StoryListProps = {
			stories: getStoryRows(),
			view: filled ? 'search' : 'manual',
			withControls: ctrls
		};
		return (
			<div className="meta-container">
				<RelatedStoryList {...StoryListProps} />
			</div>
		);
	});

