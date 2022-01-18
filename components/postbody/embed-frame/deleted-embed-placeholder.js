/* @flow */

import * as React from 'react';
import classNames from 'classnames';

import IframeUnsupported from './iframe-unsupported';
import { IframeContainer, Message, ExternalSource } from './iframe-placeholder';
import {
	ImageNodeWrapper,
	toAlignmentClass,
	isAligned
} from 'kinja-components/components/postbody/image-node/image-node';
import { FullBleedContainer } from 'kinja-components/components/postbody/full-bleed-widget/fullBleedWidget';
import { MAX_POST_IMAGE_WIDTH } from 'kinja-components/components/elements/image';

import type { BlockNodeJSON, DeletedNodes } from 'postbody/BlockNode';

import ImageIcon from 'kinja-components/components/icon19/Image';

type Props = {
	originalContent: BlockNodeJSON | DeletedNodes;
};

/**
 * Renders a deleted embed placeholder for display on permalink pages
 */
function DeletedEmbed({
	originalContent
}: Props): React$Node {
	switch (originalContent.type) {
		case 'Storify':
			return (
				<IframeUnsupported>
					There used to be a Storify embed here, but
					<a href="https://storify.com/faq-eol" target="_blank" rel="noopener noreferrer"> Storify doesn’t exist anymore.</a>
				</IframeUnsupported>
			);

		case 'Image': {
			const imageNode = originalContent;
			const { width, height, alignment } = imageNode;

			const constrainWidth = isAligned(alignment, 'Left', 'Right') || width < MAX_POST_IMAGE_WIDTH ? `${width}px` : '100%';
			const paddingBottom = Math.round(height / width * 100);

			return (
				<ImageNodeWrapper
					alignment={alignment && alignment.toLowerCase()}
					className={classNames(toAlignmentClass(alignment), 'has-image')}
					style={{ width: constrainWidth, minWidth: '250px' }}
				>
					<div style={{ paddingBottom: `${paddingBottom}%` }}>
						<IframeContainer>
							<ExternalSource as="div" isUnsupported>
								<Message>
									<ImageIcon />
									<span>This image was removed due to legal reasons.</span>
								</Message>
							</ExternalSource>
						</IframeContainer>
					</div>
				</ImageNodeWrapper>
			);
		}

		case 'FullBleedWidget': {
			return (
				<FullBleedContainer>
					<IframeContainer style={{ height: '250px' }}>
						<ExternalSource as="div" isUnsupported>
							<Message>
								<ImageIcon />
								<span>This image was removed due to legal reasons.</span>
							</Message>
						</ExternalSource>
					</IframeContainer>
				</FullBleedContainer>
			);
		}

		default:
			return (
				<IframeUnsupported>
					This content is no longer available. :(
				</IframeUnsupported>
			);
	}
}

export default DeletedEmbed;
