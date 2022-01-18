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
import README from './README.md';
import stubbedPost from 'kinja-magma/templates/react/stubbedPost.json';
import VideoList from './video-list';
import VideoListItem from './video-list-item';
import VideoPlaylist from './video-playlist';
import VideoPlaylistItem from './video-playlist-item';
import VideoPlaylistDetail from './video-playlist-detail';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import VideoAdminSearch from './video-admin-search';
import VideoAdminPagination from './video-admin-pagination';

const stubbedVideoMeta = {
	id: '123456',
	title: '',
	description: '',
	monetizable: false,
	network: '',
	tags: [],
	addedBy: '0',
	captions: [],
	duration: 0,
	hasAudio: true,
	hasVideo: true,
	isLooping: false,
	language: 'en',
	metaStatus: 'Complete',
	status: 'Complete',
	program: null,
	programId: '0',
	publishedTimestamp: '',
	streamingUrl: '',
	updatedTimestamp: '',
	videoPage: false,
	videoRecirc: false
};

const stubbedPoster = SimpleImage.fromJSON({
	id: 'igfq6s2z5hywc5yp3xrg',
	format: 'jpg'
});
const stubbedProgram = {
	id: '9',
	title: 'Gizmodo',
	network: 'gizmodo'
};
const videoListColumns = ['Thumbnail', 'Video title', 'Status', 'Uploaded', 'Length', 'Appears in', 'Actions'].map(name => ({ name }));
const videoPlaylistListColumns = ['Playlist name', 'Length', 'Last Updated', 'Oldest Video', 'Actions'].map(name => ({ name }));
const videoPlaylsitDetailColumns = ['#', 'Thumbnail', 'Displayed title', 'Uploaded', 'Length', 'Actions'].map(name => ({ name }));

storiesOf('4. Components|VideoAdmin', module)
	.addDecorator(withDocs(README))
	.addDecorator(getStory => (
		<div className="column">
			{getStory()}
		</div>
	))
	.add('Video Search', () =>
		<VideoAdminSearch
			onSearch={action('Execute search to Video Meta API')}
			getPrograms={() => Promise.resolve([stubbedProgram])}
			searchValue=''
			searchProgram='gizmodo'
		/>
	)
	.add('Video List', () =>
		<VideoList columns={videoListColumns} striped>
			<VideoListItem
				videoId=''
				progress={0}
				network={text('Network', 'a.v. club')}
				title={text('Video Title', 'Tell us about your pop culture weekend')}
				publishedTime='2019-10-14T16:35:13-04:00'
				posts={[stubbedPost]}
				poster={stubbedPoster}
				duration={number('Video Length', 60)}
				isUploaded={boolean('isUploaded', true)}
				isMetaSaved={boolean('isMetaSaved', true)}
				isTranscoded={boolean('isTranscoded', false)}
				errorMessage={text('Error Message', '')}
				onEditClick={action('Display edit modal')}
				onCustomPosterClick={action('Display custom poster modal')}
				onCopyURLClick={action('Copy video URL to clipboard')}
				enableCaptionUpload={false}
				getPrograms={() => Promise.resolve([])}
				getVideoInfo={() => Promise.resolve(stubbedVideoMeta)}
				uploadImage={() => Promise.resolve({})}
				onVideoUpdateSubmit={action('Update video meta')}
				onCustomPosterChange={action('Update custom poster')}
			/>
			<VideoListItem
				videoId=''
				progress={0}
				network='gizmodo'
				title='Reasonable Discussion'
				publishedTime='2019-10-14T16:35:13-04:00'
				posts={[stubbedPost]}
				poster={stubbedPoster}
				duration={120}
				isUploaded={true}
				isMetaSaved={true}
				isTranscoded={true}
				onEditClick={action('Display edit modal')}
				onCustomPosterClick={action('Display custom poster modal')}
				onCopyURLClick={action('Copy video URL to clipboard')}
				enableCaptionUpload={false}
				getPrograms={() => Promise.resolve([])}
				getVideoInfo={() => Promise.resolve(stubbedVideoMeta)}
				uploadImage={() => Promise.resolve({})}
				onVideoUpdateSubmit={action('Update video meta')}
				onCustomPosterChange={action('Update custom poster')}
			/>
		</VideoList>
	)
	.add('Video Pagination', () =>
		<VideoAdminPagination
			currentPage={1}
			onPrevClick={(action('Previous page click'))}
			onNextClick={(action('Next page click'))}
		/>
	)
	.add('VideoPlaylist List', () => (
		<VideoList columns={videoPlaylistListColumns} striped>
			<VideoPlaylist
				id={number('Playlist ID', 1)}
				playlistName={text('Playlist', 'Evergreen videos')}
				length={number('Playlist length', 3750000)}
				videoCount={number('Amount of videos', 8)}
				lastUpdated={text('Last updated', '2019-11-20T11:08:34.951-05:00')}
				oldestVideo={number('Oldest video', 1572526680195)}
				onEditClick={action('Open playlist detail')}
			/>
			<VideoPlaylist
				id={number('Playlist ID', 2)}
				playlistName={text('Playlist', 'Non-Evergreen videos')}
				length={number('Playlist length', 4750000)}
				videoCount={number('Amount of videos', 14)}
				lastUpdated={text('Last updated', '2019-11-20T11:08:34.951-05:00')}
				oldestVideo={number('Oldest video', 1572526680195)}
				onEditClick={action('Open playlist detail')}
			/>
		</VideoList>
	))
	.add('VideoPlaylist Detail', () => (
		<VideoList columns={videoPlaylsitDetailColumns} striped>
			<VideoPlaylistItem
				index={number('Item index', 0)}
				count={number('Item count', 2)}
				videoId='1'
				poster={stubbedPoster}
				metaSource='Video'
				title={text('Item text', 'This Video Is Really Good')}
				uploadTime={number('Upload time', 1572543000970)}
				length={number('Upload length', 260000)}
				onRemoveClick={action('Remove button click')}
				onMoveItemClick={action('Move button click')}
				onToggleMetaSourceClick={action('Change meta source')}
			/>
			<VideoPlaylistItem
				index={number('Item index', 1)}
				count={number('Item count', 2)}
				videoId='2'
				poster={stubbedPoster}
				metaSource='Video'
				title={text('Item text', 'This Video Will Blow Your Mind')}
				uploadTime={number('Upload time', 1872543000970)}
				length={number('Upload length', 40000)}
				onRemoveClick={action('Remove button click')}
				onMoveItemClick={action('Move button click')}
				onToggleMetaSourceClick={action('Change meta source')}
			/>
		</VideoList>
	))
	.add('Video Playlist actions', () => (
		<VideoPlaylistDetail
			playlistName={text('Playlist', 'Gizmodo Homepage Carousel')}
			length={number('Playlist length', 3750000)}
			videoCount={number('Amount of videos', 8)}
			lastUpdated={number('Time in millis', 1572543000970)}
			oldestVideo={number('Oldest video', 1572526680195)}
			timezone={text('Timezone', 'America/New_York')}
			onSaveClick={action('Save')}
			onCancelClick={action('Cancel')}
			onAddVideoClick={action('Add Video')}
			onBackClick={action('Back')}
			hasUnsavedChanges={true}
		/>
	));
