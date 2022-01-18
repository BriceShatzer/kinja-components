// @flow

import React from 'react';
import styled from 'styled-components';

import Link from '../elements/link';
import Headline from '../post-elements/headline/headline';
import Theme, { type BlogThemeName } from '../theme/theme';
import createTranslate from '../translator';
import translations from './translations';
import { RelatedPostClick, PopularPostClick } from '../permalink/analytics';

import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type { Locale } from 'kinja-magma/models/Locale';


const Title = styled.h4`
	padding-bottom: 4px;
	margin-bottom: 16px;
	font-size: 16px;
	line-height: 21px;
	text-transform: uppercase;
`;

const StyledHeadline = styled(Headline)`
	margin-bottom: 4px;
	font-size: 18px;
	line-height: 23px;
`;

const StyledLink = styled(Link)`
	&:hover {
		color: inherit;
	}
`;

const PostWrapper = styled.div`
	position: relative;
	padding-left: 25px;

	> *:first-child::before {
		content: "•";
		position: absolute;
		left: 0;
		font-size: 21px;
		font-weight: bold;
		color: ${({ theme }) => theme.color.primary};
	}

	&:not(:last-child) {
		margin-bottom: 1rem;
	}
`;

export const Container = styled.div`
	max-width: 636px;
	margin: 32px auto 0;
`;

type Props = {|
	blog: Blog,
	parentBlog?: ?Blog,
	locale: Locale,
	posts: Array<Post>,
	source?: 'BLOG' | 'BLOG_POPULAR',
	blogTheme: BlogThemeName,
	moreFromChartbeat?: boolean
|};

const MoreOnModule = (props: Props) => {
	const { blog, posts, source, moreFromChartbeat, parentBlog } = props;
	const translate = createTranslate(translations, props.locale);
	let title = '';

	switch (source) {
		case 'BLOG_POPULAR':
			title = translate('Most popular on {blogName}', { blogName: blog.displayName });
			break;
		default:
			title = translate('More from {blogName}', { blogName: blog.displayName });
	}

	if (!posts || posts.length === 0) {
		return null;
	}

	// If stories has 3 posts, show only 3 headlines
	// If related stories has 6 or 9 posts, show 4 headlines
	const postLength = posts.length > 3 ? 4 : 3;
	return (
		<Theme blog={blog.blogTheme}>
			<Container>
				<Title>{(moreFromChartbeat && parentBlog) ? translate('More from {blogName}', { blogName: parentBlog.displayName }) : title}</Title>

				{posts.slice(0, postLength).map((post, index) => {
					const headline = post.formattedHeadline;
					if (headline) {
						const linkEvents = source === 'BLOG_POPULAR' ?
							PopularPostClick(post.permalink, index + 1) :
							RelatedPostClick(post.permalink, index + 1, postLength);
						return (
							<PostWrapper key={post.id}>
								<StyledLink href={post.permalink} events={[linkEvents]}>
									<StyledHeadline level={4}>{headline}</StyledHeadline>
								</StyledLink>
							</PostWrapper>
						);
					}

					return null;
				})}
			</Container>
		</Theme>
	);
};

MoreOnModule.defaultProps = {
	blogTheme: 'default',
	locale: 'en-US'
};

export default MoreOnModule;
