/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import Bookmark from 'kinja-components/components/icon19/Bookmark';
import BookmarkFilled from 'kinja-components/components/icon19/BookmarkFilled';
import numberShortFormat from 'kinja-components/utils/numberShortFormat';

const Label = styled.div`
	font-size: 10px;
	font-weight: 400;
	line-height: 1.3;
	letter-spacing: 0.2px;
	text-transform: uppercase;
	text-align: center;
	margin-top: 6px;

	${props => props.isBigger && `
		font-size: 16px;
		line-height: 24px;
		text-transform: inherit;
		margin-top: 0;
	`}
`;

const containerColor = props => {
	if (props.withoutThemeColor) {
		return props.theme.color.gray;
	}
	if (props.isSaved) {
		return props.theme.color.primary;
	}
	return props.theme.color.gray;
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	color: ${containerColor};

	&:hover {
		color: ${props => props.withoutThemeColor ? props.theme.color.gray : props.theme.color.primary };
	}
`;

export type SaveBadgeProps = {
	className?: string,
	count?: number,
	iconOnly?: boolean,
	isSaved?: boolean,
	isBigger?: boolean,
	label?: string,
	onClick?: (isSaved: boolean) => void,
	saveCount?: number,
	withoutThemeColor?: boolean
};

function SaveBadge(props: SaveBadgeProps) {
	const {
		saveCount = 0,
		iconOnly = false,
		isSaved = false,
		label = 'Save',
		onClick,
		isBigger = false
	} = props || {};

	const onSaveClick = onClick && onClick.bind(this, !isSaved);

	return (
		<Container {...props} onClick={onSaveClick}>
			{isSaved ? <BookmarkFilled/> : <Bookmark/> }
			{!iconOnly && <Label isBigger={isBigger}>
				{saveCount > 0 ? numberShortFormat(saveCount) : label}
			</Label>}
		</Container>
	);
}

export default SaveBadge;
