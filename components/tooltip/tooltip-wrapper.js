/* @flow */

import * as React from 'react';
import Tooltip from './tooltip';

type Props = {
	children: ({
		toggleTooltip: (e: SyntheticMouseEvent<HTMLElement>) => void
	}) => React.Node
};

type State = {
	showTooltip: boolean,
	toolTipContent: string,
	tooltipRef?: HTMLElement,
	topOffset: number
}

export default class TooltipWrapper extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			showTooltip: false,
			toolTipContent: '',
			topOffset: 5
		};
	}
	toggleTooltip = (e: SyntheticMouseEvent<HTMLElement>) => {
		if (!(e.currentTarget instanceof HTMLElement)) {
			return;
		}
		const element = e && e.currentTarget;
		const { shouldshowtooltip, tooltipname, tooltipoffset } = element.dataset;
		const shouldShow = shouldshowtooltip === 'true';
		const show = shouldShow && e.type === 'mouseenter';

		if (shouldShow) {
			this.setState({
				showTooltip: show,
				toolTipContent: tooltipname,
				tooltipRef: element,
				topOffset: Number(tooltipoffset) || 5
			});
		}
	}
	render() {
		return (<React.Fragment>
			{this.state.showTooltip && <Tooltip
				topOffset={this.state.topOffset || 5}
				content={this.state.toolTipContent}
				elementRef={this.state.tooltipRef}
			/>}
			{this.props.children({
				toggleTooltip: this.toggleTooltip
			})}
		</React.Fragment>);
	}
}
