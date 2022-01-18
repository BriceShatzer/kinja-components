// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import AddBlog from './svg/Add-blog.svg';

const AddBlogIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<AddBlog/>
	</Icon19>;

export default AddBlogIcon;
