// @flow

import React from 'react';
import styled from 'styled-components';

import type { SitemapPost } from 'kinja-magma/api/sitemap';

const ArticlesContainer = styled.div`
	width: 90vw;
`;

const ArticleLink = styled.h4`
	margin-bottom: 10px;

	a {
		color: black;
	}
`;

type SitemapArticlesProps = {|
	posts: Array<SitemapPost>
|};
export default function SitemapArticles({ posts }: SitemapArticlesProps) {
	return (
		<ArticlesContainer>
			{posts.map(post => (
				<ArticleLink key={post.id}>
					<a href={post.permalink} dangerouslySetInnerHTML={{ __html: post.headline }}></a>
				</ArticleLink>
			))}
		</ArticlesContainer>
	);
}
