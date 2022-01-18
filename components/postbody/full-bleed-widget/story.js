// @flow

import * as React from 'react';
import {
	boolean,
	select,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';

import Theme from '../../theme';
import FullBleedWidget from './fullBleedWidget';
import { TextNode } from 'postbody/InlineNode';
import README from './README.md';
import SimpleImage from 'kinja-magma/models/SimpleImage';

const FullBleedStoryWrapper = styled.div`
	width: 100vw;
	height: 1400px;
	padding-top: 400px;

	img {
		visibility: visible !important;
	}
`;

const PostContent = styled.div`
	figure {
		margin-left: auto;
		margin-right: auto;
		max-width: ${props => props.theme.postContentMaxWidth};
	}
`;

storiesOf('4. Components|Post Body/Full Bleed Widget', module)
	.addDecorator(withDocs(README))
	.add('Full Bleed Widget', () => {
		const anchorTag = text('Anchor tag', 'This is an anchor tag.');
		const caption = [new TextNode(text('Caption', 'This is a caption.'))];
		const attribution = [
			{
				label: 'Photo',
				credit: [new TextNode('John Doe')],
				source: [new TextNode('kinja')]
			}
		];
		const overlayEnabled = boolean('Show overlay', true);
		const captionsEnabled = boolean('Enable captions', true);
		const attributionsEnabled = boolean('Enable attributions', true);

		const birb = {
			id: 'm0jkioel81uufm3sbquw',
			format: 'jpg'
		};
		const doggo = {
			id: 'f0muensvmiumojyfwfwu',
			format: 'jpg'
		};
		const overlayText = {
			id: 'b0folqmmqwh4hckorglk',
			format: 'png'
		};
		const images = {birb, doggo};
		const image = select('Image', {birb: 'birb', doggo: 'doggo'}, 'birb');
		const overlayImageNode = overlayEnabled && new SimpleImage(overlayText);

		return (
			<Theme>
				<FullBleedStoryWrapper>
					<PostContent>
						<FullBleedWidget
							anchorTag={anchorTag}
							caption={caption}
							attribution={attribution}
							image={new SimpleImage(images[image])}
							isParallax={boolean('Enable parallax', false)}
							overlay={overlayImageNode}
							attributionsEnabled={attributionsEnabled}
							captionsEnabled={captionsEnabled}
						/>
					</PostContent>
				</FullBleedStoryWrapper>
			</Theme>
		);
	});
