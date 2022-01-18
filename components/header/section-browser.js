// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import type RenderableSection from 'kinja-magma/models/RenderableSection';
import type Blog from 'kinja-magma/models/Blog';
import { LazyResponsiveImage } from 'kinja-components/components/elements/image';
import Link, { Anchor } from '../elements/link';
import media from '../../style-utils/media';
import FooterSocial from '../footer/subcomponents/footerSocial';
import transitions from './translations';
import createTranslate, { type TranslateFunction } from '../translator';
import { gridValue } from '../grid-utils';
import { ButtonWrapper } from '../buttons/Button';
import { FooterSocialWrap } from '../footer/subcomponents/footerSocial';
import { storeUrls } from '../footer/constants';

const Header = styled.header`
	color: ${props => props.theme.color.darksmoke};
	font-weight: bold;
	line-height: 19px;
	padding-bottom: 8px;
	border-bottom: 1px solid ${props => props.theme.color.lightgray};
	text-transform: uppercase;
	margin-bottom: 32px;

	${media.mediumDown`
		display: none;
	`}
`;

const Grid = styled.div`
	display: grid;

	${media.smallOnly`
		grid-template-columns: ${gridValue.small('3c')} ${gridValue.small('3c')};
		grid-column-gap: ${gridValue.small('1g')};
		grid-row-gap: ${gridValue.small('2g')};
		margin-bottom: 32px;
	`}

	${media.mediumOnly`
		grid-template-columns: ${gridValue.medium('3c')} ${gridValue.medium('3c')};
		grid-column-gap: ${gridValue.medium('1g')};
		grid-row-gap: ${gridValue.medium('2g')};
		margin-bottom: 32px;
	`}

	${media.largeOnly`
		grid-template-columns: ${gridValue.large('4c')} ${gridValue.large('4c')};
		grid-column-gap: ${gridValue.large('1g')};
		grid-row-gap: ${gridValue.large('0.5g')};
	`}

	${media.xlargeOnly`
		grid-template-columns: ${gridValue.xlarge('4c')}  ${gridValue.xlarge('4c')}  ${gridValue.xlarge('4c')};
		grid-column-gap: ${gridValue.xlarge('1g')};
		grid-row-gap: ${gridValue.xlarge('0.5g')};
	`}

	${media.xxlargeUp`
		grid-template-columns: ${gridValue.xxlarge('4c')}  ${gridValue.xxlarge('4c')}  ${gridValue.xxlarge('4c')};
		grid-column-gap: ${gridValue.xxlarge('1g')};
		grid-row-gap: ${gridValue.xxlarge('0.5g')};
	`}
`;

const AvatarIcon = styled.div`
	width: 18px;
	height: 18px;
	margin-right: 8px;
	position: relative;
`;

const LetterIcon = styled.div`
	border: 1px solid ${props => props.theme.color.primary};
	color: ${props => props.theme.color.primary};
	width: 18px;
	min-width: 18px;
	height: 18px;
	font-size: 15px;
	text-align: center;
	text-transform: uppercase;
	font-weight: bold;
	line-height: 18px;
	margin-right: 8px;
`;

const Title = styled.h2`
	font-size: 14px;
	line-height: 17px;
	color: ${props => props.theme.color.darksmoke};
	margin-bottom: 4px;
	text-transform: uppercase;
	font-weight: bold;

	&:hover,
	&:active {
		color: ${props => props.theme.color.darksmoke};
		text-decoration: none;
	}

	${media.mediumDown`
		font-size: 16px;
		line-height: 21px;
	`}
`;

const Item = styled(Link)`
	display: flex;
	align-items: top;

	&:hover {
		text-decoration: none;

		${Title} {
			text-decoration: underline;
			text-decoration-color: ${props => props.theme.color.primary};
		}
	}
`;

const ItemContents = styled.div`
	line-height: 17px;
`;

const Attribution = styled.span`
	margin-left: 8px;
	background-color: ${props => props.theme.color.lightgray};
	text-transform: none;
	font-weight: normal;
	padding: 3px;
	border-radius: 3px;

	${media.mediumDown`
		margin: 0;
		display: inline-block;
		padding: 0 8px;
	`}

	span {
		font-weight: bold;
	}
`;

const Description = styled.p`
	font-size: 14px;
	color: ${props => props.theme.color.darkgray};
	line-height: 17px;
	margin-bottom: 0;
	margin-top: 4px;

	${media.mediumDown`
		display: none;
	`}
`;

const DisclaimerText = styled.span`

	color: ${props => props.theme.color.gray};

	${media.largeDown`
		display: none;
	`}

	${props => props.isMobile && css`
		display: none;
		width: 100%;

		${media.largeDown`
			display: block;
		`}
	`}
`;

