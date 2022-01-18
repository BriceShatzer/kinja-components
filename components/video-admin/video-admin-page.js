// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import copy from 'copy-text-to-clipboard';
import debounce from 'lodash/debounce';
import uuid from 'uuid/v4';

import { EnsureDefaultTheme } from '../theme';
import Button from '../button19';
import Uploader from 'kinja-magma/client/video-upload/Uploader';
import { createNotification } from 'kinja-magma/client/hydration/utils/notificationHelpers';
import { updateVideoMetadata, createVideoFromUUID, createCaption } from 'kinja-magma/client/video-upload/videoApi';
import FileSelector from '../video-uploader/file-selector';
import Modal from '../modal';
import VideoAdminSearch from './video-admin-search';
import VideoAdminList from './video-admin-list';
import VideoAdminPagination from './video-admin-pagination';
import {
	getPrograms,
	getVideoInfo,
	saveCustomPoster,
	isPublished,
	searchVideoMeta
} from 'kinja-magma/api/video';
import VideoAdminTopBar from './video-admin-top-bar';
import uploadImage from 'kinja-magma/api/uploadImage';
import SimpleImage from 'kinja-magma/models/SimpleImage';

import type { ImageFormat } from 'postbody/Image';
import type { VideoMetadataFields, UpdateVideoResponse } from 'kinja-magma/api/video';
import VideoMetaResult from 'kinja-magma/models/VideoMeta';
import PlusIcon from '../icon19/Plus';

export type UploadingFileItem = {
	uuid: string,
	file: File,
	uploader: Uploader,
	videoId?: string
};

type Props = {
	initialSearchTerm?: ?string,
	videos: Array<VideoMetaResult>,
	enableCaptionUpload: boolean
};

type State = {
	isFileSelectorOpen: boolean,
	isSearchLoading: boolean,
	searchValue: string,
	searchNetwork: string,
	searchPage: number,
	videos: Array<VideoMetaResult>,
	uploadingFiles: Array<UploadingFileItem>
};

const MAX_SEARCH_RESULT = 50;

const MESSAGES = {
	VIDEO_INFO_SAVED: 'Video info saved.',
	VIDEO_INFO_SAVE_ERROR: 'Could not save video info. Please try again.',
	VIDEO_UPLOADED: 'Your video has been uploaded.',
	VIDEO_UPLOAD_ERROR: 'An error occurred while uploading the video, please try again.',
	VIDEO_UPLOAD_CANCELLED: 'Video upload was cancelled.',
	VIDEO_URL_COPIED: 'The video\'s URL has been copied to your clipboard. You can now paste it in another article.',
	IMAGE_UPLOADED: 'Your custom image has been uploaded.',
	IMAGE_UPLOAD_FAILED: 'Image upload failed. Please try again.'
};

const VideoMainWrapper = styled.div`
	width: 100%;
`;
const Container = styled.div`
	width: 100%;
	padding: 20px 16px 40px;
`;
const VideoAdminActions = styled.div`
	display: flex;
	justify-content: space-between;
`;
const VideoAdminSearchContainer = styled.div`
	flex-grow: 1;
	margin-bottom: 40px;
`;
const UploadButton = styled(Button)`
	align-self: center;
`;

