/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import DateTime from '../../utils/DateTime';
import Button from '../button19';
import ArrowLeftIcon from '../icon19/ArrowLeft';
import CheckmarkIcon from '../icon19/Checkmark';
import CloseIcon from '../icon19/Close';
import PlusIcon from '../icon19/Plus';
import { getDuration } from './utils';

type Props = {
	playlistName: string,
	length: number,
	videoCount: number,
	lastUpdated: number,
	oldestVideo: number,
	onSaveClick: () => void,
	onCancelClick: () => void,
	onAddVideoClick: () => void,
	onBackClick: () => void,
	hasUnsavedChanges: boolean
};

const DetailContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;
const LeftItems = styled.div`
	flex-grow: 1;
`;
const LeftItemsActions = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
	margin-bottom: 25px;
`;
const LeftItemsStats = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex: 1 1 auto;
	width: 50%;
`;
const LeftItemStatsColumn = styled.div`
	flex: 0 0 auto;
	&:first-child {
		margin-right: 20px;
	}
`;
const LeftItemStatsCell = styled.div`
	margin-bottom: 20px;
`;
const LeftItemTitle = styled(LeftItemStatsCell)`
	box-sizing: border-box;
	color: #7d7d7d;
`;
const RightItems = styled.div``;
const PlaylistName = styled.h4`
	margin-right: 15px;
`;
const PlaylistLength = styled(LeftItemStatsCell)``;
const PlaylistLastUpdated = styled(LeftItemStatsCell)``;
const PlaylistOldestVideo = styled.div``;
const ItemAction = styled(Button)`
	margin-right: 15px;
`;

export default function VideoPlaylistDetail(props: Props) {
	const {
		playlistName,
		length,
		videoCount,
		lastUpdated,
		oldestVideo,
		onSaveClick,
		onCancelClick,
		onAddVideoClick,
		onBackClick,
		hasUnsavedChanges
	} = props;

	const lastUpdatedToString = (time: number): ?string => {
		const dateTime = new DateTime({timestamp: time, locale: 'en-US'});
		return dateTime.relativeDateTime;
	};

	const oldestVideoToString = (time: number): string => {
		const today = Date.now();
		const diff = parseInt((today - time) / (24 * 3600 * 1000));

		if (diff === 1) {
			return `${diff} day old`;
		}
		return `${diff} days old`;
	};

	return (<DetailContainer>
		<LeftItems>
			<LeftItemsActions>
				<ItemAction label="Back to playlists" labelPosition="after" onClick={onBackClick} icon={<ArrowLeftIcon />} variant="secondary" />
				<PlaylistName>{playlistName}</PlaylistName>
				<ItemAction label="Save" labelPosition="after" onClick={onSaveClick} icon={<CheckmarkIcon />} variant="primary" />
				{hasUnsavedChanges && <ItemAction label="Cancel" labelPosition="after" onClick={onCancelClick} icon={<CloseIcon />} variant="secondary" />}
			</LeftItemsActions>
			<LeftItemsStats>
				<LeftItemStatsColumn>
					<LeftItemTitle>Length</LeftItemTitle>
					<LeftItemTitle>Last updated</LeftItemTitle>
					<LeftItemTitle>Oldest video</LeftItemTitle>
				</LeftItemStatsColumn>
				<LeftItemStatsColumn>
					<PlaylistLength>{getDuration(length)} ({videoCount} videos)</PlaylistLength>
					<PlaylistLastUpdated>{lastUpdatedToString(lastUpdated)}</PlaylistLastUpdated>
					<PlaylistOldestVideo>{oldestVideoToString(oldestVideo)}</PlaylistOldestVideo>
				</LeftItemStatsColumn>
			</LeftItemsStats>
		</LeftItems>
		<RightItems>
			<ItemAction label="Add video" labelPosition="after" onClick={onAddVideoClick} icon={<PlusIcon />} variant="primary" />
		</RightItems>
	</DetailContainer>);
}
