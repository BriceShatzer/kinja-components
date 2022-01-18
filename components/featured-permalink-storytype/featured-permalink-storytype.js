// @flow

import * as React from 'react';
import styled from 'styled-components';

import StoryTypeLabel, { StoryTypeLabelWrapper } from '../story-type-label';
import { Label } from '../story-type-label/story-type-label';
import Link from '../elements/link';
import { PermalinkStoryTypeClick } from '../permalink/analytics';
import type TypedTagData from 'kinja-magma/models/TypedTagData';
import type StoryType from 'kinja-magma/models/StoryType';
import PermalinkStoryType, { BreadcrumbIcon } from '../permalink/permalink-storytype';
import type { ImpactHeaderOverlay } from 'postbody/blockNodes/ImpactHeader';

type Props = {
	permalinkHost: string,
	categoryData: ?TypedTagData,
	subcategoryData: ?TypedTagData,
	storyType: ?StoryType,
	background?: ImpactHeaderOverlay
};

const getColor = ({ background, theme }) => {
	return background === 'White' ? theme.color.black : theme.color.white;
};

const getInverseColor = ({ background, theme }) => {
	return background === 'Black' ? theme.color.black : theme.color.white;
};

const StandaloneStoryType = styled.span``;

const StoryTypeWrapper = styled.div`
	max-width: 100%;

	${Label} {
		color: ${getColor};
	}

	${Label}:hover {
		color: ${props => props.theme.color.midgray};
	}

	${StandaloneStoryType} ${Label} {
		border-color: ${getColor};
	}

	${StandaloneStoryType}:hover ${Label} {
		color: ${getInverseColor};
		background: ${getColor};
	}

	a:hover {
		text-decoration: none;
	}

	${BreadcrumbIcon} {
		color: ${getColor};
		opacity: 0.5;
	}
`;

const FeaturedPermalinkStoryType = (props: Props) => {
	const {
		storyType, permalinkHost, categoryData, background
	} = props;
	const storyTypeLink = storyType ? `${permalinkHost}/c/${storyType.canonical}` : '';

	if (storyType && categoryData) {
		return (
			<StoryTypeWrapper background={background}>
				<PermalinkStoryType {...props}/>
			</StoryTypeWrapper>
		);
	}

	if (storyType) {
		return (
			<StoryTypeWrapper background={background}>
				<StoryTypeLabelWrapper margin='medium'>
					<Link
						href={storyTypeLink}
						events={[PermalinkStoryTypeClick(`${permalinkHost}/c/${storyType.canonical}`)]}
					>
						<StandaloneStoryType>
							{<StoryTypeLabel tall tag={storyType.title} outlined />}
						</StandaloneStoryType>
					</Link>
				</StoryTypeLabelWrapper>
			</StoryTypeWrapper>
		);
	}

	return null;
};

export default FeaturedPermalinkStoryType;
