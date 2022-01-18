/* @flow */

/**
 * Shallow traverse nodes to strip text content
 * from un-whitelisted nodes (elements)
 *
 * @param NodeList node
 * @param Array<string> allowed
 */
export function sanitizeNodes(node: *, allowed: Array<string>) {
	const sanitizedNodes = [];
	node.childNodes.forEach(child => {
		const nodeName = child.nodeName.toLowerCase();
		if (allowed.indexOf(nodeName) === -1 || nodeName === '#text') {
			sanitizedNodes.push(child.textContent);
		} else {
			sanitizedNodes.push(child.outerHTML);
		}
	});
	node.innerHTML = sanitizedNodes.join('');
	return node;
}
