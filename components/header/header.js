// @flow

import * as React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import cx from 'classnames';

import type Blog from 'kinja-magma/models/Blog';
import type RenderableSection from 'kinja-magma/models/RenderableSection';
import HeaderLogo, { LogoLink } from './header-logo';
import SectionNav, { SectionsWrapper } from './section-nav';
import ScrollListener from './scroll-listener';
import Analytics from '../hoc/analytics';
import type { PageType } from 'kinja-magma/models/PageType';
import type CategoryStreamItem from 'kinja-magma/models/CategoryStreamItem';
import type { AnalyticsInjectedProps } from '../hoc/analytics';
import media from '../../style-utils/media';
import Mail from '../icon19/Mail';
import Cart from '../icon19/Cart';
import Hamburger24 from '../icon19/Hamburger24';
import Close24 from '../icon19/Close24';
import Search24 from '../icon19/Search24';
import { IconCircle } from '../icon19/icon19';
import { EnsureDefaultTheme } from '../theme';
import translations from './translations';
import createTranslate from '../translator';
import UserButton, { UserButtonContainer, UserMenuForVersion2 } from '../user-button/UserButton';
import type User from 'kinja-magma/models/User';
import ImpactNav from '../impact-nav';
import {
	SubtitleClickEvent
} from './analytics';
import Toggle, { type ToggleInjectedProps } from '../hoc/toggle';
import { gridValue } from '../grid-utils';
import { ImpactNavContainer } from '../impact-nav/impact-nav';
import ToggleContext from './toggle-context';
import type { ToggleContextInjectedProps } from './toggle-context';
import TopBarContainer from 'kinja-components/components/page-layout/topbar-container';
import CustomHeader from 'kinja-components/components/custom-header/custom-header';
import {
	type CustomHeaderProps,
	generateBaseCustomHeaderRenderProps
} from 'kinja-magma/models/CustomHeader';
import { StaticTopbar } from 'kinja-components/components/page-layout';
import ExperimentsTool from './experiments-tool/experiments-tool';
import type { CustomFeature } from 'kinja-magma/utils/getCustomFeatures';
import MobileTagline from './mobile-tagline';
import HamburgerMenu from './hamburger-menu';
import { storeUrls } from 'kinja-components/components/footer/constants';

import { type AmpHamburgerMenuProps } from 'kinja-components/components/header/amp-hamburger-menu';

type Props = {
	pageType: PageType,
	title?: string,
	subTitle?: string,
	subTitleUrl?: string,
	blog?: Blog,
	parentBlog?: ?Blog,
	sections: Array<RenderableSection>,
	shouldShowVideo?: boolean,
	showNewsletterSignup: boolean,
	features: { [string]: boolean },
	currentUser: ?User,
	logout: () => void,
	onLoginRequired: () => void,
	notificationCount?: number,
	impactNav?: boolean,
	blogSelector?: React.Node,
	postId?: string,
	userBlogs: Array<Blog>,
	customDescription?: ?string,
	customHeaderProps?: CustomHeaderProps,
	manualFeatures?: Array<CustomFeature>,
	showImpactNavTitle?: boolean,
	onEditHomepageClick?: () => void,
	disabled?: boolean,
	AmpHamburgerMenu?: React.ComponentType<AmpHamburgerMenuProps>,
	hasCuration?: boolean,
	showStoreButton?: boolean
} & AnalyticsInjectedProps;

type HeaderProps = {
	isInline: boolean,
	subTitle: string,
	hasSecondaryHeader: boolean,
	toggleWithContext: boolean => void,
	hideHamburger: boolean,
	customDescription?: ?string,
	customHeaderProps?: CustomHeaderProps,
	storyType?: CategoryStreamItem
} & ToggleInjectedProps & ToggleContextInjectedProps & Props;

const NoScrollBodyStyle = createGlobalStyle`
	body.noscroll {
		overflow: hidden;
		position: relative;
	}
`;

export const LogoStrip = styled.div`
	position: relative;
	display: flex;
	height: 84px;
	justify-content: space-between;

	${media.mediumDown`
		padding: 0 ${gridValue.small('1g')};
		height: 52px;
	`}

	${media.largeOnly`
		height: 64px;
	`}

	${props => props.showScrollback && css`
		height: ${props => props.theme.scrollbackNavHeight};
		margin: 0 auto;

		${media.smallOnly`
			height: 54px;
		`}

		${media.mediumDown`
			width: ${gridValue.small('6c')};
			padding: 0;
		`}

		${media.largeDown`
			nav{
				a {
					padding: 0 16px;
					overflow: hidden;

					span {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		`}

		${media.largeOnly`
			width: ${gridValue.large('8c')};
		`}

		${media.xlargeOnly`
			width: ${gridValue.xlarge('12c')};
		`}

		${media.xxlargeUp`
			width: ${gridValue.xxlarge('12c')};
		`}
	`}
`;

