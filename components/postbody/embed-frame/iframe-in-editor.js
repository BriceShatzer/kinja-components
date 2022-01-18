// @flow

import * as React from 'react';
import type Iframe from 'postbody/blockNodes/Iframe';
import classNames from 'classnames';
import { isWhitelistedSource, proxiedQuery, iframeSrcWithThumb } from './proxy-iframe';
import Dimension from 'postbody/Dimension';
import getThumbnail from 'postbody/utils/getThumbnail';

type Props = {
	node: Iframe,
	autoResize?: boolean, /* Whether embed should automatically resize */
	urlParams?: { [string]: string }, /* Extra URL parameters to pass in to the frame */
	sizeClasses?: string, // Overwrite sizeclasses defined in getSpanClassNames
	toolbarEnabled?: boolean
}

const dimensionToAttribute = dimension => new Dimension(dimension.value, dimension.unit).toAttribute();

const IframeInEditor = (props: Props) => {
	const { node, toolbarEnabled } = props;
	const thumbnail = getThumbnail(node);
	const thumbnailData = thumbnail ? {
		'data-thumb-id': thumbnail.id,
		'data-thumb-format': thumbnail.format
	} : {};

	// Iframe embeds need to be proxied if they are not from one of our whitelistede urls
	const originalSrc = node.source;
	const insecure = originalSrc.indexOf('http://') === 0;
	const proxiedSrc = isWhitelistedSource(originalSrc) ? originalSrc : proxiedQuery + encodeURIComponent(originalSrc);
	const srcWithThumb = thumbnail ? iframeSrcWithThumb(proxiedSrc, thumbnail) : proxiedSrc;
	const width = node.width ? dimensionToAttribute(node.width) : '640px';
	const height = node.height ? dimensionToAttribute(node.height) : '360px';

	return (
		<aside
			className={classNames('embed-iframe', {
				'embed-inset--show-overlay': toolbarEnabled,
				'embed-iframe__non-ssl': insecure
			})}
			{...thumbnailData}
			contentEditable={false}
		>
			<kinja-sandbox contenteditable="false" class={classNames('wysiwyg-embed', { 'non-ssl-iframe': insecure })}>
				<iframe
					className={classNames({
						flex: node.aspectRatio !== 'Fixed' && node.aspectRatio !== 'Custom',
						aspect: node.aspectRatio === 'Fixed',
						custom: node.aspectRatio === 'Fixed' || node.aspectRatio === 'Custom'
					})}
					src={srcWithThumb}
					scrolling={node.scrollable && !insecure ? 'auto' : 'no'}
					width={width}
					height={height}
					data-insecure={insecure || undefined}
				/>
			</kinja-sandbox>
		</aside>
	);
};

export default IframeInEditor;
