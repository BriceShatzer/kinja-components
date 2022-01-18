import * as React from 'react';
import { shallow } from 'enzyme';
import Modal from './modal';

describe('<Modal />', () => {
	it('starts', () => {
		const wrapper = shallow(<Modal fullscreen isOpen onClose={() => {}}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
