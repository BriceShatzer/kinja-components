// @flow

import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	select,
	withDocs
} from 'base-storybook';

import BlurredBackground from '../blurred-background';
import README from './README.md';

const Container = styled.div`
	min-width: 800px;
`;

storiesOf('3. Elements|Blurred Background', module)
	.addDecorator(withDocs(README))
	.add('BlurredBackground', () => {
		const imageIds = [
			'xwy7qexzvrmrr7wlhbqs',
			'x2e77e4kgxregcwsaysz',
			'v8yyojhz9vfudyzkr9s7'
		];

		const background = select('Background', imageIds, imageIds[0]);

		return (
			<Container>
				<BlurredBackground
					background={background}
				>
					<div style={{width: '100%', height: 400}}></div>
				</BlurredBackground>
			</Container>
		);
	});
