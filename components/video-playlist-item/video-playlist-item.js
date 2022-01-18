/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import DateTime from '../../utils/DateTime';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import { LazyResponsiveImage, MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH } from '../elements/image';
import placeholderImage from 'kinja-images/placeholderImage';
import Button from '../button19';
import ArrowBottomIcon from '../icon19/ArrowBottom';
import ArrowTopIcon from '../icon19/ArrowTop';
import CloseIcon from '../icon19/Close';
import MoveVerticalIcon from '../icon19/MoveVertical';

import { ListRow, ListColumn } from '../video-admin/video-list';

type Props = {
	index: number,
	count: number,
	poster?: SimpleImage,
	title: string,
	uploadTime: number,
	length: number,
	timezone: string,
	onRemoveClick: () => void,
	onMoveItemClick: () => void
};

const ItemContainer = styled(ListRow)`
	min-height: 60px;
`;
const PlaylistIndex = styled(ListColumn)``;
const PlaylistPoster = styled(ListColumn)`
	height: 68px;
	width: 120px;
	position: relative;
`;
const PlaylistTitle = styled(ListColumn)``;
const PlaylistUploadTime = styled(ListColumn)``;
const PlaylistLength = styled(ListColumn)``;
const ItemActions = styled(ListColumn)`
	button {
		border-radius: 8px;
		&:hover {
			background-color: transparent;
		}
	}
`;
const SecondaryActions = styled(ListColumn)`
	button {
		border-style: none;
		background-color: transparent;
	}
	.disabled {
		display: none;
	}
`;

function VideoPlaylistItem(props: Props) {
	const {
		index,
		count,
		poster,
		title,
		uploadTime,
		length,
		timezone,
		onRemoveClick,
		onMoveItemClick
	} = props;

	const uploadTimeToString = (time: number): ?string => {
		const dateTime = new DateTime({timestamp: time, timezone, locale: 'en-US'});
		return dateTime.relativeDateTime;
	};

	const videoLengthToString = (time: number): string => {
		const minutes = Math.floor(time / 60000);
		const seconds = Number(((time % 60000) / 1000).toFixed(0));
		return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	};

	const upButton = () => {
		if (index === 1) {
			return (<Button
				disabled
				icon={<ArrowTopIcon />}
				size='small'
				weight='tertiary'
				onClick={onMoveItemClick}
			/>);
		} else {
			return (<Button
				icon={<ArrowTopIcon />}
				size='small'
				weight='tertiary'
				onClick={onMoveItemClick}
			/>);
		}
	};

	const downButton = () => {
		if (index === count) {
			return (<Button
				disabled
				icon={<ArrowBottomIcon />}
				size='small'
				weight='tertiary'
				onClick={onMoveItemClick}
			/>);
		} else {
			return (<Button
				icon={<ArrowBottomIcon />}
				size='small'
				weight='tertiary'
				onClick={onMoveItemClick}
			/>);
		}
	};

	return (<ItemContainer>
		<PlaylistIndex>{index}</PlaylistIndex>
		<PlaylistPoster>
			{poster ? <LazyResponsiveImage
				alt={title}
				ariaLabel={title}
				format={poster.format}
				id={poster.id}
				width={MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH}
				transform="KinjaCenteredLargeAuto"
				croppedImage
				noLazy
			/> : <img src={placeholderImage()} />}</PlaylistPoster>
		<PlaylistTitle>{title}</PlaylistTitle>
		<PlaylistUploadTime>{uploadTimeToString(uploadTime)}</PlaylistUploadTime>
		<PlaylistLength>{videoLengthToString(length)}</PlaylistLength>
		<ItemActions>
			<Button
				icon={<CloseIcon />}
				label='Remove'
				size='small'
				weight='tertiary'
				onClick={onRemoveClick}
			/>
			<SecondaryActions>
				{upButton()}
				{downButton()}
				{/* TODO: look at drag and drop stuff */}
				<Button
					icon={<MoveVerticalIcon />}
					size='small'
					weight='tertiary'
					onClick={onMoveItemClick}
				/>
			</SecondaryActions>
		</ItemActions>
	</ItemContainer>);
}

export default VideoPlaylistItem;
