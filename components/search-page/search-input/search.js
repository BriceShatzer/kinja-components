/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import SearchBar from './search-bar';
import Suggestions from './search-suggestions';
import { DropdownWrapper, TriggerContainer } from 'kinja-components/components/dropdown';
import type { BlogThemeName } from 'kinja-components/components/theme/theme';

export const SearchWrapper = styled.div`
	${TriggerContainer} {
		display: block;
	}
	${DropdownWrapper} {
		z-index: 99;
	}
`;

type Props = {
	blogTheme: BlogThemeName,
	clearSuggestions: () => void,
	inputValue: string,
	isEmptySearchField: boolean,
	isResultsPage: boolean,
	onActionableSearch: (query: string) => void,
	onFilterIconClick: () => void,
	onManualSearch: (query: string) => void,
	onSuggestionSelected: (suggestion: string) => Promise<*>,
	onTyping: (query: string) => void,
	resetSearchBar: () => void,
	suggestions: Array<*>
}

type State = {
	currentIndex: number,
	inputValue: string
}

class Search extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			currentIndex: -1,
			inputValue: this.props.inputValue || ''
		};
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (prevProps.inputValue !== this.props.inputValue && prevState.inputValue !== this.props.inputValue) {
			this.setState({
				inputValue: this.props.inputValue
			}, () => {
				this.onManualSearch(this.state.inputValue);
			});
		}
		if (prevProps.suggestions !== this.props.suggestions && this.state.currentIndex !== 0) {
			this.setState({
				currentIndex: -1
			});
		}
	}
	suggestionSelected = (suggestion: string) => {
		this.setState({
			inputValue: suggestion
		}, () => {
			this.props.onManualSearch(suggestion);
		});
	}
	clearSuggestions = () => {
		this.props.clearSuggestions();
	}

	onSearch = (query: string) => {
		if (this.props.onTyping && query !== this.props.inputValue) {
			this.props.onTyping(query);
		}
	}
	onManualSearch = (query: string) => {
		if (this.state.currentIndex >= 0) {
			const indexedQuery = this.props.suggestions[this.state.currentIndex];
			this.setState({
				inputValue: indexedQuery
			}, () => {
				this.props.onManualSearch(indexedQuery);
			});
		} else {
			if (query) {
				this.props.onManualSearch(query);
			}
		}
	}
	onInputChanged = (value: string) => {
		this.setState({
			inputValue: value
		}, () => {
			this.onSearch(value);
		});
	}
	onActionableSearch = () => {
		this.props.onActionableSearch(this.state.inputValue);
	}
	onResetSearchBar = () => {
		this.props.resetSearchBar();
	}

	onWalkDropDown = (direction: string) => {
		let newIndex;
		if (direction === 'ArrowDown') {
			newIndex = this.props.suggestions.length - 1 > this.state.currentIndex ? this.state.currentIndex + 1 : this.state.currentIndex;
		} else if (direction === 'ArrowUp') {
			newIndex = this.state.currentIndex > 0 ? this.state.currentIndex - 1 : this.state.currentIndex;
		}
		this.setState({
			currentIndex: newIndex
		});
	}
	searchInput = () => {
		return <SearchBar
			blogTheme={this.props.blogTheme}
			clearSuggestions={this.clearSuggestions}
			inputValue={this.state.inputValue}
			isEmptySearchField={this.props.isEmptySearchField}
			isResultsPage={this.props.isResultsPage}
			onActionableSearch={this.onActionableSearch}
			onFilterIconClick={this.props.onFilterIconClick}
			onInputChanged={this.onInputChanged}
			onManualSearch={this.onManualSearch}
			onResetSearchBar={this.onResetSearchBar}
			onSearch={this.onSearch}
			walkDropDown={this.onWalkDropDown}
			focusOnMount
		/>;
	};
	render() {
		return (
			<SearchWrapper>
				<Suggestions
					highlightIndex={this.state.currentIndex}
					trigger={this.searchInput()}
					suggestions={this.props.suggestions}
					handleSelectedSuggestion={this.suggestionSelected}
					clearSuggestions={this.clearSuggestions}
				/>
			</SearchWrapper>
		);
	}
}

export default Search;
