// @flow

import * as React from 'react';

const AmpTaboola = ({
	canonicalHost = ''
}: {
	canonicalHost: ?string
}) => {
	return (
		<amp-embed width="100" height="100"
			type="taboola"
			layout="responsive"
			heights="(min-width:1496px) 77%, (min-width:1097px) 84%,
			(min-width:811px) 93%, (min-width:600px) 104%,
			(min-width:439px) 121%, 144%"
			data-publisher="gomedianetwork"
			data-mode="thumbnails-a-amp"
			data-placement="Below Article Thumbnails AMP"
			data-target_type="mix"
			data-article="auto"
			amp-access="NOT scroll.scroll"
			data-url={canonicalHost}>
		</amp-embed>
	);
};

export default AmpTaboola;
