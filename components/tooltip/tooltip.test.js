import * as React from 'react';
import { shallow, mount } from 'enzyme';

import Tooltip from './tooltip';

describe('<Tooltip />', () => {
	let tooltip;

	beforeEach(() => {
		tooltip = shallow(<Tooltip />);
	});

	it('shouldn\'t render without children', () => {
		tooltip = shallow(<Tooltip />);
		expect(tooltip).toBeEmptyRender();
	});

	it('should return the children without tooltip content', () => {
		expect(tooltip).toMatchSnapshot();
	});

	it('should match snapshot when fully rendered', () => {
		document.body.innerHTML =
		'<div>' +
		'  <span id="testelement" />' +
		'</div>';
		const mountedTooltip = mount(<Tooltip content='triggered' width={500} topOffset={5} elmentRef={document.getElementById('#testelement')} />);
		expect(mountedTooltip).toMatchSnapshot();
	});
});
