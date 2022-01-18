import * as React from 'react';
import { mount, shallow } from 'enzyme';

import ConversationTool, { Alert } from './conversation-tool';


describe('<ConversationTool />', () => {
	const onChange = jest.fn();
	const onReloadClick = jest.fn();
	const statuses = ['kitty', 'piggy', 'doggo'];

	const stubElement = (hasStatusChanged = false) => (
		<ConversationTool
			activeStatus={statuses[0]}
			footerContent={<p>footer</p>}
			hasStatusChanged={hasStatusChanged}
			locale='en-US'
			onChange={onChange}
			onReloadClick={onReloadClick}
			statuses={statuses}
			subtitle="pets are friends"
			title="pets"
			translatedStatuses={statuses}
		/>
	);


	it('should render properly', () => {
		const conversationTool = shallow(stubElement());
		expect(conversationTool).toMatchSnapshot();
	});

	it('should collapse box', () => {
		const liveblogControls = mount(stubElement());
		const chevronDown = liveblogControls.find('ChevronDown');
		chevronDown.simulate('click');

		expect(liveblogControls.state().isOpen).toBe(false);
	});

	it('should call onChange', () => {
		const conversationTool = mount(stubElement());
		const radio = conversationTool.find('Radio').at(1);
		radio.simulate('click');

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith('piggy');
		onChange.mockClear();
	});

	it('should render Alert / callOnReloadClick', () => {
		const conversationTool = mount(stubElement(true));
		const alert = conversationTool.find(Alert);
		expect(alert.length).toBe(1);

		const reload = alert.find('Reload');
		reload.simulate('click');

		expect(onReloadClick).toHaveBeenCalledTimes(1);
		onReloadClick.mockClear();
	});
});




// });
