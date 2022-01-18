// @flow
import VideoPlayer, { PlayIconContainer, PlayIconSVG } from './video-player';
import { autoplay, isAutoplay } from './autoplay';
import videoAnalytics from './video-analytics';

export {
	VideoPlayer,
	autoplay,
	isAutoplay,
	videoAnalytics,
	PlayIconContainer,
	PlayIconSVG
};

export type Experiments = {|
	experimentId?: string,
	experimentVar?: null | number
|};
