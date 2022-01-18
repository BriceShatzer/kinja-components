/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action,
	boolean,
	select
} from 'base-storybook';

import type { CloudinaryResponse } from './types';

import ImageUpload from './image-upload';
import README from './README.md';

const resolve = (image: string | File): CloudinaryResponse => {
	const url = typeof image === 'string' ? image : 'file';

	return {
		public_id: 'dzeyagxukyan2efhnnnj',
		url,
		format: 'jpg',
		width: 736,
		height: 1124
	};
};

const reject = () => ({ meta: { error: { message: 'Something went wrong' } } });

const imageURL = 'https://res.cloudinary.com/gawker-media/image/upload/v1495783363/e8mjtsueifdddwlhvwlj.png';
const values = [
	'',
	imageURL,
	'¯\\_(ツ)_/¯'
];

storiesOf('4. Elements|Form/Image Upload', module)
	.addDecorator(withDocs(README))
	.add('Image Upload', () => {
		boolean('resolve', true);
		return (
			<ImageUpload
				imageUploader={(image: string | File) => (boolean('resolve', true) ?
					Promise.resolve(resolve(image)) :
					Promise.reject(reject())
				)}
				value={select('value', values, '')}
				onChange={action('Image upload success')}
				onError={action('Image upload error')}
				onUploadStarted={action('Upload started')}
				language={select('Locale', {
					'en-US': 'English (en)',
					'es-ES': 'Spanish (es)'
				}, 'en-US')}
			/>
		);
	});
