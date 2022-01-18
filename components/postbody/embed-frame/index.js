// @flow

import EmbedFrame from './embedFrame';
import BasicEmbedFrame from './basicEmbedFrame';
import MixcloudFrame from './mixcloudFrame';
import Iframe from './iframe';
import IframePlaceholder from './iframe-placeholder';
import IframeUnsupported from './iframe-unsupported';
import DeletedEmbed from './deleted-embed-placeholder';

import getEmbedFrameSizing from './getEmbedFrameSizing';
import getEmbedFrameParams from './getEmbedFrameParams';
import getLinkSupportUrl from './getLinkSupportUrl';
import getSpanClassNames from './getSpanClassNames';
import getWrapperClassNames from './getWrapperClassNames';

export default EmbedFrame;

export {
	BasicEmbedFrame,
	DeletedEmbed,
	getEmbedFrameParams,
	getEmbedFrameSizing,
	getLinkSupportUrl,
	getSpanClassNames,
	getWrapperClassNames,
	Iframe,
	IframePlaceholder,
	IframeUnsupported,
	MixcloudFrame
};
