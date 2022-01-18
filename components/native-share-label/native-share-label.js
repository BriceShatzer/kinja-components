// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import media from 'kinja-components/style-utils/media';
import { EnsureDefaultTheme } from '../theme';
import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import MetaTime from 'kinja-components/components/post-elements/meta-time';
import SponsoredLabel from 'kinja-components/components/post-elements/sponsored-label';
import LabelVertical from 'kinja-components/components/post-elements/meta-info/label-vertical';
import type { RecircGroup } from '../types';
import BlogAvatar, { BlogAvatarWrapper } from '../blog-avatar';
import BlogLogo from '../blog-logo';
import SharedPost from '../icon19/SharedPost';
import Promotion from '../icon19/Promotion';
import DealsBox from '../icon19/DealsBox24';
import createTranslate from '../translator';
import translations from './translations';
import type { Locale } from 'kinja-magma/models/Locale';

// ICON
import SharedPostIcon from '../icon19/SharedPost';
import ExternalLinkIcon from '../icon19/ExternalLink';

type Props = {
	blog?: Blog,
	className?: string,
	parentBlogName?: ?string,
	defaultBlogDisplayName: ?string,
	defaultBlogHost?: ?string,
	defaultBlogRecircGroup: ?RecircGroup,
	defaultBlogGroup: ?string,
	hideBlogAvatar?: boolean,
	isDeals?: boolean,
	isEditorial?: boolean,
	isNative?: boolean,
	isPromoted?: boolean,
	isSplice?: boolean,
	isSponsored?: boolean,
	label?: string,
	/**
	 * Show "shared from" label when the recirc groups are the same
	 * when false the component doesn't render in this case.
	 * defaults to false
	 */
	showSharedLabel?: boolean,
	showViewOnLabel?: boolean,
	showExternalIcon?: boolean,
	version?: string,
	viewOn?: string,
	post?: Post,
	index?: number,
	pageType?: string,
	colored?: boolean,
	hideTime?: boolean
};

type PostIconProps = {
	isNative?: boolean,
	isSplice?: boolean,
	isDeals?: boolean,
	isPromoted?: boolean,
	className?: string
};

const AvatarWrapper = styled.span`
	${BlogAvatarWrapper} {
		margin-right: 10px;
		margin-top: -2px;
	}
`;

const LogoWrapper = styled.span``;

const IconWrapper = styled.span`
	margin-right: 6px;
	margin-top: -2px;

	&.right {
		margin-right: 0;
		margin-left: 10px;
	}
`;

const MobileSeparator = styled.span`
	${media.smallOnly`
		&:before {
			content: "|";
			color: ${props => props.theme.color.gray};
			font-size: 14px;
			vertical-align: middle;
			display: block;
			padding: 0 8px;
		}
	`}
`;

const ShareIcon = () => (
	<IconWrapper id="shareIcon">
		<SharedPostIcon />
	</IconWrapper>
);

const ExternalIcon = () => (
	<IconWrapper id="externalIcon">
		<ExternalLinkIcon />
	</IconWrapper>
);

const SpliceMiniIcon = (props: PostIconProps) => {
	const icon = ({
		isDeals,
		isNative,
		isPromoted,
		isSplice
	}) => {
		if (isDeals) {
			return <DealsBox />;
		} else if (isSplice) {
			return <SharedPost />;
		} else if (isNative) {
			return isPromoted ? <Promotion /> : <SharedPost />;
		}
		return null;
	};

	return (
		<span className={props.className}>
			{icon(props)}
		</span>
	);
};

const icon = ({ defaultBlogRecircGroup, defaultBlogGroup, showExternalIcon }: Props) => {
	if (showExternalIcon) {
		return <ExternalIcon />;
	} else if (defaultBlogRecircGroup === 'fmgBusiness') {
		return <ShareIcon />;
	} else if (defaultBlogGroup) {
		return (
			<AvatarWrapper id="avatarIcon">
				<BlogAvatar name={defaultBlogGroup} size={20} />
			</AvatarWrapper>
		);
	}
};