const Footer = styled.div`
	font-size: 14px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;

	${media.mediumDown`
		border-top: 1px solid ${props => props.theme.color.lightgray};
		padding: 16px 0;
		line-height: 17px;
	`}

	${media.largeUp`
		margin-bottom: 40px;
		margin-top: 32px;
	`}

	${Anchor} {
		margin-right: 8px;
	}

	${Anchor} + ${Anchor} {
		border-left: 1px solid ${props => props.theme.color.darkgray};
		padding-left: 8px;
	}

	${FooterSocialWrap} {
		padding: 0;

		li {
			padding: 0;
		}

		${Anchor} {
			margin-right: 0;
			margin-left: 16px;
		}

		li:first-child {
			${Anchor} {
				margin-left: 0;
			}
		}
	}

	${ButtonWrapper} {
		background: none;
		width: auto;

		svg {
			fill: ${props => props.theme.color.primary};
		}
	}
`;

export const Container = styled.div`
	max-width: ${props => props.theme.pageWidth};
	width: 100%;
	padding: 0 ${props => props.theme.columnPadding};
`;

type Props = {
	sections: Array<RenderableSection>,
	enableStore?: boolean,
	blog?: Blog,
	isScrollback?: boolean
}

function Section(props: { section: RenderableSection, translate: TranslateFunction, blog?: Blog, isScrollback?: boolean }) {
	const { avatarCalculated, taglineCalculated, displayNameCalculated, url, sponsorshipAttribution } = props.section;
	if (!displayNameCalculated) {
		return null;
	}
	// Calculate tagline with default values accounted for
	const tagline = (() => {
		switch (props.section.type) {
			case 'TAG':
				return taglineCalculated ||
					(props.blog && props.blog.tagPageDescription && props.blog.tagPageDescription.replace(/{[^}]*}/, displayNameCalculated)) || '';
			case 'STORYTYPE':
				return taglineCalculated || (props.section.storyType && props.section.storyType.description);
			default:
				return taglineCalculated;
		}
	})();

	const taglineTruncated = ((): string => {
		if (tagline) {
			if (tagline.length > 130) {
				return tagline.substr(0, 127) + '…';
			}
			return tagline;
		}
		return '';
	})();
	const eventTag = props.section.subBlog ? props.section.subBlog.name : url;
	return (
		<Item href={url} events={[['Network navigation', `Vertical/Tag Click${props.isScrollback ? ' - scroll back' : ''}`, eventTag, { metric20: 1 }]]}>
			{avatarCalculated ?
				<AvatarIcon>
					<LazyResponsiveImage
						id={avatarCalculated.id}
						format={avatarCalculated.format}
						width="18"
						height="18"
						sizes="18px"
						noLazy
					/>
				</AvatarIcon> :
				<LetterIcon>{displayNameCalculated.substr(0, 1)}</LetterIcon>
			}
			<ItemContents>
				<Title>
					{displayNameCalculated}
					{sponsorshipAttribution &&
						<Attribution>{props.translate('Sponsored by')} <span>{sponsorshipAttribution}</span></Attribution>}
				</Title>
				<Description>{taglineTruncated}</Description>
			</ItemContents>
		</Item>
	);
}

export default function SectionBrowser(props: Props) {
	const { sections, enableStore, blog, isScrollback } = props;
	const translate = createTranslate(transitions, blog && blog.locale);
	const disclaimer = blog && translate('{blogName} Store is a third party site which is subject to its own terms of use and privacy policy.',
		{ blogName: blog.displayName });
	return (
		<EnsureDefaultTheme>
			<Container>
				<Header>{translate('Sections')}</Header>
				<Grid>
					{sections.map(section =>
						<Section
							section={section}
							key={section.index || section.sponsoredSpecialSection && section.sponsoredSpecialSection.blogId}
							translate={translate}
							blog={blog}
							isScrollback={isScrollback}
						/>)}
				</Grid>
				<Footer>
					<div>
						<Link href="/about">{translate('About')}</Link>
						{enableStore && blog && (
							<>
								<Link href={storeUrls[blog.blogGroup]}>{translate('{blogName} Store', { blogName: blog.displayName })}</Link>
								<DisclaimerText>{disclaimer}</DisclaimerText>
							</>
						)}
					</div>
					<FooterSocial
						canonicalHost={blog && blog.canonicalHost}
						facebookScreenName={blog && blog.facebookScreenName}
						instagramScreenName={blog && blog.instagramScreenName}
						twitterScreenName={blog && blog.twitterScreenName}
						youtubeUrl={blog && blog.youtubeUrl}
						ga={() => {}}
						gaEvent={mediumName =>
							['Network navigation', `Social button click${isScrollback ? ' - scroll back' : ''}`, mediumName, { metric21: 1 }]}
					/>
					{enableStore && blog &&  <DisclaimerText isMobile>{disclaimer}</DisclaimerText>}
				</Footer>
			</Container>
		</EnsureDefaultTheme>
	);
}
