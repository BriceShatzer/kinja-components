// @flow
import * as React from 'react';
import styled from 'styled-components';
import isEqual from 'lodash/isEqual';
import { EnsureDefaultTheme } from '../theme';
import { openUrlWithWindow } from 'kinja-magma/utils/url/url';
import { createNotification } from 'kinja-magma/client/hydration/utils/notificationHelpers';

import { videoSearch, getLastEmbeddingPosts } from 'kinja-magma/api/core';
import { getVideoInfo } from 'kinja-magma/api/video';
import { updatePlaylist } from 'kinja-magma/api/playlist';

import VideoPlaylistDetail from './video-playlist-detail';
import VideoList from './video-list';
import VideoPlaylistItemComponent from './video-playlist-item';
import VideoSearchModal from '../video-search/video-search-modal';

import VideoPlaylist, { VideoPlaylistItem } from 'kinja-magma/models/VideoPlaylist';

type Props = {
	playlist: VideoPlaylist
};

type State = {
	unsavedItems: Array<VideoPlaylistItem>,
	items: Array<VideoPlaylistItem>,
	addVideoModalOpen: boolean,
	hasUnsavedChanges: boolean
};

const videoListColumns = [
	{ name: '#', width: 50 },
	{ name: 'Thumbnail', width: 120 },
	{ name: 'Displayed title' },
	{ name: 'Uploaded', width: 130 },
	{ name: 'Length', width: 100 },
	{ name: 'Actions', width: 200 }
];

const baseRoute = 'https://kinja.com/video';

const PageContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-self: baseline;
	margin: 34px auto;
