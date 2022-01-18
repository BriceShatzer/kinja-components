// @flow

import React from 'react';
import {
	options,
	storiesOf,
	withDocs,
	boolean
} from 'base-storybook';
import README from './README.md';

import Blog from 'kinja-magma/models/Blog';
import Post from 'kinja-magma/models/Post';
import SidebarPost from 'kinja-magma/models/SidebarPost';
import NativeShareLabel from './native-share-label';

import gizmodoPostJSON from './__fixtures__/gizmodoPost.json';
import onionPostJSON from './__fixtures__/onionPost.json';
import dealsPostJSON from './__fixtures__/dealsPost.json';

const createBlog = (blog: string, properties = {}) =>
	Blog.fromJSON({
		id: 1,
		name: blog,
		canonicalHost: `${blog}.com`,
		displayName: blog,
		blogGroup: properties.blogGroup,
		hosts: [''],
		status: 'ENABLED',
		locale: 'en-US',
		timezone: '',
		timezoneOffset: 1,
		properties
	});

const OnionBlog = createBlog('The Onion', {
	recircGroup: 'fmgSatire',
	blogGroup: 'theonion'
});
const EsGizmodo = createBlog('Gizmodo en Español', {
	locale: 'es-ES',
	blogGroup: 'gizmodo'
});
const GizmodoBlog = createBlog('Gizmodo', {
	recircGroup: 'fmgNonSatire',
	blogGroup: 'gizmodo'
});
const DealsBlog = createBlog('Kinja Deals', {
	recircGroup: 'fmgBusiness',
	blogGroup: 'theinventory'
});

const GizmodoPost = SidebarPost.fromPost(
	Post.fromJSON(gizmodoPostJSON),
	GizmodoBlog
);
const OnionPost = SidebarPost.fromPost(Post.fromJSON(onionPostJSON), OnionBlog);
const KinjaDealsPost = SidebarPost.fromPost(
	Post.fromJSON(dealsPostJSON),
	DealsBlog
);

const designPhaseVersion = () => options('version', {
	'1': '1',
	'2': '2'
}, '1', {
	display: 'inline-radio'
});

storiesOf('3. Elements|Post Elements/Native Share Label', module)
	.addDecorator(withDocs(README))
	.add('NativeShareLabel', () => (
		<div>
			<blockquote>
				<h3>Gizmodo post on The Onion</h3>
				<NativeShareLabel
					blog={OnionBlog}
					defaultBlogDisplayName={GizmodoPost.defaultBlogDisplayName}
					defaultBlogRecircGroup={GizmodoPost.defaultBlogRecircGroup}
					defaultBlogGroup={GizmodoPost.defaultBlogGroup}
					isDeals={GizmodoPost.isDeals}
					isNative={false}
					isSplice={true}
					version={designPhaseVersion()}
					hideBlogAvatar={boolean('hideBlogAvatar', false)}
				/>
			</blockquote>
			<blockquote>
				<h3>The Onion post on Gizmodo</h3>
				<NativeShareLabel
					blog={GizmodoBlog}
					defaultBlogDisplayName={OnionPost.defaultBlogDisplayName}
					defaultBlogRecircGroup={OnionPost.defaultBlogRecircGroup}
					defaultBlogGroup={OnionPost.defaultBlogGroup}
					isDeals={OnionPost.isDeals}
					isNative={false}
					isSplice={true}
					version={designPhaseVersion()}
					hideBlogAvatar={boolean('hideBlogAvatar', false)}
				/>
			</blockquote>
			<blockquote>
				<h3>Kinja Deals post on Gizmodo</h3>
				<NativeShareLabel
					blog={GizmodoBlog}
					defaultBlogDisplayName={KinjaDealsPost.defaultBlogDisplayName}
					defaultBlogRecircGroup={KinjaDealsPost.defaultBlogRecircGroup}
					defaultBlogGroup={KinjaDealsPost.defaultBlogGroup}
					isDeals={KinjaDealsPost.isDeals}
					isNative={false}
					isSplice={true}
					version={designPhaseVersion()}
				/>
			</blockquote>
			<blockquote>
				<h3>Kinja Deals post on Gizmodo ES</h3>
				<NativeShareLabel
					blog={EsGizmodo}
					defaultBlogDisplayName={KinjaDealsPost.defaultBlogDisplayName}
					defaultBlogRecircGroup={KinjaDealsPost.defaultBlogRecircGroup}
					defaultBlogGroup={KinjaDealsPost.defaultBlogGroup}
					isDeals={KinjaDealsPost.isDeals}
					isNative={false}
					isSplice={true}
					version={designPhaseVersion()}
				/>
			</blockquote>
			<blockquote>
				<h3>Kinja Deals post on Gizmodo without avatar</h3>
				<NativeShareLabel
					blog={OnionBlog}
					defaultBlogDisplayName={KinjaDealsPost.defaultBlogDisplayName}
					defaultBlogRecircGroup={KinjaDealsPost.defaultBlogRecircGroup}
					defaultBlogGroup={KinjaDealsPost.defaultBlogGroup}
					hideBlogAvatar
					isDeals={KinjaDealsPost.isDeals}
					isNative={false}
					isSplice={true}
					version={designPhaseVersion()}
				/>
			</blockquote>
			<blockquote>
				<h3>Gizmodo post on io9 with shared label</h3>
				<NativeShareLabel
					blog={GizmodoBlog}
					defaultBlogDisplayName="io9"
					defaultBlogRecircGroup="fmgNonSatire"
					defaultBlogGroup="gizmodo"
					showSharedLabel
					isDeals={false}
					isNative={false}
					isSplice={true}
					version={designPhaseVersion()}
				/>
			</blockquote>
			<blockquote>
				<h3>Sponsored post on gizmodo (phase 1: with shared label)</h3>
				<NativeShareLabel
					blog={GizmodoBlog}
					defaultBlogDisplayName="Bespoke Post"
					defaultBlogRecircGroup={undefined}
					defaultBlogGroup=""
					showSharedLabel
					showExternalIcon
					isDeals={false}
					isNative={true}
					isSplice={false}
					version={designPhaseVersion()}
				/>
			</blockquote>
		</div>
	));
