/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';
import { EnsureDefaultTheme } from '../../theme';
import { componentStates } from './__fixtures__';
import CommentBadge from './comment-badge';

const CommentBadgeWithTheme = props => (
	<EnsureDefaultTheme>
		<CommentBadge {...props} />
	</EnsureDefaultTheme>
);

describe('<CommentBadge />', () => {
	Object.keys(componentStates).forEach(t => {
		it(componentStates[t].name, () => {
			const wrapper = mount(<CommentBadgeWithTheme {...componentStates[t].props} />);
			expect(wrapper.render()).toMatchSnapshot();
		});
	});
});
