// @flow
import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../../theme';
import { type ConcurrentEditWarningType, type UserWithTimestamp } from '../utils/shouldShowWarning';

// ICONS
import Close from 'kinja-components/components/icon19/Close';

const Container = styled.div`
	position: fixed;
	z-index: 200;
	top: ${props => `${props.offset}px`};
	left: 0;
	display: flex;
	width: 100%;
	font-size: 1.125rem;
	font-weight: bold;
	color: ${props => props.theme.color.white};
	background-color: ${props => props.theme.color.error};

	a {
		color: ${props => props.theme.color.white};
		text-decoration: underline;
	}
`;

const CloseIcon = styled(Close)`
	flex: 0 0 auto;
	padding: 1rem;
	cursor: pointer;

	svg {
		height: 1.5rem;
	}
`;

const Text = styled.div`
	padding: 1rem 0 1rem 1rem;
	flex: 1 1 auto;
`;

const editorAnchorElement = (displayName: string, screenName: string) => {
	const profileUrl = `https://kinja.com/${screenName}`;
	return <a key={profileUrl} href={profileUrl} rel="noopener noreferrer" target="_blank">{displayName}</a>;
};

const messages = {
	OverwriteWarning: (editors: Array<UserWithTimestamp>) => {
		const editor = editors[0].editor;
		return ['The homepage was changed by ',
			editorAnchorElement(editor.displayName, editor.screenName),
			' since you started editing. Cancel and restart editing to avoid overwriting those changes.'];
	},
	ConcurrentEditingWarning: (editors: Array<UserWithTimestamp>) => {
		const beForm = editors.length > 1 ? 'are' : 'is';
		const editorsString = editors.map((e, i, a) => {
			const editor = e.editor;
			let punctuation;
			if (i === a.length - 1) {
				punctuation = null;
			} else if (i === a.length - 2) {
				punctuation = ' and ';
			} else {
				punctuation = ', ';
			}
			return [editorAnchorElement(editor.displayName, editor.screenName), punctuation];
		});
		return [editorsString, ` ${beForm} also editing this page. Talk to them to make sure you don't overwrite each other's changes.`];
	}
};

type Props = {
	type: ConcurrentEditWarningType,
	editors: Array<UserWithTimestamp>,
	onCancel?: () => void,
	offset?: number
}

const FixedWarningBar = ({
	type = 'OverwriteWarning',
	offset = 48,
	editors,
	onCancel
}: Props) => {
	return (
		<EnsureDefaultTheme>
			<Container offset={offset}>
				<Text>
					{messages[type](type === 'OverwriteWarning' ? editors.filter(e => e.updatedBy) : editors)}
				</Text>
				<CloseIcon onClick={onCancel} />
			</Container>
		</EnsureDefaultTheme>
	);
};

export default FixedWarningBar;
