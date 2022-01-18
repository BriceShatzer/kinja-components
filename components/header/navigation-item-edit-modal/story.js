/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action
} from 'base-storybook';
import NavigationItemEditModal from './navigation-item-edit-modal';
import README from './README.md';

const imageUploader = () => new Promise(resolve => {
	setTimeout(() => {
		return resolve({
			public_id: 'fwu9urcm9iqaunawyoe8',
			url: 'file',
			format: 'png',
			width: 736,
			height: 1124,
			bytes: 0,
			etag: ''
		});
	}, 2000);
});

storiesOf('4. Components|Navigation/Header', module)
	.addDecorator(withDocs(README))
	.add('NavigationItemEditModal', () => (
		<NavigationItemEditModal
			onSubmit={action('onSubmit')}
			onClose={action('onClose')}
			imageUploader={imageUploader}
		/>
	));
