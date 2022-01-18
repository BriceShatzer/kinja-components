/* @flow */

import * as React from 'react';
import classnames from 'classnames';
import ZoneComponent from 'kinja-components/components/grid/zone';
import styled from 'styled-components';
import media from 'kinja-components/style-utils/media';
import { type CurationItemProps } from 'kinja-magma/models/CurationItem';

import type { CurationLayout, Zone as ZoneType } from '../types';

type Props = {
	children: ({ renderWithZones: (*) => React.Element<*>}) => React.Element<*>,
	isEditMode: boolean,
	items: ?Array<CurationItemProps>,
	layout: CurationLayout,
	setLayout: (number, number) => void,
	zonesDraggable: boolean,
	showZoneBorders?: boolean
}

type State = {
	draggable: boolean
}

const GridWrapper = styled.div`
	display: grid;
	grid-gap: 20px;
	width: 100%;
	margin: 0 auto;

	*[class*=isDragging] {
		cursor: grabbing;
	}

	&:hover {
		[data=zoneDragger] {
			opacity: 0.3;
		}
	}

	[data=zoneDragger] {
		opacity: 0;
		display: block;

		&:hover {
			opacity: 1;
		}
	}

	${media.mediumDown`
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		height: 100%;
	`}
`;

class Grid extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			draggable: this.props.zonesDraggable
		};

	}

	isDragging: boolean = false

	returnZoneItems = (items: Array<*>, begin: number, end: number): Array<*> => items.slice(begin, end);

	ondragstart = (event: SyntheticDragEvent<*>) => {
		this.isDragging = true;
		event.currentTarget.classList.add('isDragging');
		event.currentTarget.style = 'cursor: grabbing; cursor: -moz-grabbing; cursor: -webkit-grabbing;';
		event.dataTransfer.setData('draggedZoneIndex', event.currentTarget.attributes.data.value);
		event.dataTransfer.setDragImage(event.currentTarget, 0, 0);
	}

	ondragend = (event: SyntheticDragEvent<*>) => {
		this.isDragging = false;
		const el = event.currentTarget;
		el.style.opacity = 1;
		event.currentTarget.classList.remove('isDragging');
	}

	ondragover = (event: SyntheticDragEvent<*>) => {
		event.preventDefault();
		event.currentTarget.style.opacity = 0.5;
	}

	ondragenter = () => {}

	ondragleave = (event: SyntheticDragEvent<*>) => {
		event.currentTarget.style.opacity = 1;
	}

	ondrop = (event: SyntheticDragEvent<*>) => {
		event.preventDefault();
		this.isDragging = false;
		const draggedZoneIndex = event.dataTransfer.getData('draggedZoneIndex');
		const replacedZoneIndex = event.currentTarget.attributes.data.value;
		this.props.setLayout(draggedZoneIndex, replacedZoneIndex);
		event.currentTarget.style.opacity = 1;
	}

	componentWillReceiveProps = (nextProps: Props) => {
		this.setState({
			draggable: nextProps.zonesDraggable
		});
	}

	renderWithZones = (Item: *) => {
		const { layout, items, isEditMode, showZoneBorders = true } = this.props;
		const { draggable } = this.state;

		const gridTemplateColumnsParams = layout.zones.map(zone => zone.dimension).join(' ');
		const inlineStyles = {
			gridTemplateColumns: gridTemplateColumnsParams
		};

		let startIndex = 0;
		const layoutZones = [...layout.zones];

		Item.displayName = 'ZoneItem';

		return (
			<GridWrapper
				className={classnames('grid', {
					'grid--headline': layout.group === 'Headline',
					'grid--equal': layout.group === 'Equal',
					'grid--modular': layout.group === 'Modular'
				})}
				style={inlineStyles}
			>
				{layoutZones.map((zone: ZoneType, zoneIndex: number) => {
					const zoneItems = items && this.returnZoneItems(items, startIndex, startIndex + zone.numberOfItems);
					if (zoneItems) {
						startIndex = startIndex + zoneItems.length;
					}

					const ZonesWithDragEvents = isEditMode && layoutZones.length > 1 && draggable;

					const dragEvents = ZonesWithDragEvents ? {
						onDragStart: this.ondragstart,
						onDragEnter: this.ondragenter,
						onDragEnd: this.ondragend,
						onDragOver: this.ondragover,
						onDragLeave: this.ondragleave,
						onDrop: this.ondrop
					} : {};

					let zoneSize = '';

					const { dimension, numberOfItems } = layoutZones[zoneIndex] || {};

					if (dimension === '1fr' && numberOfItems === 1 && layoutZones.length === 1) {
						zoneSize = 'hero';
					} else if (dimension === '1fr' && numberOfItems === 1 && layout.group === 'Equal') {
						zoneSize = 'box';
					} else if (dimension === '1fr' && numberOfItems === 1 && layout.group === 'Modular') {
						zoneSize = 'tall';
					} else if (dimension === '2fr' && numberOfItems === 1) {
						zoneSize = 'big';
					} else if (dimension === '1fr' && numberOfItems === 2) {
						zoneSize = 'box';
					}

					return (
						<ZoneComponent
							key={zoneIndex} // eslint-disable-line react/no-array-index-key
							dragEvents={dragEvents}
							zoneIndex={zoneIndex}
							isDragging={ZonesWithDragEvents}
							items={zoneItems}
							ZoneDraggable={ZonesWithDragEvents}
							showTertBorders={showZoneBorders}
							zoneSize={zoneSize}
							Item={Item}
						/>
					);
				})}
			</GridWrapper>
		);
	}

	render() {
		const { layout, children } = this.props || {};

		if (!layout) {
			throw new Error('<Grid /> missing `layout` props');
		}

		if (!layout.zones) {
			throw new Error('<Grid /> missing `layout.zones` props');
		}

		return children instanceof Function ? children({
			renderWithZones: this.renderWithZones
		}) : null;
	}
}

export default Grid;
