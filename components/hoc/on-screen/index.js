// @flow

import * as React from 'react';
import TrackVisibility from 'react-on-screen';
import type { FunctionOrClassComponent } from '../../../utils/types';

export type OnScreenInjectedProps = {
	isVisible?: boolean
};

type OnScreenProps = {
	offset?: number,
	once?: boolean,
	partialVisibility?: boolean
}

function OnScreen<Props: OnScreenInjectedProps, State>(
	WrappedComponent: FunctionOrClassComponent<Props, State>,
	{
		offset = 0,
		once = false,
		partialVisibility = false,
		...rest
	}: OnScreenProps = {}
): React.StatelessFunctionalComponent<$Diff<Props, OnScreenInjectedProps>> {
	return function OnScreenHOC(props: Props) {
		return <TrackVisibility offset={offset} once={once} partialVisibility={partialVisibility} {...rest}>
			<WrappedComponent {...props} />
		</TrackVisibility>;
	};
}

export default OnScreen;
