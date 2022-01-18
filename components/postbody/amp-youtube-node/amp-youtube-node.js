// @flow
import * as React from 'react';
import CaptionContainer from '../../caption-container/caption-container';

type YoutubeOptions = {
	id?: string,
	start?: number,
	caption?: Array<*>
}

const AmpYoutubeNode = ({ id, start, caption }: YoutubeOptions) => {
	return (<p>
		<span className="flex-video">
			<amp-youtube
				data-videoid={id}
				data-param-start={start}
				width='800'
				height='450'
				layout='responsive' />
		</span>
		{caption && caption.length > 0 && <CaptionContainer caption={caption} />}
	</p>);
};

export default AmpYoutubeNode;
