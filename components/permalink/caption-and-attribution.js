// @flow

import * as React from 'react';
import styled from 'styled-components';

import media from 'kinja-components/style-utils/media';
import { imageAttributionFromJSON } from 'postbody/Image';
import type { FeaturedMediaJSON } from 'postbody/BlockNode';
import InlineNodes from '../postbody/inline-node';
import ImageAttribution from 'kinja-components/components/image-attribution';
import { inlineNodeFromData } from 'postbody/InlineNode';

export const ImageAttributionWrapper = styled.div`
	color: ${props => props.theme.color.gray};
	font-size: 15px;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	padding-top: 10px;
	max-width: ${props => props.theme.postContentMaxWidth};
	width: 100%;

	${media.smallOnly`
		padding: 10px 1.125rem;
	`}
`;

const CaptionAndAttribution = ({featuredMedia}: {featuredMedia: FeaturedMediaJSON}) => {
	if (featuredMedia && featuredMedia.type === 'Image') {
		const hasCaption = featuredMedia.caption && featuredMedia.caption.length > 0;
		const hasAttribution = featuredMedia.attribution && featuredMedia.attribution.length > 0;

		if (hasCaption || hasAttribution) {
			return (
				<ImageAttributionWrapper>
					{featuredMedia.caption && hasCaption && <div>
						<InlineNodes nodes={featuredMedia.caption.map(node => inlineNodeFromData(node))}/>
					</div>}
					{featuredMedia.attribution && hasAttribution && <div>
						<ImageAttribution attributions={featuredMedia.attribution.map(att => imageAttributionFromJSON(att))} />
					</div>}
				</ImageAttributionWrapper>
			);
		}
	}
	return null;
};

export default CaptionAndAttribution;
