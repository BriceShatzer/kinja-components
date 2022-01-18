/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import numberShortFormat from 'kinja-components/utils/numberShortFormat';
import BubbleIcon from '../../icon19/Bubble';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const Label = styled.div`
	font-size: 14px;
	line-height: 18px;
	color: ${props => props.withoutThemeColor ? props.theme.color.darkgray : props.theme.color.primary };
`;

const Spacer = styled.div`
	margin-left: ${props => props.space};
`;

const StyledIcon = styled(BubbleIcon)`
	color: ${props => props.withoutThemeColor ? props.theme.color.darkgray : props.theme.color.primary };
`;

export type CommentBadgeProps = {
	color?: string,
	count?: number,
	iconOnly?: boolean,
	label?: string,
	space?: string,
	withoutThemeColor?: boolean
};

function CommentBadge(props: CommentBadgeProps) {
	const {
		count = 0,
		iconOnly,
		label,
		space = '2px',
		withoutThemeColor = false,
		...rest
	} = props || {};

	return (
		<Container {...rest}>
			<StyledIcon withoutThemeColor={withoutThemeColor} />
			{!iconOnly && (count > 0 || label) && space && <Spacer space={space} />}
			{!iconOnly && !label && count > 0 && <Label withoutThemeColor={withoutThemeColor}>{numberShortFormat(count)}</Label>}
			{!iconOnly && label && <Label withoutThemeColor={withoutThemeColor}>{label}</Label> }
		</Container>
	);
}

export default CommentBadge;
