// @flow

import React from 'react';
import styled from 'styled-components';

import Link from '../elements/link';
import Headline from '../post-elements/headline/headline';
import EnsureDefaultTheme from '../theme/ensureDefaultTheme';
import createTranslate from '../translator';
import translations from './translations';
import { PopularPostClick } from '../permalink/analytics';
import BlogLogo from '../blog-logo';

import type SidebarPost from 'kinja-magma/models/SidebarPost';
import type { Locale } from 'kinja-magma/models/Locale';


const Title = styled.h4`
	padding-bottom: 4px;
	margin-bottom: 16px;
	font-size: 16px;
	line-height: 21px;
	text-transform: uppercase;
`;

const StyledHeadline = styled(Headline)`
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

	&:not(:last-child) {
		margin-bottom: 1rem;
	}
`;

const BlogLabel = styled.span`
	color: ${props => props.theme.color.darkgray};
	font-size: 12px;
	font-style: normal;
	height: 14px;
	line-height: 14px;
	margin-right: 4px;
	text-transform: uppercase;
`;

const BlogLogoWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 8px;
`;

export const Container = styled.div`
	margin: 0 auto 32px;
`;

type Props = {|
	locale: Locale,
	posts: Array<SidebarPost>
|};

const MoreFromNetwork = (props: Props) => {
	const { posts } = props;
	const translate = createTranslate(translations, props.locale);
	if (!posts) {
		return null;
	}
	const postsToDisplay = posts.slice(0, 4);
	return (
		<EnsureDefaultTheme>
			<Container>
				<Title>{translate('More from G/O Media')}</Title>

				{postsToDisplay.map((post, index) => {
					const headline = post.headline;
					const blogGroup = post.defaultBlogGroup;
					if (headline) {
						const linkEvents = PopularPostClick(post.permalink, index + 1, true);
						return (
							<PostWrapper key={post.id}>
								{blogGroup && <BlogLogoWrapper>
									<BlogLabel>Read on</BlogLabel>
									<BlogLogo name={blogGroup} scale={0.35} />
								</BlogLogoWrapper>}
								<StyledLink href={post.permalink} events={[linkEvents]}>
									<StyledHeadline level={4}>{headline}</StyledHeadline>
								</StyledLink>
							</PostWrapper>
						);
					}

					return null;
				})}
			</Container>
		</EnsureDefaultTheme>
	);
};

MoreFromNetwork.defaultProps = {
	locale: 'en-US'
};

export default MoreFromNetwork;
