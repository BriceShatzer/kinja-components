/* @flow */

import * as React from 'react';
import { NETWORK_BLOGS } from 'kinja-components/config/consts';

const hosts = NETWORK_BLOGS.map(site => site.url);

export function maybeValidTimestamp(bucketSetter: string) {
	// Extract timestamp from signature triplet, to determine if timestamp might be valid, or
	// is clearly outside Fastly expiration window.
	// Signature Format:
	//			BUCKET | TIMESTAMP | HMAC
	const tokens = bucketSetter.split('|');
	if (tokens && tokens.length === 3) {
		const timestamp = parseInt(tokens[1]);
		if (timestamp) {
			// Fastly regenerates timestamps every 5 minutes, but Fastly allows a 10-minute expiration window. By
			// restricting client check to the 5-minute window, we ensure that Fastly will validate.
			const expire_sec = 5 * 60;
			const now_sec =  Math.floor((new Date).getTime() / 1000);
			return now_sec < (timestamp + expire_sec);
		}
	}

	return false;
}

function generateUrl(domain: string, bucketSetter: string) {
	return `${domain}/setbucket?signature=${encodeURIComponent(bucketSetter)}`;
}

function ABTestIframes({bucketSetter}: {bucketSetter: string}) {
	return (
		<React.Fragment>
			{/*
				Only create iframe if timestamp might be valid (within Fastly expiration window), to prevent
				crawler errors with cached content.
			*/}
			{bucketSetter && maybeValidTimestamp(bucketSetter) && hosts.map(hostname => {
				const url = generateUrl(hostname, bucketSetter);
				return <iframe key={hostname} src={url} width="0" height="0" />;
			})}
		</React.Fragment>
	);
}

export default ABTestIframes;
