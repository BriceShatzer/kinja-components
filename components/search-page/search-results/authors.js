/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import Theme from 'kinja-components/components/theme';
import AuthorCard from 'kinja-components/components/search-page/search-results/author-card';
import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';

import type { Locale } from 'kinja-magma/models/Locale';
import type { Author } from 'kinja-components/components/search-page/search-results/author-card';
import type { BlogThemeName } from 'kinja-components/components/theme/theme';

type Props = {
	blogTheme?: BlogThemeName,
	locale: Locale,
	maxLength: number,
	items: Array<Author>,
	redirectHandler: (screenName: string) => void
};

type State = {
	maxLength: number
}

const AuthorsHeading = styled.h4`
	font-weight: normal;
`;

const AuthorsCount = styled.span`
	font-size: 0.875rem;
	line-height: 1.125rem;
	color: #7d7d7d;
`;

const AuthorsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const MoreLink = styled.a`
	line-height: 50px;
	padding: 10px 0;
	color: ${({ theme }) => theme.color.primary };

	&:hover {
		color: ${({ theme }) => darken(0.1, theme.color.primary)};
	}
`;

class Authors extends React.Component<Props, State> {
	static defaultProps = {
		locale: 'en-US',
		maxLength: 3
	}

	state = {
		maxLength: 3
	}

	clickHandler = (screenName: string) => {
		this.props.redirectHandler(screenName);
	}

	translate = createTranslate(translations, this.props.locale);
	headline = this.translate('Authors');
	results = this.translate('results');
	showMoreLink = this.translate('Show more authors')
	showLessLink = this.translate('Show less authors')

	listItems(): Array<*> {
		const { items } = this.props;
		return items.map((item: Author, index: number) =>
			<AuthorCard
				avatar={item.avatar}
				id={ item.id }
				screenName={item.screenName}
				displayName={item.displayName}
				clickHandler={ screenName => { this.clickHandler(screenName); } }
				hide={ index > this.state.maxLength - 1}
				key={`${item.id}-${item.screenName}`}
			/>);
	}

	showMoreAuthors = () => {
		this.setState({
			maxLength: 50
		});
	}

	showLessAuthors = () => {
		this.setState({
			maxLength: this.props.maxLength
		});
	}

	getAuthorCards = () => {
		if (this.props.items.length > this.state.maxLength) {
			return <React.Fragment>
				{ this.listItems() }
				<MoreLink onClick={this.showMoreAuthors}>{this.showMoreLink}</MoreLink>
			</React.Fragment>;
		}
		return <React.Fragment>
			{ this.listItems() }
			{this.props.items.length < this.state.maxLength && this.props.items.length >= this.props.maxLength &&
				<MoreLink onClick={this.showLessAuthors}>{this.showLessLink}</MoreLink>
			}
		</React.Fragment>;
	}

	render() {
		return (
			<Theme blog={this.props.blogTheme}>
				<React.Fragment>
					<AuthorsHeading>
						{this.headline} <AuthorsCount>{this.props.items.length} {this.results}</AuthorsCount>
					</AuthorsHeading>
					<AuthorsWrapper>
						{this.getAuthorCards()}
					</AuthorsWrapper>
				</React.Fragment>
			</Theme>
		);
	}
}

export default Authors;
