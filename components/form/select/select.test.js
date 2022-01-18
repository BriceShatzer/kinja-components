import * as React from 'react';

import { mount, shallow } from 'enzyme';

import Select, { SelectValue } from './select';
import Option, { OptionItem } from './option';

const NAME = 'test';
const DESCRIPTION = 'Language';
const ERROR = 'Error message';
const HEIGHT = 200;
let CHANGE_HANDLER = jest.fn();

const options = [
	<Option key="en" value="en" stringRepresentation="English" />,
	<Option key="es" value="es" stringRepresentation="Spanish" />,
	<Option key="hu" value="hu" stringRepresentation="Hungarian" />
];

const stubElement = ({
	children = options,
	simplified = false,
	error = '',
	disabled = false,
	value = '',
	predictive = false,
	height
} = {}) => (
	<Select
		name={NAME}
		description={DESCRIPTION}
		onChange={CHANGE_HANDLER}
		children={children}
		simplified={simplified}
		error={error}
		disabled={disabled}
		value={value}
		predictive={predictive}
		height={height}
	/>
);


describe('<Select />', () => {
	beforeEach(() => {
		CHANGE_HANDLER = jest.fn();
	});
	describe('Simplified', () => {
		it('should render', () => {
			const wrapper = mount(stubElement({
				simplified: true
			}));
			expect(wrapper).toMatchSnapshot();
		});
		it('should be disabled', () => {
			const wrapper = mount(stubElement({
				simplified: true,
				disabled: true
			}));
			expect(wrapper).toMatchSnapshot();
		});
		it('should include error', () => {
			const wrapper = mount(stubElement({
				simplified: true,
				error: ERROR
			}));
			expect(wrapper).toMatchSnapshot();
		});
		it('should trigger onChange', () => {
			const wrapper = shallow(stubElement({
				simplified: true
			}));
			wrapper.dive('select').simulate('change', {
				currentTarget: {
					value: 'Hungarian'
				}
			});
			expect(CHANGE_HANDLER).toHaveBeenCalledWith({ 'currentTarget': { 'value': 'Hungarian' } });
		});
	});
	describe('Normal', () => {
		it('should include description', () => {
			const wrapper = mount(stubElement());
			expect(wrapper).toMatchSnapshot();
		});
		it('should be disabled', () => {
			const wrapper = mount(stubElement({
				disabled: true
			}));
			expect(wrapper).toMatchSnapshot();
			wrapper.find({ role: 'button' }).at(0).simulate('click');
			expect(wrapper).toMatchSnapshot();
		});
		it('should include error', () => {
			const wrapper = mount(stubElement({
				error: ERROR
			}));
			expect(wrapper).toMatchSnapshot();
		});
		it('should have max height', () => {
			const wrapper = mount(stubElement({
				height: HEIGHT
			}));
			wrapper.find({ role: 'button' }).at(0).simulate('click');
			expect(wrapper).toMatchSnapshot();
		});
		it('should be closed by default, should open and close', () => {
			const wrapper = mount(stubElement());
			expect(wrapper).toMatchSnapshot();
			wrapper.find({ role: 'button' }).at(0).simulate('click');
			expect(wrapper).toMatchSnapshot();
			wrapper.find({ role: 'button' }).at(0).simulate('click');
			expect(wrapper).toMatchSnapshot();
			wrapper.find(SelectValue).simulate('click');
			expect(wrapper).toMatchSnapshot();
		});
		it('should be able to select option', () => {
			const wrapper = mount(stubElement());
			wrapper.find({ role: 'button' }).at(0).simulate('click');
			expect(wrapper).toMatchSnapshot();
			wrapper.find(OptionItem).at(0).simulate('click');
			expect(wrapper).toMatchSnapshot();
			expect(CHANGE_HANDLER).toHaveBeenCalledWith('en');
		});
		it('should display its value', () => {
			const wrapper = mount(stubElement({
				value: 'en'
			}));
			expect(wrapper).toMatchSnapshot();
		});

		describe('Predictive', () => {
			it('should reset text field when it\'s open and predictive', () => {
				const wrapper = mount(stubElement({
					predictive: true,
					value: 'en'
				}));
				wrapper.find({ role: 'button' }).at(0).simulate('click');
				expect(wrapper).toMatchSnapshot();
			});

			it('shouldn\'t filter when an emptyValue option is selected', () => {
				const wrapper = mount(stubElement({
					predictive: true,
					value: 'empty',
					children: [<Option value='empty' key='empty' stringRepresentation='Empty' emptyValue />].concat(options)
				}));
				wrapper.find({ role: 'button' }).at(0).simulate('click');
				expect(wrapper).toMatchSnapshot();
			});

			it('typing in the text field filters results', () => {
				const wrapper = mount(<Select
					name={NAME}
					description={DESCRIPTION}
					onChange={CHANGE_HANDLER}
					children={options}
					isOpen
					value='en'
					predictive
				/>);
				const mockInput = document.createElement('INPUT');
				if (mockInput instanceof HTMLInputElement) {
					mockInput.value = 'hun';
				}
				wrapper.find('input').simulate('change', {
					currentTarget: mockInput
				});
				expect(wrapper.render()).toMatchSnapshot();
			});

			it('selecting a value in a predictive select still triggers an onChange event', () => {
				const wrapper = mount(stubElement({
					predictive: true
				}));
				wrapper.find({ role: 'button' }).at(0).simulate('click');
				wrapper.find('li').at(1).simulate('click');
				expect(CHANGE_HANDLER).toHaveBeenCalledWith('es');
			});
		});
	});
});
