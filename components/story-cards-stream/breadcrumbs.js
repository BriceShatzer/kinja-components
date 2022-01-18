// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import media from 'kinja-components/style-utils/media';
import { Anchor } from 'kinja-components/components/elements/link';
import LabelVertical from 'kinja-components/components/post-elements/meta-info/label-vertical';
import LabelStoryType from 'kinja-components/components/post-elements/meta-info/label-storytype';

// ICONS
import { IconWrapper } from '../icon19/icon19';
import DoubleChevronRightIcon from '../icon19/DoubleChevronRight';

import type TypedTagData from 'kinja-magma/models/TypedTagData';
import type StoryType from 'kinja-magma/models/StoryType';
import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';

const BreadcrumbsContainer = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: nowrap;

	span {
		padding-right: 0;
	}

	${({ withoutTheme }) => withoutTheme && css`
		${Anchor},
		${Anchor} > span {
			color: ${({ theme }) => theme.color.darkgray};
		}
	`}

	${media.mediumUp`
		${Anchor} {
			/* chop of top part of the text height to line up with images */
			&::before {
				content: '';
				display: block;
				height: 0;
				width: 0;
				margin-top: -4px;
			}
		}
	`}

	${IconWrapper} {
		margin: -5px 5px 0 5px;
	}
	svg {
		color: ${({ theme }) => theme.color.gray};
		width: 12px;
	}

	${media.smallOnly`
		display: none;
	`}
`;

type Props = {
	blog?: Blog,
	category?: ?TypedTagData,
	className?: string,
	index: number,
	isExternalPost?: boolean,
	isVertical?: boolean,
	labelCanonicalHost?: string,
	pageType: string,
	post?: Post,
	storyType?: ?StoryType,
	verticalCanonicalHost?: string,
	verticalDisplayName?: string,
	withoutTheme?: boolean
}

function Breadcrumbs(props: Props): React$Node {
	const {
		blog,
		className,
		index,
		isExternalPost,
		isVertical,
		pageType,
		post,
		storyType,
		verticalDisplayName,
		verticalCanonicalHost,
		withoutTheme
	} = props;
	const isDeals = Boolean(post && post.isDeals);
	const showBreadcrumbs = isVertical || !!storyType;
	const showSeparator = isVertical && !!storyType && !isDeals;
	return showBreadcrumbs && (
		<BreadcrumbsContainer className={className} withoutTheme={withoutTheme}>
			{isVertical && !isDeals && (
				<LabelVertical
					displayName={verticalDisplayName}
					index={index}
					pageType={pageType}
					canonicalHost={verticalCanonicalHost}
				/>
			)}
			{showSeparator && (
				<DoubleChevronRightIcon />
			)}
			<LabelStoryType
				blog={blog}
				index={index}
				isExternalPost={isExternalPost}
				pageType={pageType}
				post={post}
				storyType={storyType}
			/>
		</BreadcrumbsContainer>
	);
}

export default Breadcrumbs;
