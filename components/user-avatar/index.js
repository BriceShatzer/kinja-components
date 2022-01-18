// @flow

import type SimpleImage from 'kinja-magma/models/SimpleImage';
import type { TransformName } from '../../../kinja-images/types.js';

export type UserAvatarProps = {
	lazy?: boolean,
	size?: string,
	square?: boolean,
	transform?: TransformName,
	image: ?SimpleImage,
	className?: string
}

export { UserAvatar, UserAvatarContainer } from './user-avatar';
