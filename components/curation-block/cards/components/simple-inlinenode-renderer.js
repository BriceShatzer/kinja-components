// @flow

import { INLINENODE } from 'postbody/InlineNode';
import type { InlineNode } from 'postbody/InlineNode';

/**
 * Render an array of inline nodes
 * Blocks of simple text get grouped together to resolve styling containers
 * Linebreaks and links break these groups
 */
export default function simpleInlineNodes(nodes: Array<InlineNode>): string {
	return nodes.map(node => {
		switch (node.type) {
			case INLINENODE.LINEBREAK:
				return '';
			case INLINENODE.TEXT: {
				if (node.styles.includes('Italic')) {
					return `<em>${node.value}</em>`;
				}
				return node.value;
			}
			case INLINENODE.LINK: {
				return simpleInlineNodes([...node.value]);
			}
			default: {
				(node.type: empty);
				throw new Error('Unexpected InlineNode type');
			}
		}
	}).join('');
}
