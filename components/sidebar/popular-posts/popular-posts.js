// @flow

import * as React from 'react';
import styled from 'styled-components';
import type SidebarPost from 'kinja-magma/models/SidebarPost';
import type Blog from 'kinja-magma/models/Blog';
import PopularPostItem from './popular-post-item';
import createTranslate from '../../translator';
import translations from './translations';
import { EnsureDefaultTheme } from '../../theme';
import checkForCommerceUrl from '../../../utils/checkForCommerceUrl';

const PopularPostsWrapper = styled.div`
	width: 100%;
`;

const Header = styled.header`
	margin: 5px 0 16px;
`;

const HeaderText = styled.h2`
	color: ${props => props.theme.color.darkgray};
	font-size: 20px;
	line-height: 1.3;
	font-family: ${props => props.theme.typography.utility.fontFamily};
	font-weight: normal;

	> strong {
		font-weight: bold;
		color: ${props => props.theme.color.darksmoke};
	}

	> a {
		color: ${props => props.theme.color.darkgray};
	}
`;

const checkForCommerceUrlInPost = (post: SidebarPost): SidebarPost => {
	return post.clone({ permalink: checkForCommerceUrl(post.permalink, 'leftrailpopular') });
};

type Props = {
	posts: Array<SidebarPost>,
	currentBlog: Blog,
	isRecent?: boolean,
	serverSide?: boolean
};

function PopularPosts(props: Props) {
	const {
		posts,
		currentBlog,
		isRecent,
		serverSide
	} = props;
	const language = currentBlog && currentBlog.locale;
	const blogDisplayName = currentBlog && currentBlog.displayName;
	const commentsDisabled = currentBlog && currentBlog.commentsDisabled;
	const hideRecommendations = currentBlog && currentBlog.hideRecommendations;
	const hideViewcounts = currentBlog && currentBlog.hideViewcounts;

	const postsWithCommerceLinks = posts.map(checkForCommerceUrlInPost);
	const isVideo = posts.every(post => post.isVideo);

	const recentLinks = postsWithCommerceLinks.reduce((acc, post) => {
		if (!acc.find(link => link.label === post.authorName)) {
			return acc.concat({
				url: post.authorScreenName ? `https://kinja.com/${post.authorScreenName}` : '',
				label: post.authorName
			});
		}
		return acc;
	}, []);

	const translate = createTranslate(translations, language);

	let header;
	if (isRecent) {
		// Recent from author
		if (recentLinks && recentLinks.length === 1) {
			header = translate('<strong>Recent</strong> from <a href={href}>{label}</a>', {
				href: recentLinks[0].url,
				label: recentLinks[0].label
			});
		} else if (recentLinks && recentLinks.length === 2) {
			header = translate('<strong>Recent</strong> from <a href={href_1}>{label_1}</a> and <a href={href_2}>{label_2}</a>', {
				href_1: recentLinks[0].url,
				label_1: recentLinks[0].label,
				href_2: recentLinks[1].url,
				label_2: recentLinks[1].label
			});
		} else {
			header = translate('<strong>Recent</strong> from these authors');
		}
	} else if (isVideo && blogDisplayName) {
		// Popular videos on blog
		header = translate('<strong>Recent videos</strong> from {blog_display_name}', {
			blog_display_name: blogDisplayName
		});
	} else if (blogDisplayName) {
		// Popular on blog
		header = translate('<strong>Popular</strong> from {blog_display_name}', {
			blog_display_name: blogDisplayName
		});
	} else {
		// Popular in your network
		header = translate('<strong>Popular</strong> in your network');
	}

	const gaEvent = (permalink, index) => {
		const recentOrPopular = isRecent ? 'recent from author' : 'popular';
		const video = isVideo ? ' video' : '';
		return ['Popular stories click', `${recentOrPopular}${video} - position ${index + 1}`, permalink, { metric17: 1 }];
	};

	return (
		<EnsureDefaultTheme>
			<PopularPostsWrapper>
				<Header>
					<HeaderText dangerouslySetInnerHTML={{ __html: header }} />
				</Header>
				{postsWithCommerceLinks.map((post, index) => (
					<PopularPostItem
						key={post.permalink}
						post={post}
						currentBlog={currentBlog}
						index={index}
						hideRecommendations={hideRecommendations}
						hideViewcounts={hideViewcounts}
						commentsDisabled={commentsDisabled}
						gaEvent={gaEvent}
						language={language}
						serverSide={serverSide}
					/>
				))}
			</PopularPostsWrapper>
		</EnsureDefaultTheme>
	);
}

export default PopularPosts;
