// @flow

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	boolean,
	text
} from 'base-storybook';
import InlineNode from './inline-node';
import { TextNode, LinkNode } from 'postbody/InlineNode';
import README from './README.md';

storiesOf('3. Elements|Post Body/Inline Node', module)
	.addDecorator(withDocs(README))
	.add('InlineNode - TextNode', () => {
		const styles = ['Italic', 'Bold', 'Struck', 'Small', 'Code', 'Subscript', 'Superscript', 'Underline'];
		const styleArray = styles.map(s => boolean(s)).reduce((a, v, i) => v ? a.concat(styles[i]) : a, []);
		return <div><InlineNode nodes={[new TextNode('The quick brown fox jumps over the lazy dog', styleArray)]} /></div>;
	})
	.add('InlineNode - LinkNode', () => {
		const styles = ['Italic', 'Bold', 'Struck', 'Small', 'Code', 'Subscript', 'Superscript', 'Underline'];
		const styleArray = styles.map(s => boolean(s)).reduce((a, v, i) => v ? a.concat(styles[i]) : a, []);
		return <div><InlineNode nodes={[
			new LinkNode([
				new TextNode('The quick brown fox jumps over the lazy dog', styleArray)
			], text('Reference', 'https://gizmodo.com'), text('Target'))
		]} /></div>;
	});
