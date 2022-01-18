import * as React from 'react';
import { shallow } from 'enzyme';

import CollapsibleBox from './collapsible-box';
import Image from 'kinja-components/components/elements/image';
import Flame from 'kinja-components/components/icon19/Flame';


describe('<Radio />', () => {
	const stubElement = () => (
		<CollapsibleBox
			icon={<Flame />}
			title="COD: Modern Warfare"
		>
			<Image id="bwzkuqvhcw6feobrn3z3" />
		</CollapsibleBox>
	);

	it('should render properly', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});
});