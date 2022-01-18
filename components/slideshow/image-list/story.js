/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action,
	select
} from 'base-storybook';
import ImageList from './image-list';
import README from './README.md';
import images from '../images.story';
import ImageNode from 'postbody/blockNodes/ImageNode';

storiesOf('4. Components|Post Body/Slideshow', module)
	.addDecorator(withDocs(README))
	.add('Image List', () => {
		const aspect = select('Aspect Ratio', {
			Wide: '16:9',
			Photo: '3:2'
		}, 'Photo');
		const imageSet = select('Image set', {
			random: 'random',
			'16:9': '16:9',
			'3:2': '3:2'
		}, 'random');
		const items = images[imageSet].map(id =>
			new ImageNode({
				id,
				format: 'jpg',
				width: 900,
				height: 600,
				caption: [],
				attribution: []
			})
		);
		return (
			<ImageList
				items={items}
				onChange={action('change')}
				aspectRatio={aspect}
			/>
		);
	});
