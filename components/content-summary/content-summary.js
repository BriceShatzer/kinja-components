/* @flow */

import imageUrl from 'kinja-images';
import * as React from 'react';
import md2html from 'snarkdown';
import styled from 'styled-components';

import media from '../../style-utils/media';
import { fullyQualifyWithProtocol } from '../../utils/url';
import { EnsureDefaultTheme } from '../theme';

// ICONS
import ChevronLeftIcon from '../icon19/ChevronLeft';
import ChevronRightIcon from '../icon19/ChevronRight';
import MinusIcon from '../icon19/Minus';

import type { AnalyticsInjectedProps } from '../hoc/analytics';
import type { TypedTagDataProperties } from 'kinja-magma/models/TypedTagData';
import type SimpleImage from 'kinja-magma/models/SimpleImage';
import Link from '../elements/link';

type analyticsEventContextType =
	'Boilerplate - Story Type' |
	'Boilerplate - Special Section';

export type SummaryProps = {
	analyticsEventContext?: analyticsEventContextType,
	canonical?: string,
	canonicalHost?: string,
	category?: ?TypedTagDataProperties,
	contentType: string,
	image?: ?SimpleImage,
	hideNavigation?: boolean,
	labelClassName?: string,
	nextPermalink?: string,
	prevPermalink?: string,
	summary: ?string,
	title: string
} & AnalyticsInjectedProps;

export const SummaryBox = styled.div.attrs(() => ({
	className: 'content-summary__SummaryBox'
}))`
	display: block;
	margin-top: ${props => props.image ? '40px' : '25px'};
	margin-bottom: 25px;
	padding-bottom: calc(25px + 12px); /* account for the 12px box shadow */
	border-bottom: 1px solid #d4d4d4;
	flex-flow: column;
	overflow: auto;

	${
	media.smallOnly`
		margin: 0;
		margin-bottom: 30px;
		margin-top: 30px;
	`}
`;

const Image = styled.img`
	max-width: 250px;
	height: calc(250px * 9 / 16);

	${
	media.smallOnly`
		width: 100%;
		height: auto;
		max-width: 150px;
		height: calc(150px * 9 / 16);
	`}
`;

const ShadowBox = styled.span.attrs(props => ({
	className: props.labelClassName
}))`
	display: block;
	float: left;
	border: ${props => props.image ? '0' : '1px'} solid ${props => props.theme.color.midgray};
	padding: ${props => props.image ? '0' : '10px 8px 8px'};
	margin-left: ${props => props.image ? '0' : '4px'};
	margin-right: 12px;
	margin-bottom: 2px;
	box-shadow: ${props => props.image ? 'none' : '-7px 7px 0 -3px' };
	color: ${props => props.theme.color.primary};
	height: auto;

	&& a {
		box-shadow: none;
		text-decoration: none;
	}

	${
	media.smallOnly`
		margin: ${props => props.image ? '6px 18px 1px 0;' : '0 12px 0 3px'};
		box-shadow: ${props => props.image ? '0' : '-3px 3px 0 0' };
	`}
`;

const Side = styled.span`
	display: block;
	margin-top: 0;
	width: auto;
`;

const Title = styled.span`
	display: block;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-weight: 600;
	font-size: 22px;
	color: ${props => props.theme.color.bodytext};

	a {
		color: ${props => props.theme.color.bodytext};
		transition: color ${props => props.theme.linkTransition};
		box-shadow: inset 0 -2px 0 ${props => props.theme.color.primary};
		text-decoration: none;

		&:hover {
			color: ${props => props.theme.color.primary};
			text-decoration: none;
		}
	}
`;

const TitleBigScreen = styled(Title)`
	display: block;
	${
	media.smallOnly`
		display: none;
	`}
`;

const TitleSmallScreen = styled(Title)`
	display: none;
	${media.smallOnly`
		display: block;
		padding: 5px 0;
	`}
`;

const Description = styled.span`
	display: block;
	font-style: italic;
	font-size: 14px;
	line-height: 24px;
	font-family: ${props => props.theme.typography.serif.fontFamily};
	margin-top: ${props => props.image ? '5px' : '0'};
	padding-top: 1px;

	a {
		color: ${props => props.theme.color.primary};
	}
`;


const Pagination = styled.div.attrs(() => ({
	className: 'content-summary__Pagination'
}))`
	display: block;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-size: 15px;
	margin-top: 6px;
	line-height: 18px;

	${
	media.smallOnly`
		flex-wrap: wrap;
		margin-top: 10px;
		> div {
			display: flex;
		}
	`}

	span {
		color: ${props => props.theme.color.gray};
	}

	a {
		color: ${props => props.theme.color.bodytext};
		transition: color ${props => props.theme.linkTransition};
		box-shadow: inset 0 -2px 0 ${props => props.theme.color.primary};
		text-decoration: none;

		&:hover {
			color: ${props => props.theme.color.primary};
			text-decoration: none;
		}

		span {
			color: ${props => props.theme.color.black};
		}
	}
`;

const PullIn = styled.div`
	display: flex;
	margin-left: 8px;
	margin-bottom: 10px;

	&:first-of-type {
		margin-left: 0;
	}

	${
	media.smallOnly`
		margin-left: 0;
		display: ${props => props.hideMobile ? 'none' : 'block'};
	`}
`;

