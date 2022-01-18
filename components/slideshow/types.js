// @flow

import type ImageNode from 'postbody/blockNodes/ImageNode';

export type AdSlideType = {
	type: 'ad',
	seen: boolean
};

export type SlideType = ImageNode | AdSlideType;
