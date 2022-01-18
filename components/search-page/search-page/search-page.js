/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import { DateTime } from 'luxon';

import Theme from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import { gridValue } from 'kinja-components/components/grid-utils';
import PostList, { Container as PostListContainer } from '../post-list';
import PopularSearch, { Container as PopularSearchContainer } from '../popular-search';
import { BlogFilter, DateFilter } from '../filter';
import { Container as DateFilterContainer } from '../filter/date-filter';
import Modal, { ChildrenWrapper, Close, ScrollableContainer } from 'kinja-components/components/modal/modal';
import { IconWrapper } from 'kinja-components/components/icon19/icon19';
import Settings from 'kinja-components/components/icon19/Settings';
import SearchCtrl from '../search-input/searchCtrl';
import { getBackendQuery, getUrl } from 'kinja-magma/controllers/search/searchQuery';
import Topics from '../search-results/topics';
import Authors from '../search-results/authors';
import { Container as RecentSearchesContainer } from '../recent-searches';
import Analytics, { type AnalyticsInjectedProps } from '../../hoc/analytics';
import { LdJson, forSearchResultStream } from 'kinja-components/components/seo/structured-data';

import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';

import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type { BlogFilterObject } from '../types';
import type { BlogId } from 'kinja-magma/models/Id';
import type { BlogThemeName } from 'kinja-components/components/theme/theme';
import type { DateFilterObject } from '../types';
import type { Locale } from 'kinja-magma/models/Locale';
import type { PopularSearches } from '../types';
import type { PageType } from 'kinja-magma/models/PageType';
import type { PaginationJSON } from 'kinja-magma/models/Pagination';
import type { ExternalAPI } from '../types';
import type { Author } from '../search-results/author-card';
import type { Topic } from '../search-results/topics';

const SearchMainWrapper = styled.div`
	width: 100%;
`;

const StyledSearch = styled.div``;

const MainContent = styled.div`
	order: 2;
`;

const FilterTitle = styled.span`
	font-size: 20px;
	line-height: 26px;
`;

const FilterTitleWrapper = styled.div`
	display: flex;
	align-items: center;

	${IconWrapper} {
		margin-right: 6px;
	}
`;

const SideContent = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 20px;

	${PopularSearchContainer}:first-child {
		border-right: 1px solid ${({ theme }) => theme.color.midgray};
	}

	${PopularSearchContainer}:last-child {
		margin-left: -1px;
	}

	${({ isResultsPage }) => isResultsPage && css`
		display: none;
	`}
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const TopicsContainer = styled.div`
	margin-bottom: 2rem;
	max-width: 800px;
`;

