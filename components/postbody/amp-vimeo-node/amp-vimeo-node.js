// @flow

import * as React from 'react';

type VimeoOptions = {
	id?: string
}

const AmpVimeoNode = ({ id }: VimeoOptions) => {
	return (
		<p className="flex-video">
			<amp-vimeo
				data-videoid={id}
				width='800'
				height='450'
				layout='responsive' />
		</p>
	);
};

export default AmpVimeoNode;
