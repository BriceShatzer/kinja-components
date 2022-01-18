// @flow
import * as React from 'react';
import TrackVisibility from 'react-on-screen';

type Props = {
	onLoaded: (?HTMLElement) => void,
	children: React.Node
};

type WrapperProps = {
	isVisible?: boolean,
} & Props;

class Wrapper extends React.Component<WrapperProps> {
	containerRef: { current: null | HTMLDivElement };

	constructor(props) {
		super(props);

		this.containerRef = React.createRef();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.isVisible && this.props.isVisible) {
			if (this.props.onLoaded) {
				this.props.onLoaded(this.containerRef.current);
			}
		}
	}

	render() {
		return (
			<div ref={this.containerRef}>
				{this.props.children}
			</div>
		);
	}
}

const LoadWhenVisible = (props: Props)=> (
	<TrackVisibility once partialVisibility>
		<Wrapper onLoaded={props.onLoaded}>{props.children}</Wrapper>
	</TrackVisibility>
);

export default LoadWhenVisible;
