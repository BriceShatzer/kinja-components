/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import Field from '../field';

export type Props = {
	name: string,
	description?: string,
	onChange: SyntheticInputEvent<HTMLInputElement> => void,
	error?: ?string,
	hide?: boolean
};

const Input = styled.input.attrs({
	type: 'file'
})`
	${props => props.hide ? css`
		display: none;
	` : ''}
`;

const Filefield = (props: Props) => {
	const { description, error } = props;
	return (
		<Field label={description} error={error}>
			<Input {...props} />
		</Field>
	);
};

export default Filefield;
