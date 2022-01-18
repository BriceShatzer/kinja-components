import * as React from 'react';
import { mount } from 'enzyme';
import NormalLinkPreview from './normal-link-preview';

const link = {
	headline: 'Headline',
	url: 'url',
	shortDescription: 'shortDescription',
	meta: {
		blogGroup: 'kotaku'
	},
	images: [{
		id: 'img-id',
		format: 'jpg'
	}]
};

describe('<NormalLinkPreview />', () => {
	it('should render by default', () => {
		const wrapper = mount(<NormalLinkPreview style="Normal" lazyload link={{ meta: {}, images: [] }} />);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
	it('should read with all information available', () => {
		const wrapper = mount(<NormalLinkPreview style="Normal" lazyload link={link} />);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
});
