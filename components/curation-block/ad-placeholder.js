// @flow
import * as React from 'react';
import styled from 'styled-components';
import { HomepageAdContainer } from 'kinja-components/components/ad-slot/ads';
import { SpaceBetweenBlocks } from './layouts/layout-styles';

export const AdPlaceholderHeight = '250px';

const AdPlaceholderBackground = styled.div`
	background: ${props => props.theme.color.whitesmoke};
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${SpaceBetweenBlocks} 0;
	margin-bottom: ${SpaceBetweenBlocks};
`;

const Placeholder = styled.div`
	width: 970px;
	height: ${AdPlaceholderHeight};
	background: ${props => props.theme.color.gray};
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 18px;
	line-height: 22px;
	font-weight: bold;
`;

export default function AdPlaceholder() {
	return (
		<HomepageAdContainer>
			<AdPlaceholderBackground>
				<Placeholder>
					An ad will appear here
				</Placeholder>
			</AdPlaceholderBackground>
		</HomepageAdContainer>
	);
}