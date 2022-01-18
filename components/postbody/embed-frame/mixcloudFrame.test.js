import * as React from 'react';
import MixcloudFrame from './mixcloudFrame';
import { shallow } from 'enzyme';

describe('<MixcloudFrame />', () => {
	it('should render a mixcloud iframe', () => {
		const mixcloudJSON = {
			url: 'https://www.mixcloud.com/dj-echo/echo-100/'
		};

		const result = shallow(<MixcloudFrame {...mixcloudJSON} />);
		expect(result).toMatchSnapshot();
	});
});
