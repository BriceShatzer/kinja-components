/* @flow */

import * as React from 'react';
import styled, {css} from 'styled-components';
import Folder from './folder';
import Footer from './footer';
import CurrentPath from './current-path';
import {
	folderWidth,
	folderCount,
	folderCountMultipleSelection,
	browserHeight,
	itemPaddingHorizontal,
	lineColor
} from './consts';
import type {LevelState} from './types';

type Props = {
	children: React.ChildrenArray<React.Element<typeof Folder>>,
	currentLevel: number,
	currentPath: React.Element<typeof CurrentPath>,
	getBrowserInnerRef: ?HTMLDivElement => void,
	levels: Array<LevelState>,
	multipleSelection?: boolean,
	onCancel: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
	onSelect: () => void,
	scrolledToTheRight: boolean,
	selectDisabled?: boolean
};

export const Wrapper = styled.div`
	overflow-y: hidden;
	border: 1px solid ${props => props.theme.color.midgray};
	border-radius: 0 3px 3px 3px;
	background: ${props => props.theme.color.white};
`;

export const InnerWrapper = styled.div`
	width: ${props => `${folderWidth * props.folderNum}px`};
	overflow-x: auto;
`;

const Inner = styled.div`
	display: flex;
	height: ${browserHeight}px;
`;

const FolderTitleWrapper = styled.div`
	display: flex;
`;

export const FolderTitle = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;
	font-weight: 400;
	text-transform: capitalize;
	flex: 0 0 200px;
	color: ${props => props.theme.color.gray};
	padding: 10px ${itemPaddingHorizontal}px 5px;

	&:not(:first-child) {
		border-left: 1px solid ${lineColor};
	}

	${props => props.scrolledToTheRight && props.index === 1 && css`
		&:not(:first-child) {
			border-left: none;
		}
	`}
`;

export default function FolderBrowser(props: Props) {
	const levelsUsedForTitles = (props.currentLevel + 1) < folderCount ? props.levels.slice(0, folderCount) : props.levels;
	const getFolderNum = () => props.multipleSelection ? folderCountMultipleSelection : folderCount;

	return props.multipleSelection
		? <Wrapper>
			<InnerWrapper ref={ref => { props.getBrowserInnerRef(ref); }} folderNum={getFolderNum()}>
				<FolderTitleWrapper>
					{levelsUsedForTitles.map(level => {
						return <FolderTitle
							key={level.id}
							scrolledToTheRight={props.scrolledToTheRight}
							index={level.key}
						>{level.displayName}</FolderTitle>;
					})}
				</FolderTitleWrapper>
				<Inner>
					{props.children}
				</Inner>
			</InnerWrapper>
		</Wrapper>

		: <Wrapper>
			<InnerWrapper ref={ref => { props.getBrowserInnerRef(ref); }} folderNum={getFolderNum()}>
				<FolderTitleWrapper>
					{levelsUsedForTitles.map(level => {
						return <FolderTitle
							key={level.id}
							scrolledToTheRight={props.scrolledToTheRight}
							index={level.key}
						>{level.displayName}</FolderTitle>;
					})}
				</FolderTitleWrapper>
				<Inner>
					{props.children}
				</Inner>
			</InnerWrapper>
			<Footer
				selectDisabled={props.selectDisabled}
				currentPath={props.currentPath}
				onSelect={props.onSelect}
				onCancel={props.onCancel}/>
		</Wrapper>;
}
