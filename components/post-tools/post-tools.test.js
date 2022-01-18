import * as React from 'react';
import { shallow } from 'enzyme';

import { PostTools } from './post-tools';

describe('<PostTools />', () => {
	it('should render comment & view counts', () => {
		const wrapper = shallow(
			<PostTools
				type={'stream'}
				postPermalink={'https://foo.bar/baz'}
				pageType={'frontpage'}
				index={99}
				isFeatured={true}
				replyCount={1738}
				views={99999}
				uniqueViews={1}
			/>
		);
		expect(wrapper.dive()).toMatchSnapshot();
	});
});
