// @flow

import * as React from 'react';
import styled from 'styled-components';

import { defaultTheme } from '../theme';
import VideoPostLink from 'kinja-magma/models/VideoPostLink';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import BlogAvatar from '../blog-avatar';
import Button from '../button19';
import TooltipWrapper from '../tooltip/tooltip-wrapper';
import CheckmarkIcon from '../icon19/Checkmark';
import ClockIcon from '../icon19/Clock';
import IssueIcon from '../icon19/Issue';
import ErrorIcon from '../icon19/Error';
import PencilIcon from '../icon19/Pencil';
import ImageIcon from '../icon19/Image';
import CopyIcon from '../icon19/Copy';
import { LazyResponsiveImage, MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH } from '../elements/image';
import placeholderImage from 'kinja-images/placeholderImage';

import { getTimestamp, getDuration } from './utils';
import { EditModal, CustomPosterModal } from '../video-uploader';
import { ListRow, ListColumn } from './video-list';
import CircularProgressBar from './circular-progress-bar';

import type { Program, VideoMetadataFields } from 'kinja-magma/api/video';
import type { VideoMetaJSON } from 'kinja-magma/models/VideoMeta';
import type { Locale } from 'kinja-magma/models/Locale';
import type { Image } from '../types';

type Props = {
	videoId: string,
	network: string,
	title: string,
	publishedTime?: string,
	duration?: number,
	posts?: Array<VideoPostLink>,
	poster?: SimpleImage,
	locale?: Locale,
	enableCaptionUpload: boolean,
	progress: number,
	isUploaded: boolean,
	isMetaSaved: boolean,
	isTranscoded: boolean,
	errorMessage?: string,
	uploadImage: (string | File) => Promise<*>,
	getPrograms: () => Promise<Array<Program>>,
	getVideoInfo: (videoId: string, bustCache: boolean) => Promise<VideoMetaJSON>,
	onVideoUpdateSubmit: (videoId: string, fields: VideoMetadataFields, captionFile: ?File) => Promise<*>,
	onCustomPosterChange: (videoId: string, image: Image) => Promise<*>,
	onCopyURLClick: (videoId: string) => void
};

export const CutoffText = styled.span`
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;

	> a {
		color: unset;
		transition: color 250ms ease;

		&:hover {
			color: ${defaultTheme.color.gray};
			text-decoration: none;
		}
	}
`;

export const EmphasizedText = styled(CutoffText)`
	color: ${defaultTheme.color.darkgray};
	font-style: italic;
	font-weight: ${props => props.strong ? '400' : '300'};
`;

export const PostList = styled.ul`
	font-size: inherit;
	margin-left: 0;
	margin-bottom: 0;
	overflow: hidden;
`;

export const PostItem = styled.li`
	display: flex;
	align-items: center;
	line-height: 1;
	> span:first-child {
		flex: none;
		margin-right: 0.5rem;
	}

	&:not(:first-child) {
		margin-top: 5px;
	}
`;

export const ActionButton = styled(Button)`
	margin-right: 4px;
	&:last-child {
		margin-right: 0;
	}
`;

export const getLogoName = (network?: string): ?string => {
	switch (network) {
		case 'a.v. club':
			return 'avclub';
		case 'the root':
			return 'theroot';
		case 'the onion':
			return 'theonion';
		case 'the takeout':
			return 'thetakeout';
		case 'deadspin':
		case 'clickhole':
		case 'earther':
		case 'gizmodo':
		case 'jalopnik':
		case 'jezebel':
		case 'kotaku':
		case 'lifehacker':
		case 'splinter':
			return network;
		default:
			return null;
	}
};

