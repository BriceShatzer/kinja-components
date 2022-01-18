/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	withDocs,
	select,
	action,
	boolean
} from 'base-storybook';
import AdSlide from './ad-slide';
import README from './README.md';

const StoryConatiner = styled.div`
	min-width: 800px;
`;

storiesOf('4. Components|Post Body/Slideshow', module)
	.addDecorator(getStory => (
		<StoryConatiner>
			{getStory()}
		</StoryConatiner>
	))
	.addDecorator(withDocs(README))
	.add('Ad Slide', () => (
		<AdSlide
			onLeftClick={action('Left click')}
			onRightClick={action('Right click')}
			disabled={boolean('Disabled', false)}
			aspectRatio={select('Aspect Ratio', {
				Wide: 'Wide',
				Photo: 'Photo'
			}, 'Photo')}
		/>
	));
