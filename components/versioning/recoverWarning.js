// @flow

import React from 'react';
import styled from 'styled-components';
import Button from '../buttons';

const Wrapper = styled.div`
	text-align: center;
`;

const Title = styled.h1`
	font-size: 24px;
	line-height: 29px;
	font-weight: normal;
`;

const ButtonWrapper = styled.div`
	margin: 10px 10px 0;
`;

export default function RecoverWarning({onCancel, onProceed}: {
	onCancel: () => void,
	onProceed: () => void
}) {
	return (
		<Wrapper>
			<Title>Are you sure you want to recover?</Title>
			<p>It&apos;ll erase any current changes you have.</p>
			<div className="flex-row flex-row--align-center">
				<ButtonWrapper>
					<Button label="Cancel" weight="secondary" small onClick={onCancel} />
				</ButtonWrapper>
				<ButtonWrapper>
					<Button label="Recover" weight="primary" small onClick={onProceed} />
				</ButtonWrapper>
			</div>
		</Wrapper>
	);
}
