/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import { Dropdown } from 'kinja-components/components/dropdown';

type Props = {
	trigger: React$Element<*>,
	suggestions?: Array<*>,
	highlightIndex?: number,
	handleSelectedSuggestion: (suggestion: string) => void,
	clearSuggestions: () => void
};

const Item = styled.div``;

const ItemLink = styled.span`
	display: block;
	cursor: pointer;
	font-size: 16px;
	padding: 8px 10px;
	&:hover {
		background: ${props => props.theme.color.whitesmoke};
	}
	${props => props.highlightItem && css`
		&& {
			background: ${props => props.theme.color.whitesmoke};
		}
	`}
`;

const DropdownContainer = styled.div`
	background: ${props => props.theme.color.white};
	border: 1px solid ${props => props.theme.color.midgray};
`;

const Suggestions = (props: Props) => {

	let dropDownOpen = false;

	const selectHandler = (event: SyntheticMouseEvent<*>) => {
		if (props.handleSelectedSuggestion) {
			props.handleSelectedSuggestion(event.currentTarget.textContent);
		}
	};

	// empty the suggestions
	const handleClose = () => {
		if (props.clearSuggestions) {
			props.clearSuggestions();
		}
		dropDownOpen = false;
	};

	// empty the suggestions
	const handleClickOutside = () => {
		if (props.clearSuggestions) {
			props.clearSuggestions();
		}
		dropDownOpen = false;
	};

	const dropDownEvents = {
		onClose: handleClose,
		onClickOutside: handleClickOutside
	};

	const getDropdownState = () => {
		if (dropDownOpen || props.suggestions && props.suggestions.length) {
			dropDownOpen = true;
		}
		return dropDownOpen;
	};

	const dropDownChildren = () => {
		if (props.suggestions && props.suggestions.length) {
			return props.suggestions.map((suggestion, index) => {
				const key = `${suggestion}-${index}`;
				const highlightItem = index === props.highlightIndex;
				return (
					<Item key={key}>
						<ItemLink highlightItem={highlightItem} onClick={selectHandler}>{suggestion}</ItemLink>
					</Item>
				);
			});
		} else {
			return [];
		}
	};

	return (
		<EnsureDefaultTheme>
			<Dropdown
				trigger={props.trigger}
				{...dropDownEvents}
				dropdownContainer={DropdownContainer}
				isOpen={getDropdownState()}
				options={{
					align: 'fullwidth',
					useClick: false
				}}>
				{dropDownChildren()}
			</Dropdown>
		</EnsureDefaultTheme>
	);
};


export default Suggestions;
