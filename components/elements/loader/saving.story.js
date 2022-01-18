/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	withDocs,
	boolean,
	select
} from 'base-storybook';

import { EnsureDefaultTheme } from '../../theme';

import README from './SAVING.md';

import Saving from './save-indicator';

const StoryContainer = styled.div`
	blockquote {
		margin-top: 30px;
	}
`;

const locales = {
	en: 'en-US',
	es: 'es-ES'
};

storiesOf('3. Elements|Loader', module)
	.addDecorator(withDocs(README))
	.add('Saving', () => (
		<StoryContainer>
			<EnsureDefaultTheme>
				<Saving
					isSaving={boolean('Saving is in progress', true)}
					language={select('Language', locales, locales.en)}
				/>
			</EnsureDefaultTheme>
		</StoryContainer>
	));
