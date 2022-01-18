import * as React from 'react';
import { shallow } from 'enzyme';
import Versioning from './versioning';

describe('<Versioning/>', () => {
	beforeAll(() => {
		global.ga = jest.fn;
	});

	it('should render', () => {
		const id = 1;
		const noop = () => { };
		const goToPage = () => Promise.resolve([]);
		const fetchVersions = () => Promise.resolve([]);
		const wrapper = shallow(<Versioning id={id} onCancel={noop} fetchVersions={fetchVersions} paginator={{ goToPage }} />);

		expect(wrapper).toMatchSnapshot();
	});
});
