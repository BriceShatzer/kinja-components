// @flow

import React, { useState } from 'react';
import styled from 'styled-components';

import { UserConsumer } from 'kinja-magma/client/userContext';
import { follow, unfollow } from 'kinja-magma/api/profile';
import { createUserId } from 'kinja-magma/models/Id';

import Button from 'kinja-components/components/buttons';
import { ButtonWrapper } from 'kinja-components/components/buttons/Button';

import CheckmarkIcon from 'kinja-components/components/icon19/Checkmark';
import PlusIcon from 'kinja-components/components/icon19/Plus';

import type { FollowControlsProps } from './';
import type { StateWithMethods as UserState } from 'kinja-magma/client/userState';
import type { UserFollow } from 'kinja-magma/models/UserFollow';

const FollowControlsWrapper = styled.div`
	${ButtonWrapper} {
		min-width: 140px;
	}
`;

/*
	This is a stateful component:
	The component's own follow state will be updated if the user clicks the follow or the unfollow button.
	The inital state will be inferred from the values of current User value and userFollows prop.
*/
export const FollowControls = ({ id, type, userFollows, renderLoginModal }: FollowControlsProps) => {

	const [componentFollowState, setComponentFollowState] = useState(null);

	const modifyFollowState = async (newFollowState, apiCallProps) => {
		try {
			/*
				NOTE: follow API calls will return null if trying to follow an already followed entity,
				UI needs to be updated to the the 'followed' state.
				Unfollow will throw an error, state update is handled in the catch block.
			*/
			const followStateChangeCall = newFollowState
				? follow(apiCallProps)
				: unfollow(apiCallProps);
			await followStateChangeCall;
			setComponentFollowState(newFollowState);
		} catch (err) {
			// update the UI to the 'following' state is the user was already following the requested entity
			if (err.message === 'USER_FOLLOW_DUPLICATE') {
				setComponentFollowState(true);
			} else {
				console.error(err);
			}
		}
	};

	return (
		<FollowControlsWrapper>
			<UserConsumer>
				{({ user: currentUser, state, startLoginFlow }: UserState) => {
					if (state === 'init') {
						/*
							User state is not available during server-side rendering or initialization,
							we render a disabled control in these cases.
						*/
						return <Button
							small
							disabled={true}
							label={' '} // an empty label is passed to ensure that this button's height is the same as the rest
							weight="secondary"
						/>;

					} else if (state === 'unauthd') {
						/*
							We render a "follow" button that triggers the login flow for unauthenticated users.
						*/
						const login = () => {
							renderLoginModal && renderLoginModal();
							startLoginFlow();
						};
						return <Button
							onClick={login}
							small
							icon={<PlusIcon/>}
							label={'Follow'}
							labelPosition="before"
							weight="secondary"
						/>;

					} else if (state === 'authd') {
						if (currentUser && currentUser.id === id) {
							/*
								Edit profile button is rendered if the button points to the current user.
							*/
							return <a href="/settings">
								<Button
									small
									label={'Edit Profile'}
									labelPosition="before"
									weight="secondary"
								/>
							</a>;
						} else if (currentUser) {
							/*
								Follow/unfollow buttons for authenticated users.
							*/
							const userFollowRecord: ?UserFollow = userFollows && userFollows.find(userFollow => userFollow.id === id) || null;

							const followState = (componentFollowState === null)
								? Boolean(userFollowRecord)
								: componentFollowState;

							return <Button
								onClick={() => modifyFollowState(
									!followState,
									{
										userId: createUserId(currentUser.id),
										targetId: id,
										targetType: type
									}
								)}
								small
								icon={followState
									? <CheckmarkIcon/>
									: <PlusIcon/>
								}
								label={followState ? 'Following' : 'Follow'}
								labelPosition="before"
								weight="secondary"
							/>;
						}
					}
				}}
			</UserConsumer>
		</FollowControlsWrapper>
	);
};
