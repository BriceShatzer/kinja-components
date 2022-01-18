// @flow

import HorizontalRule from './horizontalRule';

export type HrIcon = {
	name: string,
	width: number,
	height: number,
	data: string // SVG data URL
}

export type HrIconCollection = {
	// style
	[string]: {
		// blog name / default
		[string]: HrIcon
	}
}

export default HorizontalRule;