const logo = ({
	defaultBlogGroup,
	isDeals,
	label,
	version,
	colored
}: Props & { colored?: boolean }) => {
	const blogGroup = !isDeals ? defaultBlogGroup : 'kinjadeals';
	if (blogGroup) {
		return (
			<React.Fragment>
				<Label version={version} uppercase>{label}</Label>
				<LogoWrapper id="nativeLogo">
					<BlogLogo name={blogGroup} scale={0.35} monochrome={!colored} />
				</LogoWrapper>
			</React.Fragment>
		);
	}
	return null;
};

const StyledSponsoredLabel = styled(SponsoredLabel)`
	display: flex;
	align-items: center;
	font-size: 14px;
	text-transform: uppercase;

	${media.smallOnly`
		font-size: 13px;
	`};

	${media.mediumUp`
		margin-right: 10px;
	`};
`;

const StyledTime = styled(MetaTime)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-size: 14px;
	text-transform: uppercase;
	line-height: 20px;

	${props => props.isV3 && css`
		margin-right: 10px;
	`}

	${media.mediumUp`
		display: none;
	`}
`;

export const LabelWrapper = styled.div`
	display: flex;
	align-items: center;
	color: ${props => props.theme.color.darksmoke};
	font-family: ${props => props.theme.typography.primary.fontFamily};
	line-height: 25px;

	${props => props.version === '2' && css`
		align-items: center;
		display: flex;
		line-height: 17px;
	`}

	${props => props.version === '1' && css`
		${StyledTime} {
			margin-left: 8px;
		}
	`}
`;

const Label = styled.span`
	${props => props.version === '2' && css`
		color: ${props => props.theme.color.darkgray};
		display: flex;
		font-size: 13px;
		font-style: normal;
		height: 20px;
		line-height: 20px;
		margin-right: 4px;
		padding-top: 1px;
	`}

	${props => props.uppercase && css`
		text-transform: uppercase;
	`};
`;

const HideForDesktop = styled.div`
	display: inherit;
	align-items: inherit;

	${media.mediumUp`
		display: none;
	`}
`;

const ShareIconContainer = styled.div`
	display: inherit;
	align-items: inherit;
`;

const StyledMiniIcon = styled(SpliceMiniIcon)`
	display: block;
	margin-right: 8px;
	margin-top: -2px;

	${LabelWrapper} {
		margin-left: 10px;
	}

	svg {
		width: 16px;
		height: 16px;
	}
