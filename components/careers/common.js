// @flow

// import * as React from 'react';
import styled from 'styled-components';

import { colors } from 'kinja-components/components/theme/themes';
import media from 'kinja-components/style-utils/media';

export const Header = styled.header`
	display: none;
	padding: 1.125rem 0;
	border-bottom: 1px solid ${colors.lightgray};

	${media.mediumUp`
		display: block;
	`}
`;

export const Footer = styled.header`
	display: none;
	padding: 1.125rem 0;
	border-top: 1px solid ${colors.lightgray};

	${media.mediumUp`
		display: block;
	`}
`;

export const SectionContent = styled.article`
	padding: 0 1.125rem 0 1.125rem;
	width: 100%;
`;

export const Section = styled.section`
	width: 100%;
	max-width: ${props => props.wide ? '90rem' : '60rem'};
	margin: 0 auto;
	padding: 0;

	${media.largeUp`
		display: flex;
	`}
	
	&::before,
	&::after {
		content: " ";
		display: table;
		clear: both;
	}
	h1 {
		margin: 30px 0 10px;
		font-size: 2.8rem;
		text-align: center;
	}
	h2 {
		margin: 0 0 2.25rem 0;
		color: ${colors.gray};
		font-size: 1.312rem;
		text-align: center;
	}
	h4 {
		margin-top: 2.25rem;
	}
	iframe {
		margin: 0 auto;
		width: 100%;
		max-width: 650px;
	}
`;

export const Underline = styled.span`
	text-decoration: underline;
`;
