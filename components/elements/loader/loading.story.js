/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	withDocs
} from 'base-storybook';

import { EnsureDefaultTheme } from '../../theme';

import README from './LOADING.md';

import Loading from './load-indicator';

const StoryContainer = styled.div`
	blockquote {
		margin-top: 30px;
	}
`;

storiesOf('3. Elements|Loader', module)
	.addDecorator(withDocs(README))
	.add('Loading', () => (
		<StoryContainer>
			<EnsureDefaultTheme>
				<Loading />
			</EnsureDefaultTheme>
			<blockquote>Above is a preview of the loader component, not a broken story.</blockquote>
		</StoryContainer>
	));
