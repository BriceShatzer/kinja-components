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
import SaveBadge from './save-badge';
import README from './README.md';

storiesOf('3. Elements|Post Elements/Badge', module)
	.addDecorator(withDocs(README))
	.add('SaveBadge', () => (
		<Theme blog={blogGroup('blogGroup')}>
			<SaveBadge
				saveCount={number('saveCount', 0)}
				iconOnly={boolean('iconOnly', false)}
				isSaved={boolean('isSaved', false)}
				withoutThemeColor={boolean('withoutThemeColor', true)}
				isVertical={boolean('isVertical', false)}
				label={text('label', 'Save')}
			/>
		</Theme>
	));
