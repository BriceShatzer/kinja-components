import * as React from 'react';
import FullBleedWidget from './fullBleedWidget';
import FullBleedWidgetInEditor from './full-bleed-widget-in-editor';
import { Theme } from '../../theme';
import { mount } from 'enzyme';
import { TextNode } from 'postbody/InlineNode';
import ImageNode from 'postbody/blockNodes/ImageNode';

const sampleImage = new ImageNode({ id: '4815162342', format: 'jpg' });
const sampleImage2 = new ImageNode({ id: '1738', format: 'png' });
const sampleText = [new TextNode('This is Patrick.')];
const sampleAttribution = {
	label: 'Illustration',
	credit: [new TextNode('credit')],
	source: [new TextNode('source')]
};

describe('<FullBleedWidget />', () => {
	describe('InlineNode props', () => {
		it('should render anchor tag', () => {
			const result = mount(<FullBleedWidget image={sampleImage} anchorTag='anchor' />);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
		it('should render caption', () => {
			const result = mount(
				<Theme>
					<FullBleedWidget image={sampleImage} caption={sampleText} />
				</Theme>
			);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
		it('should render attribution', () => {
			const result = mount(
				<Theme>
					<FullBleedWidget image={sampleImage} attribution={[sampleAttribution]} />
				</Theme>
			);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
	});

	describe('Image props', () => {
		it('should render image', () => {
			const result = mount(<FullBleedWidget image={sampleImage} />);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
		it('should render overlay', () => {
			const result = mount(
				<Theme>
					<FullBleedWidget image={sampleImage} overlay={sampleImage2} />
				</Theme>
			);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
	});

	describe('Editor', () =>{
		it('should render in the editor', () => {
			const result = mount(<FullBleedWidgetInEditor image={sampleImage} />);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
	});
});
