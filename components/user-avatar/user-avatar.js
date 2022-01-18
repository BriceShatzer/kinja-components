// @flow
import * as React from 'react';
import styled from 'styled-components';

import LazyImage from 'kinja-components/components/elements/image';

import type { UserAvatarProps } from './';

export const UserAvatarContainer = styled.div`
	overflow: hidden;
	${({square}) => square ? 'border-radius: 3px;' : 'border-radius: 50%;'}
	width: ${({size}) => size };
	height: ${({size}) => size };
	img {
		width: 100%;
	}
`;

export const UserAvatar = ({
	lazy = true,
	size = '30px',
	square = false,
	transform = 'AvatarSmallAuto',
	image,
	className
}: UserAvatarProps) => (
	image ? <UserAvatarContainer className={`${lazy ? 'js_lazy-image' : ''} ${className || ''}`} size={size} square={square} >
		<LazyImage
			format={image.format}
			id={image.id}
			transform={transform}
		/>
	</UserAvatarContainer> : null
);
