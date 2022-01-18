/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Button from '../../../buttons';
import Label24Icon from '../../../icon19/Label24';
import { EnsureDefaultTheme } from '../../../theme';
import type { Tag } from './types';

type Props = {
	items: Array<Tag>,
	onSelect?: (value: string) => void
};

const Container = styled.div`
	display: flex;
	margin-bottom: 23px;
	padding-bottom: 23px;
	width: 100%;
`;

const IconElem = styled(Label24Icon)`
	flex: 1 0 0;
	min-width: 40px;

	svg {
		margin-right: 10px;
		height: 40px;
		width: 40px;
		color: ${({ theme }) => theme.color.midgray};
	}
`;

const TagListWrapper = styled.div`
	display: flex;
	flex: 1 0 90%;
	flex-wrap: wrap;
`;

const TagItem = styled(Button)`
	margin: 2px 5px;
`;

const LabelInner = styled.span``;

const LabelCount = styled.span`
	color: ${props => props.featured ? props.theme.color.white : props.theme.color.gray };
`;

const TagList = (props: Props) => {
	const { items } = props;

	const onSelect = (itemId: string) => {
		if (props.onSelect) {
			props.onSelect(itemId);
		}
	};

	const Label = item => {
		return <LabelInner>{item.displayName} <LabelCount featured={item.featured}>• {item.count}</LabelCount></LabelInner>;
	};

	const listItems = items.map(item =>
		<TagItem
			small
			onClick={ onSelect.bind(this, item.canonical) }
			key={'tag-' + item.canonical}
			label={Label(item)}
			weight={ item.featured ? 'primary' : 'secondary'}/>
	);
	return (
		<EnsureDefaultTheme>
			<React.Fragment>
				<Container>
					<IconElem />
					<TagListWrapper>
						{listItems}
					</TagListWrapper>
				</Container>
			</React.Fragment>
		</EnsureDefaultTheme>
	);
};

export default TagList;
