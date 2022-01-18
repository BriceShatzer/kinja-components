// @flow

import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import media from '../../style-utils/media';
import type Blog from 'kinja-magma/models/Blog';
import type RenderableSection from 'kinja-magma/models/RenderableSection';
import type { AnalyticsInjectedProps } from '../hoc/analytics';
import type { PageType } from 'kinja-magma/models/PageType';
import { gridValue } from '../grid-utils';

type Props = {
	pageType: PageType,
	sections: Array<RenderableSection>,
	isInline?: boolean,
	domain?: string,
	language: string,
	parentBlog?: ?Blog,
	isScrollback?: boolean,
	curatedHomepage: boolean,
	parentHasCuratedHomepage: boolean
} & AnalyticsInjectedProps;

type State = {};

export const SectionItem = styled.a`
	display: flex;
	height: 100%;
	align-items: center;
	text-transform: uppercase;
	padding: 0 6px;
	transition: color 300ms;
	white-space: nowrap;
	margin-right: 8px;

	span {
		color: ${props => props.theme.color.black};
		font-size: 14px;
		font-weight: bold;
		height: 21px;
		line-height: 22px;
		letter-spacing: 1.27px;
	}

	&:hover,
	&:active {
		text-decoration: none;
		span {
			color: ${props => props.theme.color.primary};
		}
	}

	&.section-nav__search-btn {
		border-right: 0;
	}

	&:first-child {
		${props => !props.active && css`
			padding-left: 0;
		`}
	}

	${media.xlargeDown`
		border: none;
		line-height: 21px;
		white-space: nowrap;

		${props => props.isInline && !props.active && css`
			display: none;
		`}
	`}

	${media.mediumDown`
		&:first-child {
			margin-left: ${gridValue.small('1g')};
		}

		&:last-child {
			margin-right: ${gridValue.small('1g')};
		}

		${props => props.isInline && props.active && css`
			&& {
				padding: 0;
				margin: 0;
			}
		`}
	`}

	${props => props.active && css`
		background: ${props => props.theme.color.primary};

		span {
			color: ${props => props.theme.color.white};
		}

		&:hover {
			span {
				color: ${props => props.theme.color.white};
			}
		}

		${props => props.isInline && css`
			background: ${props => props.theme.color.white};
			span {
				height: 21px;
				line-height: 22px;
				padding: 0 6px 0 8px;
				background-color: ${props => props.theme.color.primary};
			}
		`}
	`}

	${props => props.isInline && css`
		border: 0;
		padding-left: 7.5px;
		padding-right: 7.5px;
		font-size: 17px;
		white-space: nowrap;
	`}
`;

export const SectionsWrapper = styled.nav`
	position: relative;
	overflow: hidden;
	height: 22px;
	margin-bottom: 24px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex: 1;
	-ms-overflow-style: none;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}

	${media.largeDown`
		margin-bottom: 16px;
	`}

	/* Truncate nav */
	${media.largeUp`
		flex-wrap: wrap;

		${props => !props.isInline && css`
			max-width: 820px;
		`}
	`}

	${media.largeDown`
		overflow: scroll;
		overflow-y: hidden;
		-webkit-overflow-scrolling: touch;

		${SectionItem}:not(:last-child) {
			margin-right: 4px;
		}
	`}

	${media.mediumOnly`
		margin: 0 0 16px;
	`}

	${media.smallOnly`
		margin: 0 0 14px;
	`}

	${props => props.isInline && css`
		height: 100%;
		border: 0;
		margin: 0;
		padding-left: 24px;

		${media.largeDown`
			padding-left: 16px;
		`}

		ul {
			margin: 0;
		}
	`}

	${props => props.isScrollback && css`
		${SectionItem} {
			margin-right: 4px;
		}
	`}
`;

const Pipe = styled.div`
	height: 30px;
	width: 1px;
	background-color: ${props => props.theme.color.midgray};
	align-self: center;
	flex-shrink: 0;
	flex-grow: 0;
	margin-right: 16px;

	${media.xlargeDown`
		${props => !props.hasActiveItem && css`
			display: none;
		`};
	`}
`;

export class SectionNav extends Component<Props, State> {
	static defaultProps = {
		sections: [],
		language: 'en-US'
	};

