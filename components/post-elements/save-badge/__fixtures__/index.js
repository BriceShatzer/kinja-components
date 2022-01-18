// @flow

import type { SaveBadgeProps } from '../save-badge';

type States = {
	[string]: {
		name: string,
		props: SaveBadgeProps
	}
}

export const componentStates: States = {
	zeroCount: {
		name: 'renders only an icon with "Save" when `count` is zero',
		props: {
			saveCount: 0
		}
	},
	nonZeroCount: {
		name: 'renders a number when `count` is above zero',
		props: {
			saveCount: 666
		}
	},
	isActive: {
		name: 'renders a filled icon when `isActive` is true',
		props: {
			isActive: true
		}
	},
	isNotActive: {
		name: 'renders an unfilled icon when `isActive` is false',
		props: {
			isActive: false
		}
	},
	noLabelOrCount: {
		name: 'renders only an icon with "Save," when props are empty',
		props: {}
	},
	iconOnly: {
		name: 'renders only an icon if `iconOnly` is on',
		props: {
			saveCount: 666,
			label: 'Test',
			iconOnly: true
		}
	},
	labelSupercedesCount: {
		name: 'renders a count over a label when both have positive values',
		props: {
			saveCount: 666,
			label: 'Test'
		}
	},
	countIs1e2: {
		name: 'renders 999 when count is 999',
		props: {
			saveCount: 999
		}
	},
	countIs1e3: {
		name: 'renders 1K when count is 1,000',
		props: {
			saveCount: 1e3
		}
	},
	countIs1e4: {
		name: 'renders 10K when count is 10,000',
		props: {
			saveCount: 1e4
		}
	},
	countIs1e5: {
		name: 'renders 100K when count is 100,000',
		props: {
			saveCount: 1e5
		}
	},
	countIs1e6: {
		name: 'renders `1M` with a count of 1,000,000',
		props: {
			saveCount: 1e6
		}
	}
};
