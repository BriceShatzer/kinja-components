/* @flow */

import * as React from 'react';
import blogs from 'kinja-components/config/blogs.json';
import Theme from 'kinja-components/components/theme';
import Button from './Button';


const ThemedButtons = () => (
	<div css="display: flex; flex-wrap:wrap; justify-content: center;">
		{blogs.map(blog =>
			<Theme key={blog} blog={blog}>
				<Button label={blog} css="margin: 10px;" variant="primary" />
			</Theme>)}
	</div>
);

export default ThemedButtons;
