// @flow
import * as React from 'react';
import {
	storiesOf,
	blogGroup,
	boolean,
	withDocs
} from 'base-storybook';

import SecondScroll from './';
import { NativeAdIndexes } from './second-scroll';
import README from './README.md';

import Post from 'kinja-magma/models/Post';
import User from 'kinja-magma/models/User';
import Blog from 'kinja-magma/models/Blog';
import Theme from '../theme';
import postResponse from '../../__stubs__/stubbedPostResponse.json';
import authorResponse from '../../__stubs__/stubbedAuthorResponse.json';
import blogResponse from '../../__stubs__/gizmodo.json';

storiesOf('4. Components|Second scroll', module)
	.addDecorator(withDocs(README))
	.add('Second scroll', () => {
		const post = Post.fromJSON(postResponse);
		const author = User.fromJSON(authorResponse);
		const blog = Blog.fromJSON(blogResponse);
		const disableAds = boolean('Is ads disabled?', false);
		const loadedAdIndexes = !disableAds ? NativeAdIndexes : [];

		const { id } = post;

		return (
			<div style={{width: '100vw'}}>
				<Theme blog={blogGroup()}>
					<SecondScroll
						post={post}
						scrollListItems={Array(8).fill(post)}
						loadedAdIndexes={loadedAdIndexes}
						pageType="permalink"
						disableAds={disableAds}
						authors={{[(id: string)]: [author]}}
						blogs={{[(id: string)]: [blog]}}
						videoMetadata={[{
							id: '',
							description: '',
							poster: { id: '', format: 'png' },
							title: '',
							tags: [],
							monetizable: false,
							videoPage: false,
							videoRecirc: false,
							isLooping: false,
							streamingUrl: '',
							captions: [{
								format: '',
								id: '',
								label: '',
								language: '',
								url: ''
							}],
							network: '',
							programId: '',
							publishedTimestamp: '',
							duration: null
						}]}
					/>
				</Theme>
			</div>
		);
	});
