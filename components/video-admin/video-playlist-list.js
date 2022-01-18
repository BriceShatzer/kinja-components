// @flow
import * as React from 'react';

import VideoPlaylist from './video-playlist';
import VideoList from './video-list';

import type { VideoPlaylistJSON as VideoPlaylistType } from 'kinja-magma/models/VideoPlaylist';

type Props = {
	playlists: Array<VideoPlaylistType>
}

const videoPlaylistListColumns = [
	{ name: 'Playlist name', primary: true },
	{ name: 'Length' },
	{ name: 'Last Updated' },
	{ name: 'Oldest Video' },
	{ name: 'Actions' }
];


class VideoPlaylistList extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const { playlists } = this.props;

		return (
			<VideoList columns={videoPlaylistListColumns}>
				{playlists.map(item =>
					<VideoPlaylist key={item.id}
						id={item.id}
						playlistName={item.name}
						length={item.length}
						videoCount={item.items.length}
						lastUpdated={item.lastUpdated.replace(/\[.*/, '')}
						oldestVideo={item.oldestVideo ? item.oldestVideo.replace(/\[.*/, '') : ''}
					/>
				)}
			</VideoList>
		);
	}
}

export default VideoPlaylistList;
