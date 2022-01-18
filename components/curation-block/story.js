/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	blogGroup,
	action
} from 'base-storybook';
import FourCardModular from './layouts/four-card-modular';
import FiveCardModular from './layouts/five-card-modular';
import FiveCardTwoColumn from './layouts/five-card-two-columns';
import EightCardModular from './layouts/eight-card-modular';
import Video from './video';
import HorizontalList from './layouts/horizontal-list';
import CompactHorizontalList from './layouts/compact-horizontal-list';
import ThreeCardHorizontalList from './layouts/three-card-horizontal-list';
import SixCardModularWithLatest from './layouts/six-card-modular-with-latest';
import SixCardGrid from './layouts/six-card-grid';
import SingleStory from './layouts/single-story';
import FeaturedStory from './layouts/featured-story';
import README from './README.md';
import post1JSON from '../../__stubs__/stubbedPost.6.json';
import post2JSON from '../../__stubs__/stubbedPost.2.json';
import post3JSON from '../../__stubs__/stubbedPost.3.json';
import post4JSON from '../../__stubs__/stubbedPost.4.json';
import post5JSON from '../../__stubs__/stubbedPost.5.json';
import videosJSON from '../../__stubs__/recentVideos.json';
import Post from 'kinja-magma/models/Post';
import Theme from '../theme';
import EnsureDefaultTheme from '../theme/ensureDefaultTheme';
import Page from '../page-layout/homepage-page19';
import Main from '../page-layout/main';
import EmptyCard from './cards/empty-card';
import StandardBlockSettings from './block-settings/standard-block-settings';

const post1 = Post.fromJSON(post1JSON);
const post2 = Post.fromJSON(post2JSON);
const post3 = Post.fromJSON(post3JSON);
const post4 = Post.fromJSON(post4JSON);
const post5 = Post.fromJSON(post5JSON);
const [video1, video2, video3, video4] = videosJSON;

storiesOf('4. Components|CurationBlock|Blocks', module)
	.addDecorator(withDocs(README))
	.add('SixCardModularWithLatest', () => (
		<Theme blog={blogGroup()}>
			<Page>
				<Main>
					<SixCardModularWithLatest
						posts={[post1, post2, post3, post4, post5, post1, post2, post3, post1, post2, post3, post4, post5]}
						index={0}
					/>
				</Main>
			</Page>
		</Theme>
	))
	.add('EightCardModular', () => (
		<Theme blog={blogGroup()}>
			<Page>
				<Main>
					<EightCardModular
						posts={[post1, post2, post3, post4, post5, post1, post2, post3]}
						index={0}
					/>
				</Main>
			</Page>
		</Theme>
	))
	.add('FiveCardModular', () => (
		<Theme blog={blogGroup()}>
			<Page>
				<Main>
					<FiveCardModular
						posts={[post1, post2, post3, post4, post5]}
						index={0}
					/>
				</Main>
			</Page>
		</Theme>
	))
	.add('FiveCardTwoColumn', () => (
		<Theme blog={blogGroup()}>
			<Page>
				<Main>
					<FiveCardTwoColumn
						posts={[post1, post2, post3, post4, post5]}
						index={0}
					/>
				</Main>
			</Page>
		</Theme>
	))
	.add('FourCardModular', () => (
		<Theme blog={blogGroup()}>
			<Page>
				<Main>
					<FourCardModular
						posts={[post4, post2, post3, post1]}
						index={0}
					/>
				</Main>
			</Page>
		</Theme>
	))
	.add('SixCardGrid', () => (
		<Theme blog={blogGroup()}>
			<Page>
				<Main>
					<SixCardGrid
						posts={[post4, post2, post3, post1, post3, post1]}
						index={0}
						header={{
							title: 'Reviews',
							links: [],
							useLogo: false
						}}
					/>
				</Main>
			</Page>
		</Theme>
	))
	.add('HorizontalList', () => (
		<Theme blog={blogGroup()}>
			<Page>
				<Main>
					<HorizontalList
						posts={[post1, post2, post3, post4]}
						header={{
							title: 'Reviews',
							links: [],
							useLogo: false
						}}
						index={0}
					/>
				</Main>
			</Page>
		</Theme>
	))
	.add('CompactHorizontalList', () => (
		<Theme blog={blogGroup()}>
			<Page>
				<Main>
					<CompactHorizontalList
						posts={[post1, post2, post3, post4]}
						header={{
							title: 'Reviews',
							links: [],
							useLogo: false
						}}
						index={0}
					/>
				</Main>
			</Page>
		</Theme>
	))
	.add('ThreeCardHorizontalList', () => (
		<Theme blog={blogGroup()}>
			<Page>
				<Main>
					<ThreeCardHorizontalList
						posts={[post1, post2, post3, post4]}
						header={{
							title: 'Reviews',
							links: [],
							useLogo: false
						}}
						index={0}
					/>
				</Main>
			</Page>
		</Theme>
	))
	.add('EmptyCard', () => (
		<EnsureDefaultTheme>
			<EmptyCard
				blockIndex={0}
				index={0}
				onDrop={() => {}}
			/>
		</EnsureDefaultTheme>
	))
	.add('SingleStory', () => (
		<EnsureDefaultTheme>
			<Page>
				<Main>
					<SingleStory
						post={post1}
						header={{
							title: 'Reviews',
							links: [],
							useLogo: false
						}}
						index={0}
					/>
				</Main>
			</Page>
		</EnsureDefaultTheme>
	))
	.add('FeaturedStory', () => (
		<EnsureDefaultTheme>
			<Page>
				<Main>
					<FeaturedStory
						post={post1}
						index={0}
					/>
				</Main>
			</Page>
		</EnsureDefaultTheme>
	))
	.add('Video', () => (
		<EnsureDefaultTheme>
			<Page>
				<Main>
					<Video
						videos={[video1, video2, video3, video4]}
					/>
				</Main>
			</Page>
		</EnsureDefaultTheme>
	))
	.add('StandardBlockSettings', () => (
		<EnsureDefaultTheme>
			<StandardBlockSettings
				blogName={'Gizmodo'}
				onCancel={action('cancel')}
				onSave={action('save')}
			/>
		</EnsureDefaultTheme>
	));