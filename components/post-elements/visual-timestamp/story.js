/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	recircGroup,
	boolean,
	select,
	date
} from 'base-storybook';
import Post from 'kinja-magma/models/Post';
import blog from 'kinja-components/__stubs__/avclub.json';
import post from 'kinja-components/__stubs__/stubbedPostResponse.json';
import VisualTimestamp from './visual-timestamp';
import README from './README.md';

storiesOf('3. Elements|Post Elements/Timestamp', module)
	.addDecorator(withDocs(README))
	.add('VisualTimestamp', () => {
		const currentPost = Post.fromJSON({
			...post
		});
		return (
			<VisualTimestamp
				post={currentPost}
				blog={blog}
				locale={select('locale', ['en-US', 'es-ES'])}
				isLive={boolean('isLive', false)}
				defaultBlogRecircGroup={recircGroup('defaultBlogRecircGroup')}
				timestamp={date('timestamp', new Date(post.publishTimeMillis))}
				timestampFormat={select('timestampFormat', ['auto', 'time', 'date'])}
			/>
		);
	});
