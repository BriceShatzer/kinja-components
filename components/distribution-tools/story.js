/* @flow */

import * as React from 'react';
import {
	storiesOf,
	boolean,
	withDocs
} from 'base-storybook';
import DistributionTools from './distribution-tools';
import README from './README.md';

const externalAPI = {
	imageUploader: () => new Promise(() => {}),
	updatePostModel: () => {}
};

const sharingMainImage = {
	id: 'ajmqmj59hnjhldutwhkn',
	format: 'jpg'
};

const properties = {
	hideFromRss: true,
	spliceToBlogHomePage: false,
	socialHeadline: 'social headline',
	headTitleTag: 'head title tag',
	socialDescription: 'social description',
	amazonUrl: 'amazon URL',
	amazonPrice: 'amazon price',
	amazonPromoCode: 'amazon promo code',
	mainTitle: 'main title'
};

storiesOf('4. Components|Editor/Distribution Tools', module)
	.addDecorator(withDocs(README))
	.add('Distribution Tools', () => (
		<div style={{
			width: '800px'
		}}>
			<DistributionTools
				autoRepostDisabled={true}
				socialShareSettings={false}
				sharingMainImage={sharingMainImage}
				externalAPI={externalAPI}
				canAutoRepostToParent={boolean('Can auto repost to parent?', true)}
				{...properties}
			/>
		</div>
	));
