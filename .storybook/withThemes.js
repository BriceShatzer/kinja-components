import * as React from 'react';
import Theme from '../components/theme';
import ThemeDecorator from './ThemeDecorator';

export default getStory =>
	<ThemeDecorator>
		{blog =>
			<div key={blog}>
				<h4>{blog}</h4>
				<Theme blog={blog}>
					{getStory()}
				</Theme>
			</div>
		}
	</ThemeDecorator>
