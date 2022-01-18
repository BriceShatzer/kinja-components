/* @flow */

import * as React from 'react';
import SearchBar from '../../../search-bar';
import Icon19 from '../../../icon19/icon19';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../../../theme';
import SearchIcon from '../../../icon19/Search';
import { KinjaTextField, KinjaFormFieldWrapper } from '../../../form/textfield18';


type Props = {
	icon: React.Element<typeof Icon19>,
	typeahead: boolean,
	placeholder: string,
	onSearch?: (value: string) => void
};

type State = {
	inputValue: string
}

const IconElem = styled(SearchIcon)`
	display: inline-block;
	position: absolute;
	left: 0;
	top: 8px;
`;

export const StyledSearchBar = styled(SearchBar)`
	&& {
		margin-top: 37px;
	}

	${KinjaFormFieldWrapper} {
		width: 100%;
	}

	${KinjaTextField} {
		padding-left: 24px;
	}
`;

class SearchInput extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}
	static defaultProps = {
		typeahead: true,
		placeholder: 'Choose story types or tags',
		icon: <IconElem />
	};

	onInputChanged = (value: string) => {
		this.setState({
			inputValue: value
		}, () => {
			this.onSearch();
		});
	}

	onSearch = () => {
		if (this.props.onSearch) {
			this.props.onSearch(this.state.inputValue);
		}
	}

	render() {
		const { typeahead, placeholder, icon } = this.props;
		const searchBarProps = {
			onInputChanged: this.onInputChanged,
			placeholder,
			typeahead,
			icon,
			onSearch: this.onSearch,
			focusOnMount: false
		};
		return (
			<EnsureDefaultTheme>
				<StyledSearchBar {...searchBarProps} />
			</EnsureDefaultTheme>
		);
	}
}

export default SearchInput;
