// @flow

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	blogGroup,
	storiesOf,
	withDocs
} from 'base-storybook';
import { DateTime } from 'luxon';

import DateFilter from './';
import README from './README.md';


storiesOf('4. Components|Search/Filter', module)
	.addDecorator(withDocs(README))
	.add('Date Filter', () => {
		const Container = styled.div`
			width: 301px;
			margin: 0 auto;
		`;

		return (
			<Container>
				<DateFilter
					blogTheme={blogGroup()}
					defaultChecked="Show all stories"
					onChange={action('onChange')}
					currentTimemillis={DateTime.local().toMillis()}
					timezone={DateTime.local().toFormat('z')}
				/>
			</Container>
		);
	});