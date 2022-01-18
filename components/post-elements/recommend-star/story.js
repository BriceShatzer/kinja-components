/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	boolean,
	select,
	storiesOf
} from 'base-storybook';
import RecommendStar, { ActionIconWrapper } from './recommend-star';

const Wrapper = styled.div`
	position: relative;
	width: 500px;
	height: 500px;
	margin: auto;
	border: 1px solid black;

	${ActionIconWrapper} {
		opacity: 1;
	}
`;

storiesOf('3. Elements|Post Elements/Badge', module)
	.add('Recommend Star', () => (
		<Wrapper>
			<RecommendStar
				attributes={{'data-id': '123'}}
				isActive={boolean('active', false)}
				position={select('position', {
					right: 'right',
					left: 'left'
				})} />
		</Wrapper>
	));
