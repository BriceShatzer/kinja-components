/* @flow */

import * as React from 'react';

import Button from '../button19';
import PencilIcon from '../icon19/Pencil';

import { getTimestamp } from './utils';
import { ListRow, ListColumn } from './video-list';
import { CutoffText } from './video-list-item';

type Props = {
	id: string,
	playlistName: string,
	length: number,
	videoCount: number,
	lastUpdated: string,
	oldestVideo: string
};

class VideoPlaylist extends React.Component<Props> {
	playlistLength = (time: number): string => {
		const hours = Math.ceil(time / (1000 * 60 * 60) % 60);
		const minutes = Math.floor(time / (1000 * 60) % 60);

		return `${hours} h ${minutes} m`;
	};

	render() {
		const {
			id,
			playlistName,
			length,
			videoCount,
			lastUpdated,
			oldestVideo
		} = this.props;

		return (<ListRow>
			<ListColumn><CutoffText>{playlistName}</CutoffText></ListColumn>
			<ListColumn>{this.playlistLength(length)} ({videoCount} videos)</ListColumn>
			<ListColumn>{getTimestamp(lastUpdated)}</ListColumn>
			<ListColumn>{getTimestamp(oldestVideo)}</ListColumn>
			<ListColumn>
				<a href={`/video/playlist/${id}`}>
					<Button
						icon={<PencilIcon />}
						label="Edit Playlist"
						labelPosition="after"
						variant="primary"
						isSmall
					/>
				</a>
			</ListColumn>
		</ListRow>
		);
	}
}

export default VideoPlaylist;
