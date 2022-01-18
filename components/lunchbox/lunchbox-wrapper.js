/* @flow */

import * as React from 'react';
import {
	LunchboxContainer,
	LunchboxInnerContainer,
	LunchboxImageTextContainer,
	LunchboxImageTextContainerReversed,
	LunchboxImageTextVerticalContainer,
	LunchboxImageTextVerticalInvertedContainer,
	LunchboxImageInnerContainer
} from './styles';
import Lunchbox from 'kinja-magma/models/Lunchbox';
import type { LunchboxLayoutType } from 'kinja-magma/models/LunchboxLayoutGroup';
import EnsureDefaultTheme from '../theme';
import type { LunchboxProps } from 'kinja-magma/models/Lunchbox';

type LunchboxWrapperProps = {
	currentLayout: LunchboxLayoutType,
	backgroundColor?: ?string,
	lunchboxProps?: LunchboxProps,
	children: React.Node
};

// a themed wrapper component that handles global styles for this lunchbox
export default function LunchboxWrapper(props: LunchboxWrapperProps) {
	const { currentLayout, backgroundColor, lunchboxProps } = props;
	let InnerContainer;
	// different layout groups require different inner containers
	// these inner containers change the flex direction and flow of the lunchbox.
	if (Lunchbox.Layouts.ImageText.include(currentLayout, layout => layout.indexOf('Right') > 0)) {
		InnerContainer = LunchboxImageTextContainerReversed;
	} else if (Lunchbox.Layouts.ImageText.include(currentLayout, layout => layout.indexOf('Left') > 0)) {
		InnerContainer = LunchboxImageTextContainer;
	} else if (Lunchbox.Layouts.Hero.include(currentLayout, layout => layout.indexOf('ImageFirst') > 0)) {
		InnerContainer = LunchboxImageTextVerticalContainer;
	} else if (Lunchbox.Layouts.Hero.include(currentLayout, layout => layout.indexOf('TextFirst') > 0)) {
		InnerContainer = LunchboxImageTextVerticalInvertedContainer;
	} else if (Lunchbox.Layouts.Image.include(currentLayout)) {
		InnerContainer = LunchboxImageInnerContainer;
	} else {
		// all other layouts use the standard flex-column container
		InnerContainer = LunchboxInnerContainer;
	}

	return (
		<EnsureDefaultTheme>
			<LunchboxContainer backgroundColor={backgroundColor} data-lunchbox={lunchboxProps && JSON.stringify(lunchboxProps)} className="js_lunchbox">
				<InnerContainer>{props.children}</InnerContainer>
			</LunchboxContainer>
		</EnsureDefaultTheme>
	);
}
