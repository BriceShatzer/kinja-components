import * as React from 'react';
import styled from 'styled-components';
import {
	boolean,
	storiesOf
} from 'base-storybook';

import { DateTime } from 'luxon';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';

import {
	BlogFollowNotification,
	MembershipResponseNotification,
	MessageNotification,
	PendingMembershipNotification,
	PostLikeGroupNotification,
	ReplyNotification,
	RepostNotification,
	UserFollowNotification,
	ProfilePageNotificationsView
} from './profile-page-notifications-view';

const timestamp = (new Date('March 27, 2016 11:45:00')).getTime();
const createdAt = DateTime.fromMillis(timestamp).toFormat('M/dd/yy h:mma').toLowerCase();
const authorJSON = {
	screenName: 'zsombi',
	displayName: 'Kovács Zsombor Benedek',
	avatar: {
		id: 'g1igwg6tluesdntr5fgm',
		format: 'jpg'
	}
};
const author2JSON = {
	screenName: 'pending.approval',
	displayName: 'The Big Boss',
	avatar: {
		id: 'insc834u83rhkrlzaj0d',
		format: 'jpg'
	}
};
const author3JSON = {
	screenName: 'iamacat',
	displayName: 'Bored Panda',
	avatar: {
		id: 'qmql9qs2kgkwhubbjphz',
		format: 'jpg'
	}
};
const blogJSON = {
	name: 'test',
	displayName: 'Test',
	canonicalHost: 'test.kinja.com',
	avatar: {
		id: 'qffunitzumc1lf4dcj15',
		format: 'jpg'
	}
};
const postJSON = {
	headline: 'This Is How Things Work Now At G/O Media',
	permalinkHost: 'https://deadspin.com',
	permalinkPath: '/this-is-how-things-work-now-at-g-o-media-1836908201',
	isStarter: true
};

const NotificationWrapper = styled.div`
	max-width: 75vw;
	margin: 0 auto;
`;

const notifications = [
	{
		$variant: 'PresentableUserFollow',
		createdAt: timestamp,
		sourceAuthorData: authorJSON
	},
	{
		$variant: 'PresentableApproval',
		createdAt: timestamp,
		sourceBlogData: blogJSON
	},
	{
		$variant: 'PresentablePostLikeGroup',
		createdAt: timestamp,
		likesCount: 99999,
		sourceAuthorsData: [author2JSON, authorJSON, author3JSON],
		postData: postJSON
	},
	{
		$variant: 'PresentableReply',
		createdAt: timestamp,
		sourceAuthorData: authorJSON,
		parentPostData: postJSON,
		postData: { ...postJSON, plaintext: 'le meilleur des mondes possibles', approved: true }
	},
	{
		$variant: 'PresentableRepost',
		createdAt: timestamp,
		sourceAuthorData: authorJSON,
		postData: postJSON,
		blogData: blogJSON
	},
	{
		$variant: 'PresentablePendingMembership',
		createdAt: timestamp,
		invitationId: '123',
		invitedByData: author2JSON,
		blogData: blogJSON
	},
	{
		$variant: 'PresentableMessage',
		createdAt: timestamp,
		invitationId: '123',
		sourceAuthorData: author3JSON,
		message: 'Lemon drops oat cake pastry tootsie roll carrot cake chocolate powder icing danish.'
	},
	{
		$variant: 'PresentableMembershipResponse',
		createdAt: timestamp,
		inviteeData: author2JSON,
		blogData: blogJSON,
		accepted: true
	}
];

