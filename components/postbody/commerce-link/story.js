// @flow

import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	withDocs,
	withThemes
} from 'base-storybook';
import CommerceLink, { ButtonWrapper } from './commerce-link';
import README from './README.md';

const Container = styled.div`
	${ButtonWrapper} {
		width: 520px;
	}
`;

storiesOf('3. Elements|Post Body/CommerceLink', module)
	.addDecorator(withThemes)
	.addDecorator(withDocs(README))
	.add('CommerceLink', () => {
		return (
			<Container>
				<CommerceLink text="This is a commerce link" url="http://example.org"/>
			</Container>
		);
	});
