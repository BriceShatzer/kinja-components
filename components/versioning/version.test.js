import * as React from 'react';
import { shallow } from 'enzyme';
import { Settings } from 'luxon';

import Version from './version';

describe('<Version/>', () => {
	Settings.defaultZoneName = 'utc';
	const timestamp = 1512136800667;

	it('should render minutes ago', () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => timestamp);

		const wrapper = shallow(<Version
			createdAt={timestamp}
		/>);

		expect(wrapper.find('VersionInfo').first().text()).toBe('0 minutes ago');
	});

	it('should render formatted date', () => {
		const wrapper = shallow(<Version
			createdAt={timestamp}
		/>);

		expect(wrapper.find('VersionInfo').first().text()).toBe('12/01/2017—2:00 PM');
	});
});
