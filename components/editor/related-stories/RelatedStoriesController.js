/* eslint-disable flowtype/no-types-missing-file-annotation, react/prop-types */

import * as React from 'react';
import { debounce, findIndex, intersectionWith, differenceBy, flatten, filter } from 'lodash';
import { Views } from './consts';
import type { FauxPost, ExternalAPI } from './types';
import type { StoryType, Tag, FilterType } from './filters/types';
import type Post from 'kinja-magma/models/Post';
import { createPostId }  from 'kinja-magma/models/Id';
import RelatedStories from './RelatedStories';
import Toggle from '../../hoc/toggle';
import type { TranslateFunction } from 'kinja-components/components/translator';
import createTranslate from 'kinja-components/components/translator';
import translations from './translations';

type Props = {
	locale: string,
	stories?: Array<Post | FauxPost>,
	tags?: Array<Tag>,
	storyTypes?: Array<StoryType>,
	headline?: string,
	view?: string,
	maxRows?: number,
	itemsPerRow: number,
	externalAPI: ExternalAPI
};

type State = {
	stories?: Array<Post | FauxPost>,
	tags?: Array<Tag>,
	storyTypes?: Array<StoryType>,
	filters?: Array<FilterType>,
	view?: string,
	headlineDirty?: boolean,
	headline?: string,
	maxRows?: number
}

class RelatedStoriesContainer extends React.Component<Props, State> {
	translate: TranslateFunction;

	constructor(props) {
		super(props);
		this.translate = createTranslate(translations, props.locale);
		const stories = this.props.stories.length ? this.props.stories : this.generatePlaceholderPosts(this.props.itemsPerRow);
		this.state = {
			tags: this.props.tags || [],
			storyTypes: this.props.storyTypes || [],
			filters: this.props.filters || [],
			stories,
			view: this.props.view || Views.Search,
			headlineDirty: false,
			headline: this.props.headline || this.translate('Recommended Stories'),
			maxRows: this.props.maxRows || 3
		};
		this.storyRows = [];
		this.gridLength = this.props.minRows;
		this.ignoreList = [];
		this.storySurplus = [];
		this.searchFieldShouldEmpty = false;
		this.debouncedSearch = debounce(this.searchTagsAndStoryTypes, 1000);
	}

	componentDidUpdate(prevProps, prevState) {
		let headline;

		if (prevState.filters.length !== this.state.filters.length) {
			headline = this.getHeadline();

			if (headline !== this.state.headline) {
				this.onHeadlineUpdated(headline, false);
			}
		}
	}

	onStoriesUpdated = (stories, filters) => {
		const newState = {
			stories
		};
		if (filters) {
			Object.assign(newState, {filters});
		}
		this.props.externalAPI.onStoryGridUpdated(stories, this.state.tags,this.state.storyTypes,this.state.headline, filters);
		this.setState(newState);
	}

	onStoryGridUpdated = () => {
		const { externalAPI } = this.props;
		const { filters } = this.state;
		let tags = intersectionWith(this.state.tags, filters, (tag, filter) => {
			return filter.type === 'tag' && tag.canonical === filter.canonical;
		});
		let storyTypes = intersectionWith(this.state.storyTypes, filters, (type, filter) => {
			return filter.type === 'storyType' && type.canonical === filter.canonical;
		});
		const headline = this.state.headline;
		tags = Object.values(tags);
		storyTypes = Object.values(storyTypes);
		externalAPI.onStoryGridUpdated(flatten(this.storyRows), tags, storyTypes, headline, filters);
	}

	onFiltersUpdated = (tags: Array<Tag>, storyTypes: Array<StoryType>) => {
		this.setState({
			tags,
			storyTypes
		});
	}

	getHeadline = () => {
		let headlineStr = this.state.headline || this.translate('Recommended Stories');
		const moreInStr = this.translate('More in ');

		if (!this.state.filters || !this.state.filters.length || this.state.headlineDirty) {
			return headlineStr;
		}
		const headline: Array<string> = [];
		this.state.filters.forEach(filter => {
			const filterName = filter.title;
			if (filterName) {
				headline.push(filterName);
			}
		});

		if (headline.length) {
			headlineStr = moreInStr + headline.join(' & ');
		}

		return headlineStr;
	}

	onHeadlineUpdated = (headlineStr: string, isDirty: boolean) => {
		if (this.props.onHeadlineUpdated) {
			this.props.onHeadlineUpdated(headlineStr, isDirty);
		}
		this.setState({
			headline: headlineStr,
			headlineDirty: isDirty
		});
	}

	onManualHeadlineEdit = (headlineStr: string) => {
		this.onHeadlineUpdated(headlineStr, true);
	}

	onSearch = term => {
		// fetch tags and story types based on search term
		const prefix = term;
		if (!term) {
			return;
		}
		this.setSearchFieldEmpty(false);
		this.debouncedSearch(prefix);
	}

