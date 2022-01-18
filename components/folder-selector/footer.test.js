import * as React from 'react';
import { shallow } from 'enzyme';

import Footer from './footer';
import CurrentPath from './current-path';

const onSelect = jest.fn();
const onCancel = jest.fn();

describe('<Footer/>', () => {
	const props = {
		currentPath: <CurrentPath />,
		onSelect,
		onCancel
	};
	let footer;

	beforeEach(() => {
		footer = shallow(<Footer {...props} />);
	});

	it('should render', () => {
		expect(footer).toMatchSnapshot();
	});

	it('should render while disabled', () => {
		footer.setProps({selectDisabled: true});

		expect(footer).toMatchSnapshot();
	});

	it('should call onSelect', () => {
		footer.find({onClick: onSelect}).simulate('click');

		expect(onSelect).toBeCalled();
	});

	it('should call onCancel', () => {
		footer.find('Button').at(0).simulate('click');

		expect(onCancel).toBeCalled();
	});
});
