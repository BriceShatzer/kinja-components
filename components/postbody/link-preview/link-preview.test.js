import * as React from 'react';
import { shallow } from 'enzyme';
import LinkPreview from './link-preview';
import NormalLinkPreview from './normal-link-preview';
import CommerceLinkPreview from './link-preview-commerce';

const url = 'https://kinja.com';
const link = { meta: {}, images: [], url };

describe('<LinkPreview />', () => {
	it('should render a normal link', () => {
		const wrapper = shallow(<LinkPreview style="Normal" link={link} />);
		expect(wrapper.type()).toBe(NormalLinkPreview);
	});

	it('should render a commerce list link', () => {
		const wrapper = shallow(<LinkPreview style="CommerceList" link={link} />);
		expect(wrapper.type()).toBe(CommerceLinkPreview);
		expect(wrapper.prop('showDetails')).toBeFalsy();
	});
	it('should render a commerce condensed link', () => {
		const wrapper = shallow(<LinkPreview style="CommerceCondensed" link={link} />);
		expect(wrapper.prop('showDetails')).toBe(true);
	});
});
