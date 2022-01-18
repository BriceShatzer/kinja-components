/* @flow */

import * as React from 'react';
import throttle from 'lodash/throttle';

type Props = { children: (hide: boolean) => React.Node };
type State = { hide: boolean, lastScrollPosition: number };

class HideOnScroll extends React.Component<Props, State> {
	scrollHandler: () => void = () => {};

	constructor(props: Props) {
		super(props);
		this.state = {
			hide: false,
			lastScrollPosition: typeof window !== 'undefined' ? window.pageYOffset : 0
		};
		this.scrollHandler = throttle(this.handleScroll, 400);
	}

	componentDidMount() {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', this.scrollHandler);
		}
	}

	componentWillUnmount() {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', this.scrollHandler);
		}
	}

	getScrollPosition = () => typeof window !== 'undefined' ? window.pageYOffset : 0;

	handleScroll = () => {
		const currentScrollPosition = this.getScrollPosition();
		const hide = currentScrollPosition > this.state.lastScrollPosition;
		this.setState({
			hide,
			lastScrollPosition: currentScrollPosition
		});
	};

	render() {
		return this.props.children(this.state.hide);
	}
}
export default HideOnScroll;