storiesOf('3. Elements|User Notifications', module)
	.add('BlogFollowNotification', () => {
		return (
			<EnsureDefaultTheme>
				<NotificationWrapper>
					<BlogFollowNotification
						createdAt={createdAt}
						blog={blogJSON}
						seen={boolean('seen', true)}
					/>
				</NotificationWrapper>
			</EnsureDefaultTheme>
		);
	})
	.add('MembershipResponseNotification', () => {
		return (
			<EnsureDefaultTheme>
				<NotificationWrapper>
					<MembershipResponseNotification
						createdAt={createdAt}
						accepted={boolean('accepted', true)}
						invitee={author2JSON}
						invitedTo={blogJSON}
						seen={boolean('seen', true)}
					/>
				</NotificationWrapper>
			</EnsureDefaultTheme>
		);
	})
	.add('MessageNotification', () => {
		return (
			<EnsureDefaultTheme>
				<NotificationWrapper>
					<blockquote style={{backgroundColor: '#EEB544'}}>
						You can not create this notification anymore, but we still show old notifications of this type.
					</blockquote>
					<MessageNotification
						createdAt={createdAt}
						message={'Lemon drops oat cake pastry tootsie roll carrot cake chocolate powder icing danish.'}
						sourceAuthor={authorJSON}
						seen={boolean('seen', true)}
					/>
				</NotificationWrapper>
			</EnsureDefaultTheme>
		);
	})
	.add('PendingMembershipNotification', () => {
		return (
			<EnsureDefaultTheme>
				<NotificationWrapper>
					<PendingMembershipNotification
						createdAt={createdAt}
						sourceAuthor={authorJSON}
						invitationId={'123'}
						invitedBy={author2JSON}
						invitedTo={blogJSON}
						seen={boolean('seen', true)}
					/>
				</NotificationWrapper>
			</EnsureDefaultTheme>
		);
	})
	.add('PostLikeGroupNotification', () => {
		return (
			<EnsureDefaultTheme>
				<NotificationWrapper>
					<h2>Saved a post</h2>
					<PostLikeGroupNotification
						createdAt={createdAt}
						likesCount={1}
						post={{ ...postJSON, headline: null }}
						users={[authorJSON]}
						seen={boolean('seen', true)}
					/>
					<PostLikeGroupNotification
						createdAt={createdAt}
						likesCount={1}
						post={postJSON}
						users={[authorJSON]}
						seen={boolean('seen', true)}
					/>
					<PostLikeGroupNotification
						createdAt={createdAt}
						likesCount={2}
						post={postJSON}
						users={[authorJSON, author2JSON]}
						seen={boolean('seen', true)}
					/>
					<PostLikeGroupNotification
						createdAt={createdAt}
						likesCount={3}
						post={postJSON}
						users={[authorJSON, author2JSON, author3JSON]}
						seen={boolean('seen', true)}
					/>
					<PostLikeGroupNotification
						createdAt={createdAt}
						likesCount={4}
						post={postJSON}
						users={[authorJSON, author2JSON, author3JSON]}
						seen={boolean('seen', true)}
					/>
					<PostLikeGroupNotification
						createdAt={createdAt}
						likesCount={99999}
						post={postJSON}
						users={[authorJSON, author2JSON, author3JSON]}
						seen={boolean('seen', true)}
					/>
					<h2>Saved a reply</h2>
					<PostLikeGroupNotification
						createdAt={createdAt}
						likesCount={1}
						post={{ ...postJSON, isStarter: false, headline: 'This reply has a title? OMG' }}
						users={[authorJSON]}
						seen={boolean('seen', true)}
					/>
					<PostLikeGroupNotification
						createdAt={createdAt}
						likesCount={1}
						post={{ ...postJSON, isStarter: false, headline: null }}
						users={[authorJSON]}
						seen={boolean('seen', true)}
					/>
				</NotificationWrapper>
			</EnsureDefaultTheme>
		);
	})
	.add('ReplyNotification', () => {
		return (
			<EnsureDefaultTheme>
				<NotificationWrapper>
					<h2>Reply to a post</h2>
					<ReplyNotification
						createdAt={createdAt}
						likesCount={1}
						sourceAuthor={authorJSON}
						post={postJSON}
						reply={{ ...postJSON, plaintext: '...' }}
						approved={boolean('approved', true)}
						seen={boolean('seen', true)}
					/>
					<h2>Reply to a reply</h2>
					<ReplyNotification
						createdAt={createdAt}
						sourceAuthor={author2JSON}
						post={{ ...postJSON, isStarter: false }}
						reply={{ ...postJSON, plaintext: 'I need an answer NOW! Yes or no? Yes or no?' }}
						approved={boolean('approved', true)}
						seen={boolean('seen', true)}
					/>
				</NotificationWrapper>
			</EnsureDefaultTheme>
		);
	})
	.add('RepostNotification', () => {
		return (
			<EnsureDefaultTheme>
				<NotificationWrapper>
					<RepostNotification
						createdAt={createdAt}
						sourceAuthor={authorJSON}
						post={postJSON}
						targetBlog={blogJSON}
						seen={boolean('seen', true)}
					/>
				</NotificationWrapper>
			</EnsureDefaultTheme>
		);
	})
	.add('UserFollowNotification', () => {
		return (
			<EnsureDefaultTheme>
				<NotificationWrapper>
					<UserFollowNotification
						createdAt={createdAt}
						sourceAuthor={authorJSON}
						seen={boolean('seen', true)}
					/>
				</NotificationWrapper>
			</EnsureDefaultTheme>
		);
	})
	.add('All', () => {
		const notificationsWithSeen = notifications.map(notification => ({ ...notification, seen: boolean('seen', true) }));

		return (
			<EnsureDefaultTheme>
				<NotificationWrapper>
					<ProfilePageNotificationsView
						notifications={notificationsWithSeen}
					/>
				</NotificationWrapper>
			</EnsureDefaultTheme>
		);
	});
