/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Link from 'kinja-components/components/elements/link';
import {
	LazyResponsiveImage
} from 'kinja-components/components/elements/image';
import {
	StreamAuthorClick,
	ExternalPostClick,
	KinjaDealsClick,
	PermalinkAuthorClick
} from 'kinja-components/components/stream/analytics';

import type Post from 'kinja-magma/models/Post';
import type User from 'kinja-magma/models/User';

type Props = {
	authors: Array<User>,
	className?: string,
	index: number,
	pageType: string,
	post: Post
}

const LazyResponsiveImageContainer = styled.div`
	width: 30px;
	height: 30px;

	img,
	video {
		width: 30px;
		height: 30px;
		object-fit: cover;
		border-radius: 50%;
		overflow: hidden;
	}
`;

const StyledLink = styled(Link)`
	position: relative;
	margin-right: 7px;
`;

const Span = styled.span`
	position: relative;
	width: 30px;
	height: 30px;
	object-fit: cover;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 7px;
`;


const AuthorsAvatar = (props: Props) => {
	const { authors, className, index, post, pageType } = props;

	const author = authors ? authors[0] : null;
	const hasMultipleAuthors = authors && authors.length > 1;
	const authorAvatar = author && author.avatar;
	const hasCustomByline = post.showByline && post.byline ? post.byline : false;

	const AuthorAvatarImage = () => authorAvatar ? (
		<LazyResponsiveImageContainer className='js_lazy-image'>
			<LazyResponsiveImage
				format={authorAvatar.format}
				id={authorAvatar.id}
				transform="AvatarSmallAuto"
				croppedImage={true}
				sizes="30px"
				width="30"
				height="30"
			/>
		</LazyResponsiveImageContainer>
	) : null;

	return (() => {
		if (!hasMultipleAuthors && author && authorAvatar) {
			if (hasCustomByline) {
				return <Span className={className}><AuthorAvatarImage /></Span>;
			}
			return (
				<StyledLink
					className={className}
					events={[
						(pageType === 'permalink' ? PermalinkAuthorClick(author.screenName) :
							StreamAuthorClick(index, `https://kinja.com/${author.screenName}`, pageType)),
						(post.permalinkRedirect ? ExternalPostClick(index, `https://kinja.com/${author.screenName}`) : undefined),
						(post.isDeals ? KinjaDealsClick(index, `https://kinja.com/${author.screenName}`) : undefined)
					].filter(Boolean)}
					href={`https://kinja.com/${author.screenName}`}
				>
					<AuthorAvatarImage />
				</StyledLink>
			);
		}
		return null;
	})();
};

export default AuthorsAvatar;
