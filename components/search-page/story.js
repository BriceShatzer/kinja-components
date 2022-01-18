/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	number,
	storiesOf
} from 'base-storybook';

import SearchPage from './';
import gizmodo from 'kinja-components/__stubs__/gizmodo.json';
import avclub from 'kinja-components/__stubs__/gizmodo.json';
import kotaku from 'kinja-components/__stubs__/gizmodo.json';
import posts from 'kinja-components/__stubs__/postObjects.json';
import { keywords } from './popular-search/story';

import Blog from 'kinja-magma/models/Blog';
import Post from 'kinja-magma/models/Post';


storiesOf('4. Components|Search', module)
	.add('Search Page', () => {
		const Container = styled.div`
			width: 100%;
			max-width: 1120px;
			padding: 40px 20px;
			margin: 0 auto;
		`;

		const externalAPI = {
			fetchSuggestions: () => Promise.resolve([]),
			fetchSearchResults: () => Promise.resolve([]),
			fetchTopicsSearchResults: () => Promise.resolve([]),
			fetchUserSearchResults: () => Promise.resolve([]),
			onRedirectToUrl: () => {},
			scrollToTop: () => {}
		};

		return (
			<Container>
				<SearchPage
					externalAPI={externalAPI}
					blog={Blog.fromJSON(gizmodo)}
					hasResults={true}
					hasMoreResults={false}
					isNetwork={true}
					networkBlogs={[
						Blog.fromJSON(avclub),
						Blog.fromJSON(gizmodo),
						Blog.fromJSON(kotaku)
					]}
					networkName="G/O Media"
					numberOfResults={number('Results', 1382)}
					onSearch={action('onSearch')}
					pageType="search"
					popularSearches={{
						blogPopularSearches: [
							'chernobyl',
							'black mirror'
						],
						networkPopularSearches: [
							'good omens',
							'tesla'
						]
					}}
					posts={posts.items.map(post => Post.fromJSON(post))}
					keywords={{
						blogKeywords: keywords,
						networkKeywords: keywords.reverse()
					}}
					storiesFrom={['Gizmodo']}
					simpleEmbiggen
					locale="en-US"
					canonicalLink="https://gizmodo.com/search"
				/>
			</Container>
		);
	});
