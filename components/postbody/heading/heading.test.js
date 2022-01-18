import * as React from 'react';
import BlockNodeList from '../block-node-list';
import webRenderNode from '../block-node-list/web-render-node';
import Heading from './heading';
import { shallow } from 'enzyme';
import { TextNode } from 'postbody/InlineNode';
import HeaderNode from 'postbody/blockNodes/Header';
import { BlockQuoteContainer } from 'postbody/ContainerNode';

const sampleText = [new TextNode('This is a sample text.')];

describe('<Heading />', () => {
	describe('Levels', () => {
		it('should render h4 by default', () => {
			const result = shallow(<Heading value={sampleText} />);
			expect(result).toMatchSnapshot();
		});
		it('should render h2', () => {
			const result = shallow(<Heading value={sampleText} level={2} />);
			expect(result).toMatchSnapshot();
		});
		it('should render h3', () => {
			const result = shallow(<Heading value={sampleText} level={3} />);
			expect(result).toMatchSnapshot();
		});
		it('should not render h1', () => {
			const result = shallow(<Heading value={sampleText} level={1} />);
			expect(result).toMatchSnapshot();
		});
		it('should render h4 when providing invalid level', () => {
			const result = shallow(<Heading value={sampleText} level={5} />);
			expect(result).toMatchSnapshot();
		});
	});

	describe('Alignment', () => {
		it('should apply center alignment', () => {
			const result = shallow(<Heading value={sampleText} alignment="Center" />);
			expect(result).toMatchSnapshot();
		});
		it('should apply right alignment', () => {
			const result = shallow(<Heading value={sampleText} alignment="Right" />);
			expect(result).toMatchSnapshot();
		});
		it('should not have class when aligned left', () => {
			const result = shallow(<Heading value={sampleText} alignment="Left" />);
			expect(result).toMatchSnapshot();
		});
	});
	it('should apply icon', () => {
		const result = shallow(<Heading value={sampleText} icon="Home" />);
		expect(result).toMatchSnapshot();
	});
	it('should apply both icon and alignment', () => {
		const result = shallow(<Heading value={sampleText} icon="Gaming" level={2} alignment="Center" />);
		expect(result).toMatchSnapshot();
	});
	it('should be wrapped in containers when used with BlockNodeList', () => {
		const node = new HeaderNode({
			value: sampleText,
			level: 3,
			icon: 'Home',
			alignment: 'Right',
			containers: [new BlockQuoteContainer()]
		});
		const result = shallow(<BlockNodeList nodes={[node]} renderNode={webRenderNode} />);
		expect(result).toMatchSnapshot();
	});
});
