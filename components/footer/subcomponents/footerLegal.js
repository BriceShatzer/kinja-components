/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { legalDisclaimers } from '../constants';
import { EnsureDefaultTheme } from '../../theme';

const FooterLegalWrap = styled.div`
	color: ${props => props.theme.color.darkgray};
	font-size: 14px;
	padding-bottom: 52px;
	text-align: center;

	a {
		color: ${props => props.theme.color.gray};

		&:hover {
			color: ${props => props.theme.color.gray};
		}
	}
`;

const FooterLegal = ({
	blogGroup
}: {
	blogGroup?: string
}) => {
	const legalDisclaimer = (blogGroup && legalDisclaimers[blogGroup] &&
		<span>{legalDisclaimers[blogGroup]}</span>
	);
	const currentYear = (new Date()).getFullYear();

	return (
		<EnsureDefaultTheme>
			<FooterLegalWrap>
				{legalDisclaimer}
				<span> © {currentYear} <a href="https://g-omedia.com">G/O Media Inc.</a></span>
			</FooterLegalWrap>
		</EnsureDefaultTheme>
	);
};

export default FooterLegal;
