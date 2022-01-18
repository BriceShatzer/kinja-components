// @flow
import * as React from 'react';
import styled from 'styled-components';
import type { Props as UserMenuLinkProps } from './user-menu-link';
import { getKinjaHost } from '../../utils/url';
import type { TranslateFunction } from '../translator';
import { END_DATE_OF_POSTING } from '../../config/consts.js';
import Bell from 'kinja-components/components/icon19/Bell';
import Pencil from 'kinja-components/components/icon19/Pencil';
import InsertModule from 'kinja-components/components/icon19/InsertModule';
import Save from 'kinja-components/components/icon19/Bookmark';
import UserIcon from 'kinja-components/components/icon19/User';
import Home from 'kinja-components/components/icon19/Home';
import Issue from 'kinja-components/components/icon19/Issue';
import Settings from 'kinja-components/components/icon19/Settings';
import Lock from 'kinja-components/components/icon19/Lock';
import Bubble from 'kinja-components/components/icon19/Bubble';
import AddBlog from 'kinja-components/components/icon19/AddBlog';
import StarCircle from 'kinja-components/components/icon19/StarCircle';
import MomJeans from 'kinja-components/components/icon19/MomJeans';
import Star from 'kinja-components/components/icon19/Star';
import Logout from 'kinja-components/components/icon19/Logout';
import type Blog from 'kinja-magma/models/Blog';
import type User from 'kinja-magma/models/User';

type Props = {
	translate: TranslateFunction,
	ga: (...Array<mixed>) => void,
	isScrollback?: boolean,
	pageType: string,
	notificationCount: number,
	blog?: Blog,
	currentUser: User,
	features: { [name: string]: boolean },
	postId?: ?string,
	logout?: () => void,
	onEditHomepageClick: () => void
};

// window check is protection for node - the component doesn't render there though
const kinjaComHost = typeof window !== 'undefined' ? getKinjaHost() : '';

const isAllowedToPost = (createdMillis: number) => createdMillis < END_DATE_OF_POSTING;

const NotificationsContainer = styled.div`
	display: flex;
	align-items: center;
`;

