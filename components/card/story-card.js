/* @flow */

import * as React from 'react';
import classnames from 'classnames';
import styled, { css } from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import media from '../../style-utils/media';

export const StoryCardWrapper = styled.div`
	display: block;
	background-color: ${props => props.theme.color.white};

	${props => props.isTertiaryChild && css`
		position: relative;
		max-height: 150px;
		height: 100%;

		&:not(:last-child) {
			margin-bottom: 20px;
			border-bottom: ${props => props.isActiveTertiary ? `2px solid ${props.theme.color.primary}` : `1px dotted ${props.theme.color.lightgray}`};
		}

		${media.mediumDown`
			padding-bottom: 20px;
		`}
	`}

	&[data-iscondensed="true"] {
		svg[class^=gmg-avatar] {
			position: relative;
			min-width: 100%;
			width: 100%;
			height: auto;
			top: initial;
			right: initial;
			bottom: initial;
			left: initial;
		}
	}
	${props => props.isFullWidth && css`
		width: 100% !important;
	`}
`;

type StoryCardProps = {
	children: () => React.Node,
	handleEditableContent?: *,
	handleEditableContentInput?: *,
	isCondensed?: boolean,
	postBlogGroup?: string,
	model: *,
	id: number,
	activeTertiary: number,
	isTertiaryChild: boolean,
	isFullWidth: boolean,
	onBlur: () => void,
	onClick: () => void,
	index: number
};

const StoryCard = (props: StoryCardProps) => {
	const { children,
		isCondensed,
		postBlogGroup,
		id,
		isTertiaryChild,
		activeTertiary,
		onBlur,
		onClick,
		index,
		isFullWidth
	} = props;

	const brandedClassName = postBlogGroup ? `branded-item--${postBlogGroup}` : '';

	if (!children) {
		throw new Error('<StoryCard /> should be called with `children` as render props.');
	}

	return (<EnsureDefaultTheme>
		<StoryCardWrapper
			key={`storycard-${id}`}
			data-iscondensed={isCondensed}
			className={classnames('item', 'branded-item', {
				[brandedClassName]: postBlogGroup
			})}
			isTertiaryChild={isTertiaryChild}
			onClick={onClick}
			onBlur={onBlur}
			index={index}
			isFullWidth={isFullWidth}
			isActiveTertiary={(activeTertiary === index) || (index === activeTertiary - 1)}
		>
			{children}
		</StoryCardWrapper>
	</EnsureDefaultTheme>
	);
};

export default StoryCard;
