// @flow
import * as React from 'react';
import styled from 'styled-components';

// utils
import { DateTime } from 'luxon';
import { sanitizeText, sanitizeHeadline } from 'kinja-magma/utils/sanitize';

// models
import Pagination from 'kinja-magma/models/Pagination';
import Notification from 'kinja-magma/models/Notification';

// components
import Button, { ButtonWrapper } from 'kinja-components/components/buttons';
import LoadMore from 'kinja-components/components/stream/load-more';
import { UserAvatar, UserAvatarContainer } from 'kinja-components/components/user-avatar/user-avatar';
import Link from 'kinja-components/components/elements/link';

// icons
import BookmarkIcon from 'kinja-components/components/icon19/Bookmark';
import BubbleIcon from 'kinja-components/components/icon19/Bubble';
import EyeIcon from 'kinja-components/components/icon19/Eye';
import PlusIcon from 'kinja-components/components/icon19/Plus';
import SharedPostIcon from 'kinja-components/components/icon19/SharedPost';
import UserAddIcon from 'kinja-components/components/icon19/UserAdd';
import UserIcon from 'kinja-components/components/icon19/User';

// analytics
import { PrivateNotificationsClick } from './analytics';

// models
import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type User from 'kinja-magma/models/User';

const DateHeadline = styled.h4`
	margin-top: 30px;
`;

const PendingLabel = styled.div`
	margin: 0.5rem 0 0 1rem;
	color: ${({ theme }) => theme.color.alert};
`;

const MessageAndTimeStamp = styled.div`
	flex-grow: 1;
`;

const IconTimeStamp = styled(Link)`
	display: flex;
	flex-direction: row;
	font-size: 14px;
	color: ${({ theme }) => theme.color.gray};
	margin-top: 0.5rem;

	a {
		color: ${({ theme }) => theme.color.gray};

		:hover {
			color: ${({ theme }) => theme.color.gray};
		}
	}

	svg {
		height: 16px;
		width: 16px;
		margin-top: 3px;
		margin-right: 4px;
	}
`;

const TimeStampWrapper = styled.div`
	display: flex;
	font-size: 14px;
`;

const NotificationWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	padding: 0.5rem;
	border-top: 1px solid ${({theme}) => theme.color.lightgray};

	${({ theme, last }) => last && `
		border-bottom: 1px solid ${theme.color.lightgray};
	`}

	${({ theme, unseen }) => unseen && `
		background-color: ${theme.color.backgroundLight};

		blockquote {
			background-color: #fff;
		}
	`}

	${({ pending }) => pending && `
		blockquote {
			opacity: 0.5;
			filter: grayscale(1);
		}
	`}

	${UserAvatarContainer} {
		flex-shrink: 0;
		margin-right: 10px;
	}

	blockquote {
		background: ${({theme}) => theme.color.whitesmoke};
		border: none;
		color: ${({theme}) => theme.color.darksmoke};
		font-style: normal;
		padding: 0.5rem 1rem;
		margin: 0.25rem auto;
	}
`;

const NotificationActions = styled.div`
	margin-top: 0.5rem;
	${ButtonWrapper} {
		margin-right: 10px;
	}
`;

type LinkToPostProps = {
	headline: ?string,
	headlinePlaceholder?: string
};
const LinkToPost = ({ headline, headlinePlaceholder = 'this post', ...props }: LinkToPostProps) => (
	headline ?
		<Link {...props} dangerouslySetInnerHTML={{__html: sanitizeHeadline(headline)}} /> :
		<Link {...props}>{headlinePlaceholder}</Link>
);

export function PendingMembershipNotification({
	last,
	seen,
	createdAt,
	invitedBy,
	invitedTo,
	invitationId
}: {
	last: boolean,
	seen: boolean,
	createdAt: string,
	invitedBy: User,
	invitedTo: Blog,
	invitationId: string
}) {
	const linkToBlog = {
		href: `https://${invitedTo.canonicalHost}`,
		events: [PrivateNotificationsClick('PendingMembership')]
	};
	return (
		<NotificationWrapper unseen={!seen} last={last} className="js_notification"
			data-invitation-to={invitedTo.displayName}
			data-invitation-id={invitationId}
		>
			<UserAvatar image={invitedBy.avatar} lazy={false} />
			<MessageAndTimeStamp>
				<a href={`https://kinja.com/${invitedBy.screenName}`}>{invitedBy.displayName}</a>
				{' invited you to be an author on '}
				<Link {...linkToBlog}>{invitedTo.displayName}</Link>
				<NotificationActions>
					<Button small label="Accept" className="js_respond-invite" data-action="accept" />
					<Button small label="Decline" weight="secondary" className="js_respond-invite" data-action="reject" />
				</NotificationActions>
				<IconTimeStamp {...linkToBlog}>
					<UserAddIcon />
					{createdAt}
				</IconTimeStamp>
			</MessageAndTimeStamp>
		</NotificationWrapper>
	);
}

