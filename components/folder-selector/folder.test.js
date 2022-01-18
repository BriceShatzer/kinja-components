import * as React from 'react';
import {shallow} from 'enzyme';
import Folder from './folder';
import {blogItemGizmodo, blogItemAVClub} from './fixtures';

const items = [
	{...blogItemGizmodo},
	{...blogItemAVClub}
];
const onSelect = jest.fn();
const onDeselect = jest.fn();
const props = {
	index: 1,
	items,
	isFirst: false,
	onSelect,
	onDeselect
};

describe('<Folder/>', () => {
	let folder;

	beforeEach(() => {
		folder = shallow(<Folder {...props} />);
	});

	it('should render', () => {
		expect(folder).toMatchSnapshot();
	});

	it('should be styled differently in first position', () => {
		folder.setProps({isFirst: true});

		expect(folder).toMatchSnapshot();
	});
});
