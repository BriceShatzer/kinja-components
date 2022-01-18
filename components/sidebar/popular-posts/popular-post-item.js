// @flow
import * as React from 'react';
import type SidebarPost from 'kinja-magma/models/SidebarPost';
import type Blog from 'kinja-magma/models/Blog';
import styled from 'styled-components';
import truncate from 'html-truncate';
import { createPostId } from 'kinja-magma/models/Id';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import { isStudioAtGizmodo, isOnionLabs } from 'kinja-components/utils/blog';
import DateTime from 'kinja-components/utils/DateTime';
import Link from 'kinja-components/components/elements/link';
import SponsoredLabel from 'kinja-components/components/post-elements/sponsored-label';
import NativeShareLabel from 'kinja-components/components/native-share-label';
import SidebarImage from '../sidebar-image';

const Headline = styled.h4`
	color: ${props => props.theme.color.black};
	margin: 10px 0 1px;
	font-size: 20px;
	line-height: 1.2;
	font-family: ${props => props.isExternalNativeAd ? props.theme.typography.serif.fontFamily : props.theme.typography.headline.fontFamily};
	word-break: break-word;
`;

const SidebarItem = styled.div`
	margin-bottom: 50px;
`;

const PublishTime = styled.div`
	color: ${props => props.theme.color.gray};
	display: inline;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-size: 13px;
	line-height: 17px;
	margin-top: 4px;
`;

const MetaItem = styled.div`
	color: ${props => props.theme.color.black};
	display: inline;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-size: 15px;
	line-height: 17px;
	margin-right: 15px;
`;

const LinkContainer = styled(Link)`
	&:hover {
		text-decoration: none;
	}

	&:hover ${Headline} {
		text-decoration: underline;
		text-decoration-color: ${props => props.theme.color.black};
	}
`;

const Byline = styled.div`
	&:not(:empty) {
		min-height: 25px;
		padding-bottom: 10px;
	}
`;

const SponsoredLabelContainer = styled.div`
	display: block;
	float: left;
	line-height: 25px;
	margin-right: 10px;
`;

/**
 * Helper function for creating a single item in the popular posts list
 */
export function PopularPostItem({
	post,
	currentBlog,
	parentBlogName,
	index,
	gaEvent,
	hideRecommendations = false,
	hideViewcounts = false,
	commentsDisabled = false,
	serverSide = false,
	isNativeAd = false,
	isExternalNativeAd = false
}: {
	post: SidebarPost,
	currentBlog: Blog,
	parentBlogName?: string,
	index: number,
	gaEvent?: (string, number) => Array<mixed>,
	hideRecommendations?: boolean,
	hideViewcounts?: boolean,
	commentsDisabled?: boolean,
	serverSide?: boolean,
	isNativeAd?: boolean,
	isExternalNativeAd?: boolean
}) {
	// TODO: strip html tags from author name
	const truncatedHeadline = truncate(post.headline, 130);
	const isSponsored = post.sponsored || false;
	const isEditorial = post.editorial || false;
	const isBranded = (post.defaultBlogRecircGroup === 'fmgSatire') || false;

	return (
		<EnsureDefaultTheme>
			<SidebarItem>
				<LinkContainer href={post.permalink} events={!isSponsored && gaEvent && [gaEvent(post.permalink, index)]}>
					<Byline>
						{isSponsored && (
							<SponsoredLabelContainer>
								<SponsoredLabel isEditorial={isEditorial} isBranded={isBranded} locale={currentBlog.locale} />
							</SponsoredLabelContainer>
						)}
						{!isStudioAtGizmodo(post.defaultBlogId) && !isOnionLabs(post.defaultBlogId) && (
							<NativeShareLabel
								blog={currentBlog}
								parentBlogName={parentBlogName}
								defaultBlogDisplayName={post.defaultBlogDisplayName}
								defaultBlogRecircGroup={post.defaultBlogRecircGroup}
								defaultBlogGroup={post.defaultBlogGroup}
								showSharedLabel={!isNativeAd && (currentBlog.displayName !== post.defaultBlogDisplayName)}
								showViewOnLabel={isNativeAd}
								showExternalIcon={post.id === '0'}
							/>
						)}
					</Byline>
					<SidebarImage
						post={post}
						withOverlay
						hideRecommendations={hideRecommendations}
						hideViewcounts={hideViewcounts}
						commentsDisabled={commentsDisabled}
						blogGroup={currentBlog.blogGroup}
						serverSide={serverSide}
					/>
					{/* TODO QAStatus */}
					<Headline dangerouslySetInnerHTML={{ __html: truncatedHeadline }} isExternalNativeAd={isExternalNativeAd} />
					{post.id !== createPostId(0) && (
						<div>
							{post.authorName && !currentBlog.hideAuthorInfo && (
								<MetaItem>
									<strong>{post.authorName}</strong>
								</MetaItem>
							)}
							<PublishTime>
								{
									new DateTime({
										timestamp: post.publishTimeMillis,
										timezone: currentBlog.timezone,
										locale: currentBlog.locale
									}).relativeDateTime
								}
							</PublishTime>
						</div>
					)}
				</LinkContainer>
			</SidebarItem>
		</EnsureDefaultTheme>
	);
}

export default PopularPostItem;
