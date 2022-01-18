import * as React from 'react';
import { storiesOf, withDocs, text } from 'base-storybook';
import MagazineHeader from './magazine-header';
import README from './README.md';

const featuredMediaImageOptions = { id: 'hc1bdqpd9ahbr0eu6dyk',
	format: 'jpg',
	width: 5100,
	height: 2869,
	alignment: 'Bleed',
	caption: [],
	syndicationRights: true,
	attribution: [
		{
			label: 'Illustration',
			credit: [
				{
					styles: [],
					value: 'Angelica Alzona',
					type: 'Text'
				}
			],
			source: [
				{
					styles: [],
					value: 'Gizmodo',
					type: 'Text'
				}
			]
		}
	],
	type: 'Image'
};

const storyTypeProperties = {
	id: 1852,
	blogId: 4,
	canonical: 'garbage',
	title: 'Garbage',
	content: 'Standard',
	description: 'This week, we are writing about waste and trash, examining the junk that dominates our lives, and digging through garbage for treasure.',
	boilerplate: 'This week, we are writing about waste and trash, examining the junk that dominates our lives, and digging through garbage for treasure.',
	image: { id: 'n3zs3z5koiuabnvzl7dv', format: 'png' },
	index: undefined
};

storiesOf('4. Components|Post Body/MagazineHeader', module)
	.addDecorator(withDocs(README))
	.add('Magazine Header', () => (
		<MagazineHeader
			title={text('title', 'I am a story title in a Featured Magazine Header')}
			featuredMedia={featuredMediaImageOptions}
			permalinkHost={'https://earther.gizmodo.com'}
			permalinkPath={'/behind-the-hype-of-apples-plan-to-end-mining-1833045476'}
			storyTypeProperties={storyTypeProperties}
			isSponsored={true}
		/>
	));
