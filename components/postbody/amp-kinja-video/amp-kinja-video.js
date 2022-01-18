// @flow

import React from 'react';
import styled from 'styled-components';
import getAnalyticsConfig, { type AnalyticsVars } from './getAnalyticsConfig';
import imageUrl from 'kinja-images';
import { PlayIconContainer, PlayIconSVG } from 'kinja-components/components/video-player';
import { KinjaVideoContainer } from 'kinja-components/components/postbody/kinja-video/kinja-video';

import type { VideoMeta } from 'kinja-magma/models/VideoMeta';

type Props = {|
	videoMeta: VideoMeta,
	disableAds?: boolean,
	...AnalyticsVars
|};

const Container = styled.div`
	position: relative;

	${PlayIconContainer} {
		bottom: 0;

		.icon {
			padding-top: 0;
		}
	}
`;

export default function AmpKinjaVideo({
	videoMeta,
	disableAds,
	...analyticsVars
}: Props) {
	const poster = videoMeta.poster ? imageUrl(videoMeta.poster.id, 'CenteredWideExtraLargeAuto', videoMeta.poster.format) : '';
	const selector = `kinja-video-${videoMeta.id}`;

	const analyticsConfig = getAnalyticsConfig(selector, videoMeta, analyticsVars);
	const captions = videoMeta.captions && videoMeta.captions.length ? (
		videoMeta.captions.map(track => <track kind="captions" label={track.label} src={track.url} key={track.url} />)
	) : null;

	return (
		<KinjaVideoContainer>
			<Container>
				{disableAds
					? (
						<amp-video
							id={selector}
							poster={poster}
							crossorigin={videoMeta.captions && videoMeta.captions.length}
							controls="" // Passing an empty string will result in a value-less "controls" attribute that amp-video expects
							width="640"
							height="360"
							layout="responsive">
							<source src={videoMeta.streamingUrl}
								type="application/x-mpegURL" />
							{captions}
							<div fallback="">
								<p>This browser does not support the video element.</p>
							</div>
						</amp-video>
					) : (
						<amp-ima-video
							data-tag={videoMeta.adschedule}
							data-poster={poster}
							id={selector}
							width="640"
							height="360"
							layout="responsive">
							<source src={videoMeta.streamingUrl}
								type="application/x-mpegURL" />
							{captions}
							<div fallback="">
								<p>This browser does not support the video element.</p>
							</div>
						</amp-ima-video>
					)}
				<div
					id={`${selector}-play-icon-container`}
					role="button"
					tabIndex="0"
					on={`tap:${selector}.play, ${selector}-play-icon-container.hide`}>
					<amp-img
						class="poster-image"
						layout="fill"
						src={poster} />
					<PlayIconContainer
						role="button"
						tabindex="0"
						dangerouslySetInnerHTML={{__html: PlayIconSVG}} />
				</div>

				<amp-analytics type="googleanalytics">
					<script type="application/json" dangerouslySetInnerHTML={{__html: JSON.stringify(analyticsConfig)}}>
					</script>
				</amp-analytics>
			</Container>
		</KinjaVideoContainer>
	);
}
