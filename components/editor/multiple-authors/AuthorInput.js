/* @flow */

// This component is waiting for a list of Author objects and render
// an input field and a list above with filtered Authors depending
// on the input's value. If input is empty and backspace is pressed
// then onBackspaceDown prop (if exists) will be called.

import * as React from 'react';
import autobind from 'autobind-decorator';
import styled from 'styled-components';
import { extendedLatinToASCII } from '../../../utils';
import ListWithSelection from '../../list-with-selection';
import type { AuthorEditor as Author } from '../../types';
import { EnsureDefaultTheme } from '../../theme';

const AuthorSelector = styled.div`
	flex-grow: 1;
	position: relative;

	&:focus {
		outline: 0;
	}

	ul {
		position: absolute;
		width: auto;
		min-width: 170px;
		top: 27px;

		&:empty {
			display: none;
		}
	}
`;

const AuthorInputWrapper = styled.input`
	width: 100%;
	border: 0;
	font-size: 16px;
	font-family: ${props => props.theme.typography.primary.fontFamily};

	&:focus {
		outline: 0;
		color: ${props => props.theme.color.primary};
	}
`;

type Props = {
	authorsList: Array<Author>,
	onBackspaceDown?: () => void,
	onSelect: Author => void
};

class AuthorInput extends React.Component<Props, {
    inputValue: string
}> {
	authorInput: HTMLInputElement;

	constructor(props: Props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}

	@autobind
	handleChange(event: SyntheticInputEvent<>) {
		this.setState({
			inputValue: event.target.value
		});
	}

	@autobind
	handleSelect(target: React.Element<'span'>) {
		if (this.props.onSelect) {
			this.setState({
				inputValue: ''
			}, () => {
				this.props.onSelect(target.props.value);
			});
		}
	}

	@autobind
	handleKeyPress(event: SyntheticKeyboardEvent<*>) {
		const { onBackspaceDown } = this.props;
		const { inputValue } = this.state;

		if (event.key === 'Backspace' && onBackspaceDown && inputValue.length === 0) {
			onBackspaceDown();
		}
	}

	getMatchingAuthors(): Array<Author> {
		const { inputValue } = this.state;

		return this.props.authorsList.filter(author =>
			extendedLatinToASCII(author.displayName).toLowerCase().substring(0, inputValue.length) ===
				extendedLatinToASCII(this.state.inputValue).toLowerCase()
		);
	}

	renderList() {
		const matchingAuthors = this.getMatchingAuthors();
		const authors = matchingAuthors.map(author => (
			<span key={author.id} value={author}>
				{author.displayName}
			</span>
		));

		return (
			<ListWithSelection
				allowNavigation
				onSelect={this.handleSelect}
				selectionKeys={[',', 'ArrowRight']}
			>
				{authors}
			</ListWithSelection>
		);
	}

	render() {
		const { inputValue } = this.state;

		return (
			<EnsureDefaultTheme>
				<AuthorSelector>
					<AuthorInputWrapper
						onChange={this.handleChange}
						onKeyDown={this.handleKeyPress}
						onFocus={e => {
							const value = inputValue;
							e.target.value = '';
							e.target.value = value;
						}}
						autoFocus
						value={inputValue}
					/>
					{ inputValue.length > 0 && this.renderList() }
				</AuthorSelector>
			</EnsureDefaultTheme>
		);
	}
}


export default AuthorInput;
