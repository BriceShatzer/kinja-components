import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Link, { Anchor } from './link';

describe('Link element', () => {
	it('should render a basic link', () => {
		const className = 'test';
		const href = 'test.com';
		const rel = 'rel';
		const target = '_blank';
		const props = {
			className,
			href,
			rel,
			target
		};

		const wrapper = shallow(
			<Link {...props} />
		);

		expect(wrapper.find(Anchor)).toHaveClassName('js_link');
		expect(wrapper.find(Anchor)).toHaveClassName(className);
		expect(wrapper.find(Anchor).prop('href')).toEqual(href);
		expect(wrapper.find(Anchor).prop('rel')).toEqual(rel);
		expect(wrapper.find(Anchor).prop('target')).toEqual(target);
	});

	it('should be the same when children are passed in as html instead of react nodes', () => {
		const wrapper = mount(
			<Link href="test.com">
				<span>Inner content</span>
			</Link>
		);

		const htmlWrapper = mount(
			<Link href="test.com" innerHTML="<span>Inner content</span>" />
		);

		expect(wrapper.getDOMNode()).toEqual(htmlWrapper.getDOMNode());
	});

	it('should render ga attributes for client', () => {
		const event = ['send', 'event', 'category', 'action', 'label', 'value'];

		const wrapper = shallow(
			<Link href="test.com" events={[event]} />
		);

		expect(JSON.parse(wrapper.find(Anchor).prop('data-ga'))).toEqual([event]);
	});
});
