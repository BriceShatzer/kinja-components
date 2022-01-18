/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import { Label as StoryTypeLabel } from './story-type-label';

export const MARGIN_VALUES = {
	small: 5,
	medium: 10,
	large: 15,
	huge: 20
};

export type StoryTypeLabelWrapperMargin = $Keys<typeof MARGIN_VALUES>;

type Props = {
	margin?: StoryTypeLabelWrapperMargin,
	children: React.Node
};

export const Wrapper: React.ComponentType<{
	margin?: StoryTypeLabelWrapperMargin,
	variant?: 'head' | 'top'
}> = styled.div`
	display: flex;
	max-width: 100%;
	overflow: hidden;
	${props => props.margin && `margin-bottom: ${MARGIN_VALUES[props.margin]}px;`}
	${props => props.variant === 'head' && css`
		justify-content: center;
		margin-bottom: 20px;
	`}
	:last-child {
		margin-right: 0;
	}

	${StoryTypeLabel} {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

/**
 * Used as a wrapper for storytype labels when they take a whole line
 */
function StoryTypeLabelWrapper(props: Props) {
	const { margin, children } = props;
	return <Wrapper margin={margin}>{children}</Wrapper>;
}

export default StoryTypeLabelWrapper;
