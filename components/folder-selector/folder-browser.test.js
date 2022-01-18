import * as React from 'react';
import { shallow } from 'enzyme';
import FolderBrowser from './folder-browser';
import Folder from './folder';
import CurrentPath from './current-path';
import { levels } from './fixtures';

const onSelect = jest.fn();
const onCancel = jest.fn();

describe('<FolderBrowser/>', () => {
	const props = {
		currentPath: <CurrentPath />,
		onSelect,
		onCancel,
		levels
	};
	let folderBrowser;

	beforeEach(() => {
		folderBrowser = shallow(<FolderBrowser {...props}><Folder /></FolderBrowser>);
	});

	it('should render', () => {
		expect(folderBrowser).toMatchSnapshot();
	});

	it('should render while disabled', () => {
		folderBrowser.setProps({selectDisabled: true});

		expect(folderBrowser).toMatchSnapshot();
	});

	it('should render with multipleSelection', () => {
		folderBrowser.setProps({ multipleSelection: true });
		expect(folderBrowser).toMatchSnapshot();
	});
});
