/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../../theme';
import { chunk, flatten } from 'lodash';

import type { TranslateFunction } from 'kinja-components/components/translator';
import createTranslate from 'kinja-components/components/translator';
import translations from './translations';

import { Views } from './consts';
import type { FauxPost } from './types';
import type Post from 'kinja-magma/models/Post';

// search
import SearchBar, { StyledSearchBar } from './search';

// filters
import type { StoryType, Tag, FilterType } from './filters/types';
import { FilterTypeList, TagList, StoryTypeList } from './filters';

// stories
import { RelatedStoryList } from './stories';

// tabs
import { Tabs } from './tabs';

// headline
import EditableHeadline from './headline';

type Props = {
	locale: string,
	stories: Array<Post | FauxPost>,
	tags?: Array<Tag>,
	storyTypes?: Array<StoryType>,
	filters?: Array<FilterType>,
	headline?: string,
	defaultTabIndex?: number,
	isStatic: boolean,
	minRows: number,
	maxRows: number,
	itemsPerRow: number,
	view?: string,
	isEmptySearchField?: boolean,
	hideFilters?: boolean,
	onTabChange?: (index: number) => void,
	onSearch?: (term: string) => void,
	onManualHeadlineEdit?: (value: string) => void,
	onStorySelect?: (itemId: string) => void,
	onTagSelect?: (itemId: string) => void,
	onRemoveFilter?: (itemId: string) => void,
	onRemoveStory?: (key: string) => void,
	onEditStory?: (key: string) => void,
	onSetItemsOnPaste?: (url: string, key: string) => void,
	onAddStoryRow?: () => void,
	onRemoveStoryRow?: (index: number) => void,
	onStoryRowsRendered?: (storyRows: Array<Array<Post | FauxPost>>) => void,
	onUpdateStorySuggestions?: (filters: Array<*>) => void,
	onSetCardSwapState?: (draggedItemIndex: number, droppedItemIndex: number) => void
};

const RelatedStoriesWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	flex-wrap: wrap;

	${StyledSearchBar} {
		margin-top: 14px;
		margin-bottom: 37px;
	}
`;

const ModuleWrapper = styled.div`
	min-height: 360px;
