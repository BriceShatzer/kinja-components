/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import BlogAvatar, { BlogAvatarWrapper } from '../../blog-avatar';

const BlogOptionWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	${BlogAvatarWrapper} {
		margin-right: 5px;
	}
`;

type Props = {
	icon?: string,
	selected?: boolean,
	stringRepresentation: string,
	onSelect?: () => void
};

const BlogOption = (props: Props) => (
	<BlogOptionWrapper>
		{props.icon ?
			<BlogAvatar name={props.icon} size={15} /> :
			<BlogAvatar size={18} name="kinja" />
		}
		{props.stringRepresentation}
	</BlogOptionWrapper>
);

export default BlogOption;