export const HeaderIcon = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;

	&& {
		color: ${props => props.theme.color.darksmoke};
	}
`;

const MenuIcon = styled(HeaderIcon)`
	.icon-close {
		display: none;
	}
	&.open {
		.icon-close {
			display: flex;
		}

		.icon-hamburger {
			display: none;
		}
	}
`;

const HeaderIconWithSeparator = styled(HeaderIcon)`
	display: none;

	${media.xlargeUp`
		&.show {
			display: flex;
		}
		width: auto;
		&:first-of-type {
			margin: 0 8px 0 16px;
		}
		&:not(:first-of-type) {
			margin: 0 8px;
		}
	`}

	&& {
		color: ${props => props.theme.color.bodytext};
	}

	&::after {
		content: '';
		width: 1px;
		height: 30px;
		margin-left: 16px;
		background-color: ${props => props.theme.color.midgray};
	}

	&:hover {
		color: ${props => props.theme.color.primary};
		text-decoration: none;
	}
`;

const SearchWrapper = styled(HeaderIcon)`
	display: none;
	margin-right: 8px;

	&& {
		color: ${props => props.theme.color.black};
	}

	&:hover {
		color: ${props => props.theme.color.primary};
	}

	${media.largeUp`
		display: flex;
	`}
`;

const ExperimentsIconWrapper = styled(HeaderIconWithSeparator)`
	display: flex;
	margin-right: 8px;
	width: auto;

	&:hover {
		text-decoration: none;
	}
`;

const ImpactIconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	${SearchWrapper} {
		color: ${props => props.theme.color.white};

		&:hover {
			color: ${props => props.theme.color.lightgray};
		}
	}

	${MenuIcon} {
		color: ${props => props.theme.color.white};
	}
`;

// TODO: if padding needed to match curation: padding: 0 ${props => props.theme.columnPadding};
export const CoreNav = styled.div`
	height: auto;
	margin: auto;

	${media.mediumDown`
		width: ${gridValue.small('6c2g')};
	`}

	${media.largeOnly`
		width: ${gridValue.large('8c')};
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('12c')};
	`}

	${props => props.wideRail ? css`
		${media.xxlargeOnly`
			width: ${gridValue.xxlarge('12c')};
		`}
		${media.xxxlargeUp`
			width: ${gridValue.xxxlarge('12c')};
		`}
	` : css`
		${media.xxlargeUp`
			width: ${gridValue.xxlarge('12c')};
		`}
	`}
`;

export const GlobalNav = styled.div`
	background: rgba(255, 255, 255, 0.99);
	top: 0;
	margin-bottom: 0;
	position: relative;
	width: 100%;
	border-top: 4px solid ${props => props.theme.color.primary};
	border-bottom: 1px solid ${props => props.theme.color.lightgray};
	${props => props.isScrollback && css`
		position: fixed;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
		transform: translateY(-84px);
		transition: transform 0;
		z-index: 500;
	`}
	${props => props.showScrollback && css`
		transform: translateY(0);
		transition: transform 400ms cubic-bezier(0.215, 0.61, 0.355, 1);
	`}

	&&&&& {
		padding: 0; /* Overwriting global css */
	}

	/* hide the scrollback behind the user menu, since it should behave like a modal */
	${props => props.isScrollback && media.mediumDown`
		z-index: 95;
	`}

	&.open {
		${media.mediumUp`
			border-bottom: none;
		`}
	}
`;

const Container = styled.div`
	position: relative;

	${props => props.impactNav && 'margin-top: 42px;'}

	&.open {
		margin-top: 0;
		position: fixed;
		height: 100vh;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		left: 0;
		right: 0;
		z-index: 100;
		background: ${props => props.theme.color.white};
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;

		${SectionsWrapper} {
			display: none;
		}

		.header-bar {
			display: none;
		}

		${ImpactNavContainer} {
			position: relative;
			top: 0;
		}

		${MobileTagline} {
			${media.largeDown`
				display: block;
			`}
		}
	}
`;
const CustomHeaderSecondaryContainer = styled.div``;

const BlogSelectorWrapper = styled.div`
	max-width: 450px;
	min-width: 176px;
`;

const BlogSelectorTitle = styled.h3`
	margin-bottom: 0;
	margin-right: 0.5rem;

	${media.smallOnly`
		display: none;
	`}
`;

