/* eslint-disable flowtype/no-types-missing-file-annotation, react/prop-types */

import { debounce } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import Theme from 'kinja-components/components/theme';
import type { BlogId } from '../models/Id';
import Post from 'kinja-magma/models/Post';

import Search from './search';
import RecentSearches from '../recent-searches';
import { getItem, removeItem, setItem } from 'kinja-components/utils/localStorage';

import type { ExternalAPI } from '../types';
import type { BlogThemeName } from 'kinja-components/components/theme/theme';

const SearchController = styled.div`
	width: 100%;
`;

type Props = {
	blogTheme: BlogThemeName,
	inputValue?: string,
	isResultsPage: boolean,
	recentSearches?: Array<string>,
	suggestions?: Array<string>,
	selectedBlogIds?: Array<BlogId>,
	onFilterIconClick: () => void,
	onSearch?: () => void,
	resultsHandler: (results: Array<Post>) => void,
	externalAPI: ExternalAPI
}

type State = {
	recentSearches: Array<string>,
	suggestions: Array<string>
}

class SearchCtrl extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			suggestions: this.props.suggestions || [],
			recentSearches: this.props.recentSearches || []
		};
		this.debouncedSearch = debounce(this.searchSuggestions, 300);
		this.kinjaSearch = 'kinjaSearch';
		this.isEmptySearchField = false;
	}

	searchSuggestions = (query: string) => {
		if (!query) {
			return;
		}

		const { externalAPI, selectedBlogIds } = this.props;

		return externalAPI.fetchSuggestions(selectedBlogIds, query).then(suggestions => {
			const processedSuggestions = suggestions.map(suggestion => {
				return suggestion.suggestion;
			});
			this.setState({
				suggestions: processedSuggestions
			});
		});
	}

	onTyping = (query: string) => {
		this.isEmptySearchField = false;
		this.props.onTyping(query);
		this.debouncedSearch(query);
	}

	onSuggestionSelected = (query: string, forceNewSearch: boolean = false) => {
		if (!this.props.isNewSearch && !forceNewSearch) {
			return;
		}
		this.props.onUpdateSearchInput(query);
		this.props.searchResults(query);
		this.storeNewRecentSearch(query);
		this.clearSuggestions();
	}

	onManualSearch = (query: string) => {
		this.onSuggestionSelected(query);
	}

	onActionableSearch = (query: string) => {
		this.onSuggestionSelected(query);
	}

	noop = () => {}

	clearSuggestions = (callback: function = this.noop) => {
		this.setState({
			suggestions: []
		}, callback);
	}

	resetSearchBar = () => {
		this.clearSuggestions(this.props.onUpdateSearchInput(''));
	}

	storeNewRecentSearch = (query: string) => {
		if (!query) {
			return;
		}
		const storedSearch = JSON.parse(getItem(this.kinjaSearch) || '[]');
		const hasStoredAlready = Boolean(storedSearch.find(search => search === query));
		if (!hasStoredAlready) {
			setItem(this.kinjaSearch, JSON.stringify(storedSearch.concat(query.replace(/[\W_]+/g,' ').substring(0, 50))));
		}
	}

	onRecentSearchesClear = () => {
		this.setState({
			recentSearches: []
		}, () => {
			removeItem(this.kinjaSearch);
		});
	}

	render() {
		return (
			<Theme blog={this.props.blogTheme}>
				<SearchController>
					<Search
						blogTheme={this.props.blogTheme}
						inputValue={this.props.inputValue}
						isResultsPage={this.props.isResultsPage}
						suggestions={this.state.suggestions}
						onTyping={this.onTyping}
						onManualSearch={this.onManualSearch}
						onActionableSearch={this.onActionableSearch}
						onFilterIconClick={this.props.onFilterIconClick}
						onSuggestionSelected={this.onSuggestionSelected}
						clearSuggestions={this.clearSuggestions}
						resetSearchBar={this.resetSearchBar}
						isEmptySearchField={this.isEmptySearchField}
					/>
					{this.state.recentSearches && this.state.recentSearches.length && !this.props.isResultsPage
						? <RecentSearches
							keywords={this.state.recentSearches}
							onClear={this.onRecentSearchesClear}
							onClick={(keyword: string) => this.onSuggestionSelected(keyword, true)}
							theme={this.props.blogTheme}
						/> : null
					}
				</SearchController>
			</Theme>
		);
	}
}

export default SearchCtrl;
