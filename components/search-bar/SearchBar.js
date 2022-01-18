// @flow

import * as React from 'react';
import styled from 'styled-components';

import Textfield from '../form/textfield18';
import Button from '../buttons/Button';
import { Wrapper as TextfieldWrapper } from '../form/field/field';
import { KinjaTextField, KinjaFormFieldWrapper, KinjaTextFieldWrapper } from '../form/textfield18/textfield';
import { EnsureDefaultTheme } from '../theme';
import Icon19 from '../icon19/icon19';


type Props = {
	icon?: React.Element<typeof Icon19>,
	inputValue?: string,
	isEmptySearchField?: boolean,
	onSearch?: (value: string) => void,
	onManualSearch?: (value: string) => void,
	clearSuggestions?: () => void,
	walkDropDown?: (direction: string) => void,
	onInputChanged: (value: string) => void,
	placeholder?: string,
	typeahead?: boolean,
	className?: string,
	focusOnMount?: boolean
};

type State = {
	inputValue: string
}

export const SearchBarWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 24px;
	width: 100%;

	${KinjaFormFieldWrapper} {
		width: 100%;
		display: flex;
	}

	${KinjaTextFieldWrapper} {
		flex: 1;
	}

	${TextfieldWrapper} {
		display: flex;
		margin: 0 15px 0 0;
	}

	${KinjaTextField} {
		align-self: flex-end;
		padding-right: 0;
	}
`;


class SearchBar extends React.Component<Props, State> {
	isDirty: boolean;
	inputElement: { current: null | HTMLInputElement };
	constructor(props: Props) {
		super(props);
		const inputValue = this.props.isEmptySearchField ? '' : this.props.inputValue;
		this.state = {
			inputValue: inputValue || ''
		};
		this.isDirty = false;
		this.inputElement = React.createRef();
	}

	componentDidMount() {
		if (this.inputElement.current && this.props.focusOnMount) {
			this.inputElement.current.focus();
		}
	}

	onSearch = () => {
		const isNewSearch = this.props.onInputChanged;
		const returnValue = isNewSearch ? this.props.inputValue : this.state.inputValue;
		if (this.isDirty && this.props.onManualSearch) {
			this.props.onManualSearch(returnValue || '');
		} else if (this.props.onSearch) {
			this.props.onSearch(returnValue || '');
		}
	}

	handleKeyPress = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			this.isDirty = true;
			this.onSearch();
		}
		if (event.key === 'Escape' && this.props.clearSuggestions) {
			event.preventDefault();
			if (this.props.clearSuggestions) {
				this.props.clearSuggestions();
			}
		}
		if (this.props.walkDropDown && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
			event.preventDefault();
			if (this.props.walkDropDown) {
				this.props.walkDropDown(event.key);
			}
		}
	}

	getValue = () => {
		if (this.props.onInputChanged) {
			return this.props.inputValue;
		} else {
			return this.state.inputValue;
		}
	}

	onInputChanged = (value: string) => {
		if (this.props.onInputChanged) {
			this.props.onInputChanged(value);
		} else {
			this.setState({
				inputValue: value
			});
		}
	}

	render() {
		const { icon, placeholder, typeahead, className } = this.props;
		const textfieldProps = {
			customIcon: icon,
			name: 'search-bar',
			className
		};

		const clsName = className ? 'js_searchbar ' + className : 'js_searchbar';

		const buttonElement = typeahead ? null : <Button label="Search" weight="secondary" onClick={this.onSearch} small />;

		return (
			<EnsureDefaultTheme>
				<SearchBarWrapper className={clsName}>
					<Textfield
						{...textfieldProps}
						placeholder={placeholder || ''}
						value={this.getValue()}
						onChange={this.onInputChanged}
						fullWidth
						onKeyDown={this.handleKeyPress}
						onIconClick={this.onSearch}
						inputRef={this.inputElement} />
					{ buttonElement }
				</SearchBarWrapper>
			</EnsureDefaultTheme>
		);
	}
}


export default SearchBar;
