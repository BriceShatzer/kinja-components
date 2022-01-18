import * as React from 'react';
import { shallow } from 'enzyme';

import ShowBrowser from './show-browser';

describe('ShowBrowser', () => {
	it('should render', () => {
		const result = shallow(<ShowBrowser
			blogGroup='avclub'
			showMoreButton={false}
			getInitialState={() => Promise.resolve({})}
			loadVideosForTab={() => Promise.resolve([])}
		/>);
		expect(result).toMatchSnapshot();
	});
});
