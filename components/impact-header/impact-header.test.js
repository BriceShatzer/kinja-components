import * as React from 'react';
import { shallow } from 'enzyme';

import ImpactHeader from './impact-header';
import { featuredMediaImage, ImpactHeaderTitleAlignments, ImpactHeaderTitleOverlays } from './consts';
import ImpactHeaderBlocknode from 'postbody/blockNodes/ImpactHeader';

describe('<ImpactHeader />', () => {
	it('should render by default', () => {
		const wrapper = shallow(
			<ImpactHeader
				impactHeader={
					new ImpactHeaderBlocknode({
						media: featuredMediaImage,
						overlay: ImpactHeaderTitleOverlays.Black,
						titleAlignment: ImpactHeaderTitleAlignments.CenterBottom
					})
				}
				isPromoted={false}
				isSponsored={false}
				permalink={'http://www.kinja.com'}
				title={'Special Section'}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
