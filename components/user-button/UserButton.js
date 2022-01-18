/* @flow */
/* eslint jsx-a11y/no-static-element-interactions:0, no-confusing-arrow:0 */

import * as React from 'react';
import cx from 'classnames';

import Toggle from '../hoc/toggle';
import Analytics from '../hoc/analytics';
import createTranslate from '../translator';
import userButtonTranslations from './UserButtonTranslations';
import styled, { withTheme } from 'styled-components';
import imageUrl from 'kinja-images/imageUrl';
import media from '../../style-utils/media';
import { DEFAULT_AVATAR_PNG } from '../../config/consts';
import UserMenuLink, { type Props as UserMenuLinkProps } from './user-menu-link';
import User from 'kinja-magma/models/User';
import getUserLinks from './user-links';
import CloseIcon from 'kinja-components/components/icon19/Close';

import BlogAvatar from '../blog-avatar';
import UserFilledIcon from '../icon19/UserFilled';

import type Blog from 'kinja-magma/models/Blog';
import type { Locale } from 'kinja-magma/models/Locale';
import type { AnalyticsInjectedProps } from '../hoc/analytics';
import type { ToggleInjectedProps } from '../hoc/toggle';


type UserButtonProps = {
	currentBlog: Blog,
	currentUser: User,
	features: { [string]: boolean },
	logout?: () => void,
	notificationCount?: number,
	postId?: ?string,
	pageType: string,
	isScrollback?: boolean,
	userBlogs: Array<Blog>,
	onClick?: () => void,
	onEditHomepageClick: () => void,
	onClose?: () => void
};

const getAvatarURL = (currentUser: ?User) => {
	let url = DEFAULT_AVATAR_PNG;
	if (currentUser) {
		const { avatar } = currentUser;
		if (avatar.id) {
			// served from magma
			url = imageUrl(avatar.id, 'AvatarMediumAuto', avatar.format);
		}
	}
	return url;
};

const DisplayName = styled.li``;

export const UserMenuForVersion2 = styled.div`
	outline: 0;
	position: absolute;
	top: 100%;
	right: 0;
	background-color: ${props => props.theme.color.white};
	border-color: ${props => props.theme.color.midgray};
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	padding: 0;
	min-width: 250px;
	z-index: 850;

	/* 3 columns of a 8 column liquid grid, each separated by a gutter of 24px */
	${media.mediumUp`
		width: calc(${(100 / 8) * 3 + 'vw'} - ${24 * 2 + 'px'});
	`}

	/* 4 columns of a 12 column liquid grid, each separated by a gutter of 24px */
	${media.largeUp`
		width: calc(${(100 / 12) * 4 + 'vw'} - ${24 * 3 + 'px'});
	`}

	/* 4 columns of a 12 column fixed width grid, each separated by a gutter of 34px */
	${media.xlargeUp`
		width: calc(82.25em / 12 * 3 - ${34 * 3 + 'px'});
	`}

	${media.mediumDown`
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		border-style: none;
		box-shadow: unset;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		border-radius: 0;
	`}
`;

export const UserButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	position: relative;
	vertical-align: middle;

	& > a {
		outline: 0;
		line-height: 0;
		&.js_header-userbutton {
			color: ${props => props.theme.color.white};
		}
	}

	${media.mediumDown({position: 'unset'})}
`;

export const AvatarElement = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	position: relative;
	margin: 0;
	background-position: center;
	background-size: cover;
	background-color: ${props => props.theme.color.primary};

	svg {
		color: ${({ theme }) => theme.color.white};
	}

	${props => props.currentUser && `
		display: inline-block;
		background-image: url(${getAvatarURL(props.currentUser)});
	`}
	${props => props.currentUser && props.notificationCount > 0 && `
		&::before {
			content: '';
			position: absolute;
			right: -3px;
			background: ${props.theme.color.error};
			/* 1/3 of AvatarElement, halved for each axis */
			padding: calc((100%/3) / 2);
			display: block;
			border-radius: 50%;
		}
	`}
`;

