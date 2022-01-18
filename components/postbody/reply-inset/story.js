// @flow

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	text
} from 'base-storybook';
import ReplyInset from './reply-inset';
import README from './README.md';
import Link from 'kinja-magma/models/Link';


storiesOf('4. Components|Post Body/Reply Inset', module)
	.addDecorator(getStory => (
		<div className='post-content'>
			{getStory()}
		</div>
	))
	.addDecorator(withDocs(README))
	.add('ReplyInset', () => {
		const id = text('Comment ID', '1823515139');
		return (
			<ReplyInset
				originalLink="https://kinja.com"
				link={new Link({ url: 'https://kinja.com', provider: '', thumbnails: [], images: [],  meta: { postId: id }})}
				insetPrefix="https://api.kinja.com"
			/>
		);
	});
