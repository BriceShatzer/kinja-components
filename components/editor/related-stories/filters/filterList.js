/* @flow */

import * as React from 'react';
import Button from 'kinja-components/components/buttons';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../../../theme';
import type { FilterType } from './types';
import CloseIcon from 'kinja-components/components/icon19/Close';

type Props = {
	items: Array<FilterType>,
	onRemoveItem?: (itemId: string) => void
};

const Container = styled.div`
	display: flex;
	margin-top: 37px;
`;

const StoryTypeListWrapper = styled.div`
	display: flex;
	flex: 1 0 90%;
	flex-wrap: wrap;
`;

const StoryTypeItem = styled(Button)`
	margin: 2px 5px;
`;

const FilterTypeList = (props: Props) => {

	const { items, onRemoveItem } = props;

	const removeItem = (itemId: string) => {
		if (onRemoveItem) {
			onRemoveItem(itemId);
		}
	};

	const listItems = items.map(item =>
		<StoryTypeItem
			onClick={ removeItem.bind(this, item.canonical) }
			small
			key={`filter-${item.canonical}`}
			label={item.title}
			weight={ item.type === 'storyType' ? 'tertiary' : 'secondary'}
			icon={<CloseIcon />}
		/>
	);

	return (
		<EnsureDefaultTheme>
			<React.Fragment>
				<Container>
					<StoryTypeListWrapper>
						{listItems}
					</StoryTypeListWrapper>
				</Container>
			</React.Fragment>
		</EnsureDefaultTheme>
	);
};

export default FilterTypeList;
