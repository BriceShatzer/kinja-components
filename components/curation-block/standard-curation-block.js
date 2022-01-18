// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import type { CurationBlockLayout } from 'kinja-magma/models/CurationBlock';
import FourCardModular from './layouts/four-card-modular';
import FiveCardModular from './layouts/five-card-modular';
import FiveCardTwoColumn from './layouts/five-card-two-columns';
import EightCardModular from './layouts/eight-card-modular';
import HorizontalList from './layouts/horizontal-list';
import CompactHorizontalList from './layouts/compact-horizontal-list';
import ThreeCardHorizontalList from './layouts/three-card-horizontal-list';
import SixCardModularWithLatest from './layouts/six-card-modular-with-latest';
import SixCardGrid from './layouts/six-card-grid';
import SingleStory from './layouts/single-story';
import FeaturedStory from './layouts/featured-story';

type Props = {|
	posts: Array<Post | void>,
	layout: CurationBlockLayout,
	index: number
|}

export default function CurationBlockComponent(props: Props) {
	const { posts, layout, index } = props;
	switch (layout.type) {
		case 'FeaturedStory':
			return <FeaturedStory
				post={posts[0]}
				customStoryLabel={layout.customStoryLabel}
				index={index}
			/>;
		case 'SingleStory':
			return <SingleStory
				post={posts[0]}
				header={layout.header}
				index={index}
			/>;
		case 'FourCardModular':
			return <FourCardModular
				posts={posts}
				header={layout.header}
				index={index}
			/>;
		case 'FiveCardModular':
			return <FiveCardModular
				posts={posts}
				header={layout.header}
				index={index}
			/>;
		case 'FiveCardTwoColumn':
			return <FiveCardTwoColumn
				posts={posts}
				header={layout.header}
				index={index}
			/>;
		case 'EightCardModular':
			return <EightCardModular
				posts={posts}
				header={layout.header}
				index={index}
			/>;
		case 'SixCardGrid':
			return <SixCardGrid
				posts={posts}
				header={layout.header}
				index={index}
			/>;
		case 'HorizontalList':
			return <HorizontalList
				posts={posts}
				header={layout.header}
				index={index}
			/>;
		case 'CompactHorizontalList':
			return <CompactHorizontalList
				posts={posts}
				index={index}
			/>;
		case 'ThreeCardHorizontalList':
			return <ThreeCardHorizontalList
				posts={posts}
				header={layout.header}
				index={index}
			/>;
		case 'SixCardModularWithLatest':
			return <SixCardModularWithLatest
				posts={posts}
				index={index}
			/>;
		default:
			(layout.name: empty);
			throw new Error('Unexpected CurationBlock layout');
	}
}