// @flow

import React from 'react';
import { mount } from 'enzyme';

import DragAndDrop from './';

const ExampleComponent = () => (
	<div>
		<div className="first" data-index="1234567"></div>
		<div className="second" data-index="7654321"></div>
	</div>
);

const Test = DragAndDrop(ExampleComponent);

describe('<DragAndDropHOC />', () => {
	it('render without drag and drop functionality', () => {
		const wrapper = mount(<Test />);
		expect(wrapper).toMatchSnapshot();
	});
	it('render with drag and drop functionality without being set to draggable', () => {
		const handler = jest.fn();
		const wrapper = mount(<Test isDraggable={false} setCardSwapState={handler} />);
		expect(handler).not.toHaveBeenCalled();
		expect(wrapper).toMatchSnapshot();
	});
	it('render with full drag and drop functionality', () => {
		const handler = jest.fn();
		const wrapper = mount(<Test isDraggable={true} setCardSwapState={handler} />);
		expect(wrapper).toMatchSnapshot();
	});
});