const ULversion2 = styled.ul`
	margin-left: unset;
	overflow-y: scroll;
	margin-bottom: 8px;

	&:not(:last-child) {
		padding-bottom: 8px;
	}

	li {
		padding-left: 18px;
		padding-right: 18px;
	}

	${DisplayName} {
		margin-bottom: 8px;

		${media.mediumDown`
			border-top: 4px solid ${props => props.theme.color.primary};
			padding-right: 6px;
		`}

		& span:first-of-type {
			min-width: 30px;
			margin-right: 0.5em;
			margin-right: 10px;
		}

		& + li {
			/* prevents issue caused by dividing line when hovering over 2nd list item */
			position: relative;
			top: -1px;
		}
	}

	&.user-links {
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: ${props => props.theme.color.lightgray};

		&.no-blogs { border-bottom-width: 0; }

		${media.mediumDown`
			max-height: 70vh;
		`}
	}

	&.myblogs {
		-webkit-overflow-scrolling: touch;

		max-height: 270px; /* height of blog items * 5 = 54px * 5 = 270px */

		/*	Allow myblogs section to expand to 25% of the viewport if the height is available
			dropdown offset + display-name item + max-height of user-links + original max-height
			 (30px * 150%)  +         62px      +    (52px * 14 items)    +    270px
			      45px      +                  790px                      +    270px  		*/
		@media only screen and (min-height: 1106px) {
			${media.largeUp`
				max-height: 25vh;
			`}
		}

		/* prevents issue caused by dividing line when hovering over last usermenu list item */
		position: relative;
		top: -1px;

		img,
		svg {
			max-height: 20px;
			max-width: 20px;
		}

		${media.mediumDown`
			max-height: 30vh;
		`}
	}
`;



const UserButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 700;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: ${props => props.theme.color.lightgray};
	padding-top: 16px;
	padding-bottom: 12px;
	font-size: 1rem;

	${media.mediumDown`
		padding: 4px 0;
	`}

	& > div {
		display: flex;
		align-items: center;
		min-width: 0;
		& + div {
			cursor: pointer;
			${media.largeUp`display: none;`}
		}
	}

	span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

const CloseWrapper = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;

	&& {
		color: ${props => props.theme.color.darksmoke};
	}

	${media.largeUp`
		display: none;
	`}
`;



/**
 *	<UserButton>
 *		<UserButtonPanel>
 *			<UserButtonMainMenu />  <---
 *			<UserButtonBlogsMenu />
 *		</UserButtonPanel>
 *	</UserButton>
 */
export const UserButtonMainMenu = ({
	currentBlog,
	currentUser,
	features,
	ga,
	logout,
	notificationCount = 0,
	postId,
	pageType,
	onClose,
	isScrollback,
	onEditHomepageClick
}: AnalyticsInjectedProps & UserButtonProps) => {
	const {
		displayName,
		screenName
	} = currentUser;
	const language: Locale = currentBlog && currentBlog.locale;
	const translate = createTranslate(userButtonTranslations, language);

	const userLinks = getUserLinks({
		translate,
		ga,
		isScrollback,
		pageType,
		notificationCount,
		blog: currentBlog,
		currentUser,
		postId,
		features,
		logout,
		onEditHomepageClick
	});

	const renderedUserLinks = userLinks.map(props => <UserMenuLink key={String(props.label)} {...props} />);

	return (
		<ULversion2 className="user-links">
			<DisplayName data-username={screenName} className="display-name">
				<UserButtonWrapper>
					<div>
						<AvatarElement currentUser={currentUser} />
						<span>{displayName}</span>
					</div>
					<CloseWrapper onClick={onClose}>
						<CloseIcon />
					</CloseWrapper>
				</UserButtonWrapper>
			</DisplayName>
			{renderedUserLinks}
		</ULversion2>
	);
};


/**
 * <UserButton>
 * 	<UserButtonPanel>
 *		<UserButtonMainMenu />
 *		<UserButtonBlogsMenu /> <---
 *  </UserButtonPanel>
 * </UserButton>
 */
export const UserButtonBlogsMenu = ({
	userBlogs
}: {
	userBlogs: Array<Blog>
}) => {
	const formatForRender = (blog: Blog): UserMenuLinkProps => {
		const {
			avatar,
			canonicalHost,
			displayName
		} = blog;

		return {
			avatar: avatar || undefined,
			href: `https://${canonicalHost}`,
			label: displayName,
			// default icon if the blog doesn't have an avatar
			icon: <BlogAvatar name="kinja" />
		};
	};
	const sortedBlogs = userBlogs.sort((a, b) => {
		return a.displayName.localeCompare(b.displayName);
	});

	const renderedBlogs = sortedBlogs.map(blog => <UserMenuLink {...formatForRender(blog)} key={blog.id} />);

	return (
		<ULversion2 className="myblogs">
			{renderedBlogs}
		</ULversion2>
	);
};


