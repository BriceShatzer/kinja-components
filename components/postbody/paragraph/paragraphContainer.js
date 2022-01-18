// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import media from 'kinja-components/style-utils/media';

const ParagraphContainer = styled.p`
	${({ dropCapEnabled, theme }) => dropCapEnabled && css`
		&:first-of-type:first-letter {
			margin: 13px 10px 0 -5px;
			float: left;
			color: ${theme.color.primary};
			font-family: ${theme.typography.primary.fontFamily};
			font-weight: bold;
			font-size: 100px;
			line-height: 70px;

			${media.mediumUp`
				font-size: 117px;
				line-height: 80px;
			`}
		}
	`}
`;

type Props = {
	children: React.Element<*>,
	dropCapEnabled?: ?boolean
}

const ParagraphElement = (props: Props) =>{
	const { children, dropCapEnabled } = props;

	return <ParagraphContainer dropCapEnabled={dropCapEnabled}>
		{children}
	</ParagraphContainer>;
};

export default ParagraphElement;
