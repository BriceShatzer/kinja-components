/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../../../theme';
import media from 'kinja-components/style-utils/media';

import type { FauxPost } from './../types';
import type Post from 'kinja-magma/models/Post';
import RelatedStoryItem from './relatedStoryItem';
import ManualStoryItem from './manualStoryItem';
import StoryRowControls from './storyRowControls';
import { Views } from './../consts';

type Props = {
	stories: Array<Post | FauxPost>,
	currentCount: number,
	index: number,
	view: string,
	removeItem?: (item: string) => void,
	editItem?: (item: string) => void,
	setItemsOnPaste?: (url: string, itemIndex: string) => void,
	withControls?: boolean,
	maxRows: number
};

const StoryList = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-content: flex-start;
	justify-content: space-between;
	position: relative;
	width: 100%;
	${
	media.mediumDown`
		display: block;
	`}
`;

const RelatedStoryRow = (props: Props) => {

	const { stories, ...rest} = props;

	const removeItem = item => {
		if (item && props.removeItem) {
			props.removeItem(item);
		}
	};

	const editItem = item => {
		if (item && props.editItem) {
			props.editItem(item);
		}
	};

	const setItemsOnPaste = (url: string, itemIndex: string) => {
		if (props.setItemsOnPaste) {
			props.setItemsOnPaste(url, itemIndex);
		}
	};

	const ManualItem = (story: FauxPost) => {
		return <ManualStoryItem
			isInvalid={story.isInvalid}
			errorMessage={story.errorMessage}
			itemIndex={story.id}
			setItemsOnPaste={setItemsOnPaste}
			key={ story.id }
			post={story} />;
	};

	const StoryItem = (story: Post) => {
		return <RelatedStoryItem isDraggable={props.withControls}
			{ ...rest } editItem={editItem} removeItem={removeItem} key={`${story.id}${Math.random()}`} post={story} />;
	};

	const RelatedItem = item => {
		if (props.view === Views.Manual && item.isFaux) {
			// $FlowFixMe
			return ManualItem(item);
		} else {
			// $FlowFixMe
			return StoryItem(item);
		}
	};

	const Controls = () => {
		if (props.withControls) {
			return <StoryRowControls { ...rest } />;
		}
		return null;
	};

	return (
		<EnsureDefaultTheme>
			<StoryList>
				{stories.map(story => {
					return (
						RelatedItem(story)
					);
				})}
				{ Controls() }
			</StoryList>
		</EnsureDefaultTheme>
	);
};

export default RelatedStoryRow;
