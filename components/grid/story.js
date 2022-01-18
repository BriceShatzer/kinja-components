import * as React from 'react';
import {
	boolean,
	storiesOf,
	withKnobs,
	withDocs,
	select
} from 'base-storybook';
import README from './README.md';
import Grid from './grid';
import Card from '../card/card';

import postModel from '../../__stubs__/stubbedPost.2.json';

storiesOf('2. Styles & Utilities|Layout/Grid', module)
	.addDecorator(withDocs(README))
	.addDecorator(withKnobs)
	.add('with Zones', () => {
		const gridConfig = {
			layout: {
				cardinality: 9,
				zones: [
					{
						dimension: select('column 1', ['1fr', '2fr', '3fr', '4fr'], '2fr'),
						numberOfItems: 3
					},
					{
						dimension: select('column 2', ['1fr', '2fr', '3fr', '4fr'], '1fr'),
						numberOfItems: 3
					},
					{
						dimension: select('column 3', ['1fr', '2fr', '3fr', '4fr'], '1fr'),
						numberOfItems: 3
					}
				]
			},
			items: [...Array(12)].map(Function.prototype.valueOf, postModel),
			setLayout: () => {}
		};
		return (
			<Grid {...gridConfig}>
				{({ renderWithZones }) => (
					renderWithZones(props => {
						const { itemIndex, zoneIndex } = props;
						return <div style={{ padding: '10px', display: 'block', backgroundColor: '#EEE' }}>
							<div style={{ margin: '10px', minHeight: '200px' }}>
								<div>Column #{zoneIndex + 1}</div>
								<div>Zone #{zoneIndex}</div>
								<div>ZoneItem #{itemIndex}</div>
							</div>
						</div>;
					})
				)}
			</Grid>
		);
	})
	.add('with Zones + Items + Empty Card', () => {
		const items = [...Array(5)].map(Function.prototype.valueOf, postModel);
		items.push({});

		const gridConfig = {
			layout: {
				cardinality: 6,
				zones: [{
					dimension: '1fr',
					numberOfItems: 2
				}, {
					dimension: '1fr',
					numberOfItems: 2
				}, {
					dimension: '1fr',
					numberOfItems: 2
				}]
			},
			items
		};

		return (
			<Grid {...gridConfig} setLayout={() => {}}>
				{({ renderWithZones }) => (
					renderWithZones(({ model }) => (
						<Card
							key={model.id}
							isEditing={boolean('Card/isEditing', false)}
							withToolbar={boolean('Card/withToolbar', true)}
						>
							{({ StoryCard, EmptyCard, Toolbar, isEditing }) => (
								<div style={{height: '100%'}}>
									{ isEditing && Toolbar ? <Toolbar /> : null }
									{ Object.keys(model).length ?
										<StoryCard
											isEditing={isEditing}
											model={model}
										>
											{({ Image, Headline, Excerpt }) => {
												return (
													<div style={{ backgroundColor: '#F9F9F9' }}>
														<Image withPermalink />
														<div className='content__wrapper'>
															<Headline withPermalink />
															<Excerpt />
														</div>
													</div>
												);
											}}
										</StoryCard> : <EmptyCard />
									}
								</div>
							)}
						</Card>
					))
				)}
			</Grid>
		);
	});
