/* @flow */

import * as React from 'react';
import {
	boolean,
	number,
	blogGroup,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';
import { Theme } from '../../theme';
import CommentBadge from './comment-badge';
import README from './README.md';

storiesOf('3. Elements|Post Elements/Badge', module)
	.addDecorator(withDocs(README))
	.add('CommentBadge', () => (
		<Theme blog={blogGroup('blogGroup')}>
			<CommentBadge
				count={number('count', 5)}
				iconOnly={boolean('iconOnly', false)}
				label={text('label', '')}
				space={text('space', '2px')}
			/>
		</Theme>
	));
