import React from 'react';
import { mount } from 'enzyme';

import SectionNav from './section-nav';
import RenderableSection from 'kinja-magma/models/RenderableSection';

describe('SectionNav', () => {
	it('should not render if there are no sections', () => {
		const wrapper = mount(<SectionNav isVertical={false} />);

		expect(wrapper.html()).toBe(null);
	});

	it('should render a customUrl if available', () => {
		const wrapper = mount(
			<SectionNav
				sections={[new RenderableSection({
					index: 0,
					displayName: 'Secret Life of Muslims',
					featuredUrl: {
						url: 'https://gizmodo.com/s/secret-life-of-muslims'
					}
				})]}
				domain='gizmodo.com'
			/>
		);

		expect(wrapper.text()).toBe('LatestSecret Life of Muslims');
		expect(wrapper.find('a').map(node => node.prop('href'))).toEqual([
			'//gizmodo.com/',
			'https://gizmodo.com/s/secret-life-of-muslims'
		]);
	});

	it('should render Home and Latest if curated_homepage is on', () => {
		const wrapper = mount(
			<SectionNav
				sections={[new RenderableSection({
					index: 0,
					displayName: 'Secret Life of Muslims',
					featuredUrl: {
						url: 'https://gizmodo.com/s/secret-life-of-muslims'
					}
				})]}
				curatedHomepage
				domain='gizmodo.com'
			/>
		);

		expect(wrapper.text()).toBe('HomeLatestSecret Life of Muslims');
		expect(wrapper.find('a').map(node => node.prop('href'))).toEqual([
			'//gizmodo.com/',
			'//gizmodo.com/latest',
			'https://gizmodo.com/s/secret-life-of-muslims'
		]);
	});
	it('should render Home and Latest if parent_has_curated_homepage is on', () => {
		const wrapper = mount(
			<SectionNav
				sections={[new RenderableSection({
					index: 0,
					displayName: 'Secret Life of Muslims',
					featuredUrl: {
						url: 'https://gizmodo.com/s/secret-life-of-muslims'
					}
				})]}
				parentHasCuratedHomepage
				domain='gizmodo.com'
			/>
		);

		expect(wrapper.text()).toBe('HomeLatestSecret Life of Muslims');
		expect(wrapper.find('a').map(node => node.prop('href'))).toEqual([
			'//gizmodo.com/',
			'//gizmodo.com/latest',
			'https://gizmodo.com/s/secret-life-of-muslims'
		]);
	});
});