jest.mock('shortid');

import * as React from 'react';
import { mount } from 'enzyme';

import Curation from './curation';

import post1 from '../../__stubs__/stubbedPost.json';
import post2 from '../../__stubs__/stubbedPost.2.json';
import post3 from '../../__stubs__/stubbedPost.3.json';

import defaultLayouts from '../curation-layout/default-layouts-stub';

const items = [post1, post2, post3];

const gridConfig = {
	layout: {
		zones: [{
			dimension: '1fr',
			numberOfItems: 1
		}]
	},
	items: Array(6).fill(null)
		.reduce((acc, val, idx) =>
			[...acc, items[idx] || val], []
		)
};

function resolveItemMock() {
	return Promise.resolve(JSON.parse(JSON.stringify(require('../../__stubs__/stubbedPost.5.json'))));
}

function uploadControllerMock(x) {
	return Promise.resolve(x);
}

const props = {
	curationToolbarProps: {
		saveHandler: f => f
	},
	layoutProps: {
		defaultLayouts,
		gridConfig,
		externalAPI: {
			imageUploader: uploadControllerMock,
			resolveItem: resolveItemMock
		}
	},
	hasFetched: false,
	curationCustomOptions: {
		hideAuthorInfo: false,
		isOnion: false,
		kinjaEqualsNewDesign: false
	}
};

const emptyProps = {
	curationToolbarProps: {
		saveHandler: f => f
	},
	layoutProps: {
		defaultLayouts,
		gridConfig: {},
		externalAPI: {
			imageUploader: uploadControllerMock,
			resolveItem: resolveItemMock
		}
	},
	hasFetched: false,
	curationCustomOptions: {
		hideAuthorInfo: false,
		isOnion: false,
		kinjaEqualsNewDesign: false
	}
};

describe('<Curation />', () => {
	it('renders the curation module', () => {
		const wrapper = mount(<Curation {...props} />);
		expect(wrapper).toMatchSnapshot();
	});
	it('renders the empty curation module', () => {
		const wrapper = mount(<Curation {...emptyProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
