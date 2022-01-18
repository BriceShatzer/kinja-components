/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	blogGroup,
	storiesOf,
	withDocs
} from 'base-storybook';
import { DateTime } from 'luxon';

import DatePicker from './DatePicker';
import README from './README.md';


const Container = styled.div`
	display: flex;
	justify-content: center;
`;

storiesOf('4. Components|Datetime Picker', module)
	.addDecorator(withDocs(README))
	.add('Date Picker', () => {
		return (
			<Container>
				<DatePicker
					blogTheme={blogGroup()}
					timemillis={DateTime.local().toMillis()}
					timezone={DateTime.local().toFormat('z')}
					onDateChange={action('Date changed')}
				/>
			</Container>
		);
	});