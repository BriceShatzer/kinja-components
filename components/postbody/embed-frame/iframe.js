// @flow
import * as React from 'react';
import cx from 'classnames';
import { BLEED_EMBED_WIDTH, BLEED_EMBED_HEIGHT } from './getEmbedFrameSizing';
import {
	getSpanClassNames,
	IframePlaceholder
} from './';
import { IFRAME_WHITELIST } from '../../../config/consts';
import type { IframeProperties } from 'postbody/blockNodes/Iframe';
import { ASPECT_RATIOS } from 'postbody/blockNodes/Iframe';

const WIDE_MEDIA_WIDTH = 800;

type ComponentProps = {
	isStarter?: boolean,
	isLazy?: boolean,
	hideRecommendedModule?: boolean
};

/**
 * Renders an iframe embed from a source url
 */
function Iframe({
	// BlockNode properties
	width,
	height,
	aspectRatio,
	scrollable,
	source,
	thumbnail,
	// Component-specific
	isStarter = true,
	isLazy = false,
	hideRecommendedModule
}: IframeProperties & ComponentProps): React$Node {
	const sourceDomain = source.match('^https?://([^/]+)');
	const domain = sourceDomain ? sourceDomain[1] : source;
	const whitelisted = IFRAME_WHITELIST.includes(domain);
	const isHiddenRecommendations = source && source.indexOf('related-widget') >= 0 && hideRecommendedModule;

	if (!whitelisted && !isStarter || isHiddenRecommendations) {
		return null;
	}

	const isHttp = source.indexOf('http://') === 0;
	if (isHttp) {
		const placeholderProps = {
			source,
			domain,
			width,
			aspectRatio,
			thumbnail
		};
		return (
			<IframePlaceholder
				{...placeholderProps}
			/>
		);
	}

	const srcAttr = isLazy ? 'data-src' : 'src';
	const isGawkerInternalSite = source.indexOf('gawker-') > -1;
	const isHttps = source.indexOf('https://') === 0;
	const actualSource = ((isHttps || isGawkerInternalSite)) ? source.replace('^http(s?)://', '//') : source;
	const widthValue = width ? width.value : 0;
	const heightValue = height ? height.value : 0;
	const isWidescreen = BLEED_EMBED_WIDTH / (Math.round(BLEED_EMBED_WIDTH * heightValue / widthValue) || BLEED_EMBED_HEIGHT) > (4 / 3);
	const dimensions = {
		width: width ? width.toAttribute() : undefined,
		height: height ? height.toAttribute() : undefined
	};
	const sandbox = !whitelisted ? { sandbox: 'allow-same-origin allow-scripts allow-forms' } : null;
	const hasWideMedia = widthValue >= WIDE_MEDIA_WIDTH;
	const paragraphClassNames = cx({
		'has-media has-embed': aspectRatio === ASPECT_RATIOS.fixed,
		'has-video media-large': hasWideMedia
	});
	const scrolling = scrollable ? 'yes' : 'no';

	switch (aspectRatio) {
		case ASPECT_RATIOS.flex: {
			const spanClassNames = cx(
				...getSpanClassNames('Iframe'),
				`video-${height ? height.value : 'unknown'}`,
				{ widescreen: isWidescreen }
			);
			const iframeProps = {
				[srcAttr]: actualSource,
				...dimensions,
				...sandbox,
				allowFullScreen: 'allowfullscreen',
				className: cx({ lazyload: isLazy }),
				scrolling
			};
			return (
				<p className={paragraphClassNames}>
					<span className={spanClassNames}>
						<iframe {...iframeProps} />
					</span>
				</p>
			);
		}
		default: {
			const iframeProps = {
				[srcAttr]: source,
				...dimensions,
				className: cx({
					lazyload: isLazy,
					'custom aspect': aspectRatio === ASPECT_RATIOS.fixed,
					'custom': aspectRatio === ASPECT_RATIOS.custom
				}),
				scrolling
				// TODO Custom iframes are not sandboxed! This is a security issue!
			};
			return (
				<p className={paragraphClassNames}>
					<iframe {...iframeProps} />
				</p>
			);
		}
	}
}

export default Iframe;
