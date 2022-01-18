// @flow
import * as React from 'react';
import styled from 'styled-components';

import type SidebarPost from 'kinja-magma/models/SidebarPost';
import SaveIcon from '../../icon19/Bookmark';
import FlameIcon from '../../icon19/Flame';
import BubbleIcon from '../../icon19/Bubble';
import { IconWrapper } from '../../icon19/icon19';
import { EnsureDefaultTheme } from '../../theme';
import numberShortFormat from '../../../utils/numberShortFormat';

export const Overlay = styled.ul`
	transition: bottom 150ms ease-in-out;
	height: 36px;
	position: absolute;
	z-index: 1;
	left: 0;
	right: 0;
	bottom: -41px;
	line-height: 42px;
	background-color: rgba(0, 0, 0, 0.5);
	font-size: 14px;
	color: ${props => props.theme.color.white};
	display: flex;
	justify-content: flex-end;
	align-items: center;
	max-width: 100%;
	margin: 0;
`;

const OverlayItem = styled.li`
	align-items: center;
	display: inline-flex;
	margin-right: 10px;

	${IconWrapper} {
		margin: 4px;
	}
`;

export function PopularPostOverlay(props: {
	post: SidebarPost,
	hideRecommendations?: boolean,
	hideViewcounts?: boolean,
	commentsDisabled?: boolean
}) {
	const { post, hideRecommendations, hideViewcounts, commentsDisabled } = props;
	const { likeCount, viewCount, replyCount } = post;
	const showLikes = likeCount && likeCount > 0 && !hideRecommendations;
	const showReplies = replyCount && replyCount > 0 && !commentsDisabled;
	const showViewCount = viewCount && viewCount > 0 && !hideViewcounts;

	if (!showLikes && !showReplies && !showViewCount) {
		return null;
	}
	const likes = <OverlayItem>
		<SaveIcon/>
		{numberShortFormat(likeCount)}
	</OverlayItem>;
	const replies = <OverlayItem>
		<BubbleIcon/>
		{numberShortFormat(replyCount)}
	</OverlayItem>;
	const views = <OverlayItem>
		<FlameIcon/>
		{numberShortFormat(viewCount)}
	</OverlayItem>;

	return (
		<EnsureDefaultTheme>
			<Overlay>
				{showLikes ? likes : null}
				{showReplies ? replies : null}
				{showViewCount ? views : null}
			</Overlay>
		</EnsureDefaultTheme>
	);
}

export default PopularPostOverlay;
