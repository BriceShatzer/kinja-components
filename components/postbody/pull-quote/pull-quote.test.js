import * as React from 'react';
import PullQuote from './pull-quote';
import { mount } from 'enzyme';
import { TextNode } from 'postbody/InlineNode';

const sampleText = [new TextNode('This is a memorable quote from the article.')];

describe('<PullQuote />', () => {
	it('should render by default', () => {
		const result = mount(<PullQuote alignment="Center" value={sampleText} />);
		expect(result.getDOMNode()).toMatchSnapshot();
	});
	it('should render with left alignment', () => {
		const result = mount(<PullQuote alignment="Left" value={sampleText} />);
		expect(result.getDOMNode()).toMatchSnapshot();
	});
	it('should render in the editor', () => {
		const result = mount(<PullQuote alignment="Center" value={sampleText} editable />);
		expect(result.getDOMNode()).toMatchSnapshot();
	});
	it('should render with branding disabled', () => {
		const result = mount(<PullQuote alignment="Center" value={sampleText} editable disableBranding />);
		expect(result.getDOMNode()).toMatchSnapshot();
	});
});