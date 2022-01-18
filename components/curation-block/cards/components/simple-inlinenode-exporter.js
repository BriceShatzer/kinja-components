// @flow
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';
import { TextNode, type InlineNode, type TextStyle } from 'postbody/InlineNode';

function traverseNode(node: Node, openStyles: Array<TextStyle>, result: Array<InlineNode>): Array<InlineNode> {
	let child = node.childNodes[0];

	while (child) {
		const nodeName = child.nodeName.toLowerCase();
		switch (nodeName) {
			case '#text':
				result.push(new TextNode(child.textContent, openStyles));
				break;
			case 'br':
				break;
			case 'em':
			case 'i':
				traverseNode(child, uniq(openStyles.concat('Italic')), result);
				break;
			default:
				traverseNode(child, openStyles, result);
				break;
		}
		child = child.nextSibling;
	}

	return result;
}

export default function exportInlineNodes(node: Node): Array<InlineNode> {
	return traverseNode(node, [], []).reduce<Array<InlineNode>>((acc, node) => {
		const lastNode = acc[acc.length - 1];
		if (node.type === 'Text' && lastNode && lastNode.type === 'Text' && isEqual(node.styles, lastNode.styles)) {
			return [...acc.slice(0, acc.length - 1), new TextNode(lastNode.value + node.value, node.styles)];
		}
		return [...acc, node];
	}, []);
}

export function exportInlineNodesFromHtmlString(htmlString: string): Array<InlineNode> {
	const node = (new DOMParser().parseFromString(htmlString, 'text/html')).querySelector('body');
	if (!node) {
		return [];
	}
	return exportInlineNodes(node);
}

