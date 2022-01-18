// @flow

import * as React from 'react';

type DailyMotionOptions = {
	id: string
}

const AmpDailyMotionNode = ({ id }: DailyMotionOptions) => {
	return (
		<p className="flex-video">
			<amp-dailymotion
				data-videoid={id}
				width='640'
				height='480'
				layout='responsive' />
		</p>
	);
};

export default AmpDailyMotionNode;
