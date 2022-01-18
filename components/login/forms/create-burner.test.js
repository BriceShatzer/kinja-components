import * as React from 'react';
import { shallow } from 'enzyme';
import CreateBurner from './create-burner';

window.grecaptcha = {
	render: jest.fn(),
	reset: jest.fn()
};

describe('Create Burner form', () => {
	it('should render by default and render captcha', () => {
		const wrapper = shallow(<CreateBurner translate={str => str}/>).dive();
		expect(wrapper).toMatchSnapshot();
		expect(window.grecaptcha.render).toHaveBeenCalled();
	});
	it('should display username taken error and reset captcha', () => {
		const wrapper = shallow(<CreateBurner translate={str => str} />).dive();
		wrapper.setProps({
			userNameTaken: true
		});
		expect(wrapper).toMatchSnapshot();
		expect(window.grecaptcha.reset).toHaveBeenCalled();
	});
	it('should display error when given an invalid screen name', () => {
		const handler = jest.fn();
		const wrapper = shallow(<CreateBurner onCreateClick={handler} onInputChange={jest.fn()} translate={str => str} />).dive();
		wrapper.find('ScreenNameInput').simulate('change', null);
		expect(wrapper.find('Button').prop('disabled')).toBe(true);
		expect(wrapper.state('error')).toBe(true);
	});
});