/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import SearchBar from 'kinja-components/components/search-bar/SearchBar';
import { KinjaTextFieldWrapper, KinjaTextField, KinjaFormFieldWrapper } from 'kinja-components/components/form/textfield18';
import Settings from 'kinja-components/components/icon19/Settings';
import Search24 from 'kinja-components/components/icon19/Search24';
import Close from 'kinja-components/components/icon19/Close';
import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';

import type { Locale } from 'kinja-magma/models/Locale';


const StyledSearchBar = styled(SearchBar)`
	display: flex;
	align-items: center;
	flex-direction: row;

	${KinjaFormFieldWrapper} {
		margin: 0;
	}

	${KinjaTextFieldWrapper} {
		display: flex;
		flex-basis: 100%;
	}

	/* Double selector to overwrite touch default font sizes */
	${KinjaTextField}${KinjaTextField} {
		font-size: 30px;

		${media.mediumDown`
			font-size: 18px;
		`}
	}

	${media.mediumUp`
		display: block;
		margin-bottom: 31px;
	`}
`;

const StyledSettings = styled(Settings)`
	position: relative;
	bottom: -3px;
	margin-left: 8px;
	display: none;
	cursor: pointer;
	align-self: center;
	z-index: 99;

	${media.mediumDown`
		display: flex;
	`}
`;

const Headline = styled.h3`
	font-weight: normal;
	margin: 0;
	color: ${props => props.theme.color.primary};

	${media.mediumDown`
		font-size: 16px;
	`}
`;

const IconStyle = `
	display: none;
	position: absolute;
	right: 0;
	top: 12px;
	cursor: pointer;
	z-index: 2;
	background: #fff;
`;

const SearchIconElement = styled(Search24)`
	${IconStyle}
	${media.largeUp`
		display: flex;
	`}
`;

const ClearIconElem = styled(Close)`
	${IconStyle}
	display: flex;

	${media.largeUp`
		display: none;
	`}

	${props => props.isResultsPage && css`
		right: 25px;
	`}
`;

const InputContainer = styled.div``;


type Props = {
	locale: Locale,
	inputValue?: string,
	isResultsPage: boolean;
	typeahead: boolean,
	placeholder: string,
	isEmptySearchField: boolean,
	onFilterIconClick: () => void,
	onSearch: (value: string) => void,
	onManualSearch: (value: string) => void,
	onActionableSearch: () => void,
	onResetSearchBar: () => void,
	clearSuggestions?: () => void
};

const SearchInput = (props: Props) => {

	const clickHandler = () => {
		props.onActionableSearch();
	};
	const clearHandler = () => {
		props.onResetSearchBar();
	};
	const translate = createTranslate(translations, props.locale);
	const headline = translate('Search for');
	const ActionableIcons =
		<React.Fragment>
			<SearchIconElement onClick={clickHandler} />
			{props.inputValue &&
				<ClearIconElem onClick={clearHandler} isResultsPage={props.isResultsPage} />
			}
			{props.isResultsPage &&
				<StyledSettings onClick={props.onFilterIconClick} />
			}
		</React.Fragment>;


	return (
		<EnsureDefaultTheme>
			<React.Fragment>
				<Headline>{headline}</Headline>
				<InputContainer>
					<StyledSearchBar icon={ActionableIcons} {...props} />
				</InputContainer>
			</React.Fragment>
		</EnsureDefaultTheme>
	);
};

SearchInput.defaultProps = {
	typeahead: true,
	placeholder: '',
	locale: 'en-US'
};

export default SearchInput;