	searchTagsAndStoryTypes = (prefix: string) => {
		const { externalAPI } = this.props;
		return externalAPI.tagSuggestions(prefix).then(suggestions => {
			const tags = [].concat(suggestions.relevantTags, suggestions.relatedTags);
			const storyTypes = suggestions.storyTypes;
			this.onFiltersUpdated(tags, storyTypes);
		}, () => { this.onFiltersUpdated([], []); });
	}

	onTabChange = (index: number) => {
		// log the event
		const { externalAPI } = this.props;
		if (externalAPI.gaTracking) {
			externalAPI.gaTracking({
				tabChange: index ? Views.Manual : Views.Search
			});
		}

		this.resetSearchData();
		const emptyStateObject = this.getEmptyStateObj();

		this.setState(Object.assign({}, emptyStateObject, {
			stories: this.generatePlaceholderPosts(3),
			view: index ? Views.Manual : Views.Search
		}));
	}

	getEmptyStateObj = () => {
		return {
			stories: [],
			filters: [],
			tags: [],
			storyTypes: []
		};
	}

	generatePlaceholderPosts = (num: number) => {
		const fauxStories: Array<FauxPost> = [];
		let storyCount = num || this.props.itemsPerRow;
		const {
			headline,
			defaultBlogId,
			permalink,
			securePermalink
		} = {};
		while (storyCount) {
			const story: FauxPost = {
				id: createPostId(Math.random()),
				headline,
				defaultBlogId,
				permalink,
				securePermalink,
				images: [],
				isFaux: true
			};
			fauxStories.push(story);
			storyCount--;
		}
		return fauxStories;
	}

	resetSearchData = () => {
		this.storyRows = [];
		this.gridLength = this.props.minRows;
		this.ignoreList = [];
		this.storySurplus = [];
	}

	resetBlankState = () => {
		const emptyStateObject = this.getEmptyStateObj();
		this.setState(Object.assign({}, emptyStateObject, {
			stories: this.generatePlaceholderPosts(3)
		}));
	}

	setSearchFieldEmpty = (value: boolean) => {
		this.searchFieldShouldEmpty = value;
	}

	onUpdateStorySuggestions = (filters: Array<*>) => {
		// fetch stories based on filter list
		if (!filters.length) {
			this.resetBlankState();
			return;
		}

		this.setSearchFieldEmpty(true);

		const { externalAPI } = this.props;
		const tags = filters.filter(item => item.type === 'tag').map(t => t.canonical);
		const storyTypes = filters.filter(item => item.type === 'storyType').map(st => st.canonical);

		return externalAPI.storySuggestions(tags, storyTypes).then(suggestions => {
			// temporary safeguard for previous api response json structure
			const storySuggestions = suggestions.items ? suggestions.items : suggestions;
			// filter out stories without headline
			let stories = filter(storySuggestions, story => {
				return story.headline;
			});
			if (!stories.length) {
				stories = this.state.stories;
			} else {
				this.storySurplus = stories;
			}
			this.onStoriesUpdated(stories, filters);
		});
	}

	onEditStory = (key: string) => {
		const { stories } = this.state;

		const storyIndex = findIndex(stories, {id: key});
		if (storyIndex < 0) {
			return;
		}
		const storyToEdit = stories[storyIndex];
		let blankStory = this.generatePlaceholderPosts(1)[0];
		blankStory = Object.assign(blankStory, {
			permalink: storyToEdit.permalink
		});

		stories.splice(storyIndex, 1, blankStory);
		this.onStoriesUpdated(stories);
	}

	onRemoveStory = (key: string) => {
		let { stories } = this.state;

		const storyIndex = findIndex(stories, {id: key});

		if (storyIndex < 0) {
			return;
		}

		if (this.state.view === Views.Manual) {
			const blankStory = this.generatePlaceholderPosts(1);
			stories.splice(storyIndex, 1, blankStory[0]);
		} else {
			const storyToRemove = stories[storyIndex];
			// remove story from state
			const cleanState = filter(stories, story => {
				return story.id !== key;
			});
			// remove story from surplus
			this.storySurplus = filter(this.storySurplus, story => {
				return story.id !== key;
			});
			// add story to ignoreList
			this.ignoreList.push(storyToRemove);

			// fill up state from surplus
			let surplus = differenceBy(this.storySurplus, cleanState, 'id');
			surplus = differenceBy(surplus, this.ignoreList, 'id');
			if (!surplus.length) {
				surplus = this.generatePlaceholderPosts(1)[0];
			}
			stories = [].concat(cleanState, surplus);
		}
		this.onStoriesUpdated(stories);
	}

	onStoryRowsRendered = (storyRows: Array<Array<Post | FauxPost>>) => {
		this.storyRows = storyRows;
		this.gridLength = this.storyRows.length;
		this.onStoryGridUpdated();
	}

