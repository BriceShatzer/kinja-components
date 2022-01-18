/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	storiesOf,
	withDocs
} from 'base-storybook';
import { DateTime } from 'luxon';

import DateTimePicker from './DateTimePicker';
import README from './README.md';


const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

storiesOf('4. Components|Datetime Picker', module)
	.addDecorator(withDocs(README))
	.add('Datetime Picker', () => {
		return (
			<Container>
				<DateTimePicker
					onDateChange={action('Date changed')}
					timemillis={DateTime.local().toMillis()}
					timezone={DateTime.local().toFormat('z')}
				/>
			</Container>
		);
	});