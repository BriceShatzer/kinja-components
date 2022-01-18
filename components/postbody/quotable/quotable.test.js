import * as React from 'react';
import Quotable from './quotable';
import { mount } from 'enzyme';
import { TextNode } from 'postbody/InlineNode';

const sampleImage = { id: '4815162342', format: 'jpg' };
const sampleText = [new TextNode('This is Patrick.')];

describe('<Quotable />', () => {
	describe('InlineNode props', () => {
		it('should render header', () => {
			const result = mount(<Quotable header={sampleText} content={[]} attribution={[]} />);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
		it('should render content', () => {
			const result = mount(<Quotable content={sampleText} header={[]} attribution={[]} />);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
		it('should render attribution', () => {
			const result = mount(<Quotable attribution={sampleText} content={[]} header={[]} />);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
	});

	describe('Image props', () => {
		it('should render image', () => {
			const result = mount(<Quotable image={sampleImage} header={[]} content={[]} attribution={[]} />);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
	});

	describe('In editor', () => {
		it('should render placeholders', () => {
			const result = mount(<Quotable header={[]} content={[]} attribution={[]} editable />);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
		it('should render with values', () => {
			const result = mount(<Quotable image={sampleImage} header={sampleText} content={sampleText} attribution={sampleText} editable />);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
		it('should render thumbnail props', () => {
			const result = mount(<Quotable thumbnail={sampleImage} header={sampleText} content={sampleText} attribution={sampleText} editable />);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
	});
});
