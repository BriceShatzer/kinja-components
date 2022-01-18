/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Field from '../field';
import Icon19 from '../../icon19/icon19';

export type Props = {
	counter?: boolean,
	description?: string,
	error?: ?string,
	fullWidth?: boolean,
	inputRef?: ?HTMLInputElement => void,
	limit?: number,
	name?: string,
	onChange: string => void,
	onClick?: SyntheticInputEvent<HTMLInputElement> => void,
	placeholder?: string,
	type?: string,
	value?: string,
	typeahead?: boolean,
	icon?: React.Element<typeof Icon19>
};

export const Input = styled.input`
	&& {
		width: 100%;
		border: 0;
		border-bottom: 1px solid ${props => props.theme.color.gray};
		font-size: ${props => props.typeahead ? '1rem' : '1.4rem' };
		padding-left: ${props => props.typeahead ? '1.25rem' : '0' };
		padding-bottom: ${props => props.typeahead ? '.25rem' : '0.1rem' };
	}
`;

const Textfield = (props: Props) => {
	const { icon, description, onChange, error, type = 'text', inputRef, counter, value, limit, fullWidth, placeholder, typeahead, ...rest } = props;
	return (
		<Field label={description} value={value} error={error} counter={counter} limit={limit} fullWidth={fullWidth}>
			{ icon }
			<Input
				typeahead={typeahead}
				ref={inputRef}
				onChange={event => onChange(event.target.value)}
				placeholder={placeholder}
				type={type}
				value={value}
				{...rest}
			/>
		</Field>
	);
};

export default Textfield;
