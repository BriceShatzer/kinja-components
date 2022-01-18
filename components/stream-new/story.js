/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	blogGroup,
	boolean,
	number,
	select,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';
import Post from 'kinja-magma/models/Post';
import Blog from 'kinja-magma/models/Blog';
import { isCommerceUrl } from 'kinja-components/utils/checkForCommerceUrl';
import FeedItem from './feed-item';
import FeedItemV2 from './feed-item.v2';
import { PostTools } from '../post-tools';
import AsideTools from 'kinja-components/components/story-cards-stream/aside-tools';
import Theme from '../theme';
import media from 'kinja-components/style-utils/media';

import post from 'kinja-components/__stubs__/stubbedPostResponse.json';
import blog from 'kinja-components/__stubs__/avclub.json';
import author from 'kinja-components/__stubs__/stubbedAuthorResponse.json';

import README from './README.md';

const STORY_WRAPPER_WIDTH_V1 = 800;    /* prod width of main__MainContent */
const STORY_WRAPPER_WIDTH_V2 = 888.44; /* prod width of mainv2__MainContent */

storiesOf('4. Components|Post Promotion/Stream', module)
	.addDecorator(withDocs(README))
	.add('FeedStream', () => {
		const selectedBlog = blogGroup();
		const hasHeadline = boolean('Has headline?', true);
		const isEmbiggened = boolean('Is embiggened?', false);
		const isSponsored = boolean('Is sponsored?', false);
		const isLivePost = boolean('Is live post?', false);

		const currentPost = Post.fromJSON({
			...post,
			...{
				headline: hasHeadline ? post.headline : null,
				featuredMedia: isEmbiggened ? post.featuredMedia : null,
				sponsored: isSponsored,
				reviewScore: 'A',
				properties: JSON.stringify({
					...post.properties && JSON.parse(post.properties),
					...{
						isEmbiggened
					}
				})
			}
		});

		const currentBlog = Blog.fromJSON({
			...blog,
			...{
				properties: {
					...blog.properties,
					...{
						blogGroup: selectedBlog
					}
				}
			}
		});

		const index = 0;
		const pageType = 'frontpage';

		// $FlowFixMe
		const postToolsContents = <PostTools
			dropdownContents={<div>Dropdown item</div>}
			replyCount="200"
			saveCount="2"
		/>;

		const Wrapper = styled.div`
			margin: 0 auto;
			${media.mediumUp`
				width: ${STORY_WRAPPER_WIDTH_V1}px;
			`}
		`;

		return (
			<Theme blog={selectedBlog}>
				<Wrapper>
					<FeedItem
						authors={[author]}
						post={currentPost}
						blog={currentBlog}
						pageType={pageType}
						isLivePost={isLivePost}
						index={index}
						embiggenPosts
						postToolsContents={postToolsContents}
					/>
				</Wrapper>
			</Theme>
		);
	})
	.add('FeedStream - Phase 2', () => {
		const selectedBlogGroup = blogGroup('blogGroup');
		const commentsDisabled = boolean('commentsDisabled', selectedBlogGroup === 'theonion');
		const hideAuthorInfo = boolean('hideAuthorInfo', selectedBlogGroup === 'theonion');
		const isCommerce = boolean('isCommerce', isCommerceUrl(post.permalink));
		const isEmbiggened = boolean('isEmbiggened', false);
		const isSponsored = boolean('isSponsored', false);
		const isLive = boolean('isLive', false);
		const isSpliced = boolean('isSpliced', false);
		const isSaved = boolean('isSaved', true);
		const withAuthorAvatar = boolean('withAuthorAvatar', true);
		const replyCount = number('replyCount', 1);
		const saveCount = number('saveCount', 1);
		const reviewScore = select('reviewScore', ['', 'A', 'A-', 'A+', 'F'], undefined);
		const customByline = text('*customByline', '');
		// for testing purposes
		const withMultipleAuthors = boolean('*multipleAuthors', false);

		const postOverwrites = {
			...post,
			authors: withMultipleAuthors ? [author, author, author, author, author, author] : [author],
			byline: customByline,
			salesAvatar: {
				id: 'lltaalbkwtdnvkfbfu4v',
				format: 'png'
			},
			headline: post.headline,
			featuredMedia: isEmbiggened ? post.featuredMedia : null,
			sponsored: isSponsored,
			reviewScore,
			replyCount,
			likes: saveCount,
			isEmbiggened,
			properties: JSON.stringify({
				...post.properties && JSON.parse(post.properties),
				...{
					isEmbiggened
				}
			}),
			aboveHeadline: !isEmbiggened ? null : post.aboveHeadline,
			blipEmbed: !isEmbiggened ? null : post.blipEmbed
		};

		const currentPost = Post.fromJSON({
			...post,
			...postOverwrites
		});

		const currentBlog = Blog.fromJSON({
			...blog,
			...{
				properties: {
					...blog.properties,
					...{
						hideAuthorInfo,
						commentsDisabled,
						blogGroup: selectedBlogGroup
					}
				}
			}
		});

		const index = 0;
		const pageType = 'frontpage';

		const StyledAsideTools = styled(AsideTools)`
			position: absolute;
			left: -60px;
		`;

		const Wrapper = styled.div`
			margin: 0 auto;
			${media.mediumUp`
				width: ${STORY_WRAPPER_WIDTH_V2}px;
			`}
		`;

		return (
			<Wrapper>
				<Theme blog={selectedBlogGroup}>
					<FeedItemV2
						AsideToolsComponent={StyledAsideTools}
						authors={currentPost.authors}
						blog={currentBlog}
						embiggenPosts={isEmbiggened}
						index={index}
						isCommerce={isCommerce}
						isLivePost={isLive}
						isSaved={isSaved}
						isSplicedPost={isSpliced}
						isSponsoredPost={isSponsored}
						pageType={pageType}
						post={currentPost}
						withAuthorAvatar={withAuthorAvatar}
					/>
				</Theme>
			</Wrapper>
		);
	});
