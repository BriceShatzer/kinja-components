/* @flow */

import * as React from 'react';
import { storiesOf, withDocs, action } from 'base-storybook';
import DevTools from './dev-tools';
import README from './README.md';

storiesOf('4. Components|Dev Tools', module)
	.addDecorator(withDocs(README))
	.add('default', () => (
		<DevTools
			onFeatureSwitchChange={action('featureSwitchChange')}
			featureSwitches={[{ name: 'this switch is on', isOn: true }, { name: 'this switch is off', isOn: false }]}
		/>
	));
