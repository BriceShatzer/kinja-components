// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import { EnsureDefaultTheme } from '../../theme';

import type SidebarPost from 'kinja-magma/models/SidebarPost';
import SidebarImage from '../sidebar-image';
import Link from '../../elements/link';

const IndexWrapper = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	margin-bottom: 2px;
`;

const ReelItemActiveState = css`
	filter: grayscale(100%);

	&::after {
		opacity: 0.7;
	}
`;

const ReelItem = styled(Link)`
	display: flex;
	flex: 1;
	border: 1px solid ${props => props.theme.color.white};
	position: relative;
	&:last-child {
		margin-right: 0;
	}

	&::after {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		font-size: 35px;
		font-weight: bold;
		color: ${props => props.theme.color.white};
		content: ${props => `'${props.index}'`};
		z-index: 1;
		opacity: 0;
		background-color: rgba(0, 0, 0, 0.8);
		transition: opacity 300ms ease-in-out;
	}

	&.active {
		${ReelItemActiveState}
	}

	&:hover {
		${ReelItemActiveState}
	}
`;

type Props = {
	posts: Array<SidebarPost>,
	onMouseEnter: (index: number) => mixed,
	selectedItem: number,
	blogGroup: string
};

const TrendingThumbnails = (props: Props) => {
	const { posts, onMouseEnter, selectedItem, blogGroup } = props;

	if (!posts) {
		return null;
	}

	return (
		<EnsureDefaultTheme>
			<IndexWrapper>
				{posts.map((post, index) =>
					<ReelItem
						index={index + 1}
						className={classNames('thumbnail', {
							'active': index === selectedItem
						})}
						data-index={index}
						key={post.id}
						onMouseEnter={() => onMouseEnter(index)}
						href={post.securePermalink}
						events={[
							['Trending module click', `position ${index + 1}`, post.securePermalink, {metric16: 1}]
						]}
					>
						<SidebarImage post={post} blogGroup={blogGroup} />
					</ReelItem>
				)}
			</IndexWrapper>
		</EnsureDefaultTheme>
	);
};

export default TrendingThumbnails;
