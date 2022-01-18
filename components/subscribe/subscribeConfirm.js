/* @flow */

import React from 'react';
import BlogLogo from '../blog-logo';
import Button from '../buttons';
import Modal from '../modal';
import type { TranslateFunction } from '../translator';
import styled from 'styled-components';
import media from '../../style-utils/media';
import SubscribeContainer from './subscribe-container';
import { EnsureDefaultTheme } from '../theme';

import type { ModalProps } from '../modal/modal';

type SubscribeConfirmProps = {
	// The blog's group.
	blogGroup: string,
	// Whether to show double opt in success message or not
	doubleOptIn: boolean,
	// Used to open and close the modal.
	toggleConfirmModal: () => void,
	// Translator for success message
	translate: TranslateFunction
};

const Message = styled.div`
	margin-top: 36px;
`;

const ConfirmButton = styled(Button)`
	cursor: pointer;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	margin-top: 28px;

	${media.largeUp`
		margin-bottom: 20px;
	`}
`;

const SubscribeConfirm = ({
	blogGroup,
	doubleOptIn,
	isOpen,
	toggleConfirmModal,
	translate
}: ModalProps & SubscribeConfirmProps) => (
	<EnsureDefaultTheme>
		<Modal fullscreen transparent isOpen={isOpen} onClose={toggleConfirmModal}>
			<SubscribeContainer>
				<BlogLogo name={blogGroup} scale={0.8} />
				<Message>
					{translate(
						(doubleOptIn ?
							'Thank you for subscribing! You should receive a confirmation email shortly.' :
							'Thank you for subscribing!')
					)}
				</Message>
				<ConfirmButton onClick={toggleConfirmModal} label={translate('Okay')} />
			</SubscribeContainer>
		</Modal>
	</EnsureDefaultTheme>
);

export default SubscribeConfirm;
