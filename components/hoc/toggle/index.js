/* @flow */

import * as React from 'react';
import clickOutside from '../click-outside';
import type { ClickOutsideInjectedProps } from '../click-outside';
import type { FunctionOrClassComponent } from '../../../utils/types';

// Props your component will get from Toggle
export type ToggleInjectedProps = {
	toggle: (callback?: () => void) => void,
	close: (callback?: () => void) => void,
	isOpen: boolean
} & ClickOutsideInjectedProps;

// Options you can pass in when initializing the new component type
type Options = {
	isOutsideClickEnabled?: boolean,
	isDefaultOpen?: boolean
};

type ToggleState = {|
	isOpen: boolean
|};

export default function Toggle<Props: ToggleInjectedProps, State>(
	Target: FunctionOrClassComponent<Props, State>,
	options?: Options
): Class<React.Component<$Diff<Props, ToggleInjectedProps>, ToggleState>> {
	return class ToggleHOC extends React.PureComponent<$Diff<Props, ToggleInjectedProps>, ToggleState> {
		static displayName = `Toggle(${Target.displayName || Target.name || 'Component'})`;
		composedComponent: React.ComponentType<*>;

		state = {
			isOpen: false
		};

		constructor(props: $Diff<Props, ToggleInjectedProps>) {
			super(props);

			// Make sure the component is opened by default if set
			if (options && options.isDefaultOpen) {
				this.state = {
					isOpen: true
				};
			}

			// Initialize the composed component that already has ClickOutside
			this.composedComponent = clickOutside(Target);
		}

		toggle = (callback?: () => void) => {
			if (callback instanceof Function) {
				this.setState({ isOpen: !this.state.isOpen }, callback);
			} else {
				this.setState({ isOpen: !this.state.isOpen });
			}
		}

		close = () => {
			this.setState({ isOpen: false });
		}

		render() {
			const isOutsideClickEnabled = (options && options.isOutsideClickEnabled);
			const ComposedComponent = this.composedComponent;
			return (
				<ComposedComponent
					isOpen={this.state.isOpen}
					toggle={this.toggle}
					close={this.close}
					handleClickOutside={isOutsideClickEnabled ? this.close : undefined}
					{...this.props}
				/>
			);
		}
	};
}
