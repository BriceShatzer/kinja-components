/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import media from '../../style-utils/media';
import { EnsureDefaultTheme } from '../theme';
import { type CurationItemProps } from 'kinja-magma/models/CurationItem';

const ZoneWrapper = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 100%;
	grid-auto-flow: row;
	grid-auto-rows: 1fr;
	grid-gap: 15px;
	max-height: inherit;
	transition: transform 0.2s;

	> div:not([data=zoneDragger]) {
		margin-bottom: inherit;
	}

	${({ showTertBorders, isTertiary }) =>
		showTertBorders && isTertiary && media.mediumUp`
			padding-left: 20px;
			border-left: ${({ theme }) => `1px solid ${theme.color.lightgray}`};
		`}

	${({ showTertBorders, isTertiaryWithChildren }) =>
		showTertBorders && isTertiaryWithChildren && media.mediumDown`
			padding: ${({ theme }) => `15px ${theme.columnPadding} 0`};
			border-bottom: ${({ theme }) => `1px solid ${theme.color.lightgray}`};
	`}
`;

const ZoneDragger = styled.div`
	position: absolute;
	display: none;
	top: 0;
	left: -5px;
	height: 100%;
	width: auto;
	border-left: 2px solid ${props => props.theme.color.primary};
	z-index: 1;
	padding: 0 10px;
	cursor: move;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}

	&::before {
		content: '';
		position: absolute;
		top: -12px;
		left: -7px;
		display: block;
		width: 12px;
		height: 12px;
		border-radius: 12px;
		background-color: ${props => props.theme.color.primary};
	}
`;

type ZoneProps = {
	dragEvents?: {
		onDragStart?: (SyntheticDragEvent<*>) => void,
		onDragEnter?: (SyntheticDragEvent<*>) => void,
		onDragEnd?: (SyntheticDragEvent<*>) => void,
		onDragOver?: (SyntheticDragEvent<*>) => void,
		onDragLeave?: (SyntheticDragEvent<*>) => void,
		onDrop?: (SyntheticDragEvent<*>) => void
	},
	zoneIndex: number,
	isDragging?: boolean,
	items: ?Array<CurationItemProps>,
	ZoneDraggable: boolean,
	zoneSize: string,
	zoneIndex?: number,
	Item: *,
	showTertBorders?: boolean
}

class ZoneComponent extends React.Component<ZoneProps> {
	render() {
		const { ZoneDraggable, items, zoneSize, zoneIndex, Item, showTertBorders = true } = this.props;
		const dragEvents = {
			...this.props.dragEvents,
			draggable: ZoneDraggable
		};

		const isTertiaryWithChildren = items && items.some(item => item.hasChildren);
		const ZoneClasses = `grid__zone curation-module__zone ${zoneSize} ${isTertiaryWithChildren ?
			'curation-module__zone__item-width-children' : ''}`;
		const itemDraggable = !ZoneDraggable ? 'ItemDragger' : null;

		return (
			<EnsureDefaultTheme>
				<ZoneWrapper
					{...dragEvents}
					{...{isTertiary: zoneSize !== 'big', isTertiaryWithChildren, showTertBorders}}
					className={ZoneClasses}
					data={this.props.zoneIndex}
				>
					{ZoneDraggable && <ZoneDragger className="zone__dragger" data='zoneDragger' />}

					{items && [...items].map((item: *, itemIndex: number) => {
						return (
							<div
								className='zone__item'
								key={itemIndex} // eslint-disable-line react/no-array-index-key
								data={itemDraggable}
							>
								<Item
									model={item}
									itemIndex={itemIndex}
									zoneIndex={zoneIndex}
									zoneSize={zoneSize}
									draggable={!ZoneDraggable}
								/>
							</div>
						);
					})}
				</ZoneWrapper>
			</EnsureDefaultTheme>
		);
	}
}

export default ZoneComponent;
