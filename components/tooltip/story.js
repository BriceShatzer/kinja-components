/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	text,
	number
} from 'base-storybook';
import Tooltip from './tooltip';
import TooltipWrapper from './tooltip-wrapper';
import README from './README.md';

// $FlowFixMe: React.forwardRef API is not in flow yet https://github.com/facebook/flow/issues/6103
const Paragraph = React.forwardRef((props, ref) => (
	<p ref={ref}>Open the stones!</p>
));

type TooltipElementState = {
	showTooltip: boolean
}
type Props = {}

class TooltipElement extends React.Component<Props, TooltipElementState> {
	constructor(props: Props) {
		super(props);

		this.state = {
			showTooltip: false
		};
	}
	tooltipElementRef: ?HTMLElement;
	setTooltipElementRef = (ref: ?HTMLElement) => {
		this.tooltipElementRef = ref;
		this.setState({
			showTooltip: true
		});
	}
	render() {
		return <React.Fragment>{this.state.showTooltip && <Tooltip
			content={text('Tooltip text', 'Korben, my man! I ain\'t got no fire!')}
			topOffset={number('Offset from top', 7)}
			width={number('Fixed tooltip width')}
			maxWidth={number('Tooltip max-width')}
			elementRef={this.tooltipElementRef}
		/>} <Paragraph ref={this.setTooltipElementRef} />
		</React.Fragment>;
	}
}

storiesOf('3. Elements|Tooltip', module)
	.addDecorator(withDocs(README))
	.add('Tooltip', () => (
		<TooltipElement />
	))
	.add('Tooltip Wrapper', () => (
		<TooltipWrapper>
			{({toggleTooltip}) => {
				return (
					<h1
						data-shouldshowtooltip={true}
						data-tooltipname={'super cool tooltip'}
						data-tooltipoffset={5}
						onMouseEnter={toggleTooltip}
						onMouseLeave={toggleTooltip}>
						I want a tooltip
					</h1>);
			}}
		</TooltipWrapper>
	));
