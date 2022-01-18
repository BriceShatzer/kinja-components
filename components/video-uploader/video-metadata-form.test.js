import React from 'react';
import { shallow } from 'enzyme';
import stubbedPrograms from './fixtures/stubbedPrograms';
import VideoMetadataForm from './video-metadata-form';

const stubElement = () => (
	<VideoMetadataForm
		getPrograms={() => Promise.resolve(stubbedPrograms)}
	/>
);

describe('<VideoMetadataForm />', () => {
	it('should render with fields', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should set errors if invalid', () => {
		const wrapper = shallow(stubElement());
		wrapper.find('Button[label="Save video info"]').simulate('click');
		expect(wrapper.state('errors')).toMatchSnapshot();
		expect(wrapper).toMatchSnapshot();
	});
});