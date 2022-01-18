/* @flow */

import * as React from 'react';
import { storiesOf, withDocs } from 'base-storybook';
import ImpactNav from './impact-nav';
import HideOnScroll from '../hoc/hide-on-scroll';
import README from './README.md';

const stubbedProps = {
	blogName: 'Kotaku',
	href: ''
};

storiesOf('4. Components|Navigation/Impact Nav', module)
	.addDecorator(withDocs(README))
	.add('Impact Nav', () => (
		<HideOnScroll>{hide => (<ImpactNav hide={hide} {...stubbedProps} />)}</HideOnScroll>
	));
