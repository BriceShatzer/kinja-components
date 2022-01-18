// @flow

import * as React from 'react';
import styled from 'styled-components';

import CategorySelect from './category-select';
import media from '../../../style-utils/media';

import type { StoryTypeSelectorsProps } from '../types';

const CategorySelectWrapper = styled.div`
	input,
	span {
		font-size: 14px;
	}

	flex: 1;
	padding: 0 ${props => props.theme.columnPadding};
`;

const DisplayCategoryNav = styled.div`
	margin: 0 -16px;
	min-height: calc(36px + 2rem);
	display: flex;

	${media.smallOnly`
		flex-direction: column;
		${props => props.hasTwoDropdowns && `
			min-height: calc(36px * 2 + 1rem + 2rem);
		`}
	`}
`;

const StoryTypeSelectors = (props: StoryTypeSelectorsProps) => {
	const { category, categories, subcategories, storyType } = props;

	const hasCategories = Boolean(categories && categories.length > 0);
	const hasSubcategories = Boolean(subcategories && subcategories.length > 0);

	return (
		(hasCategories || hasSubcategories) && (
			<DisplayCategoryNav
				hasTwoDropdowns={category}
				className='js_display-category-nav'
				id='storytype-navigation'
			>
				{hasCategories && (
					<CategorySelectWrapper className='js_st-select-category'>
						<CategorySelect category={category} categories={categories} storyType={storyType} selectType="Categories" />
					</CategorySelectWrapper>
				)}
				{hasSubcategories && (
					<CategorySelectWrapper
						className='js_st-select-subcategory'>
						<CategorySelect category={category} categories={subcategories} storyType={storyType} selectType="Subcategories" />
					</CategorySelectWrapper>
				)}
			</DisplayCategoryNav>
		)
	);
};

export default StoryTypeSelectors;
