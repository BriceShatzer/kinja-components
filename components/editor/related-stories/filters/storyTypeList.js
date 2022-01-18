/* @flow */

import * as React from 'react';
import Button from '../../../buttons';
import styled from 'styled-components';
import Blog24Icon from '../../../icon19/Blog24';
import { EnsureDefaultTheme } from '../../../theme';
import type { StoryType } from './types';

type Props = {
	items: Array<StoryType>,
	onSelect?: (value: string) => void
};

const Container = styled.div`
	display: flex;
	align-items: stretch;
	margin-bottom: 23px;
	padding-bottom: 23px;
	border-bottom: 1px solid ${props => props.theme.color.midgray};
	width: 100%;
`;

const StoryTypeListWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const IconElem = styled(Blog24Icon)`
	min-width: 40px;

	svg {
		margin: -1px 10px 0 0;
		height: 40px;
		width: 40px;
		color: ${props => props.theme.color.midgray};
	}
`;

const StoryTypeItem = styled(Button)`
	margin: 2px 5px;
	color: ${props => props.theme.color.black};
`;

const LabelInner = styled.span``;

const LabelCount = styled.span`
	color: ${props => props.theme.color.gray};
`;

const StoryTypeList = (props: Props) => {
	const { items } = props;
	const onSelect = (itemId: string) => {
		if (props.onSelect) {
			props.onSelect(itemId);
		}
	};
	const Label = item => {
		return <LabelInner>{item.title} <LabelCount>• {item.count}</LabelCount></LabelInner>;
	};
	const listItems = items.map(item =>
		<StoryTypeItem
			small
			key={'story-' + item.id}
			label={Label(item)}
			onClick={ onSelect.bind(this, item.id) }
			weight='tertiary'
		/>
	);
	return (
		<EnsureDefaultTheme>
			<React.Fragment>
				<Container>
					<IconElem />
					<StoryTypeListWrapper>
						{listItems}
					</StoryTypeListWrapper>
				</Container>
			</React.Fragment>
		</EnsureDefaultTheme>
	);
};

export default StoryTypeList;
