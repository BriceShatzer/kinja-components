/* @flow */

import * as React from 'react';
import {
	storiesOf,
	select,
	withDocs
} from 'base-storybook';
import CurationLayout from './curation-layout';
import Grid from '../grid';
// $FlowFixMe
import { Card } from '../card';
// $FlowFixMe
import Headline from 'kinja-components/components/card/headline';
// $FlowFixMe
import StoryType from 'kinja-components/components/card/story-type';
// $FlowFixMe
import Image from 'kinja-components/components/card/image';
// $FlowFixMe
import ReadMore from 'kinja-components/components/card/read-more';
// $FlowFixMe
import Excerpt from 'kinja-components/components/card/excerpt';
// $FlowFixMe
import { Author } from 'kinja-components/components/card/authors';
import { getPostBlogGroupFromPost } from '../../utils';
import './story.sass';
import README from './README.md';

import post1 from '../../__stubs__/stubbedPost.json';
import post2 from '../../__stubs__/stubbedPost.2.json';
import post3 from '../../__stubs__/stubbedPost.3.json';
import post4 from '../../__stubs__/stubbedPost.4.json';
import post5 from '../../__stubs__/stubbedPost.5.json';

import defaultLayouts from '../curation-layout/default-layouts-stub';

const externalAPI = {
	imageUploader: () => Promise.resolve({}),
	resolveItem: () => Promise.resolve(post1),
	saveLayoutAndItems: () => Promise.resolve({}),
	deleteLayoutAndItems: () => Promise.resolve(true),
	returnValidCurationModel: () => post1,
	getParentBlog: () => Promise.resolve({})
};

const getGridConfig = () => {
	return {
		layout: {
			group: 'Modular',
			cardinality: 4,
			zones: [
				{
					dimension: select('column 1', ['1fr', '2fr', '3fr', '4fr'], '3fr'),
					numberOfItems: 1
				},
				{
					dimension: select('column 2', ['1fr', '2fr', '3fr', '4fr'], '1fr'),
					numberOfItems: 2
				},
				{
					dimension: select('column 3', ['1fr', '2fr', '3fr', '4fr'], '1fr'),
					numberOfItems: 1
				}
			]
		},
		items: [post1, post2, post3, post4, post5]
	};
};

storiesOf('4. Components|Post Promotion/Curation/Curation Layout', module)
	.addDecorator(withDocs(README))
	.addDecorator(getStory => (
		<div style={{ minWidth: '900px', maxWidth: '1300px' }}>
			{getStory()}
		</div>
	))
	.add('with Grid', () => {
		const gridConfig = getGridConfig();

		return (
			<CurationLayout
				withControls
				defaultLayouts={defaultLayouts}
				gridConfig={gridConfig}
				externalAPI={externalAPI}
				isSaving={false}
				isCloseButton={false}
				isOpenButton={false}
				isEditMode={false}
				resetToggleState={() => {}}
				setActiveCard={() => {}}
				clearCuration={true}
			>
				{layoutSpecificProps => {
					const { gridConfig, setLayout } = layoutSpecificProps;

					return (
						<Grid {...gridConfig}
							setLayout={setLayout}
							draggable={true}
							isEditMode={false}
							zonesDraggable={false}
						>
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
	})
	.add('with Grid + Card', () => {
		const gridConfig = getGridConfig();

		return (
			<CurationLayout
				withControls
				defaultLayouts={defaultLayouts}
				gridConfig={gridConfig}
				externalAPI={externalAPI}
				isEditMode={false}
				isSaving={false}
				isCloseButton={false}
				isOpenButton={false}
				resetToggleState={() => {}}
				setActiveCard={() => {}}
				clearCuration={true}
			>
				{layoutSpecificProps => {
					const { gridConfig, setLayout } = layoutSpecificProps;
					return (
						<Grid {...gridConfig}
							setLayout={setLayout}
							draggable={true}
							isEditMode={false}
							zonesDraggable={false}
						>
							{({ renderWithZones }) => (
								renderWithZones(({ model }) =>
									<Card>
										{({ StoryCard }) => {
											const { id,
												headline,
												permalink,
												securePermalink,
												author,
												authors = [],
												plaintext,
												storyType
											} = model;
											const postBlogGroup = getPostBlogGroupFromPost(model);

											const imageSourceUrl = model.images
												&& model.images[0]
												&& model.images[0].src || '';

											const authorValue = authors.length ? authors[0] : author;
											const articleHref = (permalink || securePermalink || '');
											return (
												<StoryCard id={id} model={model}>
													<div style={{ backgroundColor: '#F9F9F9' }}>
														<Image avatarName={postBlogGroup} imageSourceUrl={imageSourceUrl} noAnimate withPermalink />
														<div className='content__wrapper'>
															{model.defaultBlogId === 9 && <StoryType storyType={storyType} withPermalink outlined/>}
															<Headline
																value={headline}
																tag={model.defaultBlogId === 9 ? 'h2' : 'h5'}
																withPermalink />
															{model.defaultBlogId === 9 && <Excerpt
																value={plaintext}
																truncateAt={model.defaultBlogId === 9 ? 0 : 100}
															/>
															}
															{model.defaultBlogId === 9 ?
																<Author author={authorValue} /> :
																<ReadMore href={articleHref} title='Continue reading' /> }
														</div>
													</div>
												</StoryCard>
											);
										}}
									</Card>
								))}
						</Grid>
					);
				}}
			</CurationLayout>);
	});