export default class VideoPage extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isSearchLoading: false,
			searchValue: (props.initialSearchTerm || ''),
			searchNetwork: '',
			searchPage: 1,
			isFileSelectorOpen: false,
			uploadingFiles: [],
			videos: props.videos
		};
	}

	searchForVideos = (value: string, network: string) => {
		this.setState({
			searchValue: value,
			searchNetwork: network,
			isSearchLoading: true
		}, () => this.debouncedSearch());
	}

	debouncedSearch = debounce(() => {
		searchVideoMeta({
			query: this.state.searchValue,
			metaStatuses: ['Complete', 'Incomplete'],
			statuses: ['Complete', 'Uploaded', 'Processing', 'Failed'],
			networks: [this.state.searchNetwork],
			startIndex: ((this.state.searchPage - 1) * MAX_SEARCH_RESULT)
		})
			.then(videos => this.setState({ videos, isSearchLoading: false }))
			.catch(() => this.setState({ videos: [], isSearchLoading: false }));

	}, 500)

	getVideoStatus = (videoId: string): Promise<void> => {
		const initialDelay = 2 * 6 * 1000; // 2min
		const pollInterval = 10 * 1000; // 10sec
		let poll;

		return new Promise(resolve => {
			const onVideoStatus = isReady => {
				if (isReady) {
					window.clearInterval(poll);
					resolve();
				}
			};

			window.setTimeout(() => {
				poll = window.setInterval(() => {
					isPublished(videoId).then(onVideoStatus);
				}, pollInterval);
			}, initialDelay);
		});
	};

	handleFileSelect = (file: File) => {
		this.setState(prevState => ({
			uploadingFiles: [...prevState.uploadingFiles, { uuid: uuid(), file, uploader: new Uploader() }],
			isFileSelectorOpen: false
		}));
	}

	handleVideoUploadCancel = (uuid: string) => this.setState(prevState => ({
		uploadingFiles: prevState.uploadingFiles.filter(item => item.uuid !== uuid)
	}), () => {
		createNotification({
			message: MESSAGES.VIDEO_UPLOAD_CANCELLED
		});
	});

	handleVideoUpdateSubmit = (videoId: string, fields: VideoMetadataFields, captionFile: ?File): Promise<UpdateVideoResponse> => {
		if (captionFile) {
			return createCaption(videoId, captionFile)
				.then(() => updateVideoMetadata(videoId, fields))
				.then(this.onVideoSaveSuccess.bind(this), this.onVideoSaveError.bind(this));
		} else {
			return updateVideoMetadata(videoId, fields)
				.then(this.onVideoSaveSuccess.bind(this), this.onVideoSaveError.bind(this));
		}
	}

	handleVideoUploadError = (message: ?string) => {
		createNotification({
			message: message || 'An error occurred during upload.',
			type: 'error'
		});
	}

	handleVideoUrlCopy = (videoId: string) => {
		copy(`https://kinja.com/api/videoupload/video/${videoId}`);
		createNotification({
			type: 'success',
			message: MESSAGES.VIDEO_URL_COPIED
		});
	};

	handlePrevPageClick = () => this.setState(prevState => ({
		searchPage: prevState.searchPage - 1,
		isSearchLoading: true
	}), this.debouncedSearch);

	handleNextPageClick = () => this.setState(prevState => ({
		searchPage: prevState.searchPage + 1,
		isSearchLoading: true
	}), this.debouncedSearch);

	onVideoUploadComplete = (videoId: string, uuid: string) => {
		if (this.state.uploadingFiles.some(video => video.videoId !== videoId)) {
			this.setState(prevState => ({
				uploadingFiles: prevState.uploadingFiles.map(item =>
					item.uuid === uuid ? {...item, videoId} : item)
			}), () => {
				this.getVideoStatus(videoId).then(() => {
					return getVideoInfo(videoId).then(video => {
						if (video) {
							this.setState(prevState => ({
								videos: [VideoMetaResult.fromJSON(video), ...prevState.videos],
								uploadingFiles: prevState.uploadingFiles.filter(item => item.uuid !== uuid)
							}));
						}
					});
				});
			});
		}
	};

	onVideoSaveSuccess(updatedVideo: UpdateVideoResponse) {
		const { id, title, network, monetizable } = updatedVideo;
		this.setState(prevState => ({
			videos: prevState.videos.map(video =>
				video.id === id ? new VideoMetaResult({
					...video,
					title,
					hasPreroll: monetizable,
					network,
					posts: video.posts,
					poster: video.poster
				}) : video
			)
		}));
		createNotification({ message: MESSAGES.VIDEO_INFO_SAVED });
	}

	onVideoSaveError() {
		createNotification({ message: MESSAGES.VIDEO_INFO_SAVE_ERROR });
	}

	onCustomPosterChange = (videoId: string, { id, format }: {
		id: string,
		format: ImageFormat
	}) => {
		const poster = SimpleImage.fromJSON({ id, format });

		return saveCustomPoster({
			videoId,
			poster
		})
			.then(() => {
				this.setState(prevState => ({
					videos: prevState.videos.map(video =>
						video.id === videoId ? new VideoMetaResult({
							...video,
							poster
						}) : video
					)
				}));
				createNotification({ message: MESSAGES.IMAGE_UPLOADED });
			}, () => {
				createNotification({ message: MESSAGES.IMAGE_UPLOAD_FAILED, type: 'error' });
			});

	}

	renderFileSelectorModal() {
		return (
			<Modal isOpen>
				<FileSelector
					title="Upload a video"
					onSubmit={this.handleFileSelect}
					onCancel={() => this.setState({ isFileSelectorOpen: false })}
				/>
			</Modal>
		);
	}

	render() {
		const {
			isFileSelectorOpen,
			isSearchLoading,
			searchValue,
			searchNetwork,
			searchPage,
			videos,
			uploadingFiles
		} = this.state;

		return (
			<EnsureDefaultTheme>
				<VideoMainWrapper className='js_video-upload-page'>
					<Container>
						<VideoAdminTopBar videos={true} />
						<VideoAdminActions>
							<VideoAdminSearchContainer>
								<VideoAdminSearch
									searchValue={searchValue}
									searchProgram={searchNetwork}
									getPrograms={getPrograms}
									onSearch={this.searchForVideos}
								/>
							</VideoAdminSearchContainer>
							<UploadButton
								label="Upload video"
								labelPosition="after"
								icon={<PlusIcon />}
								onClick={() => this.setState({ isFileSelectorOpen: true })}
							/>
						</VideoAdminActions>
						<VideoAdminList
							uploadingFiles={uploadingFiles}
							videos={videos}
							isLoading={isSearchLoading}
							enableCaptionUpload={this.props.enableCaptionUpload}
							uploadImage={uploadImage}
							getPrograms={getPrograms}
							getVideoInfo={getVideoInfo}
							createCaption={createCaption}
							createVideoFromUUID={createVideoFromUUID}
							onVideoUploadCancel={this.handleVideoUploadCancel}
							onVideoUploadError={this.handleVideoUploadError}
							onVideoUploadComplete={this.onVideoUploadComplete}
							onVideoUpdateSubmit={this.handleVideoUpdateSubmit}
							onCustomPosterChange={this.onCustomPosterChange}
							onCopyURLClick={this.handleVideoUrlCopy}
						/>
						<VideoAdminPagination
							limit={MAX_SEARCH_RESULT}
							currentPage={searchPage}
							onPrevClick={this.handlePrevPageClick}
							onNextClick={this.handleNextPageClick}
						/>
					</Container>
					{isFileSelectorOpen && this.renderFileSelectorModal()}
				</VideoMainWrapper>
			</EnsureDefaultTheme>
		);
	}
}
