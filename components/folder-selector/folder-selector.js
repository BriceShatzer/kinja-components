// @flow

import * as React from 'react';
import styled, {css} from 'styled-components';
import { compact, isFunction, remove } from 'lodash';

import { EnsureDefaultTheme } from '../theme';
import { SelectControl, SelectValue, LabelSelect } from '../form/select';
import FolderBrowser from './folder-browser';
import Folder from './folder';
import CurrentPath from './current-path';
import Toggle from 'kinja-components/components/hoc/toggle';

import TooltipWrapper from '../tooltip/tooltip-wrapper';
import SelectedItems from './selected-items';
import { folderWidth, folderCount, folderSelectorWidth } from './consts';

// ICONS
import ChevronRightIcon from '../icon19/ChevronRight';

import type { Item, ItemId, SelectedItem, Level, LevelState } from './types';
import type { ToggleInjectedProps } from 'kinja-components/components/hoc/toggle';


type Props = {
	disabled?: boolean,
	levels: Array<Level>,
	multipleSelection?: boolean,
	placeholder?: string,
	onSelect?: Array<SelectedItem> => Promise<mixed>,
	onCancel?: () => void,
	onChange?: (selectedBlogs: Array<Item> | []) => void
} & ToggleInjectedProps;

type State = {
	isOpen: boolean,
	levels: Array<LevelState>,
	levelsInLabel: Array<LevelState>,
	lastBrowserInnerWidth: ?number,
	browserInnerScrollPosition: ?number,
	currentLevel: number,
	initFetch: boolean,
	scrolledToTheRight: boolean,
	selectedItems: Array<*>,
	showTooltip: boolean,
	toolTipContent?: string,
	tooltipRef?: ?HTMLElement,
	topOffset?: number,
	scrollToItem: number
};

export const Wrapper = styled.div`
	position: relative;
	outline: none;
`;

const SelectWrapper = styled.div`
	min-height: 36px;
	border-radius: 5px;
	background: ${props => props.theme.color.whitesmoke};
	min-width: 250px;

	${SelectValue} {
		text-align: left;
	}
`;

const ChevronWrapper = styled.div`
	position: relative;
	top: -1px;

	${props => props.active && css`
		top: 1px;
	`}

	${props => props.multipleSelection && css`
		align-self: flex-start;
		top: 5px;
	`}

	svg {
		color: ${({ theme, disabled }) => disabled ? theme.color.gray : theme.color.black};
		transform: ${({ active }) => active ? 'rotate(-90deg)' : 'rotate(90deg)'};
	}
`;

const SelectControlActivable = styled(SelectControl)`
	${props => props.active && css`
		border-width: 1px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	`}

	${props => !props.withFixHeight && css`
		height: auto;
	`}
`;

export const BrowserContainer = styled.div`
	position: relative;
`;

export const BrowserWrapper = styled.div`
	position: absolute;
	top: -1px;
	z-index: 98;
`;

function addLevelIndices(levels: Array<Level>) {
	// Provides stable keys for mapping in render() and identifying levels in other methods.
	return levels.map((level: Level, index) => Object.assign({}, level, {key: index}));
}

function highlightLastSelectedLevel(levels: Array<LevelState>) {
	// If the level is last in the series of levels with selections, mark it as such
	// so it can be styled differently.
	return levels.map((level, index, levelsArray) => {
		const nextLevelIndex = index + 1;
		const levelWithLastSelection = Object.assign(({}: Object), level, {isLastSelection: true});
		const levelWithoutLastSelection = Object.assign(({}: Object), level, {isLastSelection: false});

		if (level.selection) {
			if (!levelsArray[nextLevelIndex]) {
				// Last level automatically wins the prize.
				return levelWithLastSelection;
			}

			return levelsArray[nextLevelIndex].selection
				? levelWithoutLastSelection
				: levelWithLastSelection;
		} else {
			return levelWithoutLastSelection;
		}
	});
}

