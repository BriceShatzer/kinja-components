/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import Theme, { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import FeedItem from 'kinja-components/components/stream-new/feed-item';
import Button from 'kinja-components/components/buttons';
import ArrowRight from 'kinja-components/components/icon19/ArrowRight';
import { IconWrapper } from 'kinja-components/components/icon19/icon19';
import trimExcerpt from 'postbody/utils/trimExcerpt';
import { parseNode } from 'postbody/BlockNode';
import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';
import { Loading } from 'kinja-components/components/elements/loader';

import type { BlogThemeName } from 'kinja-components/components/theme/theme';
import type { Locale } from 'kinja-magma/models/Locale';
import type { PageType } from 'kinja-magma/models/PageType';
import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';
import type { BlogId } from 'kinja-magma/models/Id';

import Error from 'kinja-components/components/icon19/Error';


const StyledError = styled(Error)`
	display: block;
	text-align: center;
	svg {
		width: 28px;
		height: 28px;
	}
`;

const NoResultsText = styled.p`
	padding: 0;
	margin: 0;
	font-size: 20px;
	line-height: 24px;
`;

const NoResultsWrapper = styled.div`
	width: 100%;
	padding: 2rem 7rem;
	text-align: center;
	border-radius: 5px;
	background: ${props => props.theme.color.lightgray};
	margin-bottom: 1rem;
`;

export const TitleWrapper = styled.div`
	margin-bottom: 14px;

	${media.mediumUp`
		margin-bottom: 22px;
	`}
`;

export const Title = styled.span`
	font-size: 20px;
	line-height: 24px;
`;

const ResultsNumber = styled.span`
	display: none;
	font-size: 0.875rem;
	line-height: 1.125rem;
	color: ${props => props.theme.color.gray};

	${media.mediumUp`
		margin-left: 16px;
		display: inline;
	`}
`;

const FeedItemWrapper = styled.div`
	margin-bottom: 30px;

	${props => props.isBeforeDivider && css`
		margin-bottom: 35px;
	`}

	${media.mediumUp`
		padding-bottom: 25px;
		margin-bottom: 25px;
		border-bottom: 1px solid ${props => props.theme.color.lightgray};

		${props => props.isBeforeDivider && css`
			padding-bottom: 0;
			margin-bottom: 35px;
			border-bottom: none;
		`}
	`}
`;

export const Divider = styled.div`
	position: relative;
	width: 100%;
	padding: 15px;
	margin-bottom: 35px;
	font-weight: 16px;
	line-height: 21px;
	color: ${props => props.theme.color.white};
	background-color: ${props => props.theme.color.primary};
	cursor: pointer;

	span {
		display: block;
	}

	${IconWrapper} {
		position: absolute;
		top: calc(50% - 9px);
		right: 15px;
		margin-bottom: 30px;
	}

	${media.mediumUp`
		padding: 10px 15px;

		span {
			display: inline;
		}

		${IconWrapper} {
			margin-bottom: 41px
		}
	`}
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

export const Container = styled.div``;

type Props = {
	blog: Blog,
	blogTheme: BlogThemeName,
	dividerIndex?: ?number,
	hasResults: boolean,
	locale: Locale,
	networkName: string,
	numberOfResults?: number,
	onDividerClick: () => void,
	onMoreStoriesClick: () => void,
	pageType: PageType,
	posts: Array<Post>,
	storiesFrom?: Array<string>,
	simpleEmbiggen?: boolean,
	hasMoreResults: boolean,
	searchTerms: string,
	selectedBlogIds?: Array<BlogId>,
	networkBlogs: Array<Blog>,
	showNoresultMessage?: boolean,
	isLoading: boolean
}

export default function PostList({
	blog,
	blogTheme,
	dividerIndex,
	hasResults,
	locale,
	networkName,
	numberOfResults,
	onDividerClick,
	onMoreStoriesClick,
	pageType,
	posts,
	storiesFrom,
	simpleEmbiggen,
	hasMoreResults,
	searchTerms,
	selectedBlogIds,
	networkBlogs,
	showNoresultMessage,
	isLoading
}: Props) {
	const translate = createTranslate(translations, locale);

	const selectedBlogNames = selectedBlogIds && selectedBlogIds.length > 0 ? selectedBlogIds.map((selectedBlogId: BlogId) => {
		const postBlog = networkBlogs.find(blog => blog.id === selectedBlogId);
		let displayName = postBlog ? postBlog.displayName : '';
		if (storiesFrom && storiesFrom.length) {
			displayName = storiesFrom[0];
		}

		return displayName;
	}) : [];

	const isAllBlogsSelected = selectedBlogIds && networkBlogs && selectedBlogIds.length === networkBlogs.length;

	const blogList = hasResults ? storiesFrom : selectedBlogNames;
	const storiesLength = blogList ? blogList.length : 0;

	const blogNameList = blogList ? blogList.map((blogName, index) => {
		const isLast = storiesLength >= 2 && index === storiesLength - 1;
		const isBeforeLast = storiesLength >= 3 && index < storiesLength - 2;
		return `${isLast ? ' and ' : ''}${blogName}${isBeforeLast ? ', ' : ''}`;
	}).join('') : '';

	const title = storiesFrom && storiesFrom.length
		? <Title>{`${translate('More Recent Stories from')} ${blogNameList}`}</Title>
		: <Title>{`${translate('Latest posts from')} ${networkName}`}</Title>;

	return (
		<EnsureDefaultTheme>
			<Container>
				{!hasResults && showNoresultMessage &&
					<React.Fragment>
						<NoResultsWrapper>
							<StyledError />
							{blogNameList ? (
								<NoResultsText>
									{`${translate('We couldn\'t find anything matching the term')} "${searchTerms}" on ${blogNameList}`}
								</NoResultsText>
							) : (
								<NoResultsText>{`${translate('We couldn\'t find anything matching the term')} "${searchTerms}"`}</NoResultsText>
							)}
						</NoResultsWrapper>
						{!isAllBlogsSelected && blog && blog.isGmgBlog &&
							<NoResultsText>
								{`${translate('You can try ')}`}
								<a onClick={onDividerClick}>{`${translate('expanding your search to all G/O Media sites')}`}</a></NoResultsText>
						}
					</React.Fragment>
				}

				{hasResults &&
					<TitleWrapper>
						{title}
						{numberOfResults && numberOfResults > 0
							? <ResultsNumber>{`${numberOfResults} ${numberOfResults > 1 ? translate('results') : translate('result')}`}</ResultsNumber>
							: null
						}
					</TitleWrapper>
				}

				{posts.map((post, index) => {
					return (
						<React.Fragment key={post.id}>
							<Theme blog={post.defaultBlog ? post.defaultBlog.blogTheme : 'default'}>
								<FeedItemWrapper isBeforeDivider={index === dividerIndex && hasResults}>
									<FeedItem
										authors={post.authors}
										excerpt={post.firstParagraph ? trimExcerpt([parseNode(post.firstParagraph)], 320) : []}
										index={index}
										pageType={pageType}
										post={post}
										simpleEmbiggen={simpleEmbiggen}
										withBranding
										withExcerpt={true}
										withPostTools={false}
										{...post.defaultBlog ? { blog: post.defaultBlog } : null}
									/>
								</FeedItemWrapper>
							</Theme>

							{index === dividerIndex && hasResults && storiesLength
								? <Theme blog={blogTheme}>
									<Divider onClick={onDividerClick}>
										<span>{translate('Not finding what you\'re looking for?')} </span>
										<span>{translate('Try searching on all G/O Media sites')}</span>
										<ArrowRight />
									</Divider>
								</Theme>
								: null}
						</React.Fragment>
					);
				})}

				{hasMoreResults &&
					<ButtonWrapper>
						{isLoading ? (
							<Loading />
						) : (
							<Button label={translate('More stories')} weight="tertiary" onClick={onMoreStoriesClick} />
						)}
					</ButtonWrapper>
				}
			</Container>
		</EnsureDefaultTheme>
	);
}

PostList.defaultProps = {
	blogTheme: 'default',
	locale: 'en-US'
};
