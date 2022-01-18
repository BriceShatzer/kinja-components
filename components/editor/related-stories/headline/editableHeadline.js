/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../../../theme';
import Textfield18 from '../../../form/textfield18';
import { KinjaTextField } from '../../../form/textfield18/textfield';

type Props = {
	value: string,
	onManuallyEdit?: (value: string) => void
};

const Container = styled.div`
	display: flex;
	width: 100%;
`;

const Headline = styled(Textfield18)`
	width: 100%;
	margin-bottom: 0;

	${KinjaTextField} {
		font-size: 22px;
		border-bottom: none;
		color: ${props => props.theme.color.darkgray};
	}
`;

const EditableHeadline = (props: Props) => {

	const { onManuallyEdit, value } = props;

	const onChange = (value: string) => {
		if (onManuallyEdit) {
			onManuallyEdit(value);
		}
	};

	return (
		<EnsureDefaultTheme>
			<Container>
				<Headline onChange={onChange} value={value} />
			</Container>
		</EnsureDefaultTheme>
	);
};

export default EditableHeadline;
