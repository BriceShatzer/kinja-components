// @flow

import React from 'react';
import Modal from '../modal';

import VideoPostLink from 'kinja-magma/models/VideoPostLink';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import { LazyResponsiveImage, MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH } from '../elements/image';
import placeholderImage from 'kinja-images/placeholderImage';
import PencilIcon from '../icon19/Pencil';
import ImageIcon from '../icon19/Image';
import CopyIcon from '../icon19/Copy';
import CloseIcon from '../icon19/Close';

import { FileSelector, EditModal, CustomPosterModal } from './';
import Cancel from './cancel';
import { getTimestamp, getDuration } from '../video-admin/utils';
import { ListRow, ListColumn } from '../video-admin/video-list';
import {
	ActionButton,
	CutoffText,
	getLogoName,
	renderStatusIcon,
	renderTitle,
	renderPosts
} from '../video-admin/video-list-item';

import type Uploader from 'kinja-magma/client/video-upload/Uploader';
import type { Locale } from 'kinja-magma/models/Locale';
import type { Image } from '../types';
import type {
	BucketUploadingResponse,
	Program,
	VideoMetadataFields,
	UpdateVideoResponse,
	S3UploadPart,
	S3UploadCompleteResponse,
	CaptionUploadResponse
} from 'kinja-magma/api/video';
import type { VideoMetaJSON } from 'kinja-magma/models/VideoMeta';

type Props = {
	file?: File,
	duration?: number,
	posts?: Array<VideoPostLink>,
	publishedTime?: string,
	uploader: Uploader,
	locale?: Locale,
	onCancel: () => void,
	onError: ?string => void,
	onComplete?: (videoId: string) => void,
	onCustomPosterChange: (videoId: string, image: Image) => Promise<void>,
	onCopyURLClick: (videoId: string) => void,
	onCustomPosterClick?: (videoId: string) => void,
	uploadImage: (image: string | File) => Promise<*>,
	enableCaptionUpload: boolean,
	isTranscoded: boolean,
	getPrograms: () => Promise<Array<Program>>,
	getVideoInfo?: (videoId: string, bustCache: boolean) => Promise<VideoMetaJSON>,
	createCaption: (videoId: string, captionFile: File) => Promise<CaptionUploadResponse>,
	createVideoFromUUID: (uuid: string, metaFields: VideoMetadataFields) => Promise<UpdateVideoResponse>,
	onVideoUpdateSubmit: (videoId: string, metaFields: VideoMetadataFields, captionFile: ?File) => Promise<UpdateVideoResponse>
};

type State = {
	file?: ?File,
	progress: number,
	isEditing: boolean,
	isUploadingPoster: boolean,
	isCancelling: boolean,
	errorMessage: ?string,
	metaFields: ?VideoMetadataFields,
	captionFile: ?File,
	customPoster?: ?SimpleImage,
	videoId: string,
	uuid: string,
	uploadId: string,
	parts: Array<S3UploadPart>,
	fileState: 'initial' | 'selecting' | 'uploading' | 'uploaded',
	metadataState: 'initial' | 'submitted' | 'created' | 'saved'
};

const getMessage = (fileState, metadataState, errorMessage) => {
	let message;

	if (errorMessage) {
		message = errorMessage;
	} else if (fileState === 'uploaded') {
		if (metadataState === 'created') {
			message = 'Your video has been uploaded and is now being transcoded.\nYou can continue editing or close this browser tab now.';
		} else if (metadataState === 'submitted') {
			message = 'Publishing to JW…';
		} else {
			message = 'Your video has been uploaded but is missing required info.\nEdit now to finish.';
		}
	} else if (metadataState === 'submitted') {
		message = 'Your video is uploading.\n';
	} else {
		message = 'Your video is uploading.\nAdd more info about it in the meantime!';
	}

	return message;
};

export default class UploadingVideoListItem extends React.Component<Props, State> {
	state = {
		file: null,
		progress: 0,
		fileState: 'initial',
		metadataState: 'initial',
		isEditing: false,
		isUploadingPoster: false,
		isCancelling: false,
		errorMessage: null,
		metaFields: null,
		videoId: '',
		uuid: '',
		uploadId: '',
		parts: [],
		captionFile: null,
		customPoster: null
	};

	componentDidMount() {
		const { file } = this.props;

		if (file) {
			this.onFileSelect(file);
		}
	}

