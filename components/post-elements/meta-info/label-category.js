/* @flow */

import React from 'react';
import styled from 'styled-components';

import {
	StreamCategoryClick,
	ExternalPostClick
} from 'kinja-components/components/stream/analytics';
import Link from 'kinja-components/components/elements/link';
import StoryTypeLabel from 'kinja-components/components/story-type-label';

// ICONS
import DoubleChevronRightIcon from '../../icon19/DoubleChevronRight';

import type { MetaInfoProps } from './meta-info';

const LinkWrapper = styled(Link)`
	&:hover {
		text-decoration: none;
	}
`;

const BreadcrumbIcon = styled(DoubleChevronRightIcon)`
	width: 14px;
	height: 14px;
	margin-right: 5px;
	margin-top: -6px;
`;

function LabelCategory({
	canonicalHost,
	category,
	index,
	isExternalPost,
	pageType,
	storyType
}: MetaInfoProps): React$Node {
	if (!storyType || !category || !category.valueDisplay || !canonicalHost) {
		return null;
	}

	const categoryLink = `https://${canonicalHost}/c/${storyType.canonical}/${category.canonicalName}`;

	return (
		<React.Fragment>
			<BreadcrumbIcon />
			<LinkWrapper
				href={categoryLink}
				events={[
					StreamCategoryClick(index, categoryLink, pageType),
					isExternalPost ? ExternalPostClick(index, categoryLink) : undefined
				].filter(Boolean)}
			>
				<StoryTypeLabel tag={category.valueDisplay} />
			</LinkWrapper>
		</React.Fragment>
	);
}

export default LabelCategory;
