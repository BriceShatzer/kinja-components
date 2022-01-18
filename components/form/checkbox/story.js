/* @flow */

import * as React from 'react';
import {
	action,
	blogGroup,
	boolean,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';

import Theme from 'kinja-components/components/theme';
import Checkbox from './checkbox';
import README from './README.md';

storiesOf('3. Elements|Form/Checkbox', module)
	.addDecorator(withDocs(README))
	.add('Checkbox', () => (
		<Theme>
			<Checkbox
				blogTheme={blogGroup()}
				checked={boolean('Checked', true)}
				error={text('Error message', '')}
				inlineHelp={text('Inline Help', '')}
				label={text('Label', 'Checkbox label')}
				name="check"
				onChange={action('checkbox change')}
				value={text('Value', 'value')}
			/>
		</Theme>
	));
