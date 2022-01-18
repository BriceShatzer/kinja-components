/* @flow */

import * as React from 'react';

type Props = {
	blogGroup: string
}

const blogGroups: { [string]: number } = {
	'theonion': 118018,
	'avclub': 118019,
	'gizmodo': 118017,
	'lifehacker': 118020,
	'jalopnik': 118021,
	'theroot': 118022,
	'jezebel': 118024,
	'deadspin': 118025,
	'kotaku': 118026,
	'thetakeout': 118027
};

export default function RevcontentWidget({
	blogGroup
}: Props) {
	// not sure why they need this...
	const id = `rc-widget-${Math.random() * 1000}`;
	const siteId: number = blogGroups[blogGroup];
	if (!siteId) {
		return '';
	}
	return (
		<div
			className="js_revcontent-widget"
			id={id}
			data-rc-widget
			data-widget-host="habitat"
			data-endpoint="//trends.revcontent.com"
			data-widget-id={siteId} />
	);
}
