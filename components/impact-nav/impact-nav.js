/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import cx from 'classnames';

import BlogLogo, { blogLogos } from '../blog-logo/blog-logo';
import { EnsureDefaultTheme } from '../theme';
import HideOnScroll from '../hoc/hide-on-scroll';
import media from '../../style-utils/media';
type Props = {
	blogName: string,
	href?: ?string,
	children?: React.Node,
	title?: string,
	showImpactNavTitle?: boolean
};

export const ImpactNavContainer = styled.div`
	align-items: center;
	background: black;
	display: flex;
	height: 42px;
	left: 0;
	position: fixed;
	transition: top 0.2s ease-in-out;
	top: 0;
	width: 100%;
	z-index: 99;
	justify-content: flex-end;

	&.hide {
		top: -42px;
	}

	${props => props.hasBlogLogo && css`
		justify-content: space-between;
	`};
`;

const ImpactLogoContainer = styled.div`
	color: white;
	z-index: 1;
	font-weight: 700;
	text-transform: uppercase;
	margin-left: 10px;

	> a {
		color: white;
	}

	${media.mediumDown`
		text-align: left;
	`}

	${props => props.showTitle && css`
		${media.mediumOnly`
			display: none;
		`}
	`}
`;

const LogoLink = styled.a`
	text-decoration: none;
	cursor: pointer;
`;

const TitleContainer = styled.h4`
	color: ${props => props.theme.color.white};
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-size: 24px;
	line-height: 30px;
	margin: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: 0 10px;
	flex: 1;
	text-align: left;

	${props => props.hasBlogLogo && css`
		position: absolute;
		width: 100%;
		padding: 0 175px;
		text-align: center;

		${media.mediumDown`
			position: static;
			text-align: left;
			padding: 0 10px;
		`}

		${media.smallOnly`
			display: none;
		`}
	`};
`;

// a static topbar with blogname and href
export default function ImpactNav(props: Props) {
	const { blogName, href, children, title, showImpactNavTitle } = props;
	const showTitle = showImpactNavTitle && title && title.length > 0;
	const MaybeLogoLink = ({ href, children }: {
		href: ?string,
		children: React.Node
	}) => (href && href.length ? <LogoLink href={href}>{children}</LogoLink> : children);
	const hasBlogLogo = blogLogos.hasOwnProperty(blogName);

	const LogoAndLinks = () => <React.Fragment>
		{hasBlogLogo && (
			<ImpactLogoContainer showTitle={showTitle}>
				<MaybeLogoLink href={href}>
					<BlogLogo monochrome name={blogName} scale={0.6} />
				</MaybeLogoLink>
			</ImpactLogoContainer>
		)}
		{showTitle && (
			<TitleContainer hasBlogLogo={hasBlogLogo}>
				{title}
			</TitleContainer>
		)}
		{children}
	</React.Fragment>;


	return (<HideOnScroll>
		{hide => (
			<EnsureDefaultTheme>
				<ImpactNavContainer className={cx('js_impact-nav',{hide})} hasBlogLogo={hasBlogLogo}>
					<LogoAndLinks />
				</ImpactNavContainer>
			</EnsureDefaultTheme>
		)}
	</HideOnScroll>);
}
