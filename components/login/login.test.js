import * as React from 'react';
import { shallow } from 'enzyme';
import Login from './login';

const noop = () => undefined;
window.open = jest.fn();

describe('Login modal', () => {
	it('should render oauth login page', () => {
		const wrapper = shallow(<Login onClose={noop} />).dive();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render the setScreenName step if the user has incomplete registration', () => {
		const wrapper = shallow(<Login incompleteRegistration />).dive();
		expect(wrapper).toMatchSnapshot();
	});
	describe('OAuth login step', () => {
		it('should trigger onOAuthLoginStarted and open an oauth login window', () => {
			const handler = jest.fn();
			const wrapper = shallow(<Login onOAuthLoginStarted={handler} />).dive();
			wrapper.shallow().find('Analytics(OAuthLogin)').simulate('oAuthClick', 'google');
			expect(handler).toHaveBeenCalled();
			expect(window.open).toHaveBeenCalledWith('/oauthlogin?provider=google');
		});
		it('should switch to burner login screen', () => {
			const wrapper = shallow(<Login onNavigation={noop} />).dive();
			wrapper.shallow().find('Analytics(OAuthLogin)').simulate('burnerClick');
			expect(wrapper).toMatchSnapshot();
		});
		it('should render the setScreenName step incompleteRegistration changes in the props, with the proper provider', () => {
			const wrapper = shallow(<Login />).dive();
			wrapper.setState({
				provider: 'facebook'
			});
			wrapper.setProps({
				incompleteRegistration: true
			});
			expect(wrapper).toMatchSnapshot();
		});
	});
	describe('Burner Login step', () => {
		it('should switch to burner create screen', () => {
			const wrapper = shallow(<Login onNavigation={noop} />).dive();
			wrapper.setState({
				step: 'Burner'
			});
			wrapper.shallow().find('Analytics(BurnerLogin)').simulate('createClick');
			expect(wrapper).toMatchSnapshot();
		});
		it('should switch back to oauth screen', () => {
			const wrapper = shallow(<Login onNavigation={noop} />).dive();
			wrapper.setState({
				step: 'Burner'
			});
			wrapper.shallow().find('BurnerInfoAside').simulate('backClick');
			expect(wrapper).toMatchSnapshot();
		});
	});
	describe('Create Burner step', () => {
		it('should switch back to burner screen', () => {
			const wrapper = shallow(<Login onNavigation={noop} />).dive();
			wrapper.setState({
				step: 'Create'
			});
			wrapper.shallow().find('BurnerInfoAside').simulate('backClick');
			expect(wrapper).toMatchSnapshot();
		});
		it('should switch to success step when the password becomes available', () => {
			const wrapper = shallow(<Login />).dive();
			wrapper.setState({
				step: 'Create'
			});
			wrapper.setProps({
				password: 'pass'
			});
			expect(wrapper).toMatchSnapshot();
		});
	});
});