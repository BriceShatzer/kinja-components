// @flow

import * as React from 'react';
import styled from 'styled-components';

import config from 'kinja-magma/config';
import media from '../../style-utils/media';
import ShareToolsStatic from '../post-elements/share-tools-static';
import MoreOnModule from '../more-on-module';
import AuthorBio from '../author-bio';
import { AuthorBioWrapper } from '../author-bio/author-bio-style';
import CommentsIframe from './comments-iframe';
import ConversationButton from './conversation-button';
import RevcontentWidget from '../revcontent';
import Loading from '../elements/loader/load-indicator';

import type { PermalinkProps } from './';
import type { AuthorUserProperties } from 'kinja-magma/models/UserProperty';

const CommentsContainer = styled.div`
	${media.smallOnly`
		margin: 0 -1.125rem;
	`}
`;

const ShowBrowserBottom = styled.div`
	display: none;
	${media.largeDown`
		display: block;
		margin: 2rem -1.125rem 0;
	`}
`;

const TaboolaWidget = styled.div`
	&.trc_related_container {
		padding: 0;
	}

	.thumbnails-a {
		padding: 0;
	}
`;

const RelatedContentContainer = styled.div`
	margin: 40px auto 0;
	max-width: ${props => props.theme.postContentMaxWidth};
`;

/**
 * Container for ads loaded from media.net
 */
export const MediaNetContainer = styled.div`
	iframe {
		margin: 1rem auto;
	}
`;

/**
 * Everything below the post content on a permalink
 */
const PermalinkBelowPost = (props: PermalinkProps & { hideShareFooter?: boolean }) => {
	const {
		parentBlog,
		authors,
		authorUserProperties,
		blog,
		features,
		isGoogleNewsBot,
		moreOnPosts,
		pageType,
		replyCount,
		starterPost,
		hideShareFooter,
		discussionSetting,
		withoutTaboola = false,
		commentsIframeUrl
	} = props;

	const {
		permalink, emailShareUrl, facebookShareUrl, twitterShareUrl
	} = starterPost;
	const postShareUrls = { permalink, emailShareUrl, facebookShareUrl, twitterShareUrl };
	const isLiveblog = discussionSetting && discussionSetting.mode === 'Liveblog';

	const shouldShowAuthorBio = starterPost.showAuthorBio && authors.length > 0 && authorUserProperties &&
		// Flow types the return value of Object.values as Array<mixed>, making it impossible to unwrap
		// More info: https://github.com/facebook/flow/issues/2221
		// eslint-disable-next-line flowtype/no-weak-types
		((Object.values(authorUserProperties): any): Array<AuthorUserProperties>).some(properties => properties.showBio);
	const shouldShowComments = !blog.commentsDisabled && !isGoogleNewsBot;

	const ConversationButtonContainer = styled.div`
		max-width: 636px;
		margin: 0 auto;
	`;


	return (
		<React.Fragment>
			{shouldShowAuthorBio && <AuthorBioWrapper
				withStandardGrid={Boolean(features && features.grid_standard)}
				wideRail={features && features.wide_rail}
			>
				<AuthorBio
					host={config.defaultHost}
					authors={authors}
					authorUserProperties={authorUserProperties}
				/>
			</AuthorBioWrapper>}

			{!hideShareFooter && <ShareToolsStatic
				blogTheme={blog.blogTheme}
				drawerIsOpen
				pageType={pageType}
				postShareUrls={postShareUrls}
				shareToolsPosition="bottom"
				withSubscriptionButton={true}
				withStandardGrid={Boolean(features && features.grid_standard)}
				wideRail={Boolean(features && features.wide_rail)}
			/>}

			<div className="js_liveblog-controls"></div>
			{isLiveblog && (
				<ConversationButtonContainer className="js_conversation-button">
					<ConversationButton label="Add Update" />
				</ConversationButtonContainer>
			)}

			<div className="js_qanda-controls"></div>

			{starterPost.isVideo && <ShowBrowserBottom className='js_show-browser-bottom' />}

			{moreOnPosts && moreOnPosts.length > 0 &&
				<MoreOnModule
					blog={blog}
					parentBlog={parentBlog}
					moreFromChartbeat={features && features.more_from_chartbeat}
					posts={moreOnPosts}
				/>
			}

			{shouldShowComments && <a name="replies"></a>}

			<div className="js_postbottom-waypoint-hook"></div>

			{shouldShowComments && (
				<CommentsContainer className="js_comments-iframe" data-src={commentsIframeUrl} data-replycount={replyCount}>
					{features && features.improved_comment_loading ?
						<Loading /> :
						<CommentsIframe
							src={commentsIframeUrl}
							height={700}
							isOpen={false}
							replyCount={replyCount}
						/>
					}
				</CommentsContainer>
			)}

			{features && features.comments_taboola_ad && (
				<MediaNetContainer className="js_ad-below-comments"></MediaNetContainer>
			)}

			{features && features.revcontent ? (
				<RelatedContentContainer>
					<RevcontentWidget blogGroup={blog.blogGroup} />
				</RelatedContentContainer>
			) : !withoutTaboola && (
				<RelatedContentContainer>
					<TaboolaWidget id="taboola-below-article-thumbnails"/>
				</RelatedContentContainer>
			)}
		</React.Fragment>
	);
};

export default PermalinkBelowPost;
