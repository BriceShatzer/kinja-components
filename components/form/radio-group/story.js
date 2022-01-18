// @flow

import * as React from 'react';
import {
	action,
	blogGroup,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';
import Radio from '../radio';
import RadioGroup from './';
import README from './README.md';
import Theme from 'kinja-components/components/theme';


storiesOf('4. Components|Form/Radio Group', module)
	.addDecorator(withDocs(README))
	.add('Radio Group', () => {
		const Container = styled.div`
			margin: 0 auto;
		`;
		const name = '1980s Sports Cars';

		return (
			<Theme blog={blogGroup()}>
				<Container>
					<RadioGroup
						error={text('Error', '')}
						inlineHelp={text('Inline Help', 'You can choose only one of these cars')}
						name={name}
						onChange={action('onChange')}
						title={text('Title', name)}
					>
						<Radio label="Ferrari F40" checked value="Ferrari F40" />
						<Radio label="Porsche 959" value="Porsce 959"/>
						<Radio label="Nissan R32 Skyline GT-R" value="Nissan R32 Skyline GT-R" />
						<Radio label="Ford Thunderbird Super Coupe" value="Ford Thunderbird Super Coupe" />
					</RadioGroup>
				</Container>
			</Theme>
		);
	});
