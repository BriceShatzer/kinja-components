/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Link from 'kinja-components/components/elements/link';
import { MultipleAuthorsElement } from 'kinja-components/components/editor/multiple-authors/styledElements';
import {
	StreamAuthorClick,
	ExternalPostClick,
	KinjaDealsClick,
	PermalinkAuthorClick
} from 'kinja-components/components/stream/analytics';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import { truncateStringArray } from 'kinja-components/utils';
import type Post from 'kinja-magma/models/Post';
import type User from 'kinja-magma/models/User';

type Props = {
	// List of User (Author) objects.
	authors: Array<User>,
	className?: string,
	// When set this will be shown instead of the actual authors.
	byline?: string,
	noLink?: boolean,
	// Index of the post in the stream, used for analytics.
	index: number,
	// This pageType string used by analytics.
	pageType: string,
	// Used for analytics
	postPermalinkRedirect?: $PropertyType<Post, 'permalinkRedirect'>,
	postIsDeals?: $PropertyType<Post, 'isDeals'>,
	// Truncate authors by total authors display name length
	truncated?: boolean,
	customGAEvent?: Array<?string | {[key: string]: mixed}>
}

export const MultipleAuthorsStaticElement = styled(MultipleAuthorsElement)`
	display: inline-flex;
	font-size: 14px;
	line-height: 19px;
	text-align: left;

	a {
		color: ${props => props.theme.color.gray};

		:hover,
		:focus {
			color: ${props => props.theme.color.primary};
			text-decoration: none;
			outline: none;
		}

		:active {
			color: ${props => darken(0.1, props.theme.color.primary)};
		}
	}
`;

const Divider = styled.span`
	color: ${props => props.theme.color.gray};
`;

export const Span = styled.span`
	font-size: 14px;
	line-height: 19px;
	color: ${props => props.theme.color.gray};
`;

/**
 * If the byline is valid and should show up, returns true
 */
export const showByline = (byline: string, showByline: boolean): boolean => showByline && byline !== '';

const MultipleAuthorsStatic = (props: Props) => {
	const {
		authors,
		byline,
		className,
		index,
		noLink,
		pageType,
		postPermalinkRedirect,
		postIsDeals,
		truncated,
		customGAEvent
	} = props;

	if (byline) {
		return (
			<EnsureDefaultTheme>
				<MultipleAuthorsStaticElement className={className}>
					{byline}
				</MultipleAuthorsStaticElement>
			</EnsureDefaultTheme>
		);
	}

	const truncatedAuthors = authors ? authors.slice(0,
		truncateStringArray(authors.map(author => author.displayName)).length
	) : [];

	if (authors && truncated && truncatedAuthors && truncatedAuthors.length !== authors.length) {
		return (
			<EnsureDefaultTheme>
				<React.Fragment>
					{truncatedAuthors.map((author, authorIndex) => (
						<MultipleAuthorsStaticElement className={className} key={author.id}>
							<Span>
								{author.displayName}
							</Span>
							{(authorIndex < authors.length - 1 && authors.length > 2) && <Span>,&nbsp;</Span>}
						</MultipleAuthorsStaticElement>
					))}
					<Span>and {authors.length - truncatedAuthors.length} more</Span>
				</React.Fragment>
			</EnsureDefaultTheme>
		);
	}

	return (authors ? <EnsureDefaultTheme>
		<React.Fragment>
			{authors.map((author, authorIndex) => (
				<MultipleAuthorsStaticElement className={className} key={author.id}>
					{authorIndex === authors.length - 1 && authors.length > 1
						&& <Divider>{authors.length === 2 && <React.Fragment>&nbsp;</React.Fragment>}and&nbsp;</Divider>
					}
					{!noLink &&
						<Link
							events={(customGAEvent ?
								[[...customGAEvent.slice(0, 2), `https://kinja.com/${author.screenName}`, ...customGAEvent.slice(3)]] : null) || [
								(pageType === 'permalink' ? PermalinkAuthorClick(author.screenName) :
									StreamAuthorClick(index, `https://kinja.com/${author.screenName}`, pageType)),
								(postPermalinkRedirect ? ExternalPostClick(index, `https://kinja.com/${author.screenName}`) : undefined),
								(postIsDeals ? KinjaDealsClick(index, `https://kinja.com/${author.screenName}`) : undefined)
							].filter(Boolean)}
							href={`https://kinja.com/${author.screenName}`}
						>
							{author.displayName}
						</Link>
					}
					{noLink &&
						<span>
							{author.displayName}
						</span>
					}
					{(authorIndex < authors.length - 1 && authors.length > 2) && <Divider>,&nbsp;</Divider>}
				</MultipleAuthorsStaticElement>
			))}
		</React.Fragment>
	</EnsureDefaultTheme>
		: null);
};


export default MultipleAuthorsStatic;