`;

export const videoPlaylistPageContainerClassname = 'js_video-playlist-page';

export default class VideoPlaylistDetailPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			unsavedItems: props.playlist.items,
			items: props.playlist.items,
			addVideoModalOpen: false,
			hasUnsavedChanges: false
		};
	}

	componentDidUpdate(_: Props, prevState: State) {
		if (!isEqual(prevState.items, this.state.items)) {
			this.setState({
				hasUnsavedChanges: !isEqual(prevState.unsavedItems, this.state.items)
			});
		}
	}

	getTotalVideoLength = (): number => this.state.items.reduce((val, { videoMeta }) => val + (videoMeta && videoMeta.duration ? videoMeta.duration : 0), 0);
	getLastUpdatedVideo = (): number =>
		new Date(Math.max.apply(null, this.state.items.map(item => new Date(item.publishedTimestamp.replace(/\[.*/, '')).getTime()))).getTime();
	getOldestVideo = (): number =>
		new Date(Math.min.apply(null, this.state.items.map(item => new Date(item.publishedTimestamp.replace(/\[.*/, '')).getTime()))).getTime();

	arrangeItems(items: Array<VideoPlaylistItem>, firstIndex: number, secondIndex: number): Array<VideoPlaylistItem> {
		const newItems = items.slice();
		if (firstIndex !== secondIndex) {
			const firstItem = newItems[firstIndex];
			const secondItem = newItems[secondIndex];
			let thirdIndex = -1;
			if (secondIndex > firstIndex) {
				newItems.splice(firstIndex, 1);
				thirdIndex = newItems.indexOf(secondItem) + 1;
				newItems.splice(thirdIndex, 0, firstItem);
			} else if (secondIndex < firstIndex) {
				newItems.splice(firstIndex, 1);
				thirdIndex = newItems.indexOf(secondItem) + 0;
				newItems.splice(thirdIndex, 0, firstItem);
			}
		}

		return newItems;
	}

	handleItemDrop = (draggedItemIndex: number, droppedItemIndex: number) => {
		this.setState(prevState => ({ items: this.arrangeItems(prevState.items, draggedItemIndex, droppedItemIndex) }));
	}

	handlePlaylistSaveButtonClick = () => {
		updatePlaylist(this.props.playlist.id, this.state.items)
			.then(() => {
				this.setState(prevState => ({ unsavedItems: prevState.items }));
				createNotification({
					message: 'Playlist was saved successfully!',
					type: 'success'
				});
			})
			.catch(() => {
				createNotification({
					message: 'An error occurred when saving playlist.',
					type: 'error'
				});
			});
	};

	handlePlaylistCancelButtonClick = () => this.setState(prevState => ({ items: prevState.unsavedItems }));

	handleBackButtonClick = () => {
		openUrlWithWindow(`${baseRoute}/playlist`, '_self');
	}

	handleAddVideoButtonClick = () => this.setState({ addVideoModalOpen: true });
	handleAddVideo = (videoId: ?string) => {
		if (videoId) {
			getVideoInfo(videoId)
				.then(videoMeta => getLastEmbeddingPosts([videoId]).then(posts => ({ ...videoMeta, posts })))
				.then(videoMeta => VideoPlaylistItem.fromJSON({
					metaSource: videoMeta.posts && videoMeta.posts.length ? 'EmbeddingPost' : 'Video',
					videoId,
					length: videoMeta.duration,
					publishedTimestamp: videoMeta.publishedTimestamp,
					videoMeta
				})).then(playlistItem => this.setState(prevState => ({ items: [playlistItem, ...prevState.items] })));
		}
	}

	handleRemoveVideo = (videoId: string): void => this.setState(prevState => ({ items: prevState.items.filter(item => item.videoId !== videoId) }));

	handleVideoMoveClick = (index: number, direction: 'up' | 'down') => {
		const neighborIndex = index + (direction === 'up' ? -1 : 1);
		this.setState(prevState => ({ items: this.arrangeItems(prevState.items, index, neighborIndex) }));
	};

	handleMetaSourceButtonClick = (videoId: string) => this.setState(prevState => ({ items: prevState.items.map(item => item.videoId === videoId ?
		new VideoPlaylistItem({
			...item,
			metaSource: item.metaSource === 'Video' ? 'EmbeddingPost' : 'Video'
		}) : item
	)}));

	renderAddVideoModal = () => (
		<VideoSearchModal
			title="Add a video to playlist"
			videoSearch={videoSearch}
			onVideoSelected={this.handleAddVideo}
			onClose={() => this.setState({ addVideoModalOpen: false })}
		/>
	);

	renderPlaylistItems(): React.Node {
		return this.state.items.map((item, index) => {
			let videoMetaProps;
			if (item.videoMeta) {
				const { poster, title, duration: length, publishedTimestamp, posts } = item.videoMeta;
				videoMetaProps = {
					poster,
					title,
					postTitle: posts && posts.length > 0 ? posts[0].headline : '',
					length,
					uploadTime: publishedTimestamp.replace(/\[.*/, '')
				};
			}
			return <VideoPlaylistItemComponent key={item.videoId}
				index={index}
				count={this.state.items.length - 1}
				videoId={item.videoId}
				metaSource={item.metaSource}
				onMoveItemClick={this.handleVideoMoveClick}
				onToggleMetaSourceClick={this.handleMetaSourceButtonClick}
				onRemoveClick={this.handleRemoveVideo}
				setCardSwapState={this.handleItemDrop}
				isDraggable
				{...videoMetaProps}
			/>;
		});
	}

	render() {
		const totalLength = this.getTotalVideoLength();
		const lastUpdated = this.getLastUpdatedVideo();
		const oldestVideo = this.getOldestVideo();

		return (<EnsureDefaultTheme>
			<PageContainer className={videoPlaylistPageContainerClassname}>
				<VideoPlaylistDetail
					playlistName={this.props.playlist.name}
					videoCount={this.state.items.length}
					length={totalLength}
					lastUpdated={lastUpdated}
					oldestVideo={oldestVideo}
					onAddVideoClick={() => this.setState({ addVideoModalOpen: true })}
					onBackClick={this.handleBackButtonClick}
					onCancelClick={this.handlePlaylistCancelButtonClick}
					onSaveClick={this.handlePlaylistSaveButtonClick}
					hasUnsavedChanges={this.state.hasUnsavedChanges}
				/>
				<VideoList columns={videoListColumns}>
					{this.renderPlaylistItems()}
				</VideoList>
				{this.state.addVideoModalOpen && this.renderAddVideoModal()}
			</PageContainer>
		</EnsureDefaultTheme>);
	}
}
