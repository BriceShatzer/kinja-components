/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Checkbox from '../checkbox';
import type { CheckboxProps } from '../checkbox';
import { StyledFeedback } from 'kinja-components/components/elements/feedback';

type Props = {
	checkboxProps: Array<CheckboxProps>,
	error?: string
};

const StyledCheckboxes = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: left;
	width: 100%;

	label {
		flex: 0 0 33.33%;
	}
`;

const CheckboxListWrapper = styled.div`
	margin-bottom: 0.5rem;
`;

function CheckboxList(props: Props) {
	const { checkboxProps } = props;
	const checkboxes = checkboxProps.map((singleCheckboxProp, index) => {
		const k = index + singleCheckboxProp.label;
		return <Checkbox key={k} {...singleCheckboxProp} />;
	});
	return (
		<CheckboxListWrapper>
			<StyledCheckboxes>
				{checkboxes}
			</StyledCheckboxes>
			{props.error && <StyledFeedback text={props.error} color='error' arrow='topleft' />}
		</CheckboxListWrapper>
	);
}

export default CheckboxList;
