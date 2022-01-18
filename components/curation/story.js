import * as React from 'react';
import {
	action,
	storiesOf,
	withDocs
} from 'base-storybook';
import { cloneDeep } from 'lodash';
import Curation from './curation';
import README from './README.md';
import './story.sass';

import post1 from '../../__stubs__/stubbedPost.json';
import post2 from '../../__stubs__/stubbedPost.2.json';
import post3 from '../../__stubs__/stubbedPost.3.json';
import post4 from '../../__stubs__/stubbedPost.4.json';
import post5 from '../../__stubs__/stubbedPost.5.json';

import defaultLayouts from '../curation-layout/default-layouts-stub';

import CurationItem from 'kinja-magma/models/CurationItem';

const items = [post1, post2, post3, post4].map(item => CurationItem.fromJSON(item));
const itemsForTertiary = [post1, post2, post3, {
	hasChildren: true,
	headline: 'Recent Reviews',
	items: cloneDeep(items)
}].map(item => CurationItem.fromJSON(item));

const gridConfig = {
	layout: {
		group: 'Modular',
		cardinality: 4,
		zones: defaultLayouts
			.filter(g => g.group === 'Modular')
			.filter(c => c.cardinality === 4)[0]
			.zones
	},
	items
};

const gridConfigForTertiary = {
	layout: {
		group: 'Modular',
		cardinality: 4,
		zones: defaultLayouts
			.filter(g => g.group === 'Modular')
			.filter(c => c.cardinality === 4)[0]
			.zones
	},
	items: itemsForTertiary
};

const gridConfigEmpty = {};

function resolveItemMock() {
	return Promise.resolve(post5);
}

function uploadControllerMock(x) {
	return Promise.resolve(x);
}

storiesOf('4. Components|Post Promotion/Curation/Curation Module', module)
	.addDecorator(withDocs(README))
	.add('Module - no edit mode - top module', () => {
		const props = {
			layoutProps: {
				defaultLayouts,
				gridConfig
			},
			curationCustomOptions: {
				hideAuthorInfo: false,
				isOnion: false,
				kinjaEqualsNewDesign: false
			},
			hasPermission: false
		};
		return (
			<Curation {...props} />
		);
	})
	.add('Module - no edit mode - permalink module', () => {
		const props = {
			layoutProps: {
				defaultLayouts,
				gridConfig
			},
			curationCustomOptions: {
				hideAuthorInfo: false,
				isOnion: false,
				kinjaEqualsNewDesign: false,
				curationType: 'permalink'
			},
			hasPermission: false
		};
		return (
			<Curation {...props} />
		);
	})
	.add('Module', () => {
		const props = {
			curationToolbarProps: {
				saveHandler: () => action('save...')
			},
			layoutProps: {
				defaultLayouts,
				gridConfig,
				externalAPI: {
					imageUploader: () => Promise.resolve({}),
					resolveItem: () => Promise.resolve(post1),
					returnValidCurationModel: () => post1,
					saveLayoutAndItems: () => Promise.resolve({}),
					getParentBlog: () => Promise.resolve({})
				}
			},
			curationCustomOptions: {
				hideAuthorInfo: false,
				isOnion: false,
				kinjaEqualsNewDesign: false
			},
			hasPermission: true
		};
		return (
			<Curation {...props} />
		);
	})
	.add('Module - with tertiary that has multiple items', () => {
		const props = {
			curationToolbarProps: {
				saveHandler: () => action('save...')
			},
			layoutProps: {
				defaultLayouts,
				gridConfig: gridConfigForTertiary,
				externalAPI: {
					imageUploader: () => Promise.resolve({}),
					resolveItem: () => Promise.resolve(post1),
					returnValidCurationModel: () => post1,
					saveLayoutAndItems: () => Promise.resolve({}),
					getParentBlog: () => Promise.resolve({})
				}
			},
			curationCustomOptions: {
				hideAuthorInfo: false,
				isOnion: false,
				kinjaEqualsNewDesign: false
			},
			hasPermission: true
		};
		return (
			<Curation {...props} />
		);
	})
	.add('Module - Empty state', () => {
		const props = {
			curationToolbarProps: {
				saveHandler: () => action('save...')
			},
			layoutProps: {
				defaultLayouts,
				gridConfig: gridConfigEmpty,
				externalAPI: {
					imageUploader: uploadControllerMock,
					resolveItem: resolveItemMock,
					returnValidCurationModel: () => post1,
					saveLayoutAndItems: () => console.log('saving'),
					getParentBlog: () => Promise.resolve({})
				}
			},
			hasPermission: true,
			curationCustomOptions: {
				hideAuthorInfo: false,
				isOnion: false,
				kinjaEqualsNewDesign: false
			}
		};
		return (
			<Curation {...props} />
		);
	});
