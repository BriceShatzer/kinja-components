// @flow
import * as React from 'react';
import styled from 'styled-components';

import { defaultTheme } from '../theme';

type VideoListColumn = {
	name: string,
	width?: number,
	primary?: boolean
};

type VideoListProps = {
	columns: Array<VideoListColumn>,
  children?: React.Node,
  striped?: boolean
};

const ListHead = styled.th`
	font-weight: 400;
	
	border-bottom: 1px solid ${defaultTheme.color.midgray};
	align-self: flex-end;
	padding-bottom: 0;
`;

export const ListColumn = styled.td`
	align-items: center;
	overflow: hidden;
	padding: ${defaultTheme.columnPadding19.small19};
	text-align: ${props => props.centered ? 'center' : 'left'};
	justify-content: ${props => props.centered ? 'center' : 'left'};
`;

export const ListRow = styled.tr`
`;

const List = styled.table`
	min-width: 100%;

	@supports (display: grid) {
		tr {
			display: grid;
			grid-template-columns: ${props => props.columns.map(col => col.width ? `${col.width}px ` : `${col.primary ? '2' : '1'}fr `)};
		}

		th,
		td {
			display: flex;
		}
	}

	th,
	td {
		padding: ${defaultTheme.columnPadding19.small19};
		text-align: left;
		font-size: 1.125rem;
		line-height: 1.5rem;
		white-space: nowrap;
	}

	${props => props.striped && `
		${ListRow}:nth-child(even) > ${ListColumn} {
			background-color: ${defaultTheme.color.whitesmoke};
		}
	`}
`;

class VideoList extends React.Component<VideoListProps> {
	render() {
		const { columns } = this.props;

		return <List striped columns={columns}>
			<thead>
				<ListRow>
					{columns.map(col => <ListHead key={col.name}>{col.name}</ListHead>)}
				</ListRow>
			</thead>
			<tbody>
				{this.props.children}
			</tbody>
		</List>;
	}
}

export default VideoList;