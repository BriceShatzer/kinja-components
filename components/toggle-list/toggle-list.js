/* @flow */

import * as React from 'react';
import { Toggle, ToggleWrapper } from '../form';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import type { ToggleProps } from '../types';

type Props = { toggles: Array<ToggleProps> };

const ToggleListContainer = styled.div`
	display: flex;
	flex-direction: column;

	${ToggleWrapper} {
		margin-bottom: 15px;
	}
`;

const ToggleList = (props: Props) =>
	<EnsureDefaultTheme>
		<ToggleListContainer>
			{props.toggles.map(toggle => <Toggle {...toggle} key={toggle.name}/>)}
		</ToggleListContainer>
	</EnsureDefaultTheme>;

export default ToggleList;
