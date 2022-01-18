// @flow

import type { ScreenConfig, GridValueExpression } from './types';

const VALUE_REGEX = /(-)?(?:(\d+)c)?(?:((?:\d+\.)?\d+)g)?/;

/*
	Parses a 'value' expression, for internal use only.
	A custom format is used for expressions, passed as a single string instead of separate arguments.
	This was chosen because it improves readability and maintainability of CSS using
	these functions, because:
		* it takes less characters to type, it's easier to read
		* the values in the expression are always in the same order, and are optional
		* dealing with negative values is easier this way
		* it looks and feels more like an actual CSS unit
*/
export const parse = (valueExpr: GridValueExpression): {
	negative: boolean,
	columns: number,
	gutters: number
} => {
	const [, prefix, columns, gutters] = valueExpr.match(VALUE_REGEX) || [];
	return {
		negative: Boolean(prefix),
		columns: columns ? parseInt(columns) : 0,
		gutters: gutters ? (Math.round(100 * parseFloat(gutters)) / 100) : 0
	};
};

/*
	Helper function used by value only, for internal use only.
*/
export const gutterExpr = (gutters: number, gutterSize: number, negative: boolean) => {
	const val = negative
		? (1 - gutters) * gutterSize
		: (gutters - 1) * gutterSize;

	if (val > 0) {
		return ` + ${val}px`;
	} else if (val < 0) {
		return ` - ${Math.abs(val)}px`;
	} else {
		return '';
	}
};

/*
	Returns a CSS calc expression that can be used as a value for any CSS property.
	Written with the goal of returning clean and concise CSS calc expressions.
*/
export const values = ({ contentWidth, totalColumns, gutterSize }: ScreenConfig) => (valueExpr: GridValueExpression): string => {

	const { negative, columns, gutters } = parse(valueExpr);

	if (columns) {

		const totalWidth = contentWidth
			? `${contentWidth}px`
			: '100vw';

		const baseWidthExpr = negative
			? `(${gutterSize}px - ${totalWidth})`
			: `(${totalWidth} - ${gutterSize}px)`;

		return `calc(${baseWidthExpr} * ${columns / totalColumns}${gutterExpr(gutters, gutterSize, negative)})`;

	} else {
		// css calc is not needed when the value is a multiple of gutter size only
		return `${negative ? '-' : ''}${gutterSize * gutters}px`;
	}
};
