// @flow

import * as React from 'react';

import type { IframeProperties } from 'postbody/blockNodes/Iframe';

import {
	IframePlaceholder
} from '../embed-frame';

const AmpIframe = ({
	width,
	height,
	aspectRatio,
	scrollable,
	source,
	thumbnail
}: IframeProperties) => {
	const isHttp = source.indexOf('http://') === 0;
	if (isHttp) {
		const domain = new URL(source).hostname;

		const placeholderProps = {
			source,
			domain,
			width,
			aspectRatio,
			thumbnail
		};
		return (
			<IframePlaceholder
				{...placeholderProps}
			/>
		);
	}

	const dimensions = {
		width: width ? width.toAttribute() : undefined,
		height: height ? height.toAttribute() : undefined
	};
	const scrolling = scrollable ? 'yes' : 'no';
	const isGawkerInternalSite = source.indexOf('gawker-') > -1;
	const isHttps = source.indexOf('https://') === 0;
	const actualSource = ((isHttps || isGawkerInternalSite)) ? source.replace('^http(s?)://', '//') : source;

	const iframeProps = {
		...dimensions,
		sandbox: 'allow-same-origin allow-scripts allow-forms',
		src: actualSource,
		allowFullScreen: 'allowfullscreen',
		layout: 'responsive',
		scrolling
	};

	return (
		<p>
			<span className="flex-video">
				<amp-iframe {...iframeProps}>
					<amp-img src="https://i.kinja-img.com/gawker-media/image/upload/f5f5f5_f3ytsm.png" width="139" height="107" alt="Embed preview placeholder"
						placeholder layout="responsive"></amp-img>
					<span overflow='' tabIndex="0" role="button" aria-label="Read more">Read more <a href={source}> here</a></span>
				</amp-iframe>
			</span>
		</p>
	);
};

export default AmpIframe;
