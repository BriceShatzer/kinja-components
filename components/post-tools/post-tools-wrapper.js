// @flow

import * as React from 'react';

import { PostTools } from './post-tools';

import type { PostToolsWrapperProps } from './';

export class PostToolsWrapper extends React.Component<PostToolsWrapperProps> {
	render() {
		const {
			id,
			authorIds,
			sharedToBlogId,
			status,
			permalink,
			wordCount,
			isFeatured,
			isVideo,
			isEmbiggened,
			parentId,
			parentAuthorId,
			defaultBlogId
		} = this.props.post;

		const postToolsData = {
			type: this.props.type,
			postId: id,
			authorIds,
			sharedToBlogId,
			status,
			postPermalink: permalink,
			wordCount,
			isFeatured,
			isVideo,
			isEmbiggened,
			parentId,
			parentAuthorId,
			defaultBlogId,
			index: this.props.index,
			pageType: this.props.pageType,
			isDismissed: false,
			isBlocked: false
		};

		return (
			/*
				Outer wrapper that maps Blog to component props, and renders PostTools
				in a container that stores data used for hydration
			*/
			<div
				className="post-tools-wrapper"
				data-state={JSON.stringify(postToolsData)}
				data-post-id={postToolsData.postId}
				data-post-permalink={postToolsData.postPermalink}
			>
				<PostTools
					{...postToolsData}
				/>
			</div>
		);
	}
}
