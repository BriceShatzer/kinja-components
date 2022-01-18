// @flow

import * as React from 'react';
import styled from 'styled-components';

import { createUserId, createBlogId } from 'kinja-magma/models/Id';
import { FollowControls } from 'kinja-components/components/follow-controls';
import { UserAvatar, UserAvatarContainer } from 'kinja-components/components/user-avatar';

import { UserFollow } from 'kinja-magma/models/UserFollow';

const UserFollowCardContainer = styled.div`
	padding-bottom: 1.2rem;
	&:not(:last-child) {
		border-bottom: 1px solid ${({theme}) => theme.color.lightgray};
	}
	margin-bottom: 1.2rem;
	display: flex;
	align-items: center;
	flex-direction: row;
	${UserAvatarContainer} {
		margin-right: 1rem;
	}
`;

const EntityDetailsContainer = styled.a`
	display: block;
	flex-grow: 1;
	font-family: ${({theme}) => theme.typography.utility.fontFamily};
	&:visited,
	&:hover {
		opacity: 0.7;
		text-decoration: none;
	}
`;

const EntityName = styled.div`
	font-size: 20px; /* mantle value */
	font-weight: bold;
	color: ${({theme}) => theme.color.bodytext};
`;

const EntityAddress = styled.div`
	font-size: 0.875rem; /* mantle value */
	color: ${({theme}) => theme.color.secondarytext};
`;

const FollowControlsContainer = styled.div`
	flex-grow: 0;
	padding-left: 1rem;
`;

export const UserFollowCard = ({
	userFollow
}: {
	userFollow: UserFollow
}) => {

	const {
		displayName,
		screenName,
		id,
		type,
		avatar,
		canonicalHost
	} = userFollow;

	return (
		<UserFollowCardContainer>
			{type === 'Blog' && avatar && <UserAvatar transform={'AvatarMediumAuto'} size={'40px'} square={true} image={avatar}/>}
			<EntityDetailsContainer
				href={
					type === 'User'
						? screenName && `https://kinja.com/${screenName}`
						: canonicalHost && `http://${canonicalHost}` // NOTE: some legacy blogs are not https
				}
			>
				<EntityName>{displayName}</EntityName>
				<EntityAddress>{type === 'User' && screenName ? `@${screenName}` : canonicalHost}</EntityAddress>
			</EntityDetailsContainer>
			<FollowControlsContainer className='js_follow-controls' data-id={id} data-type={type}>
				<FollowControls
					id={type === 'User' ? createUserId(id) : createBlogId(id)}
					type={type}
				/>
			</FollowControlsContainer>
		</UserFollowCardContainer>
	);
};
