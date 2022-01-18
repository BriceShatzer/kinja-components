import * as React from 'react';
import { mount } from 'enzyme';

import DrawerMenu, { EmbiggenIconContainer } from './DrawerMenu';


const onEmbiggenClick = jest.fn();
const onDrawerMenuIconClick = jest.fn();

const stubElement = ({ isEmbiggened } = {}) => (
	<DrawerMenu
		isEmbiggened={isEmbiggened}
		postId={1829613594}
		onDrawerMenuIconClick={onDrawerMenuIconClick}
		onEmbiggenClick={onEmbiggenClick}
		permalink="https://earther.gizmodo.com/new-house-science-committee-chair-to-climate-scientists-1830999547"
	/>
);

describe('<DrawerMenu />', () => {
	it('should render properly', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should render properly - embiggened', () => {
		const wrapper = mount(stubElement({
			isEmbiggened: true
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should call onEmbiggenClick', () => {
		const wrapper = mount(stubElement());
		const embiggenIcon = wrapper.find(EmbiggenIconContainer);
		embiggenIcon.simulate('click');

		expect(onEmbiggenClick).toBeCalledWith(expect.any(Number), expect.any(Boolean), expect.any(String));
		onEmbiggenClick.mockClear();
	});
});