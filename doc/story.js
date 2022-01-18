/* @flow */

import {
	storiesOf,
	doc
} from 'base-storybook';
import kinjaComponents from '../README.md';
import designKit from './DESIGNKIT.md';
const contributing = require.context('./contributing', true);
const contributingPath = name => contributing(name, true);

storiesOf('1. Guides|Getting Started', module)
	.add('⚛️ Kinja-components', doc(kinjaComponents))
	.add('🎨 Kinja Design Kit', doc(designKit));

storiesOf('1. Guides|Contributing', module)
	.add('Contributing', doc(contributingPath('./CONTRIBUTING.md')))
	.add('Coding Guidelines', doc(contributingPath('./CODING.md')))
	.add('Creating Components', doc(contributingPath('./CREATING.md')))
	.add('Designing Icons', doc(contributingPath('./ICONS.md')))
	.add('Designing with the Kinja Grid', doc(contributingPath('./DESIGN-GRID.md')))
	.add('Styling', doc(contributingPath('./STYLING.md')))
	.add('Localizing', doc(contributingPath('./LOCALIZING.md')))
	.add('Testing', doc(contributingPath('./TESTING.md')))
	.add('Generating SVG Sets', doc(contributingPath('./GENERATING.md')))
	.add('Writing READMEs', doc(contributingPath('./READMES.md')))
	.add('Writing Stories', doc(contributingPath('./STORIES.md')));
