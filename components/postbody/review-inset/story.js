// @flow

import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	withDocs,
	select
} from 'base-storybook';
import ReviewInset from './reviewInset';
import README from './README.md';


const Container = styled.div`
	width: 100%;
	max-width: 800px;
`;

storiesOf('4. Components|Post Body/Review Inset', module)
	.addDecorator(withDocs(README))
	.add('ReviewInset', () => {
		const sampleReview = {
			alignment: select('Alignment', { Left: 'Left', Center: 'Center', Fullbleed: 'Fullbleed'}),
			category: 'Movies',
			text: [{
				label: 'Director',
				value: 'Hayao Miyazaki'
			}, {
				label: 'Release Date',
				value: '2001'
			}],
			image: {
				id: 'ikwum2k9iayoepoyql5p',
				format: 'jpg'
			},
			score: 'A+',
			subcategory: 'Miyazaki movies',
			title: 'Spirited Away'
		};

		return (
			<Container>
				<ReviewInset {...sampleReview} editable hide={false} />
			</Container>
		);
	});
