/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	select,
	action
} from 'base-storybook';
import Slide from './slide';
import README from './README.md';
import {TextNode} from 'postbody/InlineNode';
import ImageNode from 'postbody/blockNodes/ImageNode';

const image = new ImageNode({
	id: 'ompmceoqsjknwwoioys3',
	format: 'jpg',
	width: 600,
	height: 900,
	caption: [
		new TextNode('Sample caption')
	],
	attribution: [
		{
			label: 'Photo',
			credit: [new TextNode('John Doe')],
			source: [new TextNode('kinja')]
		}
	]
});

storiesOf('4. Components|Post Body/Slideshow', module)
	.addDecorator(withDocs(README))
	.add('Single slide', () => (
		<Slide
			index={0}
			image={image}
			load
			onLoad={action('Load')}
			aspectRatio={select('Aspect Ratio', {
				Wide: 'Wide',
				Photo: 'Photo'
			}, 'Photo')}
		/>
	));
