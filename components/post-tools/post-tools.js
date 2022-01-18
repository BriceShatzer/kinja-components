// @flow

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import { Dropdown, DropdownContainer } from '../dropdown';
import type { SaveBadgeProps } from 'kinja-components/components/post-elements/save-badge/save-badge';
import type { PostToolsProps } from './';
import Tools24Icon from '../icon19/Tools24';

import {
	PermalinkToolContainer,
	PermalinkUserTools
} from './post-tools-permalink';

import {
	StreamToolContainer,
	StreamUserTools
} from './post-tools-stream';

const PostToolsContainer = styled.div`
	display: flex;
`;

const PostToolsIconContainer = styled.div`
	${({ isPermalink }) => isPermalink && `
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 40px;
	`}

	svg {
		height: ${({ isPermalink }) => isPermalink ? '18px' : 'auto'};
		cursor: pointer;
	}
`;

export class PostTools extends React.Component<PostToolsProps & SaveBadgeProps, {dropdownOpen: boolean}> {

	constructor(props: PostToolsProps & SaveBadgeProps) {
		super(props);
		this.state = {
			dropdownOpen: false
		};
	}

	toggleDropdown = () => {
		this.props.dropdownClickHandler && this.props.dropdownClickHandler();
		this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen}));
	}

	closeDropdown = () => {
		this.setState({ dropdownOpen: false});
	}

	render() {
		const isPermalink = this.props.type === 'permalink';

		const ToolContainer = isPermalink
			? PermalinkToolContainer
			: StreamToolContainer;

		const UserTools = isPermalink
			? PermalinkUserTools
			: StreamUserTools;

		return (
			<EnsureDefaultTheme>
				<PostToolsContainer>
					{/* Needed because the tools within need to be scrollable on the permalink page on mobile */}
					<ToolContainer>
						<UserTools>
							{/* Admin dropdown trigger, dropdown contents are in a separate element*/}
							{this.props.dropdownContents &&
								<PostToolsIconContainer isPermalink={isPermalink}>
									<Tools24Icon onClick={this.toggleDropdown} />
								</PostToolsIconContainer>}

						</UserTools>

					</ToolContainer>

					{/* Admin dropdown menu, needs to be outside the scrollable container for it to be visible when open */}
					{this.props.dropdownContents &&
						<Dropdown
							isOpen={this.state.dropdownOpen}
							onClose={this.closeDropdown}
							dropdownContainer={DropdownContainer}
							options={{
								align: 'right'
							}}
						>
							{this.props.dropdownContents}
						</Dropdown>
					}

				</PostToolsContainer>
			</EnsureDefaultTheme>
		);
	}
}
