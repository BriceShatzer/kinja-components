// @flow

import * as React from 'react';

type FacebookOptions = {
	url: string
}

const AmpFacebookPostNode = ({ url }: FacebookOptions) => {
	return (
		<p>
			<amp-facebook
				data-href={url}
				width='552'
				height='310'
				layout='responsive' />
		</p>
	);
};

export default AmpFacebookPostNode;
