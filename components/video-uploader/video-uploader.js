/* @flow */

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import Modal from '../modal';
import Button from '../buttons';

// ICONS
import CopyIcon from '../icon19/Copy';

import { FileSelector } from './file-selector';
import MetadataForm from './video-metadata-form';
import Cancel from './cancel';
import ProgressIndicator from './progress-indicator';

import type Uploader from 'kinja-magma/client/video-upload/Uploader';
import type {
	BucketUploadingResponse,
	Program,
	VideoMetadataFields,
	UpdateVideoResponse,
	S3UploadPart,
	S3UploadCompleteResponse,
	CaptionUploadResponse
} from 'kinja-magma/api/video';

type Props = {
	file?: File,
	uploader: Uploader,
	modalEl?: HTMLElement,
	onCancel: (Element | Text | null) => void,
	onError: ?string => void,
	onComplete?: (videoId: string) => void,
	onCopyUrl: (url: string, message?: string) => void,
	onCustomPosterClick?: (videoId: string) => void,
	isBlockNode: boolean,
	enableCaptionUpload: boolean,
	getPrograms: () => Promise<Array<Program>>,
	createCaption: (videoId: string, captionFile: File) => Promise<CaptionUploadResponse>,
	createVideoFromUUID: (uuid: string, metaFields: VideoMetadataFields) => Promise<UpdateVideoResponse>
};

type State = {
	file?: ?File,
	progress: number,
	isCancelling: boolean,
	errorMessage: ?string,
	metaFields: ?VideoMetadataFields,
	captionFile: ?File,
	videoId: string,
	uuid: string,
	uploadId: string,
	parts: Array<S3UploadPart>,
	fileState: 'initial' | 'selecting' | 'uploading' | 'moving' | 'uploaded',
	metadataState: 'initial' | 'editing' | 'submitted' | 'created'
};

const EditorWrapper = styled.div`
	align-items: center;
	background-color: ${props => props.theme.color.white};
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 0;
	overflow: visible;
	padding: 27.8% 30px;
	position: relative;
`;

const EditorWrapperBlockNode = styled(EditorWrapper)`
	border: 1px dashed ${props => props.theme.color.midgray};
	margin-bottom: 24px;
`;

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