const AuthorContainer = styled.div`
	margin-bottom: 2rem;
	max-width: 800px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	padding-top: 16px;

	${media.smallOnly`
		${RecentSearchesContainer} {
			margin: 0 ${gridValue.small('-1g')};
		}

		${StyledSearch} {
			width: ${gridValue.small('6c')};
		}

		${PopularSearchContainer} {
			width: ${gridValue.small('3c0.5g')};
		}

		${PopularSearchContainer}:first-child {
			padding-right: ${gridValue.small('1g')};
		}

		${PopularSearchContainer}:last-child {
			padding-left: ${gridValue.small('1g')};
		}

		${ContentContainer} {
			padding: 0 ${gridValue.small('1g')};
		}
	`}

	${media.mediumOnly`
		${RecentSearchesContainer} {
			margin: 0 ${gridValue.medium('-1g')};
		}

		${StyledSearch} {
			width: ${gridValue.medium('6c')};
		}

		${PopularSearchContainer} {
			width: ${gridValue.medium('3c0.5g')};
		}

		${MainContent} {
			width: ${gridValue.medium('6c')};
		}

		${PopularSearchContainer}:first-child {
			padding-right: ${gridValue.medium('1g')};
		}

		${PopularSearchContainer}:last-child {
			padding-left: ${gridValue.medium('1g')};
		}

		${SideContent} {
			width: ${gridValue.medium('6c')};
		}

		${ContentContainer} {
			padding: 0 ${gridValue.medium('1g')};
		}
	`}

	${media.largeOnly`
		${StyledSearch} {
			width: ${gridValue.large('8c')};
		}

		${MainContent} {
			margin-right: ${gridValue.large('1g')};
			width: ${gridValue.large('5c')};
		}

		${SideContent} {
			width: ${gridValue.large('3c')};
		}
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('10c')};

		${StyledSearch} {
			width: ${gridValue.xlarge('10c')};
		}

		${MainContent} {
			margin-right: ${gridValue.xlarge('1g')};
			width: ${gridValue.xlarge('7c')};
		}

		${SideContent} {
			width: ${gridValue.xlarge('3c')};
		}
	`}

	${media.xxlargeUp`
		width: ${gridValue.xxlarge('10c')};

		${StyledSearch} {
			width: ${gridValue.xxlarge('10c')};
		}

		${MainContent} {
			margin-right: ${gridValue.xxlarge('1g')};
			width: ${gridValue.xxlarge('7c')};
		}

		${SideContent} {
			width: ${gridValue.xxlarge('3c')};
		}
	`}

	${PostListContainer} {
		width: 100%;
		max-width: 800px;
	}

	&& ${ChildrenWrapper} {
		width: 100%;
		height: 100%;
		justify-content: flex-start;
	}

	${ScrollableContainer} {
		height: 100%;
		padding: 34px 16px;
	}

	${DateFilterContainer} {
		margin-top: 32px;
	}

	${Close} {
		z-index: 100;
	}

	${FilterTitleWrapper} {
		margin-bottom: 27px;
	}

	${media.mediumDown`
		${SideContent} {
			justify-content: center;
		}

		${RecentSearchesContainer} {
			width: 100vw;
			margin-bottom: 16px;
		}
	`}

	${media.largeUp`
		padding: 40px 16px;

		${ContentContainer} {
			flex-direction: row;
		}

		${DateFilterContainer} {
			margin-top: 16px;
		}

		${SideContent} {
			order: 2;
			display: flex;
			flex-direction: column;

			${FilterTitleWrapper} {
				margin-bottom: 8px;
			}
		}

		${({ blog }) => blog && css`
			${PopularSearchContainer}:first-child {
				margin-bottom: 28px;
				border-right-color: ${({ theme }) => theme.color.primary};
			}
		`}
	`}
`;

type Props = {
	blog: Blog,
	canonicalLink: string,
	dateEnd?: ?number,
	dateFilter?: ?string,
	dateStart?: ?number,
	hasResults: boolean,
	isNetwork: boolean,
	locale: Locale,
	networkBlogs: Array<Blog>,
	networkName: string,
	numberOfResults?: number,
	pageType: PageType,
	popularSearches: PopularSearches,
	posts: Array<Post>,
	topics?: Array<Topic>,
	_authors?: Array<Author>,
	queryString?: ?string,
	simpleEmbiggen: boolean,
	selectedBlogIds?: Array<BlogId>,
	storiesFrom?: Array<string>,
	recentSearches?: Array<string>,
	startIndex?: ?number,
	hasMoreResults: boolean,
	onSearch?: (query: string) => void,
	externalAPI?: ExternalAPI,
	timestamp?: number
};

type DefaultProps = {
	locale: Locale,
	pageType: PageType
}

type State = {
	blog: Blog,
	dateEnd: ?number,
	dateFilter: ?string,
	dateStart: ?number,
	hasResults: boolean,
	isGmgBlog: boolean,
	isFiltersOpen: boolean,
	isNetwork: boolean,
	isResultsPage: boolean,
	networkBlogs: Array<Blog>,
	networkName: string,
	numberOfResults: number,
	posts: Array<Post>,
	topics: Array<Topic>,
	authors: Array<Author>,
	searchInput: string,
	selectedBlogIds: Array<BlogId>,
	simpleEmbiggen: boolean,
	storiesFrom?: Array<string>,
	recentSearches: Array<string>,
	startIndex?: number,
	hasMoreResults: boolean,
	showNoresultMessage: boolean,
	isLoading: boolean,
	isNewSearch: boolean,
	timestamp: number
};


class SearchPage extends React.Component<Props & AnalyticsInjectedProps, State> {
	static defaultProps: DefaultProps = {
		locale: 'en-US',
		pageType: 'search'
	};

