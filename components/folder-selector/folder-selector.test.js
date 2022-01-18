import * as React from 'react';
import {shallow} from 'enzyme';
import {omit, find} from 'lodash';
import FolderSelector from './folder-selector';
import { levels, levelsForMultipleSelection } from './fixtures';


const onSelect = jest.fn();
const onCancel = jest.fn();
const stopPropagation = jest.fn();

describe('<FolderSelector/>', () => {
	let props;
	let folderSelector;

	beforeEach(() => {
		props = {
			levels,
			onSelect,
			onCancel
		};

		folderSelector = shallow(<FolderSelector {...props} />);
		folderSelector.setState({isOpen: true, initFetch: true});
	});

	it('should render', () => {
		folderSelector.instance().onReset = jest.fn().mockReturnValue(levels);
		folderSelector.setState({levelsinLabel: levels});
		expect(folderSelector).toMatchSnapshot();
	});

	it('should render', () => {
		expect(folderSelector).toMatchSnapshot();
	});

	it('should render with only one level', () => {
		const newLevels = levels.map((level, index) => index === 0 ? level : omit(level, ['items', 'selection']));
		folderSelector.setProps({levels: newLevels});

		expect(folderSelector).toMatchSnapshot();
	});

	it('should toggle visibility by clicking the dropdown', () => {
		folderSelector.setState({isOpen: false});

		expect(folderSelector).toMatchSnapshot();
	});

	it('can select an item', () => {
		const selectedFolder = () => folderSelector.find({index: 2, selection: '2'});
		expect(selectedFolder().length).toBe(0);
		const folderSelectorInstance = folderSelector.dive().dive().instance();

		folderSelectorInstance.onSelect('2', 2, () => {
			expect(selectedFolder().length).toBe(1);
		});
	});

	it('can deselect an item', done => {
		folderSelector = shallow(<FolderSelector {...props} />).dive().dive();
		folderSelector.setState({ isOpen: true, initFetch: true });
		const selectedStoryTypeFolder = () => find(folderSelector.state('levels'), level => level.selection === '2' && level.key === 1);

		expect(selectedStoryTypeFolder()).toBeTruthy();
		folderSelector.instance().onSelect('2', 1, true, () => {
			expect(selectedStoryTypeFolder()).toBeFalsy();
			done();
		});
	});

	it('doesn\'t allow the deselection of a required folder', done => {
		const selectedBlogFolder = () => find(folderSelector.dive().dive().state('levels'), level => level.selection === '1' && level.key === 0);
		expect(selectedBlogFolder()).toBeTruthy();
		const folderSelectorInstance = folderSelector.dive().dive().instance();

		folderSelectorInstance.onSelect('1', 0, true, () => {
			expect(selectedBlogFolder()).toBeTruthy();
			done();
		});
	});

	it('should add selected item to the state', () => {
		folderSelector = shallow(
			<FolderSelector onSelect={onSelect} onCancel={onCancel} levels={levelsForMultipleSelection} multipleSelection />
		).dive().dive();
		folderSelector.setState({ isOpen: true, initFetch: true });
		folderSelector.instance().addToSelection('1', 0);

		expect(folderSelector.state().selectedItems).toHaveLength(1);
	});

	it('should remove item from the state', () => {
		folderSelector = shallow(
			<FolderSelector onSelect={onSelect} onCancel={onCancel} levels={levelsForMultipleSelection} multipleSelection />
		).dive().dive();
		folderSelector.setState({ isOpen: true, initFetch: true });
		const mockedEvent = { stopPropagation };

		folderSelector.instance().addToSelection('1', 0);
		folderSelector.instance().onDeselect(mockedEvent, '1');
		expect(folderSelector.state().selectedItems).toHaveLength(0);

		folderSelector.instance().addToSelection('1', 0);
		folderSelector.instance().addToSelection('1', 0);
		expect(folderSelector.state().selectedItems).toHaveLength(0);
	});
});