/**
 *	<UserButton>
 *		<UserButtonPanel>         <---
 *			<UserButtonMainMenu />
 *			<UserButtonBlogsMenu />
 *		</UserButtonPanel>        <---
 *	</UserButton>
 */
const UserButtonPanel = ({
	currentBlog,
	currentUser,
	features,
	ga,
	logout,
	notificationCount,
	postId,
	pageType,
	isScrollback,
	userBlogs,
	onEditHomepageClick,
	onClose,
	insideReference
}: UserButtonProps & AnalyticsInjectedProps & {
	insideReference?: ?HTMLElement => void
}) => {
	const contents = () => (
		<React.Fragment>
			<UserButtonMainMenu
				currentBlog={currentBlog}
				currentUser={currentUser}
				features={features}
				ga={ga}
				logout={logout}
				notificationCount={notificationCount}
				postId={postId}
				pageType={pageType}
				onClose={onClose}
				isScrollback={isScrollback}
				userBlogs={userBlogs}
				onEditHomepageClick={onEditHomepageClick}
			/>
			<UserButtonBlogsMenu
				userBlogs={userBlogs}
				ga={ga}
			/>
		</React.Fragment>
	);

	return (
		<UserMenuForVersion2 ref={insideReference} className="user-menu">
			{contents()}
		</UserMenuForVersion2>
	);

};


/**
 *	<UserButton>               <---
 * 		<UserButtonPanel>
 *			<UserButtonMainMenu />
 *			<UserButtonBlogsMenu />
 *		</UserButtonPanel>
 *	</UserButton>              <---
 */
export const UserButton = ({
	currentBlog,
	currentUser,
	userBlogs,
	features,
	ga,
	isOpen,
	logout,
	notificationCount,
	onClick,
	postId,
	pageType,
	toggle,
	isScrollback,
	onEditHomepageClick,
	insideReference
}: UserButtonProps
	& AnalyticsInjectedProps
	& ToggleInjectedProps
) => {
	const isLoggedIn = Boolean(currentUser);
	const tagIfScrollbackInGA = (name: string) => {
		return (name + `${isScrollback ? ' - scroll back' : ''}`);
	};

	const onClickFn = () => {
		if (isLoggedIn && toggle) {
			toggle();
			ga('Sub navigation', tagIfScrollbackInGA('Profile dropdown'), pageType);
		} else if (onClick) {
			onClick();
			ga('Sub navigation', tagIfScrollbackInGA('Login/Signup Click'), pageType);
		}
	};

	return (
		<UserButtonContainer>
			<a onClick={() => onClickFn()} className={cx('js_header-userbutton', { 'js_header-userbutton--loggedin': isLoggedIn })}>
				<AvatarElement currentUser={currentUser} notificationCount={notificationCount} >
					{isLoggedIn ? null : <UserFilledIcon />}
				</AvatarElement>
			</a>
			{ isOpen && isLoggedIn ?
				<UserButtonPanel
					currentBlog={currentBlog}
					currentUser={currentUser}
					features={features}
					insideReference={insideReference}
					ga={ga}
					logout={logout}
					notificationCount={notificationCount}
					postId={postId}
					pageType={pageType}
					onClose={toggle}
					isScrollback={isScrollback}
					userBlogs={userBlogs}
					onEditHomepageClick={() => {
						toggle && toggle();
						onEditHomepageClick();
					}}
				/>
				: null }
		</UserButtonContainer>
	);

};


export default Analytics(Toggle(withTheme(UserButton), { isOutsideClickEnabled: true }));
