/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';

import TagList from './tagList';
import StoryTypeList from './storyTypeList';
import FilterList from './filterList';
import tagsuggestions from './../stubs/tagsuggestions.json';
import README from './README.md';

const relevantTags = tagsuggestions.data.relevantTags;
const relatedTags = tagsuggestions.data.relatedTags;

const TagListProps = {
	items: relevantTags.concat(relatedTags)
};

const StoryListProps = {
	items: tagsuggestions.data.storyTypes
};

const FilterListProps = {
	items: [
		{title: 'Car', canonical: '1521', type: 'tag'},
		{title: 'Crash', canonical: '234', type: 'tag'},
		{title: 'Bikes', canonical: '456', type: 'storytype'},
		{title: 'People', canonical: '1239', type: 'storytype'}
	]
};

storiesOf('4. Components|Editor/Related Stories/Filters', module)
	.addDecorator(withDocs(README))
	.add('Tags', () => {
		return (
			<div className="meta-container">
				<TagList {...TagListProps} />
			</div>
		);
	})
	.add('Story Types', () => {
		return (
			<div className="meta-container">
				<StoryTypeList {...StoryListProps} />
			</div>
		);
	})
	.add('Selected Filters', () => {
		return (
			<div className="meta-container">
				<FilterList {...FilterListProps} />
			</div>
		);
	});
