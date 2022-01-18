// @flow

import * as React from 'react';
import {
	storiesOf,
	boolean,
	withDocs
} from 'base-storybook';
import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';
import README from './README.md';
import ExperimentsTool from './experiments-tool';


const manualFeatures = [{
	name: 'enable_joy',
	description: 'Enables feeling joy for using Kinja',
	source: 'USER',
	value: 'on'
}, {
	name: 'more_ads',
	description: 'Display more ads on the site',
	source: 'USER',
	value: 'off'
}];

const abtestFeatures = [{
	name: 'mobile_ad_slot_position_change_5',
	description: 'Change up the positions of mobile ad slots',
	source: 'EXPERIMENT',
	value: 'on'
}];


storiesOf('4. Components|Navigation/Header', module)
	.addDecorator(withDocs(README))
	.add('Experiments Tool', () => {

		const showManualFeatures = boolean('Manual features', true);
		const showABTestFeatures = boolean('AB test features', true);
		const features = [
			...(showManualFeatures ? manualFeatures : []),
			...(showABTestFeatures ? abtestFeatures : [])
		];
		return (
			<EnsureDefaultTheme>
				<ExperimentsTool
					features={features}
					isSuperuser={boolean('isSuperuser', false)}
				/>
			</EnsureDefaultTheme>
		);
	});