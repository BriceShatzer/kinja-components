/* @flow */

import * as React from 'react';
import _unescape from 'lodash/unescape';

import { EnsureDefaultTheme } from '../../../theme';
import styled, { css } from 'styled-components';
import type { FauxPost } from './../types';
import Post from 'kinja-magma/models/Post';
import { getPostBlogGroupFromPost } from 'kinja-components/utils/post';
import DragAndDrop from '../../../hoc/drag-and-drop';
import BlogAvatar from 'kinja-components/components/blog-avatar';
// $FlowFixMe
import Image from 'kinja-components/components/card/image';
// $FlowFixMe
import Headline from 'kinja-components/components/card/headline';

import ToolBarItem from '../../../toolbar-item';
import { FloatingToolbar } from '../../../toolbar-floating';

// ICONS
import TrashcanIcon from '../../../icon19/Trashcan';
import WriteIcon from '../../../icon19/Write';

type Props = {
	post: Post | FauxPost,
	removeItem?: (value: string) => void,
	editItem?: (value: string) => void,
	className?: string,
	imageSize?: string,
	withControls?: boolean,
	view?: string,
	dragEvents?: any,
	setCardSwapState?: (draggedItemIndex: number, droppedItemIndex: number) => void
}

const StyledFloatingToolbar = styled(FloatingToolbar)`
	position: absolute;
	top: 2%;
	left: 2%;
	visibility: hidden;
	padding: 4px 0;
	z-index: 1000;
`;


export const StoryItem = styled.div`
	flex: 0 1 31.5%;
	text-align: left;
	position: relative;
	width: 100%;

	&:hover {
		${StyledFloatingToolbar} {
			visibility: visible;
		}
	}
`;

const ItemButton = styled(ToolBarItem)`
	padding: 5px;

	svg {
		color: ${({ theme }) => theme.color.black};
	}
`;

const PlaceholderWrapper = styled.div`
	margin-bottom: 1.125rem;
`;

const PlaceholderImage = styled.div`
	display: block;
	height: 112.5px;
	background-repeat: repeat;
	cursor: pointer;
	${'background-image: url(data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJElEQVQYV2M8c+bMfxMTE0YGJADmoEvAVSBLoGiDSaAIwowCABA7E2lSU+vhAAAAAElFTkSuQmCC);'}
	${props => props.isInvalid && css`
		&& {
			border: 1px solid ${props => props.theme.color.error};
		}
	`}
`;

const CustomErrorWrapper = styled.div`
	color: ${props => props.theme.color.error};
	font-size: 0.9rem;
	line-height: 1.1rem;
	margin-top: 10px;
`;

const BlogAvatarWrapper = styled.div`
	position: absolute;
	bottom: 0;
`;

const ImageAvatarWrapper = styled.div`
	position: relative;
`;

const RelatedStoryItem = (props: Props) => {

	const {
		post
	} = props;

	const { permalink, customSharingMainImage, sharingMainImage } = post;
	// $FlowFixMe
	const { isInvalid, errorMessage } = post;
	const postBlogGroup = post.postBlogGroup ? String(post.postBlogGroup) : String(getPostBlogGroupFromPost(post));
	const imageSource = customSharingMainImage ? customSharingMainImage : sharingMainImage;
	let avatarBranding = true;

	if (!imageSource && postBlogGroup && postBlogGroup !== 'kinja') {
		avatarBranding = false;
	}

	const headlineProps = {
		withPermalink: true,
		value: post instanceof Post ? post.formattedHeadline : _unescape(post.headline),
		permalink,
		securePermalink: permalink
	};

	const imgProps = {
		id: imageSource && imageSource.id,
		relative: true,
		noAnimate: true,
		href: permalink
	};

	const removeItem = (key?: string) => {
		if (key && props.removeItem) {
			props.removeItem(key);
		}
	};

	const editItem = (key?: string) => {
		if (key && props.editItem) {
			props.editItem(key);
		}
	};

	const RemoveButton = <ItemButton
		key={`${post.id}-remove`}
		onClick={() => { removeItem(post.id); }}
		title={'Remove Story'}
		icon={<TrashcanIcon />}
		disabled={false}
		active={true} />;

	const EditButton = <ItemButton
		key={`${post.id}-edit`}
		onClick={() => { editItem(post.id); }}
		title={'Edit Story'}
		icon={<WriteIcon />}
		disabled={false}
		active={true} />;

	const Toolbar = () => {
		if (!props.withControls || post.isFaux) {
			return null;
		}
		const buttons = props.view && props.view === 'search' ? RemoveButton : [RemoveButton, EditButton];
		return <StyledFloatingToolbar display={'inline-block'}>
			{ buttons }
		</StyledFloatingToolbar>;
	};

	const CustomError = () => {
		if (!isInvalid) {
			return null;
		}
		return <CustomErrorWrapper>{ errorMessage }</CustomErrorWrapper>;
	};

	// when in edit mode, open links in new tab
	const openInNewTab = props.withControls;

	return (
		<EnsureDefaultTheme>
			<StoryItem className={props.className} {...props.dragEvents} data-index={post.id}>
				{imageSource && imageSource.id
					? <>
						<ImageAvatarWrapper>
							<Image
								{...imgProps}
								openInNewTab={openInNewTab}
								croppedImage={true}
							/>
							{avatarBranding && <BlogAvatarWrapper>
								<BlogAvatar name={postBlogGroup} size={25} />
							</BlogAvatarWrapper>}
						</ImageAvatarWrapper>
						<Headline
							{...headlineProps}
							tag={ 'h6' }
							openInNewTab={openInNewTab}
						/>
						{ Toolbar() }
					</>
					: <PlaceholderWrapper>
						<PlaceholderImage isInvalid={ isInvalid } />
						{ CustomError() }
					</PlaceholderWrapper>
				}
			</StoryItem>
		</EnsureDefaultTheme>
	);
};

RelatedStoryItem.defaultProps = {
	imageSize: 'KinjaCenteredLargeAuto'
};

export default DragAndDrop(RelatedStoryItem);
