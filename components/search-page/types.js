/* @flow */

import type { BlogId } from 'kinja-magma/models/Id';

export type ExternalAPI = {
	fetchSearchResults: (query: string, searchIndex?: number, timestamp: number) => Promise<*>,
	fetchSuggestions: (blogIds?: Array<BlogId>, query: string) => Promise<*>,
	fetchTopicsSearchResults: (query: string, blogIds?: Array<BlogId>) => Promise<*>,
	fetchUserSearchResults: (query: string, blogIds?: Array<BlogId>) => Promise<*>,
	onRedirectToUrl: (url: string) => void,
	scrollToTop: () => void
};

export type BlogFilterObject = {
	checked: Array<BlogId>,
	isNetwork: boolean
}

export type DateFilterObject = {
	checked: string,
	dateStart: number,
	dateEnd: ?number
}

export type PopularSearches = {
	blogPopularSearches: Array<string>,
	networkPopularSearches: Array<string>
}