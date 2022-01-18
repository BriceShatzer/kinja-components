/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	storiesOf,
	withDocs
} from 'base-storybook';

import AMPMSwitcher from './AMPMSwitcher';
import README from './README.md';


const Container = styled.div`
	display: flex;
	justify-content: center;
`;

storiesOf('4. Components|Datetime Picker', module)
	.addDecorator(withDocs(README))
	.add('AMPMSwitcher', () => {
		return (
			<Container>
				<AMPMSwitcher timemillis={new Date().getTime()} onChange={action('Value Changed')}/>
			</Container>
		);
	});