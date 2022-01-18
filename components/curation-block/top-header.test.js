// @flow

import * as React from 'react';
import TopHeader from './top-header';
import { shallow } from 'enzyme';

describe('CurationStandardBlock - TopHeader', () => {
	it('should not show link if no customHeaderLink is specified', () => {
		const wrapper = shallow(<TopHeader
			header={{
				title: 'My Title',
				useLogo: false,
				links: []
			}}
		/>);
		expect(wrapper).toMatchSnapshot();
	});
	it('should not show link if no url text is specified', () => {
		const wrapper = shallow(<TopHeader
			header={{
				title: 'My Title',
				useLogo: false,
				links: [],
				customHeaderLink: {
					url: 'http://google.com'
				}
			}}
		/>);
		expect(wrapper).toMatchSnapshot();
	});
});