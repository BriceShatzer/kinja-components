/* @flow */

import * as React from 'react';
import autobind from 'autobind-decorator';
import type { FunctionOrClassComponent } from '../../../utils/types';

// Props your component will get from ClickOutside
export type ClickOutsideInjectedProps = {
	insideReference?: ?HTMLElement => void // Allows you to define what constitutes the component
};

// Props used by ClickOutside
export type ClickOutsideProps = {
	handleClickOutside?: (MouseEvent => void) // What should happen when the user clicks outside the component
};

export default function enhanceWithClickOutside<Props: ClickOutsideInjectedProps, State>(
	WrappedComponent: FunctionOrClassComponent<Props, State>
): Class<React.Component<$Diff<Props, ClickOutsideInjectedProps> & ClickOutsideProps>> {
	return class ClickOutsideHOC extends React.PureComponent<$Diff<Props, ClickOutsideInjectedProps> & ClickOutsideProps> {
		static displayName = `ClickOutside(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

		handleClickOutside: MouseEvent => void;
		domNode: ?Element;

		componentDidMount() {
			document.addEventListener('click', this.handleClickOutside, true);
		}

		componentWillUnmount() {
			document.removeEventListener('click', this.handleClickOutside, true);
		}

		@autobind
		handleClickOutside(e: MouseEvent) {
			const domNode = this.domNode;
			if (
				(!domNode || (e.target instanceof Element && !domNode.contains(e.target))) && this.props.handleClickOutside
			) {
				this.props.handleClickOutside(e);
			}
		}

		render() {
			const { handleClickOutside, ...props } = this.props;
			return (
				<WrappedComponent
					insideReference={(element: ?Element) => { this.domNode = element; }}
					{...props}
				/>
			);
		}
	};
}
