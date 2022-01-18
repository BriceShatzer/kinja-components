// @flow

const hasVideo = 'has-video';
const mediaLarge = 'media-large';
const videoEmbed = 'video-embed';

/**
 * Returns any classes on the p element outside the iframe
 * @param {string} type - DAP Node object type
 */
export default function getWrapperClassNames(type: string, alignmentClass?: string): Array<string> {
	switch (type) {
		case 'DailyMotion':
		case 'KinjaVideo':
		case 'MsnVideo':
		case 'NewLivestream':
		case 'OldLivestream':
		case 'Ooyala':
		case 'TwitchStream':
		case 'TwitchVideo':
		case 'Ustream':
		case 'UstreamLive':
		case 'Vimeo':
		case 'Waywire':
		case 'YoutubeVideo': {
			const classNames = [hasVideo, mediaLarge, videoEmbed];
			return alignmentClass ? [alignmentClass].concat(classNames) : classNames;
		}
		case 'Viddler':
		case 'YoutubePlaylist':
			return [hasVideo, mediaLarge];
		default:
			return [];
	}
}
