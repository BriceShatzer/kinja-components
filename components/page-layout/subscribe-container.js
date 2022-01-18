// @flow

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import { FormWrapper as FormInner } from '../subscribe/forms/subscribe';

const SubscribeFormWrapper = styled.div`
	background-color: ${props => props.theme.color.whitesmoke};
	border-top: 1px solid ${props => props.theme.color.lightgray};

	${FormInner} {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 26px 30px;
	}
`;

const SubscribeContainer = ({ children }: {children?: React.Node}) =>
	<EnsureDefaultTheme>
		<SubscribeFormWrapper className="js_subscribe">
			{children}
		</SubscribeFormWrapper>
	</EnsureDefaultTheme>;

export default SubscribeContainer;
