// @flow

import * as React from 'react';
import type { BlockNode } from 'postbody/BlockNode';
import {
	BLOCK_NAMES_TO_LINKSUPPORT_PROVIDERS
} from 'postbody/BlockNode';
import queryString from 'query-string';
import classNames from 'classnames';
import getEmbedFrameSizing from './getEmbedFrameSizing';
import getSpanClassNames from './getSpanClassNames';
import InlineNodes from '../inline-node';
import getThumbnail from 'postbody/utils/getThumbnail';
import getLinkSupportId from 'postbody/utils/getLinksupportId';
import getAlignment from 'postbody/utils/getAlignment';
import getCaption from 'postbody/utils/getCaption';

type Props = {
	node: BlockNode,
	autoResize?: boolean, /* Whether embed should automatically resize */
	urlParams?: { [string]: string }, /* Extra URL parameters to pass in to the frame */
	sizeClasses?: string, // Overwrite sizeclasses defined in getSpanClassNames
	captionsEnabled?: boolean
}

const getLinkSupportIdString = (node: BlockNode) => {
	const id: string = getLinkSupportId(node);
	const provider = BLOCK_NAMES_TO_LINKSUPPORT_PROVIDERS[node.type];
	if (!id || !provider) {
		return undefined;
	}
	if (provider.indexOf('livestream-') === 0) {
		return `${provider}:${id}`;
	} else {
		return `${provider}-${id}`;
	}
};

const EmbedFrameInEditor = (props: Props) => {
	const { node, urlParams, autoResize, sizeClasses: sizeClassesOverrides, captionsEnabled } = props;
	const id = getLinkSupportIdString(node);
	const thumbnail = getThumbnail(node);
	let iframeParams = {};
	if (node.type === 'KinjaVideo') {
		iframeParams = {
			id,
			...urlParams,
			autosize: autoResize ? 1 : undefined,
			cloudinaryImageOverride: thumbnail ? thumbnail.id : undefined,
			cloudinaryImageOverrideFormat: thumbnail ? thumbnail.format : undefined
		};
	} else {
		iframeParams = {
			id,
			...urlParams,
			autosize: autoResize ? 1 : undefined,
			start: node.start || undefined
		};
	}
	const frameUrl = '/ajax/inset/iframe?' + queryString.stringify(iframeParams);

	const wrapperProps = {
		'data-start-time': (typeof node.start === 'number') ? node.start : undefined,
		'data-thumb-id': thumbnail && thumbnail.id,
		'data-thumb-format': thumbnail && thumbnail.format,
		'data-data-initial-video': node.initialVideo || undefined
	};
	const alignment = getAlignment(node);
	const aligmentClass = alignment && `align--${alignment.toLowerCase()}`;
	const dimensions = getEmbedFrameSizing(node.type);
	const sizeClasses = sizeClassesOverrides ? [sizeClassesOverrides] : getSpanClassNames(node.type);
	const caption = getCaption(node);

	return (
		<aside
			className={classNames('embed-inset embed-inset--show-overlay', aligmentClass, {
				'video-embed': aligmentClass
			})}
			{...wrapperProps}
			contentEditable={false}
		>
			<kinja-sandbox id={id} contenteditable="false" class={classNames('wysiwyg-embed', ...sizeClasses)}>
				<iframe
					frameBorder="0"
					allowFullScreen="allowfullscreen"
					src={frameUrl}
					data-insecure="false"
					x-loaded="1"
					{...dimensions}
				/>
			</kinja-sandbox>
			{captionsEnabled && caption && caption.length > 0 && (
				<footer contentEditable suppressContentEditableWarning>
					<InlineNodes nodes={caption} />
				</footer>
			)}
		</aside>
	);
};

export default EmbedFrameInEditor;
