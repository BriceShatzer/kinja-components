/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import VisualTimestamp from 'kinja-components/components/post-elements/visual-timestamp';
import { StatefulSaveBadge } from 'kinja-components/components/post-elements/save-badge';
import { createPostId } from 'kinja-magma/models/Id';
import { StatefulEditorTools } from './editor-tools';
import type { StoryCardProps } from './';

export type { StoryCardProps as AsideToolsProps } from './';

const StyledEditorTools = styled(StatefulEditorTools)``;

const Container = styled.div`
	min-width: 48px;
	width: 48px;
	max-width: 48px;
	display: flex;
	flex-flow: column;
	align-items: center;

	${StyledEditorTools} {
		visibility: hidden;
	}

	&:hover {
		${StyledEditorTools} {
			visibility: visible;
		}
	}
`;

const VerticalSpacer = styled.div`
	display: block;
	margin: ${props => props.padding || '9px 0'};
`;

function AsideTools({
	blog,
	className,
	defaultBlog,
	defaultBlogName,
	defaultBlogGroup,
	defaultBlogRecircGroup,
	index,
	isCommerce,
	isEmbiggened,
	isExternal,
	isLive,
	isNativeAd,
	isSaved,
	isSpliced,
	isSponsored,
	pageType,
	post,
	authors
}: StoryCardProps) {
	const timestamp = post.repost ? post.repost.repostTimeMillis : post.publishTimeMillis || 0;
	const likes = Number(post.likes) || 0;
	const locale = blog && blog.locale;
	const showSaveBadge = pageType === 'profilepage' || (blog && blog.hideRecommendations === false);
	return (
		<Container className={cx('js_aside-tools', className)}>
			<VisualTimestamp
				blog={blog}
				className={className}
				defaultBlogName={defaultBlogName}
				defaultBlogGroup={defaultBlogGroup}
				defaultBlogRecircGroup={defaultBlogRecircGroup}
				isCommerce={isCommerce}
				isExternal={isExternal}
				isLive={isLive}
				isNativeAd={isNativeAd}
				isSaved={isSaved}
				isSpliced={isSpliced}
				isSponsored={isSponsored}
				locale={locale}
				post={post}
				timestamp={timestamp}
			/>
			{/* For now we are not allowing save badge for any native ads */}
			{/* Commerce native ads have post id === 0 because of overrides */}
			{post.id !== createPostId(0) && !isNativeAd && (
				<React.Fragment>
					<VerticalSpacer />
					{showSaveBadge && <StatefulSaveBadge
						isSaved={isSaved}
						postId={post.id}
						postPermalink={post.securePermalink}
						saveCount={likes}
					/>}
					<VerticalSpacer padding='4px 0' />
					<StyledEditorTools
						index={index}
						isEmbiggened={isEmbiggened}
						pageType={pageType}
						postId={post.id}
						postPermalink={post.securePermalink}
						parentId={post.parentId}
						parentAuthorId={post.parentAuthorId}
						defaultBlogId={post.defaultBlogId}
						defaultBlogDisplayName={defaultBlog && defaultBlog.displayName}
						authorIds={post.authorIds}
						authorName={authors && authors[0] && authors[0].displayName}
					/>
				</React.Fragment>
			)}
		</Container>
	);
}

export default AsideTools;
