/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	blogGroup,
	storiesOf,
	withDocs
} from 'base-storybook';

import BlogFilter from './';
import README from './README.md';

import avclub from 'kinja-components/__stubs__/avclub.json';
import gizmodo from 'kinja-components/__stubs__/gizmodo.json';
import kotaku from 'kinja-components/__stubs__/kotaku.json';

import Blog from 'kinja-magma/models/Blog';


storiesOf('4. Components|Search/Filter', module)
	.addDecorator(withDocs(README))
	.add('Blog Filter', () => {
		const Container = styled.div`
			width: 301px;
			margin: 0 auto;
		`;

		const blogs = [
			Blog.fromJSON(avclub),
			Blog.fromJSON(gizmodo),
			Blog.fromJSON(kotaku)
		];

		return (
			<Container>
				<BlogFilter
					blogTheme={blogGroup()}
					blogs={blogs}
					checked={[blogs[0].id]}
					defaultBlogId={Blog.fromJSON(gizmodo).id}
					isNetwork={true}
					onChange={action('onChange')}
				/>
			</Container>
		);
	});