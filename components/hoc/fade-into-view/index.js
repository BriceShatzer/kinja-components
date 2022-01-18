// @flow
import * as React from 'react';
import styled from 'styled-components';

import withFade from '../../../style-utils/animation';
import type { OnScreenInjectedProps } from '../on-screen';
import type { InOrOut, Origin } from '../../../style-utils/animation';
import OnScreen from '../on-screen';

type FadeConfig = {
	inOrOut: InOrOut,
	durationMs: number,
	delayMs: number,
	origin: ?Origin
};

const FadeWrapper = styled.div`
	opacity: ${props => props.fadeConfig.inOrOut === 'in' ? 0 : 1};
	${props => props.isVisible && withFade(props.fadeConfig)};
`;

function FadeIntoView({ fadeConfig, children, isVisible }: { fadeConfig: FadeConfig, children?: React.Node } & OnScreenInjectedProps) {
	return <FadeWrapper fadeConfig={fadeConfig} isVisible={isVisible}>{children}</FadeWrapper>;
}

export default OnScreen(FadeIntoView, { offset: 300, once: true, partialVisibility: false });
