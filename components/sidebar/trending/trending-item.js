// @flow

import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import truncate from 'html-truncate';

import { EnsureDefaultTheme } from '../../theme';
import DateTime from '../../../utils/DateTime';
import type SidebarPost from 'kinja-magma/models/SidebarPost';
import type Blog from 'kinja-magma/models/Blog';
import SidebarImage from '../sidebar-image';
import NativeShareLabel from '../../native-share-label';
import Link from '../../elements/link';

const ReelFeature = styled.div`
	width: ${props => `${100 / props.count}%`};
	border: 1px solid ${props => props.theme.color.white};
	display: block;
	float: left;
	position: relative;
	opacity: 0;
	z-index: 0;

	transform: ${props => `translate3d(${-(props.index) * 100}%, 0, 0)`};

	transition: opacity 300ms;
	&.active {
		opacity: 1;
		z-index: 10;
	}
`;

const Headline = styled.h4`
	color: ${props => props.theme.color.black};
	margin: 10px 0 1px;
	font-size: 20px;
	line-height: 1.2;
	font-family: ${props => props.theme.typography.headline.fontFamily};
	word-break: break-word;
`;

const Meta = styled.div`
	font-size: 15px;
	line-height: 17px;
	color: ${props => props.theme.color.gray};

	strong {
		color: ${props => props.theme.color.black};
	}
`;

const MetaItem = styled(Meta)`
	display: inline;
	margin-right: 15px;
`;

const BlogLabel = styled(Meta)`
	margin: 15px 0 6px;
`;

const LinkContainer = styled(Link)`
	&:hover {
		text-decoration: none;
	}

	&:hover ${Headline} {
		text-decoration: underline;
		text-decoration-color: ${props => props.theme.color.black};
	}
`;

const PublishTime = styled.time`
	font-size: 13px;
	text-transform: none;
	color: ${props => props.theme.color.gray};
	margin-top: 4px;
`;

const truncateLength = 130;

type Props = {
	post: SidebarPost,
	currentBlog: Blog,
	active: boolean,
	index: number,
	count: number
};

const blogLabelContent = (post, currentBlog) => {
	if (currentBlog.recircGroup !== post.defaultBlogRecircGroup) {
		return (
			<NativeShareLabel
				defaultBlogDisplayName={post.defaultBlogDisplayName}
				defaultBlogRecircGroup={post.defaultBlogRecircGroup}
				defaultBlogGroup={post.defaultBlogGroup}
				blog={currentBlog}
			/>
		);
	} else {
		return <strong>{post.defaultBlogDisplayName}</strong>;
	}
};

const TrendingItem = (props: Props) => {
	const { post, currentBlog, active, index, count } = props;

	if (!post) {
		return null;
	}

	const dateTime = new DateTime({
		timestamp: post.publishTimeMillis,
		timezone: currentBlog.timezone,
		locale: currentBlog.locale
	}).relativeDateTime;

	return (
		<EnsureDefaultTheme>
			<LinkContainer
				href={post.securePermalink}
				events={[
					['Trending module click', 'position main', post.securePermalink, {metric16: 1}]
				]}
			>
				<ReelFeature
					index={index}
					count={count}
					className={classNames('reel', {active})}
					data-index={index}
				>

					<SidebarImage post={post} blogGroup={currentBlog.blogGroup} />

					<BlogLabel>
						{blogLabelContent(post, currentBlog)}
					</BlogLabel>

					<Headline dangerouslySetInnerHTML={{__html: truncate(post.headline, truncateLength)}} />

					<div>
						{!currentBlog.hideAuthorInfo && <MetaItem>
							<strong>
								{post.authorName}
							</strong>
						</MetaItem>}

						<PublishTime>
							{dateTime}
						</PublishTime>
					</div>

				</ReelFeature>

			</LinkContainer>
		</EnsureDefaultTheme>
	);
};

export default TrendingItem;
