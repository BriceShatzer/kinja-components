/* @flow */

import * as React from 'react';
import styled from 'styled-components';

export const ErrorDisplay = styled.div`
	margin-top: 220px;
	margin-bottom: 100px;
	padding: 0 1.125rem;
	text-align: center;
`;

const ErrorBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: none;
	padding: 0 1.125rem;
`;

const PageError = styled.div`
	margin: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	z-index: 1;
	background: #222;
	min-height: 100px;
	padding: 30px;
	box-shadow: 20px 20px 0 rgba(0, 0, 0, 0.5);
	h1 {
		color: #fff;
		margin: 0;
	}
`;

type ErrorInMagma = Error & {uid: string, +status?: ?number };
function ErrorDetails(props: { error: ErrorInMagma, name?: string}) {
	const { error, name } = props;
	if ([400, 401, 404].indexOf(error.status) > -1) {
		return (
			<ErrorBox>
				<PageError>
					<a href="/?utm_source=errorpage"><div data-logoname={name} id="animatedLogo" /></a>
					<h1>{error.status} / {error.message}</h1>
				</PageError>
			</ErrorBox>
		);
	}
	return (
		<ErrorDisplay>
			<h1>Internal Server Error</h1>
			<code>@{error.uid}</code>
		</ErrorDisplay>
	);
}

export default ErrorDetails;
