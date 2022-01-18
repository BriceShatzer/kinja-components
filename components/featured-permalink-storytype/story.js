// @flow

import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	withDocs,
	blogGroup,
	boolean,
	select
} from 'base-storybook';

import TypedTagData from 'kinja-magma/models/TypedTagData';
import StoryType from 'kinja-magma/models/StoryType';
import README from './README.md';
import FeaturedPermalinkStoryType from './';
import Theme from '../theme';

const storyType = StoryType.fromJSON({
	id: '1852',
	blogId: 4,
	canonical: 'garbage',
	title: 'Garbage',
	content: 'Standard',
	description: 'This week, we are writing about waste and trash, examining the junk that dominates our lives, and digging through garbage for treasure.',
	boilerplate: 'This week, we are writing about waste and trash, examining the junk that dominates our lives, and digging through garbage for treasure.',
	image: { id: 'n3zs3z5koiuabnvzl7dv', format: 'png' },
	index: undefined
});
const categoryData = TypedTagData.fromJSON({
	id: 1336,
	storyTypeId: 169,
	canonicalName: 'game-of-thrones-newbies',
	displayName: 'Game Of Thrones (newbies)'
});
const subcategoryData = TypedTagData.fromJSON({
	id: 6015,
	storyTypeId: 169,
	canonicalName: 'season-8',
	displayName: 'Season 8',
	parentId: 1336
});

const Background = styled.div`
	background: ${props => props.background === 'White' ?
		props.theme.color.white : props.theme.color.black};
	width: ${props => props.theme.featuredContentWidth};
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
`;

storiesOf('4. Components|Featured permalink storytype', module)
	.addDecorator(withDocs(README))
	.add('Featured permalink storytype', () => {
		const background = select('Background', ['White', 'Black'], 'Black');
		const hasCategoryData = boolean('Has category data?', true);

		return (
			<Theme blog={blogGroup()}>
				<Background background={background}>
					<FeaturedPermalinkStoryType
						permalinkHost=""
						storyType={storyType}
						categoryData={hasCategoryData && categoryData}
						subcategoryData={hasCategoryData && subcategoryData}
						background={background}
					/>
				</Background>
			</Theme>
		);
	});
