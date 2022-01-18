/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	number,
	text,
	boolean
} from 'base-storybook';
import LinkPreview from './link-preview';
import internalLink from './__fixtures__/internal-link.json';
import externalLink from './__fixtures__/external-link.json';
import commerceLink from './__fixtures__/commerce-link.json';
import './story.sass';
import README from './README.md';

storiesOf('4. Components|Post Body/Link Preview', module)
	.addDecorator(withDocs(README))
	.addDecorator(story => <div className="post-content">{story()}</div>)
	.add('Link Preview - Kinja internal link', () => (
		<LinkPreview
			url={internalLink.url}
			link={internalLink}
			style="Normal"
			isInternal
		/>
	))
	.add('Link Preview - External link', () => (
		<LinkPreview
			url={externalLink.url}
			link={externalLink}
			style="Normal"
			isInternal={false}
		/>
	))
	.add('Link Preview - Commerce', () => {
		const link = {
			...commerceLink,
			headline: text('Headline', commerceLink.headline),
			provider: text('Provider', commerceLink.provider),
			meta: {
				...commerceLink.meta,
				priceV2: number('Price', Number(commerceLink.meta.priceV2)),
				promocode: text('Promo code', ''),
				conversions: number('Conversions', Number(commerceLink.meta.conversions))
			}
		};
		const listItem = boolean('Show as list item', false);
		return (
			<LinkPreview
				url={commerceLink.url}
				link={link}
				cleanedUrl={commerceLink.url}
				permalinkUrl="https://deals.kinja.com/this-is-probably-the-best-deal-ever-on-our-favorite-sha-1823580393"
				style={listItem ? 'CommerceList' : 'CommerceCondensed'}
				isInternal={false}
				isGmgBlog
				tag="deals"
				subtag="deals-subtag"
			/>
		);
	})
	.add('Link Preview - Commerce - no price', () => {
		const link = {
			...commerceLink,
			headline: text('Headline', commerceLink.headline),
			provider: text('Provider', commerceLink.provider),
			meta: {
				asin: commerceLink.meta.asin,
				promocode: text('Promo code', ''),
				conversions: number('Conversions', Number(commerceLink.meta.conversions))
			}
		};
		const listItem = boolean('Show as list item', false);
		return (
			<LinkPreview
				url={commerceLink.url}
				link={link}
				cleanedUrl={commerceLink.url}
				permalinkUrl="https://deals.kinja.com/this-is-probably-the-best-deal-ever-on-our-favorite-sha-1823580393"
				style={listItem ? 'CommerceList' : 'CommerceCondensed'}
				isInternal={false}
				isGmgBlog
				tag="deals"
				subtag="deals-subtag"
			/>
		);
	});
