import * as React from 'react';
import { shallow } from 'enzyme';
import Grid from './grid';

import postModel from '../../__stubs__/stubbedPost.json';

describe('<Grid />', () => {
	it('renders a grid with zones', () => {
		const gridConfig = {
			layout: {
				zones: [
					{
						dimension: '2fr',
						numberOfItems: 1
					},
					{
						dimension: '1fr',
						numberOfItems: 1
					},
					{
						dimension: '1fr',
						numberOfItems: 2
					}
				]
			},
			items: [
				postModel,
				postModel,
				postModel,
				postModel
			]
		};
		const wrapper = shallow(
			<Grid {...gridConfig}>
				{({ renderWithZones }) => (
					renderWithZones(({ itemIndex, zoneIndex }) => <div>{itemIndex} - {zoneIndex}</div>)
				)}
			</Grid>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
