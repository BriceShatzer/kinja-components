/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import autobind from 'autobind-decorator';

import Link from '../../elements/link';
import ChevronDown from 'kinja-components/components/icon19/ChevronDown';
import { Dropdown, DropdownContainer, DropdownItem } from 'kinja-components/components/dropdown';
import { EnsureDefaultTheme } from '../../theme';
import media from 'kinja-components/style-utils/media';
import userAgent from 'kinja-magma/client/hydration/utils/userAgent';

import type Tag from 'kinja-magma/models/Tag';

const TouchOnlyDropdownItem = styled(DropdownItem)`
	${media.largeUp`
		display: none;
	`}
`;

const SingleTagContainer = styled.div`
	color: ${props => props.theme.color.gray};
	display: flex;
	&:hover {
		color: ${props => props.theme.color.gray};
		text-decoration: underline;
	}
`;

export const TagName = styled.span`
	text-transform: uppercase;
	color: ${props => props.theme.color.black};
	padding-left: 4px;
`;

export const SingleTagTrigger = ({
	tag,
	dropdownEnabled,
	alternativeFiledToText
}: {
	tag: Tag,
	dropdownEnabled?: boolean,
	alternativeFiledToText: ?string
}) => (
	<SingleTagContainer>
		<span>{alternativeFiledToText || 'Filed to:'}</span>
		<TagName>
			{tag.displayName}
		</TagName>
		{dropdownEnabled && <ChevronDown/>}
	</SingleTagContainer>
);

export const DropdownTrigger = ({
	onClick,
	firstTag,
	dropdownEnabled,
	alternativeFiledToText
}: {
	onClick?: (e: SyntheticEvent<*>) => *,
	firstTag: Tag,
	dropdownEnabled?: boolean,
	alternativeFiledToText: ?string
}) => (
	<EnsureDefaultTheme>
		<Link onClick={onClick} className="js_trigger" href={`/tag/${firstTag.urlName}`} events={[['Permalink meta', 'Tag click', 'First tag click']]}>
			<SingleTagTrigger tag={firstTag} dropdownEnabled={dropdownEnabled} alternativeFiledToText={alternativeFiledToText} />
		</Link>
	</EnsureDefaultTheme>
);

type TagDropdownProps = {
	tags: Array<Tag>,
	alternativeFiledToText: ?string
};

type TagDropdownState = {
	isOpen: boolean
}

class TagDropdown extends React.Component<TagDropdownProps, TagDropdownState> {

	state: TagDropdownState = {
		isOpen: false
	}

	constructor(props: TagDropdownProps) {
		super(props);
	}

	@autobind
	close(e: SyntheticEvent<*>) {
		e.preventDefault();
		this.setState({
			isOpen: false
		});
	}

	@autobind
	open(e: SyntheticEvent<*>) {
		e.preventDefault();
		this.setState({
			isOpen: true
		});
	}

	@autobind
	onTriggerClicked(e: SyntheticEvent<*>) {
		if (userAgent.isMobile()) {
			e.preventDefault();
			this.setState({
				isOpen: true
			});
		}
	}

	render() {

		const {
			tags,
			alternativeFiledToText
		} = this.props;

		return (
			<EnsureDefaultTheme>
				<div
					className="js_tag-dropdown"
				>
					<Dropdown
						isOpen={this.state.isOpen}
						onMouseEnter={this.open}
						onMouseLeave={this.close}
						trigger={<DropdownTrigger
							onClick={this.onTriggerClicked}
							firstTag={tags[0]}
							dropdownEnabled={tags.length > 1}
							alternativeFiledToText={alternativeFiledToText}
						/>}
						dropdownContainer={DropdownContainer}
						options={{
							align: 'right',
							useClick: false
						}}
					>
						{tags.map((tag, index) => {
							const Item = (index === 0)
								? TouchOnlyDropdownItem
								: DropdownItem;
							return (
								<Item
									upcase
									href={`/tag/${tag.urlName}`}
									key={tag.urlName}
									title={tag.displayName}
									events={[['Permalink meta', 'Tag click', 'Dropdown tag click']]}
								/>
							);
						})}
					</Dropdown>
				</div>
			</EnsureDefaultTheme>
		);
	}
}

export default TagDropdown;
