import BlockNodeList from './block-node-list';
import renderNode from './web-render-node';
import * as React from 'react';
import { mount } from 'enzyme';
import { TextNode } from 'postbody/InlineNode';
import Paragraph from 'postbody/blockNodes/Paragraph';
import { ListContainer, BlockQuoteContainer, CodeContainer } from 'postbody/ContainerNode';
import ContainerBreak from 'postbody/blockNodes/ContainerBreak';

const textNode = new TextNode('Kinja', ['Italic']);

describe('<BlockNodeList />', () => {
	it('should render a single paragraph', () => {
		const nodes = new Paragraph([textNode]);
		const result = mount(<BlockNodeList nodes={[nodes]} renderNode={renderNode} />);
		expect(result.render()).toMatchSnapshot();
	});
	it('should render multiple paragraphs', () => {
		const nodes = [
			new Paragraph([textNode]),
			new Paragraph([textNode]),
			new Paragraph([textNode])
		];
		const result = mount(<div><BlockNodeList nodes={nodes} renderNode={renderNode} /></div>);
		expect(result.render()).toMatchSnapshot();
	});
	describe('Containers', () => {
		it('should render a list', () => {
			const nodes = [
				new Paragraph([textNode], [new ListContainer('Number')]),
				new Paragraph([textNode], [new ListContainer('Number')]),
				new Paragraph([textNode], [new ListContainer('Number')])
			];
			const result = mount(<BlockNodeList nodes={nodes} renderNode={renderNode} />);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render a bullet list', () => {
			const nodes = [
				new Paragraph([textNode], [new ListContainer('Bullet')]),
				new Paragraph([textNode], [new ListContainer('Bullet')])
			];
			const result = mount(<BlockNodeList nodes={nodes} renderNode={renderNode} />);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render a commerce list', () => {
			const nodes = [
				new Paragraph([textNode], [new ListContainer('Commerce')]),
				new Paragraph([textNode], [new ListContainer('Commerce')])
			];
			const result = mount(<BlockNodeList nodes={nodes} renderNode={renderNode} />);
			expect(result.render()).toMatchSnapshot();
		});
		it('should not merge different types of lists', () => {
			const nodes = [
				new Paragraph([textNode], [new ListContainer('Number')]),
				new Paragraph([textNode], [new ListContainer('Bullet')])
			];
			const result = mount(<div><BlockNodeList nodes={nodes} renderNode={renderNode} /></div>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should not merge Bullet and Commerce lists', () => {
			const nodes = [
				new Paragraph([textNode], [new ListContainer('Bullet')]),
				new Paragraph([textNode], [new ListContainer('Commerce')])
			];
			const result = mount(<div><BlockNodeList nodes={nodes} renderNode={renderNode} /></div>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should break the list before and after', () => {
			const nodes = [
				new Paragraph([textNode]),
				new Paragraph([textNode], [new ListContainer('Bullet')]),
				new Paragraph([textNode], [new ListContainer('Bullet')]),
				new Paragraph([textNode])
			];
			const result = mount(<div><BlockNodeList nodes={nodes} renderNode={renderNode} /></div>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render a BlockQuoteContainer', () => {
			const nodes = [
				new Paragraph([textNode], [new BlockQuoteContainer()]),
				new Paragraph([textNode]),
				new Paragraph([textNode], [new BlockQuoteContainer()]),
				new Paragraph([textNode], [new BlockQuoteContainer()]),
				new ContainerBreak(),
				new Paragraph([textNode], [new BlockQuoteContainer()]),
				new Paragraph([textNode]),
				new Paragraph([textNode]),
				new Paragraph([textNode], [new BlockQuoteContainer()])
			];
			const result = mount(<div><BlockNodeList nodes={nodes} renderNode={renderNode} /></div>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render a CodeContainer', () => {
			const nodes = [
				new Paragraph([textNode]),
				new Paragraph([textNode, textNode], [new CodeContainer()]),
				new Paragraph([textNode])
			];
			const result = mount(<div><BlockNodeList nodes={nodes} renderNode={renderNode} /></div>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should not merge different types of containers', () => {
			const nodes = [
				new Paragraph([textNode]),
				new Paragraph([textNode], [new BlockQuoteContainer()]),
				new Paragraph([textNode], [new CodeContainer()]),
				new Paragraph([textNode])
			];
			const result = mount(<div><BlockNodeList nodes={nodes} renderNode={renderNode} /></div>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render a list inside a blockquote', () => {
			const nodes = [
				new Paragraph([textNode], [new BlockQuoteContainer(), new ListContainer('Number')]),
				new Paragraph([textNode], [new BlockQuoteContainer(), new ListContainer('Number')])
			];
			const result = mount(<div><BlockNodeList nodes={nodes} renderNode={renderNode} /></div>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render list and trailing paragraph inside blockquote', () => {
			const nodes = [
				new Paragraph([textNode], [new BlockQuoteContainer(), new ListContainer('Number')]),
				new Paragraph([textNode], [new BlockQuoteContainer(), new ListContainer('Number')]),
				new Paragraph([textNode], [new BlockQuoteContainer()])
			];
			const result = mount(<div><BlockNodeList nodes={nodes} renderNode={renderNode} /></div>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render pre containing list with inner blockquotes', () => {
			const nodes = [
				new Paragraph([textNode], [new CodeContainer(), new ListContainer('Number'), new BlockQuoteContainer()]),
				new Paragraph([textNode], [new CodeContainer(), new ListContainer('Number'), new BlockQuoteContainer()])
			];
			const result = mount(<div><BlockNodeList nodes={nodes} renderNode={renderNode} /></div>);
			expect(result.render()).toMatchSnapshot();
		});
	});
});
