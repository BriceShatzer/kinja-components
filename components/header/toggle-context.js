/* @flow */

import * as React from 'react';
import type { ToggleInjectedProps } from '../hoc/toggle';

// Props your component will get from Toggle
export type ToggleContextInjectedProps = {
	toggleWithContext: (isScrollback: boolean) => void,
	toggleIsScrollback: boolean
};

type ToggleContextState = {|
	isScrollback: boolean
|};


export default function ToggleContext<Props: ToggleContextInjectedProps & ToggleInjectedProps>(
	ComposedComponent: React.StatelessFunctionalComponent<Props>
): Class<React.Component<Props, ToggleContextState>> {
	return class ToggleHOC extends React.PureComponent<Props, ToggleContextState> {
		static displayName = `ToggleContext(${ComposedComponent.displayName || ComposedComponent.name || 'Component'})`;

		state = {
			isScrollback: false
		};

		toggle = (isScrollback: boolean) => {
			this.setState({ isScrollback}, () => this.props.toggle());
		}

		render() {
			return (
				<ComposedComponent
					{...this.props}
					toggleWithContext={this.toggle}
					toggleIsScrollback={this.state.isScrollback}
				/>
			);
		}
	};
}