const Control = styled.span`
	display: flex;
	flex-direction: row;
	svg {
		color: ${({ theme, hasLink }) => hasLink ? theme.color.black : theme.color.gray};
	}
`;

const Prev = styled(Control)`
	margin-left: -5px;
`;

const LinkPrev = ({ href, onClick, event } = {}) => {
	return (
		<Prev hasLink={href}>
			<ChevronLeftIcon />
			{href ?
				<Link href={href} onClick={onClick} events={[event]}>
				Prev</Link> : <span>Prev</span>}
		</Prev>
	);
};

const Next = styled(Control)`
	margin-right: -5px;
`;

const LinkNext = ({ href, onClick, event } = {}) => {
	return (
		<Next hasLink={href}>
			{href ?
				<Link href={href} onClick={onClick} events={[event]}>
				Next</Link> : <span>Next</span>}
			<ChevronRightIcon />
		</Next>
	);
};

const Separator = styled.span`
	margin: 0 2px;

	svg {
		transform: rotate(90deg);
	}
`;

function renderThumbnailOrTitle(image: ?SimpleImage, title: string) {
	if (image) {
		return <Image src={imageUrl(image.id, 'KinjaCenteredMediumAuto', image.format)} />;
	} else {
		return <Title>{title}</Title>;
	}
}

function Summary(props: SummaryProps) {
	const {
		analyticsEventContext = '',
		canonical,
		canonicalHost = '',
		category = {},
		contentType,
		ga,
		hideNavigation,
		image,
		labelClassName,
		nextPermalink = '',
		prevPermalink = '',
		summary,
		title
	} = props || {};

	const sendEvent = (title: string, value: string) => {
		return ga ? ga('Permalink meta', `${analyticsEventContext} ${title}`, value) : null;
	};

	const hasSummaryWithLength: boolean = summary && md2html(summary) && md2html(summary).length || false;
	const isNonStandardContentType: boolean = contentType !== 'Standard';
	const canonicalURI = canonicalHost && fullyQualifyWithProtocol(canonicalHost);
	const url = `${canonicalURI}${canonical ? `/c/${canonical}` : ''}`;
	const categoryLink = category && canonical ? `${canonicalURI}/c/${canonical}/${category.canonicalName}` : '';
	const titleClickEvent = analyticsEventContext === 'Boilerplate - Story Type' ?
		'view all click' : 'click';

	return hasSummaryWithLength ? (
		<EnsureDefaultTheme>
			<SummaryBox image={image}>
				{image && <TitleSmallScreen>
					{url ? (
						<Link
							href={url}
							events={[[analyticsEventContext, titleClickEvent, url]]}
							onClick={() => sendEvent(titleClickEvent, url)}
						>{title}</Link>) : title
					}
				</TitleSmallScreen>}

				{(image || title) && (
					<ShadowBox image={image} title={title} labelClassName={labelClassName}>
						{url ? (
							<Link
								href={url}
								events={[[analyticsEventContext, titleClickEvent, url]]}
								onClick={() => sendEvent(titleClickEvent, url)}
							>
								{renderThumbnailOrTitle(image, title)}
							</Link>
						) :
							renderThumbnailOrTitle(image, title)
						}
					</ShadowBox>
				)}

				<Side image={image}>
					{ image && <TitleBigScreen>{url ?
						<a href={url}>{title}</a> : title}</TitleBigScreen> }
					<Description
						image={image}
						dangerouslySetInnerHTML={{ __html: md2html(summary) }}
					/>
					{!hideNavigation && <Pagination>
						<PullIn>
							<LinkPrev
								event={[analyticsEventContext, 'previous click', prevPermalink]}
								onClick={() => sendEvent('previous click', prevPermalink)}
								href={prevPermalink}
							/>
							<Separator><MinusIcon /></Separator>
							<LinkNext
								event={[analyticsEventContext, 'next click', nextPermalink]}
								onClick={() => sendEvent('next click', nextPermalink)}
								href={nextPermalink}
							/>
							{(!category || !isNonStandardContentType) && (
								<React.Fragment>
									<Separator><MinusIcon /></Separator>
									{canonical && canonicalHost ? (
										<Link
											onClick={() => sendEvent('view all click', url)}
											events={[[analyticsEventContext, 'view all click', url]]}
											href={url}
										>View All </Link>
									) : (
										<span>View All </span>
									)}
								</React.Fragment>
							)}
						</PullIn>
						<PullIn>
							{category && isNonStandardContentType && (
								<React.Fragment>
									<Link
										onClick={() => sendEvent(
											'category click',
											categoryLink
										)}
										events={[[analyticsEventContext, 'category click', categoryLink]]}
										href={categoryLink}
									>More {category.valueDisplay}</Link>
									<Separator><MinusIcon /></Separator>
									<Link
										onClick={() => sendEvent('story type click', url)}
										events={[[analyticsEventContext, 'story type click', url]]}
										href={url}
									>All {title}</Link>
								</React.Fragment>
							)}
						</PullIn>
					</Pagination>}
				</Side>
			</SummaryBox>
		</EnsureDefaultTheme>
	) : <span />;
}

export default Summary;