export function MembershipResponseNotification({
	last,
	seen,
	createdAt,
	accepted,
	invitee,
	invitedTo
}: {
	last: boolean,
	seen: boolean,
	createdAt: string,
	accepted: ?boolean,
	invitee: User,
	invitedTo: Blog
}) {
	const linkToMembers = {
		href: `https://kinja.com/manage/${invitedTo.name}/members`,
		events: [PrivateNotificationsClick('PresentableMembership')]
	};
	return (
		<NotificationWrapper unseen={!seen} last={last} className="js_notification">
			<UserAvatar image={invitee.avatar} lazy={false} />
			<MessageAndTimeStamp>
				<a href={`https://kinja.com/${invitee.screenName}`}>{invitee.displayName}</a>
				{accepted ? ' accepted your invitation to ' : ' declined your invitation to '}
				<Link {...linkToMembers}>
					{invitedTo.displayName}
				</Link>
				<IconTimeStamp {...linkToMembers}>
					<UserIcon />
					{createdAt}
				</IconTimeStamp>
			</MessageAndTimeStamp>
		</NotificationWrapper>
	);
}

export function UserFollowNotification({
	last,
	seen,
	createdAt,
	sourceAuthor
}: {
	last: boolean,
	seen: boolean,
	createdAt: string,
	sourceAuthor: User
}) {
	const linkToProfile = {
		href: `https://kinja.com/${sourceAuthor.screenName}`,
		events: [PrivateNotificationsClick('UserFollow')]
	};
	return (
		<NotificationWrapper unseen={!seen} last={last} className="js_notification">
			<UserAvatar image={sourceAuthor.avatar} lazy={false} />
			<MessageAndTimeStamp>
				<Link {...linkToProfile}>
					{sourceAuthor.displayName}
				</Link>
				{' started following you'}
				<IconTimeStamp {...linkToProfile}>
					<EyeIcon />
					{createdAt}
				</IconTimeStamp>
			</MessageAndTimeStamp>
		</NotificationWrapper>
	);
}

export function MessageNotification({
	last,
	seen,
	createdAt,
	sourceAuthor,
	message
}: {
	last: boolean,
	seen: boolean,
	createdAt: string,
	sourceAuthor: User,
	message: ?string
}) {
	const linkToProfile = {
		href: `https://kinja.com/${sourceAuthor.screenName}`,
		events: [PrivateNotificationsClick('Message')]
	};
	return (
		<NotificationWrapper unseen={!seen} last={last} className="js_notification">
			<UserAvatar image={sourceAuthor.avatar} lazy={false} />
			<MessageAndTimeStamp>
				<Link {...linkToProfile}>{sourceAuthor.displayName}</Link>
				{' messaged you'}
				{message && <blockquote dangerouslySetInnerHTML={{__html: sanitizeText(message)}}></blockquote>}
				<IconTimeStamp {...linkToProfile}>
					<BubbleIcon />
					{createdAt}
				</IconTimeStamp>
			</MessageAndTimeStamp>
		</NotificationWrapper>
	);
}

export function RepostNotification({
	last,
	seen,
	createdAt,
	sourceAuthor,
	post,
	targetBlog
}: {
	last: boolean,
	seen: boolean,
	createdAt: string,
	sourceAuthor: User,
	post: Post,
	targetBlog: Blog
}) {
	const linkToPost = {
		events: [PrivateNotificationsClick('Repost')],
		href: `${post.permalinkHost}${post.permalinkPath}`
	};
	return (
		<NotificationWrapper unseen={!seen} last={last} className="js_notification">
			<UserAvatar image={sourceAuthor.avatar} lazy={false} />
			<MessageAndTimeStamp>
				<a href={`https://kinja.com/${sourceAuthor.screenName}`}>{sourceAuthor.displayName}</a>
				{' reposted '}
				<LinkToPost headline={post.headline} {...linkToPost} />
				{' to '}
				<a href={`https://${targetBlog.canonicalHost}`}>
					{targetBlog.displayName}
				</a>
				<IconTimeStamp {...linkToPost}>
					<SharedPostIcon />
					{createdAt}
				</IconTimeStamp>
			</MessageAndTimeStamp>
		</NotificationWrapper>
	);
}

