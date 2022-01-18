import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { Alert } from '../conversation-tool';
import LiveblogControls from './liveblog-controls';


describe('<LiveblogControls />', () => {
	const onChange = jest.fn();
	const onReloadClick = jest.fn();

	const stubElement = () => (
		<LiveblogControls
			discussionSetting={{
				mode: 'Liveblog',
				postId: '1839250466',
				sort: 'asc',
				staffIncluded: false,
				status: 'InProgress'
			}}
			locale='en-US'
			onChange={onChange}
			onReloadClick={onReloadClick}
		/>
	);

	it('should render properly', () => {
		const liveblogControls = shallow(stubElement());
		expect(liveblogControls).toMatchSnapshot();
	});

	it('should call onChange', () => {
		const liveblogControls = mount(stubElement());
		const input = liveblogControls.find('Toggle').find('input');
		input.simulate('change', { target: { checked: true }});

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith('InProgress', 'asc');
		onChange.mockClear();
	});

	it('should render Alert / call onStatusChange / callOnReloadClick', () => {
		const liveblogControls = mount(stubElement());
		const radio = liveblogControls.find('Radio').at(2);
		radio.simulate('click');
		const alert = liveblogControls.find(Alert);

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith('Completed', 'asc');
		onChange.mockClear();

		const reload = alert.find('Reload');
		reload.simulate('click');

		expect(onReloadClick).toHaveBeenCalledTimes(1);
		onReloadClick.mockClear();
	});
});
