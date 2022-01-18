import * as React from 'react';
import { shallow } from 'enzyme';
import ScreenNameInput from './screen-name-input';

describe('<ScreenNameInput />', () => {
	it('should return error on short username', () => {
		const handler = jest.fn();
		const wrapper = shallow(<ScreenNameInput onChange={handler} translate={str => str} />);
		wrapper.setState({ displayErrors: true });
		wrapper.find('Textfield18').simulate('change', 'yo');
		expect(handler).toHaveBeenCalledWith(null);
		expect(wrapper).toMatchSnapshot();
	});
	it('should return error on starting dash', () => {
		const handler = jest.fn();
		const wrapper = shallow(<ScreenNameInput onChange={handler} translate={str => str} />);
		wrapper.setState({ displayErrors: true });
		wrapper.find('Textfield18').simulate('change', '-hello;');
		expect(handler).toHaveBeenCalledWith(null);
		expect(wrapper).toMatchSnapshot();
	});
	it('should return error on invalid characters', () => {
		const handler = jest.fn();
		const wrapper = shallow(<ScreenNameInput onChange={handler} translate={str => str} />);
		wrapper.setState({ displayErrors: true });
		wrapper.find('Textfield18').simulate('change', 'hello;');
		expect(handler).toHaveBeenCalledWith(null);
		expect(wrapper).toMatchSnapshot();
	});
	it('should return with no errors', () => {
		const handler = jest.fn();
		const wrapper = shallow(<ScreenNameInput onChange={handler} translate={str => str} />);
		wrapper.setState({ displayErrors: true });
		wrapper.find('Textfield18').simulate('change', 'mborlay');
		expect(handler).toHaveBeenCalledWith('mborlay');
		expect(wrapper).toMatchSnapshot();
	});
	it('should display username taken error', () => {
		const handler = jest.fn();
		const wrapper = shallow(<ScreenNameInput onChange={handler} userNameTaken translate={str => str} />);
		expect(wrapper).toMatchSnapshot();
	});
});