	onAddStoryRow = () => {
		let stories;
		const { view } = this.state;

		if (view === Views.Manual) {
			stories = this.generatePlaceholderPosts(this.props.itemsPerRow);
		} else {
			if (!this.storySurplus.length) {
				stories = this.generatePlaceholderPosts(this.props.itemsPerRow);
			} else {
				stories = differenceBy(this.storySurplus, this.state.stories, 'id');
				stories = differenceBy(stories, this.ignoreList, 'id');
			}
		}
		stories = [].concat(this.state.stories, stories);
		if (this.gridLength < this.state.maxRows) {
			this.gridLength++;
		}

		const nextRowLength = this.gridLength > this.props.minRows && this.gridLength < this.state.maxRows ? this.gridLength : this.state.maxRows;
		const maxRowLength = nextRowLength * this.props.itemsPerRow;

		if (stories.length > maxRowLength) {
			stories = stories.splice(0, maxRowLength);
		}
		this.onStoriesUpdated(flatten(stories));
	}

	onRemoveStoryRow = (index: number) => {
		if (this.storyRows.length > this.props.minRows) {
			const stories = [].concat(this.storyRows);
			stories.splice(index, 1);
			this.gridLength--;
			this.onStoriesUpdated(flatten(stories));
		}
	}

	onSetItemsOnPaste = (url: string, key: number) => {
		const { externalAPI } = this.props;
		const { stories } = this.state;

		return externalAPI.resolveItem(url).then((model: Post) => {
			const storyIndex = findIndex(stories, {id: key});
			stories.splice(storyIndex, 1, model);
			this.onStoriesUpdated(stories);
		},
		error => {
			// api response obj
			if (error.error) {
				error = error.error.message;
			}
			this.resetCardStateWithError(error, key);
		});
	}

	resetCardStateWithError = (error: string, key: string) => {
		const { stories } = this.state;
		const storyIndex = findIndex(stories, {id: key});
		const fauxStory = this.generatePlaceholderPosts(1)[0];
		const storyWithErrorState = Object.assign({
			isInvalid: true,
			errorMessage: error
		}, fauxStory);
		stories.splice(storyIndex, 1, storyWithErrorState);
		this.onStoriesUpdated(stories);
	}

	onSetCardSwapState = (draggedItemIndex: number, droppedItemIndex: number) => {
		const stories = [].concat(this.state.stories);
		const dragStoryIndex = findIndex(stories, story => {
			return story.id.toString() === draggedItemIndex;
		});
		const dropStoryIndex = findIndex(stories, story => {
			return story.id.toString() === droppedItemIndex;
		});
		if (dragStoryIndex < 0 || dropStoryIndex < 0) {
			return;
		}
		const tmpEl = stories[dropStoryIndex];
		stories[dropStoryIndex] = stories[dragStoryIndex];
		stories[dragStoryIndex] = tmpEl;
		this.onStoriesUpdated(stories);
	}

	getGridSize = () => {
		if (this.props.maxRows) {
			return this.props.maxRows;
		}
		const savedStoriesLength = this.props.stories ? this.props.stories.length : 0;
		const renderedStoriesLength = this.storyRows.length;
		if (savedStoriesLength && !renderedStoriesLength) {
			this.gridLength = savedStoriesLength / this.props.itemsPerRow;
		}
		return this.gridLength;
	}

	handleClick = () => {
		if (!this.props.isOpen && this.props.toggle) {
			this.props.toggle();
		}
	}

	getSearchFieldState = () => {
		return !this.props.isOpen || this.searchFieldShouldEmpty;
	}

	render() {
		return (
			<div ref={this.props.insideReference} onClick={this.handleClick}>
				<RelatedStories
					onUpdateStorySuggestions={this.onUpdateStorySuggestions}
					onSearch={this.onSearch}
					onTabChange={this.onTabChange}
					onRemoveStory={this.onRemoveStory}
					onEditStory={this.onEditStory}
					onManualHeadlineEdit={this.onManualHeadlineEdit}
					onSetItemsOnPaste={this.onSetItemsOnPaste}
					onStoryRowsRendered={this.onStoryRowsRendered}
					onAddStoryRow={this.onAddStoryRow}
					onRemoveStoryRow={this.onRemoveStoryRow}
					onSetCardSwapState={this.onSetCardSwapState}
					isEmptySearchField={this.getSearchFieldState()}
					hideFilters={!this.props.isOpen}
					isStatic={false}
					headline={this.state.headline}
					maxRows={this.getGridSize()}
					filters={this.state.filters}
					tags={this.state.tags}
					storyTypes={this.state.storyTypes}
					view={this.state.view}
					stories={ this.state.stories } />
			</div>
		);
	}
	static defaultProps = {
		minRows: 1,
		itemsPerRow: 3,
		locale: 'en-US'
	}
}

export default Toggle(RelatedStoriesContainer, { isOutsideClickEnabled: true, isDefaultOpen: false });
