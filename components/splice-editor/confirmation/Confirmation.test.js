import * as React from 'react';
import { mount } from 'enzyme';

import Confirmation from './Confirmation';
import { selectedBlogs } from '../fixtures';


describe('<Confirmation />', () => {
	const todayTimemillisStub = 1551871107757;
	beforeAll(() => {
		jest.spyOn(Date, 'now').mockImplementation(() => todayTimemillisStub);
	});

	it('should render properly', () => {
		const component = mount(<Confirmation
			selectedBlogs={selectedBlogs}
			timemillis={todayTimemillisStub}
		/>);
		expect(component).toMatchSnapshot();
	});
});
