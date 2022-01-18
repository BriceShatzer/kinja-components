/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import Tabs from './tabs';
import TabItem, { TabLink } from './tabItem';


const TabsContainer = styled.div`
	width: 100%;
	padding: 1rem 0 1.25rem;
`;

const StyledTabItem = styled(TabItem)`
	padding: 0;
	margin-right: 32px;
	font-size: 20px;
	line-height: 15px;
	
	${TabLink} {
		display: inline-block;
		padding: 0 0 15px 0;
		margin-bottom: -1px;
		color: ${({ theme }) => theme.color.gray};
		font-weight: normal;

		${({ selected, theme }) => selected && css`
			color: black;
			border-bottom: 1px solid ${theme.color.black};
		`}
	}
`;

const TabList = styled(Tabs)`
	margin: 0;
	border-bottom: 1px solid ${({ theme }) => theme.color.midgray};
`;


type Props = {
	activeTab: string,
	tabs: Array<string>,
	onChange: string => void
};

// This component to have a unified, styled TabBar component what be reused, and
// refactored in the RELATED STORIES, MANAGEBLOG NAV, and PROFILE PAGE NAV

const TabBar = (props: Props) => {
	const { activeTab, onChange, tabs } = props;
	const selectedIndex = tabs.indexOf(activeTab);

	return (
		<EnsureDefaultTheme>
			<TabsContainer>
				<TabList onChange={onChange}>
					{tabs.map((tab, index) => (
						<StyledTabItem index={index} key={tab} label={tab} selected={selectedIndex === index} value={tab} />
					))}
				</TabList>
			</TabsContainer>
		</EnsureDefaultTheme>
	);
};

export default TabBar;
