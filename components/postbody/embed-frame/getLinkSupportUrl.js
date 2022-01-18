// @flow

import querystring from 'querystring';

import { BLOCK_NAMES_TO_LINKSUPPORT_PROVIDERS } from 'postbody/BlockNode';
import type { BlockNodeTypeString } from 'postbody/BlockNodeBase';

const getLinkSupportProvider = (name: BlockNodeTypeString): ?string => BLOCK_NAMES_TO_LINKSUPPORT_PROVIDERS[name];

/**
 * Returns the Linksupport url corresponding to the specified blocknode
 * (Assumes that it is a Linksupport-compatible blocknode)
 *
 * @param {string} id - ID or linksupportId of DAP Node object
 * @param embedHost The host name to use in embed URLs
 * @param {Object} urlParams - Extra URL parameters to pass in to the frame
 */
export default function getLinkSupportUrl(
	id: ?string,
	type: BlockNodeTypeString,
	embedHost?: string,
	urlParams?: { [key: string]: string | number | boolean } = {},
	additionalParams?: { [key: string]: string } = {}
): string {
	if (typeof id !== 'string') {
		throw new Error('Invalid block for Linksupport export; it must have a linksupportId or id defined');
	}
	const provider = getLinkSupportProvider(type);
	if (!provider) {
		throw new Error(`Unsupported blocknode type: ${type}`);
	}

	const build = (id: string, params?: { [string]: string | number }) =>
		(embedHost ? `https://${embedHost}` : '') + '/ajax/inset/iframe?' + querystring.stringify({
			id,
			...urlParams,
			...params
		});

	const params = additionalParams || {};

	switch (provider) {
		case 'kinjavideo':
			return build(`kinjavideo-${id}`);
		case 'youtube-video':
			return build(`youtube-video-${id}`, { start: params.start || 0 });
		case 'youtube-list': {
			if (!params.initialVideo) {
				// TODO We need to add support for playlist embeds without an initial video in linksupport.
				return 'https://www.youtube.com/embed/videoseries?' + querystring.stringify({
					list: id,
					...urlParams
				});
			}
			return build(id, {
				id: `youtube-list-${id}`,
				start: params.start
			});
		}
		case 'qzzr':
			return `//www.qzzr.com/widget/quiz/${id}`;
		case 'livestream-account':
			return build(`${provider}:${params.account}/event:${params.event}${params.video ? `/video:${params.video}` : ''}`);
		case 'livestream-channel':
			return build(`${provider}:${params.channel}${params.clip ? `/clip:${params.clip}` : ''}`);
		default:
			return build(`${provider}-${id}`);

	}
}
