import * as React from 'react';
import { shallow } from 'enzyme';

import { Iframe } from './';
import Dimension from 'postbody/Dimension';

const dimensions = {
	width: new Dimension(640, 'Pixel'),
	height: new Dimension(320, 'Pixel')
};

const nonSecureSource = 'http://non-whitelisted.com';
const source = 'https://bloomberg.com/foo';

describe('<Iframe />', () => {
	it('should render empty if the domain is not whitelisted & isn\'t a starter', () => {
		const props = {
			source: nonSecureSource,
			isStarter: false
		};
		const wrapper = shallow(<Iframe {...props} />);
		expect(wrapper.getElement()).toBe(null);
	});
	describe('sizes', () => {
		it('flex with dimensions', () => {
			const props = {
				aspectRatio: 'Flex',
				scrollable: true,
				source,
				isLazy: true,
				...dimensions
			};
			const wrapper = shallow(<Iframe {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
		it('flex without dimensions', () => {
			const props = {
				aspectRatio: 'Flex',
				scrollable: true,
				source,
				isLazy: true
			};
			const wrapper = shallow(<Iframe {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
		it('custom with dimensions', () => {
			const props = {
				aspectRatio: 'Custom',
				scrollable: true,
				source,
				isLazy: true,
				...dimensions
			};
			const wrapper = shallow(<Iframe {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
		it('custom without dimensions', () => {
			const props = {
				aspectRatio: 'Custom',
				scrollable: true,
				source,
				isLazy: true
			};
			const wrapper = shallow(<Iframe {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
		it('fixed with dimensions', () => {
			const props = {
				aspectRatio: 'Fixed',
				scrollable: true,
				source,
				isLazy: true,
				...dimensions
			};
			const wrapper = shallow(<Iframe {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
		it('fixed without dimensions', () => {
			const props = {
				aspectRatio: 'Fixed',
				scrollable: true,
				source,
				isLazy: true
			};
			const wrapper = shallow(<Iframe {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
		it('fixed with wide dimensions', () => {
			const props = {
				aspectRatio: 'Fixed',
				scrollable: true,
				source,
				isLazy: true,
				height: dimensions.height,
				width: new Dimension(1000, 'Pixel')
			};
			const wrapper = shallow(<Iframe {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
	});
	it('non-lazy should use src instead of data-src', () => {
		const props = {
			aspectRatio: 'Flex',
			scrollable: true,
			source
		};
		const wrapper = shallow(<Iframe {...props} />);
		expect(wrapper.find('iframe').prop('src')).toBe(source);
		expect(wrapper.find('iframe').prop('data-src')).not.toBeDefined();
	});
	it('whitelisted url should not be sandboxed', () => {
		const props = {
			aspectRatio: 'Flex',
			scrollable: true,
			source
		};
		const wrapper = shallow(<Iframe {...props} />);
		expect(wrapper.find('iframe').prop('sandbox')).toBe(undefined);
	});
	it('should be able to be non-scrollable', () => {
		const props = {
			aspectRatio: 'Flex',
			scrollable: false,
			source
		};
		const wrapper = shallow(<Iframe {...props} />);
		expect(wrapper.find('iframe').prop('scrolling')).toBe('no');
	});
	describe('SSL placeholder', () => {
		it('should render an SSL placeholder', () => {
			const props = {
				source: nonSecureSource
			};
			const wrapper = shallow(<Iframe {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
		it('fixed aspect ratio', () => {
			const props = {
				source: nonSecureSource,
				aspectRatio: 'Fixed'
			};
			const wrapper = shallow(<Iframe {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
		it('wide dimension', () => {
			const props = {
				source: nonSecureSource,
				width: new Dimension(1000, 'Pixel')
			};
			const wrapper = shallow(<Iframe {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
		it('with thumbnail', () => {
			const props = {
				source: nonSecureSource,
				thumbnail: {
					id: 'id',
					format: 'jpg'
				}
			};
			const wrapper = shallow(<Iframe {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
