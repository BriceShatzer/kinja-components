/* @flow */

import * as React from 'react';
import {
	action,
	storiesOf,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import TimeBox from './TimeBox';
import README from './README.md';


const Container = styled.div`
	display: flex;
	justify-content: center;
`;

storiesOf('4. Components|Datetime Picker', module)
	.addDecorator(withDocs(README))
	.add('TimeBox', () => {
		return (
			<Container>
				<TimeBox
					timemillis={DateTime.local().toMillis()}
					timezone={DateTime.local().toFormat('z')}
					onTimeChange={action('Time Changed')}
				/>
			</Container>
		);
	});