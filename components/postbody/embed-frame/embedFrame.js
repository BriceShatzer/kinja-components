// @flow
import * as React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import pickBy from 'lodash/pickBy';

import { ActionIconWrapper } from 'kinja-components/components/post-elements/recommend-star';

import {
	getEmbedFrameParams,
	getEmbedFrameSizing,
	getLinkSupportUrl,
	getSpanClassNames,
	getWrapperClassNames
} from './';
import type { InlineNode } from 'postbody/InlineNode';
import type { BlockNodeTypeString } from 'postbody/BlockNodeBase';
import type { MediaAlignment } from 'postbody/MediaAlignment';
import CaptionContainer from '../../caption-container';
import { EnsureDefaultTheme } from '../../theme';

type Props = {
	// Optional alignment of the embed frame
	alignment?: MediaAlignment,
	// Optional caption to display below the embed frame
	caption?: Array<InlineNode>,
	// Flag to render the caption if it exists (defaults to true)
	captionsEnabled?: boolean,
	// The ID of the blocknode
	id: string,
	// Whether or not to lazily load the embed with a placeholder
	isLazy?: boolean,
	// The type & source of the embed
	type: BlockNodeTypeString,
	// Extra URL parameters to pass in to the frame
	urlParams?: { [string]: string },
	// The host name to use in embed URLs
	embedHost?: string,
	isRecommended?: boolean,
};

/*
 * Optional props specific to certain embeds, used to generate LinkSupport url
 */
type EmbedSpecificProps = {
	// livestream
	account?: string,
	// livestream
	channel?: string,
	// livestream
	clip?: string,
	// livestream
	event?: string,
	// youtube video
	start?: number,
	// youtube playlist
	initialVideo?: ?string,
	// ooyala
	playerId?: string,
	// tumblr
	user?: string,
	// livestream
	video?: ?string,
	// some BlockNodes have their linksupportId explicitly specified
	linksupportId?: string,
	isRecommended?: boolean
};

export const EmbedWrapper = styled.div`
	.flex-video {
		display: block;
		margin-bottom: 0;

		&.widescreen {
			padding-bottom: 52.9%;
		}
	}

	.megaphone {
		display: block;
		margin: 2rem auto;
	}

	&:hover {
		${ActionIconWrapper} {
			opacity: 1;
		}
	}
`;

function EmbedFrame({
	account,
	alignment,
	caption,
	captionsEnabled = true,
	channel,
	clip,
	event,
	id,
	start,
	initialVideo,
	isLazy = false,
	playerId,
	type,
	urlParams = {},
	user,
	video,
	linksupportId,
	embedHost,
	isRecommended = false
}: Props & EmbedSpecificProps): React$Node {
	const toAlignmentClass = (alignment: MediaAlignment): string => `align--${alignment.toLowerCase()}`;
	const wrapperClassNames = getWrapperClassNames(type, alignment && toAlignmentClass(alignment));

	const attributes = getEmbedFrameParams(type, id, user);
	attributes['data-recommended'] = isRecommended;

	const isRecommendable = attributes.hasOwnProperty('data-recommend-id');
	const autoResize = attributes.autoresize ? { autosize: '1' } : null;
	const embedUrlParams = {
		...autoResize,
		...urlParams
	};

	const additionalParams = { account, channel, clip, event, initialVideo, playerId, user, video, start };
	const url = getLinkSupportUrl(linksupportId || id, type, embedHost, embedUrlParams, pickBy(additionalParams, p => p === 0 || Boolean(p)));
	const dimensions = getEmbedFrameSizing(type);

	const srcAttr = isLazy ? 'data-src' : 'src';

	const iframeProps = {
		[srcAttr]: url,
		...attributes,
		...dimensions,
		className: cx('core-inset', { lazyload: isLazy }),
		frameBorder: 0,
		scrolling: 'no',
		allowFullScreen: 'allowfullscreen',
		webkitallowfullscreen: 'webkitAllowFullScreen',
		mozallowfullscreen: 'mozallowfullscreen'
	};

	return (
		<EnsureDefaultTheme>
			<EmbedWrapper className={cx(...wrapperClassNames, 'embed-frame')}>
				<span className={cx(...getSpanClassNames(type))}>
					<iframe {...iframeProps} />
					{isRecommendable && <span {...attributes} className="js_recommend"></span>}
				</span>
				{captionsEnabled && caption && caption.length > 0 && (
					<CaptionContainer
						caption={caption}
					/>
				)}
			</EmbedWrapper>
		</EnsureDefaultTheme>
	);
}

export default EmbedFrame;
