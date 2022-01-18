// @flow

import type { ScreenConfig, ScreenName, GridValueExpression } from './types';

import { values } from './grid-internals';

import { gridConfig } from './grid-config';

type Values<T> = { [ScreenName]: T };

function makeReducer<T>(fn: (ScreenConfig => T)): ((acc: Values<T>, value: ScreenName) => Values<T>) {
	const reducer: ((acc: Values<T>, screenName: ScreenName) => Values<T>) = (acc: Values<T> , screenName: ScreenName) => {
		acc[screenName] = fn(gridConfig[screenName]);
		return acc;
	};
	return reducer;
}

const screenNames: Array<ScreenName> = Object.keys(gridConfig);

export const gridValue: Values<GridValueExpression => string> = screenNames.reduce<Values<GridValueExpression => string>>(makeReducer(values), {});