export const HeaderLogoWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 100%;

	${props => !props.isScrollback && css`
		flex: auto;
		min-width: 0;
		margin-right: 16px;

		${media.mediumDown`
			margin-right: 6px;
		`}
	`}

	${props => !props.blogSelector && media.mediumDown`
		overflow: hidden;
	`}

	${LogoLink} {
		flex-grow: 0;
		flex-shrink: 0;

		${media.mediumDown`
			width: 100%;
		`}
	}

	${props => props.blogSelector && css`
		${LogoLink} {
			display: none;
		}
	`}
`;

const HeaderTagLine = styled.div`
	line-height: 31px;
	max-height: 30px;
	padding-left: 16px;
	margin-left: 16px;
	border-left: 1px solid ${props => props.theme.color.midgray};
	color: ${props => props.theme.color.darkgray};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-family: ${props => props.theme.typography.headline.fontFamily};
	${props => props.theme.blog === 'theonion' && css`
		font-style: italic;
	`}

	${media.mediumDown`
		 display:none;
	`}
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	${props => props.isScrollback && media.largeDown`
		${SearchWrapper} {
			display: none;
		}
	`}

	${props => props.isScrollback && media.mediumDown`
		${UserButtonContainer} {
			display: none;
		}

	`}
	${props => props.isScrollback && `
		${UserMenuForVersion2} {
			max-height: calc(100vh - 60px);
			overflow-y: hidden;
		}
		ul {
			&.user-links {
				max-height: calc(70vh - 35px);
			}
			&.myblogs {
				max-height: calc(25vh - 35px);
			}
		}

	`}
`;

const DisableOverlay = styled.div`
	display: none;
	position: absolute;
	top: -24px;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(255, 255, 255, 0.6);

	&.show {
		display: block;
	}
`;

const ScrollbackContainer = styled.div`
	display: none;

	&.show {
		display: block;
	}

	&.show.disabled {
		display: none;
	}
