/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import {
	storiesOf,
	withDocs,
	text,
	boolean,
	number
} from 'base-storybook';

import Field from  './field';
import README from './README.md';

const Wrapper = styled.div`
	max-width: 600px;
`;

storiesOf('3. Elements|Form/Field', module)
	.addDecorator(withDocs(README))
	.add('Field', () => {
		const value = text('Value', 'Any* input can be wrapped in a Field');
		return (
			<Wrapper>
				<Field
					label={text('Label', '* Not all of them')}
					error={text('Error')}
					value={value}
					counter={boolean('Character counter', false)}
					limit={number('Character limit') || 0}
					fullWidth={boolean('Full width', false)}
				>
					<input value={value} onChange={() => {}} />
				</Field>
			</Wrapper>
		);
	});
