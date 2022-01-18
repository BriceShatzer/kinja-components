// @flow
import * as React from 'react';
import styled from 'styled-components';

type PodcastPlayerProps = {
	podcastId: string
};

type PlayerIFrameProps = {
	src: string
};

const PlayerIFrame = styled.iframe`
	height: 200px;
	margin: auto;
	margin-top: 20px;
	max-width: 1336px;
	padding: 0 18px;
	position: relative;
	width: 100%;
`;

const PodcastPlayer = ({ podcastId }: PodcastPlayerProps) => {
	const playerProps: PlayerIFrameProps = {
		src: `https://playlist.megaphone.fm?p=${podcastId}&episodes=1`
	};
	return (
		podcastId && (
			<PlayerIFrame
				frameBorder="0"
				scrolling="no"
				{...playerProps}
			/>
		)
	);
};

export default PodcastPlayer;
