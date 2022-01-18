// @flow
import React from 'react';
import Modal from '../modal';
import VideoMetadataForm, { type Props } from './video-metadata-form';

const EditModal = (props: Props) =>
	<Modal isOpen onClose={props.onCancel} scrollable>
		<VideoMetadataForm {...props} />
	</Modal>;

export default EditModal;