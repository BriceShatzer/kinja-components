import * as React from 'react';
import { shallow } from 'enzyme';

import DistributionTools from './distribution-tools';

const externalAPI = {
	imageUploader: () => new Promise(() => {}),
	updatePostModel: () => {}
};

const sharingMainImage = {
	id: 'ajmqmj59hnjhldutwhkn',
	format: 'jpg'
};

describe('<DistributionTools />', () => {
	it('should render by default', () => {
		const wrapper = shallow(<DistributionTools externalAPI={externalAPI} sharingMainImage={sharingMainImage} />);
		expect(wrapper).toMatchSnapshot();
	});
});
