/* @flow */

import type { PostId } from 'kinja-magma/models/Id';
import type { EventType, TargetType } from 'kinja-magma/models/Kala';

/*
 * The analytics events used in stream page components, organized as arrays
 * of strings to be used as function params.
 *
 * If there are any dynamic params, the array is instead a function that accepts
 * them and returns an array.
 */
export const storyTypePageClick = 'Story Type page click';
export const kinjaDealsClick = 'Kinja Deals click';
export const frontPageClick = 'Front page click';
export const managePageClick = 'Manage page click';
export const sponsoredContentClick = 'Sponsored Content Click';
export const permalinkClick = 'Permalink page click';

const streamPageAnalyticsCategory = (pageType: string) => {
	switch (pageType) {
		case 'categoryStream':
		case 'sectionedCategoryStream':
			return storyTypePageClick;
		case 'frontpage':
			return frontPageClick;
		case 'manageblog':
			return managePageClick;
		case 'tag':
			return frontPageClick;
		case 'search':
			return frontPageClick;
		case 'permalink':
			return permalinkClick;
	}
};

export const KinjaDealsClick = (index: number, url: string) => [kinjaDealsClick, `position ${index}`, url, {metric23: 1}];
export const PermalinkDropdownClick = ['Permalink meta', 'Tag click', 'Dropdown tag click'];
export const RecommendedInsetClick = [frontPageClick, 'click', 'stream page click - recommended inset'];
export const PermalinkAuthorClick = (authorScreenName: string) => ['Permalink meta', 'Author click', `https://kinja.com/${authorScreenName}`];
export const StreamAuthorClick = (index: number, url: string, pageType: string) =>
	[streamPageAnalyticsCategory(pageType), `stream author click - ${index}`, url, {metric19: 1}];
export const StreamPostClick = (index: number, url: string, pageType: string) => {
	switch (pageType) {
		case 'manageblog':
			return [streamPageAnalyticsCategory(pageType), 'Posts - Story click', url];
		default:
			return [streamPageAnalyticsCategory(pageType), `stream post click - ${index}`, url, {metric19: 1}];
	}
};
export const StreamSponsoredPostClick = (index: number, url: string, pageType: string) =>
	[streamPageAnalyticsCategory(pageType), `stream sponsored post click - ${index}`, url, {metric19: 1}];
export const StreamVerticalClick = (index: number, url: string, pageType: string) =>
	[streamPageAnalyticsCategory(pageType), `stream vertical click - ${index}`, url, {metric19: 1}];
export const StreamStoryTypeClick = (index: number, url: string, pageType: string) =>
	[streamPageAnalyticsCategory(pageType), `stream story type click - ${index}`, url, {metric19: 1}];
export const StreamCategoryClick = (index: number, url: string, pageType: string) =>
	[streamPageAnalyticsCategory(pageType), `stream category click - ${index}`, url, {metric19: 1}];
export const StreamSubcategoryClick = (index: number, url: string, pageType: string) =>
	[streamPageAnalyticsCategory(pageType), `stream subcategory click - ${index}`, url, {metric19: 1}];
export const StreamCommentsClick = (index: number, url: string, pageType: string) =>
	[streamPageAnalyticsCategory(pageType), `stream comments click - ${index}`, url, { metric19: 1}];
export const StoryClick = (categoryTitle: string) => [storyTypePageClick, 'Story click', categoryTitle];
export const KinjaRoundupClick = (url: string) => ['Kinja Roundup', 'Story Click', url];
export const ExternalPostClick = (index: number, url: string) =>
	['External Post Click', `stream post click - ${index}`, url];

export const InstreamNativePromotionClick = (index: number, url: string) =>
	[sponsoredContentClick, `position ${index}`, url, { metric22: 1 }];
export const SidebarNativePromotionClick = (url: string) =>
	[sponsoredContentClick, 'sidebar', url, { 'metric22': 1 }];
export const StreamPostClickKala = (postId: PostId, pageType: string): [EventType, TargetType, PostId] | void => {
	switch (pageType) {
		case 'frontpage':
			return ['STREAM_CLICK', 'POST', postId];
		default:
			return undefined;
	}
};
