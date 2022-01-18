import * as React from 'react';
import { mount } from 'enzyme';

import { mockProps } from './mocks';

import BlogSettingsContainer from './blog-settings-container';

describe('<BlogSettingsContainer />', () => {
	it('renders', () => {
		const wrapper = mount(<BlogSettingsContainer {...mockProps} />);
		expect(wrapper).toMatchSnapshot();
	});
	it('stores the ids of blogProperties in state and ignores irrelevant properties', () => {
		const wrapper = mount(<BlogSettingsContainer {...mockProps} />);
		setImmediate(() => {
			expect(wrapper.state('blogPropIdsByKey')).toEqual({ hideViewcounts: 20387 });
		});
	});
	it('calls createBlogProperty when a new blog property value is created', () => {
		const wrapper = mount(<BlogSettingsContainer {...mockProps} />);
		wrapper.instance().handleChange({ key: 'hideViewcounts', value: true, blogId: 0 });
		const mockProfileApi = wrapper.prop('profileApi');
		expect(mockProfileApi.createBlogProperty.mock.calls.length).toEqual(1);
		// we expect that this method hasn't been called, since we didn't pass in an ID.
		expect(mockProfileApi.updateBlogProperty.mock.calls.length).toEqual(0);
		mockProfileApi.createBlogProperty.mockClear();
		mockProfileApi.updateBlogProperty.mockClear();
	});
	it('calls updateBlogProperty when a property is updated', () => {
		const wrapper = mount(<BlogSettingsContainer {...mockProps} />);
		wrapper.instance().handleChange({ key: 'hideViewcounts', value: true, blogId: 0, id: 99 });
		const mockProfileApi = wrapper.prop('profileApi');
		expect(mockProfileApi.updateBlogProperty.mock.calls.length).toEqual(1);
		// we expect that this method hasn't been called, since we passed in an ID.
		expect(mockProfileApi.createBlogProperty.mock.calls.length).toEqual(0);
		mockProfileApi.createBlogProperty.mockClear();
		mockProfileApi.updateBlogProperty.mockClear();
	});
});
