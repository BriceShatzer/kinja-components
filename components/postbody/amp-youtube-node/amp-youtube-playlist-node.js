// @flow
import * as React from 'react';

type YoutubeOptions = {
	id?: string,
	start?: number,
	initialVideo?: ?string
}

const AmpYoutubePlaylistNode = ({ id, start, initialVideo }: YoutubeOptions) => {

	return (
		<p className="flex-video">
			<amp-youtube
				data-videoid={initialVideo}
				data-param-start={start}
				data-param-list={id}
				data-param-listType='playlist'
				width='800'
				height='450'
				layout='responsive' />
		</p>
	);
};

export default AmpYoutubePlaylistNode;
