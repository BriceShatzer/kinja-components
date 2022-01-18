/* @flow */

import * as React from 'react';
import {
	action,
	boolean,
	number,
	storiesOf,
	withDocs
} from 'base-storybook';

import README from './README.md';
import DrawerMenu from './DrawerMenu';


storiesOf('4. Components|Manage Blog/Drawer Menu', module)
	.addDecorator(withDocs(README))
	.add('Drawer Menu', () => {
		return (
			<div style={{
				height: number('Height', 90, { range: true, min: 80, max: 300, step: 1 }),
				display: 'flex',
				justifyContent: 'center'
			}}>
				<DrawerMenu
					isEmbiggened={boolean('isEmbiggened', false)}
					onDrawerMenuIconClick={action('Open / Close')}
					onEmbiggenClick={action('Set Embiggened')}
					permalink="https://earther.gizmodo.com/new-house-science-committee-chair-to-climate-scientists-1830999547"
					postId={1829613594}
				/>
			</div>
		);
	});