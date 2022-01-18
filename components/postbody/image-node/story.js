// @flow

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import ImageNodeComponent from './image-node';
import ImageNode from 'postbody/blockNodes/ImageNode';
import { TextNode } from 'postbody/InlineNode';
import README from './README.md';

require('./story.sass');

const imageNodeProps = {
	id: 'szpkuzpbcf1ohvnn0f7d',
	format: 'jpg',
	width: 2560,
	height: 1600,
	alignment: 'Center',
	caption: [new TextNode('Kinja', ['Underline', 'Italic'])],
	altText: ''
};

const testContent = `Gingerbread sugar plum brownie apple pie jelly jujubes marzipan cookie
chocolate cake. Jelly beans cookie wafer dessert tiramisu carrot cake. Halvah sesame snaps cookie
tiramisu macaroon marshmallow. Macaroon chocolate cake sweet. Macaroon gummi bears chocolate bar.
Jujubes cotton candy marshmallow marshmallow macaroon sweet cupcake bonbon icing. Pudding beans.`;

const KinjaPostWrapper = ({ children }: { children: React.ChildrenArray<*> }) => (
	<div className='permalink pe_newlayout'>
		<div className='page'>
			<div style={{ width: '800px' }}>
				<div className='post-content'>
					{children}
				</div>
			</div>
		</div>
	</div>
);

storiesOf('3. Elements|Post Body/Permalink Image Node', module)
	.addDecorator(withDocs(README))
	.add('Permalink Image Node', () => {
		return (
			<KinjaPostWrapper>
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(imageNodeProps)} />
			</KinjaPostWrapper>
		);
	})
	.add('Permalink Image Node - lazyload', () => {
		return (
			<KinjaPostWrapper>
				<p>{testContent}</p>
				<ImageNodeComponent lazyload editable {...new ImageNode(imageNodeProps)} />
			</KinjaPostWrapper>
		);
	})
	.add('Permalink Image Node - alignments', () => {
		const imageSmall = Object.assign({}, imageNodeProps, {
			id: 'kxyulp7kfpcnfd6pztxp',
			width: 458,
			height: 547
		});
		const imageLargePortrait = Object.assign({}, imageNodeProps, {
			id: 'sd5rbwi26g5e3zov8nri',
			width: 866,
			height: 1390
		});
		return (
			<KinjaPostWrapper>
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageSmall, {
					caption: [new TextNode('Center by default 458x547')]
				}))} />
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageSmall, {
					alignment: 'Left',
					caption: [new TextNode('Left aligned 458x547')]
				}))} />
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageSmall, {
					alignment: 'Right',
					caption: [new TextNode('Right aligned 458x547')]
				}))} />
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageNodeProps, {
					caption: [new TextNode('Center aligned 2560x1600')]
				}))} />
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageNodeProps, {
					alignment: 'Bleed',
					caption: [new TextNode('Bleed aligned 2560x1600')]
				}))} />
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageNodeProps, {
					alignment: 'Left',
					caption: [new TextNode('Left aligned 2560x1600')]
				}))} />
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageNodeProps, {
					alignment: 'Right',
					caption: [new TextNode('Bleed aligned 2560x1600')]
				}))} />
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageLargePortrait, {
					alignment: 'Left',
					caption: [new TextNode('Left aligned large portrait 866x1390')]
				}))} />
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageLargePortrait, {
					alignment: 'Right',
					caption: [new TextNode('Right aligned large portrait 866x1390')]
				}))} />
				<p>{testContent}</p>
			</KinjaPostWrapper>
		);
	})
	.add('Permalink Image Node - animated', () => {
		return (
			<KinjaPostWrapper>
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageNodeProps, {
					id: 'kc6ayfndpgkojgjlnxoa',
					width: 400,
					height: 225,
					format: 'gif'
				}))} />
			</KinjaPostWrapper>
		);
	})
	.add('Permalink Image Node - attribution', () => {
		return (
			<KinjaPostWrapper>
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageNodeProps, {
					attribution: [
						{
							label: 'Photo',
							credit: [new TextNode('John Doe')],
							source: []
						}
					]
				}))} />
				<p>{testContent}</p>
				<ImageNodeComponent {...new ImageNode(Object.assign({}, imageNodeProps, {
					caption: [],
					attribution: [
						{
							label: 'Photo',
							credit: [new TextNode('John Doe')],
							source: []
						}
					]
				}))} />
			</KinjaPostWrapper>
		);
	});
