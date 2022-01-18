// @flow

import getPlayerContentType from 'kinja-components/utils/getPlayerContentType';

import type { VideoMeta } from 'kinja-magma/models/VideoMeta';

export type AnalyticsVars = {|
	title?: string,
	siteSection?: string,
	website?: string,
	isFeatured?: boolean,
	isSponsored?: boolean,
	isVideo?: boolean,
	pageType?: string
|}

export default function getAnalyticsConfig(selector: string, videoMeta: VideoMeta, analyticsVars: AnalyticsVars) {
	const {
		title = '',
		siteSection = '',
		website = '',
		isFeatured,
		isSponsored,
		isVideo,
		pageType
	} = analyticsVars;

	const contentType = getPlayerContentType({
		pageType,
		isPostVideo: isVideo,
		isPostFeatured: isFeatured,
		isPostSponsored: isSponsored
	});

	return {
		vars: {
			account: 'UA-142218-33',
			eventCategory: 'video'
		},
		triggers: {
			playerLoaded: {
				on: 'ini-load',
				request: 'event',
				selector: `#${selector}`,
				vars: {
					eventAction: 'Video Load'
				},
				extraUrlParams: {
					nonInteraction: true
				}
			},
			play: {
				on: 'video-play',
				request: 'event',
				selector: `#${selector}`,
				vars: {
					eventAction: 'Video Play'
				}
			},
			pause: {
				on: 'video-pause',
				request: 'event',
				selector: `#${selector}`,
				vars: {
					eventAction: 'Video Pause'
				}
			},
			percentagePlayed: {
				on: 'video-percentage-played',
				request: 'event',
				selector: `#${selector}`,
				videoSpec: {
					percentages: [25, 50, 75, 95, 100]
				},
				vars: {
					eventAction: 'Video Content ${normalizedPercentage}%'
				}
			}
		},
		extraUrlParams: {
			title: videoMeta.title || title,
			location: '${ampdocUrl}',
			autoplay: '${autoplay}',
			contentType,
			siteSection,
			website,
			position: 0,
			type: 'clip',
			network: videoMeta.network,
			videoId: videoMeta.id
		}
	};
}
