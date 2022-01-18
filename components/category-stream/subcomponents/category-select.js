/* @flow */

import * as React from 'react';
import { CategorySelectClick } from '../analytics';
import { Select, Option } from '../../form/select';
import Analytics from '../../hoc/analytics';
import type { CategorySelectProps } from '../types';
import type { AnalyticsInjectedProps }  from '../../hoc/analytics';

export const makeUrl = (path: string): string => `/c/${path}`;

const CategorySelect = ({
	category,
	storyType,
	categories,
	selectType,
	redirectHandler,
	ga
}: CategorySelectProps & AnalyticsInjectedProps) => {

	const allValuesString = `All ${selectType}`;
	const defaultValue = makeUrl(storyType.path);

	const onChange = (path: string) => {
		// Get category name
		const selectedCategory = categories && categories.find(c => `/c/${c.path}` === path);
		const selectedCategoryTitle = selectedCategory && selectedCategory.title || '';
		// Send GA event
		ga(...CategorySelectClick(selectType === 'Categories' ? 'Category' : 'Subcategory', selectedCategoryTitle));
		// Redirect to new category
		redirectHandler && redirectHandler(path);
	};

	return (
		<Select value={category ? makeUrl(category.path) : defaultValue} predictive onChange={onChange}>
			<Option value={defaultValue} stringRepresentation={allValuesString}>{allValuesString}</Option>
			{categories && categories.map(c => (
				<Option key={c.canonical} value={makeUrl(c.path)} stringRepresentation={c.title}>
					{c.title}
				</Option>
			))}
		</Select>
	);
};

export default Analytics(CategorySelect);
