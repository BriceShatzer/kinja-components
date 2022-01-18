// @flow

import * as React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import StoryTypeLabel, { StoryTypeLabelWrapper } from '../story-type-label';
import { default as LinkElement } from '../elements/link';
import { PermalinkStoryTypeClick } from './analytics';

// ICONS
import DoubleChevronRightIcon from '../icon19/DoubleChevronRight';

import type TypedTagData from 'kinja-magma/models/TypedTagData';
import type StoryType from 'kinja-magma/models/StoryType';

type Props = {
	permalinkHost: string,
	categoryData: ?TypedTagData,
	subcategoryData: ?TypedTagData,
	storyType: ?StoryType
};

export const LinkWrapper = styled(LinkElement)`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	margin-right: 10px;
	&:hover {
		text-decoration: none;
	}
`;

export const BreadcrumbIcon = styled(DoubleChevronRightIcon)`
	position: relative;
	top: 4px;
	margin-right: 10px;
	min-width: 12px;

	svg {
		color: ${({ theme }) => theme.color.gray};
		width: 12px;
		margin-top: -2px;
	}
`;

const PermalinkStoryType = (props: Props) => {
	const {
		storyType, permalinkHost, categoryData, subcategoryData
	} = props;
	const storyTypeLink = storyType ? `${permalinkHost}/c/${storyType.canonical}` : '';

	return (
		<EnsureDefaultTheme>
			<StoryTypeLabelWrapper margin='medium'>
				{storyType && <LinkWrapper
					href={storyTypeLink}
					events={[PermalinkStoryTypeClick(`${permalinkHost}/c/${storyType.canonical}`)]}
				>
					{<StoryTypeLabel large tag={storyType.title} />}
				</LinkWrapper>}
				{categoryData && <React.Fragment>
					<BreadcrumbIcon />
					<LinkWrapper
						href={`${storyTypeLink}/${categoryData.canonicalName}`}
						events={[PermalinkStoryTypeClick(`${storyTypeLink}/${categoryData.canonicalName}`)]}
					>
						<StoryTypeLabel large tag={categoryData.valueDisplay} />
					</LinkWrapper>
				</React.Fragment>}
				{(categoryData && subcategoryData) && <React.Fragment>
					<BreadcrumbIcon />
					<LinkWrapper
						href={`${storyTypeLink}/${categoryData.canonicalName}/${subcategoryData.canonicalName}`}
						events={[PermalinkStoryTypeClick(`${storyTypeLink}/${categoryData.canonicalName}/${subcategoryData.canonicalName}`)]}
					>
						<StoryTypeLabel large tag={subcategoryData.valueDisplay} />
					</LinkWrapper>
				</React.Fragment>}
			</StoryTypeLabelWrapper>
		</EnsureDefaultTheme>
	);
};

export default PermalinkStoryType;
