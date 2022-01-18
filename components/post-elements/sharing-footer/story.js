/* @flow */

import * as React from 'react';
import {
	blogGroup,
	storiesOf,
	withDocs
} from 'base-storybook';
import { Theme } from '../../theme';
import SharingFooter from './sharing-footer';
import README from './README.md';
import { EnsureDefaultTheme } from '../../theme';

storiesOf('3. Elements|Post Elements/Sharing Footer', module)
	.addDecorator(withDocs(README))
	.add('SharingFooter', () => (
		<EnsureDefaultTheme>
			<Theme blog={blogGroup('blogGroup')}>
				<SharingFooter facebookShareUrl="test" twitterShareUrl="test" />
			</Theme>
		</EnsureDefaultTheme>
	));
