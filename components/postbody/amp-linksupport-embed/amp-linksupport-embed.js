// @flow

import * as React from 'react';

import AmpIframePlaceholder from './amp-iframe-placeholder';

type LinkSupportOptions = {
	id: string,
	width: number,
	height: number
}

const AmpLinkSupport = ({ id, width, height }: LinkSupportOptions) => {
	const frameUrl = `https://kinja.com/ajax/inset/iframe?id=${id}`;
	return (
		<amp-iframe
			src={frameUrl}
			width={width}
			height={height}
			sandbox='allow-scripts allow-same-origin'
			frameborder='0'
			resizable=''
			layout='responsive'>
			<AmpIframePlaceholder />
		</amp-iframe>
	);
};

export default AmpLinkSupport;
