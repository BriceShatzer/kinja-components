/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

import Tabs from '../../../elements/tabs';
import TabItem from '../../../elements/tabItem';
import { TabLink } from '../../../elements/tabItem';

type Props = {
	tabIndex: number,
	onTabChange?: (index: number) => void
};

const TabsContainer = styled.div`
	width: 100%;
	padding: 1rem 0 1.25rem;
`;

const StyledTabItem = styled(TabItem)`
	&& {
		padding: 0;
		margin-right: 32px;
		${TabLink} {
			display: inline-block;
			padding: 0 0 15px 0;
			margin-bottom: -1px;
			color: ${props => props.theme.color.gray};
			${props => props.selected && css`
				color: black;
				border-bottom: 1px solid ${props => props.theme.color.primary};
			`}
		}
	}
`;

const TabList = styled(Tabs)`
	border-bottom: 1px solid #d7d7d7;
`;

const TablistMap = [
	{
		label: 'Add stories by story types / tags',
		value: '0',
		index: 0
	},
	{
		label: 'Add stories manually',
		value: '1',
		index: 1
	}
];

const StoryTabs = (props: Props) => {

	const { onTabChange, tabIndex } = props;

	const onChange = (index: string) => {
		const nextIndex = parseInt(index);
		if (onTabChange && !isNaN(nextIndex)) {
			onTabChange(nextIndex);
		}
	};

	return (
		<TabsContainer>
			<TabList onChange={onChange}>
				{
					TablistMap.map(tab => {
						return <StyledTabItem key={tab.index} selected={tabIndex === tab.index} { ...tab } />;
					})
				}
			</TabList>
		</TabsContainer>
	);
};

export default StoryTabs;
