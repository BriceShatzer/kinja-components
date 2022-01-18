import * as React from 'react';
import { mount } from 'enzyme';
import simulant from 'simulant';

import ListWithSelection from './list-with-selection';

const noop = () => {};

const arrowDown = () => simulant.fire(document, 'keydown', { key: 'ArrowDown' });
const arrowUp = () => simulant.fire(document, 'keydown', { key: 'ArrowUp' });
const enter = () => simulant.fire(document, 'keydown', { key: 'Enter' });

const createChildren = n => {
	const list = [];
	for (let i = 0; i < n; i += 1) {
		list.push(<div className="item" style={{ height: 20 }} key={i}>{i}</div>);
	}
	return list;
};

const stubElement = ({
	nodes = 3,
	onSelect = noop,
	allowNavigation = true,
	height = 400,
	children
} = {}) => (
	<ListWithSelection
		onSelect={onSelect}
		allowNavigation={allowNavigation}
		height={height}
	>
		{children || createChildren(nodes)}
	</ListWithSelection>
);


describe('<ListWithSelection />', () => {
	it('renders children', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('has specified max height', () => {
		const wrapper = mount(stubElement({
			height: 20
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('first item is selected by default', () => {
		const wrapper = mount(stubElement({
			nodes: 2
		}));
		expect(wrapper).toMatchSnapshot();
	});

	describe('Enter key', () => {
		it('selects currently selected item', () => {
			const spy = jest.fn();
			mount(stubElement({
				onSelect: spy
			}));
			enter();
			expect(spy.mock.calls[0][0]).toMatchSnapshot();
		});

		it('doesn\'t work when allowNavigation is false', () => {
			const spy = jest.fn();
			mount(stubElement({
				onSelect: spy,
				allowNavigation: false
			}));
			enter();
			expect(spy).not.toHaveBeenCalled();
		});
	});

	describe('ArrowDown key', () => {
		it('moves the selection down by one', () => {
			const wrapper = mount(stubElement());
			arrowDown();
			expect(wrapper).toMatchSnapshot();
		});

		it('stops if the selected element is the last one', () => {
			const wrapper = mount(stubElement());
			wrapper.setState({
				selectionIndex: 2
			});
			arrowDown();
			expect(wrapper).toMatchSnapshot();
		});

		it('doesn\'t work when allowNavigation is false', () => {
			const wrapper = mount(stubElement({
				allowNavigation: false
			}));
			arrowDown();
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('ArrowUp key', () => {
		it('moves the selection up by one', () => {
			const wrapper = mount(stubElement());
			wrapper.setState({
				selectionIndex: 2
			});
			arrowUp();
			expect(wrapper).toMatchSnapshot();
		});

		it('stops if the selected element is the first one', () => {
			const wrapper = mount(stubElement());
			arrowUp();
			expect(wrapper).toMatchSnapshot();
		});

		it('doesn\'t work when allowNavigation is false', () => {
			const wrapper = mount(stubElement({
				allowNavigation: false
			}));
			wrapper.setState({
				selectionIndex: 2
			});
			arrowUp();
			expect(wrapper).toMatchSnapshot();
		});
	});

	it('clicking also selects', () => {
		const spy = jest.fn();
		const children = createChildren(3);
		const wrapper = mount(stubElement({
			onSelect: spy,
			children
		}));
		wrapper.find('li').at(1).simulate('click');
		expect(spy.mock.calls[0][0]).toMatchSnapshot();
	});
});
