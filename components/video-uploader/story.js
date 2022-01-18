/* @flow */

import * as React from 'react';
import {
	action,
	storiesOf,
	text,
	number,
	boolean,
	withDocs
} from 'base-storybook';
import stubbedPrograms from './fixtures/stubbedPrograms';
import VideoFileSelector from './file-selector';
import VideoMetadataForm from './video-metadata-form';
import VideoProgressIndicator from './progress-indicator';
import UploadingVideoListItem from './uploading-video-list-item';
import Uploader from 'kinja-magma/client/video-upload/Uploader';
import README from './README.md';

const config = {
	progressMessage: 'Your video is uploading. Add more info about it in the meantime!',
	successMessage: 'Your video has been uploaded and is now being transcoded. You can continue editing or close this browser tab now.',
	cancelMessage: 'Are you sure you want to cancel the upload?'
};

const stubbedVideoMeta = {
	id: '',
	title: '',
	description: '',
	monetizable: false,
	network: ''
};

storiesOf('4. Components|Video Uploader', module)
	.addDecorator(withDocs(README))
	.add('File Selector', () => (
		<VideoFileSelector
			title={text('title', 'Upload Video')}
			onSubmit={action('File submitted')}
			onCancel={action('Upload cancelled')}
		/>
	))
	.add('Video Metadata Form', () => (
		<VideoMetadataForm
			onCancel={action('Reset form and close')}
			onSubmit={action('Save metadata form')}
			isFinished={boolean('isFinished', false)}
			isErrored={boolean('isErrored', false)}
			message={text('message', config.progressMessage)}
			blog="gizmodo"
			getPrograms={() => Promise.resolve(stubbedPrograms)}
			onProgramError={() => {}}
			enableCaptionUpload={boolean('Show captions field?', true)}
		/>
	))
	.add('Progress Indicator', () =>
		<VideoProgressIndicator
			onCancelClick={action('Display cancellation alert')}
			onEditClick={action('Display video metadata form')}
			onRetryClick={action('Retry')}
			isFinished={boolean('isFinished', false)}
			isUploaded={boolean('isUploaded', false)}
			isErrored={boolean('isErrored', false)}
			stateTransition={boolean('stateTransition', true)}
			message={text('message', config.progressMessage)}
			percent={number('percent', 25)}
		/>
	)
	.add('Uploading List Item', () =>
		<UploadingVideoListItem
			title={text('title', 'Test Video Upload')}
			message={text('message', 'Your video is uploading.')}
			onCancel={action('Display cancellation alert')}
			onError={() => {}}
			onEditClick={action('Display video metadata form')}
			onRetryClick={action('Retry')}
			onCopyURLClick={action('Copy video embed url')}
			createVideoFromUUID={() => Promise.resolve(stubbedVideoMeta)}
			isFinished={boolean('isFinished', false)}
			isUploaded={boolean('isUploaded', false)}
			isTranscoded={boolean('isTranscoded', false)}
			isErrored={boolean('isErrored', false)}
			videoId=''
			network=''
			enableCaptionUpload={false}
			createCaption={() => Promise.resolve({
				format: 'srt',
				label: 'en',
				language: 'en',
				uuid: '',
				videoId: ''
			})}
			uploadImage={() => Promise.resolve({
				public_id: '',
				url: '',
				bytes: 0,
				etag: '',
				format: 'jpg',
				height: 0,
				width: 0
			})}
			onCustomPosterChange={() => Promise.resolve()}
			getPrograms={() => Promise.resolve(stubbedPrograms)}
			uploader={new Uploader()}
			onVideoUpdateSubmit={() => Promise.resolve(stubbedVideoMeta)}
		/>
	);
