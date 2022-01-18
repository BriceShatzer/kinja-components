/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	blogGroup
} from 'base-storybook';

import AuthorBio from './author-bio';
import Theme from '../theme';
import README from './README.md';
import { props } from './stub.js';

storiesOf('4. Components|AuthorBio', module)
	.addDecorator(withDocs(README))
	.add('Author Bio', () => (
		<Theme blog={blogGroup()}>
			<AuthorBio {...props} withStandardGrid />
		</Theme>
	));
