// @flow

import * as React from 'react';
import styled from 'styled-components';

import createTranslate from 'kinja-components/components/translator';
import translations from '../video-search/translations';
import { Loading } from '../elements/loader';
import UploadingVideoListItem from '../video-uploader/uploading-video-list-item';
import VideoListItem from './video-list-item';
import VideoList from './video-list';
import VideoMetaResult from 'kinja-magma/models/VideoMeta';

import type { VideoMetaJSON } from 'kinja-magma/models/VideoMeta';
import type { Locale } from 'kinja-magma/models/Locale';
import type { Image } from '../types';
import type { ImagesResponse } from 'kinja-magma/models/Image';
import type {
	VideoMetadataFields,
	Program,
	CaptionUploadResponse,
	UpdateVideoResponse
} from 'kinja-magma/api/video';
import type { UploadingFileItem } from './video-admin-page';

const LoadingContainer = styled.div`
	grid-column-start: span ${props => props.colLength};
	margin-top: 25px;
`;

type Props = {
	uploadingFiles: Array<UploadingFileItem>,
	videos: Array<VideoMetaResult>,
	locale?: Locale,
	isLoading: boolean,
	enableCaptionUpload: boolean,
	uploadImage: (image: string | File) => Promise<ImagesResponse>,
	getVideoInfo: (videoId: string, bustCache: boolean) => Promise<VideoMetaJSON>,
	getPrograms: () => Promise<Array<Program>>,
	createVideoFromUUID: (uuid: string, metaFields: VideoMetadataFields) => Promise<UpdateVideoResponse>,
	createCaption: (videoId: string, captionFile: File) => Promise<CaptionUploadResponse>,
	onVideoUploadCancel: (uuid: string) => void,
	onVideoUploadError: ?string => void,
	onVideoUploadComplete: (videoId: string, uuid: string) => void,
	onVideoUpdateSubmit: (videoId: string, metaFields: VideoMetadataFields, captionFile: ?File) => Promise<UpdateVideoResponse>,
	onCustomPosterChange: (videoId: string, image: Image) => Promise<void>,
	onCopyURLClick: (videoId: string) => void
};

const videoListColumns = [
	{ name: 'Thumbnail', width: 100 },
	{ name: 'Video title' },
	{ name: 'Status', width: 55 },
	{ name: 'Uploaded', width: 132 },
	{ name: 'Length', width: 60 },
	{ name: 'Appears in' },
	{ name: 'Actions', width: 220 }
];

class VideoAdminList extends React.Component<Props> {
	renderFileUploader = (item: UploadingFileItem) => (
		<UploadingVideoListItem key={item.uuid}
			file={item.file}
			uploader={item.uploader}
			isTranscoded={false}
			onCancel={() => this.props.onVideoUploadCancel(item.uuid)}
			onError={this.props.onVideoUploadError}
			onComplete={id => this.props.onVideoUploadComplete(id, item.uuid)}
			createCaption={this.props.createCaption}
			createVideoFromUUID={this.props.createVideoFromUUID}
			enableCaptionUpload={this.props.enableCaptionUpload}
			uploadImage={this.props.uploadImage}
			getPrograms={this.props.getPrograms}
			getVideoInfo={this.props.getVideoInfo}
			onVideoUpdateSubmit={this.props.onVideoUpdateSubmit}
			onCustomPosterChange={this.props.onCustomPosterChange}
			onCopyURLClick={this.props.onCopyURLClick}
		/>
	)

	render() {
		const {
			isLoading,
			uploadingFiles,
			videos,
			locale,
			uploadImage,
			enableCaptionUpload,
			onVideoUpdateSubmit,
			onCustomPosterChange,
			onCopyURLClick
		} = this.props;
		const hasResults = videos && videos.length > 0;
		const hasUploadingFiles = uploadingFiles && uploadingFiles.length > 0;
		const translate = createTranslate(translations, locale);
		return (
			<VideoList columns={videoListColumns}>
				{hasUploadingFiles && uploadingFiles.map(this.renderFileUploader)}
				{isLoading && <LoadingContainer colLength={videoListColumns.length}><Loading /></LoadingContainer>}
				{!isLoading && (!hasResults && !hasUploadingFiles) &&
					<p>{translate('Sorry, no videos match your search.')}</p>
				}
				{!isLoading && hasResults &&
					<React.Fragment>
						{videos.map(item =>
							<VideoListItem key={item.id}
								videoId={item.id}
								progress={0}
								title={item.title}
								duration={item.duration}
								network={item.network}
								poster={item.poster}
								posts={item.posts}
								publishedTime={item.publishedTimestamp.replace(/\[.*/, '')}
								isUploaded={item.status === 'Uploaded' || item.status === 'Complete'}
								isMetaSaved={item.metaStatus === 'Complete'}
								isTranscoded={item.metaStatus === 'Complete' && (item.status === 'Uploaded' || item.status === 'Complete')}
								enableCaptionUpload={enableCaptionUpload}
								uploadImage={uploadImage}
								getPrograms={this.props.getPrograms}
								getVideoInfo={this.props.getVideoInfo}
								onVideoUpdateSubmit={onVideoUpdateSubmit}
								onCustomPosterChange={onCustomPosterChange}
								onCopyURLClick={() => onCopyURLClick(item.id)}
							/>
						)}
					</React.Fragment>
				}
			</VideoList>
		);
	}
}

export default VideoAdminList;
