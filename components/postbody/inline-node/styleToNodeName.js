// @flow

import type { TextStyle } from 'postbody/InlineNode';

export default function styleToNodeName(style: TextStyle): string {
	switch (style) {
		case 'Italic': return 'em';
		case 'Bold': return 'strong';
		case 'Struck': return 'strike';
		case 'Small': return 'small';
		case 'Code': return 'code';
		case 'Subscript': return 'sub';
		case 'Superscript': return 'sup';
		case 'Underline': return 'u';
		default:
			(style: empty);
			throw new Error('Unexpected node style: ' + style);
	}
}
