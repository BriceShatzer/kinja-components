/* @flow */

import * as React from 'react';
import { EnsureDefaultTheme } from '../../../theme';

import type Post from 'kinja-magma/models/Post';

import RelatedStoryRow from './relatedStoryRow';

import type { FauxPost } from './../types';

type Props = {
	stories: Array<Array<Post | FauxPost>>,
	view: string,
	minRows: number,
	maxRows: number,
	itemsPerRow: number,
	withControls?: boolean,
	setItemsOnPaste?: (url: string, itemIndex: string) => void,
	onRemoveStory?: (key: string) => void,
	onEditStory?: (key: string) => void,
	onAddStoryRow?: () => void,
	onRemoveStoryRow?: (index: number) => void,
	onSetCardSwapState?: (draggedItemIndex: number, droppedItemIndex: number) => void
};


class RelatedStoryList extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		this.onDeleteRow = this.onDeleteRow.bind(this);
		this.onAddRow = this.onAddRow.bind(this);
		this.onRemoveStory = this.onRemoveStory.bind(this);
		this.onEditStory = this.onEditStory.bind(this);
	}

	onDeleteRow = (index: number) => {
		if (this.props.onRemoveStoryRow) {
			this.props.onRemoveStoryRow(index);
		}
	}

	onAddRow = () => {
		if (this.props.onAddStoryRow) {
			this.props.onAddStoryRow();
		}
	}

	onRemoveStory = (key: string) => {
		if (this.props.onRemoveStory) {
			this.props.onRemoveStory(key);
		}
	}

	onEditStory = (key: string) => {
		if (this.props.onEditStory) {
			this.props.onEditStory(key);
		}
	}

	setItemsOnPaste = (url: string, itemIndex: string) => {
		if (this.props.setItemsOnPaste) {
			this.props.setItemsOnPaste(url, itemIndex);
		}
	}

	onSetCardSwapState = (draggedItemIndex: number, droppedItemIndex: number) => {
		if (this.props.onSetCardSwapState) {
			this.props.onSetCardSwapState(draggedItemIndex, droppedItemIndex);
		}
	}

	render() {
		const eventHandlers = {
			addRow: this.onAddRow,
			deleteRow: this.onDeleteRow,
			removeItem: this.onRemoveStory,
			editItem: this.onEditStory,
			setItemsOnPaste: this.setItemsOnPaste,
			setCardSwapState: this.onSetCardSwapState
		};
		const { stories, view, withControls, maxRows } = this.props;
		const rowLength = stories.length;

		return (
			<EnsureDefaultTheme>
				<React.Fragment>
					{stories.map((row, index) => {
						const key = row.map(item => item.id).join('-');
						return (
							<RelatedStoryRow
								key={ key }
								stories={row}
								index={ index }
								{...eventHandlers}
								view={ view }
								maxRows={maxRows}
								currentCount={ rowLength }
								withControls={ withControls }
							/>
						);
					})}
				</React.Fragment>
			</EnsureDefaultTheme>
		);
	}

	static defaultProps = {
		minRows: 1,
		maxRows: 3,
		itemsPerRow: 3,
		view: 'search',
		withControls: true
	}
}

export default RelatedStoryList;
