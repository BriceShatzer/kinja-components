// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../theme';

import VideoPlaylistList from './video-playlist-list';
import VideoAdminTopBar from './video-admin-top-bar';

import type { VideoPlaylistJSON as VideoPlaylist } from 'kinja-magma/models/VideoPlaylist';

type Props = {
	playlists: Array<VideoPlaylist>
};

const VideoMainWrapper = styled.div`
	width: 100%;
`;
const Container = styled.div`
	width: 100%;
	padding: 20px 16px 40px;
`;

export default class VideoPlaylistListPage extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const { playlists } = this.props;

		return (<EnsureDefaultTheme>
			<VideoMainWrapper>
				<Container>
					<VideoAdminTopBar videos={false} />
				</Container>
				<VideoPlaylistList playlists={playlists} />
			</VideoMainWrapper>
		</EnsureDefaultTheme>);
	}
}
