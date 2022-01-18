/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import SimpleImage from 'kinja-magma/models/SimpleImage';
import { LazyResponsiveImage, MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH } from '../elements/image';
import placeholderImage from 'kinja-images/placeholderImage';
import DragAndDrop from '../hoc/drag-and-drop';
import Button from '../button19';
import ArrowBottomIcon from '../icon19/ArrowBottom';
import ArrowTopIcon from '../icon19/ArrowTop';
import CloseIcon from '../icon19/Close';
import MoveVerticalIcon from '../icon19/MoveVertical';
import { getTimestamp, getDuration } from './utils';

import { ListRow, ListColumn } from './video-list';
import { CutoffText } from './video-list-item';

import type { PlaylistItemMetaSource } from 'kinja-magma/models/VideoPlaylist';

type Props = {
	index: number,
	count: number,
	videoId: string,
	poster?: SimpleImage,
	title: string,
	postTitle?: string,
	uploadTime: string,
	length: number,
	metaSource: PlaylistItemMetaSource,
	dragEvents?: any,
	onRemoveClick: (videoId: string) => void,
	onMoveItemClick: (index: number, direction: 'up' | 'down') => void,
	onToggleMetaSourceClick: (videoId: string) => void
};

const ImageColumn = styled(ListColumn)`
	img {
		max-width: 120px;
	}
`;

const SecondaryActions = styled.div`
	display: flex;
`;

const MetaSourceButtom = styled(Button)`
	margin-left: 10px;
`;

const MoveButton = styled(Button)`
	cursor: ns-resize;

	&:active {
		cursor: grabbing;
	}
`;

export const VideoPlaylistItem = (props: Props) => {
	const {
		index,
		count,
		videoId,
		poster,
		title,
		postTitle,
		uploadTime,
		length,
		metaSource,
		onRemoveClick,
		onMoveItemClick,
		onToggleMetaSourceClick,
		dragEvents
	} = props;

	const renderMetaSourceButton = () => (
		<MetaSourceButtom
			variant="secondary"
			label={metaSource === 'Video' ? 'Use post title' : 'Use video title'}
			onClick={() => onToggleMetaSourceClick(videoId)}
			isSmall
		/>
	);

	const upButton = () => (
		<Button
			disabled={index === 0}
			icon={<ArrowTopIcon />}
			variant="tertiary"
			onClick={() => onMoveItemClick(index, 'up')}
			isSmall
		/>
	);

	const downButton = () => (
		<Button
			disabled={index === count}
			icon={<ArrowBottomIcon />}
			variant="tertiary"
			onClick={() => onMoveItemClick(index, 'down')}
			isSmall
		/>
	);

	return (<ListRow {...dragEvents} data-index={index}>
		<ListColumn>{index + 1}</ListColumn>
		<ImageColumn>
			{poster ? <LazyResponsiveImage
				alt={title}
				ariaLabel={title}
				format={poster.format}
				id={poster.id}
				width={MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH}
				transform="KinjaCenteredLargeAuto"
				croppedImage
				noLazy
				relative
			/> : <img src={placeholderImage()} />}</ImageColumn>
		<ListColumn>
			<CutoffText dangerouslySetInnerHTML={{ __html: metaSource === 'Video' ? title : postTitle }} />
			{postTitle && renderMetaSourceButton()}
		</ListColumn>
		<ListColumn>{getTimestamp(uploadTime)}</ListColumn>
		<ListColumn>{getDuration(length)}</ListColumn>
		<ListColumn>
			<Button
				icon={<CloseIcon />}
				label="Remove"
				labelPosition="after"
				variant="secondary"
				onClick={() => onRemoveClick(videoId)}
				isSmall
			/>
			<SecondaryActions>
				{upButton()}
				{downButton()}
				<MoveButton
					icon={<MoveVerticalIcon />}
					variant="tertiary"
					isSmall
				/>
			</SecondaryActions>
		</ListColumn>
	</ListRow>);
};

export default DragAndDrop(VideoPlaylistItem);