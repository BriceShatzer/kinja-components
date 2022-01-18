/* @flow */

import * as React from 'react';

import styled from 'styled-components';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import Image from 'kinja-components/components/elements/image';
import UserIcon from 'kinja-components/components/icon19/User';

export type Author = {
	displayName: string,
	screenName: string,
	id: string,
	avatar: {| id: string, format?: string |}
}

type Props = {
	clickHandler: (screenName: string) => void,
	displayName: string,
	screenName: string,
	id: string,
	avatar: {| id: string, format?: string |},
	hide?: boolean
};

const AuthorAvatar = styled.div`
	display: flex;
	margin-right: 10px;
`;

const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding-top: 2px;
`;

const CardInnerWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

const AuthorsHeading = styled.h6`
	font-weight: normal;
	display: flex;
	margin-bottom: 0.5rem;
`;

export const AuthorWrapper = styled.div`
	display: ${props => props.hide ? 'none' : 'flex'};
	flex-direction: row;
	flex-wrap: wrap;
	padding: 10px 25px 15px 0;
	cursor: pointer;
	&:hover ${AuthorsHeading} {
		text-decoration: underline;
	}
`;

const AuthorIcon = styled(UserIcon)`
	width: 16px;
	height: 16px;
	color: ${props => props.theme.color.gray};
	margin-right: 5px;
	display: flex;
	align-self: baseline;
`;

const AuthorMask = styled(Image)`
	border-radius: 50%;
`;
const AuthorUserCard = styled.div`
	display: flex;
	font-size: 14px;
	color: ${props => props.theme.color.gray};
	line-height: 1rem;
`;

const AuthorCard = (props: Props) => {

	const { avatar, displayName, screenName } = props;

	const clickHandler = (screenName: string) => {
		props.clickHandler(screenName);
	};

	return (
		<EnsureDefaultTheme>
			<React.Fragment>
				<AuthorWrapper hide={props.hide} onClick={ () => clickHandler(screenName) }>
					<AuthorAvatar>
						<AuthorMask transform={'AvatarSmallAuto'} height={50} width={50} id={avatar.id} format={avatar.format} />
					</AuthorAvatar>
					<CardWrapper>
						<AuthorsHeading>
							{displayName}
						</AuthorsHeading>
						<CardInnerWrapper>
							<AuthorIcon />
							<AuthorUserCard>
								{screenName}
							</AuthorUserCard>
						</CardInnerWrapper>
					</CardWrapper>
				</AuthorWrapper>
			</React.Fragment>
		</EnsureDefaultTheme>
	);
};

export default AuthorCard;

