/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Button from '../buttons';
import CurrentPath from './current-path';
import {
	footerPaddingVertical,
	footerPaddingHorizontal,
	lineColor,
	chevronMargin
} from './consts';

type Props = {
	currentPath: React.Element<typeof CurrentPath>,
	onCancel: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
	onSelect: () => void,
	selectDisabled?: boolean
};

export const Wrapper = styled.footer`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	border-top: 1px solid ${lineColor};
	padding: ${footerPaddingVertical}px ${footerPaddingHorizontal}px;
`;

const CurrentPathIndicator = styled.span`
	display: flex;
	margin-right: auto;
	font-size: 14px;
	color: ${props => props.theme.color.gray};
`;

const CurrentPathIndicatorInner = styled.div`
	margin-left: ${chevronMargin}px;
`;

const ButtonWrapper = styled.div`
	margin-right: 8px;
`;

export default function FolderSelector(props: Props) {
	return (
		<Wrapper>
			{props.currentPath && (
				<CurrentPathIndicator>
					Move to
					<CurrentPathIndicatorInner>
						{props.currentPath}
					</CurrentPathIndicatorInner>
				</CurrentPathIndicator>
			)}
			<ButtonWrapper>
				<Button small label="Cancel" weight="secondary" onClick={props.onCancel} />
			</ButtonWrapper>
			<Button small label="Move here" disabled={props.selectDisabled} onClick={props.onSelect} />
		</Wrapper>
	);
}
