// @flow

import type { VisualTimestampProps } from '../visual-timestamp';

type States = {
	[string]: {
		name: string,
		props: VisualTimestampProps
	}
}

export const componentStates: States = {
	live: {
		name: 'renders an animated live indicator',
		props: {
			isLive: true
		}
	},
	default: {
		name: 'renders a default clock icon for fmgNonSatire',
		props: {
			recircGroup: 'fmgNonSatire'
		}
	},
	editorialSplice: {
		name: 'renders an editorial splice icon for fmgNonSatire',
		props: {
			recircGroup: 'fmgNonSatire',
			isSpliced: true
		}
	},
	commerceSplice: {
		name: 'renders a deals icon for partnerEditorial',
		props: {
			recircGroup: 'partnerEditorial',
			isSpliced: true
		}
	},
	promotionsSplice: {
		name: 'renders a promotions icon for sponsored fmgBusiness',
		props: {
			recircGroup: 'fmgBusiness',
			isSponsored: true
		}
	},
	noProps: {
		name: 'renders without any props',
		props: {}
	},
	timestampFormatDefault: {
		name: 'renders "just now", relative time with default `timestampFormat`',
		props: {
			timestamp: Date.now()
		}
	}
};
