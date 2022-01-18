// @flow

import * as React from 'react';

const AmpSkimlinks = ({
	blogGroup = '',
	canonicalHost = '',
	skimLinkId = ''
}: {
	blogGroup?: string,
	canonicalHost?: string,
	skimLinkId?: string
}) => {
	const excluded = `amazon.com amzn.com celtra.com kinja.com ${canonicalHost}`;
	return (
		<amp-skimlinks
			layout="nodisplay"
			publisher-code={skimLinkId}
			excluded-domains={excluded}
			custom-tracking-id={`skim-amp-${blogGroup}`}>
		</amp-skimlinks>
	);
};

export default AmpSkimlinks;
