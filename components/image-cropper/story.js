/* @flow */

/**
 * Story file for the component
 */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action,
	select,
	number,
	boolean
} from 'base-storybook';
import ImageCropper from './image-cropper';
import README from './README.md';
import { Theme } from 'kinja-components/components/theme';

const aspectRatios = {
	'16:9': 16 / 9,
	'3:2': 3 / 2,
	'1:1': 1
};


// State the name of the component
storiesOf('4. Components|Image Crop', module)
	// Stories are common usecases for the component, try to cover most of the use cases.
	.addDecorator(withDocs(README))
	.addDecorator(getStory => {
		require('./story.sass');
		return getStory();
	})
	.add('standard', () => {
		return (
			<Theme>
				<ImageCropper
					src={select('Image', {
						'https://i.kinja-img.com/gawker-media/image/upload/jqrnrspy5ojdiemoqk5h.jpg': 'normal',
						'https://i.kinja-img.com/gawker-media/image/upload/ei21hkwosw5b2d7jf4cg.jpg': 'large',
						'https://i.kinja-img.com/gawker-media/image/upload/iaapseoiddwlfxvhe5jv.jpg': 'painting',
						'https://i.kinja-img.com/gawker-media/image/upload/bepeeu94ktqbodx8svow.jpg': 'portrait',
						'https://i.kinja-img.com/gawker-media/image/upload/s0fyel4fjoh48j74crvh.jpg': 'person',
						'https://i.kinja-img.com/gawker-media/image/upload/jhtkrivrzzbmlg8vyfts.png': 'car',
						'https://i.kinja-img.com/gawker-media/image/upload/efyzhcuycxuor3utmcp0.jpg': 'B&W'
					}, 'https://i.kinja-img.com/gawker-media/image/upload/jqrnrspy5ojdiemoqk5h.jpg')}
					aspectRatios={aspectRatios}
					onComplete={action('Crop changed')}
					onAspectChange={action('Aspect changed')}
					onImageLoad={action('Image loaded')}
					widthWarningThreshold={number('Width warning threshold', 600)}
					heightWarningThreshold={number('Height warning threshold', 400)}
					minWidth={number('Minimum width', 200)}
					minHeight={number('Minimum height', 200)}
					smartCrop={boolean('Content aware crop', true)}
					language={select('Locale', {
						'en-US': 'English (en)',
						'es-ES': 'Spanish (es)'
					}, 'en-US')}
				/>
			</Theme>
		);
	});
