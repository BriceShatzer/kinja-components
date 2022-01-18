/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import Toggle, { ToggleWrapper } from '../../form/toggle';
import FeedItem from '../../stream-new/feed-item';
import Splice, { PromotedSplice } from '../splices';
import Button from '../../buttons';
import { Loading } from '../../elements/loader';
import { ButtonWrapper } from '../post-list-container';
import FeedItemWrapper, { PostWrapper } from './FeedItemWrapper';
import Theme from '../../theme';
import { FRONTPAGE_INSTREAM_NATIVE_AD_INDICES } from '../../stream-new';
import createTranslate from '../../translator';
import translations from './translations';

import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type { PostId } from 'kinja-magma/models/Id';
import type { Locale } from 'kinja-magma/models/Locale';
import type { PageType } from 'kinja-magma/models/PageType';

const Container = styled.div`
	max-width: 740px;
	margin: 0 auto;

	${ToggleWrapper} {
		margin-bottom: 55px;
	}
`;

const Divider = styled.div`
	height: 20px;
	width: 972px;
	margin-left: calc((-972px + 100%) / 2);
	margin-bottom: 35px;
	font-size: 15px;
	text-align: center;
	text-transform: uppercase;
	line-height: 21px;
	color: ${props => props.theme.color.white};
	background-color: ${props => props.theme.color.logo};
`;

const MessageBox = styled.span`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 40px 0;
	font-size: 17px;
`;


type Props = {
	hasActivePromotions: boolean,
	blog: Blog,
	hasMore: boolean,
	isLoading: boolean,
	locale: Locale,
	onEmbiggenClick: (postId: PostId, isEmbiggened: boolean, permalink: string) => void,
	onLoadMoreClick: () => void,
	pageType: PageType,
	posts: Array<Post>,
	scheduledPosts?: Array<Post>,
	withExcerpt?: boolean,
	simpleEmbiggen?: boolean
}


class StreamContainer extends React.Component<Props, {
	showScheduledPosts: boolean
}> {
	static defaultProps = {
		isLoading: false,
		locale: 'en-US',
		pageType: 'manageblog'
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			showScheduledPosts: false
		};
	}

	toggleScheduledPosts() {
		this.setState({
			showScheduledPosts: !this.state.showScheduledPosts
		});
	}

	getPostPermalink(post: Post) {
		const { permalink, permalinkHost, permalinkPath } = post;
		return !permalinkHost || !permalinkPath ? permalink : `${permalinkHost}${permalinkPath}`;
	}

	render() {
		const {
			hasActivePromotions,
			blog,
			hasMore,
			isLoading,
			locale,
			onEmbiggenClick,
			onLoadMoreClick,
			pageType,
			posts,
			scheduledPosts,
			withExcerpt,
			simpleEmbiggen
		} = this.props;
		const { showScheduledPosts } = this.state;

		const translate = createTranslate(translations, locale);
		const toggleOnLabel = translate('Show Scheduled Items');
		const toggleOffLabel = translate('Hide Scheduled Items');
		const dividerLabel = translate('Current Time');
		const noScheduledPostMessage = translate('No scheduled posts on this blog.');

		const renderScheduledPost = scheduledPosts => {
			if (scheduledPosts && scheduledPosts.length) {
				return scheduledPosts.map((post, index) => {
					const { defaultBlog } = post;
					if (!post.repost || (defaultBlog && defaultBlog.properties && blog.properties.blogGroup === defaultBlog.properties.blogGroup)) {
						return (
							<FeedItemWrapper
								isLastScheduledItem={index === scheduledPosts.length - 1}
								isEmbiggened={post.isEmbiggened}
								key={post.id}
								permalink={this.getPostPermalink(post)}
								postId={post.id}
								onEmbiggenClick={(postId, isEmbiggened, permalink) => onEmbiggenClick(postId, isEmbiggened, permalink)}
							>
								<FeedItem
									authors={post.authors}
									blog={blog}
									index={0}
									pageType={pageType}
									post={post}
									repostBlog={post.repost && post.defaultBlog}
									withExcerpt={withExcerpt}
									simpleEmbiggen={simpleEmbiggen}
									embiggenPosts
								/>
							</FeedItemWrapper>
						);
					} else {
						return (
							<PostWrapper key={post.id} isLastScheduledItem={index === scheduledPosts.length - 1}>
								<Splice
									blog={post.defaultBlog}
									index={0}
									locale={locale}
									post={post}
									pageType={pageType}
									timezone={blog.timezone}
								/>
							</PostWrapper>
						);
					}
				});
			}

			return null;
		};

		const renderPosts = posts => {
			if (posts && posts.length) {
				return posts.map((post, index) => {
					const { defaultBlog } = post;
					if (!post.repost || (defaultBlog && defaultBlog.properties && blog.properties.blogGroup === defaultBlog.properties.blogGroup)) {
						return (
							<React.Fragment key={post.id}>
								{FRONTPAGE_INSTREAM_NATIVE_AD_INDICES.includes(index) && hasActivePromotions && <PostWrapper><PromotedSplice /></PostWrapper>}
								<FeedItemWrapper
									isEmbiggened={post.isEmbiggened}
									permalink={this.getPostPermalink(post)}
									postId={post.id}
									onEmbiggenClick={(postId, isEmbiggened, permalink) => onEmbiggenClick(postId, isEmbiggened, permalink)}
								>
									<FeedItem
										authors={post.authors}
										blog={blog}
										index={0}
										pageType={pageType}
										post={post}
										repostBlog={post.repost && post.defaultBlog}
										simpleEmbiggen={simpleEmbiggen}
										embiggenPosts
									/>
								</FeedItemWrapper>
							</React.Fragment>
						);
					} else {
						return (
							<React.Fragment key={post.id}>
								{FRONTPAGE_INSTREAM_NATIVE_AD_INDICES.includes(index) && hasActivePromotions && <PostWrapper><PromotedSplice /></PostWrapper>}
								<PostWrapper>
									<Splice
										blog={post.defaultBlog}
										index={0}
										locale={locale}
										post={post}
										pageType={pageType}
										timezone={blog.timezone}
									/>
								</PostWrapper>
							</React.Fragment>
						);
					}
				});
			}

			return null;
		};


		return (
			<Theme blog={blog.blogTheme}>
				<Container>
					<Toggle
						disabled
						label={showScheduledPosts ? toggleOffLabel : toggleOnLabel}
						name="show-scheduled"
						onChange={this.toggleScheduledPosts.bind(this)}
					/>

					{/* SCHEDULED POSTS */}
					{showScheduledPosts && renderScheduledPost(scheduledPosts)}

					{showScheduledPosts && scheduledPosts && !scheduledPosts.length && <MessageBox>{noScheduledPostMessage}</MessageBox>}
					{/* DIVIDER BETWEEN PUBLISHED AND SCHEDULED POSTS */}
					{showScheduledPosts && <Divider>{dividerLabel}</Divider>}

					{/* PUBLISHED POSTS */}
					{renderPosts(posts)}

					{/* LOAD MORE BUTTON */}
					{hasMore &&
						<ButtonWrapper>
							{isLoading
								? <Loading />
								: <Button small weight="tertiary" label="Load More" onClick={onLoadMoreClick} />
							}
						</ButtonWrapper>
					}
				</Container>
			</Theme>
		);
	}
}


export default StreamContainer;
