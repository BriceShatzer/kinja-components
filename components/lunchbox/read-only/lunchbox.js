/* @flow */

import * as React from 'react';
import LunchboxText from './lunchbox-text';
import LunchboxImage from './lunchbox-image';
import type { LunchboxProps } from 'kinja-magma/models/Lunchbox';
import LunchboxWrapper from '../lunchbox-wrapper';
import LunchboxLink from './lunchbox-link';
import LunchboxModel from 'kinja-magma/models/Lunchbox';
import { LunchboxImageWrapper, Gutter } from '../styles';
import { EnsureDefaultTheme } from '../../theme';
import type { OnScreenInjectedProps } from '../../hoc/on-screen';

export default function Lunchbox(props: LunchboxProps & OnScreenInjectedProps) {
	const { backgroundColor, layout, header, paragraph, image, button, blogId, isVisible, isAnimated } = props;
	const imageOrWrapper = ((): React.Node => {
		if (!LunchboxModel.Layouts.Text.include(layout) && image) {
			return <LunchboxImage image={image} currentLayout={layout} isVisible={isVisible} isAnimated={isAnimated} link={button} blogId={blogId} />;
		}
		// if there's no image but we've saved a layout that should contain an image, render empty space
		if (LunchboxModel.Layouts.ImageText.include(layout)) {
			return <LunchboxImageWrapper />;
		}
		return null;
	})();

	return (
		<EnsureDefaultTheme>
			<LunchboxWrapper backgroundColor={backgroundColor} currentLayout={layout} lunchboxProps={props}>
				{!LunchboxModel.Layouts.Image.include(layout) && (
					<LunchboxText
						layout={layout}
						header={header}
						paragraph={paragraph}
						link={button}
						blogId={blogId}
						isVisible={isVisible}
						isAnimated={isAnimated}
					/>
				)}
				{LunchboxModel.Layouts.ImageText.include(layout) && <Gutter />}
				{imageOrWrapper}
				{button && LunchboxModel.Layouts.Image.include(layout) && <LunchboxLink link={button} blogId={blogId} />}
			</LunchboxWrapper>
		</EnsureDefaultTheme>
	);
}