export function BlogFollowNotification({
	last,
	seen,
	createdAt,
	blog
}: {
	last: boolean,
	seen: boolean,
	createdAt: string,
	blog: Blog
}) {
	const linkToBlog = {
		href: `https://${blog.canonicalHost}`,
		events: [PrivateNotificationsClick('Approval')]
	};
	return (
		<NotificationWrapper unseen={!seen} approved last={last} className="js_notification">
			{blog.avatar && <UserAvatar image={blog.avatar} lazy={false} />}
			<MessageAndTimeStamp>
				<Link {...linkToBlog}>
					{blog.displayName}
				</Link>
				{' started following you '}
				<IconTimeStamp {...linkToBlog}>
					<PlusIcon />
					{createdAt}
				</IconTimeStamp>
			</MessageAndTimeStamp>
		</NotificationWrapper>
	);
}

export function ReplyNotification({
	last,
	seen,
	createdAt,
	sourceAuthor,
	reply,
	post,
	approved
}: {
	last: boolean,
	seen: boolean,
	createdAt: string,
	sourceAuthor: User,
	reply: Post,
	post: Post,
	approved: ?boolean
}) {
	return (
		<NotificationWrapper unseen={!seen} pending={!approved} last={last} className="js_notification">
			<UserAvatar image={sourceAuthor.avatar} lazy={false} />
			<MessageAndTimeStamp>
				<a href={`https://kinja.com/${sourceAuthor.screenName}`}>
					{sourceAuthor.displayName}
				</a>
				{post.isStarter ? ' replied to your post ' : ' replied to you in '}
				<LinkToPost headline={post.headline} href={`${post.permalinkHost}${post.permalinkPath}`} />
				{reply && <blockquote dangerouslySetInnerHTML={{__html: sanitizeText(reply.plainTextExcerpt)}}></blockquote>}
				<TimeStampWrapper>
					<IconTimeStamp
						href={`${reply.permalinkHost}${reply.permalinkPath}`}
						events={[PrivateNotificationsClick('Reply')]}
					>
						<BubbleIcon />
						{createdAt}
					</IconTimeStamp>
					{!approved && <PendingLabel>{'Pending approval'}</PendingLabel>}
				</TimeStampWrapper>
			</MessageAndTimeStamp>
		</NotificationWrapper>
	);
}

export function PostLikeGroupNotification({
	last,
	seen,
	createdAt,
	likesCount,
	post,
	users
}: {
	last: boolean,
	seen: boolean,
	createdAt: string,
	likesCount: number,
	post: Post,
	users: Array<User>
}) {
	const firstUser = users[0];
	const numberOfUsersToShow = 3;
	const usersToShow = users.slice(0, numberOfUsersToShow);
	const numberOfUsersNotShown = likesCount - numberOfUsersToShow;

	const linkToPost = {
		events: [PrivateNotificationsClick('Repost')],
		href: `${post.permalinkHost}${post.permalinkPath}`
	};

	return (
		<NotificationWrapper unseen={!seen} last={last} className="js_notification">
			<UserAvatar image={firstUser.avatar} lazy={false} />
			<MessageAndTimeStamp>
				{usersToShow.map((user, index, usersToShow) => {
					const last = index === usersToShow.length - 1;
					const secondToLast = index === usersToShow.length - 2;
					const userSeparator = (() => {
						if (secondToLast && numberOfUsersNotShown <= 0) { return ' and '; }
						if (last) { return ''; }
						return ', ';
					})();

					return (<React.Fragment key={user.screenName}>
						<Link
							href={`https://kinja.com/${user.screenName}`}
							events={[PrivateNotificationsClick('LikeGroup')]}
						>{user.displayName}</Link>
						{userSeparator}
					</React.Fragment>);
				})}
				{numberOfUsersNotShown === 1 && ' and someone else'}
				{numberOfUsersNotShown > 1 && ` and ${numberOfUsersNotShown} others`}
				{' saved '}
				<LinkToPost
					headline={post.headline}
					headlinePlaceholder={post.isStarter ? 'your post' : 'your reply'}
					{...linkToPost}
				/>
				<IconTimeStamp {...linkToPost}>
					<BookmarkIcon />
					{createdAt}
				</IconTimeStamp>
			</MessageAndTimeStamp>
		</NotificationWrapper>
	);
}