	componentDidUpdate(_: Props, prevState: State) {
		if (this.state.errorMessage && this.state.errorMessage !== prevState.errorMessage) {
			this.props.onError(this.state.errorMessage);
		} else if (this.state.isCancelling) {
			this.props.uploader.pause();
		} else if (prevState.isCancelling) {
			this.props.uploader.unpause();
		} else if (this.state.fileState === 'uploading' && prevState.fileState !== 'uploading') {
			this.props.uploader.start().catch(error => this.setState({ errorMessage: error.message }));
		} else if (this.state.fileState === 'uploaded' && this.state.metadataState === 'submitted') {
			this.createVideoFromUUID()
				.then(() => {
					if (this.state.captionFile) {
						this.createCaptionFile();
					}
				});
		} else if (this.state.metadataState === 'created' && this.props.onComplete) {
			this.props.onComplete(this.state.videoId);
			this.setState({ metadataState: 'saved' });
		}
	}

	componentWillUnmount() {
		this.props.uploader.cancel();
	}

	onFormClose = () => this.setState(prevState => ({
		isEditing: false,
		metadataState: (prevState.metadataState === 'submitted' || prevState.metadataState === 'saved') ? prevState.metadataState : 'initial'
	}));

	onCancelClick = () => this.setState({
		isCancelling: true
	});

	onContinueClick = () => this.setState({
		isCancelling: false
	});

	onFileSelect = (file: File) => {
		const incomingFileParams = {
			file,
			contentType: file.type,
			onUploadProgress: this.onUploadProgress,
			onUploadFinished: this.onUploadFinished
		};

		this.props.uploader.setConfig(incomingFileParams);

		this.setState({
			fileState: 'uploading',
			isEditing: true
		});
	};

	onFormSubmit = (videoId: string, formValues: VideoMetadataFields, captionFile: ?File): Promise<void> => {
		if (videoId) {
			return this.props.onVideoUpdateSubmit(videoId, formValues, captionFile)
				.then(() => this.setState(prevState => ({
					isEditing: false,
					metadataState: prevState.metadataState === 'saved' ? 'saved' : 'submitted',
					metaFields: {
						...prevState.metaFields,
						...formValues
					},
					captionFile
				})));
		}

		return new Promise(resolve => this.setState(prevState => ({
			isEditing: false,
			metadataState: prevState.metadataState === 'saved' ? 'saved' : 'submitted',
			metaFields: {
				...prevState.metaFields,
				...formValues
			},
			captionFile
		}), resolve));
	}

	onUploadCancel = () => this.props.onCancel();

	onUploadReset = () => {
		this.props.uploader.cancel();
		this.setState({
			fileState: 'selecting',
			errorMessage: null,
			metadataState: 'initial',
			progress: 0
		});
	};

	onCustomPosterUpload = (image: Image): void => {
		this.props.onCustomPosterChange(this.state.videoId, image)
			.then(() => this.setState({ isUploadingPoster: false, customPoster: SimpleImage.fromJSON(image) }));
	}

	createCaptionFile(): Promise<?CaptionUploadResponse> {
		if (this.state.captionFile) {
			return this.props.createCaption(this.state.videoId, this.state.captionFile);
		}

		return Promise.resolve();
	}

	createVideoFromUUID = (): Promise<void> => {
		if (this.state.metaFields) {
			return this.props.createVideoFromUUID(this.state.uuid, this.state.metaFields)
				.then(({ id }) => this.setState({
					metadataState: 'created',
					videoId: id
				}), err => {
					const message = err.error || err.message || 'An unknown error occurred';
					return this.setState({
						metadataState: 'submitted',
						errorMessage: message
					});
				})
				.catch(err => console.warn(err));
		} else {
			return Promise.resolve();
		}
	}

	onUploadProgress = ({ uploadedBytes, totalBytes }: BucketUploadingResponse) => this.setState({
		progress: Math.round((uploadedBytes / totalBytes) * 100)
	});

	onUploadFinished = ({ uuid, uploadId }: S3UploadCompleteResponse) => this.setState(() => ({
		fileState: 'uploaded',
		uuid,
		uploadId
	}));

	onProgramError = () => this.setState({
		errorMessage: 'This blog is not allowed to upload to JW.'
	});

