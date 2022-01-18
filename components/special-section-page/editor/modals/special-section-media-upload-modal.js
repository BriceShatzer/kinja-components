/* @flow */

import * as React from 'react';
import Modal from '../../../modal';
import type { ModalProps } from '../../types';
import type { CloudinaryResponse } from '../../../form/image-upload/types';
import ImageUpload from '../../../form/image-upload';
import SpecialSectionVideoResolver from './special-section-video-resolver';
import KinjaVideo from 'postbody/blockNodes/KinjaVideo';
import type { Image } from '../../../types';
import ImageNode from 'postbody/blockNodes/ImageNode';

type Props = {
	onUpload: (media: KinjaVideo | ImageNode) => void,
	imageUploader: (image: string | File) => Promise<CloudinaryResponse>,
	videoResolver: string => Promise<KinjaVideo>,
	type: 'Video' | 'Image'
} & ModalProps;

export default function SpecialSectionMediaUploadModal({ isOpen, onUpload, onClose, imageUploader, videoResolver, type }: Props) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			{type === 'Video' ? (
				<SpecialSectionVideoResolver videoResolver={videoResolver} onUpload={onUpload} onCancel={onClose} />
			) : (
				<ImageUpload
					imageUploader={imageUploader}
					onChange={(image: Image) =>
						onUpload(new ImageNode({ id: image.id || '', format: image.format || 'jpg', width: image.width || 0, height: image.height || 0 }))
					}
				/>
			)}
		</Modal>
	);
}
