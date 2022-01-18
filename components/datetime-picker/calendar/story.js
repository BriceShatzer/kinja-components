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

import Calendar from './Calendar';
import README from './README.md';


const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 324px;
	margin: 0 auto;
`;

storiesOf('4. Components|Datetime Picker', module)
	.addDecorator(withDocs(README))
	.add('Calendar', () => {
		return (
			<Container>
				<Calendar
					blogTheme={blogGroup()}
					timemillis={DateTime.local().toMillis()}
					timezone={DateTime.local().toFormat('z')}
					onDateChange={action('Date')}
				/>
			</Container>
		);
	});
