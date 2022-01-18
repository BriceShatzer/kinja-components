import * as React from 'react';
import { mount } from 'enzyme';

import MetaInfo from './meta-info';

import post from '../../../__stubs__/stubbedAVClubPost.json';
import blog from '../../../__stubs__/avclub.json';


describe('<MetaInfo />', () => {
	it('should render properly', () => {
		const wrapper = mount(<MetaInfo blog={blog} post={post}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('should not render storytypes if shouldShowStoryTypes is false', () => {
		const wrapper = mount(
			<MetaInfo
				blog={blog}
				post={post}
				storyType={{
					title: 'Test story type',
					canonical: 'link'
				}}
				shouldShowStoryTypes={false}
			/>
		);

		expect(wrapper.find('StoryTypeLabel')).toHaveLength(0);
	});

	it('should not render subCategory if hideSubCategory is true', () => {
		const wrapper = mount(
			<MetaInfo
				blog={blog}
				post={post}
				hideSubCategory
				storyType={{
					title: 'Test story type',
					canonical: 'link'
				}}
				category={{
					valueDisplay: 'Category',
					canonicalName: 'link'
				}}
				subcategory={{
					valueDisplay: 'Subcategory',
					canonicalName: 'link'
				}}
			/>
		);

		expect(wrapper.find('StoryTypeLabel')).toHaveLength(2);
	});
});
