// @flow

import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	boolean,
	withThemes
} from 'base-storybook';

import VideoThumbnail from '../video-thumbnail';

const Wrapper = styled.div`
	position: relative;
	padding-bottom: 56.25%;
`;

storiesOf('3. Elements|Video/Video thumbnail', module)
	.addDecorator(withThemes)
	.add('video thumbnail', () => {
		return (
			<Wrapper>
				<VideoThumbnail
					thumbnailId='yh2ve47yxssjraxnrkv4'
					nowPlaying={boolean('Now playing?', false)}
					standalone={boolean('Standalone?', false)}
					preventFullsize={boolean('Prevent full size?', false)}
				/>
			</Wrapper>
		);
	});
