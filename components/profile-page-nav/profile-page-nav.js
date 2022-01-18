// @flow

import * as React from 'react';
import styled from 'styled-components';

import media from 'kinja-components/style-utils/media';

import type { ProfilePageNavProps } from './';
import type { ProfilePageViewType } from 'kinja-magma/controllers/profile-page';

const ProfilePageNavItem = styled.a`
	box-sizing: border-box;
	position: relative;
	display: block;
	padding: 1rem;
	text-decoration: none;
	white-space: nowrap;

	${media.largeDown`
		font-size: 18px;
	`}

	${media.xlargeUp`
		font-size: 24px;
	`}

	&:not(:hover) {
		color: ${({theme}) => theme.color.secondarytext};
	}
	&:hover,
	&.active {
		color: ${({theme}) => theme.color.bodytext};
		text-decoration: none;
	}
	&.active {
		&::before {
			content: '';
			display: block;
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			height: 1px;
			background: ${({theme}) => theme.color.darkgray};
		}
	}
`;

export const ProfilePageNavContainer = styled.div`
	box-sizing: border-box;
	position: relative;
	display: flex;
	overflow: hidden;
	&::before {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		height: 1px;
		background: ${({theme}) => theme.color.lightgray};
	}
	margin-bottom: 2rem;
	overflow-x: auto;
`;

export const ProfilePageNav = ({
	user,
	followCounts,
	profilePageView,
	translate,
	isDashboard = false
}: ProfilePageNavProps) => {

	const activeWhenViewIs = (currentView: ProfilePageViewType) => profilePageView === currentView ? 'active' : null;

	return (
		<ProfilePageNavContainer>
			{isDashboard && // TODO: once we get rid of dashboard, this condition will be redundant
			<>
				<ProfilePageNavItem
					className={activeWhenViewIs('dashboard')}
					href='/dashboard'>
					{translate('Feed')}
				</ProfilePageNavItem>
				<ProfilePageNavItem
					className={activeWhenViewIs('notifications')}
					href='/dashboard/notifications'>
					{translate('Notifications')}
				</ProfilePageNavItem>
			</>
			}
			{!isDashboard && <>
				<ProfilePageNavItem
					className={activeWhenViewIs('posts')}
					href={`/${user.screenName}/posts`}
				>
					{translate('Posts')}
				</ProfilePageNavItem>
				<ProfilePageNavItem
					className={activeWhenViewIs('discussions')}
					href={`/${user.screenName}/discussions`}
				>
					{translate('Discussions')}
				</ProfilePageNavItem>
				<ProfilePageNavItem
					className={activeWhenViewIs('saved')}
					href={`/${user.screenName}/saved`}
				>
					{translate('Saved Articles')}
				</ProfilePageNavItem>
				<ProfilePageNavItem
					className={activeWhenViewIs('followers')}
					href={`/${user.screenName}/followers`}
				>
					{translate('Followers ({count})', { count: followCounts.followers })}
				</ProfilePageNavItem>
				<ProfilePageNavItem
					className={activeWhenViewIs('following')}
					href={`/${user.screenName}/following`}
				>
					{translate('Following ({count})', {count: followCounts.following })}
				</ProfilePageNavItem>
			</>}
		</ProfilePageNavContainer>
	);
};
