// @flow

import * as React from 'react';
import cx from 'classnames';
import styled, { css } from 'styled-components';
import InlineNode from '../inline-node';
import { EnsureDefaultTheme } from '../../theme';

import type { HeaderOptions, HeaderIcon } from 'postbody/blockNodes/Header';

import DealsBeauty from 'kinja-components/components/icon19/DealsBeauty';
import DealsGaming from 'kinja-components/components/icon19/DealsGaming';
import DealsHome from 'kinja-components/components/icon19/DealsHome';
import DealsLifestyle from 'kinja-components/components/icon19/DealsLifestyle';
import DealsMultimedia from 'kinja-components/components/icon19/DealsMultimedia';
import DealsTech from 'kinja-components/components/icon19/DealsTech';
import DealsTop from 'kinja-components/components/icon19/DealsTop';

const SUPPORTED_LEVELS = [2, 3, 4];

const iconPropToComponent = (icon: ?HeaderIcon) => {
	switch (icon) {
		case 'Beauty': return DealsBeauty;
		case 'Gaming': return DealsGaming;
		case 'Home': return DealsHome;
		case 'Lifestyle': return DealsLifestyle;
		case 'Multimedia': return DealsMultimedia;
		case 'Tech': return DealsTech;
		case 'Top': return DealsTop;
	}
	return null;
};

const IconContainer = styled.span`
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	min-width: 69px;
	height: 69px;
	margin-right: 11px;
`;

export const HeadingWrapper = styled.h1`
	font-family: ${props => props.theme.typography.headline.fontFamily};
	text-align: ${props => props.textAlign};

	${props => props.hasIcon && css`
		display: flex;
		align-items: center;
		max-width: 100%;
		text-transform: uppercase;
		font-family: ${props => props.theme.typography.tertiary.fontFamily};
		font-weight: 300;
		font-size: 28px;

		&::after {
			content: '';
			height: 8px;
			max-width: 100%;
			margin-left: 18px;
			align-self: center;
			border: 1px solid ${props => props.theme.color.lightgray};
			border-left: 0;
			border-right: 0;
			flex: 1 1 auto;
		}
	`}
`;

let idIterator = 0;

export default function Heading(props: HeaderOptions) {
	const { value, icon, level, alignment, anchorTag } = props;
	const HeaderElement = level && SUPPORTED_LEVELS.indexOf(level) > -1 ? `h${level}` : 'h4';
	const SvgIcon = iconPropToComponent(icon);
	const hasIcon = Boolean(SvgIcon);
	const commerceIconVariantClass = icon && `js_commerce-header js_commerce-icon--${icon.toLowerCase()}`;
	const uniqueId = `h${idIterator++}`;

	return (
		<EnsureDefaultTheme>
			<HeadingWrapper as={HeaderElement}
				className={commerceIconVariantClass}
				hasIcon={hasIcon}
				textAlign={alignment ? alignment.toLowerCase() : 'left'}
				id={uniqueId}>
				<a className={cx('js_header-anchor', {'anchor-tag': anchorTag})} id={anchorTag}></a>
				{hasIcon && SvgIcon && <IconContainer><SvgIcon aria-labelledby={uniqueId} /></IconContainer>}
				{hasIcon ? <span id={uniqueId}><InlineNode nodes={value} /></span> : <InlineNode nodes={value} />}
			</HeadingWrapper>
		</EnsureDefaultTheme>
	);
}
