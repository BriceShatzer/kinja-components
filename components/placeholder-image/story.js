// @flow

import React from 'react';
import {
	storiesOf,
	boolean
} from 'base-storybook';
import styled from 'styled-components';

import { blogThemes as Themes } from '../theme/themes';
import placeholderImage from 'kinja-images/placeholderImage';

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 40px;
	> div {
		width: 50%;
		margin-bottom: 20px;
	}
`;

storiesOf('3. Elements|Branding/Blog Placeholder', module)
	.add('Blog Placeholder', () => {
		const isSaturated = boolean('Is saturated?', true);

		return (
			<Wrapper>
				{Object.keys(Themes).map((blog =>
					<div key={blog}>
						<h4>{blog}</h4>
						<img src={placeholderImage(blog, isSaturated)}/>
					</div>
				))}
			</Wrapper>
		);
	}
	);
