// @flow

import videojs from 'video.js';
// $FlowFixMe
import 'videojs-contrib-ads';
// $FlowFixMe
import 'videojs-ima';
// $FlowFixMe
import 'videojs-contrib-quality-levels';

export default videojs;

export type VideojsMetadata = {
	id: string,
	title: string,
	network: string,
	playingIndex?: number,
	autoplay: boolean
}
