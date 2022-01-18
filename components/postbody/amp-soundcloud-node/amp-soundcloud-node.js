// @flow

import * as React from 'react';

type SoundCloudOptions = {
	id: string
}

const AmpSoundCloudNode = ({ id }: SoundCloudOptions) => {
	return (
		<p className="flex-video">
			<amp-soundcloud
				data-trackid={id}
				width='640'
				height='166'
				layout='responsive' />
		</p>
	);
};

export default AmpSoundCloudNode;
