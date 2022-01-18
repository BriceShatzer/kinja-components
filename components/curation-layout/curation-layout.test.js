import * as React from 'react';
import { shallow } from 'enzyme';

import CurationLayout from './curation-layout';
import Grid from '../grid';

import post1 from '../../__stubs__/stubbedPost.json';
import post2 from '../../__stubs__/stubbedPost.2.json';
import post3 from '../../__stubs__/stubbedPost.3.json';
import post4 from '../../__stubs__/stubbedPost.4.json';
import post5 from '../../__stubs__/stubbedPost.5.json';

import defaultLayouts from '../curation-layout/default-layouts-stub';

const externalAPI = {
	imageUploader: () => {},
	resolveItem: () => Promise.resolve(post1)
};

const gridConfig = {
	layout: {
		zones: [
			{
				dimension: '3fr',
				numberOfItems: 1
			},
			{
				dimension: '1fr',
				numberOfItems: 2
			},
			{
				dimension: '1fr',
				numberOfItems: 2
			}
		]
	},
	items: [post1, post2, post3, post4, post5]
};

const wrapper = shallow(
	<CurationLayout withControls defaultLayouts={defaultLayouts} gridConfig={gridConfig} externalAPI={externalAPI}>
		{layoutSpecificProps => {
			const { setLayout } = layoutSpecificProps;
			return (
				<Grid {...gridConfig} setLayout={setLayout}>
					{({ renderWithZones }) => (
						renderWithZones(({ model, zoneIndex, itemIndex }) =>
							<div style={{ padding: '10px', display: 'block', backgroundColor: '#EEE' }}>
								<div style={{ margin: '10px', minHeight: '200px' }}>
									<p>
										<span>{model.headline}</span>
									</p>
									<div>Column #{zoneIndex + 1}</div>
									<div>Zone #{zoneIndex}</div>
									<div>ZoneItem #{itemIndex}</div>
								</div>
							</div>
						)
					)}
				</Grid>
			);
		}}
	</CurationLayout>
);

describe('<CurationLayout />', () => {
	it('should render layout based on provided grid config', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should render 2 different layouts by calling setLayout and compare their difference', () => {
		wrapper.instance().setLayout(1, 3);
		const secondState = wrapper.state();

		expect(secondState).toMatchSnapshot();
	});
	it('should render an item from a url when setItemsOnPaste is called', () => {
		const eventMock = {
			currentTarget: {
				dataset: {
					zoneindex: '1',
					index: '2'
				}
			},
			clipboardData: {
				getData: () => 'mockUrl'
			}
		};
		wrapper.instance().setItemsOnPaste(eventMock);
		const secondState = wrapper.state();

		expect(secondState).toMatchSnapshot();
	});
	it('should render a new image on an item when handleItemImageChange is called', () => {
		const imageObjMock = {
			id: 'jt0llxhkwj7pxgsqlh69',
			format: 'jpg'
		};

		wrapper.instance().handleItemImageChange(imageObjMock, 1, 1);
		const secondState = wrapper.state();

		expect(secondState).toMatchSnapshot();
	});
	it('should render an Add Url state when deleteItemModel method is called on an item', () => {
		wrapper.instance().deleteItemModel(1, 2);
		const secondState = wrapper.state();

		expect(secondState).toMatchSnapshot();
	});
	it('should render an input with url as value when relinkItemModel method is called on an item', () => {
		const props = {
			model: {
				permalink: 'foo'
			},
			zoneIndes: 1,
			itemIndex: 2
		};
		wrapper.instance().relinkItemModel(props);
		const secondState = wrapper.state();

		expect(secondState).toMatchSnapshot();
	});
	it('should render the default layout when setDefaultLayout is called', () => {
		const event = {};
		const options = {
			cardinality: 1,
			group: 'Headline'
		};
		wrapper.instance().setDefaultLayout(event, options);
		const secondState = wrapper.state();

		expect(secondState).toMatchSnapshot();
	});
	it('should render the swapped state when setCardSwapState is called', () => {
		wrapper.instance().setCardSwapState(1, 1, 2, 2);
		const secondState = wrapper.state();

		expect(secondState).toMatchSnapshot();
	});
	it('should re-render cards with new headline or excerpt values when saveCardStateChange is called', () => {
		const state = {
			cardState: {
				headline: {
					next: 'The whole problem with the world is that fools and fanatics are always so certain of themselves, but wiser people so full of doubts.'
				},
				excerpt: {
					next: 'The good life is one inspired by love and guided by knowledge.'
				}
			}
		};
		const model = {};
		wrapper.instance().saveCardStateChange(state, model, 2, 1);
		const secondState = wrapper.state();

		expect(secondState).toMatchSnapshot();
	});
});
