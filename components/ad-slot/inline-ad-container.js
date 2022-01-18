// @flow
import styled from 'styled-components';
import * as React from 'react';
import { EnsureDefaultTheme } from '../theme';
import { xlargeUp } from '../../style-utils/media';

export const OuterAdContainer = styled.div`
	background: transparent;
	text-align: center;
	border-bottom: ${({ theme, hideBorder }) => (hideBorder ? 'none' : `${theme.color.lightgray} 1px solid`)};
	border-top: ${({ theme, hideBorder }) => (hideBorder ? 'none' : `${theme.color.lightgray} 1px solid`)};
	box-sizing: content-box;
	padding: 1rem 0;
	max-width: 1020px;
	margin: 1rem auto;
	p {
		margin-bottom: 0;
		color: ${({ theme }) => theme.color.midgray};
		font-size: 0.875rem;
		letter-spacing: 0.1rem;
		text-transform: uppercase;
	}
	${xlargeUp`
		${({ mobileOnly }) => (mobileOnly ? 'display: none;' : '')}
	`}
	.ad-container {
		border-bottom: none !important;
		margin: 20px auto;
	}
`;

export const MobileBottomAdContainer = styled(OuterAdContainer)`
	border-bottom: ${({ theme }) => (`${theme.color.lightgray} 1px solid`)};
	border-top: none;
	padding: 0;
	.ad-container {
		margin: 20px auto;
	}
`;

const FlexAdContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 5px 0;
`;

const InlineAdContainer = ({ children, mobileOnly, hideBorder }: { children: React.Node, mobileOnly?: boolean, hideBorder?: boolean }) => (
	<EnsureDefaultTheme>
		{/* adding a class to this container so it can be targeted from bulbs */}
		<OuterAdContainer className="inline-ad-container" mobileOnly={mobileOnly} hideBorder={hideBorder}>
			<p>Advertisement</p>
			<FlexAdContainer>{children}</FlexAdContainer>
		</OuterAdContainer>
	</EnsureDefaultTheme>
);

export default InlineAdContainer;
