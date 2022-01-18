/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import Tools24Icon from '../icon19/Tools24';
import { Dropdown, DropdownContainer, TriggerContainer } from 'kinja-components/components/dropdown';
import { EnsureDefaultTheme } from '../theme';

export type EditorToolsProps = {
	className?: string,
	isPermalink?: string,
	dropdownClickHandler?: () => void,
	dropdownContents?: React.Node,
	dropdownOptions?: *
};

type StateProps = {
	postId: string
};

const EditorToolsContainer = styled.div`
	position: relative;
	cursor: pointer;
`;

const DropdownWrapper = styled.div`
	${({ isPermalink }) => !isPermalink && `
		${TriggerContainer} {
			svg[aria-label="Tools24 icon"] {
				transform: rotate(90deg);
			}
		}
	`}
`;

const EditorTools = (props: EditorToolsProps) => {
	const {
		isPermalink,
		dropdownClickHandler,
		dropdownContents = null,
		dropdownOptions = {}
	} = props || {};
	return dropdownContents ? (
		<EnsureDefaultTheme>
			<EditorToolsContainer>
				<DropdownWrapper isPermalink={isPermalink}>
					<Dropdown
						options={dropdownOptions}
						trigger={(
							<Tools24Icon onClick={dropdownClickHandler} />
						)}
						dropdownContainer={DropdownContainer}
					>
						{dropdownContents}
					</Dropdown>
				</DropdownWrapper>
			</EditorToolsContainer>
		</EnsureDefaultTheme>
	) : null;
};

const StateContainer = ({ data, children }: {
	data: EditorToolsProps & StateProps,
	children: React.Node
}) => (
	<div
		className={cx('js_editor-tools', data.className)}
		data-state={JSON.stringify(data)}
		data-post-id={data.postId}
	>
		{children}
	</div>
);

export const StatefulEditorTools = (props: EditorToolsProps & StateProps): React.Node => {
	return (
		<StateContainer data={props} {...props}>
			<EditorTools
				{...props}
			/>
		</StateContainer>
	);
};

export default EditorTools;
