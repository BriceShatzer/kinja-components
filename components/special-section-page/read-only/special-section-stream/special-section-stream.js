/* @flow */

import * as React from 'react';
import Lunchbox, { AnimatedLunchbox } from '../../../lunchbox/read-only';
import { default as LunchboxModel } from 'kinja-magma/models/Lunchbox';

type Props = {
	customContent: Array<LunchboxModel>
};

const SpecialSectionStream = (props: Props) => (
	<div className="js_stream-container">
		{props.customContent.map((singleLunchboxProp, index) => {
			const k = index + singleLunchboxProp.layout;
			if (LunchboxModel.Layouts.ImageText.include(singleLunchboxProp.layout)) {
				return <AnimatedLunchbox key={k} {...singleLunchboxProp} isAnimated />;
			} else {
				return <Lunchbox key={k} {...singleLunchboxProp} />;
			}
		})}
	</div>
);

export default SpecialSectionStream;
