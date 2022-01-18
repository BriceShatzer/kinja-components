// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import media from 'kinja-components/style-utils/media';
import { StreamCommentsClick } from 'kinja-components/components/stream/analytics';
import Link from 'kinja-components/components/elements/link';
import MultipleAuthorsStatic from 'kinja-components/components/post-elements/multiple-authors-static';
import AuthorsAvatar from 'kinja-components/components/post-elements/multiple-authors-static/authors-avatar';
import CommentBadge from 'kinja-components/components/post-elements/comment-badge';
import {
	withFeatures,
	type FeaturesInjectedProps
} from '../hoc/context';

import { createPostId } from 'kinja-magma/models/Id';
import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type User from 'kinja-magma/models/User';
import type { PageType } from 'kinja-magma/models/PageType';

export const bylineLineHeight = '18px';

const BylineContainer = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: nowrap;

	${media.smallOnly`
		${props => props.hasMultipleAuthors && css`
			display: block;
		`}
	`}
`;

const StyledAuthorsAvatar = styled(AuthorsAvatar)`
	position: relative;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	overflow: hidden;

	/* js_lazy-image authors-avatar__LazyResponsiveImageContainer */
	& > div,
	/* container div for image__LoadedImageWrapper */
	& > div > div {
		width: inherit;
		height: inherit;
	}

	${media.smallOnly`
		display: none;
	`}
`;

const BylineWrapper = styled.div`
	display: block;

	${media.mediumUp`
		display: contents;
		white-space: nowrap;
		margin-top: 0;
	`}
`;

const StyledAuthors = styled(MultipleAuthorsStatic)`
	display: inline;
	line-height: ${bylineLineHeight};
	color: ${props => props.theme.color.gray};
	font-family: ${props => props.theme.typography.primary.fontFamily};
`;

const CommentBadgeContainer = styled.div`
	display: flex;
	align-items: center;
	line-height: ${bylineLineHeight};

	${props => props.withPipe && css`
		&::before {
			content: '|';
			font-size: 14px;
			line-height: 16px;
			padding: 0 8px;
			color: ${props => props.theme.color.gray};
			vertical-align: middle;
			margin-top: 1px;
		}
	`}

	${props => props.hasMultipleAuthors && css`
		${media.smallOnly`
			margin-top: 8px;
			&::before {
				display: none;
			}
		`}
	`}
`;

type BylineProps = {
	authors?: Array<User>,
	blog?: Blog,
	hideAuthors?: boolean,
	index: number,
	isSplicedPost?: boolean,
	pageType: PageType,
	post: Post,
	repostBlog?: ?Blog,
	withAuthorAvatar?: boolean,
}

function Byline({
	authors,
	blog,
	hideAuthors,
	index,
	isSplicedPost,
	pageType,
	post,
	repostBlog,
	withAuthorAvatar,
	features
}: BylineProps & FeaturesInjectedProps): React$Node {
	const replyCount = post && post.replyCount ? Number(post.replyCount) : 0;
	const commentUrl = post && `${post.securePermalink}#replies` || '#';
	const blogGroup = blog && blog.blogGroup;
	const repostBlogGroup = repostBlog && repostBlog.blogGroup;
	const withoutThemeColor = (isSplicedPost && blogGroup !== repostBlogGroup);
	const hasCustomByline = post && post.showByline && post.byline;
	const customByline = hasCustomByline && post.byline;
	const abstractAuthors = hasCustomByline ? [{
		avatar: post.salesAvatar
	}] : authors;
	const showComments = (post && post.id !== createPostId(0))
		&& (!blog || blog && blog.properties && !blog.properties.commentsDisabled);
	const hasMultipleAuthors = abstractAuthors && abstractAuthors.length > 1;

	return (
		<BylineContainer hasMultipleAuthors={hasMultipleAuthors}>
			{!hideAuthors && (
				<BylineWrapper>
					{withAuthorAvatar && (
						<StyledAuthorsAvatar
							pageType={pageType}
							authors={abstractAuthors}
							post={post}
							index={index}
						/>
					)}
					<StyledAuthors
						authors={authors}
						byline={customByline}
						post={post}
						pageType={pageType}
						index={index}
						truncated
					/>
				</BylineWrapper>
			)}
			{showComments && (
				<CommentBadgeContainer withPipe={!hideAuthors && authors && authors.length !== 0} hasMultipleAuthors={hasMultipleAuthors}>
					<Link
						href={commentUrl}
						rel={features && features.comment_nofollow ? 'nofollow' : undefined}
						events={[
							StreamCommentsClick(index, commentUrl, pageType)
						]}
					>
						<CommentBadge
							withoutThemeColor={withoutThemeColor}
							count={replyCount}
						/>
					</Link>
				</CommentBadgeContainer>
			)}
		</BylineContainer>
	);
}

export default withFeatures(Byline);
