import {
	configure,
	addDecorator,
	withKnobs,
	addParameters
} from 'base-storybook';
import { create } from '@storybook/theming';

function loadStories() {
	const reqDocs = require.context('../doc', true, /.js$/);
	reqDocs.keys().forEach(filename => reqDocs(filename));
	const reqComponentStories = require.context('../components', true, /story.js$/);
	reqComponentStories.keys().forEach(filename => reqComponentStories(filename));
}

addDecorator(withKnobs);

addParameters({
	options: {
		theme: create({
			brandTitle: 'kinja-components',
			brandUrl: 'https://github.com/gawkermedia/kinja-mantle/tree/master/packages/kinja-components'
		}),
		isFullscreen: false,
		showNav: true,
		showPanel: false,
		hierarchySeparator: /\//,
		hierarchyRootSeparator: /\|/
	}
});

configure(loadStories, module);
