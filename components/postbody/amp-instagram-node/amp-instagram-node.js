// @flow

import * as React from 'react';

type InstagramOptions = {
	id?: string
}

const AmpInstagramNode = ({ id }: InstagramOptions) => {
	return (
		<p>
			<amp-instagram
				data-shortcode={id}
				width='598'
				height='676'
				layout='responsive' />
		</p>
	);
};

export default AmpInstagramNode;
