/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	number,
	boolean,
	storiesOf,
	withDocs
} from 'base-storybook';
import BlogAvatar from './blog-avatar';
import README from './README.md';

const AvatarsWrapper = styled.div`
	position: relative;
	margin: auto;
	width: 75%;
	display: flex;
	flex-wrap: wrap;
`;

const avatars = [
	'avclub',
	'clickhole',
	'deadspin',
	'earther',
	'gizmodo',
	'jalopnik',
	'jezebel',
	'kotaku',
	'lifehacker',
	'splinter',
	'theinventory',
	'theroot',
	'theonion',
	'thetakeout',
	'kinja',
	'gomedia'
];

storiesOf('3. Elements|Branding/Blog Avatar', module)
	.addDecorator(withDocs(README))
	.add('BlogAvatar', () => {
		return <AvatarsWrapper>
			{avatars.map(avatar =>
				<BlogAvatar
					key={avatar}
					name={avatar}
					size={number('size', 48)}
					monochrome={boolean('monochrome', false)}
				/>
			)}
		</AvatarsWrapper>;
	});