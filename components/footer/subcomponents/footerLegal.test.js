import * as React from 'react';
import { shallow } from 'enzyme';

import MockDate from 'mockdate';

import FooterLegal from './footerLegal';

import { onionIncBlogs, gmgBlogs } from '../constants';

describe('<FooterLegal />', () => {
	beforeAll(() => {
		MockDate.set('2019-05-04');
	});

	afterAll(() => {
		MockDate.reset();
	});

	describe('for Onion blogs', () => {
		onionIncBlogs.forEach(blog => {
			it('renders G/O Media\'s legal text', () => {
				const wrapper = shallow(<FooterLegal blogGroup={blog} />);
				expect(wrapper).toMatchSnapshot();
			});
		});
	});

	describe('for Gizmodo blogs', () => {
		gmgBlogs.forEach(blog => {
			it('renders G/O Media\'s legal text', () => {
				const wrapper = shallow(<FooterLegal blogGroup={blog} />);
				expect(wrapper).toMatchSnapshot();
			});
		});
	});
});
