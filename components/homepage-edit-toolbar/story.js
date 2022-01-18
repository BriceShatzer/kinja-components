/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	boolean,
	action
} from 'base-storybook';
import HomepageEditToolbar from './homepage-edit-toolbar';
import LayoutSelector from './layout-selector';
import README from './README.md';
import EnsureDefaultTheme from '../theme/ensureDefaultTheme';
import Gear from '../icon19/Gear';

storiesOf('4. Components|CurationBlock|HomepageEditToolbar', module)
	.addDecorator(withDocs(README))
	.add('HomepageEditToolbar', () => (
		<EnsureDefaultTheme>
			<HomepageEditToolbar
				blogName="The Onion"
				hasFocusedElement={boolean('hasFocusedElement', false)}
				cardIsDragging={boolean('cardIsDragging', false)}
				onCancel={() => undefined}
				onSave={() => undefined}
				mode={boolean('Block Mode', true) ? 'BlockEditing' : 'CardEditing'}
				container={(document.getElementById('root'): any)}
				dispatch={() => undefined}
				onDrop={action('Card dropped on toolbar')}
				canUndo={true}
				canRedo={true}
			/>
		</EnsureDefaultTheme>
	))
	.add('LayoutSelector', () => (
		<EnsureDefaultTheme>
			<LayoutSelector
				onSelect={action('onSelect')}
				icon={<Gear />}
				label="Settings"
				variant="primary"
			/>
		</EnsureDefaultTheme>
	))
	.add('LayoutSelector', () => (
		<EnsureDefaultTheme>
			<LayoutSelector
				onSelect={action('onSelect')}
				icon={<Gear />}
				label="Settings"
				variant="primary"
			/>
		</EnsureDefaultTheme>
	));
