/* @flow */

import { storyTypePageClick } from '../stream/analytics';

const CategorySelectClick = (categoryType: string, selectedText: string) => [storyTypePageClick, `${categoryType} Dropdown click`, selectedText];
const CategoryHeaderClick = (title: string) => [storyTypePageClick, 'Category Header click', title];
const CategoryViewAllClick = (title: string) => [storyTypePageClick, 'Category View All click', title];

export {
	CategorySelectClick,
	CategoryHeaderClick,
	CategoryViewAllClick
};
