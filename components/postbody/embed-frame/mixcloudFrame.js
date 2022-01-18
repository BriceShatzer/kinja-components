// @flow
import * as React from 'react';
import querystring from 'querystring';

import type { MixcloudJSON } from 'postbody/blockNodes/Mixcloud';

export default function MixcloudFrame({ url }: MixcloudJSON) {
	const id = url.replace('https://www.mixcloud.com', '');
	const params = {
		feed: id,
		hide_tracklist: 1,
		hide_cover: 1,
		embed_type: 'widget_standard'
	};
	const src = `//www.mixcloud.com/widget/iframe/?${querystring.stringify(params)}`;

	const iframeProps = {
		src,
		width: '100%',
		height: 180,
		frameBorder: 0,
		allowFullScreen: 'allowfullscreen',
		scrolling: 'no',
		webkitallowfullscreen: 'webkitAllowFullScreen',
		mozallowfullscreen: 'mozallowfullscreen',
		className: 'custom'
	};

	return (
		<p>
			<iframe {...iframeProps} />
		</p>
	);
}
