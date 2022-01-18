import * as React from 'react';
import { shallow } from 'enzyme';
import SpecialSectionStreamEditor from './special-section-stream-editor';

describe('<SpecialSectionStreamEditor />', () => {
	it('renders an Add Module Region if given an empty list of modules', () => {
		const wrapper = shallow(
			<SpecialSectionStreamEditor customContent={[]} updateCustomContent={() => {}} addLinkToModule={() => {}} />
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('renders a list of modules if given props for a module', () => {
		const wrapper = shallow(
			<SpecialSectionStreamEditor
				customContent={[{ headerText: 'Foo', id: 'Foo' }]}
				updateCustomContent={() => {}}
				addLinkToModule={() => {}}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('renders a list of modules if given props for several modules', () => {
		const wrapper = shallow(
			<SpecialSectionStreamEditor
				customContent={[{ headerText: 'first', id: 'first' }, { paragraphText: 'SECOND', id: 'second' }]}
				updateCustomContent={() => {}}
				addLinkToModule={() => {}}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
