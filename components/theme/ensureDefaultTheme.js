// @flow

import * as React from 'react';
import { defaultTheme } from './index';
import { ThemeProvider } from 'styled-components';

type Props = {
  children?: React.Node,
};

const EnsureDefaultTheme = (props: Props) =>
	<ThemeProvider theme={t => t || defaultTheme}>
		{props.children}
	</ThemeProvider>;

export default EnsureDefaultTheme;
