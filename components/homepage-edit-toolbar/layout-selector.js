// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import { Dropdown } from '../dropdown';
import Button from '../button19';
import { IconWrapper } from '../icon19/icon19';
import type { CurationBlockLayoutTypeString, CurationBlockTypeString } from 'kinja-magma/models/CurationBlock';
import Curation20Ad from '../icon19/Curation20Ad';
import Curation20EightCard from '../icon19/Curation20EightCard';
import Curation20FiveCard from '../icon19/Curation20FiveCard';
import Curation20FourCard from '../icon19/Curation20FourCard';
import Curation20FourCardHorizontal from '../icon19/Curation20FourCardHorizontal';
import Curation20FourCardHorizontalCompact from '../icon19/Curation20FourCardHorizontalCompact';
import Curation20SixCardWithLatest from '../icon19/Curation20SixCardWithLatest';
import Curation20ThreeCardHorizontal from '../icon19/Curation20ThreeCardHorizontal';
import Curation20Video from '../icon19/Curation20Video';
import Curation20SixCardGrid from '../icon19/Curation20SixCardGrid';
import Curation20SingleStory from '../icon19/Curation20SingleStory';
import Curation20FeaturedStory from '../icon19/Curation20FeaturedStory';

const Container = styled.ul`
	padding: 0;
	margin: 0;
	list-style-type: none;
	border: 1px solid ${props => props.theme.color.primary};
	border-radius: ${props => props.upwards ? '5px 5px 5px 0' : '0 5px 5px 5px'};
	background-color: ${props => props.theme.color.white};
	z-index: 98;
	position: relative;
	min-width: 20rem;
`;

const Item = styled.li`
	padding: 9px 16px;
	display: flex;
	justify-content: left;
	align-items: center;
	cursor: pointer;
	font-size: 16px;
	line-height: 22px;
	color: ${props => props.theme.color.darkgray};

	&:hover,
	&:active {
		background-color: ${props => props.theme.color.backgroundLight};
		color: ${props => props.theme.color.primary};
	}

	${IconWrapper} {
		margin-right: 0.5rem;
	}
`;

const DropdownOpenerButton = styled(Button)`
	${props => props.isDropdownOpen && (
		props.upwards
			? css`
				border-top-left-radius: 0;
				border-top-right-radius: 0;
			`
			: css`
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			`
	)}
`;

export type LayoutString = CurationBlockLayoutTypeString | CurationBlockTypeString

function Option(props: { value: LayoutString, children?: React.Node, onSelect: LayoutString => void }) {
	const callback = React.useCallback(() => props.onSelect(props.value), [props]);
	return (
		<Item onClick={callback}>
			{props.children}
		</Item>
	);
}

type Props = {
	onSelect: LayoutString => void,
	label: string,
	icon: React.Node,
	variant: 'primary' | 'tertiary',
	upwards?: boolean,
	isSmall?: boolean
}

export default function LayoutSelector(props: Props) {
	const { onSelect, label, icon, variant, upwards, isSmall } = props;
	const [isOpen, setIsOpen] = React.useState(false);
	const onOpenHandler = React.useCallback(() => setIsOpen(true), []);
	const onCloseHandler = React.useCallback(() => setIsOpen(false), []);
	const button = <DropdownOpenerButton
		icon={icon}
		label={label}
		labelPosition="after"
		isDropdownTrigger={!upwards}
		isUpwardsDropdownTrigger={upwards}
		isDropdownOpen={isOpen}
		variant={variant}
		isSmall={isSmall}
		upwards={upwards}
	/>;
	const handleSelect = React.useCallback((layout: LayoutString) => {
		onSelect(layout);
	}, [onSelect]);
	return (
		<Dropdown
			onOpen={onOpenHandler}
			onClose={onCloseHandler}
			trigger={button}
			dropdownContainer={Container}
			options={{
				align: 'left',
				useClick: true,
				upwards
			}}
		>
			<Option onSelect={handleSelect} value="SingleStory"><Curation20SingleStory />Single Story</Option>
			<Option onSelect={handleSelect} value="FeaturedStory"><Curation20FeaturedStory />The Big Story</Option>
			<Option onSelect={handleSelect} value="EightCardModular"><Curation20EightCard />8-Card Block</Option>
			<Option onSelect={handleSelect} value="SixCardModularWithLatest"><Curation20SixCardWithLatest />6-card Block with Latest</Option>
			<Option onSelect={handleSelect} value="FiveCardModular"><Curation20FiveCard />5-card Block</Option>
			<Option onSelect={handleSelect} value="FiveCardTwoColumn"><Curation20FiveCard />5-card Block with 2 Columns</Option>
			<Option onSelect={handleSelect} value="FourCardModular"><Curation20FourCard />4-card Block</Option>
			<Option onSelect={handleSelect} value="SixCardGrid"><Curation20SixCardGrid />6-card grid</Option>
			<Option onSelect={handleSelect} value="Video"><Curation20Video />Video Block</Option>
			<Option onSelect={handleSelect} value="HorizontalList"><Curation20FourCardHorizontal />4-card Horizontal List</Option>
			<Option onSelect={handleSelect} value="ThreeCardHorizontalList"><Curation20ThreeCardHorizontal />3-card Horizontal List</Option>
			<Option onSelect={handleSelect} value="CompactHorizontalList">
				<Curation20FourCardHorizontalCompact />4-card Compact Horizontal List (Ticker)
			</Option>
			<Option onSelect={handleSelect} value="Ad"><Curation20Ad />Midbanner Ad</Option>
		</Dropdown>
	);
}