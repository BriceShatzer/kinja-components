/* @flow */

import * as React from 'react';
import {
	select,
	storiesOf,
	text,
	withDocs,
	blogGroup
} from 'base-storybook';

import ReviewBox from './ReviewBox';
import { Loading } from '../../elements/loader';
import { Theme } from '../../theme';
import README from './README.md';
import type { ReviewBoxAlignment } from 'postbody/blockNodes/ReviewBox';

require('./story.sass');

storiesOf('4. Components|Review', module)
	.addDecorator(withDocs(README))
	.add('Review Box', () => {
		const imageElements = {
			'No Image': null,
			Image: <img src="https://res.cloudinary.com/gawker-media/image/upload/v1495783566/ikwum2k9iayoepoyql5p.jpg" alt="Lead" />,
			Loading: <Loading />
		};

		const reviewText = [
			{
				label: text('Review Label', 'Specs'),
				value: text('Review Content', 'Intel i7 CPU, very good, very good, also an NVidia GPU')
			},
			{
				label: text('2nd Review Label', 'Benchmark results'),
				value: text('2nd Review Content', 'It was fast. 900000000 score in PC Mark')
			}
		];

		const scores = {
			'A+': 'A+', A: 'A', 'A-': 'A-', 'B+': 'B+', B: 'B', 'B-': 'B-',
			'C+': 'C+', C: 'C','C-': 'C-', 'D+': 'D+', D: 'D', 'D-': 'D-', F: 'F'
		};

		const reviewBoxProps = {
			alignment: (select('Alignment', { Left: 'Left', Center: 'Center', Fullbleed: 'Fullbleed'}): ReviewBoxAlignment),
			// $FlowFixMe
			storyType: {},
			// $FlowFixMe
			categoryData: {
				valueDisplay: text('Category', 'Asus')
			},
			// $FlowFixMe
			subcategoryData: {
				valueDisplay: text('Subcategory', 'Tablet')
			},
			imageComponent: imageElements[select('Image', ['No Image', 'Loading', 'Image'], 'Image')],
			text: reviewText,
			score: select('Score', scores, 'A+'),
			title: text('Title', 'This new ASUS tablet pc is dope')
		};

		const storyWrapperStyle = {
			width: '100%',
			maxWidth: reviewBoxProps.alignment === 'Fullbleed' ? '1024px' : '680px'
		};

		return (
			<div style={storyWrapperStyle}>
				<Theme blog={blogGroup()}>
					<ReviewBox {...reviewBoxProps} hide={false} image={null} />
				</Theme>
			</div>
		);
	});