	state = {
		authors: this.props._authors || [],
		blog: this.props.blog,
		dateEnd: this.props.dateEnd,
		dateFilter: this.props.dateFilter,
		dateStart: this.props.dateStart,
		hasMoreResults: this.props.hasMoreResults || false,
		hasResults: this.props.posts.length > 0,
		isFiltersOpen: false,
		isGmgBlog: this.props.blog ? this.props.blog.isGmgBlog : false,
		isNetwork: this.props.isNetwork,
		isResultsPage: Boolean(this.props.queryString),
		networkBlogs: this.props.networkBlogs,
		networkName: this.props.networkName || '',
		numberOfResults: this.props.numberOfResults || 0,
		posts: this.props.posts,
		recentSearches: this.props.recentSearches || [],
		searchInput: this.props.queryString || '',
		selectedBlogIds: this.props.selectedBlogIds || [],
		simpleEmbiggen: this.props.simpleEmbiggen,
		startIndex: this.props.startIndex || 0,
		storiesFrom: this.props.storiesFrom,
		topics: this.props.topics || [],
		showNoresultMessage: this.props.posts.length <= 0 || false,
		isLoading: false,
		isNewSearch: false,
		timestamp: this.props.timestamp || Date.now()
	}

	onMoreStoriesClick = () => {
		this.setState({
			isLoading: true,
			timestamp: Date.now()
		}, () => {
			const searchQuery = this.getSearchQuery();
			this.searchResults(searchQuery, true, this.state.startIndex);
		});
		this.props.ga('Front page click', 'More stories click');
	}

	onKeywordClick = (keyword: string, blog?: ?Blog) => {
		const timestamp = Date.now();
		if (!blog) {
			this.setState({
				isNewSearch: true,
				isResultsPage: true,
				searchInput: keyword,
				selectedBlogIds: this.state.networkBlogs.map(nBlog => nBlog.id),
				startIndex: 0,
				showNoresultMessage: false,
				timestamp
			});
		} else {
			this.setState({
				isNewSearch: true,
				isResultsPage: true,
				blog,
				searchInput: keyword,
				selectedBlogIds: [blog.parentId || blog.id],
				startIndex: 0,
				showNoresultMessage: false,
				timestamp
			});
		}
	}

	onSearch = () => {
		const urlParams = this.getUrlParams();

		if (this.props.onSearch) {
			this.props.onSearch(urlParams);
		}
	}

	onBlogFilterChange = (blogFilterObject: BlogFilterObject) => {
		this.setState({
			isNetwork: blogFilterObject.isNetwork,
			selectedBlogIds: blogFilterObject.checked,
			startIndex: 0,
			timestamp: Date.now()
		}, () => {
			const searchQuery = this.getSearchQuery();
			const urlParams = this.getUrlParams();

			if (this.props.onSearch) {
				this.props.onSearch(urlParams);
				this.searchResults(searchQuery);
			}
		});
	}

	onDateFilterChange = (dateFilterObject: DateFilterObject) => {
		this.setState({
			dateEnd: dateFilterObject.dateEnd,
			dateStart: dateFilterObject.dateStart,
			dateFilter: dateFilterObject.checked,
			startIndex: 0,
			timestamp: Date.now()
		}, () => {
			const searchQuery = this.getSearchQuery();
			const urlParams = this.getUrlParams();

			if (this.props.onSearch) {
				this.props.onSearch(urlParams);
				this.searchResults(searchQuery);
			}
		});
	}

	onQuerySearch = async () => {
		this.setState({
			selectedBlogIds: !this.state.isResultsPage
				? [this.state.blog.parentId || this.state.blog.id]
				: this.state.selectedBlogIds,
			timestamp: Date.now()
		}, () => {
			const searchQuery = this.getSearchQuery();
			this.searchResults(searchQuery, false, 0);
		});
	}

	onFilterIconClick = () => {
		this.setState({
			isFiltersOpen: true
		});
	}

	onFilterModalClose = () => {
		this.setState({
			isFiltersOpen: false
		});
	}

	onAuthorSelected = (screenName: string) => {
		const { externalAPI } = this.props;
		if (!externalAPI) {
			return;
		}
		externalAPI.onRedirectToUrl(`https://kinja.com/${screenName}`);
	}

	onTopicSelected = (item: Topic) => {
		const { networkBlogs, externalAPI } = this.props;
		if (!externalAPI) {
			return;
		}
		const { blogId, source, suggestion } = item;
		const selectedBlog = networkBlogs.find(nBlog => blogId === nBlog.id);
		if (!selectedBlog) {
			return;
		}
		const { canonicalHost } = selectedBlog;
		const sourceUrlComponent = source === 'Tag' ? 'tag' : 'c';
		const redirectUrl = `https://${canonicalHost}/${sourceUrlComponent}/${suggestion}`;
		externalAPI.onRedirectToUrl(redirectUrl);
	}

