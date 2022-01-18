/* @flow */
import * as React from 'react';
import {
	select,
	storiesOf,
	withDocs
} from 'base-storybook';
import { EnsureDefaultTheme } from '../../theme';
import PermalinkByline from './permalink-byline';
import README from './README.md';
import TagDropdown from './tag-dropdown';
import post from '../../../__stubs__/stubbedPost.json';
import gizmodo from '../../../__stubs__/gizmodo.json';
import Tag from 'kinja-magma/models/Tag';

const t1 = new Tag({
	canonical: 'supermarioodyssey',
	urlName: 'super-mario-odyssey',
	displayName: 'Super Mario Odyssey'
});
const t2 = new Tag({
	canonical: 'review',
	urlName: 'review',
	displayName: 'Review'
});
const t3 = new Tag({
	canonical: 'nintendoswitch',
	urlName: 'nintendo-switch',
	displayName: 'Nintendo Switch'
});
const t4 = new Tag({
	canonical: 'nintendo',
	urlName: 'nintendo',
	displayName: 'Nintendo'
});
const t5 = new Tag({
	canonical: 'mario',
	urlName: 'mario',
	displayName: 'Mario'
});
const t6 = new Tag({
	canonical: 'kotakucore',
	urlName: 'kotakucore',
	displayName: 'kotakucore'
});
const singleTags = [t1];
const multipleTags = [t1, t2, t3, t4, t5, t6];

storiesOf('3. Elements|Post Elements/TagDropdown', module)
	.addDecorator(withDocs(README))
	.add('TagDropdown', () => {
		return <TagDropdown tags={multipleTags} alternativeFiledToText={''} />;
	});
storiesOf('3. Elements|Post Elements/PermalinkByline', module)
	.addDecorator(withDocs(README))
	.add('PermalinkByline', () => {
		const tags = select('Tags', { multiple: 'multiple', single: 'single'});
		const singleOrMultipleAuthors = select('Authors', { multiple: 'multiple', single: 'single'});
		const authors = singleOrMultipleAuthors === 'single' ? [post.authors[0]] : post.authors;
		if (tags === 'single') {
			post.tags = singleTags;
		} else {
			post.tags = multipleTags;
		}
		return (
			<React.Fragment>
				<EnsureDefaultTheme>
					<PermalinkByline authors={authors} blogProperties={gizmodo.properties} pageType={'permalink'} post={post} />
				</EnsureDefaultTheme>
			</React.Fragment>
		);
	});
