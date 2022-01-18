/* @flow */

import * as React from 'react';
import Button19 from '../button19';
import GlobeIcon from '../icon19/Globe';

const EnvSwitch = () => {
	const localhostRegex = /(\.)localhost$/i;
	const liveRegex = /(\.)com$/i;
	const { pathname, port, search } = window.location;
	let { hostname } = window.location;

	const toggleEnv = () => {
		if (hostname.match(localhostRegex)) {
			hostname = hostname.replace(localhostRegex, '$1com');
			window.location.href = `https://${hostname}${pathname}${search}`;
		} else if (hostname.match(liveRegex)) {
			hostname = hostname.replace(liveRegex, '$1localhost');
			window.location.href = `http://${hostname}${pathname}${port}${search}`;
		}
	};

	const env = hostname.match(localhostRegex) ? 'live' : 'dev';
	const label = `Switch to ${env} version`;

	return <Button19 icon={<GlobeIcon />} onClick={toggleEnv} label={label} labelPosition="after" />;
};

export default EnvSwitch;
