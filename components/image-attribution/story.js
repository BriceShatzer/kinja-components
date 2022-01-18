/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import ImageAttribution from './image-attribution';
import { TextNode, LinkNode } from 'postbody/InlineNode';
import README from './README.md';

storiesOf('4. Components|Image Attribution', module)
	.addDecorator(withDocs(README))
	.add('Image Attribution', () => (
		<div>
			<h3>Single credit</h3>
			<ImageAttribution attributions={[
				{
					label: 'Photo',
					credit: [new TextNode('John Doe')],
					source: []
				}
			]} />

			<h3>Multiple credits, grouped</h3>
			<ImageAttribution attributions={[
				{
					label: 'Photo',
					credit: [new TextNode('John Doe')],
					source: []
				},
				{
					label: 'Photo',
					credit: [new TextNode('Jane Doe')],
					source: []
				},
				{
					label: 'Illustration',
					credit: [new TextNode('Donald Duck')],
					source: []
				}
			]} />

			<h3>All the labels</h3>
			<ImageAttribution attributions={[
				{
					label: 'Graphic',
					credit: [new TextNode('John Doe')],
					source: []
				},
				{
					label: 'Illustration',
					credit: [new TextNode('Jane Doe')],
					source: []
				},
				{
					label: 'Image',
					credit: [new TextNode('John Doe')],
					source: []
				},
				{
					label: 'Photo',
					credit: [new TextNode('Jane Doe')],
					source: []
				},
				{
					label: 'Screenshot',
					credit: [new TextNode('Jane Doe')],
					source: []
				}
			]} />

			<h3>All the labels, translated to Spanish</h3>
			<ImageAttribution language="es-ES" attributions={[
				{
					label: 'Graphic',
					credit: [new TextNode('John Doe')],
					source: []
				},
				{
					label: 'Illustration',
					credit: [new TextNode('Jane Doe')],
					source: []
				},
				{
					label: 'Image',
					credit: [new TextNode('John Doe')],
					source: []
				},
				{
					label: 'Photo',
					credit: [new TextNode('Jane Doe')],
					source: []
				},
				{
					label: 'Screenshot',
					credit: [new TextNode('Jane Doe')],
					source: []
				}
			]} />

			<hr />

			<h3>Single source</h3>
			<ImageAttribution attributions={[
				{
					label: 'Photo',
					credit: [],
					source: [new TextNode('GMG')]
				}
			]} />

			<h3>Multiple sources, grouped</h3>
			<ImageAttribution attributions={[
				{
					label: 'Photo',
					credit: [],
					source: [new TextNode('GMG')]
				},
				{
					label: 'Photo',
					credit: [],
					source: [new TextNode('UNIVISION')]
				},
				{
					label: 'Screenshot',
					credit: [],
					source: [new TextNode('APPLE')]
				}
			]} />

			<hr />

			<h3>Everything...</h3>
			<ImageAttribution attributions={[
				{
					label: 'Graphic',
					credit: [new TextNode('icipicipipicici89')],
					source: [new TextNode('Designer\'s rescue')]
				},
				{
					label: 'Illustration',
					credit: [new TextNode('Jane Doe')],
					source: [new TextNode('deviantart')]
				},
				{
					label: 'Image',
					credit: [new TextNode('John Doe')],
					source: [new TextNode('Getty')]
				},
				{
					label: 'Photo',
					credit: [new TextNode('Jane Doe')],
					source: [new TextNode('Getty')]
				},
				{
					label: 'Screenshot',
					credit: [new TextNode('Jane Doe')],
					source: [new TextNode('HBO')]
				}
			]} />

			<hr />

			<h3>...and more</h3>
			<p><code>credit</code> and <code>source</code> are InlineNodes, so formatting is possible, but not supported by the editor component.</p>
			<ImageAttribution attributions={[
				{
					label: 'Photo',
					credit: [new TextNode('John Doe', ['Italic', 'Bold']), new TextNode('2', ['Superscript'])],
					source: [new LinkNode([new TextNode('Kinja', ['Struck'])], 'www.kinja.com', '_blank')]
				}
			]} />
		</div>
	));
