/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import { mockProfileApi } from './mocks';
import VerticalDistroContainer from './vertical-distro-container';
import README from './README.md';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 800;
`;

storiesOf('4. Components|Form/Vertical Distro Container', module)
	.addDecorator(withDocs(README))
	.add('Default', () => (
		<Wrapper>
			<VerticalDistroContainer blogId={0} profileApi={mockProfileApi} />
		</Wrapper>
	))
	.add('Empty', () => (
		<Wrapper>
			<VerticalDistroContainer blogId={0} profileApi={{ ...mockProfileApi, getBlogs: () => Promise.resolve([]) }} />
		</Wrapper>
	));
