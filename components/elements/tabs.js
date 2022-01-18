/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import ItemGroup from './item-group';
import TabItem from './tabItem';

const StyledTab = styled(ItemGroup)`
	display: flex;
`;

type Props = {
	children: React.ChildrenArray<React.Element<typeof TabItem>>,
	onChange: string => void
}

const Tabs = (props: Props) => {
	return (
		<StyledTab htmlElement="ul" {...props} >
			{React.Children.map(props.children, child =>
				React.cloneElement(child, {
					key: child.props.index + child.props.value
				})
			)}
		</StyledTab>
	);
};

export default Tabs;
