/* @flow */

import * as React from 'react';
import { EnsureDefaultTheme } from '../../theme';
import BlockNodeList, { webRenderNode } from '../../postbody/block-node-list';
import { LunchboxTextWrapper, LunchboxImageTextTextWrapper, AnimatedLunchboxImageTextTextWrapper } from '../styles';
import type { LunchboxLayoutType } from 'kinja-magma/models/LunchboxLayoutGroup';
import Lunchbox from 'kinja-magma/models/Lunchbox';
import LunchboxParagraph from 'kinja-magma/models/LunchboxParagraph';
import { LinkNode } from 'postbody/InlineNode';
import LunchboxLink from '../read-only/lunchbox-link';
import Header from 'postbody/blockNodes/Header';
import type { BlogId } from 'kinja-magma/models/Id';
import type { OnScreenInjectedProps } from '../../hoc/on-screen';
type LunchboxTextProps = {
	paragraph?: ?LunchboxParagraph,
	header?: ?Header,
	link?: ?LinkNode,
	layout: LunchboxLayoutType,
	blogId?: ?BlogId,
	isAnimated?: ?boolean
};

export default function LunchboxText({ header, paragraph, link, layout, blogId, isVisible, isAnimated }: LunchboxTextProps & OnScreenInjectedProps) {
	const MaybeAnimatedTextWrapper = isAnimated ? AnimatedLunchboxImageTextTextWrapper : LunchboxImageTextTextWrapper;
	const TextWrapper = Lunchbox.Layouts.ImageText.include(layout) ? MaybeAnimatedTextWrapper : LunchboxTextWrapper;
	return (
		<EnsureDefaultTheme>
			<TextWrapper
				paragraphTextAlignment={paragraph && paragraph.alignment}
				headerTextAlignment={header && header.alignment}
				origin='bottom'
				isVisible={isVisible}
				animateFirst={layout.includes('Left')}
			>
				{header && <BlockNodeList nodes={[header]} renderNode={webRenderNode} />}
				{paragraph && <BlockNodeList nodes={[paragraph.paragraph]} renderNode={webRenderNode} />}
				{link && !Lunchbox.Layouts.Image.include(layout) && <LunchboxLink blogId={blogId} link={link} />}
			</TextWrapper>
		</EnsureDefaultTheme>
	);
}
