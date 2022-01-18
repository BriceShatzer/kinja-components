/* @flow */
import * as React from 'react';
import {
	boolean,
	select,
	storiesOf,
	withDocs
} from 'base-storybook';

import styled from 'styled-components';

import MetaTime from './meta-time';
import README from './README.md';

import { createPostId } from 'kinja-magma/models/Id';

const now = Date.now();
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const times = [
	{ reason: 'now',             millis: now },
	{ reason: 'minutes',         millis: now - minute  },
	{ reason: 'minutes',         millis: now - 2 * minute },
	{ reason: 'hours',           millis: now - hour },
	{ reason: 'hours',           millis: now - 1.999 * hour },
	{ reason: 'today',           millis: now - 3 * hour },
	{ reason: 'yesterday',       millis: now - day },
	{ reason: 'pastweek',        millis: now - (new Date()).getDay() * day },
	{ reason: 'greaterthanweek', millis: now - 365 * day },
	{ reason: 'future',          millis: now + day }
];

const Reason = styled.span`
	display: ${props => (props.display ? 'inline' : 'none')};
`;

storiesOf('3. Elements|Post Elements/Meta', module)
	.addDecorator(withDocs(README))
	.add('Meta Time', () => (
		<ul>
			{times.map((t, index) => (
				<li key={t.millis}>
					<MetaTime
						index={index}
						permalink="https://gizmodo.com"
						millis={t.millis}
						timezone={select('Timezone', { 'New York': 'America/New_York', 'Budapest': 'Europe/Budapest' }, 'America/New_York')}
						pageType="frontpage"
						postId={createPostId(424242)}
						isScheduled={boolean('isScheduled', false)}
						locale={select('Locale', { 'en-US': 'en-US', 'es-ES': 'es-ES' }, 'en-US')}
					/>
					<Reason display={boolean('(debug) show reason', false)}> ({t.reason})</Reason>
				</li>
			))}
		</ul>
	));
