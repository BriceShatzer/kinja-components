/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	blogGroup,
	storiesOf,
	withDocs
} from 'base-storybook';

import { Main } from '../../page-layout';
import PermalinkPost from './permalink-post';
import README from './README.md';
import stubbedPost from '../../../__stubs__/stubbedBasicPost.json';
import postWithCommerceList from '../../../__stubs__/postWithCommerceList.json';
import blogSales from '../../../__stubs__/stubbedGizmodoBlogSales.json';
import blog from '../../../__stubs__/gizmodo.json';
import Post from 'kinja-magma/models/Post';

import { parseNode } from 'postbody/BlockNode';

const FullWidthPage = styled.div`
	width: 100vw;
`;

storiesOf('3. Elements|Post Elements/PermalinkPost', module)
	.addDecorator(story =>
		<FullWidthPage>
			<Main>
				{story()}
			</Main>
		</FullWidthPage>
	)
	.addDecorator(withDocs(README))
	.add('PermalinkPost', () => {
		const post = Post.fromJSON(stubbedPost);
		const postBody = post.body.map(node => parseNode(node));
		return (
			<PermalinkPost
				blogGroup={blogGroup()}
				blog={blog}
				blogSales={blogSales}
				links={[]}
				embeddedVideos={[]}
				postBody={postBody}
				post={post}
			/>
		);
	})
	.add('PermalinkPost with commerce list', () => {
		const post = Post.fromJSON(postWithCommerceList);
		const postBody = post.body.map(node => parseNode(node));
		return (
			<PermalinkPost
				blogGroup={blogGroup()}
				blog={blog}
				blogSales={blogSales}
				links={[]}
				embeddedVideos={[]}
				postBody={postBody}
				post={post}
			/>
		);
	});