	renderEditButton() {
		if (this.state.videoId) {
			return <ActionButton
				icon={<PencilIcon />}
				variant="tertiary"
				onClick={() => this.setState({ isEditing: true })}
			/>;
		}

		return <ActionButton
			icon={<PencilIcon />}
			variant="variant"
			onClick={() => this.setState({ isEditing: true })}
			label="Edit"
			labelPosition="after"
			isSmall
		/>;
	}

	renderFileSelectorModal = () => (
		<Modal isOpen onClose={this.onFormClose} fullscreen>
			<FileSelector
				onCancel={this.onCancelClick}
				onSubmit={this.onFileSelect}
				file={this.state.file}
				title="Upload a video" />
		</Modal>
	);

	renderCancelModal = () => (
		<Modal isOpen onClose={this.onContinueClick}>
			<Cancel onCancel={this.onUploadCancel} onContinue={this.onContinueClick} />
		</Modal>
	);

	renderEditModal() {
		const { fileState, metadataState, errorMessage, metaFields } = this.state;
		const isFinished = fileState === 'uploaded';
		const isErrored = Boolean(errorMessage);
		return (
			<EditModal
				isFinished={isFinished}
				isErrored={isErrored}
				message={getMessage(fileState, metadataState, errorMessage)}
				onCancel={this.onFormClose}
				onSubmit={this.onFormSubmit}
				getPrograms={this.props.getPrograms}
				initialFormValues={metaFields}
				videoId={this.state.videoId}
				onProgramError={this.onProgramError}
				enableCaptionUpload={this.props.enableCaptionUpload}
			/>
		);
	}

	renderCustomPosterModal = () => (
		<CustomPosterModal
			imageUploader={this.props.uploadImage}
			onChange={this.onCustomPosterUpload}
			onCancel={() => this.setState({ isCancelling: false })}
		/>
	);

	render() {
		const {
			duration,
			locale,
			posts,
			isTranscoded,
			publishedTime,
			onCopyURLClick
		} = this.props;
		const { fileState, metadataState, errorMessage, metaFields, customPoster, videoId, progress, isEditing, isUploadingPoster, isCancelling } = this.state;
		const isUploaded = fileState === 'uploaded';
		const isMetaSaved = metadataState === 'submitted' || metadataState === 'created' || metadataState === 'saved';
		const title = metaFields ? metaFields.title : '';
		const blogName = getLogoName();

		return (
			<ListRow>
				<ListColumn>
					{customPoster ? <LazyResponsiveImage
						alt={title}
						ariaLabel={title}
						format={customPoster.format}
						id={customPoster.id}
						width={MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH}
						transform="KinjaCenteredLargeAuto"
						croppedImage
						noLazy
						relative
					/> : <img src={placeholderImage(blogName)} />}
				</ListColumn>
				<ListColumn><CutoffText>{renderTitle(title)}</CutoffText></ListColumn>
				<ListColumn>
					{renderStatusIcon({
						isUploaded,
						isMetaSaved,
						isTranscoded,
						errorMessage,
						progress
					})}
				</ListColumn>
				<ListColumn>{publishedTime && getTimestamp(publishedTime, locale)}</ListColumn>
				<ListColumn centered>{duration && getDuration(duration)}</ListColumn>
				<ListColumn>
					{renderPosts(posts, blogName)}
				</ListColumn>
				<ListColumn>
					{this.renderEditButton()}
					{isUploaded &&
						<React.Fragment>
							{videoId &&
								<ActionButton
									icon={<ImageIcon />}
									variant="tertiary"
									onClick={() => this.setState({ isUploadingPoster: true })}
								/>
							}
							{(videoId && isMetaSaved) &&
								<ActionButton
									icon={<CopyIcon />}
									label='Copy URL'
									variant="primary"
									onClick={() => onCopyURLClick(videoId)}
									isSmall
								/>
							}
						</React.Fragment>
					}
					{!isUploaded &&
						<ActionButton
							icon={<CloseIcon />}
							variant="tertiary"
							onClick={() => this.setState({ isCancelling: true })}
							label="Cancel"
							labelPosition="after"
							isSmall
						/>
					}
				</ListColumn>
				{isEditing && this.renderEditModal()}
				{isUploadingPoster && this.renderCustomPosterModal()}
				{isCancelling && this.renderCancelModal()}
			</ListRow>
		);
	}
}
