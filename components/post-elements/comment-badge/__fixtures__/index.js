// @flow

import type { CommentBadgeProps } from '../comment-badge';

type States = {
	[string]: {
		name: string,
		props: CommentBadgeProps
	}
}

export const componentStates: States = {
	zeroCount: {
		name: 'renders a comment icon without a count when zero',
		props: {}
	},
	positiveCount: {
		name: 'renders a comment icon with a count of 1K when `count` is 1000',
		props: {
			count: 1000
		}
	}
};
