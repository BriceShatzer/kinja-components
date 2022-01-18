/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Button from '../../../buttons';
import Modal from '../../../modal';
import type { Props as ButtonProps } from 'kinja-components/components/buttons/Button';
import type { ModalProps } from '../../types';

const StyledModal = styled(Modal)`
	width: 720px;
	min-height: initial;
	padding: 30px;

	h3 {
		text-align: center;
		margin: 0 30px 30px 30px;
	}
`;

const ButtonContainer = styled.div`
	button:not(:first-child) {
		margin-left: 15px;
	}
`;

type Props = {
	text: string,
	buttonProps: Array<ButtonProps>
} & ModalProps;

// color={weight === 'secondary' ? 'primary' : 'white'}

export default function SpecialSectionConfirmationModal({ isOpen, text, onClose, buttonProps }: Props) {
	return (
		<StyledModal isOpen={isOpen} onClose={onClose} contentPadding regular>
			<h3>{text}</h3>
			{buttonProps && (
				<ButtonContainer>
					{buttonProps.map(({ iconName, icon, weight, ...button }) =>
						<Button
							key={iconName}
							icon={icon}
							weight={weight}
							{...button}
						/>
					)}
				</ButtonContainer>
			)}
		</StyledModal>
	);
}
