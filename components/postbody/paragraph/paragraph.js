// @flow
import * as React from 'react';
import BlockNodeList from '../block-node-list';
import webRenderNode from '../block-node-list/web-render-node';
import type Paragraph from 'postbody/blockNodes/Paragraph';

export type ParagraphProps = {
	node: Paragraph
};

export default function ParagraphComponent(props: ParagraphProps) {
	return <BlockNodeList nodes={[props.node]} renderNode={webRenderNode} />;
}
