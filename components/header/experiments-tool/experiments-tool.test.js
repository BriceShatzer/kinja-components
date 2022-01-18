import { ExperimentsTool } from './experiments-tool';
import { shallow } from 'enzyme';
import * as React from 'react';

const manualFeature = {
	name: 'feature1',
	description: 'description for feature1',
	source: 'USER',
	value: 'off'
};

const abtestFeature = {
	name: 'feature2',
	description: 'description for feature2',
	source: 'EXPERIMENT',
	value: 'on'
};

describe('<ExperimentsTool />', () => {
	it('should show the total number of fs-es', () => {
		const wrapper = shallow(<ExperimentsTool features={[manualFeature, abtestFeature]} />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should show both types of fs-es when it is opened', () => {
		const wrapper = shallow(<ExperimentsTool features={[manualFeature, abtestFeature]} isOpen />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should only render the section that has fs-es, and render superuser link', () => {
		const wrapper = shallow(<ExperimentsTool features={[abtestFeature]} isOpen isSuperuser />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should not render disclaimer in footer if there are no ab tests', () => {
		const wrapper = shallow(<ExperimentsTool features={[manualFeature]} isOpen />);
		expect(wrapper).toMatchSnapshot();
	});
});