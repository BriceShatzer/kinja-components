import * as React from 'react';
import {shallow} from 'enzyme';
import CurrentPath from './current-path';
import {levels} from './fixtures';

describe('<CurrentPath/>', () => {
	it('should render without icon', () => {
		const currentPath = shallow(<CurrentPath levels={levels} />);

		expect(currentPath).toMatchSnapshot();
	});

	it('should render with icon', () => {
		const currentPath = shallow(<CurrentPath levels={levels} withIcon />);

		expect(currentPath).toMatchSnapshot();
	});

	it('shouldn\'t render without levels', () => {
		let currentPath = shallow(<CurrentPath />);
		expect(currentPath).toBeEmptyRender();

		currentPath = shallow(<CurrentPath levels={[]} />);
		expect(currentPath).toBeEmptyRender();
	});

	it('should render placeholder in place of empty levels', () => {
		const currentPath = shallow(<CurrentPath levels={[]} placeholder="No path selected" />);

		expect(currentPath).toMatchSnapshot();
	});
});
