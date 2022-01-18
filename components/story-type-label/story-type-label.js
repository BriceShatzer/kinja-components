/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { EnsureDefaultTheme } from '../theme';
import media from '../../style-utils/media';

export type LabelProps = {
	featured?: boolean,
	outlined?: boolean,
	tall?: boolean,
	large?: boolean,
	dark?: boolean
};

export const Label: React.ComponentType<LabelProps> = styled.span`
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-size: ${props => props.large ? 15 : 14}px;
	font-weight: bold;
	text-transform: uppercase;
	color: ${props => (props.featured ? props.theme.color.white : props.theme.color.primary)};
	cursor: pointer;

	:hover {
		color: ${props => darken(0.1, props.theme.color.primary)};
		text-decoration: none;

		${props => props.featured && css`
			background-color: ${props.theme.color.white};
			color: ${props.theme.color.black};
		`}
	}

	${props => props.outlined && css`
		display: flex;
		border: 1px solid ${props => props.featured ? props.theme.color.white : props.theme.color.primary};
		font-weight: normal;
		margin-right: 8px;
		padding: 5px 8px 3px;
		font-size: ${props => props.tall ? '15px' : '14px'};
		line-height: ${props => props.tall ? '20px' : '16px'};
	`}

	${props => props.dark && css`
		${media.largeUp`
			display: flex;
			padding: 0px 9px;
			border: none;
			background-color: ${props => props.theme.color.blackOverlay};
			color: ${props => props.theme.color.white};

			&:hover {
				color: ${props => props.theme.color.white};
				text-decoration: underline;
			}
		`}
	`}
`;

function StoryTypeLabel(props: LabelProps & { tag: string }) {
	const { tag, featured, outlined, tall, large, dark } = props;
	return (
		<EnsureDefaultTheme>
			<Label
				key={tag}
				featured={featured}
				outlined={outlined}
				tall={tall}
				large={large}
				dark={dark}
			>
				{tag}
			</Label>
		</EnsureDefaultTheme>
	);
}

export default StoryTypeLabel;
