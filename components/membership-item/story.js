/* @flow */

import * as React from 'react';
import { storiesOf, withDocs, blogGroup } from 'base-storybook';
import MembershipItem from './membership-item';
import README from './README.md';

storiesOf('4. Components|Membership Item', module)
	.addDecorator(withDocs(README))
	.add('MembershipItem', () => {
		return <MembershipItem name={blogGroup()} />;
	});
