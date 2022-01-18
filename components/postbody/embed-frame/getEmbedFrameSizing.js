// @flow

const STANDARD_EMBED_WIDTH = 640;
const STANDARD_EMBED_HEIGHT = 360;

export const BLEED_EMBED_WIDTH = 800;
export const BLEED_EMBED_HEIGHT = 450;

const DEFAULT_DIMENSIONS = {
	width: STANDARD_EMBED_WIDTH,
	height: STANDARD_EMBED_HEIGHT
};

/**
 * Returns the dimensions of the blocknode based on the type
 * @param {string} type - DAP Node object type
 */
export default function getEmbedFrameSizing(type: string, height?: number): { width: number | string, height?: number | string } {
	switch (type) {
		// Widescreen, full-bleed videos
		case 'KinjaVideo':
		case 'Ooyala':
		case 'Vimeo':
		case 'Waywire':
		case 'YoutubePlaylist':
		case 'YoutubeVideo':
			return {
				width: BLEED_EMBED_WIDTH,
				height: BLEED_EMBED_HEIGHT
			};
		// Non-full-width, widescreen video embeds
		case 'Facebook':
		case 'FacebookPost':
		case 'MsnVideo':
		case 'NewLivestream':
		case 'OldLivestream':
		case 'TwitchStream':
		case 'TwitchVideo':
		case 'Ustream':
		case 'UstreamLive':
		case 'Viddler':
			return {
				width: STANDARD_EMBED_WIDTH,
				height: STANDARD_EMBED_HEIGHT
			};
		case 'DailyMotion':
			return {
				width: STANDARD_EMBED_WIDTH,
				height: 448  // FIXME: why do they return weird height in Linksupport response?
			};
		case 'Tumblr':
			return {
				width: STANDARD_EMBED_WIDTH,
				height: BLEED_EMBED_WIDTH
			};
		case 'Vine':
			return {
				width: STANDARD_EMBED_WIDTH,
				height: 786
			};
		case 'Twitter':
			return {
				width: 500,
				height: 159
			};
		case 'Imgur':
			return {
				width: BLEED_EMBED_WIDTH
			};
		case 'Instagram':
			return {
				width: 598,
				height: 676
			};
		case 'SoundCloud':
			return {
				width: STANDARD_EMBED_WIDTH,
				height: 166
			};
		case 'SoundCloudPlaylist':
			return {
				width: STANDARD_EMBED_WIDTH,
				height: 450
			};
		case 'DocumentCloud':
			return {
				width: BLEED_EMBED_WIDTH,
				height: 800
			};
		case 'GithubGist':
			return {
				width: STANDARD_EMBED_WIDTH
			};
		case 'PollDaddy':
		case 'PollDaddyQuiz':
			return {
				width: '100%',
				height: 600
			};
		case 'Megaphone':
			return {
				width: STANDARD_EMBED_WIDTH,
				height: 150
			};
		case 'Qzzr':
			return {
				width: '100%',
				height
			};
		case 'MovementVentures':
			return {
				width: STANDARD_EMBED_WIDTH,
				height: 920
			};
		case 'Typeform':
			return {
				width: STANDARD_EMBED_WIDTH,
				height: 640
			};
		default: {
			return DEFAULT_DIMENSIONS;
		}
	}
}
