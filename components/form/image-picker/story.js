/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	boolean,
	action
} from 'base-storybook';
import ImagePicker from './image-picker';
import README from './README.md';
import styled from 'styled-components';

const Container = styled.div`
	width: 300px;
`;

const imageUploader = (shouldResolve: boolean) => () => new Promise((resolve, reject) => {
	setTimeout(() => {
		if (shouldResolve) {
			return resolve({
				public_id: 'fwu9urcm9iqaunawyoe8',
				url: 'file',
				format: 'png',
				width: 736,
				height: 1124,
				bytes: 0,
				etag: ''
			});
		}
		return reject({ meta: { error: { message: 'Something went wrong' } } });
	}, 2000);
});

storiesOf('3. Elements|Form/ImagePicker', module)
	.addDecorator(withDocs(README))
	.add('Image Picker', () => {
		const error = boolean('Error on upload?', false);
		return (
			<Container>
				<ImagePicker
					label='Avatar'
					transform='BlogLogoTall'
					imageUploader={imageUploader(!error)}
					onChange={action('onChange')}
					inlineHelp='Choose a JPG or PNG image that is smaller than 5000 by 5000 pixels.'
				/>
			</Container>
		);
	});
