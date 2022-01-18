/* @flow */

import * as React from 'react';
import { storiesOf, withDocs, radios } from 'base-storybook';

import NativeAd from 'kinja-magma/models/NativeAd';
import Blog from 'kinja-magma/models/Blog';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import LeftRailNativeAd from '../left-rail/left-rail-native-ad';
import README from './README.md';

import nativeAds from '../__fixtures__/native-ads';
import blog from '../../../__stubs__/gizmodo.json';

storiesOf('4. Components|Post Promotion/NativeAd', module)
	.addDecorator(withDocs(README))
	.add('LeftRailNativeAd', () => {
		let nativeAdsID = 0;
		const labelPromotedFrom = 'Site Promoted From';
		const optionPromotedFrom = {
			Onion: 'onion',
			GMG: 'gmg',
			Commerce: 'commerce'
		};
		const defaultValuePromotedFrom = optionPromotedFrom.Commerce;
		const promotedFrom = radios(labelPromotedFrom, optionPromotedFrom, defaultValuePromotedFrom);

		if (promotedFrom === 'onion') {
			const labelType = 'Promotion Type';
			const optionType = {
				Editorial: 'editorial',
				'Editorial Sponsored': 'sponsored',
				'Onion Labs': 'onionlabs'
			};
			const defaultValueType = 'onionlabs';
			const type = radios(labelType, optionType, defaultValueType);

			switch (type) {
				case 'editorial':
					nativeAdsID = 4;
					break;
				case 'sponsored':
					nativeAdsID = 5;
					break;
				case 'onionlabs':
					nativeAdsID = 6;
					break;
			}
		} else if (promotedFrom === 'gmg') {
			const labelType = 'Promotion Type';
			const optionType = {
				Editorial: 'editorial',
				'Studio@Gizmodo': 'studioatgizmodo'
			};
			const defaultValueType = 'studioatgizmodo';
			const type = radios(labelType, optionType, defaultValueType);

			switch (type) {
				case 'editorial':
					nativeAdsID = 2;
					break;
				case 'studioatgizmodo':
					nativeAdsID = 3;
					break;
			}
		} else {
			const labelType = 'Promotion Type';
			const optionType = {
				Promotion: 'promotion',
				'Direct to Merchant': 'direct'
			};
			const defaultValueType = 'promotion';
			const type = radios(labelType, optionType, defaultValueType);

			switch (type) {
				case 'promotion':
					nativeAdsID = 0;
					break;
				case 'direct':
					nativeAdsID = 1;
					break;
			}
		}

		const currentPost = nativeAds.map(post => NativeAd.fromJSON(post))[nativeAdsID];

		const currentBlog = Blog.fromJSON({
			...blog,
			...{
				properties: {
					...blog.properties
				}
			}
		});

		return (
			<div style={{ maxWidth: 360, margin: '0 auto' }}>
				<EnsureDefaultTheme>
					<LeftRailNativeAd index={0} post={currentPost} currentBlog={currentBlog} />
				</EnsureDefaultTheme>
			</div>
		);
	});