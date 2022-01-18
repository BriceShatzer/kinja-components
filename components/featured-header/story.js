import * as React from 'react';
import { storiesOf, withDocs, text } from 'base-storybook';
import FeaturedHeader from './featured-header';
import README from './README.md';

const featuredMediaImageOptions = {
	id: 'nmr2o2ctaoul6ukqszsn',
	format: 'png',
	width: 3000,
	height: 1688,
	alignment: 'Bleed',
	caption: [],
	syndicationRights: false,
	attribution: [
		{
			label: 'Illustration',
			credit: [
				{
					styles: [],
					value: 'Chelsea Beck',
					type: 'Text'
				}
			],
			source: [
				{
					styles: [],
					value: 'GMG',
					type: 'Text'
				}
			]
		}
	],
	type: 'Image'
};
const storyTypeProperties = {
	id: 104,
	blogId: 1635895473,
	canonical: 'voices',
	title: 'Features',
	content: 'Standard',
	description: 'Longform, essays, rants, and takes. ',
	boilerplate: undefined,
	image: undefined,
	index: undefined
};

storiesOf('4. Components|Post Body/FeaturedHeader', module)
	.addDecorator(withDocs(README))
	.add('Featured Header', () => (
		<FeaturedHeader
			featuredMedia={
				featuredMediaImageOptions
			}
			permalinkHost={'https://splinternews.com'}
			permalinkPath={'/its-time-to-finally-listen-to-native-journalists-1832375168'}
			storyTypeProperties={storyTypeProperties}
			title={text('title', 'I am a story title')}
			isSponsored={true}
		/>
	));
