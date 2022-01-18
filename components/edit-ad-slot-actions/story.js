import * as React from 'react';
import {
	storiesOf,
	action,
	withDocs,
	select,
	blogGroup
} from 'base-storybook';

import Theme from 'kinja-components/components/theme';

import { elements } from '../elements';

import EditAdSlotActions from './edit-ad-slot-actions';
import MovableAdSlot from './movable-ad-slot';

import README from './README.md';

storiesOf('4. Components|EditAdSlotActions', module)
	.addDecorator(withDocs(README))
	.add('EditAdSlotActions', () => (
		<Theme blog={blogGroup()}>
			<elements.FixedToolbar>
				<EditAdSlotActions
					onSave={() => (new Promise(resolve => setTimeout(() => {action('save started'); resolve();}, 3000)))}
					onCancel={action('cancel')}
					onReset={action('reset')}
				/>
			</elements.FixedToolbar>
		</Theme>
	))
	.add('MovableAdSlot', () => {
		return (
			<Theme blog={blogGroup()}>
				<MovableAdSlot
					onMoveUp={action('onMoveUp')}
					onRemove={action('onRemove')}
					onMoveDown={action('onMoveDown')}
					locale={select('Locale', {
						'en-US': 'English (en)',
						'es-ES': 'Spanish (es)'
					}, 'en-US')}
				/>
			</Theme>
		);
	});