export class VideoUpload extends Component<Props, State> {
	state = {
		file: null,
		progress: 0,
		fileState: 'initial',
		metadataState: 'initial',
		isCancelling: false,
		errorMessage: null,
		metaFields: null,
		videoId: '',
		uuid: '',
		uploadId: '',
		parts: [],
		captionFile: null
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
		}
	}

	componentWillUnmount() {
		this.props.uploader.cancel();
	}

	onEditClick = () => this.setState({
		metadataState: 'editing'
	});

	onFormClose = () => this.setState({
		metadataState: 'initial'
	});

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
			onUploadFinished: this.onS3UploadFinished
		};

		this.props.uploader.setConfig(incomingFileParams);

		this.setState({
			fileState: 'uploading',
			metadataState: 'editing'
		});
	};

	onFormSubmit = (id: string, formValues: VideoMetadataFields, captionFile: ?File): Promise<*> => new Promise(resolve => this.setState(prevState => ({
		metadataState: 'submitted',
		metaFields: {
			...prevState.metaFields,
			...formValues
		},
		captionFile
	}), resolve));

	onUploadCancel = () => this.props.onCancel(ReactDOM.findDOMNode(this)); // eslint-disable-line react/no-find-dom-node

	onUploadReset = () => {
		this.props.uploader.cancel();
		this.setState({
			fileState: 'selecting',
			errorMessage: null,
			metadataState: 'initial',
			progress: 0
		});
	};

	onCopyUrlClick = () => this.props.onCopyUrl(`https://kinja.com/api/videoupload/video/${this.state.videoId}`);

	createCaptionFile(): Promise<*> {
		if (this.state.captionFile) {
			return this.props.createCaption(this.state.videoId, this.state.captionFile);
		}

		return Promise.resolve();
	}

	createVideoFromUUID = (): Promise<*> => {
		// we change the fileState to `moving` to avoid additional
		// `createVideoFromUUID` calls being made from `componentDidUpdate`
		// while the below API call is waiting to resolve
		return new Promise(resolve => this.setState({
			fileState: 'moving'
		}, resolve))
			.then(() => {
				if (this.state.metaFields) {
					return this.props.createVideoFromUUID(this.state.uuid, this.state.metaFields)
						.then(({ id }) => this.setState({
							fileState: 'uploaded',
							metadataState: 'created',
							videoId: id
						}), err => {
							const message = err.error || err.message || 'An unknown error occurred';
							return this.setState({
								metadataState: 'submitted',
								errorMessage: message
							});
						})
						.catch(err => console.error(err));
				} else {
					// state.metaFields is nullable so we check for its presence above
					// before calling `props.createVideoFromUUID` so we should never get
					// here, but in case we set errorMessage to prevent additional state change
					return this.setState({
						errorMessage: 'An error occurred when moving the video file.'
					}, Promise.resolve);
				}
			});
	}

	onUploadProgress = ({ uploadedBytes, totalBytes }: BucketUploadingResponse) => this.setState({
		progress: Math.round((uploadedBytes / totalBytes) * 100)
	});

	onS3UploadFinished = ({ uuid, uploadId }: S3UploadCompleteResponse) => this.setState(() => ({
		fileState: 'uploaded',
		uuid,
		uploadId
	}));

	onProgramError = () => this.setState({
		errorMessage: 'This blog is not allowed to upload to JW.'
	});

	renderProgressIndicator() {
		const { progress, fileState, errorMessage, metadataState, videoId } = this.state;
		const isUploaded = fileState === 'uploaded';
		const isFinished = isUploaded && metadataState === 'created';
		const isErrored = Boolean(errorMessage);
		const sandboxId = isFinished ? `kinjavideo-${videoId}` : 'kinjavideo';

		const progressIndicator = (
			<ProgressIndicator
				onCancelClick={this.onCancelClick}
				onEditClick={this.onEditClick}
				onRetryClick={this.onUploadReset}
				message={getMessage(fileState, metadataState, errorMessage)}
				isUploaded={isUploaded}
				isFinished={isFinished}
				isErrored={isErrored}
				percent={progress}
			/>
		);

		const embedUrl = isFinished && this.renderEmbedUrl();

		return this.props.isBlockNode ?
			<kinja-sandbox id={sandboxId} data-transcoding={isFinished}>
				<EnsureDefaultTheme>
					<EditorWrapperBlockNode>
						{progressIndicator}
						{embedUrl}
					</EditorWrapperBlockNode>
				</EnsureDefaultTheme>
			</kinja-sandbox>
			:
			<EnsureDefaultTheme>
				<EditorWrapper>
					{progressIndicator}
					{embedUrl}
				</EditorWrapper>
			</EnsureDefaultTheme>;
	}

	renderFileSelectorModal() {
		const modal = (
			<Modal isOpen onClose={this.onFormClose} fullscreen>
				<FileSelector
					onCancel={this.onCancelClick}
					onSubmit={this.onFileSelect}
					file={this.state.file}
					title="Upload a video" />
			</Modal>);

		if (this.props.modalEl) {
			return ReactDOM.createPortal(modal, this.props.modalEl);
		}

		return modal;
	}

	renderEditModal() {
		const { fileState, metadataState, errorMessage, metaFields } = this.state;
		const isFinished = fileState === 'uploaded';
		const isErrored = Boolean(errorMessage);
		const modal = (
			<Modal isOpen onClose={this.onFormClose} fullscreen scrollable>
				<MetadataForm
					isFinished={isFinished}
					isErrored={isErrored}
					message={getMessage(fileState, metadataState, errorMessage)}
					onCancel={this.onFormClose}
					onSubmit={this.onFormSubmit}
					getPrograms={this.props.getPrograms}
					initialFormValues={metaFields}
					onProgramError={this.onProgramError}
					enableCaptionUpload={this.props.enableCaptionUpload}
				/>
			</Modal>
		);

		if (this.props.modalEl) {
			return ReactDOM.createPortal(modal, this.props.modalEl);
		}

		return modal;
	}

	renderCancelModal() {
		const modal = (
			<Modal isOpen onClose={this.onContinueClick} fullscreen={true}>
				<Cancel onCancel={this.onUploadCancel} onContinue={this.onContinueClick} />
			</Modal>
		);

		if (this.props.modalEl) {
			return ReactDOM.createPortal(modal, this.props.modalEl);
		}

		return modal;
	}

	renderEmbedUrl() {
		return (
			<div>
				<Button
					onClick={this.onCopyUrlClick}
					icon={<CopyIcon />}
					label="Copy video URL"
					labelPosition="after"
					weight="tertiary"
				/>
			</div>
		);
	}

	render() {
		const { fileState, metadataState, isCancelling } = this.state;
		const isSelectingFile = fileState === 'selecting';
		const isEditing = metadataState === 'editing';

		return (
			<Fragment>
				{this.renderProgressIndicator()}
				{isSelectingFile && this.renderFileSelectorModal()}
				{isEditing && this.renderEditModal()}
				{isCancelling && this.renderCancelModal()}
			</Fragment>
		);
	}
}

export default VideoUpload;
