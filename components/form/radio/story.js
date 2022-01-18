// @flow

import * as React from 'react';
import {
	action,
	blogGroup,
	boolean,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';

import Theme from 'kinja-components/components/theme';
import Radio from './';
import README from './README.md';

storiesOf('3. Elements|Form/Radio', module)
	.addDecorator(withDocs(README))
	.add('Radio', () => {
		const Container = styled.div`
			margin: 0 auto;
		`;
		const name = '1980s Sports Car';

		return (
			<Theme blog={blogGroup()}>
				<Container>
					<Radio
						checked={boolean('Checked', true)}
						inlineHelp={text('Inline Help', '')}
						label={text('Label', 'Ferrari F40')}
						name={name}
						onClick={action('onClick')}
						value="Ferrari F40"
					/>
				</Container>
			</Theme>
		);
	});
