// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Blog from './svg/Blog/Blog.svg';

const BlogIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Blog/>
	</Icon19>;

export default BlogIcon;
