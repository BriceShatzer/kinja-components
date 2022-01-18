// @flow

import * as React from 'react';
import styled from 'styled-components';
import Modal from '../modal';
import Button, { ButtonWrapper } from '../button19';
import ArrowLeft from '../icon19/ArrowLeft';
import Trashcan from '../icon19/Trashcan';

type Props = {|
	onConfirm: () => void,
	onKeepEditing: () => void,
	isOpen: boolean
|}

const Paragraph = styled.p`
	text-align: center;
	font-size: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.fontSizes.medium :
		props.theme.typography.body.fontSizes.medium};
	line-height: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.lineHeights.medium :
		props.theme.typography.body.lineHeights.medium};
`;

const ButtonContainer = styled.div`
	display: flex;

	${ButtonWrapper} {
		margin: 0 0.5rem;
	}
`;

export default function ConfirmationModal(props: Props) {
	const { isOpen, onConfirm, onKeepEditing } = props;
	return (
		<Modal isOpen={isOpen} onClose={onKeepEditing}>
			<Paragraph>You have unsaved changes.<br />Do you want to discard them or keep editing?</Paragraph>
			<ButtonContainer>
				<Button
					variant="primary"
					onClick={onKeepEditing}
					label="Keep editing"
					icon={<ArrowLeft />}
					labelPosition="after"
				/>
				<Button
					variant="secondary"
					onClick={onConfirm}
					label="Discard changes"
					icon={<Trashcan />}
					labelPosition="after"
				/>
			</ButtonContainer>
		</Modal>
	);
}