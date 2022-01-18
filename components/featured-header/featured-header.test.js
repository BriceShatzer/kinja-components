import * as React from 'react';
import { shallow } from 'enzyme';

import FeaturedHeader from './featured-header';
const featuredMediaImageOptions = {
	id: 'tscqkiavefq37idpvl5g',
	format: 'png',
	width: 1920,
	height: 1080,
	alignment: 'Bleed',
	caption: [],
	syndicationRights: false,
	attribution: [],
	type: 'Image'
};
describe('<ImpactHeader />', () => {
	it('should render by default', () => {
		const wrapper = shallow(
			<FeaturedHeader
				featuredMedia={featuredMediaImageOptions}
				title={'Featured Header'}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
