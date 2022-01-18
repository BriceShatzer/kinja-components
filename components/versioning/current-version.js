// @flow
import React from 'react';
import type {CurrentPostVersion} from './types';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';

const ListItem = styled.li`
	border-bottom: 1px solid ${props => props.theme.color.midgray};
	padding: 10px 0;
	list-style-type: none;
	font-size: 14px;
	line-height: 17px;
`;
const ListItemInner = styled.div`
	align-items: center;
`;
const VersionInfo = styled.span`
	font-style: italic;
	color: ${props => props.theme.color.gray};
`;
const LeftColumn = styled.div`
	text-align: left;
`;
const RightColumn = styled.div`
	color: ${props => props.theme.color.darkgray};
	letter-spacing: 0.5px;
	text-align: right;
`;
const RightColumnInner = styled.div`
	padding-right: 32px;
`;

export default function CurrentVersion({currentUser}: CurrentPostVersion) {
	return (
		<EnsureDefaultTheme>
			<ListItem>
				<ListItemInner className="flex-row flex-row--align-center">
					<LeftColumn className="flex-row__column">
						<VersionInfo>Unsaved changes</VersionInfo>
					</LeftColumn>
					<div className="flex-row__column">
						<VersionInfo>Last edited by:<br/>{currentUser}</VersionInfo>
					</div>
					<RightColumn className="flex-row__column">
						<RightColumnInner>Current</RightColumnInner>
					</RightColumn>
				</ListItemInner>
			</ListItem>
		</EnsureDefaultTheme>
	);
}
