// @flow
import React from 'react';
import type {PostVersion} from './types';
import { DateTime } from 'luxon';
import styled, {css} from 'styled-components';
import Button from '../buttons';
import { EnsureDefaultTheme } from '../theme';

const ListItem = styled.li`
	padding: 10px 0;
	list-style-type: none;
	font-size: 14px;
	line-height: 17px;

	${props => !props.isLast && css`
		border-bottom: 1px solid ${props => props.theme.color.midgray};
	`}
`;
const ListItemInner = styled.div`
	align-items: center;
`;
const VersionInfo = styled.span`
	font-style: italic;
	color: ${props => props.theme.color.gray};
`;
VersionInfo.displayName = 'VersionInfo';

const LeftColumn = styled.div`
	text-align: left;
`;
const RightColumn = styled.div`
	text-align: right;
`;

export default function Version({
	createdAt,
	author,
	recoverVersion,
	versionId,
	isLast
}: PostVersion) {
	const defaultDateFormat = "MM/dd/y'—'h:mm a"; // eslint-disable-line
	const minutesAgo = DateTime.local().diff(DateTime.fromMillis(createdAt), 'minutes').minutes;
	const dateLabel = minutesAgo <= 30 ? `${minutesAgo} minutes ago`
		: DateTime.fromMillis(createdAt).toFormat(defaultDateFormat);
	const onRecover = () => {
		recoverVersion(versionId);
	};

	return (
		<EnsureDefaultTheme>
			<ListItem isLast={isLast}>
				<ListItemInner className="flex-row flex-row--align-center">
					<LeftColumn className="flex-row__column">
						<VersionInfo>{dateLabel}</VersionInfo>
					</LeftColumn>
					<div className="flex-row__column">
						<VersionInfo>Last edited by:<br/>{author && author.displayName}</VersionInfo>
					</div>
					<RightColumn className="flex-row__column">
						<Button label="Recover" weight="secondary" small onClick={onRecover}/>
					</RightColumn>
				</ListItemInner>
			</ListItem>
		</EnsureDefaultTheme>
	);
}
