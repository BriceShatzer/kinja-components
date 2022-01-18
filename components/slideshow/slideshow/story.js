/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	select,
	action,
	number,
	boolean
} from 'base-storybook';
import Slideshow from './slideshow';
import imageFixtures from '../images.story';
import README from './README.md';
import { TextNode } from 'postbody/InlineNode';
import ImageNode from 'postbody/blockNodes/ImageNode';

const images = imageFixtures.random.map(id =>
	new ImageNode({
		id,
		format: 'jpg',
		width: 900,
		height: 600,
		caption: Math.random() > 0.5 ? [
			new TextNode('Sample caption')
		] : [],
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
	.addDecorator(withDocs(README))
	.add('Slideshow', () => (
		<div style={{width: '100%', maxWidth: '800px'}}>
			<Slideshow
				slides={images}
				aspectRatio={select('Aspect Ratio', {
					Wide: 'Wide',
					Photo: 'Photo'
				}, 'Photo')}
				onNavigate={action('Navigate')}
				onForwardClick={action('Forward click')}
				onBackClick={action('Back click')}
				onUpcomingAd={action('Ad coming up')}
				onFirstSlideLoaded={action('First slide loaded')}
				adDelay={number('Ad delay', 1000)}
				adsFrequency={number('Ad frequency', 3)}
				adsEnabled={boolean('Ads enabled', true)}
				onFullscreenToggle={() => {}}
				onFullscreenAdLoad={() => {}}
				facebookShareUrl=''
				twitterShareUrl=''
				headline="Post title"
				desktop
				preloadAmount={4}
			/>
		</div>
	));
