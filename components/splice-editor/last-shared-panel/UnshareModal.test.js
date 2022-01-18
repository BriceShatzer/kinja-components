import * as React from 'react';
import { mount } from 'enzyme';

import UnshareModal from './UnshareModal';


describe('<UnshareModal />', () => {
	const onClose = jest.fn();
	const onSubmit = jest.fn();
	const component = mount(<UnshareModal
		displayName="Jalopnik"
		isOpen
		onClose={onClose}
		onSubmit={onSubmit}
	/>);

	it('should render properly', () => {
		expect(component).toMatchSnapshot();
	});

	it('should call onClose', () => {
		const cancel = component.find({ label: 'Cancel' });
		cancel.simulate('click');

		expect(onClose).toHaveBeenCalledTimes(1);
		onClose.mockClear();
	});

	it('should call onSubmit', () => {
		const okay = component.find({ label: 'Okay' });
		okay.simulate('click');

		expect(onSubmit).toHaveBeenCalledTimes(1);
		onSubmit.mockClear();
	});
});