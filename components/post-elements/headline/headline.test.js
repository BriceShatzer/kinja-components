import * as React from 'react';
import { mount } from 'enzyme';

import Headline from './headline';


describe('<Headline />', () => {
	it('should render properly', () => {
		const headline = 'I Like Chopping Firewood <i>(In Red Dead Redemption 2)</i>';
		const wrapper = mount(<Headline>{headline}</Headline>);
		expect(wrapper).toMatchSnapshot();
	});

	it('should render embiggened headline', () => {
		const headline = 'Let Us Pet The Cats, <i>Red Dead Redemption 2</i>';
		const wrapper = mount(<Headline embiggened>{headline}</Headline>);
		expect(wrapper).toMatchSnapshot();
	});
});
