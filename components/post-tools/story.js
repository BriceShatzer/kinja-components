/* @flow */

import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
	action,
	boolean,
	select,
	number,
	storiesOf,
	withDocs
} from 'base-storybook';

import { PostTools, PostToolsPermalink } from './';
import Modal from '../modal';
import SendToEditorForm from '../send-to-editor';

import README from './README.md';

import post from '../../__stubs__/stubbedPost.json';

const TitlePlaceholder = styled.h3`
	margin-right: 100px;
`;

export function renderSendToEditorsForm() {
	const modalContainer = document.createElement('div');
	window.document.body.appendChild(modalContainer);

	// eslint-disable-next-line react/no-render-return-value
	return ReactDOM.render(
		<Modal fullscreen isOpen>
			<SendToEditorForm
				onSubmit={action('onSubmit')}
				onCancel={() => ReactDOM.unmountComponentAtNode(modalContainer)}
			/>
		</Modal>,
		modalContainer
	);
}

storiesOf('3. Elements|Post Tools', module)
	.addDecorator(withDocs(README))
	.add('Post Tools', () => {
		// const isSuperUser = boolean('Is superuser?', true);
		const type = select('PostTools component type', { stream: 'stream', permalink: 'permalink' }, 'permalink');
		const isEmbiggened = boolean('isEmbiggened?', false);
		const isFeatured = boolean('isFeatured?', false);
		const isVideo = boolean('isVideo?', false);
		const isSharedPost = boolean('isSharedPost?', false);
		const pageType = select('Page type', { frontpage: 'frontpage', permalink: 'permalink' }, 'permalink');
		const saveCount = number('Save count', 10);
		const wordCount = number('Word count', 10);
		const replyCount = number('Reply count', 10);
		const sharedToBlogId = number('Shared to blog ID', 4);

		const postShareUrls = {
			facebookShareUrl: 'todo',
			twitterShareUrl: 'todo',
			emailShareUrl: 'todo'
		};

		const statsData = {
			views: number('Number of views', 10),
			uniqueViews: number('Number of unique views', 1)
		};

		const clickHandlers = {
			editClickHandler: action('edit'),
			setSaveState: action('setSaveState'),
			unshareClickHandler: action('unshare'),
			embiggenClickHandler: action('embiggen'),
			sendToEditorsClickHandler: () => renderSendToEditorsForm(),
			shareClickHandler: action('share'),
			initializeInArticleAdTools: action('moveAdSlots'),
			changeInArticleVideoClickHandler: action('changeInArticleVideo'),
			toggleConversationToolsClickHandler: action('toggleConversationTools'),
			promoteClickHandler: action('promote')
		};

		let DropdownComponent = PostToolsPermalink;
		if (pageType === 'frontpage') {
			DropdownComponent = React.Fragment;
		}

		const dropdownContents = (
			<DropdownComponent
				postId={post.id}
				authorIds={[post.authorId]}
				postPermalink={post.permalink}
				sharedToBlogId={sharedToBlogId}
				isEmbiggened={isEmbiggened}
				isFeatured={isFeatured}
				isVideo={isVideo}
				isSharedPost={isSharedPost}
				{...clickHandlers}
			/>
		);

		return (
			<React.Fragment>
				<TitlePlaceholder>{type} post tools</TitlePlaceholder>
				<PostTools
					{...clickHandlers}
					{...postShareUrls}
					{...statsData}
					type={type}
					dropdownContents={dropdownContents}
					postId={post.id}
					authorIds={[post.authorId]}
					isFeatured={isFeatured}
					isVideo={isVideo}
					wordCount={wordCount}
					isEmbiggened={isEmbiggened}
					sharedToBlogId={sharedToBlogId}
					postPermalink={post.permalink}
					saveCount={saveCount}
					status='PUBLISHED'
					replyCount={replyCount}
					pageType={pageType}
					index={0}
					parentId={post.parentId}
					parentAuthorId={post.parentAuthorId}
					defaultBlogId={post.defaultBlogId}
					isDismissed={false}
					isBlocked={false}
				/>
			</React.Fragment>
		);
	});
