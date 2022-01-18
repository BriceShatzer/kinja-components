/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { find, uniq } from 'lodash';

import Button from 'kinja-components/components/buttons';
import Theme from 'kinja-components/components/theme';
import createTranslate from 'kinja-components/components/translator';
import Link from 'kinja-components/components/elements/link';
import translations from '../translations';
import Blog from 'kinja-magma/models/Blog';

import type { Locale } from 'kinja-magma/models/Locale';
import type { BlogId } from 'kinja-magma/models/Id';
import type { BlogThemeName } from 'kinja-components/components/theme/theme';

export type Topic = {
	suggestion: string,
	blogId: BlogId,
	source: string,
	sourceId?: string,
	cardinality: number
}

type Props = {
	blogTheme?: BlogThemeName,
	locale: Locale,
	items: Array<Topic>,
	redirectHandler: (item: Topic) => void,
	hide?: boolean,
	maxLength: number,
	blogs: Array<Blog>
};

type State = {
	maxLength: number
}

export const TopicsItem = styled(Button)`
	margin: 5px 15px 5px 0;
	display: ${props => props.hide ? 'none' : 'flex'};
`;

const TopicsHeading = styled.h4`
	font-weight: normal;
`;

const TopicsCount = styled.span`
	font-size: 0.875rem;
	line-height: 1.125rem;
	color: ${props => props.theme.color.gray};
`;

const TopicsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const MoreLink = styled(Link)`
	line-height: 34px;
	margin: 5px 15px 5px 0;
	color: ${({ theme }) => theme.color.primary };

	&:hover {
		color: ${({ theme }) => darken(0.1, theme.color.primary)};
	}
`;

type TopicItemProps = {
	item: Topic,
	blog?: Blog,
	maxLength: number,
	clickHandler: (Topic) => void,
	hide: boolean,
	multiblog: boolean
}

const TopicItem = (props: TopicItemProps) => {
	const blogTheme = props.blog ? props.blog.blogTheme : 'default';
	const label = props.blog && props.multiblog ?
		`${props.item.suggestion} on ${props.blog.displayName} (${props.item.cardinality})` :
		`${props.item.suggestion} (${props.item.cardinality})`;
	return (
		<Theme blog={blogTheme} key={`topics-${props.item.blogId}-${props.item.suggestion}-${props.item.source}`}>
			<TopicsItem
				onClick={ props.clickHandler.bind(this, props.item) }
				small
				label={ label }
				weight={'secondary'}
				hide={ props.hide}
			/>
		</Theme>
	);
};

class Topics extends React.Component<Props, State> {
	static defaultProps = {
		locale: 'en-US',
		maxLength: 3
	}
	state = {
		maxLength: 3
	}
	translate = createTranslate(translations, this.props.locale);
	headline = this.translate('Topics');
	results = this.translate('results');
	showMoreLink = this.translate('Show more Topics')
	showLessLink = this.translate('Show less Topics')

	clickHandler = (item: Topic) => {
		this.props.redirectHandler(item);
	}
	showMoreTopics = () => {
		this.setState({
			maxLength: 50
		});
	}

	showLessTopics = () => {
		this.setState({
			maxLength: this.props.maxLength
		});
	}

	listItems(): Array<TopicsItem> {
		const { items, blogs } = this.props;
		const multiblog = uniq(items.map(item => item.blogId)).length > 1;
		return items.map((item: Topic, index: number) => {
			const topicBlog = find(blogs, {
				id: item.blogId
			});
			const hide = index > this.state.maxLength - 1;
			return TopicItem({
				item, blog: topicBlog, maxLength: this.state.maxLength, clickHandler: this.clickHandler, hide, multiblog
			});
		});
	}

	getTopics = () => {
		if (this.props.items.length > this.state.maxLength) {
			return <React.Fragment>
				{ this.listItems() }
				<MoreLink onClick={this.showMoreTopics}>{this.showMoreLink}</MoreLink>
			</React.Fragment>;
		}
		return <React.Fragment>
			{ this.listItems() }
			{this.props.items.length < this.state.maxLength && this.props.items.length >= this.props.maxLength &&
				<MoreLink onClick={this.showLessTopics}>{this.showLessLink}</MoreLink>
			}
		</React.Fragment>;
	}
	render() {
		return (
			<Theme blog={this.props.blogTheme}>
				<React.Fragment>
					<TopicsHeading>
						{this.headline} <TopicsCount>{this.props.items.length} {this.results}</TopicsCount>
					</TopicsHeading>
					<TopicsWrapper>
						{this.getTopics()}
					</TopicsWrapper>
				</React.Fragment>
			</Theme>
		);
	}
}

export default Topics;