	resultsHandler = (posts: Array<Post>, pagination: PaginationJSON, topics: Array<Topic>, authors: Array<Author>, appendPosts: boolean) => {
		const { total, next } = pagination;
		const hasMoreResults = Boolean(next && next.startIndex);
		const startIndex = next && next.startIndex ? next.startIndex : 0;
		const { networkBlogs } = this.props;
		const newPosts = appendPosts ? [].concat(this.state.posts, posts) : posts;

		const isAllBlogsSelected = this.state.selectedBlogIds.length === this.state.networkBlogs.length;
		let storiesFrom = isAllBlogsSelected
			? []
			: this.state.selectedBlogIds.map((selectedBlogId: BlogId) => {
				const postBlog = networkBlogs.find(nBlog => nBlog.id === selectedBlogId);
				const displayName = postBlog ? postBlog.displayName : '';
				return displayName;
			});
		if (!this.state.isGmgBlog) {
			storiesFrom = [this.state.blog.displayName];
		}

		this.setState({
			posts: newPosts,
			numberOfResults: total,
			storiesFrom,
			topics,
			authors,
			hasMoreResults,
			hasResults: newPosts.length > 0,
			startIndex,
			showNoresultMessage: newPosts.length <= 0,
			isLoading: false,
			isNewSearch: false,
			isResultsPage: true
		}, () => {
			this.onSearch();
		});
	}


	searchResults = async (backendQuery: string, appendPosts: boolean = false, newSearchIndex?: number = 0) => {
		if (!backendQuery) {
			return;
		}

		const { externalAPI } = this.props;
		if (!externalAPI || !externalAPI.fetchSearchResults) {
			return;
		}

		const searchIndex = newSearchIndex ? newSearchIndex : this.state.startIndex;
		const { searchInput, selectedBlogIds } = this.state;

		const results = await externalAPI.fetchSearchResults(backendQuery, searchIndex, this.state.timestamp);
		const posts = results.items;
		const pagination = results.pagination.toJSON();
		const topics = await externalAPI.fetchTopicsSearchResults(searchInput, selectedBlogIds);
		const authors = await externalAPI.fetchUserSearchResults(searchInput, selectedBlogIds);
		this.resultsHandler(posts, pagination, topics, authors, appendPosts);
	}

	onUpdateSearchInput = (query: string) => {
		this.setState({
			isNewSearch: true,
			isResultsPage: true,
			searchInput: query,
			showNoresultMessage: false,
			startIndex: 0,
			timestamp: Date.now()

		});
	}

	onTyping = (query: string) => {
		this.setState({
			searchInput: query,
			startIndex: 0,
			showNoresultMessage: false,
			isNewSearch: true
		});
	}

	onPostDividerClick = () => {
		const { externalAPI } = this.props;
		if (!externalAPI) {
			return;
		}

		this.setState({
			selectedBlogIds: this.state.networkBlogs.map(nBlog => nBlog.id),
			showNoresultMessage: false
		}, () => {
			externalAPI.scrollToTop();
		});
	}

	getUrlParams = () => getUrl({
		blogId: this.state.selectedBlogIds,
		dateEnd: this.state.dateEnd,
		dateFilter: this.state.dateFilter,
		dateStart: this.state.dateStart,
		isNetwork: this.state.isNetwork,
		query: this.state.searchInput,
		timestamp: this.state.timestamp
	})

	getSearchQuery = () => getBackendQuery({
		blogId: this.state.selectedBlogIds,
		dateEnd: this.state.dateEnd,
		dateStart: this.state.dateStart,
		isNetwork: this.state.isNetwork,
		query: this.state.searchInput,
		timestamp: this.state.timestamp
	})

