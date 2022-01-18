/* @flow */
/* eslint class-methods-use-this:0, react/prefer-stateless-function:0 */

import * as React from 'react';
import type { FunctionOrClassComponent } from '../../../utils/types';

export type AnalyticsInjectedProps = {
	ga: (...Array<mixed>) => void,
	gaNamespaced?: (?string, ...Array<mixed>) => void
};

export default function Analytics<Props: AnalyticsInjectedProps, State>(
	ComposedComponent: FunctionOrClassComponent<Props, State>
): Class<React.Component<$Diff<Props, AnalyticsInjectedProps>>> {
	return class WrapperComponent extends React.Component<$Diff<Props, AnalyticsInjectedProps>> {
		static displayName = `Analytics(${ComposedComponent.displayName || ComposedComponent.name || 'Component'})`;

		gaNamespaced: (?string, ...Array<mixed>) => void;
		gaNamespaced(namespace, ...message) {
			const action = namespace ? `${namespace}.send` : 'send';
			const args = [action, 'event'].concat(message);
			window.ga && window.ga.call(window, ...args);
		}

		render() {
			return (
				<ComposedComponent
					{...this.props}
					ga={(...message) => this.gaNamespaced(null, ...message)}
					gaNamespaced={this.gaNamespaced}
				/>
			);
		}
	};
}
