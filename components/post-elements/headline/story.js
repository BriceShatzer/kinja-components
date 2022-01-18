/* @flow */

import * as React from 'react';
import {
	boolean,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';

import Headline from './headline';
import README from './README.md';


storiesOf('3. Elements|Post Elements/Headline', module)
	.addDecorator(withDocs(README))
	.add('Headline', () => (
		<Headline embiggened={boolean('Embiggened', false)}>
			{text('Headline', 'The Most Fearsome Beasts In <i>Red Dead Redemption 2</i> Are The Deer')}
		</Headline>
	));