	render() {
		const {
			sections,
			isInline,
			domain,
			ga,
			parentBlog,
			pageType,
			isScrollback,
			curatedHomepage,
			parentHasCuratedHomepage
		} = this.props;
		const latestdomain = parentBlog ? parentBlog.canonicalHost : domain;
		const isLatestPageActive = (!parentBlog && pageType === 'frontpage');
		const isHomepageActive = pageType === 'curatedHomepage';

		if (sections.length === 0) {
			return null;
		}

		const eventAction = isScrollback ? 'Vertical/Tag click - scroll back' : 'Vertical/Tag click';
		const hasActiveSection = sections.find(section => section.active);
		const hasActiveItem = isLatestPageActive || hasActiveSection;

		const home = (
			<SectionItem
				isInline={isInline}
				active={isHomepageActive}
				key={'home'}
				data-key={'home'}
				href={latestdomain ? `//${latestdomain}/` : '/'}
				onClick={() => ga(
					'Sub navigation',
					eventAction,
					'home'
				)}
			>
				<span>Home</span>
			</SectionItem>
		);

		const latestLink = (() => {
			if (latestdomain) {
				if (curatedHomepage || parentHasCuratedHomepage) {
					return `//${latestdomain}/latest`;
				}
				return `//${latestdomain}/`;
			}
			return '/';

		})();

		const latest = (
			<SectionItem
				isInline={isInline}
				active={isLatestPageActive}
				key={'latest'}
				data-key={'latest'}
				href={latestLink}
				onClick={() => ga(
					'Sub navigation',
					eventAction,
					'latest'
				)}
			>
				<span>Latest</span>
			</SectionItem>
		);

		return (
			<EnsureDefaultTheme>
				<SectionsWrapper isInline={isInline} isScrollback={isScrollback}>
					{isScrollback ? <Pipe hasActiveItem={hasActiveItem}/> : null}
					{curatedHomepage || parentHasCuratedHomepage ? home : null}
					{latest}
					{sections.map(section => {
						if (section.subBlog) {
							return (
								<SectionItem
									isInline={isInline}
									active={section.active}
									key={section.index}
									data-blogid={section.subBlog.id}
									data-index={section.index}
									href={`https://${section.subBlog.canonicalHost}`}
									onClick={() => ga(
										'Sub navigation',
										eventAction,
										section.subBlog ? section.subBlog.name : ''
									)}
								>
									<span>{section.subBlog.displayName}</span>
								</SectionItem>
							);
						} else if (section.tag) {
							return (
								<SectionItem
									isInline={isInline}
									active={section.active}
									key={section.index}
									data-tagcanonical={section.tag.canonical}
									data-index={section.index}
									href={`/tag/${section.tag.canonical}`}
									onClick={() => ga(
										'Sub navigation',
										eventAction,
										`/tag/${section.tag ? section.tag.canonical : ''}`
									)}
								>
									<span>{section.displayNameCalculated}</span>
								</SectionItem>
							);
						} else if (section.storyType) {
							return (
								<SectionItem
									isInline={isInline}
									active={section.active}
									key={section.index}
									data-tagcanonical={section.storyType.canonical}
									data-index={section.index}
									href={`/c/${section.storyType.canonical}`}
									onClick={() => ga(
										'Sub navigation',
										eventAction,
										`/c/${section.storyType ? section.storyType.canonical : ''}`
									)}
								>
									<span>{section.displayNameCalculated}</span>
								</SectionItem>
							);
						} else if (section.featuredUrl) {
							return (
								<SectionItem
									isInline={isInline}
									active={section.active}
									key={section.index}
									data-index={section.index}
									href={section.featuredUrl.url}
									onClick={() => ga(
										'Sub navigation',
										eventAction,
										section.featuredUrl ? section.featuredUrl.url : ''
									)}
								>
									<span>{section.displayNameCalculated}</span>
								</SectionItem>
							);
						} else if (section.featuredSpecialSection && section.featuredSpecialSection.blog) {
							return (
								<SectionItem
									isInline={isInline}
									active={section.active}
									key={section.index}
									data-index={section.index}
									href={section.url}
									onClick={() => ga(
										'Sub navigation',
										eventAction,
										section.url
									)}
								>
									<span>{section.displayNameCalculated}</span>
								</SectionItem>
							);
						}
					})}
				</SectionsWrapper>
			</EnsureDefaultTheme>
		);
	}
}

export default SectionNav;
