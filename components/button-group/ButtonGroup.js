/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { ButtonWrapper } from '../buttons/Button';
import ButtonGroupItem from './ButtonGroupItem';
import ItemGroup from '../elements/item-group';


const ButtonGroupWrapper = styled.div`
	display: flex;
	white-space: nowrap;

	${ButtonWrapper} {
		border-radius: 0;

		&:not(:last-child) {
			margin-right: -1px;
		}

		&:first-child {
			border-radius: ${props => props.small ? '21px 0 0 21px' : '34px 0 0 34px'};
		}

		&:last-child {
			border-radius: ${props => props.small ? '0 21px 21px 0' : '0 34px 34px 0'};
		}

		&:hover {
			z-index: 1;

			+ ${ButtonWrapper} {
				border-left: 1px solid ${props => darken(0.2, props.theme.color.primary)};
			}
		}
	}
`;

type Props = {
	children: React.ChildrenArray<React.Element<typeof ButtonGroupItem>>,
	htmlElement?: string,
	onChange: string => void,
	small?: boolean
}

const ButtonGroup = (props: Props) => {
	const { small } = props;

	return (
		<ItemGroup
			htmlElement={ButtonGroupWrapper}
			childrenProps={{ small }}
			{...props}
		>
			{props.children}
		</ItemGroup>
	);
};


export default ButtonGroup;
