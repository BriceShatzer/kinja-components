/* @flow */

import * as React from 'react';
import {
	storiesOf,
	select
} from 'base-storybook';
import InEditor from './in-editor';
import imageFixtures from '../images.story';
import { TextNode } from 'postbody/InlineNode';
import ImageNode from 'postbody/blockNodes/ImageNode';

const images = imageFixtures.random.map(id =>
	new ImageNode({
		id,
		format: 'jpg',
		width: 900,
		height: 600,
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
	})
);

storiesOf('4. Components|Post Body/Slideshow', module)
	.add('In editor', () => (
		<div style={{width: '100%', maxWidth: 800}}>
			<InEditor
				slides={images}
				aspectRatio={select('Aspect Ratio', {
					Wide: 'Wide',
					Photo: 'Photo'
				}, 'Photo')}
				currentSlideIndex={select('Slide index', {
					'0': 0,
					'10': 10
				})}
			/>
		</div>
	));
