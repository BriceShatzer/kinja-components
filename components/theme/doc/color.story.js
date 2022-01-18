// @flow

import React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';
import { colors, brandColors } from '../themes';
import { EnsureDefaultTheme } from '../';
import contrast from 'get-contrast';
import TooltipWrapper from '../../tooltip/tooltip-wrapper';
import README from './COLOR.md';

const GridContianer = styled.main`
	width: 800px;
	padding: 0 1.125rem;
`;

const Heading = styled.h3`
	margin: 16px 0 24px 0;
	padding-bottom: 4px;
	font-size: 21px;
	font-weight: 700;
	border-bottom: 1px solid ${props => props.theme.color.lightgray};
`;

const Grid = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	grid-column-gap: 16px;
	grid-row-gap: 16px;
	margin-bottom: 56px;

	&:last-child {
		margin-bottom: 32px;
	}
`;

const Label = styled.div`
	background: ${props => props.theme.color.white};
	color: ${props => props.theme.color.gray};
	bottom: 0;
	text-align: left;
	font-size: 16px;
	line-height: 1.3;
	display: inline-block;
`;

const OverlayLabel = styled(Label)`
	line-height: 1.3;
	font-size: 14px;
	padding: 8px;
	background: transparent;
`;

const RightOverlayLabel = styled(OverlayLabel)`
	text-align: right;
	cursor: help;
	user-select: none;
	font-size: 12px;
`;

const ColorBox = styled.div`
	display: flex;
	height: 75px;
	justify-content: space-between;
	align-items: flex-end;
	background-color: ${props => props.bg};
	border: 1px solid ${props => props.bg === props.theme.color.white ? props.theme.color.lightgray : props.theme.color.white};
	border-radius: 5px;

	${OverlayLabel},
	${RightOverlayLabel} {
		color: ${props => textColorForBackground(props.bg)};
	}
`;

function textColorForBackground(backgroundColor) {
	const contrastWithDarkText = contrast.ratio(backgroundColor, colors.darksmoke);
	const contrastWithLightText = contrast.ratio(backgroundColor, colors.white);
	const exceptions = [colors.twitter];

	if (contrastWithLightText >= contrastWithDarkText || exceptions.includes(backgroundColor)) {
		return colors.white;
	} else {
		return colors.darksmoke;
	}
}

type Props = {
	toggleTooltip: (e: SyntheticMouseEvent<HTMLElement>) => void,
	label: string,
	color: string
};
type State = {
	showTooltip: boolean
};

class GridItem extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			showTooltip: false
		};
	}
	tooltipRef: ?HTMLElement
	setTooltipRef = ref => {
		this.tooltipRef = ref;
		this.setState({showTooltip: true});
	}
	render() {
		const { toggleTooltip } = this.props;
		return (
			<div>
				<ColorBox bg={this.props.color}>
					<OverlayLabel>{this.props.color}</OverlayLabel>
					<RightOverlayLabel
						data-shouldshowtooltip={true}
						data-tooltipname='Contrast ratio (higher=more readable)'
						onMouseEnter={toggleTooltip}
						onMouseLeave={toggleTooltip}
					>
						{contrast.ratio(this.props.color, textColorForBackground(this.props.color)).toFixed(1)}
					</RightOverlayLabel>
				</ColorBox>
				<Label>{this.props.label}</Label>
			</div>
		);
	}
}

const drawColorGrid = (colorObject, heading, toggleTooltip) => {
	const grids = [];
	const gridItems = [];

	Object.keys(colorObject).map(function (colorKey) {
		if (typeof colorObject[colorKey] !== 'object') {
			gridItems.push(
				<GridItem
					toggleTooltip={toggleTooltip}
					color={colorObject[colorKey]}
					label={colorKey}
				/>
			);
		}
	});

	grids.push(gridItems);
	return grids;
};

type ColorGridProps = {
	heading: string,
	colorObject: {}
}

const ColorGrid = (props: ColorGridProps) => {
	const {heading} = props;
	return (<React.Fragment>
		<Heading>{heading}</Heading>
		<TooltipWrapper>
			{({ toggleTooltip}) => {
				return <Grid>
					{drawColorGrid(props.colorObject, props.heading, toggleTooltip)}
				</Grid>;
			}}
		</TooltipWrapper>
	</React.Fragment>);
};

storiesOf('2. Styles & Utilities|Color', module)
	.addDecorator(withDocs(README))
	.add('Color Palette', () => {
		return (
			<EnsureDefaultTheme>
				<GridContianer>
					<ColorGrid colorObject={colors} heading={'Default Theme'}/>
					{Object.keys(brandColors).map(function (colorKey) {
						return <ColorGrid key={colorKey} colorObject={brandColors[colorKey]} heading={colorKey}/>;
					})}
				</GridContianer>
			</EnsureDefaultTheme>
		);
	});
