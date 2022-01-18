// @flow
import * as React from 'react';
import styled, { withTheme } from 'styled-components';

import type { HorizontalRuleJSON, HorizontalRuleStyle } from 'postbody/blockNodes/HorizontalRule';
import iconCollection from './horizontal-rule-icons.json';

import { withKinjaMeta } from 'kinja-components/components/hoc/context';
import type { KinjaMeta } from 'kinja-components/components/hoc/context';

import type { HrIcon, HrIconCollection } from './';

// return value is undefined if there's no icon available for the current blog/horizontal rule style
export function getIcon(iconCollection: HrIconCollection, blogName: string, style: HorizontalRuleStyle): HrIcon | void {
	return iconCollection[style] && (iconCollection[style][blogName]
		? iconCollection[style][blogName]
		: iconCollection[style].default);
}

const HrWithoutIcon = styled.hr`
	border: solid #ddd;
	border-width: 1px 0 0;
	height: 0;
	margin-top: 40px;
	margin-bottom: 40px;
	clear: both;
`;

const HrWithIcon = styled.hr`
	min-width: ${props => props.hrIcon.width}px;
	height: ${props => props.hrIcon.height}px;
	background: url("${props => props.hrIcon.data}");
	background-repeat: no-repeat;
	background-position: center;
	border: none;
	margin-top: 40px;
	margin-bottom: 40px;
	clear: both;
`;

/**
 * These classes are needed in the editor for exporting purposes
 */
const styleClasses: { [HorizontalRuleStyle]: string } = {
	Stars: 'storybreak-stars',
	Squares: 'storybreak-squares',
	BrandedA: 'storybreak-branded-a',
	BrandedB: 'storybreak-branded-b'
};

type HorizontalRuleJSONWithoutType = $Diff<HorizontalRuleJSON, { type: 'HorizontalRule' }>;
type Props = HorizontalRuleJSONWithoutType & {
	theme: { [string]: string },
	editable?: boolean,
	kinjaMeta?: KinjaMeta
};

function HorizontalRule(props: Props) {
	const className = props.editable ? styleClasses[props.style] : undefined;
	// these styles should have custom icons, but if those don't exist for the current theme, they shouldn't be visible
	if (props.style === 'Stars' || props.style === 'BrandedA' || props.style === 'BrandedB') {
		const blogGroup = props.kinjaMeta && props.kinjaMeta.blogGroup ? props.kinjaMeta.blogGroup : '';
		const blog = props.theme && props.theme.blog || blogGroup;
		const icon = getIcon(iconCollection, blog, props.style);
		return icon
			? <HrWithIcon hrIcon={icon} className={className} />
			: null;
	} else {
		// style === 'Line' or anything else defaults to a plain <hr/>
		return <HrWithoutIcon className={className} />;
	}
}

export default withKinjaMeta(withTheme(HorizontalRule));
