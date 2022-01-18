import * as React from 'react';
import { shallow } from 'enzyme';

import CurationToolbar from './curation-toolbar';

describe('<CurationToolbar />', () => {
	it('should render one button in closed mode', () => {
		const wrapper = shallow(<CurationToolbar isEditMode={false} toggleHandler={() => {}} saveHandler={() => {}} />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render one button in edit mode', () => {
		const wrapper = shallow(<CurationToolbar isEditMode={true} toggleHandler={() => {}} saveHandler={() => {}} />);
		expect(wrapper).toMatchSnapshot();
	});
});
