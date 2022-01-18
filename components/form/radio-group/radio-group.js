// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';

import Radio, { Wrapper as RadioWrapper } from '../radio';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import { StyledFeedback } from 'kinja-components/components/elements/feedback';


const Title = styled.span`
	font-size: 18px;
	line-height: 23px;
	color: ${({ theme }) => theme.color.darkgray};
`;

const InlineHelp = styled.span`
	display: block;
	margin-top: 4px;
	font-size: 14px;
	line-height: 18px;
	color: ${({ theme }) => theme.color.gray};
`;

export const ButtonWrapper = styled.div`
	${props => props.hasTitle && css`
		margin-top: 16px;
	`}

	${RadioWrapper} {
		height: 23px;
	}

	${RadioWrapper}:not(:last-child) {
		margin-bottom: 16px;
	}
`;

const Container = styled.div`
	${StyledFeedback} {
		margin-top: 1rem;
	}
`;

type Props<ValueType> = {
	children: Array<React.Element<typeof Radio>>,
	error?: string,
	inlineHelp?: string,
	name: string,
	onChange: ValueType => void,
	title?: string
}

type State<ValueType> = {
	checked: ?ValueType
}

export default class RadioGroup<ValueType> extends React.Component<Props<ValueType>, State<ValueType>> {
	constructor(props: Props<ValueType>) {
		super(props);

		const defaultChecked = this.props.children.find(radio => radio.props.checked);
		this.state = {
			checked: defaultChecked ? defaultChecked.props.value : null
		};
	}

	onChange = (value: ValueType) => {
		if (value !== this.state.checked) {
			this.setState({
				checked: value
			}, () => {
				this.props.onChange(value);
			});
		}
	}

	render() {
		const { children, error, inlineHelp, name, title } = this.props;
		return (
			<EnsureDefaultTheme>
				<Container>
					{title && <Title>{title}</Title>}
					{title && inlineHelp && <InlineHelp>{inlineHelp}</InlineHelp>}
					<ButtonWrapper hasTitle={Boolean(title)}>
						{children.map(radio => {
							return React.cloneElement(radio, {
								checked: radio.props.value === this.state.checked,
								key: radio.props.value,
								name,
								onClick: this.onChange
							});
						})}
					</ButtonWrapper>
					{error && <StyledFeedback text={error} color='error' arrow='topleft' />}
				</Container>
			</EnsureDefaultTheme>
		);
	}
}
