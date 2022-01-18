/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Toggle from '../toggle';
import { IconWrapper } from '../../icon19/icon19';

const noop = () => {};

type Props = {
	checked: boolean,
	selected?: boolean,
	stringRepresentation: string,
	onSelect?: () => void,
	value: *
};

export const DefaultOptionLayout = styled.div`
	display: flex;
	align-items: center;
	outline: none;

	img {
		height: 16px;
		margin-right: 10px;
		width: 16px;
	}

	${IconWrapper} {
		position: relative;
		margin-right: 5px;
		top: -2px;
	}
`;

const ToggleOptionWrapper = styled(DefaultOptionLayout)`
	justify-content: space-between;
`;

const ToggleOption = (props: Props) => (
	<ToggleOptionWrapper>
		<Toggle checked={props.checked} name={props.stringRepresentation} small flex onChange={noop} />
		<span>{props.stringRepresentation}</span>
	</ToggleOptionWrapper>
);

export default ToggleOption;
