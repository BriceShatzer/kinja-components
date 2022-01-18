/* @flow */

import type {
	Props
} from '../share-toolbar';

type ComponentStates = {
	[string]: {
		name: string,
		props: Props
	}
}

export const componentStates: ComponentStates = {
	a: {
		name: 'Horizontal',
		props: {
			isVertical: false
		}
	}
};

