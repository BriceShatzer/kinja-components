/* @flow */

import type { ImageFormat } from 'postbody/Image';

export type CloudinaryResponse = {
	public_id: string,
	url: string,
	format: ImageFormat,
	width: number,
	height: number
};
