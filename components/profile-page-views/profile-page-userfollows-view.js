// @flow

import * as React from 'react';
import styled from 'styled-components';

import { UserFollowCard } from '../user-follow-card/user-follow-card';
import { EmptyMessage } from './profile-page-posts-view';
// TODO: this is used temporarily until infinite loading is implemented
import LoadMore from 'kinja-components/components/stream/load-more';

import type { ProfilePageUserFollowsViewProps } from './';

const UserFollowsViewContainer = styled.div`
	&:last-child {
		margin-bottom: 1rem;
	}
`;

/*
	Displays a stream of users on the profile page,
	used by 'followers' and 'following' views.
*/
export const ProfilePageUserFollowsView = ({
	userFollows,
	pagination,
	emptyMessage,
	loadMoreMessage
}: ProfilePageUserFollowsViewProps) => {

	const contents = userFollows.length
		? <UserFollowsViewContainer>
			{userFollows.map(userFollow => (<UserFollowCard key={userFollow.id} userFollow={userFollow}/>))}
		</UserFollowsViewContainer>
		: <EmptyMessage>{emptyMessage}</EmptyMessage>;

	return (
		<React.Fragment>
			{contents}
			{pagination && <LoadMore
				pageType={'profilepage'}
				pagination={pagination}
				label={loadMoreMessage}
			/>}
		</React.Fragment>
	);
};
