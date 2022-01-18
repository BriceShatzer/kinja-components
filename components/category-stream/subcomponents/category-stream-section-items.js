// @flow

import * as React from 'react';
import styled from 'styled-components';

import CategoryStreamSectionItem from './category-stream-section-item';
import media from '../../../style-utils/media';

import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';

type EventType = Array<?string | {[key: string]: mixed}>;

type Props = {
	events?: ?Array<EventType>,
	eventFunctions?: ?Array<(...args: Array<any>) => EventType>,
	posts: ?Array<Post>,
	pageType: string,
	blogGroup?: string,
	withBranding?: boolean,
	relatedBlogs?: Array<Blog>,
	noLazy?: boolean
};

const SectionItems = styled.div`
	display: grid;
	grid-template-columns: repeat(3, [col] 1fr);
	grid-gap: 1rem;

	${media.smallOnly`
		grid-auto-flow: column;
		grid-template-columns: auto;
		padding-left: ${props => props.theme.columnPadding};
		overflow-x: scroll;

		> * {
			width: 200px;

			:last-of-type {
				width: 218px;
				padding-right: ${props => props.theme.columnPadding};
				margin-right: 0;
			}
		}
	`}
`;

const CategoryStreamSectionItems = ({
	events,
	eventFunctions,
	posts,
	pageType,
	blogGroup,
	withBranding = false,
	relatedBlogs,
	noLazy = false
}: Props) => (
	<SectionItems>
		{posts && posts.map((post, index) => {
			const relatedBlog = relatedBlogs && relatedBlogs.find(blog => blog.id === post.defaultBlogId);

			return (
				<CategoryStreamSectionItem
					events={[...(events || []), ...(eventFunctions || []).map(eventFn =>
						eventFn(post.permalink, index + 1, posts.length))]}
					key={post.id}
					post={post}
					pageType={pageType}
					blogGroup={blogGroup ?
						blogGroup : relatedBlog && relatedBlog.blogGroup
					}
					withBranding={withBranding}
					noLazy={noLazy}
				/>
			);
		})}
	</SectionItems>
);

export default CategoryStreamSectionItems;
