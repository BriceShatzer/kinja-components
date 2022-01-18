// @flow

import * as React from 'react';
import styled from 'styled-components';
import DateTime from 'kinja-components/utils/DateTime';
import { LazyResponsiveImage } from '../../elements/image';

import { type ConcurrentEditWarningType, type UserWithTimestamp } from '../utils/shouldShowWarning';

type Props = {
	type: ConcurrentEditWarningType,
	users: Array<UserWithTimestamp>,
	title: string
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1rem 0;
`;

const Title = styled.header`
	padding: 0.5rem 0;
	font-weight: bold;
	text-transform: uppercase;
	color: ${props => props.theme.color.darksmoke};
`;

const List = styled.ul`
	border-top: 1px solid ${props => props.theme.color.midgray};
`;

const UserItemContainer = styled.div`
	margin-top: 1rem;
	display: flex;
`;

const UserInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: ${props => props.theme.typography.utility.fontSizes.medium};
	line-height: ${props => props.theme.typography.utility.lineHeights.medium};
`;

const UserName = styled.span`
	color: ${props => props.theme.color.darksmoke};
	font-weight: bold;
`;

const LastChange = styled.span`
	color: ${props => props.theme.color.darkgray};
`;

const Avatar = styled.li`
	flex-basis: calc(${props => props.theme.typography.utility.lineHeights.large} * 2);
	flex-grow: 0;
	flex-shrink: 0;
	margin-right: 1rem;

	img {
		width: calc(${props => props.theme.typography.utility.lineHeights.large} * 2);
		height: calc(${props => props.theme.typography.utility.lineHeights.large} * 2);
		border-radius: 50%;
		position: unset;
	}

	video {
		width: calc(${props => props.theme.typography.utility.lineHeights.large} * 2);
		height: calc(${props => props.theme.typography.utility.lineHeights.large} * 2);
		border-radius: 50%;
		background-color: ${props => props.theme.color.whitesmoke};
	}
`;

function UserItem({
	type,
	user
}: {
	type: ConcurrentEditWarningType,
	user: UserWithTimestamp
}) {
	return (
		<UserItemContainer>
			<Avatar>
				{user.editor && <LazyResponsiveImage
					{...user.editor.avatar}
					transform="AvatarSmallAuto"
					noLazy
				/>}
			</Avatar>
			<UserInfoContainer>
				{user.editor && <UserName>{user.editor.displayName}</UserName>}
				<LastChange>
					{type === 'ConcurrentEditingWarning' && 'Last action: '}
					{user.lastEditAction && new DateTime({ timestamp: user.lastEditAction }).relativeDateTime}
				</LastChange>
			</UserInfoContainer>
		</UserItemContainer>
	);
}

export default function UserList(props: Props) {
	return (
		<Container>
			<Title>{props.title}</Title>
			{Boolean(props.users && props.users.length) && (
				<List>
					{props.users.map(user =>
						user.editor && <UserItem key={user.editor.id} user={user} type={props.type} />
					)}
				</List>
			)}
		</Container>
	);
}
