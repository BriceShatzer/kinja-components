/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import Modal, { Close } from 'kinja-components/components/modal/modal';
import Button, { ButtonWrapper } from 'kinja-components/components/buttons/Button';
import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';


const Title = styled.p`
	margin-bottom: 15px;
	font-size: 22px;
	line-height: 26px;
	font-weight: bold;
	color: ${props => props.theme.color.black};
`;

const Text = styled.p`
	margin-bottom: 65px;
	font-size: 18px;
	line-height: 22px;
	color: ${props => props.theme.color.black};
	text-align: center;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 222px;

	${ButtonWrapper} {
		width: 103px;
	}
`;

const StyledModal = styled(Modal)`
	padding: 30px 35px 40px;
	min-height: initial;

	${Close} {
		top: 30px;
	}

	${media.mediumUp`
		padding: 30px 176px 40px;

		${Title} {
			margin-bottom: 30px;
			font-size: 24px;
			line-height: 29px;
		}

		${Text} {
			margin-bottom: 80px;
			white-space: nowrap;
		}
	`}
`;

type Props = {
	displayName: string,
	isOpen: boolean,
	locale: string,
	onClose: () => void,
	onSubmit: () => void
}

const UnshareModal = (props: Props) => {
	const translate = createTranslate(translations, props.locale);
	return (
		<EnsureDefaultTheme>
			<StyledModal isOpen={props.isOpen} onClose={props.onClose} transparent>
				<Title>{translate('Unshare this post')}</Title>
				<Text>{translate('Are you sure you want to unshare from')} {props.displayName}?</Text>
				<ButtonContainer>
					<Button weight="secondary" label="Cancel" small onClick={props.onClose} />
					<Button label="Okay" small onClick={props.onSubmit} />
				</ButtonContainer>
			</StyledModal>
		</EnsureDefaultTheme>
	);
};

UnshareModal.defaultProps = {
	locale: 'en-US'
};

export default UnshareModal;