// @flow

import * as React from 'react';
import styled from 'styled-components';

// ICONS
import UserIcon from '../icon19/User';
import MailIcon from '../icon19/Mail';
import TwitterIcon from '../icon19/Twitter';
import { IconWrapper } from 'kinja-components/components/icon19/icon19';

import { UserAvatar } from 'kinja-components/components/user-avatar';
import { FollowControls } from 'kinja-components/components/follow-controls';
import { LdJson, person } from 'kinja-components/components/seo/structured-data';

import imageUrl from 'kinja-images/imageUrl';
import { sanitizeUserBio } from 'kinja-magma/utils/sanitize';
import { createUserId } from 'kinja-magma/models/Id';

import type { UserInfoProps } from './';
import UserProperty from 'kinja-magma/models/UserProperty';

const propertyValueByKey = (userProperties: Array<UserProperty>, key) => {
	const userProperty = userProperties.find(userProperty => userProperty.key === key);
	return userProperty && userProperty.value; // return undefined if property is not set
};

const StyledUserAvatar = styled(UserAvatar)`
	margin-right: auto;
	margin-left: auto;
	margin-bottom: 7px;
`;

export const UserInfoContainer = styled.div`
	box-sizing: border-box;
	overflow: hidden;
	background-color: ${({theme}) => theme.color.whitesmoke};
	border: 1px solid ${({theme}) => theme.color.midgray};
	border-radius: 5px;
`;

const UserDetails = styled.div`
	display: flex;
	flex-direction: column;
	padding: 18px;
	text-align: center;
	hr {
		margin: 1.1rem 0 1.5rem;
		border: none;
		border-top: 1px solid ${({theme}) => theme.color.midgray};
	}
`;

const UserDetail = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	color: ${({theme}) => theme.color.secondarytext};
	text-align: center;

	a {
		display: flex;
		color: ${({theme}) => theme.color.primary};
		&:not(:hover) {
			text-decoration: none;
		}
		&:hover {
			text-decoration: underline;
		}
	}

	${IconWrapper} {
		margin-right: 5px;
		justify-content: center;
	}
`;

const FollowControlsContainer = styled.div`
	margin-top: 0.5rem;
	margin-bottom: 1.137rem;
`;

const DisplayName = styled(UserDetail)`
	font-size: 20px;
	line-height: 26px;
	margin-bottom: 5px;
	color: ${({theme}) => theme.color.bodytext};
`;

const ScreenName = styled(UserDetail)`
	font-size: 14px;
	line-height: 18px;
`;

const Bio = styled(UserDetail)`
	color: ${({theme}) => theme.color.darkgray};
	margin-bottom: 1rem;
`;

const Crypto = styled(UserDetail)`
	text-align: left;
	font-size: 0.85em;
	line-height: 1.3;
`;

export const UserInfo = ({
	user,
	userProperties,
	translate,
	showFollowControlls = true
}: UserInfoProps) => {

	const showBio = propertyValueByKey(userProperties, 'showBio');
	const bio = propertyValueByKey(userProperties, 'bio');
	const email = propertyValueByKey(userProperties, 'email');
	const twitterHandle = propertyValueByKey(userProperties, 'twitterHandle');
	const pgpKeyUrl = propertyValueByKey(userProperties, 'pgpKeyUrl');
	const pgpFingerprint = propertyValueByKey(userProperties, 'pgpFingerprint');
	const otrFingerprint = propertyValueByKey(userProperties, 'otrFingerprint');

	return (
		<UserInfoContainer>
			<UserDetails>
				<StyledUserAvatar transform={'AvatarLargeAuto'} size={'121px'} image={user.avatar} lazy={false} />
				<DisplayName>{user.displayName}</DisplayName>
				<ScreenName><UserIcon /> {user.screenName}</ScreenName>
				{showFollowControlls && <FollowControlsContainer className='js_follow-controls' data-id={user.id} data-type={'User'}>
					{/* render an inactive control server-side, will be re-rendered client-side after hydration */}
					<FollowControls id={createUserId(user.id)} type={'User'}/>
				</FollowControlsContainer>}

				{showBio && <React.Fragment>

					{bio && <Bio dangerouslySetInnerHTML={{ __html: sanitizeUserBio(bio) }}></Bio>}

					{email && <UserDetail>
						<a
							href={`mailto:${email}`}
							title={translate('Email Address')}
						>
							<MailIcon /> {email}
						</a>
					</UserDetail>}

					{twitterHandle && <UserDetail>
						<a
							href={`https://twitter.com/${twitterHandle}`}
							title={translate('Twitter Handle')}
						>
							<TwitterIcon /> {twitterHandle}
						</a>
					</UserDetail>}

					{Boolean(pgpFingerprint || pgpKeyUrl || otrFingerprint) && <hr/>}
					{pgpFingerprint && <Crypto>PGP Fingerprint: {pgpFingerprint}</Crypto>}
					{pgpKeyUrl && <Crypto><a href={pgpKeyUrl}>PGP key</a></Crypto>}
					{otrFingerprint && <Crypto>OTR Fingerprint: {otrFingerprint}</Crypto>}

				</React.Fragment>}

			</UserDetails>

			{/* SEO Structured Data, should link to other social media profiles if that info available */}
			<LdJson contents={person({
				image: imageUrl(user.avatar.id, 'AvatarLargeAuto'),
				name: user.displayName,
				alternateName: user.screenName,
				email,
				twitterHandle
			})}/>

		</UserInfoContainer>
	);
};

