// @flow

import * as React from 'react';

type TwitterOptions = {
	id: string
}

const AmpTwitterNode = ({ id }: TwitterOptions) => {
	return (
		<p>
			<amp-twitter
				data-tweetid={id}
				width='486'
				height='657'
				layout='responsive' />
		</p>
	);
};

export default AmpTwitterNode;
