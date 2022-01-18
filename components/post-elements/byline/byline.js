/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import MultipleAuthorsStatic, { showByline } from '../multiple-authors-static';
import MetaTime from '../meta-time';
import { EnsureDefaultTheme } from '../../theme';
import media from '../../../style-utils/media';

import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';
import type User from 'kinja-magma/models/User';
import type { PageType } from 'kinja-magma/models/PageType';

type Props = {
	authors?: Array<User>,
	blog?: Blog,
	isScheduled?: boolean,
	pageType: PageType,
	post: Post,
	index: number,
	repostBlog?: ?Blog,
	noLink?: boolean,
	hideTime?: boolean,
	customGAEvent?: Array<?string | {[key: string]: mixed}>,
	customMetaTimeEvent?: Array<Array<?string | {[key: string]: mixed}>>
}

export const BylineContainer = styled.div`
	font-family: ${props => props.theme.typography.primary.fontFamily};
	line-height: 20px;
	text-align: left;

	${media.smallOnly`
		display: flex;
		flex-direction: column;
	`}
`;

export const MultipleAuthorsContainer = styled.span`

	${media.mediumUp`

		${props => !props.hideTime && css`
			:not(:empty)::after {
				content: '|';
				font-size: 20px;
				line-height: 20px;
				padding: 0 8px;
				color: ${props => props.theme.color.gray};
				vertical-align: middle;
			}
		`}
	`}
`;

/**
 * Hide authors if
 *  - it the post is a repost and the repost blog has the hideAuthorInfo set
 *  - it the post is not a repost and the current blog has the hideAuthorInfo set
 */
export const shouldHideAuthorsBasedOnBlog = (blog?: Blog, repostBlog?: ?Blog) => {
	if (repostBlog) {
		return repostBlog.hideAuthorInfo;
	}
	if (blog) {
		return blog.hideAuthorInfo;
	}
	return false;
};

const Byline = (props: Props) => {
	const {
		authors,
		blog,
		index,
		isScheduled,
		pageType,
		post,
		repostBlog,
		noLink,
		hideTime,
		customGAEvent,
		customMetaTimeEvent
	} = props;
	const { publishTimeMillis } = post;
	// Hide authors
	// if the post has bylines disabled.
	// or the current blog hides authors,
	// or the blog the post was shared from wants us to hide the authors.
	const hideAuthors = !post.showByline || shouldHideAuthorsBasedOnBlog(blog, repostBlog);

	return (
		<EnsureDefaultTheme>
			<BylineContainer>
				{authors && Boolean(authors.length) && !hideAuthors &&
					<MultipleAuthorsContainer hideTime={hideTime}>
						<MultipleAuthorsStatic
							authors={authors}
							postPermalinkRedirect={post.permalinkRedirect}
							postIsDeals={post.isDeals}
							pageType={pageType}
							index={index}
							byline={showByline(post.byline, post.showByline) ? post.byline : undefined}
							noLink={noLink}
							customGAEvent={customGAEvent}
						/>
					</MultipleAuthorsContainer>
				}
				{publishTimeMillis && !hideTime &&
					<MetaTime
						permalink={post.securePermalink}
						millis={post.repost ? post.repost.repostTimeMillis : publishTimeMillis}
						timezone={blog && blog.timezone}
						locale={blog && blog.locale}
						isScheduled={isScheduled}
						index={index}
						pageType={pageType}
						postId={post.id}
						customGAEvent={customMetaTimeEvent}
					/>
				}
			</BylineContainer>
		</EnsureDefaultTheme>
	);
};

export default Byline;
