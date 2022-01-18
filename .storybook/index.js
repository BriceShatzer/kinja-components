export {
	configure,
	storiesOf,
	addDecorator,
	addParameters
} from '@storybook/react';

export {
	array,
	boolean,
	button,
	color,
	date,
	knob,
	number,
	object,
	optionsKnob as options,
	radios,
	select,
	text,
	withKnobs
} from '@storybook/addon-knobs';

export { withOptions } from '@storybook/addon-options';
export { action, decorateAction } from '@storybook/addon-actions';
export { doc, withDocs } from 'storybook-readme';
export { default as withThemes } from './withThemes';
export { default as ThemeDecorator } from './ThemeDecorator';
export { default as WithState } from '../components/with-state';

import { blogThemes } from '../components/theme/themes';
import { radios, select } from '@storybook/addon-knobs';
import { recircGroups } from '../components/recircGroups';

export const blogGroup = (label) => select(label || 'Blog group', Object.keys(blogThemes), 'default');
export const recircGroup = (label) => select(label || 'Recirc group', recircGroups, recircGroups[0]);
