import * as React from 'react';
import { render } from 'enzyme';

import StreamNativeAd from './stream-native-ad';
import NativeAd from 'kinja-magma/models/NativeAd';
import Blog from 'kinja-magma/models/Blog';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';

import nativeAds from '../__fixtures__/native-ads';
import blog from '../../../__stubs__/gizmodo.json';

const currentPost = nativeAds.map(post => NativeAd.fromJSON(post))[0];
const currentBlog = Blog.fromJSON({
	...blog,
	...{
		properties: {
			...blog.properties
		}
	}
});

describe('Stream Native Ad', () => {
	it('should statically render a stream native ad', () => {
		const wrapper = render(
			<EnsureDefaultTheme>
				<StreamNativeAd
					index={0}
					post={currentPost}
					blog={currentBlog}
				/>
			</EnsureDefaultTheme>
		);

		expect(wrapper).toMatchSnapshot();
	});
});