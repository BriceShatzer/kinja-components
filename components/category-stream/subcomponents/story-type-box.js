/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import media from '../../../style-utils/media';
import imageUrl from 'kinja-images/imageUrl';
import { makeUrl } from './category-select';
import ContentSummary from '../../content-summary';
import Link, { Anchor } from '../../elements/link';
import StoryTypeLabel from 'kinja-components/components/story-type-label';

import type { StoryTypeBoxProps } from '../types';

const DisplayCategoryBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 1.5rem;

	${p => p.isWrapped && css`
		margin-bottom: 2.5rem;
		padding: ${p => p.theme.columnPadding} 0;
		background-color: ${p => p.theme.color.whitesmoke};
	`}
`;

const DisplayCategoryBoxTitle = styled.h2`
	margin: 0;
`;

const DisplayCategoryBoxDescription = styled.div`
	font-family: ${p => p.theme.typography.body.fontFamily};
	font-size: 14px;
	line-height: 1.5;
	color: ${p => p.theme.color.darkgray};
	margin-top: 0.5rem;

	${media.smallOnly`
		margin-bottom: 1.5rem;
	`};
`;

const DisplayCategoryBoxAsset = styled.div`
	flex: 1;
	padding: 0 ${p => p.theme.columnPadding};

	img {
		display: block;
		width: 100%;
	}
`;

const StoryTypeLabelWrapper = styled.div`
	display: flex;
	max-width: 100%;
	margin-bottom: 15px;

	${Anchor}:hover {
		text-decoration: none;
	}
`;

/*
 * A story type box
 */
const StoryTypeBox = ({
	category,
	subcategory,
	storyType,
	canonicalHost,
	newStaticStreamHeader
}: StoryTypeBoxProps): React$Node => {
	if (storyType && !category && !newStaticStreamHeader) {
		return (
			<ContentSummary
				title={storyType.title}
				summary={storyType.description}
				image={storyType.image}
				canonical={storyType.canonical}
				canonicalHost={canonicalHost}
				contentType={storyType.content}
				hideNavigation
				analyticsEventContext='Boilerplate - Story Type'
				ga={() => {}}
			/>
		);
	}

	const displayCategory = subcategory ? subcategory : category;

	if (!displayCategory) {
		return null;
	}

	const { image } = displayCategory;
	const displayTitle = subcategory && category ?
		`${category.title} - ${subcategory.title}` :
		category && category.title;

	return (
		<DisplayCategoryBox isWrapped={image}>

			{image && image.id && image.format && (
				<DisplayCategoryBoxAsset>
					<img src={imageUrl(image.id, 'KinjaCenteredMediumAuto', image.format)} border='0' />
				</DisplayCategoryBoxAsset>
			)}

			<DisplayCategoryBoxAsset>

				{(category || subcategory) && (
					<StoryTypeLabelWrapper>
						<Link href={makeUrl(storyType.path)}>
							<StoryTypeLabel tag={storyType.title} tall outlined/>
						</Link>
					</StoryTypeLabelWrapper>
				)}

				<DisplayCategoryBoxTitle>
					{displayTitle}
				</DisplayCategoryBoxTitle>

				{displayCategory.description && (
					<DisplayCategoryBoxDescription>
						{displayCategory.description}
					</DisplayCategoryBoxDescription>
				)}

			</DisplayCategoryBoxAsset>

		</DisplayCategoryBox>
	);
};

export default StoryTypeBox;
