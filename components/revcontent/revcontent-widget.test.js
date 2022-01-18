import * as React from 'react';
import { mount } from 'enzyme';

import RevcontentWidget from './revcontent-widget';

Math.random = () => 1;

describe('<RevcontentWidget />', () => {
	it('should render the Gizmodo widget and match snapshot', () => {
		const widget = mount(<RevcontentWidget blogGroup='gizmodo' />);
		expect(widget).toMatchSnapshot();
	});

	it('should render the AVCLub widget and match snapshot', () => {
		const widget = mount(<RevcontentWidget blogGroup='avclub' />);
		expect(widget).toMatchSnapshot();
	});

	it('should render the Kotaku widget and match snapshot', () => {
		const widget = mount(<RevcontentWidget blogGroup='kotaku' />);
		expect(widget).toMatchSnapshot();
	});

	it('should render the Onion widget and match snapshot', () => {
		const widget = mount(<RevcontentWidget blogGroup='theonion' />);
		expect(widget).toMatchSnapshot();
	});

	it('should render the Lifehacker widget and match snapshot', () => {
		const widget = mount(<RevcontentWidget blogGroup='lifehacker' />);
		expect(widget).toMatchSnapshot();
	});

	it('should render the Takeout widget and match snapshot', () => {
		const widget = mount(<RevcontentWidget blogGroup='thetakeout' />);
		expect(widget).toMatchSnapshot();
	});

	it('should render the Deadspin widget and match snapshot', () => {
		const widget = mount(<RevcontentWidget blogGroup='deadspin' />);
		expect(widget).toMatchSnapshot();
	});

	it('should render the Jezebel widget and match snapshot', () => {
		const widget = mount(<RevcontentWidget blogGroup='jezebel' />);
		expect(widget).toMatchSnapshot();
	});

	it('should render the Root widget and match snapshot', () => {
		const widget = mount(<RevcontentWidget blogGroup='theroot' />);
		expect(widget).toMatchSnapshot();
	});

	it('should render the Jalopnik widget and match snapshot', () => {
		const widget = mount(<RevcontentWidget blogGroup='jalopnik' />);
		expect(widget).toMatchSnapshot();
	});

	it('should NOT render a BS widget and match snapshot', () => {
		const widget = mount(<RevcontentWidget blogGroup='very-intelligent-blog-name' />);
		expect(widget).toMatchSnapshot();
	});

});
