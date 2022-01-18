/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	number
} from 'base-storybook';
import SlideshowNavigation from './slideshow-navigation';
import README from './README.md';

const Logic = (props: { children: React.Node}) => {
	const [index, setIndex] = React.useState(0);
	const max = number('Number of slides', 30);
	return React.Children.map(props.children, child => React.cloneElement(child, {
		currentSlideIndex: index,
		numberOfSlides: max,
		onPreviousClick: () => setIndex(Math.max(index - 1, 0)),
		onNextClick: () => setIndex(Math.min(index + 1, max))
	}));
};

storiesOf('4. Components|SlideshowNavigation', module)
	.addDecorator(withDocs(README))
	.add('Sticky navigation', () => {
		return (
			<Logic>
				<SlideshowNavigation
					currentSlideIndex={0}
					numberOfSlides={30}
					onPreviousClick={() => undefined}
					onNextClick={() => undefined}
					postShareUrls={{
						permalink: 'http://google.com',
						emailShareUrl: 'http://google.com',
						facebookShareUrl: 'http://google.com',
						twitterShareUrl: 'http://google.com'
					}}
				/>
			</Logic>
		);
	});
