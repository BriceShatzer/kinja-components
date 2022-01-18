// @flow

import * as React from 'react';
import styled from 'styled-components';

import Flame from '../icon19/Flame';
import Bubble from '../icon19/Bubble';
import { IconWrapper } from '../icon19/icon19';
import Link from '../elements/link';
import { StatefulSaveBadge } from 'kinja-components/components/post-elements/save-badge';
import numberShortFormat from '../../utils/numberShortFormat';
import {
	PermalinkCommentClick
} from '../permalink/analytics';
import media from '../../style-utils/media';
import {
	withFeatures,
	type FeaturesInjectedProps
} from '../hoc/context';

import type { PostId } from 'kinja-magma/models/Id';

type Props = {
	viewCount: number,
	uniqueViewCount: number,
	replyCount: number,
	likeCount?: number,
	postId: PostId,
	permalink: string,
	hideViewcounts?: boolean,
	hideRecommendations?: boolean,
	isSecondScroll?: boolean
} & FeaturesInjectedProps;

const MetaToolbarItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 100%;
	flex-direction: column;

	${media.mediumUp`
		${IconWrapper} svg {
			width: 24px;
			height: 24px;
		}
	`}
`;

const Container = styled.div`
	display: flex;

	> * {
		margin: 0 4px;
		min-width: 32px;
		color: ${props => props.theme.color.gray};
		transition: color 200ms ease-in-out;
	}

	> *:first-child {
		margin-left: 0;
	}

	a:hover {
		text-decoration: none;
		color: ${props => props.theme.color.primary};
	}
`;

const MetaToolbar = (props: Props) => {
	const {
		viewCount,
		uniqueViewCount,
		replyCount,
		postId,
		permalink,
		hideViewcounts,
		hideRecommendations,
		likeCount,
		isSecondScroll,
		features
	} = props;

	const shouldShowViewCount = !hideViewcounts && viewCount > 0;

	return (<Container>
		{shouldShowViewCount &&
			<MetaToolbarItem title={`${numberShortFormat(uniqueViewCount)} New Visitors`}>
				<Flame/>
				<span>
					{numberShortFormat(viewCount)}
				</span>
			</MetaToolbarItem>
		}

		{replyCount > 0 &&
			<Link
				href={`${permalink}#replies`}
				events={[PermalinkCommentClick(permalink, isSecondScroll)]}
				rel={features && features.comment_nofollow ? 'nofollow' : undefined}
			>
				<MetaToolbarItem>
					<Bubble/>
					<span>
						{replyCount}
					</span>
				</MetaToolbarItem>
			</Link>
		}

		{!hideRecommendations &&
			<MetaToolbarItem>
				<StatefulSaveBadge
					postId={postId}
					postPermalink={permalink}
					saveCount={likeCount}
					isBigger
				/>
			</MetaToolbarItem>
		}
	</Container>);

};

export default withFeatures(MetaToolbar);
