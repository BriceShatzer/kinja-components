// @flow

import * as React from 'react';
import { storiesOf, select, number } from 'base-storybook';
import FadeIntoView from './';
import { Image } from '../../elements/image';

storiesOf('2. Styles & Utilities|Animation/Fade Into View', module).add('Fade In', () => (
	<div>
		<p>scroll down</p>
		<div style={{ padding: '200vh 0' }}>
			<FadeIntoView
				fadeConfig={{
					durationMs: number('duration in milliseconds', 2),
					delayMs: number('duration in milliseconds', 2),
					origin: select('Origin', ['left', 'right', 'top', 'bottom'], 'left'),
					inOrOut: select('Out or In', ['out', 'in'], 'in')
				}}
			>
				<Image id={'bjto6szbfhnuyoy4gjrr'} format={'jpg'} transform={'Original'} />
			</FadeIntoView>
		</div>
	</div>
));
