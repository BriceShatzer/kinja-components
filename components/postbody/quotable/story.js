// @flow

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	text
} from 'base-storybook';
import Quotable from './quotable';
import { TextNode } from 'postbody/InlineNode';
import README from './README.md';
import SimpleImage from 'kinja-magma/models/SimpleImage';

storiesOf('4. Components|Post Body/Quotable', module)
	.addDecorator(getStory => (
		<div className='post-content'>
			{getStory()}
		</div>
	))
	.addDecorator(withDocs(README))
	.add('Quotable', () => {
		const headerText = text('Header', 'This is a header.');
		const contentText = text('Content', 'This is the content.');
		const attributionText = text('Attribution', 'This is the attribution text');
		const image = new SimpleImage({
			id: text('Image id', 'uj69lkuwn9rx6o1cwdcd'),
			format: text('Image format', 'jpg')
		});

		return (
			<Quotable
				header={headerText.length ? [new TextNode(headerText)] : []}
				content={contentText.length ? [new TextNode(contentText)] : []}
				attribution={attributionText.length ? [new TextNode(attributionText)] : []}
				image={image}
				thumbnail={null}
			/>
		);
	})
	.add('Quotable - placeholder', () => {
		return (
			<Quotable
				image={null}
				thumbnail={null}
				header={[]}
				content={[]}
				attribution={[]}
				editable
			/>
		);
	});
