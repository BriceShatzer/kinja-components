/* @flow */

import React from 'react';
import styled from 'styled-components';

import {
	StreamStoryTypeClick,
	ExternalPostClick
} from 'kinja-components/components/stream/analytics';
import Link from 'kinja-components/components/elements/link';
import StoryTypeLabel from 'kinja-components/components/story-type-label';
import type { MetaInfoProps } from './meta-info';

const LinkWrapper = styled(Link)`
	&:hover {
		text-decoration: none;
	}
`;

function LabelStoryType({
	blog,
	index,
	isExternalPost,
	pageType,
	post,
	storyType
}: MetaInfoProps): React$Node {
	if (!post || !storyType || !storyType.title) {
		return null;
	}

	const storyTypeHost = (post && post.permalinkHost && post.permalinkHost.replace('http(s)://(//)?', 'https://')) || (blog && blog.canonicalHost) || '';
	const storyTypeLink = `${storyTypeHost}/c/${storyType.canonical}`;

	return (
		<LinkWrapper
			href={storyTypeLink}
			events={[
				StreamStoryTypeClick(index, storyTypeLink, pageType),
				isExternalPost ? ExternalPostClick(index, storyTypeLink) : undefined
			].filter(Boolean)}
		>
			<StoryTypeLabel tag={storyType.title} />
		</LinkWrapper>
	);
}

export default LabelStoryType;
