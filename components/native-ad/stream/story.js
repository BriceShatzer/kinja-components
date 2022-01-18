/* @flow */

import * as React from 'react';
import { storiesOf, withDocs, radios } from 'base-storybook';

import NativeAd from 'kinja-magma/models/NativeAd';
import Blog from 'kinja-magma/models/Blog';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import StreamNativeAd from './stream-native-ad';
import README from './README.md';

import nativeAds from '../__fixtures__/native-ads';
import blog from '../../../__stubs__/gizmodo.json';

storiesOf('4. Components|Post Promotion/NativeAd', module)
	.addDecorator(withDocs(README))
	.add('StreamNativeAd', () => {
		let nativeAdsID = 0;
		const currentBlogRecirc = radios('Current Blog’s Recirc Group', {
			'fmgNonSatire': 'fmgNonSatire',
			'fmgSatire': 'fmgSatire',
			'fmgBusiness': 'fmgBusiness',
			'partnerEditorial': 'partnerEditorial'
		}, 'fmgNonSatire');

		const revision = radios('Revision', {
			'Phase 1': '0',
			'Phase 2': '1',
			'Phase 3': '2'
		}, '2');

		const promotedFrom = radios('Site Promoted From', {
			Onion: 'onion',
			GMG: 'gmg',
			Commerce: 'commerce'
		}, 'commerce');

		if (promotedFrom === 'onion') {
			const type = radios('Promotion Type', {
				'Editorial': 'editorialonion',
				'Editorial Sponsored': 'sponsored',
				'Onion Labs': 'onionlabs'
			}, 'editorialonion');

			switch (type) {
				case 'editorialonion':
					nativeAdsID = 5;
					break;
				case 'sponsored':
					nativeAdsID = 6;
					break;
				case 'onionlabs':
					nativeAdsID = 7;
					break;
			}
		} else if (promotedFrom === 'gmg') {
			const type = radios('Promotion Type', {
				'Editorial': 'editorialgmg',
				'Studio@Gizmodo': 'studioatgizmodo'
			}, 'editorialgmg');

			switch (type) {
				case 'editorialgmg':
					nativeAdsID = 3;
					break;
				case 'studioatgizmodo':
					nativeAdsID = 4;
					break;
			}
		} else {
			const type = radios('Promotion Type', {
				Promotion: 'promotion',
				'Kinja Deals': 'kinjadeals',
				'Direct to Merchant': 'direct'
			}, 'promotion');

			switch (type) {
				case 'promotion':
					nativeAdsID = 0;
					break;
				case 'kinjadeals':
					nativeAdsID = 1;
					break;
				case 'direct':
					nativeAdsID = 2;
					break;
			}
		}

		const currentPost = nativeAds.map(post => NativeAd.fromJSON(post))[nativeAdsID];

		const currentBlog = Blog.fromJSON({
			...blog,
			...{
				properties: {
					...blog.properties,
					...{
						recircGroup: currentBlogRecirc
					}
				}
			}
		});

		return (
			<div style={{ maxWidth: '800px', minWidth: '100%', margin: '0 auto' }}>
				<EnsureDefaultTheme>
					<StreamNativeAd
						index={0}
						post={currentPost}
						blog={currentBlog}
						revision={Number(revision)}
					/>
				</EnsureDefaultTheme>
			</div>
		);
	});
