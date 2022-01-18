// @flow

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	boolean,
	blogGroup,
	storiesOf,
	withDocs
} from 'base-storybook';

import Theme from 'kinja-components/components/theme';
import AvatarUploader from './';
import README from './README.md';

import type { CloudinaryResponse } from '../form/image-upload/types';


storiesOf('4. Elements|Avatar Uploader', module)
	.addDecorator(withDocs(README))
	.add('Avatar Uploader', () => {
		boolean('resolve', true);
		const resolve = (): CloudinaryResponse => {
			return {
				public_id: 'wbbot6qcrfa4gmmh4tam',
				url: 'file',
				format: 'gif',
				width: 120,
				height: 120
			};
		};
		const reject = () => ({ meta: { error: { message: 'Something went wrong' } } });

		const Container = styled.div`
			width: 100vw;
			max-width: 636px;
			margin: 0 auto;
		`;

		return (
			<Theme blog={blogGroup()}>
				<Container>
					<AvatarUploader
						imageUploader={() => (boolean('Resolve', true) ?
							Promise.resolve(resolve()) :
							Promise.reject(reject())
						)}
						onChange={action('Image upload success')}
						onError={action('Image upload error')}
					/>
				</Container>
			</Theme>
		);
	});