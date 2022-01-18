// @flow

import * as React from 'react';

type ImgurOptions = {
	id: string
}

const AmpImgurNode = ({ id }: ImgurOptions) => {
	return (
		<p>
			<amp-imgur
				data-imgur-id={id}
				width='640'
				height='480'
				layout='responsive' />
		</p>
	);
};

export default AmpImgurNode;
