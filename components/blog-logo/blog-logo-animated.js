/* @flow */


import * as React from 'react';
import WalkwayJs from 'walkway.js';
import SVG from 'react-svg-inline';
import styled from 'styled-components';
import type { Props } from './blog-logo';

export type AnimatedBlogLogoProps = Props & {
	onFinish?: () => void,
	options?: {
		duration?: number,
		easing?: string | () => void
	}
};

const allLogoDefinitions = require('./anim-logo-set-raw.json');

const WalkwayWrap = styled.div`
	display: flex;
	justify-content: center;

	svg {
		height: 200px;
		max-width: 400px;
		fill: none !important;
		stroke: #000;
		stroke-linejoin: bevel;
		stroke-miterlimit: 30;
		stroke-width: 2px;

		&[id$="-white-svg"] { stroke: #fff; }

		@media only screen and (max-width: 400px) {
			height: auto;
			width: 100%;
		}

		path {
			fill: none !important;
		}
	}
`;


class AnimatedBlogLogo extends React.Component<AnimatedBlogLogoProps> {
	walkway: WalkwayJs;

	componentDidMount() {
		const { options, onFinish } = this.props;
		const { duration, easing } = options || {};

		this.walkway = new WalkwayJs({ selector: `#${this._getName()} svg`, duration, easing });
		this.walkway.draw(onFinish);
	}

	render() {
		const name = this._getName();
		const svg = allLogoDefinitions[name];

		return (
			<WalkwayWrap>
				<SVG id={name} svg={svg} />
			</WalkwayWrap>
		);
	}

	_getName() {
		const props = this.props;
		let name = allLogoDefinitions.hasOwnProperty(props.name) ? props.name : 'kinja';
		name = props.monochrome ? name + '-white' : name;
		return name;
	}
}

export default AnimatedBlogLogo;
