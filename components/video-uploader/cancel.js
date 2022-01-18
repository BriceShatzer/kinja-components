/* @flow */

import React from 'react';
import styled from 'styled-components';
import Button from '../buttons';

type Props = {
	onCancel: () => void,
	onContinue: () => void
};

const Heading = styled.h4`
	font-weight: normal;
`;

const ButtonGroup = styled.div`
	text-align: center;
`;

const ContinueButton = styled(Button)`
	margin-right: 15px;
`;

const Cancel = ({
	onCancel,
	onContinue
}: Props) => {
	return (
		<div className='text--center'>
			<Heading>Are you sure you want to cancel the video upload?</Heading>
			<ButtonGroup>
				<ContinueButton label='Keep uploading' small onClick={onContinue} />
				<Button label='Cancel the upload' small onClick={onCancel} weight='secondary' />
			</ButtonGroup>
		</div>
	);
};

export default Cancel;