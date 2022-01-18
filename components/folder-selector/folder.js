/* @flow */

import * as React from 'react';
import { List } from 'react-virtualized';
import styled, { css } from 'styled-components';
import { isFunction } from 'lodash';

import FolderItem from './folder-item';
import { folderWidth, browserHeight, lineColor } from './consts';

import type { Item, ItemId, LevelKey, LevelId } from './types';

type Props = {
	id: LevelId,
	displayName?: string,
	index: number,
	items?: Array<Item>,
	isFirst: boolean,
	isOutOfView: boolean,
	isLastSelection?: boolean,
	multipleSelection?: boolean,
	onSelect: (?ItemId, LevelKey, deselect?: boolean) => Promise<mixed>,
	selection: ?string,
	selectedItems?: Array<Item>,
	scrolledToTheRight: boolean,
	setNewBrowserScrollPosition?: (forceScroll?: boolean) => void,
	toggleTooltip?: (e: SyntheticMouseEvent<HTMLElement>) => void,
	scrollToItem: number
};

type State = {
	renderChildren: boolean
}

export const Wrapper = styled.div`
	flex: 0 0 ${folderWidth}px;
	overflow-x: hidden;

	${props => !props.isFirst && css`
		border-left: 1px solid ${lineColor};
	`}

	${props => props.scrolledToTheRight && props.index === 1 && css`
		border-left: none;
	`}
`;

const Inner = styled.div`
	overflow-y: auto;

	> div {
		outline: none;
	}
`;

export default class Folder extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			renderChildren: false
		};
		this.items = this.orderItems(props.items || []);
	}

	folderInnerRef: ?HTMLDivElement;
	items: Array<Item>;
	itemList: List;

	componentDidUpdate(prevProps: Props) {
		const { setNewBrowserScrollPosition } = this.props;

		if (this.itemList) {
			this.itemList.forceUpdateGrid();
		}

		if (this.props.index > 2 && isFunction(setNewBrowserScrollPosition)) {
			setNewBrowserScrollPosition(true);
		}

		if (prevProps.items !== this.props.items) {
			this.items = this.orderItems(this.props.items || []);
		}
	}

	setInnerRef(ref: ?HTMLDivElement) {
		this.folderInnerRef = ref;

		this.setState({
			renderChildren: true
		});
	}

	onSelect = (id: string) => {
		const { multipleSelection, selection } = this.props;
		const newSelectionValue = selection === id && !multipleSelection ? null : id;

		this.props.onSelect(id, this.props.index, !newSelectionValue);
	}

	orderItems(items: Array<Item>): Array<Item> {
		return [...items].sort((a: Item, b: Item) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
	}

	// Refactor into a separate component, maybe smth that can be used generically
	rowRenderer = ({
		key,
		index,
		style
	}: {
		key: number,
		index: number,
		style: Object
	}) => {
		const { props } = this;
		const item = this.items && this.items[index];
		const {
			isFirst,
			isLastSelection,
			multipleSelection,
			selectedItems,
			selection,
			toggleTooltip
		} = props;

		let selected = item ? selection === item.id : false;

		if (multipleSelection && item && selectedItems && selectedItems.length && isFirst) {
			const parentItem = item
				? selectedItems.find(selectedItem => selectedItem.id === item.id)
				: null;
			selected = Boolean(parentItem && parentItem.isParentSelected);
		} else if (multipleSelection && item && selectedItems && selectedItems.length && !isFirst) {
			selected = selectedItems.find(selectedItem => {
				const childItem = selectedItem.selectedChildren && selectedItem.selectedChildren.find(child => child.id === item.id);
				return Boolean(childItem);
			});
		} else if (multipleSelection && item && selectedItems && !selectedItems.length) {
			selected = false;
		}

		return item && <span key={key} style={style}><FolderItem
			{...item}
			toggleTooltip={toggleTooltip}
			id={item.id}
			name={item.name}
			isVideo={item.content === 'Video'}
			onSelect={this.onSelect}
			selected={Boolean(selected)}
			isLastSelection={isLastSelection}
			isFirst={isFirst}
			multipleSelection={multipleSelection}
			style={style}
		/></span>;
	}

	render() {
		const { props } = this;

		if (!this.props.items) {
			if (props.isOutOfView) {
				return null;
			}

			// Empty folders should still display to show separator borders.
			return <Wrapper />;
		} else {
			return (
				<Wrapper
					isFirst={props.isFirst}
					scrolledToTheRight={props.scrolledToTheRight}
					index={props.index}
					ref={ref => !this.state.renderChildren && this.setInnerRef(ref)}
				>
					<Inner>
						{this.state.renderChildren &&
							<List
								height={browserHeight}
								width={folderWidth - 1}
								rowCount={props.items && props.items.length}
								rowHeight={36}
								rowWidth={folderWidth - 1}
								rowRenderer={this.rowRenderer}
								scrollToIndex={props.scrollToItem}
								ref={c => { this.itemList = c; }}
							/>
						}
					</Inner>
				</Wrapper>
			);
		}
	}
}
