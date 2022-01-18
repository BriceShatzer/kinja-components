// @flow
import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/themes';

export const pageBreakSelector = 'js_page-break';

const PageBreakElement = styled.div`
	display: flex;
	align-items: center;
	color: ${colors.midgray};
	font-family: ProximaNovaCond, sans-serif;
	margin-bottom: 20px;
	font-size: 15px;
	line-height: 18px;
	clear: both;

	&::before,
	&::after {
		content: '';
		border-top: 1px solid ${colors.midgray};
		border-bottom: 1px solid ${colors.midgray};
		display: block;
		height: 4px;
		width: 100%;
		flex: 1;
	}

	&::before {
		margin-right: 4px;
	}

	&::after {
		margin-left: 4px;
	}
`;

export default function PageBreak() {
	return (
		<PageBreakElement className={pageBreakSelector} contentEditable={false}>
			SLIDE #0
		</PageBreakElement>
	);
}