/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	storiesOf,
	withDocs
} from 'base-storybook';
import { DateTime } from 'luxon';

import TimePicker from './TimePicker';
import README from './README.md';


const Container = styled.div`
	display: flex;
	justify-content: center;
`;

storiesOf('4. Components|Datetime Picker', module)
	.addDecorator(withDocs(README))
	.add('TimePicker', () => {
		return (
			<Container>
				<TimePicker
					timemillis={DateTime.local().toMillis()}
					timezone={DateTime.local().toFormat('z')}
					onTimeChange={action('Time Changed')}
				/>
			</Container>
		);
	});