/* @flow */

import React, { Component } from 'react';
import styled from 'styled-components';
import CloseIcon from '../../icon19/Close';
import { EnsureDefaultTheme } from '../../theme';

type Props = {
	name: string,
	description?: string,
	onChange: Array<string> => void,
	error?: ?string,
	inputRef?: ?HTMLInputElement => void,
	placeholderText: string,
	tags: Array<string> | string
};

type State = {
	tags: Array<string>
};

const Field = styled.label`
	position: relative;
	margin-bottom: 1.5rem;
	display: block;
	width: 100%;
	max-width: 400px;
`;

const TagsContainer = styled.div`
	border-bottom: ${props => props.theme.color.gray} 1px solid;
	padding-bottom: 0.1rem;
`;

const Tags = styled.span`
	margin-bottom: 0;
`;

const CloseIconEl = styled(CloseIcon)`
	opacity: 1;
	color: ${props => props.theme.color.primary};
	width: 10px;
`;

const CloseTag = styled.span`
	display: inline-block;
	margin-left: 5px;
`;

const Tag = styled.span`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: 0 1rem;
	position: relative;
	margin: 5px 10px 5px 0;
	&:last-child {
		margin-right: 0;
	}
`;

/**
 * Added tag item template
 *
 * @param onClick
 * @param text the text of the tag
 * @param? featured
 * @param? isBlog
 * @param? blogId
 */
const AddedTag = (props: { onClick: () => mixed, text: string, featured?: boolean, isBlog?: boolean, blogId?: string }) => {
	const tagProps = {};
	if (props.isBlog) {
		tagProps.dataBlogId = props.blogId;
	}

	return (
		<Tag className={`tiny button ${props.featured ? 'button--primary' : 'button--tertiary'}`} {...tagProps}>
			<span spellCheck="false" title={`${props.text}`}>{props.text}</span>
			<CloseTag onClick={props.onClick}><CloseIconEl name='close' /></CloseTag>
		</Tag>
	);
};

const TagInput = styled.input`
	&& {
		color: ${props => props.theme.color.darksmoke};
		display: inline-block;
		width: auto;
		max-width: 100%;
		height: auto;
		padding: 0;
		margin-bottom: 0;
		min-height: 40px;
		font-size: 0.875rem;
		padding-left: 10px;
		transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;
	}
`;

const MAX_TAGS = 50;
const ADD_KEYS = [188, 13];
const REMOVE_KEYS = [8];

const DescriptionText = styled.span`
	color: ${props => props.error ? props.theme.color.alert : props.theme.color.gray};
	display: block;
	position: relative;
	top: 5px;
	transition: color 0.2s ease-in-out;
	line-height: 1.1rem;
`;
export class Tagfield extends Component<Props, State> {
	inputElement: HTMLInputElement;

	static defaultProps = {
		placeholderText: 'Add Tag...',
		tags: []
	}

	state: State = {
		tags: []
	}

	getStateFromProps = (props: Props) => {
		const tags = Array.isArray(props.tags) ? props.tags : props.tags.split(',');
		return { tags };
	}

	componentWillReceiveProps = (nextProps: Props) => {
		this.setState(this.getStateFromProps(nextProps));
	}

	addTag = (val: string) => this.setState({ tags: [...this.state.tags, val] })

	clearInput = () => this.inputElement.value = ''

	onTagAdded = () => {
		this.clearInput();

		if (this.props.onChange) {
			this.props.onChange(this.state.tags);
		}
	}

	onKeyDown = async (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
		const { which, currentTarget: { value } } = e;
		if (ADD_KEYS.includes(which) && value.trim().length > 0) {
			e.preventDefault(); // prevent adding comma
			await this.addTag(value);
			this.onTagAdded();
		} else if (REMOVE_KEYS.includes(which) && value.length === 0)  {
			const tags = this.state.tags;
			tags.pop();
			await this.setState({ tags });
		} else if (this.state.tags.length >= MAX_TAGS) {
			e.preventDefault();
		}
	}

	onFocus = () => {
		this.inputElement.placeholder = '';
	}

	onBlur = async (e: SyntheticFocusEvent<HTMLInputElement>) => {
		const { currentTarget: { value } } = e;

		if (value.length) {
			await this.addTag(value);
			this.onTagAdded();
		} else {
			this.inputElement.placeholder = this.props.placeholderText;
		}
	}

	onRemove = async (index: number) => {
		const tags = this.state.tags;
		tags.splice(index, 1);
		await this.setState({ tags });
	}

	setRef = (ref: ?HTMLInputElement) => {
		if (ref) {
			this.inputElement = ref;
		}
	}

	render = () => {
		const { description, error, placeholderText } = this.props;

		return (
			<EnsureDefaultTheme>
				<Field>
					<TagsContainer>
						<Tags>
							{this.state.tags.map((x, i) => <AddedTag onClick={() => this.onRemove(i)} key={x} text={x} />)}
						</Tags>
						<TagInput
							onBlur={this.onBlur}
							onFocus={this.onFocus}
							onKeyDown={this.onKeyDown}
							ref={this.setRef}
							placeholder={placeholderText}
							type='text'
						/>
					</TagsContainer>
					<DescriptionText error={error}>
						{error || description}
					</DescriptionText>
				</Field>
			</EnsureDefaultTheme>
		);
	}
}

export default Tagfield;
