import * as React from 'react';
import { shallow } from 'enzyme';

import ButtonGroupItem from './ButtonGroupItem';


const buttonGroupItem = (
	<ButtonGroupItem label="Animal Liberation" />
);

describe('<ButtonGroupItem />', () => {
	it('renders ButtonGroupItem component', () => {
		const wrapper = shallow(buttonGroupItem);
		expect(wrapper).toMatchSnapshot();
	});
});
