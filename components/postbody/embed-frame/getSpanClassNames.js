// @flow

const clearBoth = 'clear-both';
const flexVideo = 'flex-video';
const nonFlexVideo = 'non-flex-video';
const widescreen = 'widescreen';

/**
 * Returns any classes on the span immediately wrapping the iframe
 * @param {string} type - DAP Node object type
 */
export default function getSpanClassNames(type: string): Array<string> {
	switch (type) {
		case 'Iframe':
			return [clearBoth, flexVideo];
		case 'Megaphone':
			return ['megaphone'];
		case 'DailyMotion':
		case 'KinjaVideo':
		case 'MsnVideo':
		case 'Ooyala':
		case 'TwitchVideo':
		case 'TwitchStream':
		case 'Ustream':
		case 'UstreamLive':
		case 'Vimeo':
		case 'Viddler':
		case 'YoutubePlaylist':
		case 'YoutubeVideo':
		case 'Waywire':
			return [flexVideo, widescreen];
		case 'DocumentCloud':
		case 'Facebook':
		case 'FacebookPost':
		case 'Vine':
			return [nonFlexVideo];
		case 'TikTok':
		case 'Instagram':
			return [nonFlexVideo, 'centered-frame'];
		case 'SoundCloud':
		case 'SoundCloudPlaylist':
			return [nonFlexVideo, 'soundcloud'];
		case 'Twitter':
			return ['twitter-embed'];
		default:
			return [];
	}
}
