// @flow

import React from 'react';
import Modal from '../modal';
import ImageUpload from '../form/image-upload/image-upload';
import type { Image } from '../types';

type Props = {
	onCancel: () => void,
	onChange: Image => void,
	imageUploader: (image: string | File) => Promise<*>,
};

const CustomPosterModal = (props: Props) =>
	<Modal isOpen onClose={props.onCancel}>
		<ImageUpload
			imageUploader={props.imageUploader}
			onChange={props.onChange}
			language='en'
		/>
	</Modal>;

export default CustomPosterModal;