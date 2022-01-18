/* @flow */

import * as React from 'react';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import { type SimpleImageJSON } from 'kinja-magma/models/SimpleImage';
import MailFilledIcon from 'kinja-components/components/icon19/MailFilled';
import KinjaIcon from 'kinja-components/components/icon19/Kinja';
import TwitterIcon from 'kinja-components/components/icon19/Twitter';
import Button19 from 'kinja-components/components/button19';

import {
	MainWrapper,
	AuthorInfo,
	AuthorName,
	AuthorLinksWrapper,
	Bio,
	AuthorWrapper
} from './author-bio-style';

import { sanitizeUserBio } from 'kinja-magma/utils/sanitize';

import type { User, UserJSON } from 'kinja-magma/models/User';

import type { AuthorUserProperties, AuthorUserPropertiesMap } from 'kinja-magma/models/UserProperty';

type AuthorType = UserJSON & {
	host: string,
	isAmp?: boolean,
	bio?: string,
	isMultiple?: boolean,
	userProperties: AuthorUserProperties,
	avatar: SimpleImageJSON
};

type authorBio = {
	host: string,
	authors: Array<User>,
	isAmp?: boolean,
	authorUserProperties: ?AuthorUserPropertiesMap
};

const Author = (props: AuthorType) => {
	const {
		displayName,
		screenName,
		userProperties,
		host
	} = props;

	const {
		twitterHandle,
		bio,
		email,
		emailIsConfirmed
	} = userProperties;
	return <MainWrapper>
		<AuthorInfo>
			<AuthorName data-ga={'[["Author Bio click","Author name"]]'} href={`${host}/${screenName}`}>
				{displayName}
			</AuthorName>
			<AuthorLinksWrapper>
				<Button19 icon={<KinjaIcon />}
					tag={'a'}
					href={`${host}/${screenName}`}
					data-ga={'[["Author Bio click","Posts"]]'}
					isSmall
					label={'Posts'}
					labelPosition={'after'}
					variant={'tertiary'}
				/>
				{emailIsConfirmed && email && (
					<Button19 icon={<MailFilledIcon />}
						tag={'a'}
						href={`mailto:${email}`}
						data-ga={'[["Author Bio click","Email"]]'}
						isSmall
						label={'Email'}
						labelPosition={'after'}
						variant={'tertiary'}
					/>
				)}
				{twitterHandle && (
					<Button19 icon={<TwitterIcon />}
						tag={'a'}
						href={`https://twitter.com/${twitterHandle}`}
						data-ga={'[["Author Bio click","Twitter"]]'}
						isSmall
						label={'Twitter'}
						labelPosition={'after'}
						variant={'tertiary'}
					/>
				)}
			</AuthorLinksWrapper>
		</AuthorInfo>
		{bio && <Bio dangerouslySetInnerHTML={{ __html: sanitizeUserBio(bio) }} />}
	</MainWrapper>;
};

export default function AuthorBio({ authors,
	authorUserProperties,
	host
}: authorBio) {
	return <EnsureDefaultTheme>
		<AuthorWrapper>
			{authors && authorUserProperties && authors.map(author => {
				const userProperties = authorUserProperties[author.id];
				const AuthorProps = {
					...author,
					host,
					userProperties
				};
				const key = author.avatar.id + author.screenName;
				return userProperties.showBio &&
					<Author
						key={key}
						{...AuthorProps}
					/>;
			})}
		</AuthorWrapper>
	</EnsureDefaultTheme>;
}
