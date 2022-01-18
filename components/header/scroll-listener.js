// @flow

import * as React from 'react';
import throttle from 'lodash/throttle';

export type Props = {
	children: ({
		childrenRef: { current: null | HTMLDivElement },
		secondaryRef: { current: null | HTMLDivElement },
		showScrollback: boolean,
	}) => React.Node
};

type State = {
	showScrollback: boolean,
	previousScrollTop: number,
	upDistance: number,
	downDistance: number
};

const bodyOffset = () => typeof document !== 'undefined' && document.body ? document.body.getBoundingClientRect().top : 0;
const getPositionTop = (el: HTMLDivElement): number =>
	el.getBoundingClientRect().bottom - bodyOffset();

class ScrollListener extends React.Component<Props, State> {
	state = {
		showScrollback: false,
		upDistance: 0,
		downDistance: 0,
		previousScrollTop: typeof window !== 'undefined' ? window.pageYOffset : 0
	}
	childrenRef: { current: null | HTMLDivElement }
	secondaryRef: { current: null | HTMLDivElement }

	constructor(props: Props) {
		super(props);

		this.childrenRef = React.createRef();
		this.secondaryRef = React.createRef();
	}

	componentDidMount() {
		typeof window !== 'undefined' && window.addEventListener('scroll', throttle(this.handleScroll, 100));
	}

	componentWillUnmount() {
		typeof window !== 'undefined'  && window.removeEventListener('scroll', throttle(this.handleScroll, 100));
	}

	handleScroll = () => {
		// Nav display logic:
		// 1. scroll to the very top: hide scrollback nav and display the standard nav
		// 2. scrolling up: show scrollback nav
		// 3. scroll to the very bottom: show scrollback nav
		// 4. scrolling down: hide scrollback nav

		const currentScrollTop = window.pageYOffset;
		const reachedBottom = (window.innerHeight + currentScrollTop) >= (document.body && document.body.scrollHeight);
		const secondaryHeight = this.secondaryRef.current ? this.secondaryRef.current.offsetHeight : 0;
		const childrenBottomFromTop = this.childrenRef.current ? getPositionTop(this.childrenRef.current) - secondaryHeight : 0;
		const reachedTop = currentScrollTop <= childrenBottomFromTop;
		const upwardsScroll = currentScrollTop < this.state.previousScrollTop;

		const upDistance = upwardsScroll ? Math.max(0, this.state.upDistance + (this.state.previousScrollTop - currentScrollTop)) : 0;
		const downDistance = upwardsScroll ? 0 : Math.max(0, this.state.downDistance - (this.state.previousScrollTop - currentScrollTop));
		this.setState(() => ({
			previousScrollTop: currentScrollTop,
			upDistance,
			downDistance,
			showScrollback: !reachedTop && (reachedBottom ||
				(!this.state.showScrollback && upDistance > 200) || (this.state.showScrollback && downDistance < 200))
		}));
	}

	render() {
		return this.props.children({
			childrenRef: this.childrenRef,
			secondaryRef: this.secondaryRef,
			showScrollback: this.state.showScrollback
		});
	}
}

export default ScrollListener;
