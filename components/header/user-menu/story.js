/* eslint no-new-func:0 */

import React from 'react';
import {
	action,
	blogGroup,
	boolean,
	number,
	select,
	storiesOf,
	withDocs
} from 'base-storybook';
import README from './README.md';

import imageUrl from 'kinja-images/imageUrl';
import Theme  from '../../theme';
import UserButton from '../../user-button/UserButton';

import currentBlogFixture from '../../../__stubs__/currentBlog.json';
import memberBlogFixture from '../../../__stubs__/currentBlog.kotaku.json';
import currentUserFixture from '../../../__stubs__/currentUser.json';
import notificationFixture from '../../../__stubs__/notification.json';
import sectionsKotakuFixture from '../../../__stubs__/sectionsKotaku.json';
import popularPostsFixture from '../../../__stubs__/popularPosts.json';
import navbarConfigFixture from '../../../__stubs__/navbarConfig.json';


// const notifications = [
// 	...notificationsFixture.data.items
// ];

const stubbedProps = {
	// methods passed in from BaseApp.js;
	// stubbed for storybook as an identity fn (x → x)
	isVertical: false,
	feature: { isOn: () => true },
	pageType: 'frontpage',
	displayLogin: () => {},
	imageUrl,
	getMostPopularPosts: () => popularPostsFixture,
	getNavigationItems: () => navbarConfigFixture,
	getNotificationCount: () => {},
	getNotifications: () => notificationFixture,
	getRelativeTime: () => {},
	getSections: () => sectionsKotakuFixture,
	triggerHoverNav: () => ({ blogId: '9' }),
	navigationItems: navbarConfigFixture
};

const globalProps = actionFn => ({
	// Mock Google Analytics
	ga: (...rest) => {
		actionFn('HOC(Analytics)')(...rest);
		return false;
	}
});

storiesOf('4. Components|Navigation/Header/Elements', module)
	.add('User Menu',
		withDocs(README, () => {
			const isLoggedIn = boolean('Logged In?', true);
			const userButtonProps = { version2: true };
			const currentBlogProps = { currentBlog: currentBlogFixture };

			if (isLoggedIn) {
				const hasAvatar = boolean('Current User - Has Avatar?', true);
				const isMember = boolean('Current User - Has a Role?', true);
				const isSales = boolean('Current User - Is Sales?', true);
				const isSuperuser = boolean('Current User - Is Super User?', true);

				currentBlogProps.currentBlog = isMember ? memberBlogFixture : currentBlogFixture;
				currentBlogProps.currentUser = {
					...currentUserFixture
				};

				userButtonProps.notificationCount = number('notificationCount', 0);

				currentBlogProps.currentUser.isSales = isSales;
				currentBlogProps.currentUser.isMember = isMember;
				currentBlogProps.currentUser.isSuperuser = isSuperuser;

				if (!hasAvatar) {
					currentBlogProps.currentUser.avatar = null;
				}

			} else {
				currentBlogProps.onClick = () => {};
			}

			currentBlogProps.currentBlog.language = select('Locale', {
				'en-US': 'English (en)',
				'es-ES': 'Spanish (es)'
			}, 'en-US');

			return (
				<Theme blog={blogGroup('blogGroup')}>
					<UserButton
						{...currentBlogProps}
						{...stubbedProps}
						{...userButtonProps}
						{...globalProps(action)}
					/>
				</Theme>
			);
		})
	);
