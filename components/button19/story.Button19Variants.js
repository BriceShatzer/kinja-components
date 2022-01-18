/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import {
	AmazonButton19,
	FacebookButton19,
	TwitterButton19
} from './button19-variants';
import Heart from '../icon19/Heart';


const Button19Variants = ({
	labelPosition,
	isSmall,
	label
}: {
	labelPosition: 'before' | 'after',
	isSmall: boolean,
	label: string
}) => {
	const props = {
		addMargin: true,
		isSmall,
		label,
		labelPosition
	};

	const ButtonWrapper = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	`;

	const Column = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 15px;
		margin-bottom: 0;

		/* to have top margin between button with same style, but different weight */
		[class*="ButtonWrapper"] + [class*="ButtonWrapper"] {
			margin-top: 20px;
		}
	`;

	const Title = styled.h2`
		margin-bottom: 1rem;
	`;

	const Buttons = (
		<ButtonWrapper>
			<Column>
				<Title>Amazon</Title>
				<AmazonButton19 icon={<Heart/>} {...props} />
				<AmazonButton19 smallText={'on Amazon'} largeText={'Buy for $1'} newDesign={true} />
			</Column>
			<Column>
				<Title>Facebook</Title>
				<FacebookButton19 icon={<Heart/>} {...props} />
			</Column>
			<Column>
				<Title>Twitter</Title>
				<TwitterButton19 icon={<Heart/>} {...props} />
			</Column>
			<Column>
				<Title>Disabled</Title>
				<AmazonButton19 disabled icon={<Heart/>} {...props} />
				<FacebookButton19 disabled icon={<Heart/>} {...props} />
				<TwitterButton19 disabled icon={<Heart/>} {...props} />
			</Column>
		</ButtonWrapper>
	);
	return Buttons;
};

export default Button19Variants;
