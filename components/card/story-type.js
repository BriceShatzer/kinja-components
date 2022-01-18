/* @flow */

import * as React from 'react';
import StoryTypeLabel from '../story-type-label';
import type { LabelProps } from '../story-type-label/story-type-label';
import Permalink from './permalink';
import { getBlogGroupFromBlogId } from '../../utils';
import { NETWORK_BLOGS } from '../../config/consts';

type StoryTypeProps = {
	storyType: {
		blogId: number,
		title: string,
		canonical: string
	},
	withPermalink: boolean,
	ga?: string,
	gaMobile?: string
} & LabelProps;

const StoryType = ({
	storyType,
	withPermalink,
	outlined,
	tall,
	large,
	dark,
	ga,
	gaMobile
}: StoryTypeProps) => {

	if (!storyType) {
		return <span />;
	}

	const maybeCanonicalHost = NETWORK_BLOGS.find(blog => storyType && blog.name === getBlogGroupFromBlogId(storyType.blogId));
	const canonicalHost = maybeCanonicalHost ? maybeCanonicalHost.url : '';
	const href = `${canonicalHost}/c/${storyType.canonical}`;

	return (
		<Permalink title={storyType.title} href={href} unlink={!withPermalink} ga={ga} gaMobile={gaMobile}>
			<StoryTypeLabel
				tag={storyType.title}
				outlined={outlined}
				tall={tall}
				large={large}
				dark={dark}
			/>
		</Permalink>
	);
};

export default StoryType;