`;

class RelatedStories extends React.Component<Props> {
	translate: TranslateFunction;

	constructor(props: Props) {
		super(props);
		this.translate = createTranslate(translations, props.locale);
	}

	getHeadline() {
		return this.props.headline || this.translate('Recommended Stories');
	}

	onTabChange = (index: number) => {
		if (this.props.onTabChange) {
			this.props.onTabChange(index);
		}
	}

	onSearch = (term: string) => {
		if (this.props.onSearch) {
			this.props.onSearch(term);
		}
	}

	onManualHeadlineEdit = (value: string) => {
		if (this.props.onManualHeadlineEdit) {
			this.props.onManualHeadlineEdit(value);
		}
	}

	onStorySelect = (itemId: string) => {
		if (!this.props.storyTypes) {
			return;
		}

		const filter = this.props.storyTypes.find(item => { return item.id === itemId; });

		if (!filter || !this.props.filters) {
			return;
		}

		const filtr: FilterType = {
			canonical: filter.canonical,
			title: filter.title,
			type: 'storyType'
		};

		const filterList = flatten(this.props.filters.concat(filtr));

		if (this.props.onUpdateStorySuggestions && filterList) {
			this.props.onUpdateStorySuggestions(filterList);
		}
	}

	onTagSelect = (itemId: string) => {
		if (!this.props.tags) {
			return;
		}

		const filter = this.props.tags.find(item => { return item.canonical === itemId; });

		if (!filter || !this.props.filters) {
			return;
		}

		const filtr: FilterType = {
			canonical: filter.canonical,
			title: filter.displayName,
			type: 'tag'
		};

		const filterList = flatten(this.props.filters.concat(filtr));

		if (this.props.onUpdateStorySuggestions && filterList) {
			this.props.onUpdateStorySuggestions(filterList);
		}
	}

	onRemoveFilter = (itemId: string) => {
		if (!this.props.filters) {
			return;
		}
		const filterList = this.props.filters.filter(item => {
			const filterId = item.canonical;
			return filterId !== itemId;
		});
		if (this.props.onUpdateStorySuggestions) {
			this.props.onUpdateStorySuggestions(filterList);
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

	// move to ctrl
	getStoryRows(): Array<Array<Post | FauxPost>> {
		const { stories, itemsPerRow, maxRows } = this.props;
		let storyList = [].concat(stories);
		const maxLength = itemsPerRow * maxRows;

		if (storyList.length > maxLength) {
			storyList = storyList.slice(0, maxLength);
		}

		const storiesToRender = chunk(storyList, itemsPerRow);
		if (this.props.onStoryRowsRendered && storiesToRender.length) {
			this.props.onStoryRowsRendered(storiesToRender);
		}
		return storiesToRender;
	}

	onAddStoryRow = () => {
		if (this.props.onAddStoryRow) {
			this.props.onAddStoryRow();
		}
	}

	onRemoveStoryRow = (index: number) => {
		if (this.props.onRemoveStoryRow) {
			this.props.onRemoveStoryRow(index);
		}
	}

	onStoryRowsRendered = (storyRows: Array<Array<Post | FauxPost>>) => {
		if (this.props.onStoryRowsRendered && storyRows.length) {
			this.props.onStoryRowsRendered(storyRows);
		}
	}

	onSetItemsOnPaste = (url: string, key: string) => {
		if (this.props.onSetItemsOnPaste) {
			this.props.onSetItemsOnPaste(url, key);
		}
	}

	onSetCardSwapState = (draggedItemIndex: number, droppedItemIndex: number) => {
		if (this.props.onSetCardSwapState) {
			this.props.onSetCardSwapState(draggedItemIndex, droppedItemIndex);
		}
	}

	render() {
		const { tags, storyTypes, filters, view, isEmptySearchField, isStatic } = this.props;

		const storyListEventHandlers = {
			onRemoveStory: this.onRemoveStory,
			onEditStory: this.onEditStory,
			onAddStoryRow: this.onAddStoryRow,
			onRemoveStoryRow: this.onRemoveStoryRow,
			onStoryRowsRendered: this.onStoryRowsRendered,
			onSetCardSwapState: this.onSetCardSwapState
		};

		const manualPasteHandler = {
			setItemsOnPaste: this.onSetItemsOnPaste
		};

		let searchBar;
		let tabIndex;

		if (view === Views.Manual) {
			tabIndex = 1;
		} else {
			searchBar = <SearchBar onSearch={ this.onSearch } isEmptySearchField={isEmptySearchField}/>;
			tabIndex = 0;
		}

		const withHeadline = () => {
			if (!this.props.isStatic) {
				return <EditableHeadline value={ this.getHeadline() } onManuallyEdit={this.onManualHeadlineEdit} />;
			}
			return null;
		};

		const withTabs = () => {
			if (!this.props.isStatic) {
				return <Tabs tabIndex={tabIndex} onTabChange={this.onTabChange} />;
			}
			return null;
		};

		const selectedFilters = <RelatedStoriesWrapper>
			{filters && filters.length > 0 &&
				<FilterTypeList onRemoveItem={this.onRemoveFilter} items={filters} />}
		</RelatedStoriesWrapper>;

		const withSearch = () => {
			if (!this.props.isStatic && view === Views.Search) {
				return [selectedFilters, searchBar];
			}
			return null;
		};

		const withFilterSection = () => {
			if (!this.props.hideFilters && !this.props.isStatic && view === Views.Search) {
				return <React.Fragment>
					<RelatedStoriesWrapper>
						{ storyTypes && storyTypes.length > 0 &&
							<StoryTypeList onSelect={ this.onStorySelect } items={ storyTypes }/> }
					</RelatedStoriesWrapper>
					<RelatedStoriesWrapper>
						{ tags && tags.length > 0 &&
							<TagList onSelect={ this.onTagSelect } items={ tags }/> }
					</RelatedStoriesWrapper>
				</React.Fragment>;
			}
			return null;
		};

		return (
			<EnsureDefaultTheme>
				<ModuleWrapper>
					<RelatedStoriesWrapper>
						{ withHeadline() }
						{ withTabs() }
						<RelatedStoriesWrapper>
							<RelatedStoryList
								{ ...manualPasteHandler }
								{...storyListEventHandlers}
								withControls={!isStatic}
								key={ view }
								view={view}
								maxRows={this.props.maxRows}
								stories={ this.getStoryRows() } />
						</RelatedStoriesWrapper>

						<RelatedStoriesWrapper>
							{ withSearch() }
							{ withFilterSection() }
						</RelatedStoriesWrapper>

					</RelatedStoriesWrapper>
				</ModuleWrapper>
			</EnsureDefaultTheme>
		);
	}
	static defaultProps = {
		minRows: 1,
		maxRows: 3,
		itemsPerRow: 3,
		isStatic: true,
		hideFilters: false,
		locale: 'en-US'
	}
}

export default RelatedStories;
