/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import Link from '../../elements/link';
import MultipleAuthorsStatic from '../multiple-authors-static';
import { LazyResponsiveImage } from '../../elements/image';
import MetaTime from '../meta-time';
import media from '../../../style-utils/media';
import { PermalinkAuthorClick } from '../../permalink/analytics';
import TagDropdown from './tag-dropdown';

import type Post from 'kinja-magma/models/Post';
import type User from 'kinja-magma/models/User';
import type { PageType } from 'kinja-magma/models/PageType';

const BLOG_ID_KINJA_DEALS = 86286;

const BylineContainer = styled.div`
	display: flex;
	flex-direction: row;
	font-family: ${props => props.theme.typography.utility.fontFamily};
	font-size: 16px;
	line-height: 21px;
	text-align: left;
`;

const AuthorAvatarContainer = styled.div`
	flex-basis: 40px;
	flex-grow: 0;
	flex-shrink: 0;
	margin-right: 10px;
	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		position: unset;
	}
	video {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: ${props => props.theme.color.whitesmoke};
	}
`;

const RightOfAvatarContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const AuthorContainer = styled.div`
	a,
	a:hover {
		font-size: 16px;
		color: ${props => props.theme.color.black};
	}
`;

const Separator = styled.div`
	display: inline-block;
	font-size: 16px;
	line-height: 17px;
	margin: 0 7px 2px 7px;
	color: ${props => props.theme.color.gray};
`;

const TagsContainer = styled.div`
	line-height: 19px;
`;

const TimeAndTags = styled.div`
	display: flex;
	${media.smallOnly`
		flex-direction: row;
		flex-wrap: wrap;
	`}
	${media.mediumUp`
		flex-direction: row;
		flex-wrap: wrap;
	`}

	time {
		font-size: 16px;
	}
`;

const PermalinkByline = ({
	authors,
	blogProperties,
	isScheduled,
	pageType,
	post,
	showTags = true,
	isSecondScroll = false,
	hideAuthorsOnBlog = false
}: {
	authors?: Array<User>,
	blogProperties: { alternativeFiledToText?: ?string, timezone: string },
	isScheduled?: boolean,
	pageType: PageType,
	post: Post,
	showTags?: boolean,
	isSecondScroll?: boolean,
	hideAuthorsOnBlog?: boolean
}) => {
	const { id,
		publishTimeMillis,
		securePermalink,
		tags,
		showByline,
		repost,
		defaultBlogId,
		sponsored,
		bylineProperties,
		salesAvatar,
		permalinkRedirect,
		isDeals,
		isFeatured } = post;
	const firstTag = tags && tags[0];
	const { timezone, alternativeFiledToText } = blogProperties;
	const hideAuthorInfo = (repost && defaultBlogId !== BLOG_ID_KINJA_DEALS) && !sponsored && !showByline;
	const hasBylineProperty = bylineProperties && bylineProperties.byline;
	const shouldShowAvatar = !hideAuthorsOnBlog &&
		bylineProperties &&
		!bylineProperties.byline &&
		authors &&
		!hideAuthorInfo;
	const shouldShowSalesAvatar = hasBylineProperty &&
		salesAvatar &&
		salesAvatar.uid;

	return (
		<BylineContainer>
			{/* Author Avatar */}
			{shouldShowAvatar && authors && authors.length === 1 && (
				<AuthorAvatarContainer>
					<Link href={`https://kinja.com/${authors[0].screenName}`}
						events={[PermalinkAuthorClick(authors[0].screenName)]}>
						<LazyResponsiveImage
							{...authors[0].avatar}
							transform="AvatarSmallAuto"
							noLazy
							croppedImage={true}
							sizes="40px"
							width="40"
							height="40"
						/>
					</Link>
				</AuthorAvatarContainer>
			)}
			{/* Sales Avatar */}
			{shouldShowSalesAvatar && salesAvatar && (
				<AuthorAvatarContainer>
					<LazyResponsiveImage
						id={salesAvatar.uid}
						transform="AvatarSmallAuto"
						noLazy
						croppedImage={true}
						sizes="40px"
						width="40"
						height="40"
					/>
				</AuthorAvatarContainer>
			)}

			{/* Author name(s) and publish time */}
			<RightOfAvatarContainer>
				{shouldShowAvatar && authors && Boolean(authors.length) &&
					<AuthorContainer isFeatured={isFeatured}>
						<MultipleAuthorsStatic
							authors={authors}
							postPermalinkRedirect={permalinkRedirect}
							postIsDeals={isDeals}
							pageType={pageType}
							index={0}
						/>
					</AuthorContainer>
				}
				{/* Tag dropdown */}
				{hasBylineProperty && salesAvatar && (
					<div>{bylineProperties.byline}</div>
				)}
				<TimeAndTags>
					{publishTimeMillis &&
						<MetaTime
							permalink={securePermalink}
							millis={repost ? repost.repostTimeMillis : publishTimeMillis}
							timezone={timezone}
							// locale="en-US"
							isScheduled={isScheduled}
							isSecondScroll={isSecondScroll}
							index={0}
							pageType={pageType}
							postId={id}
						/>
					}
					{showTags && firstTag &&
						<React.Fragment>
							<Separator>•</Separator>
							<TagsContainer>
								<TagDropdown tags={tags} alternativeFiledToText={alternativeFiledToText} />
							</TagsContainer>
						</React.Fragment>
					}
				</TimeAndTags>
			</RightOfAvatarContainer>

		</BylineContainer>
	);
};

export default PermalinkByline;
