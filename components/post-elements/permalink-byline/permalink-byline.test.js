import * as React from 'react';
import { mount } from 'enzyme';

import PermalinkByline from './permalink-byline';
import { EnsureDefaultTheme } from '../../theme';
import post from '../../../__stubs__/stubbedPost.json';
import gizmodo from '../../../__stubs__/gizmodo.json';

describe('<PermalinkByline />', () => {
	it('should render properly', () => {
		const wrapper = mount(
			<EnsureDefaultTheme>
				<PermalinkByline
					post={post}
					blogProperties={{ timezone: gizmodo.timezone, alternativeFiledToText: 'custom filed to' }}
				/>
			</EnsureDefaultTheme>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