`;

const pagesWithSubtitle = [
	'tag',
	'categoryStream',
	'sectionedCategoryStream'
];

const HeaderContainer = ({
	blog,
	title,
	subTitle,
	subTitleUrl,
	isInline,
	ga,
	pageType,
	shouldShowVideo,
	sections,
	parentBlog,
	showNewsletterSignup,
	features,
	currentUser,
	logout,
	onLoginRequired,
	notificationCount,
	impactNav,
	hasSecondaryHeader,
	blogSelector,
	postId,
	toggleWithContext,
	isOpen,
	toggleIsScrollback,
	userBlogs,
	customDescription,
	customHeaderProps,
	hideHamburger,
	manualFeatures,
	showImpactNavTitle,
	onEditHomepageClick,
	disabled,
	AmpHamburgerMenu,
	storyType,
	hasCuration,
	showStoreButton
}: HeaderProps) => {
	const storeUrl = blog ? storeUrls[blog.blogGroup] : null;
	const translate = createTranslate(translations, blog && blog.locale);
	const enableStore = features.shop_button;

	const hasCustomHeaderContent = customHeaderProps &&
				customHeaderProps.customHeaderRenderProps &&
				customHeaderProps.customHeaderRenderProps.content &&
				Object.keys(customHeaderProps.customHeaderRenderProps.content).length > 0;

	const headerProps = ((): ?CustomHeaderProps  => {
		if (hasCustomHeaderContent) {
			return customHeaderProps;
		} else if (blog && blog.id) {
			return generateBaseCustomHeaderRenderProps(blog.id, subTitle, customDescription);
		}
		return null;
	})();

	if (isOpen && typeof document !== 'undefined' && document.body) {
		document.body.classList.add('noscroll');
	} else if (typeof document !== 'undefined' && document.body) {
		document.body.classList.remove('noscroll');
	}

	const shouldDisplayPodcastPlayer = storyType && storyType.canonical === 'the-topical';
	const showHeaderBar = hasSecondaryHeader && headerProps;
	const HeaderBar = showHeaderBar ? (
		<CustomHeaderSecondaryContainer className='js_custom-header-editor-container'>
			<CustomHeader
				titleEvent={SubtitleClickEvent}
				titleUrl={subTitleUrl}
				showPodcastPlayer={shouldDisplayPodcastPlayer}
				hasCuration={hasCuration}
				{...headerProps}
			/>
		</CustomHeaderSecondaryContainer>
	) : null;


	type ScrlbckProp = {
		isScrollback?: boolean
	};

	const manualFeaturesWithoutABTest = manualFeatures ? manualFeatures.filter(fs => fs.source === 'USER') : undefined;
	// Show AB test and manual feature switch overrides for edit and superusers,
	// manual feature switch overrides only to other users
	const manualFeaturesToShow = currentUser && (currentUser.isEditStaff || currentUser.isSuperuser) ?
		manualFeatures :
		manualFeaturesWithoutABTest;

	const showExperimentsButton = manualFeaturesToShow && manualFeaturesToShow.length;

	const ExperimentsButton = () => showExperimentsButton ? (
		<ExperimentsIconWrapper>
			<ExperimentsTool
				features={manualFeaturesToShow}
				isSuperuser={currentUser ? currentUser.isSuperuser : false}
			/>
		</ExperimentsIconWrapper>
	) : null;

	const SearchButton = (props: ScrlbckProp) => (
		<SearchWrapper onClick={() => {
			ga('Sub navigation', `Search click${props.isScrollback ? ' - scroll back' : ''}`, pageType);
		}} href="/search">
			<Search24 />
		</SearchWrapper>
	);

	const NewsletterButton = () => (
		<HeaderIconWithSeparator
			href="/newsletter"
			target="_blank"
			data-ga={'[["Sub navigation", "Subscribe button click"]]'}
			className={cx('js_header-newsletter', {
				show: showNewsletterSignup
			})}
		>
			<IconCircle icon={Mail} />
			{translate('Subscribe')}
		</HeaderIconWithSeparator>
	);

	const ShopButton = () => (
		<HeaderIconWithSeparator
			href={storeUrl}
			target="_blank"
			data-ga={'[["Sub navigation", "Shop button click"]]'}
			className={cx('js_header-shop', {
				show: showStoreButton && storeUrl
			})}
		>
			<IconCircle icon={Cart} />
			Shop
		</HeaderIconWithSeparator>
	);

	const UserButtonElement = (props: ScrlbckProp) => (
		<div className="js_user-button">
			<UserButton
				currentBlog={blog}
				currentUser={currentUser}
				features={features}
				postId={postId}
				pageType={pageType}
				logout={logout}
				onClick={onLoginRequired}
				notificationCount={notificationCount}
				isScrollback={props.isScrollback}
				userBlogs={userBlogs}
				onEditHomepageClick={onEditHomepageClick}
			/>
		</div>
	);

	// TODO fix ga event
	const MenuButton = (props: ScrlbckProp) => hideHamburger ? null : (
		<MenuIcon className={cx('js_mobile-header-link', {open: isOpen})} onClick={() => {
			!isOpen && ga('Network navigation', `Navigation Menu Click${props.isScrollback ? ' - scroll back' : ''}`, pageType);
			toggleWithContext(props.isScrollback);
		}}>
			<Close24 className="icon-close"/>
			<Hamburger24 className="icon-hamburger"/>
		</MenuIcon>
	);

	if (impactNav) {
		return (
			<Container className={cx('js_header-container', {open: isOpen})} isOpen={isOpen} impactNav>
				<NoScrollBodyStyle />
				<ImpactNav
					hide={false}
					blogName={blog ? blog.name : 'Special Section'}
					href={blog ? `//${blog.canonicalHost}` : null}
					showImpactNavTitle={showImpactNavTitle}
					title={title}
				>
					<ImpactIconContainer>
						{blog && <SearchButton/>}
						<UserButtonElement/>
						<MenuButton />
					</ImpactIconContainer>
				</ImpactNav>
				<div className="js_hamburger-menu-container">
					{isOpen && (
						<HamburgerMenu
							blog={blog}
							sections={sections}
							enableStore={enableStore}
							toggleIsScrollback={toggleIsScrollback}
							impactNav
						/>
					)}
				</div>
			</Container>
		);
	}

	const tagline = ((): ?string => {
		if (parentBlog) {
			return parentBlog.description;
		}
		if (blog) {
			return blog.description;
		}
		return null;
	})();

	return (
		<ScrollListener>
			{({childrenRef, secondaryRef, showScrollback}) =>
				<Container ref={childrenRef} isOpen={isOpen} className={cx('js_header-container', {open: isOpen})}>
					<NoScrollBodyStyle />
					{/* Standard Header */}
					{isOpen && !toggleIsScrollback && (
						<TopBarContainer className="js_topbar">
							<StaticTopbar
								blogName={blog && blog.name}
								wideRail={features.wide_rail}
							/>
						</TopBarContainer>
					)}
					<GlobalNav isOpen={isOpen} className={cx('js_global-nav', {open: isOpen})}>
						<CoreNav wideRail={features.wide_rail}>
							<LogoStrip isInline={isInline}>
								<HeaderLogoWrapper blogSelector={blogSelector}>
									<React.Fragment>
										<HeaderLogo
											blog={parentBlog ? parentBlog : blog}
											title={title}
											subTitle={subTitle}
											ga={ga}
											isScrollback={false}
										/>
										{tagline && <HeaderTagLine>{tagline}</HeaderTagLine>}
										{blogSelector && <><BlogSelectorTitle>Manage</BlogSelectorTitle><BlogSelectorWrapper>
											{blogSelector}
										</BlogSelectorWrapper></>}
									</React.Fragment>
								</HeaderLogoWrapper>
								{!AmpHamburgerMenu &&
									<IconContainer isScrollback={false}>
										{blog && <SearchButton isScrollback={false}/>}
										<ExperimentsButton />
										<ShopButton/>
										<NewsletterButton/>
										<UserButtonElement isScrollback={false}/>
										<MenuButton isScrollback={false}/>
									</IconContainer>
								}
								{AmpHamburgerMenu &&
									<AmpHamburgerMenu
										sections={sections}
										blog={blog}
										enableStore={enableStore}
										tagline={tagline}
									/>
								}
							</LogoStrip>
							<SectionNav
								pageType={pageType}
								sections={sections}
								parentBlog={parentBlog}
								domain={blog && blog.canonicalHost}
								ga={ga}
								shouldShowVideo={shouldShowVideo}
								isScrollback={false}
								curatedHomepage={features.curated_homepage}
								parentHasCuratedHomepage={features.parent_has_curated_homepage}
							/>
							<MobileTagline>{tagline}</MobileTagline>
						</CoreNav>
						<div className="header-bar">
							{HeaderBar && React.cloneElement(HeaderBar, { ref: secondaryRef}) }
						</div>
					</GlobalNav>

					<DisableOverlay className={cx('js_header-disable-overlay', {show: disabled})} />

					<div className="js_hamburger-menu-container">
						{isOpen && (
							<HamburgerMenu
								blog={blog}
								sections={sections}
								enableStore={enableStore}
								toggleIsScrollback={toggleIsScrollback}
							/>
						)}
					</div>
					{/* Scrollback Nav */}
					<ScrollbackContainer className={cx('js_scrollback-nav', {show: showScrollback && !disabled})}>
						<GlobalNav
							showScrollback
							isScrollback
						>
							<LogoStrip isInline showScrollback>
								<HeaderLogoWrapper isScrollback>
									<HeaderLogo
										blog={parentBlog ? parentBlog : blog}
										title={title}
										subTitle={subTitle}
										isScrollback={true}
										ga={ga}
									/>
								</HeaderLogoWrapper>
								<SectionNav
									pageType={pageType}
									sections={sections}
									parentBlog={parentBlog}
									ga={ga}
									domain={blog && blog.canonicalHost}
									shouldShowVideo={shouldShowVideo}
									isInline
									isScrollback={true}
									curatedHomepage={features.curated_homepage}
									parentHasCuratedHomepage={features.parent_has_curated_homepage}
								/>
								<IconContainer isScrollback={true}>
									{blog && <SearchButton isScrollback={true}/>}
									<UserButtonElement isScrollback={true}/>
									<MenuButton isScrollback={true}/>
								</IconContainer>
							</LogoStrip>
						</GlobalNav>
					</ScrollbackContainer>

				</Container>}
		</ScrollListener>
	);
};

