// @flow

import * as React from 'react';

type SoundCloudOptions = {
	id: string
}

const AmpSoundCloudPlayListNode = ({ id }: SoundCloudOptions) => {
	return (
		<p className="flex-video">
			<amp-soundcloud
				data-playlistid={id}
				data-visual='true'
				width='640'
				height='166'
				layout='responsive' />
		</p>
	);
};

export default AmpSoundCloudPlayListNode;