export const ProfilePageNotificationsView = ({
	notifications,
	pagination
}: {
	notifications: Array<Notification>,
	pagination: ?Pagination
}) => {
	const renderNotificationItems = (items: Array<Notification>) => items.map((notification, index, array) => {
		const createdAt = DateTime.fromMillis(notification.createdAt).toFormat('M/dd/yy h:mma').toLowerCase();
		const last = index === array.length - 1;

		switch (notification.$variant) {
			case 'PresentableUserFollow':
				return notification.sourceAuthorData && <UserFollowNotification
					key={notification.id}
					last={last}
					createdAt={createdAt}
					seen={notification.seen}
					sourceAuthor={notification.sourceAuthorData}
				/>;
			case 'PresentableApproval':
				return notification.sourceBlogData && <BlogFollowNotification
					key={notification.id}
					last={last}
					createdAt={createdAt}
					seen={notification.seen}
					blog={notification.sourceBlogData}
				/>;
			case 'PresentablePostLikeGroup':
				return notification.sourceAuthorsData && notification.postData && notification.likesCount && <PostLikeGroupNotification
					key={notification.id}
					last={last}
					createdAt={createdAt}
					seen={notification.seen}
					likesCount={notification.likesCount}
					post={notification.postData}
					users={notification.sourceAuthorsData}
				/>;
			case 'PresentableReply':
				return notification.sourceAuthorData && notification.postData && notification.parentPostData && <ReplyNotification
					key={notification.id}
					last={last}
					createdAt={createdAt}
					seen={notification.seen}
					post={notification.parentPostData}
					reply={notification.postData}
					sourceAuthor={notification.sourceAuthorData}
					approved={notification.postData.approved}
				/>;
			case 'PresentableRepost':
				return notification.sourceAuthorData && notification.postData && notification.blogData && <RepostNotification
					key={notification.id}
					last={last}
					createdAt={createdAt}
					seen={notification.seen}
					sourceAuthor={notification.sourceAuthorData}
					post={notification.postData}
					targetBlog={notification.blogData}
				/>;
			case 'PresentablePendingMembership':
				return notification.invitationId && notification.invitedByData && notification.blogData && <PendingMembershipNotification
					key={notification.id}
					last={last}
					createdAt={createdAt}
					seen={notification.seen}
					invitationId={notification.invitationId}
					invitedBy={notification.invitedByData}
					invitedTo={notification.blogData}
				/>;
			case 'PresentableMessage':
				return notification.sourceAuthorData && <MessageNotification
					key={notification.id}
					last={last}
					createdAt={createdAt}
					seen={notification.seen}
					message={notification.message}
					sourceAuthor={notification.sourceAuthorData}
				/>;
			case 'PresentableMembershipResponse':
				return notification.inviteeData && notification.blogData && <MembershipResponseNotification
					key={notification.id}
					last={last}
					createdAt={createdAt}
					seen={notification.seen}
					accepted={notification.accepted}
					invitee={notification.inviteeData}
					invitedTo={notification.blogData}
				/>;
			default:
				return <code>{notification.$variant}</code>;
		}
	});

	const groupedByDate = notifications.reduce((a, c: Notification) => {
		const date = DateTime.fromMillis(c.createdAt).toFormat('MMMM d, y');
		a[date] = a[date] || [];
		a[date].push(c);
		return a;
	}, {});

	const finalGroupedNotifications = Object.keys(groupedByDate).map<React.Element<*>>((date: string) => {
		const items = groupedByDate[date];
		const renderedItems = renderNotificationItems(items);
		return <React.Fragment key={date}>
			<DateHeadline>{date}</DateHeadline>
			{renderedItems}
		</React.Fragment>;
	});

	return <React.Fragment>
		{finalGroupedNotifications}
		{pagination && <LoadMore
			pageType={'profilepage'}
			pagination={pagination}
			label='Older notifications'
		/>}
	</React.Fragment>;
};
