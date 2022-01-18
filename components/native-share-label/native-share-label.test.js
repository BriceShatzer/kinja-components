import React from 'react';
import { mount } from 'enzyme';

import NativeShareLabel from './native-share-label';
import BlogAvatar from '../blog-avatar';
import SharedPostIcon from '../icon19/SharedPost';

describe('Native share label', () => {
	it('should not render if blog and post recircGroup is the same', () => {
		const component = mount(
			<NativeShareLabel
				blog={{recircGroup: 'fmgBusiness'}}
				defaultBlogDisplayName="Kinja Deals"
				defaultBlogRecircGroup="fmgBusiness"
			/>
		);

		expect(component.html()).toBe(null);
	});

	it('should render if blog and post recircGroup is the same and showSharedLabel is true', () => {
		const component = mount(
			<NativeShareLabel
				blog={{recircGroup: 'fmgBusiness'}}
				defaultBlogDisplayName="Kinja Deals"
				defaultBlogRecircGroup="fmgBusiness"
				showSharedLabel
			/>
		);

		expect(component.contains(SharedPostIcon)).toBe(true);
	});

	it('should render blog avatar for not business post', () => {
		const component = mount(
			<NativeShareLabel
				blog={{recircGroup: 'fmgBusiness'}}
				defaultBlogDisplayName="Gizmodo"
			/>
		);

		expect(component.contains(BlogAvatar)).toBe(true);
	});

	it('should render share icon for business post', () => {
		const component = mount(
			<NativeShareLabel
				blog={{}}
				defaultBlogDisplayName="Kinja Deals"
				defaultBlogRecircGroup="fmgBusiness"
			/>
		);

		expect(component.contains(SharedPostIcon)).toBe(true);
	});
});
