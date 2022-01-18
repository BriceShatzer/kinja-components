/* @flow */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import styled from 'styled-components';

import AuthorInput from './AuthorInput';
import { AuthorElement, MultipleAuthorsElement } from './styledElements';
import Toggle from '../../hoc/toggle';
import type { ToggleInjectedProps } from '../../hoc/toggle';
import type { AuthorEditor as Author } from '../../types';
import { EnsureDefaultTheme } from '../../theme';


type Props = {
	authors: Array<Author>,
	authorsList: Array<Author>,
	onClose: () => void,
	onChange: Array<Author> => void
} & ToggleInjectedProps;


const MultipleAuthorsWrapper = styled.div.attrs({
	role: 'button'
})`
	display: flex;
	flex-flow: row wrap;
	width: auto%;

	&:hover {
		cursor: text;
	}

	&:focus {
		outline: none;
	}
`;

const MultipleAuthorsElementEditor = styled(MultipleAuthorsElement)`
	&:first-child {
		cursor: default;
	}

	&:not(:first-child) {
		span:first-child {
			&:hover {
				color: ${props => props.theme.color.error};
				text-decoration: line-through;
				cursor: pointer;
			}

			&:focus {
				outline: 0;
			}
		}
	}
`;


class MultipleAuthors extends Component<Props, {
	authors: Array<Author>
}> {
	handleClick: () => void;

	constructor(props: Props) {
		super(props);
		this.state = {
			authors: []
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount() {
		this.setState({
			authors: this.props.authors
		});
	}

	componentWillReceiveProps(nextProps) {
		this.props.isOpen && !nextProps.isOpen && this.props.onClose && this.props.onClose();
	}

	handleClick() {
		if (!this.props.isOpen && this.props.toggle) {
			this.props.toggle();
		}
	}

	@autobind
	addNewAuthor(author: Author) {
		this.setState({
			authors: this.state.authors.concat(author)
		}, () => {
			this.props.onChange && this.props.onChange(this.state.authors);
		});
	}

	@autobind
	removeAuthor(index: number) {
		if (index !== 0) {
			const authors = this.state.authors;
			const newAuthors = [
				...authors.slice(0, index),
				...authors.slice(index + 1)
			];

			this.setState({
				authors: newAuthors
			}, () => {
				this.props.onChange && this.props.onChange(this.state.authors);
			});
		}
	}

	render() {
		const { insideReference, isOpen } = this.props;
		const { authors } = this.state;
		const authorsList = this.props.authorsList && this.props.authorsList.filter(author =>
			authors.filter(({ screenName }) => screenName === author.screenName).length !== 1);

		const authorElements = authors.map((author, index) => (
			<MultipleAuthorsElementEditor key={author.id}>
				<AuthorElement tabIndex={0} onClick={() => this.removeAuthor(index) }>
					{author.displayName}
				</AuthorElement>
				{ !isOpen && index === authors.length - 1 ? '' : <span>,&nbsp;</span>}
			</MultipleAuthorsElementEditor>
		));

		return (
			<EnsureDefaultTheme>
				<MultipleAuthorsWrapper onClick={this.handleClick} ref={insideReference} tabIndex={0}>
					{authorElements}
					{isOpen && authorsList
						? <AuthorInput
							authorsList={authorsList}
							onBackspaceDown={() => this.removeAuthor(authors.length - 1)}
							onSelect={this.addNewAuthor}
						/>
						: ''
					}
				</MultipleAuthorsWrapper>
			</EnsureDefaultTheme>
		);
	}
}


export default Toggle(MultipleAuthors, { isOutsideClickEnabled: true, isDefaultOpen: true });