`;

const NativeShareLabel = (props: Props) => {
	const {
		blog,
		className,
		defaultBlogDisplayName,
		defaultBlogGroup,
		defaultBlogHost,
		defaultBlogRecircGroup,
		hideBlogAvatar,
		isEditorial,
		post,
		index,
		pageType,
		isDeals,
		isNative,
		isPromoted,
		isSplice,
		isSponsored,
		parentBlogName,
		showExternalIcon,
		showSharedLabel,
		showViewOnLabel,
		version,
		colored,
		hideTime
	} = props;


	if (blog && defaultBlogDisplayName) {
		const language: Locale = blog.locale;
		const translate = createTranslate(translations, language);
		const isSameRecircGroup = blog.recircGroup !== defaultBlogRecircGroup;
		const isSameBlogGroup = blog.blogGroup === defaultBlogGroup;
		const viewOn =
		parentBlogName && parentBlogName !== defaultBlogDisplayName && isSameRecircGroup
			? `${defaultBlogDisplayName} | ${parentBlogName}`
			: defaultBlogDisplayName;

		const readOnLabel = translate('Read on');
		const viewOnLabel = translate('View on {view_on}', { view_on: viewOn });

		if (isSameRecircGroup || showViewOnLabel) {
			switch (version) {
				case '2': {
					return (
						<EnsureDefaultTheme>
							<React.Fragment>
								<LabelWrapper version={version} className={className}>
									{(isSponsored || isNative || isPromoted || isDeals || isSplice) && (
										<React.Fragment>
											<HideForDesktop>
												<StyledMiniIcon
													isDeals={isDeals}
													isNative={isNative}
													isPromoted={isPromoted}
													isSplice={isSplice}
												/>
											</HideForDesktop>
											{isSponsored && (
												<React.Fragment>
													<StyledSponsoredLabel
														isEditorial={isEditorial}
														isBranded={defaultBlogRecircGroup === 'fmgSatire'}
														locale={blog && blog.locale}
													/>
													<MobileSeparator />
												</React.Fragment>
											)}
										</React.Fragment>
									)}
									{!isDeals
										&& !isSponsored
										&& !isPromoted
										&& !isEditorial
										&& !showViewOnLabel
										&& !showSharedLabel
										&& (
											<LabelVertical
												displayName={defaultBlogDisplayName}
												index={index}
												pageType={pageType}
												canonicalHost={defaultBlogHost}
											/>
										)
									}
									{!isSponsored && !isNative && (
										<React.Fragment>
											{logo({...props, className, isDeals, label: readOnLabel, version, colored })}
											<MobileSeparator />
										</React.Fragment>
									)}
									{!hideTime && <StyledTime
										relativeShort
										permalink={post && post.securePermalink}
										millis={post && post.repost ? post.repost.repostTimeMillis : post && post.publishTimeMillis}
										timezone={blog && blog.timezone}
										locale={blog && blog.locale}
										isScheduled={post && post.status === 'SCHEDULED'}
										index={index}
										pageType={pageType}
										postId={post && post.id}
										isV3
										isEditorial={isEditorial}
									/>}
								</LabelWrapper>
								{isSponsored || isPromoted || isNative ? (
									<LabelWrapper version={version} className={className}>
										<ShareIconContainer>
											{showExternalIcon || isNative ? <ExternalIcon /> : <ShareIcon />}
											<Label version={version}>{viewOnLabel}</Label>
										</ShareIconContainer>
									</LabelWrapper>
								) : null}
							</React.Fragment>
						</EnsureDefaultTheme>
					);
				}
				case '1':
				default: {
					const label = translate('View on {view_on}', { view_on: viewOn });
					return (
						<EnsureDefaultTheme>
							<LabelWrapper version={version} className={className}>
								{!hideBlogAvatar && icon(props)}
								<Label version={version}>{label}</Label>
							</LabelWrapper>
						</EnsureDefaultTheme>
					);
				}
			}
		} else if (showSharedLabel) {
			switch (version) {
				case '2': {
					return (
						<EnsureDefaultTheme>
							<React.Fragment>
								<LabelWrapper version={version} className={className}>
									{!isSponsored && !isNative && !isSameBlogGroup
										? (
											<React.Fragment>
												<HideForDesktop>
													<StyledMiniIcon
														isDeals={isDeals}
														isNative={isNative}
														isPromoted={isPromoted}
														isSplice={isSplice}
													/>
												</HideForDesktop>
												{logo({...props, className, isDeals, label: readOnLabel, version, colored })}
												<MobileSeparator />
												{!hideTime && <StyledTime
													relativeShort
													permalink={post && post.securePermalink}
													millis={post && post.repost ? post.repost.repostTimeMillis : post && post.publishTimeMillis}
													timezone={blog && blog.timezone}
													locale={blog && blog.locale}
													isScheduled={post && post.status === 'SCHEDULED'}
													index={index}
													pageType={pageType}
													postId={post && post.id}
													isV3
													isEditorial={isEditorial}
												/>}
											</React.Fragment>
										) : null}
								</LabelWrapper>
							</React.Fragment>
						</EnsureDefaultTheme>
					);
				}
				case '1':
				default: {
					const label = translate('Shared from {view_on}', { view_on: viewOn });
					return (
						<EnsureDefaultTheme>
							<LabelWrapper version={version} className={className}>
								<ShareIcon />
								<Label version={version}>{label}</Label>
							</LabelWrapper>
						</EnsureDefaultTheme>
					);
				}
			}
		}
	}

	return null;
};

export default NativeShareLabel;
