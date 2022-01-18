// @flow

const PermalinkPageClick = 'Permalink page click';
const PermalinkMeta = 'Permalink meta';
const PermalinkPreview = 'Read Full Article from Preview';

export const PermalinkPreviewCTAClick = (url: string) => [PermalinkPageClick, `${PermalinkPreview} - CTA click`, url];
export const PermalinkPreviewStoryClick = (url: string) => [PermalinkPageClick, `${PermalinkPreview} - Story click`, url];
export const PermalinkPreviewCommentsClick = (url: string) => [PermalinkPageClick, `${PermalinkPreview} - Comments click`, url];

export const PermalinkDropdownClick = [PermalinkMeta, 'Tag click', 'Dropdown tag click'];
export const PermalinkAuthorClick = (authorScreenName: string) => [PermalinkMeta, 'Author click', `https://kinja.com/${authorScreenName}`];
export const PermalinkHeaderClick = (url: string, isSecondScroll?: boolean) => {
	if (isSecondScroll) {
		return PermalinkPreviewStoryClick(url);
	} else {
		return [PermalinkPageClick, `${PermalinkPageClick} - post header`, 'standard'];
	}
};
export const PermalinkStoryTypeClick = (storyTypeUrl: string) => [PermalinkMeta, 'Story type click', storyTypeUrl];
export const PermalinkCommentClick = (url: string, isSecondScroll?: boolean) => {
	if (isSecondScroll) {
		return PermalinkPreviewCommentsClick(url);
	} else {
		return [PermalinkMeta, 'Comment count click'];
	}
};
export const RelatedPostClick = (url: string, index: number, sum: number, withAuthor?: boolean) =>
	['Related Posts Module', `Position ${index} of ${sum}${withAuthor ? ' - author click' : ''}`, url, {metric18: 1}];
export const PopularPostClick = (url: string, index: number, isRoundup?: boolean) =>
	['Popular stories click', `${isRoundup ? 'Kinja Roundup' : 'popular'} - position ${index}`, url, {metric17: 1}];