	getSideContent({ popularSearches }: Props, { blog, isResultsPage, networkBlogs, networkName }: State, blogTheme: BlogThemeName) {
		if (isResultsPage) {
			const translate = createTranslate(translations, this.props.locale);

			return (
				<React.Fragment>
					<FilterTitleWrapper>
						<Settings />
						<FilterTitle>{translate('Filter results')}</FilterTitle>
					</FilterTitleWrapper>
					{(this.state.isGmgBlog) &&
						<BlogFilter
							blogTheme={blogTheme}
							blogs={networkBlogs}
							checked={this.state.selectedBlogIds}
							defaultBlogId={blog.id}
							isNetwork={this.state.isNetwork}
							onChange={this.onBlogFilterChange}
						/>
					}
					<DateFilter
						blogTheme={blogTheme}
						defaultChecked={this.state.dateFilter}
						onChange={this.onDateFilterChange}
						currentTimemillis={DateTime.local().toMillis()}
						timezone={DateTime.local().toFormat('z')}
						{...this.state.dateStart ? { dateStart: this.state.dateStart } : null}
						{...this.state.dateEnd ? { dateEnd: this.state.dateEnd } : null}
					/>
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				{Boolean(popularSearches.blogPopularSearches && popularSearches.blogPopularSearches.length) &&
					<PopularSearch
						blogName={blog.displayName}
						keywords={popularSearches.blogPopularSearches}
						onClick={keyword => { this.onKeywordClick(keyword, blog); }}
						theme={blogTheme}
					/>
				}
				{Boolean(popularSearches.networkPopularSearches && popularSearches.networkPopularSearches.length) &&
					<PopularSearch
						blogName={networkName}
						keywords={popularSearches.networkPopularSearches}
						onClick={this.onKeywordClick}
						theme="default"
					/>
				}
			</React.Fragment>
		);
	}

	render() {
		const {
			blog,
			hasMoreResults,
			hasResults,
			isFiltersOpen,
			isGmgBlog,
			isLoading,
			isNewSearch,
			isResultsPage,
			networkBlogs,
			networkName,
			numberOfResults,
			posts,
			recentSearches,
			searchInput,
			selectedBlogIds,
			showNoresultMessage,
			storiesFrom
		} = this.state;

		const blogTheme = blog.blogTheme;
		const searchCtrlProps = {
			blogId: blog.id,
			selectedBlogIds,
			blogTheme,
			inputValue: searchInput,
			isNewSearch,
			isResultsPage,
			onFilterIconClick: this.onFilterIconClick,
			onTyping: this.onTyping,
			resultsHandler: this.resultsHandler,
			recentSearches,
			onUpdateSearchInput: this.onUpdateSearchInput,
			searchResults: this.onQuerySearch,
			externalAPI: this.props.externalAPI
		};

		return (
			<SearchMainWrapper className='js_search_page'>
				<Theme blog={blogTheme}>
					<Container blog={blog}>
						<StyledSearch>
							<SearchCtrl {...searchCtrlProps} />
						</StyledSearch>
						<ContentContainer>
							<LdJson contents={forSearchResultStream({
								posts,
								name: blog.name,
								headline: searchInput,
								orgUrl: `https://${blog.canonicalHost}`,
								logo: blog.properties.logoLink
							})} />
							<MainContent>
								{this.state.topics.length > 0 &&
									<TopicsContainer>
										<Topics blogTheme={blogTheme}
											blogs={this.props.networkBlogs}
											redirectHandler={this.onTopicSelected}
											items={this.state.topics} />
									</TopicsContainer>
								}
								{this.state.authors.length > 0 &&
									<AuthorContainer>
										<Authors blogTheme={blogTheme} redirectHandler={this.onAuthorSelected} items={this.state.authors} />
									</AuthorContainer>
								}
								<PostList
									blog={blog}
									isLoading={isLoading}
									showNoresultMessage={showNoresultMessage}
									selectedBlogIds={selectedBlogIds}
									networkBlogs={networkBlogs}
									blogTheme={blogTheme}
									dividerIndex={isGmgBlog ? 10 : null}
									hasResults={hasResults}
									hasMoreResults={hasMoreResults}
									networkName={networkName}
									numberOfResults={numberOfResults}
									onDividerClick={this.onPostDividerClick}
									onMoreStoriesClick={this.onMoreStoriesClick}
									pageType={this.props.pageType}
									posts={posts}
									storiesFrom={storiesFrom}
									simpleEmbiggen={this.props.simpleEmbiggen}
									{...!hasResults ? { searchTerms: searchInput } : null}
								/>
							</MainContent>

							<SideContent isResultsPage={isResultsPage}>
								{this.getSideContent(this.props, this.state, blogTheme)}
							</SideContent>
						</ContentContainer>

						{/* FILTER MODAL */}
						{isFiltersOpen &&
							<Modal
								fullscreen
								scrollable
								isOpen
								onClose={this.onFilterModalClose}>
								{this.getSideContent(this.props, this.state, blogTheme)}
							</Modal>
						}
					</Container>
				</Theme>
			</SearchMainWrapper>
		);
	}
}

export default Analytics(SearchPage);
