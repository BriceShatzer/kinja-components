/* @flow */

import * as React from 'react';
import Permalink from './permalink';
import styled from 'styled-components';

type AuthorType = {
	displayName: string,
	screenName: string
}

type AuthorProps = {
	withPermalink: boolean,
	author: AuthorType,
	ga?: string,
	gaMobile?: string
}

const Author = (props: AuthorProps) => {
	const { withPermalink = true, author, ga, gaMobile } = props || {};
	const { displayName, screenName } = author || {};
	return (
		<Permalink title={displayName} href={`https://kinja.com/${screenName}`} unlink={!withPermalink} ga={ga} gaMobile={gaMobile}>
			<span>{displayName}</span>
		</Permalink>
	);
};

type AuthorsProps = {
	withPermalink: boolean,
	authors: Array<AuthorType>,
	ga?: string,
	gaMobile?: string
}

const FlexWrapper = styled.section`
	display: flex;
`;

const Authors = (props: AuthorsProps) => {
	const { withPermalink, authors, ga, gaMobile } = props || {};

	if (!authors || !authors.length) {
		return null;
	}

	const authorsMarkup = authors.map((author, index, arr) => {
		const { displayName, screenName } = author;

		return [
			<Permalink key={`author-${screenName}`}
				title={displayName}
				href={`https://kinja.com/${screenName}`}
				unlink={!withPermalink}
				ga={ga}
				gaMobile={gaMobile}>
				<span>{displayName}</span>
			</Permalink>,
			index !== arr.length - 1 ? <span key={`comma-${screenName}`}>,</span> : null
		];
	});

	return <FlexWrapper>{authorsMarkup}</FlexWrapper>;

};

export { Author, Authors };