const HeaderContainerWithToggle = Toggle(ToggleContext(HeaderContainer), { isOutsideClickEnabled: false });

export const Header = (props: Props) => {
	const { pageType, blog, parentBlog, postId, AmpHamburgerMenu } = props;

	const isVerticalWithLogo = Boolean(blog && blog.logo && parentBlog);
	const isInline = !((pageType === 'frontpage' || pageType === 'curatedHomepage') && blog && !parentBlog);
	const subTitle = pageType === 'videopage' ? 'Video' : props.subTitle;
	const hasSecondaryHeader = pageType !== 'permalink' && (isVerticalWithLogo || pagesWithSubtitle.includes(pageType));
	const hideHamburger = pageType === 'splash';

	const headerProps = {
		...props,
		postId,
		isInline,
		subTitle,
		hasSecondaryHeader,
		hideHamburger,
		AmpHamburgerMenu
	};

	/**
	 * TODO: update comments below
	 * Server side: renders both headers in their designated wrappers that are only visible when needed
	 * Client side: only the mobile header is being hydrated into its wrapper
	 */
	// TODO: add sponsorship
	return (
		<EnsureDefaultTheme>
			<div className="js_header">
				<HeaderContainerWithToggle {...headerProps} ga={props.ga} />
			</div>
		</EnsureDefaultTheme>
	);
};

export default Analytics(Header);