const NotificationCountWrapper = styled.span`
	background-color: ${props => props.theme.color.primary};
	color: ${props => props.theme.color.white };
	text-align: center;
	padding: 3px 8px 1px;
	border-radius: 10px;
	margin-left: 0.5rem;
	max-width: 72px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export default function (props: Props): Array<UserMenuLinkProps> {
	const {
		translate,
		ga,
		isScrollback,
		pageType,
		notificationCount,
		blog,
		currentUser,
		features,
		postId,
		logout,
		onEditHomepageClick
	} = props;

	const tagIfScrollbackInGA = (name: string) => {
		return (name + `${isScrollback ? ' - scroll back' : ''}`);
	};

	const isSpecialSection = pageType === 'specialsection';
	const currentBlogId: ?string = blog && blog.id;
	const currentBlogName: ?string = blog && blog.name;
	const currentBlogDisplayName: ?string = blog && blog.displayName;
	const blogSlug: ?string = isSpecialSection ? window.location.pathname.replace('/s/','') : currentBlogName;
	const isCurrentBlogGroupBlog = blog && blog.properties && blog.properties.groupBlog ? blog.properties.groupBlog : false;
	const { screenName, isGmgMember, isSuperuser, isSales, membership, createdMillis } = currentUser;
	const isMemberCurrentBlog = currentBlogId ? !!(membership.find(blog => blog.blogId === currentBlogId)) : false;
	const isAdminCurrentBlog = currentBlogId ? !!(membership.find(membership =>
		membership.blogId === currentBlogId && (membership.hasRole('ADMIN') || membership.hasRole('OWNER'))
	)) : false;

	const yourProfile = {
		href: `//${kinjaComHost}/${screenName}`,
		icon: <UserIcon />,
		label: translate('Your Profile'),
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Your Profile'), pageType)
	};

	const notifications = {
		href: `//${kinjaComHost}/dashboard/notifications`,
		icon: <Bell />,
		label: (
			<NotificationsContainer>
				<span>{translate('Notifications')}</span>
				{
					notificationCount > 0 &&
					<NotificationCountWrapper>{notificationCount}</NotificationCountWrapper>
				}
			</NotificationsContainer>
		),
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - See All Notifications'), pageType)
	};

	const blogId = currentBlogId;
	const existingQueryString: string = (global && global.location && global.location.search) || '';
	const additionalQueryString = `${existingQueryString[0] === '?' ? '&' : '?'}blogid=${blogId || ''}`;
	const composeAPost = {
		href: `//${kinjaComHost}/write${existingQueryString}${additionalQueryString}`,
		icon: <Pencil />,
		label: translate('Compose a Post'),
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Compose Post'), pageType),
		shouldRender: isAllowedToPost(createdMillis) || isGmgMember || isSales || isSuperuser || (isCurrentBlogGroupBlog && isMemberCurrentBlog)
	};

	const savedArticles = {
		href: `//${kinjaComHost}/${screenName}/saved`,
		icon: <Save />,
		label: translate('Saved Articles'),
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Saved Articles'), pageType)
	};

	let manageBlogPath = 'manage/your/drafts';
	if (blog && blogSlug && isMemberCurrentBlog) {
		if (isSpecialSection || blog.properties && typeof blog.properties.isLiveCustomKinja !== 'undefined') {
			manageBlogPath = `manage/${blogSlug}/settings`;
		} else {
			manageBlogPath = `manage/${blogSlug}/drafts`;
		}
	}
	const manageBlog = {
		href: `//${kinjaComHost}/${manageBlogPath}`,
		icon: <Settings />,
		label: (currentBlogDisplayName && isMemberCurrentBlog) ?
			translate('Manage {blogName}', { blogName: isSpecialSection ? blogSlug : currentBlogDisplayName }) :
			translate('Manage Your Drafts'),
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Manage Blog'), pageType),
		shouldRender: isAllowedToPost(createdMillis) || isGmgMember || isSales || isSuperuser || (isCurrentBlogGroupBlog && isMemberCurrentBlog)
	};

	const editHomepage = {
		icon: <InsertModule />,
		label: translate('Curate This Page'),
		onClick: () => {
			ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Edit Homepage'), pageType);
			onEditHomepageClick();
		},
		shouldRender: (
			pageType === 'curatedHomepage' ||
			(pageType === 'tag' && features.curated_tagpage) ||
			((pageType === 'categoryStream' || pageType === 'sectionedCategoryStream') &&
				features.curated_storytypepage &&
				!window.location.pathname.match(/\/c\/[^/]+\/[^/]+\/[^/]+/) // not a subcategory
			)
		) && (isSuperuser || isAdminCurrentBlog)
	};

	const dashboard = {
		href: `//${kinjaComHost}/dashboard`,
		icon: <Home />,
		label: translate('Dashboard'),
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Private View'), pageType)
	};

	const reportAnIssue = {
		label: translate('Report an Issue'),
		icon: <Issue />,
		shouldRender: isGmgMember,
		onClick: () => {
			ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Bug Report'), pageType);
			window.Zendesk && window.Zendesk(currentUser.displayName);
		}
	};

	const superUserSettings = {
		href: `//${kinjaComHost}/superuser/${currentBlogName || ''}?superuser`,
		icon: <Lock />,
		label: translate('Superuser Settings'),
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Superuser'), pageType),
		shouldRender: !!(features.superuser) && isSuperuser &&
			(pageType === 'frontpage' || pageType === 'permalink' || pageType === 'curatedHomepage' || isSpecialSection)
	};

	const newSpecialSection = {
		href: `//${kinjaComHost}/superuser/specialsection/add`,
		icon: <AddBlog />,
		label: translate('New Special Section blog'),
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Create Custom Kinja'), pageType),
		shouldRender: isGmgMember || isSuperuser || isSales
	};

	let bizToolsPath;
	let bizToolsText = '';
	if (isSpecialSection) {
		bizToolsText = translate('Biz Tools for {blogName}', { blogName: blogSlug});
		bizToolsPath = blogSlug;
	} else if (postId && currentBlogName) {
		bizToolsText = translate('Biz Tools for Post');
		bizToolsPath = `${currentBlogName}/${postId}`;
	} else if (currentBlogDisplayName && currentBlogName) {
		bizToolsText = translate('Biz Tools for {blogName}', { blogName: currentBlogDisplayName });
		bizToolsPath = currentBlogName;
	}
	const bizTools = {
		href: `//${kinjaComHost}/biztools/${bizToolsPath || ''}`,
		icon: <Bubble />,
		label: bizToolsText,
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Sales Tools'), pageType),
		shouldRender: !!((isSuperuser || isSales) && currentBlogName)
	};

	const promote = {
		href: `//${kinjaComHost}/dfp/promote`,
		icon: <StarCircle />,
		label: translate('Promote'),
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Promote'), pageType),
		shouldRender: isSuperuser || isSales
	};

	const activePromotions = {
		href: `//${kinjaComHost}/dfp/promotions`,
		icon: <Star />,
		label: translate('Active Promotions'),
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Promotions'), pageType),
		shouldRender: isSuperuser || isSales
	};

	const createBlog = {
		href: `//${kinjaComHost}/superuser/blog/add`,
		icon: <AddBlog />,
		label: translate('Create blog'),
		onClick: () => ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Create Blog'), pageType),
		shouldRender: isSuperuser
	};

	const momJeans = {
		href: features.superuser ? '?superuser=off' : '?superuser=on',
		icon: <MomJeans />,
		label: features.superuser ? translate('Hide Mom Jeans') : translate('Show Mom Jeans'),
		shouldRender: isSuperuser,
		onClick: () => isSuperuser
			? ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Hide Mom Jeans'), pageType)
			: ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Show Mom Jeans'), pageType)
	};

	const logoutLink = {
		onClick: () => {
			if (logout) {
				logout();
				ga('Sub navigation', tagIfScrollbackInGA('User Menu Click - Logout'), pageType);
			}
		},

		icon: <Logout />,
		label: translate('Logout')
	};

	return [
		yourProfile,
		notifications,
		composeAPost,
		savedArticles,
		manageBlog,
		editHomepage,
		dashboard,
		reportAnIssue,
		superUserSettings,
		newSpecialSection,
		bizTools,
		promote,
		activePromotions,
		createBlog,
		momJeans,
		logoutLink
	].filter(item => typeof item.shouldRender === 'undefined' || item.shouldRender);
}