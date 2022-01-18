/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';
import { EnsureDefaultTheme } from '../../theme';
import { componentStates } from './__fixtures__';
import SaveBadge from './save-badge';

const SaveBadgeWithTheme = props => (
	<EnsureDefaultTheme>
		<SaveBadge {...props} />
	</EnsureDefaultTheme>
);

describe('<SaveBadge />', () => {
	Object.keys(componentStates).forEach(t => {
		it(componentStates[t].name, () => {
			const wrapper = mount(<SaveBadgeWithTheme {...componentStates[t].props} />);
			expect(wrapper.render()).toMatchSnapshot();
		});
	});
});
