import * as React from 'react';

import { shallow } from 'enzyme';

import EditableCaption from './editablecaption';

const stubElement = ({
	html = 'Test input text',
	error = 'Error Message',
	className = 'source',
	description = 'This is a required field'
} = {}) => (
	<EditableCaption
		html={html}
		error={error}
		className={className}
		description={description}
	/>
);


describe('<Editable Caption/>', () => {
	it('should render correctly', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});
});
