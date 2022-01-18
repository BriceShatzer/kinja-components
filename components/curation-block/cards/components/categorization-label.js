// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { Label } from  '../../../story-type-label/story-type-label';
import type StoryType from 'kinja-magma/models/StoryType';
import Link from '../../../elements/link';
import { type Events } from 'kinja-components/components/elements/link';
import StandardBlockContext from '../../standard-block-data-context';
import type TypedTagData from 'kinja-magma/models/TypedTagData';
type Props = {|
	permalinkHost: string,
	storyType: StoryType,
	category?: ?TypedTagData,
	subcategory?: ?TypedTagData,
	disableLink?: boolean,
	events?: Events
|}

export const StyledLabel = styled(Label)`
	${props => props.unbranded && css`
		color: ${props => props.theme.color.darkgray};
	`}
	:hover {
		${props => props.unbranded ? css`
			color: ${props => props.theme.color.darksmoke};
		` : css`
			color: ${props => darken(0.1, props.theme.color.primary)};
		`}
	}
`;

export const NoLinkLabel = styled(StyledLabel)`
	/** Overwrite styles in Label, since in edit mode it is not clickable */
	cursor: default;

	:hover {
		${props => props.unbranded ? css`
			color: ${props => props.theme.color.darkgray};
		` : css`
			color: ${props => (props.featured ? props.theme.color.white : props.theme.color.primary)};
		`}
	}
`;

export const LabelLink = styled(Link)`
	text-decoration: none;
	color: inherit;

	:hover {
		text-decoration: none;
		color: inherit;
	}

	:focus,
	:active {
		outline: none;
		color: ${props => (props.featured ? props.theme.color.white : darken(0.2, props.theme.color.primary))};
	}
`;

export default function CategorizationLabel(props: Props) {
	const { storyType, category, subcategory, permalinkHost, disableLink, events } = props;
	const { block } = React.useContext(StandardBlockContext);
	const autofillType = block.autofill && block.autofill.type;
	let blockLink;
	let blockTitle;

	switch (autofillType) {
		case 'StoryTypeAutofill':
			blockTitle = category ? category.valueDisplay : storyType.title;
			blockLink = category ? // this ternary can be removed once we figure out the header logic
				`${permalinkHost}/c/${storyType.canonical}/${category.canonicalName}` :
				`${permalinkHost}/c/${storyType.canonical}`;
			break;
		case 'CategoryAutofill':
			blockTitle = category && (subcategory ? subcategory.valueDisplay : category.valueDisplay);
			blockLink = category && (subcategory ?
				`${permalinkHost}/c/${storyType.canonical}/${category.canonicalName}/${subcategory.canonicalName}` :
				`${permalinkHost}/c/${storyType.canonical}/${category.canonicalName}`);
			break;
		default:
			blockTitle = storyType.title;
			blockLink = `${permalinkHost}/c/${storyType.canonical}`;
	}

	return disableLink ? (
		<NoLinkLabel unbranded={block.unbranded}>
			{blockTitle}
		</NoLinkLabel>
	) : (
		<StyledLabel unbranded={block.unbranded}>
			<LabelLink href={blockLink} events={events}>
				{blockTitle}
			</LabelLink>
		</StyledLabel>);
}