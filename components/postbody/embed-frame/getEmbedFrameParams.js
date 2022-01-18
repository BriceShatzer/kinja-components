// @flow

/**
 * Returns any additional params for the blocknode based on the type
 * @param {string} type - DAP Node object type
 */
export default function getEmbedFrameParams(type: string, id: string, user?: string): {[string]: string} {
	switch (type) {
		case 'YoutubePlaylist':
		case 'YoutubeVideo':
			return {
				'data-chomp-id': id,
				'data-recommend-id': `youtube://${id}`,
				id: `youtube-${id}`
			};
		case 'Facebook':
			return {
				autoresize: 'true',
				id: `fb-${id}`
			};
		case 'FacebookPost':
			return {
				autoresize: 'true',
				id: `fbpost-${id}`
			};
		case 'KinjaVideo':
			return {
				id: `kinjavideo-${id}`,
				'data-recommend-id': `kinjavideo://${id}`
			};
		case 'Vimeo':
			return {
				id: `vimeo-${id}`,
				'data-recommend-id': `vimeo://${id}`
			};
		case 'Viddler':
			return {
				id: `viddler-${id}`,
				'data-recommend-id': `viddler://${id}`
			};
		case 'Vine':
			return {
				autoresize: 'true',
				id: `vine-${id}`
			};
		case 'Twitter':
			return {
				autoresize: 'true',
				id: `twitter-${id}`
			};
		case 'TikTok':
			return {
				autoresize: 'true',
				id: `tiktok-${id}`
			};
		case 'Instagram':
			return {
				autoresize: 'true',
				id: `instagram-${id}`
			};
		case 'Imgur':
			return {
				autoresize: 'true',
				id: `imgur-${id}`
			};
		case 'SoundCloud':
			return {
				id: `soundcloud-${id}`
			};
		case 'SoundCloudPlaylist':
			return {
				id: `soundcloud-playlist-${id}`
			};
		case 'DocumentCloud':
			return {
				autoresize: 'true',
				id: `docCloud-doc-${id}`
			};
		case 'GithubGist':
			return {
				autoresize: 'true',
				id: `gist-${id}`
			};
		case 'TwitchVideo':
			return {
				id: `twitch-video-${id}`
			};
		case 'TwitchStream':
			return {
				id: `twitch-stream-${id}`
			};
		case 'MsnVideo':
			return {
				id: `msn-${id}`
			};
		case 'DailyMotion':
			return {
				id: `dm-${id}`
			};
		case 'Ustream':
			return {
				id: `ustream-video-${id}`
			};
		case 'UstreamLive':
			return {
				id: `ustream-channel-${id}`
			};
		case 'Megaphone':
			return {
				id: `megaphone-${id}`
			};
		case 'MovementVentures':
			return {
				autoresize: 'true',
				id: `movementventures-${id}`
			};
		case 'Tumblr':
			return {
				autoresize: 'true',
				id: `tumblr-post-${id}-${String(user)}`
			};
		case 'Typeform':
			return {
				id: `typeform-${String(user)}-${id}`
			};
		case 'Qzzr':
			return {
				className: 'qzzr'
			};
		default: {
			return {};
		}
	}
}
