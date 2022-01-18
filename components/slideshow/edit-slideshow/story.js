/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	select,
	action
} from 'base-storybook';
import EditSlideshow from './edit-slideshow';
import README from './README.md';
import images from '../images.story';
import ImageNode from 'postbody/blockNodes/ImageNode';

storiesOf('4. Components|Post Body/Slideshow', module)
	.addDecorator(withDocs(README))
	.add('Edit Slideshow', () => {
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
			<div style={{height: '100%'}}>
				<EditSlideshow
					items={items}
					aspectRatio="Wide"
					onCancel={action('Cancel')}
					onSubmit={action('Submit')}
				/>
			</div>
		);
	});
