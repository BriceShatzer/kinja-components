import * as React from 'react';
import { shallow } from 'enzyme';
import SetScreenName from './set-screen-name';

describe('Set screen name form', () => {
	it('should display error when given an invalid screen name', () => {
		const handler = jest.fn();
		const wrapper = shallow(<SetScreenName onSubmit={handler} onInputChange={jest.fn()} translate={str => str} />);
		wrapper.find('ScreenNameInput').simulate('change', null);
		expect(wrapper.find('common__CenteredButton').prop('disabled')).toBe(true);
		expect(wrapper.state('error')).toBe(true);
	});
});