// @flow

// import * as React from 'react';
import styled from 'styled-components';
// import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from '../../../style-utils/media';

const BlockQuote = styled.blockquote`
	clear: both;
	overflow: visible;
	font-style: normal;
	border-radius: 0;
	border-left: 5px solid ${({theme}) => theme.color.logo};
	padding: 0 0 0 ${({theme}) => theme.columnPadding};
	background-color: transparent;
	margin-top: 2rem;
	margin-bottom: 2rem;

	p {
		font-size: 15px;
		line-height: 28px;

		${media.smallOnly`
			font-size: 14px;
			line-height: 26px;
		`}

		${media.xxlargeUp`
			font-size: 16px;
			line-height: 29px;
		`}
	}
`;

export default BlockQuote;
//
//
// export default () => {
// 	return <BlockQuote /></EnsureDefaultTheme>;
// };
