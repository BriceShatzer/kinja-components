// @flow

import * as React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../theme';
import imageUrl from 'kinja-images/imageUrl';

type Props = {
	background: ?string,
	children?: React.Node
};

type State = {
	firstLayer: ?string,
	secondLayer: ?string,
	active: boolean
};

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	z-index: 1;

	&::after {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		content: '';
		background-color: ${props => props.theme.color.foregroundLayer};
	}
`;

const Background = styled.div`
	position: absolute;
	top: -10%;
	left: -10%;
	right: -10%;
	bottom: -10%;
	z-index: -2;
	background-image: url(${props => props.image});
	background-position: center center;
	background-size: cover;
	transition: opacity 600ms ease-in-out;
	will-change: opacity;
	opacity: ${props => props.active ? 1 : 0};
	filter: blur(30px);
	background-blend-mode: multiply;
	background-color: ${props => props.theme.color.backgroundLayer};
`;

class VibrancyBackground extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			firstLayer: this.props.background,
			secondLayer: '',
			active: false
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		if (this.props.background !== nextProps.background) {
			this.setState(prevState => ({
				firstLayer: !prevState.active ? prevState.firstLayer : nextProps.background,
				secondLayer: prevState.active ? prevState.secondLayer : nextProps.background,
				active: !prevState.active
			}));
		}
	}

	getImageUrl = (id: ?string) => {
		return id ? imageUrl(id, 'KinjaCenteredMediumAuto') : '';
	}

	render() {
		return (
			<EnsureDefaultTheme>
				<Container>
					<Background active={!this.state.active} image={this.getImageUrl(this.state.firstLayer)}/>
					<Background active={this.state.active} image={this.getImageUrl(this.state.secondLayer)}/>
					{this.props.children}
				</Container>
			</EnsureDefaultTheme>
		);
	}
}

export default VibrancyBackground;
