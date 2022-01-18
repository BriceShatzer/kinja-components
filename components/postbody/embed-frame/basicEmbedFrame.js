// @flow
import * as React from 'react';
import {
	getEmbedFrameParams,
	getEmbedFrameSizing,
	getLinkSupportUrl
} from './';
import classnames from 'classnames';
import type { BlockNodeTypeString } from 'postbody/BlockNodeBase';

type Props = {
	height?: number,
	id: string,
	url?: string,
	type: BlockNodeTypeString,
	aspectRatio?: string,
	embedHost?: string
};

/**
 * Simple Linksupport embed suitable for display on permalink pages
 */
function BasicEmbedFrame({
	height,
	id,
	type,
	aspectRatio,
	embedHost
}: Props): React$Node {
	const attributes = getEmbedFrameParams(type, id);
	const src = getLinkSupportUrl(id, type, embedHost);

	const dimensions = getEmbedFrameSizing(type, height);

	let className;
	if (aspectRatio === 'Fixed') {
		className = 'custom aspect';
	} else if (aspectRatio === 'Custom') {
		className = 'custom';
	}

	const iframeProps = {
		src,
		...attributes,
		...dimensions,
		frameBorder: 0,
		allowFullScreen: 'allowfullscreen',
		scrolling: 'no',
		webkitallowfullscreen: 'webkitAllowFullScreen',
		mozallowfullscreen: 'mozallowfullscreen',
		className: (className || attributes.className) ? classnames(className, attributes.className) : undefined
	};

	return (
		<p>
			<iframe {...iframeProps} />
		</p>
	);
}

export default BasicEmbedFrame;
