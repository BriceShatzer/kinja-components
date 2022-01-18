/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import {
	boolean,
	select,
	text,
	storiesOf,
	withDocs
} from 'base-storybook';
import AuthorsAvatar from './authors-avatar';
import MultipleAuthorsStatic from './multiple-authors-static';
import README from './README.md';
import post from '../../../__stubs__/stubbedPost.json';

storiesOf('3. Elements|Post Elements/Authors', module)
	.addDecorator(withDocs(README))
	.add('Single Author', () => {
		const authors = post.authors;
		const byline = text('byline', '');
		const withAvatar = boolean('withAvatar', false);
		const Container = styled.div`
			display: flex;
			align-items: center;
		`;
		return (
			<Container>
				{withAvatar && (
					<AuthorsAvatar
						pageType='frontpage'
						authors={[authors[0]]}
						post={post}
						index={0}
					/>
				)}
				<MultipleAuthorsStatic
					byline={byline}
					authors={[authors[0]]}
					pageType='frontpage'
					postPermalinkRedirect={post.permalinkRedirect}
					postIsDeals={post.isDeals}
					index={0}
				/>
			</Container>
		);
	})
	.add('Multiple Authors', () => {
		const authorNumber = select('authors', ['1', '2', '3', '6'], '3');
		const byline = text('byline', '');
		const truncated = boolean('truncated', false);
		const selectAuthors = index => ({
			'1': [post.authors[0]],
			'2': post.authors.slice(0, 2),
			'3': post.authors,
			'6': [...post.authors, ...post.authors]
		}[index]);
		return (
			<MultipleAuthorsStatic
				byline={byline}
				authors={selectAuthors(authorNumber)}
				pageType="frontpage"
				postPermalinkRedirect={post.permalinkRedirect}
				postIsDeals={post.isDeals}
				index={0}
				truncated={truncated}
			/>
		);
	});
