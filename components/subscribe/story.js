/* @flow */

import * as React from 'react';
import {
	action,
	boolean,
	select,
	storiesOf,
	withDocs
} from 'base-storybook';

import Subscribe from './subscribe';
import SubscribeConfirm from './subscribeConfirm';
import subscribeTranslations from './subscribeTranslations';
import createTranslate from '../translator';

import README from './README.md';
import styles from './story.sass';

import blog1 from '../../__stubs__/gizmodo.json';
import Blog from 'kinja-magma/models/Blog';

const Blog1 = Blog.fromJSON(blog1);

const stubbedApiProps = {
	subscriptionsApi: {
		subscribe: e => {
			action('subscribing via Campaign Monitor')(e);

			return Promise.resolve(true);
		}
	},
	getGeoCC: () => {
		const geocc = 'hu';

		action('getting user\'s country code from the geocc cookie')(geocc);

		return Promise.resolve(geocc);
	}
};

const subscribeProps = (blog, language) => ({
	...stubbedApiProps,
	customSubscribeCopyEnabled: boolean('Custom subscribe copy enabled', false),
	blogGroup: blog.blogGroup,
	blogId: blog.id,
	displayName: blog.displayName,
	language,
	sourceId: 'mobile_stream'
});

storiesOf('4. Components|Subscribe', module)
	.addDecorator(withDocs(README))
	.add('without mailing lists (Campaign Monitor)', () => {
		const language = select('Locale', {
			'en-US': 'English (en)',
			'es-ES': 'Spanish (es)'
		}, 'en-US');

		return (
			<div className="newsletter-btn--mid-articles">
				<Subscribe {...subscribeProps(Blog1, language)} campaignMonitorNewsletterName='fakeKey' />
			</div>
		);
	})
	.add('confirmation dialog (Campaign Monitor)', () => {
		const language = select('Locale', {
			'en-US': 'English (en)',
			'es-ES': 'Spanish (es)'
		}, 'en-US');

		return (
			<SubscribeConfirm
				{...subscribeProps(Blog1)}
				doubleOptIn={boolean('Double opt in', false)}
				isOpen={boolean('Is open', true)}
				toggleConfirmModal={action('Confirm modal clicked')}
				translate={createTranslate(subscribeTranslations, language)}
			/>
		);
	});
