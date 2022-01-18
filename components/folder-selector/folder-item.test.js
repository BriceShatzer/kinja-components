/* @flow */

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import uuid from 'uuid/v4';
import MomJeansIcon from '../icon19/MomJeans';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import FolderItem, {Wrapper} from './folder-item';

const onSelect = jest.fn();
const id = uuid();

describe('<FolderItem/>', () => {
	it('should render with default icon', () => {
		const folderItem = shallow(<FolderItem name="Barf Bag" id={id} onSelect={() => {}} />);

		expect(folderItem).toMatchSnapshot();
	});

	it('should render with default icon', () => {
		const folderItem = shallow(<FolderItem name="Barf Bag" id={id} onSelect={onSelect} />);

		expect(folderItem).toMatchSnapshot();
	});

	it('should render with default icon for video', () => {
		const folderItem = shallow(<FolderItem name="Barf Bag" id={id} onSelect={onSelect} isVideo />);

		expect(folderItem).toMatchSnapshot();
	});

	it('should render chevron for items with children', () => {
		const folderItem = shallow(<FolderItem name="Barf Bag" id={id} onSelect={onSelect} hasChildren />);

		expect(folderItem).toMatchSnapshot();
	});

	it('should render with icon passed in', () => {
		const folderItem = shallow(<FolderItem name="Barf Bag" id={id} onSelect={onSelect} icon={<MomJeansIcon />} />);

		expect(folderItem).toMatchSnapshot();
	});

	it('should call onSelect with id', () => {
		const folderItem = shallow(<FolderItem name="Barf Bag" id={id} onSelect={onSelect} />);
		folderItem.find(Wrapper).simulate('click');

		expect(onSelect).toBeCalledWith(id);
	});

	it('should render with checkmark prefix', () => {
		const folderItem = mount(
			<EnsureDefaultTheme>
				<FolderItem isFirst name="Barf Bag" id={id} onSelect={onSelect} multipleSelection selected />
			</EnsureDefaultTheme>);

		expect(folderItem.find('CheckmarkIcon').exists()).toBe(true);
	});

	it('should render without prefix', () => {
		const folderItem = mount(
			<EnsureDefaultTheme>
				<FolderItem isFirst name="Barf Bag" id={id} onSelect={onSelect} multipleSelection />
			</EnsureDefaultTheme>);
		expect(folderItem.find('CheckmarkIcon').exists()).toBe(false);
	});
});
