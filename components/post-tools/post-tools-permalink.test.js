import * as React from 'react';
import { shallow } from 'enzyme';

import { PostToolsPermalink } from './post-tools-permalink';

describe('<PostTools />', () => {
	it('should render move ad slots when callback is passed in', () => {
		const wrapper = shallow(
			<PostToolsPermalink
				initializeInArticleAdTools={() => {}}
			/>
		);
		expect(wrapper.dive()).toMatchSnapshot();
	});
});
