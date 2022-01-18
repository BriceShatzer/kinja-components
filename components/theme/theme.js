// @flow

import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { blogThemes as Themes } from './themes';

export type BlogThemeName = $Keys<typeof Themes>;
const blogThemeNames: Array<BlogThemeName> = Object.keys(Themes);

type Props = {
	children: React.Node,
	theme: {},
	blog?: ?BlogThemeName
};

export const matchBlogGroupToTheme = (blogGroup: ?string): BlogThemeName => {
	return (blogThemeNames.find(b => b === blogGroup)) || 'default';
};

const Theme = (props: Props) => {
	const { children, theme, blog } = props;

	const appliedTheme = blog ? {
		...(Themes[blog] || Themes.default),
		blog
	} : theme;

	return (
		<ThemeProvider theme={appliedTheme}>
			{children}
		</ThemeProvider>
	);
};

Theme.defaultProps = {
	theme: Themes.default
};

export default Theme;