class FolderSelector extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			browserInnerScrollPosition: null,
			currentLevel: 0,
			initFetch: false,
			isOpen: false,
			lastBrowserInnerWidth: null,
			levels: highlightLastSelectedLevel(addLevelIndices(this.props.levels)),
			levelsInLabel: [],
			scrolledToTheRight: false,
			scrollToItem: -1,
			selectedItems: [],
			showTooltip: false,
			toolTipContent: ''
		};
	}

	componentDidMount() {
		if (this.props.levels.length) {
			this.onReset(true);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.multipleSelection) {
			if (prevProps.isOpen !== this.props.isOpen) {
				this.setState({
					isOpen: this.props.isOpen
				});
			}
		}
	}

	browserInnerRef: ?HTMLDivElement;

	toggle = (event: ?SyntheticEvent<HTMLButtonElement>, callback?: () => void) => {
		this.setState({isOpen: !this.state.isOpen}, () => {
			callback && callback();

			if (this.props.multipleSelection) {
				this.props.toggle();
			}
		});
	}

	// Sets up the component as if the currently selected path has just been clicked on.
	// TODO: Move all the init fetch async logic to editor post view
	onReset = (initRun?: boolean) => {
		async function asyncSetLevels(levels, selectLevel) {
			for (let index = 0; index < levels.length; index++) {
				const level = levels[index];
				if (level.selection && level.hasOwnProperty('isLastSelection')) {
					await selectLevel(level.selection, index);
				}
			}
		}

		const setLevels = async () => {
			await asyncSetLevels(this.state.levels, this.onSelect);
		};

		const initSetLevels = async () => {
			await setLevels();
			this.state.levelsInLabel = this.state.levels.slice();
			this.setState({
				initFetch: true
			});
		};

		if (initRun) {
			initSetLevels();
		} else {
			setLevels();
		}
	}

	onSelect = (id: ?ItemId, levelIndex: number, deselect?: boolean, callback?: () => void) => {
		// Apply current selections from the state.
		const newLevels = this.state.levels.map((level, index) => {
			const isPreviousLevel = index < levelIndex;
			const isCurrentLevel = index === levelIndex;
			let selectionToApply;

			if (isPreviousLevel) {
				selectionToApply = this.state.levels[index].selection;
			} else if (isCurrentLevel) {
				// If the level is marked as required, deselection is disallowed.
				selectionToApply = (deselect && !level.required) ? null : id;
			} else {
				selectionToApply = null;
			}

			return Object.assign({}, level, {selection: selectionToApply});
		});

		// Show items for the currently selected path.
		const getLevelsWithItems = newLevels.map((level, index) => {
			const isPreviousLevel = index <= levelIndex;
			const isChangingLevel = index === levelIndex + 1;

			return new Promise(resolve => {
				if (isPreviousLevel) {
					// $FlowFixMe
					resolve(level);
				} else if (isChangingLevel) {
					if (deselect && !newLevels[levelIndex].required) {
						resolve(Object.assign(({}: Object), level, {items: null}));
					}

					if (newLevels[levelIndex + 1]) {
						newLevels[levelIndex + 1].getItems(id, newLevels)
							.then(items => {
								resolve(Object.assign(({}: Object), level, {items}));
							});
					} else {
						resolve(level);
					}
				} else {
					resolve(Object.assign(({}: Object), level, {items: null}));
				}
			});
		});

		return Promise.all(getLevelsWithItems).then(newLevels => {
			this.setState({
				levels: highlightLastSelectedLevel(newLevels),
				lastBrowserInnerWidth: this.browserInnerRef ? this.browserInnerRef.scrollWidth : null,
				currentLevel: levelIndex
			}, () => {
				if (this.props.multipleSelection) {
					this.addToSelection(id, levelIndex);
				}

				this.setNewBrowserScrollPosition();

				if (isFunction(callback)) {
					callback();
				}
			});
		});
	}

	setNewBrowserScrollPosition = (forceScroll?: boolean) => {
		if (forceScroll && this.browserInnerRef) {
			this.browserInnerRef.scrollLeft = folderWidth;
			return;
		}

		const { lastBrowserInnerWidth } = this.state;
		const newBrowserInnerWidth = this.browserInnerRef ? this.browserInnerRef.scrollWidth : null;
		const scrolledToTheRight = newBrowserInnerWidth ? newBrowserInnerWidth > folderSelectorWidth : false;

		if (!lastBrowserInnerWidth || !newBrowserInnerWidth) {
			return;
		}

		if ((lastBrowserInnerWidth < newBrowserInnerWidth) && this.browserInnerRef) {
			this.browserInnerRef.scrollLeft = folderWidth;

			this.setState({
				scrolledToTheRight
			});
		}

	}

	resetSelectionAndClose = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
		this.toggle(event, () => {
			this.setState({
				levels: highlightLastSelectedLevel(addLevelIndices(this.props.levels))
			}, () => {
				if (isFunction(this.props.onCancel)) {
					this.props.onCancel();
				}

				this.onReset();
			});
		});
	}

	commitSelectionAndClose = () => {
		const currentSelection = this.state.levels && compact(this.state.levels.map(level => {
			return {
				id: level.id,
				selection: level.selection
			};
		}));

		this.toggle(null, () => {
			if (isFunction(this.props.onSelect) && currentSelection) {
				this.props.onSelect(currentSelection);
			}

			this.setState({levelsInLabel: this.state.levels});
		});
	}

	getBrowserInnerRef = (browserInnerRef: ?HTMLDivElement) => {
		this.browserInnerRef = browserInnerRef;
	}

	jumpToLetter = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
		const key = event.key.toLowerCase();
		const levelInFocus = this.state.levels.find(level => level.isLastSelection);
		let result = null;
		let resultIndex = null;

		if (levelInFocus && levelInFocus.items) {
			result = levelInFocus.items.find((item, index) => {
				if (item.name.toLowerCase().startsWith(key)) {
					resultIndex = index;
					return true;
				}
			});

			if (result && (resultIndex !== null)) {
				this.onSelect(result.id, levelInFocus.key, false, () => {
					// $FlowFixMe: resultIndex will never be null yet flow be like ヽ(｀Д´)ﾉ
					this.setState({scrollToItem: resultIndex});
				});
			}
		}
	}

	// Multiple Selection Methods
	addToSelection = (id: ?ItemId, levelIndex: number) => {
		const selectedItem = this.state.levels[levelIndex].items
			? this.state.levels[levelIndex].items.find(item => item.id === id)
			: null;

		// If parentItem has no selectedChildren, remove from the selectedItems
		const selectedStateItem = this.state.selectedItems.find(item => item.id === id);
		const hasSelectedChildren = Boolean(selectedStateItem && selectedStateItem.selectedChildren.length);

		if ((!selectedItem || this.isAlreadySelected(selectedItem) && !hasSelectedChildren)) {
			// If the child is selected already, remove from the selectedItems
			if (levelIndex === 1 && selectedItem && id && selectedItem.parentId) {
				this.onDeselect(null, id, selectedItem.parentId);
				return;
			}

			if (!hasSelectedChildren && id) {
				this.onDeselect(null, id);
				return;
			}

			return;
		}

		let parentItem = this.state.selectedItems.find(item => item.id === selectedItem.parentId);
		if (selectedItem.parentId && !parentItem && this.state.levels[0].items) {
			parentItem = getNewParentItem(this.state.levels[0].items.find(item => item.id === selectedItem.parentId));
		}
		const parentItemIndex = parentItem ? this.state.selectedItems.findIndex(item => parentItem && parentItem.id === item.id) : -1;
		const selectedItemIndex = parentItemIndex === -1 ? this.state.selectedItems.findIndex(item => item.id === id) : -1;

		function getNewParentItem(imperfectParent?: Item) {
			// If parentItem is selected and has selected verticals and another vertical was clicked
			if (selectedItem.parentId && !imperfectParent && parentItem && parentItem.isParentSelected && parentItem.selectedChildren.length) {
				return Object.assign(
					{},
					parentItem,
					{ isParentSelected: true },
					{ isLastSelection: false },
					{ selectedChildren: parentItem ? parentItem.selectedChildren.concat(selectedItem) : [] }
				);
			// If parentItem doesn't have selected verticals and a vertical was clicked
			} else if (selectedItem.parentId && !imperfectParent) {
				return Object.assign(
					{},
					parentItem,
					{ isParentSelected: false },
					{ isLastSelection: false },
					{ selectedChildren: parentItem ? parentItem.selectedChildren.concat(selectedItem) : [] }
				);
			// If parentItem is selected and has selected verticals and parentItem was clicked again
			} else if (imperfectParent && hasSelectedChildren) {
				return Object.assign(
					{},
					imperfectParent,
					{ isParentSelected: false }
				);
			// If parentItem has selected verticals and parentItem was clicked again
			} else if (hasSelectedChildren) {
				return Object.assign(
					{},
					selectedItem,
					{ isLastSelection: false },
					{ isParentSelected: true },
					{ selectedChildren: selectedStateItem ? selectedStateItem.selectedChildren : [] }
				);
			} else if (imperfectParent) {
				return Object.assign(
					{},
					imperfectParent,
					{ isLastSelection: true },
					{ isParentSelected: true },
					{ selectedChildren: [] }
				);
			} else {
				// If parentItem was clicked at the first time
				return Object.assign(
					{},
					selectedItem,
					{ isLastSelection: true },
					{ isParentSelected: true },
					{ selectedChildren: [] }
				);
			}
		}

		let newSelectedItems = this.state.selectedItems;
		if (parentItemIndex > -1) {
			newSelectedItems[parentItemIndex] = getNewParentItem();
		} else if (selectedStateItem && selectedStateItem.isParentSelected && hasSelectedChildren) {
			newSelectedItems[selectedItemIndex] = getNewParentItem(selectedStateItem);
		} else if (hasSelectedChildren && selectedItemIndex > -1) {
			newSelectedItems[selectedItemIndex] = getNewParentItem();
		} else {
			newSelectedItems = newSelectedItems.concat(getNewParentItem());
		}
		this.setState({
			selectedItems: newSelectedItems
		}, () => {
			this.props.onChange && this.props.onChange(newSelectedItems);
		});
	}

	onDeselect = (event: ?SyntheticMouseEvent<HTMLDivElement>, id: ItemId, parentId?: ItemId) => {
		// preventing call the toggle method
		if (event) {
			event.stopPropagation();
		}

		const parentItem = parentId
			? this.state.selectedItems.filter(parent => parent.id === parentId)[0]
			: this.state.selectedItems.filter(parent => parent.id === id)[0];

		const parentItemIndex = this.state.selectedItems.findIndex(item => parentItem.id === item.id);

		function getNewParentItem() {
			if (parentId) {
				const newParentItem = parentItem;
				remove(newParentItem.selectedChildren, child => child.id === id);

				// If parent item is not selected and the last selected vertical was deselected
				if (!newParentItem.selectedChildren.length && !parentItem.isParentSelected) {
					return null;
				// If parent item is selected and the last selected vertical was deselected
				} else if (!newParentItem.selectedChildren.length) {
					return Object.assign(
						newParentItem,
						{ isLastSelection: true }
					);
				}
				return newParentItem;
			}

			if (parentItem.selectedChildren.length) {
				return Object.assign(
					{},
					parentItem,
					{ isParentSelected: false }
				);
			}

			return null;
		}

		const newSelectedItems = this.state.selectedItems;
		if (getNewParentItem()) {
			newSelectedItems[parentItemIndex] = getNewParentItem();
		} else {
			remove(newSelectedItems, parent => parent.id === parentItem.id);
		}

		this.setState({
			selectedItems: newSelectedItems
		}, () => {
			this.props.onChange && this.props.onChange(newSelectedItems);
		});
	}

	isAlreadySelected(selectedItem: Item) {
		if (selectedItem.parentId) {
			const parent = this.state.selectedItems.find(item => item.id === selectedItem.parentId);
			return Boolean(parent && parent.selectedChildren.find(child => child.id === selectedItem.id));
		}

		return Boolean(this.state.selectedItems.find(item => item.id === selectedItem.id));
	}

	render() {
		return (
			<EnsureDefaultTheme>
				<Wrapper tabIndex={0} onKeyDown={this.jumpToLetter} ref={this.props.insideReference}>
					<TooltipWrapper>
						{({toggleTooltip}) => {
							return (
								<React.Fragment>
									<SelectWrapper>
										<LabelSelect
											open={this.state.isOpen}
											disabled={this.props.disabled}
											onClick={this.state.isOpen ? this.resetSelectionAndClose : this.toggle}
											role="button"
											tabIndex="0"
										>
											<SelectControlActivable active={this.state.isOpen} withFixHeight={!this.props.multipleSelection}>
												{this.props.multipleSelection
													? <SelectValue>
														<SelectedItems
															selectedItems={this.state.selectedItems}
															placeholder={this.props.placeholder}
															onDeselect={this.onDeselect}
														/>
													</SelectValue>
													: <SelectValue>
														{this.state.initFetch && <CurrentPath
															toggleTooltip={toggleTooltip}
															levels={this.state.levelsInLabel}
															withIcon />}
													</SelectValue>
												}
												<ChevronWrapper active={this.state.isOpen} disabled={this.props.disabled}
													multipleSelection={this.props.multipleSelection}>
													<ChevronRightIcon />
												</ChevronWrapper>
											</SelectControlActivable>
										</LabelSelect>
									</SelectWrapper>
									{this.state.initFetch && this.state.isOpen ? (
										<BrowserContainer>
											<BrowserWrapper>
												<FolderBrowser
													selectDisabled={this.props.disabled}
													currentPath={<CurrentPath toggleTooltip={toggleTooltip} levels={this.state.levels} isFooter/>}
													onCancel={this.resetSelectionAndClose}
													onSelect={this.commitSelectionAndClose}
													getBrowserInnerRef={this.getBrowserInnerRef}
													levels={this.state.levels}
													currentLevel={this.state.currentLevel}
													scrolledToTheRight={this.state.scrolledToTheRight}
													multipleSelection={this.props.multipleSelection}
												>
													{this.state.levels.map(level => {
														return (
															<Folder
																id={level.id}
																displayName={level.displayName}
																items={level.items}
																onSelect={this.onSelect}
																key={level.key}
																index={level.key}
																selection={level.selection}
																selectedItems={this.state.selectedItems}
																isFirst={level.key === 0}
																isLastSelection={level.isLastSelection}
																isOutOfView={(level.key + 1) > folderCount}
																scrolledToTheRight={this.state.scrolledToTheRight}
																setNewBrowserScrollPosition={this.setNewBrowserScrollPosition}
																toggleTooltip={toggleTooltip}
																scrollToItem={level.isLastSelection ? this.state.scrollToItem : -1}
																multipleSelection={this.props.multipleSelection}
															/>
														);
													})}
												</FolderBrowser>
											</BrowserWrapper>
										</BrowserContainer>
									) : null}
								</React.Fragment>);
						}}
					</TooltipWrapper>
				</Wrapper>
			</EnsureDefaultTheme>
		);
	}
}


export default Toggle(FolderSelector, { isOutsideClickEnabled: true, isDefaultOpen: false });