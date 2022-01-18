// @flow

import * as React from 'react';

type FacebookOptions = {
	id: string
}

const AmpFacebookNode = ({ id }: FacebookOptions) => {
	const videoUrl = `https://www.facebook.com/video.php?v=${id}`;
	return (
		<p>
			<amp-facebook
				data-embed-as='video'
				data-href={videoUrl}
				width='552'
				height='310'
				layout='responsive' />
		</p>
	);
};

export default AmpFacebookNode;