export const renderStatusIcon = ({
	isUploaded,
	isMetaSaved,
	isTranscoded,
	errorMessage,
	progress
}: {
	isUploaded: boolean,
	isMetaSaved: boolean,
	isTranscoded: boolean,
	errorMessage?: ?string,
	progress: number
}): React.Element<typeof TooltipWrapper> => {
	let icon = null;
	let message;
	if (errorMessage) {
		message = errorMessage;
		icon = <ErrorIcon description={errorMessage} />;
	} else if (isUploaded) {
		if (isTranscoded) {
			message = 'Your video is ready.';
			icon = <CheckmarkIcon />;
		} else if (isMetaSaved) {
			message = 'This video is being transcoded.\nYou can embed it into posts now.';
			icon = <ClockIcon />;
		} else {
			message = 'Video uploaded but missing required info.\nEdit now to complete upload.';
			icon = <IssueIcon />;
		}
	} else if (isMetaSaved) {
		message = `This video is being uploaded, ${progress}% complete.`;
		icon = <CircularProgressBar progress={progress} />;
	} else {
		message = 'This video is being uploaded.\nAdd missing required info.';
		icon = <CircularProgressBar progress={progress} />;
	}

	return (
		<TooltipWrapper>
			{({toggleTooltip}) => {
				return (
					<div
						data-shouldshowtooltip={true}
						data-tooltipname={message}
						data-tooltipoffset={25}
						onMouseEnter={toggleTooltip}
						onMouseLeave={toggleTooltip}>
						{icon}
					</div>
				);
			}}
		</TooltipWrapper>
	);
};

export const renderTitle = (title?: string) =>
	title ? title : <EmphasizedText strong>This video has no title yet</EmphasizedText>;

export const renderPosts = (posts: Array<VideoPostLink> = [], blogName?: ?string) => {
	if (posts && posts.length > 0) {
		return (
			<PostList>
				{posts.map(post =>
					<PostItem key={post.id}>
						{blogName && <BlogAvatar name={blogName} size={21} />}
						<CutoffText>
							<a href={post.permalink} target="_blank" rel="noopener noreferrer" dangerouslySetInnerHTML={{ __html: post.headline }} />
						</CutoffText>
					</PostItem>
				)}
			</PostList>
		);
	}

	return <EmphasizedText>This video doesn&#39;t appear in any post</EmphasizedText>;
};

export default function VideoListItem(props: Props) {
	const {
		videoId,
		network,
		title,
		publishedTime,
		posts,
		poster,
		duration,
		locale = 'en-US',
		isUploaded,
		isMetaSaved,
		isTranscoded,
		errorMessage,
		progress,
		enableCaptionUpload,
		uploadImage,
		getPrograms,
		getVideoInfo,
		onVideoUpdateSubmit,
		onCustomPosterChange,
		onCopyURLClick
	} = props;
	const [isEditing, setIsEditing] = React.useState(false);
	const [isUploadingPoster, setIsUploadingPoster] = React.useState(false);
	const blogName = getLogoName(network);

	const onCustomPosterUpload = (image: Image): void => {
		onCustomPosterChange(videoId, image)
			.then(() => setIsUploadingPoster(false));
	};

	const renderEditModal = () => (
		<EditModal
			onCancel={() => setIsEditing(false)}
			onSubmit={(id, fields, caption) => onVideoUpdateSubmit(id, fields, caption).then(() => setIsEditing(false))}
			getPrograms={getPrograms}
			onProgramError={() => {}}
			getVideoInfo={() => getVideoInfo(videoId, true)}
			enableCaptionUpload={enableCaptionUpload}
		/>
	);

	const renderCustomPosterModal = () => (
		<CustomPosterModal
			imageUploader={uploadImage}
			onChange={onCustomPosterUpload}
			onCancel={() => setIsUploadingPoster(false)}
		/>
	);

	return (
		<ListRow>
			<ListColumn>
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
				/> : <img src={placeholderImage(blogName)} />}
			</ListColumn>
			<ListColumn><CutoffText>{renderTitle(title)}</CutoffText></ListColumn>
			<ListColumn centered>
				{renderStatusIcon({
					isUploaded,
					isMetaSaved,
					isTranscoded,
					errorMessage,
					progress
				})}
			</ListColumn>
			<ListColumn>{publishedTime && getTimestamp(publishedTime, locale)}</ListColumn>
			<ListColumn centered>{duration && getDuration(duration)}</ListColumn>
			<ListColumn>
				{renderPosts(posts, blogName)}
			</ListColumn>
			<ListColumn>
				<ActionButton
					icon={<PencilIcon />}
					variant="tertiary"
					onClick={() => setIsEditing(true)}
				/>
				<ActionButton
					icon={<ImageIcon />}
					variant="tertiary"
					onClick={() => setIsUploadingPoster(true)}
					isSmall
				/>
				<ActionButton
					icon={<CopyIcon />}
					label="Copy URL"
					labelPosition="after"
					onClick={onCopyURLClick}
					isSmall
				/>
			</ListColumn>
			{isEditing && renderEditModal()}
			{isUploadingPoster && renderCustomPosterModal()}
		</ListRow>
	);
}
