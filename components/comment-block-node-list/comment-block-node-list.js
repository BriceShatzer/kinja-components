// @flow

import * as React from 'react';

import BlockNodeList from '../postbody/block-node-list';
import webRenderNode from '../postbody/block-node-list/web-render-node';
import { KinjaMetaProvider } from '../hoc/context';
import { Theme, matchBlogGroupToTheme } from '../theme';

import type { BlockNode } from 'postbody/BlockNode';
import type { KinjaMeta } from '../hoc/context';

type Props = {
	nodes: Array<BlockNode>,
	kinjaMeta: KinjaMeta
}

const CommentBlockNodeList = (props: Props) => {
	const { kinjaMeta, nodes } = props;

	return (
		<Theme blog={matchBlogGroupToTheme(kinjaMeta.blogGroup)}>
			<KinjaMetaProvider value={kinjaMeta}>
				<BlockNodeList nodes={nodes} renderNode={webRenderNode} />
			</KinjaMetaProvider>
		</Theme>
	);
};

export default CommentBlockNodeList;
