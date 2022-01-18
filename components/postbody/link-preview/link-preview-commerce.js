// @flow

import * as React from 'react';
import styled, {css} from 'styled-components';

import { LazyResponsiveImage } from 'kinja-components/components/elements/image';
import { imageFormatFromString } from 'postbody/Image';
import truncate from 'html-truncate';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import { type Events } from 'kinja-components/components/elements/link';
import createTranslate from '../../translator';
import translations from './translations';
import { withKinjaMeta, type KinjaMetaInjectedProps } from '../../hoc/context';
import media from 'kinja-components/style-utils/media';
import {
	AmazonCommerceLink,
	getAmazonData,
	prepareLink,
	stripUriParams
} from 'postbody/CommerceUtils';
import {
	AmazonButton19,
	CommerceButton19
} from '../../button19/button19-variants';
import type Image from 'kinja-magma/models/Image';

// ICONS
import DealsBox24Icon from '../../icon19/DealsBox24';

import type { Props } from './normal-link-preview';

/**
 * Styled components
 */
const Wrapper = styled.aside``;

const ProviderName = styled.span`
	span {
		text-transform: capitalize;
		font-weight: bold;
	}
`;

const CommerceInsetPromocode = styled.span`
	&::before {
		content: '';
		margin-left: 8px;
		padding-left: 10px;
		line-height: 1.2;
		border-left: 1px solid ${props => props.theme.color.darkgray};
	}
`;

export const CommerceInset = styled.div`
	border: 1px solid ${props => props.theme.color.commerce};
	margin: 50px auto 62px;
	flex-direction: column;

	${media.mediumUp`
		flex-direction: ${props => props.isRightRail ? 'column' : 'row'}
		justify-content: space-between;
	`}

	position: relative;
	display: flex;
	align-items: center;
	max-width: ${props => props.theme.postContentMaxWidth};
	font-family: ${props => props.theme.typography.tertiary.fontFamily};
	clear: both;

	${props => props.asList && css`
		margin: -10px auto 15px;
		flex-direction: row;
		border: none;
	`}
`;

const NewCommerceInset = styled(CommerceInset)`
	padding: 10px;
`;

const MobileCommerceInset = styled(CommerceInset)`
	padding: 10px;
	margin: 2em auto;
`;

export const ContentWrapper = styled.div`
	flex: auto;
	overflow: hidden;
	color: ${props => props.theme.color.darkgray};
	margin: ${props => props.margin && '0 0 0 10px'};
`;

const CommerceInsetElement = styled.div`
	margin: ${props => props.nomargin ? 0 : '10px'};
	color: ${props => props.theme.color.darkgray};

	${props => props.image && css`
		min-width: 118px;
		max-width: 180px;
		margin: ${props => props.nomargin ? 0 : '0 10px'};

		img,
		amp-img {
			position: absolute;
			min-width: 118px;
		}
	`}

	${props => props.cta && css`
		margin-right: 16px;
		min-width: 100px;
		display: flex;
		justify-content: flex-end;
	`}

	${props => props.middle && css`
		text-align: center;
		div + div {
			margin-top: 7px;
		}
	`}
`;

const CommerceInsetHeader = styled.header`
	h2 {
		font-family: ${props => props.theme.typography.tertiary.fontFamily};
		margin: 0;

		a {
			color: ${props => props.theme.color.darkgray};

			&:hover {
				text-decoration: none;
			}
		}
	}

	${props => props.responsive && css`
		h2 {
			${media.smallOnly`
				font-size: ${props => props.newMobile ? '19px' : '16px'};
				line-height: 1.2;
				margin-bottom: 7 / 2;
			`}

			${media.mediumUp`
				font-size: 20px;
			`}
		}
	`}

	${props => props.small && css`
		h2 {
			font-size: 16px;

			a {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				display: block;
				max-width: 100%;
			}
		}
	`}
`;

export const NewCommerceInsetHeader = styled(CommerceInsetHeader)`
	h2 {
		a {
			color: ${props => props.theme.color.black};
		}
	}
	margin-bottom: 10px;
`;

const CommerceInsetByline = styled.div`
	font-size: 13px;

	${media.smallOnly`
		line-height: 20px;
	`}
`;

export const CommerceInsetMisc = styled.div`
	font-size: 12px;

	${media.smallOnly`
		line-height: 20px;
	`}
`;

const CommerceInsetSocialProof = styled.span`
	display: block;
	color: ${props => props.theme.color.commerce};
	font-weight: bold;
`;

const CommerceInsetDisc = styled.span`
	display: block;
	font-weight: bold;
`;

const LazyImageWrapper = styled.div`
	position: relative;

	${props => props.paddingBottom && css`
		padding-bottom: ${props.paddingBottom};
	`}
`;

export const MobileLazyImageWrapper = styled.div`
	position: relative;
	padding-bottom: 100%;

	&& img,
	&& amp-img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
`;

const CommerceInsetElementDesignA = styled(CommerceInsetElement)`
	margin-bottom: 5px;
`;

const CommerceInsetSocialProofDesignB = styled(CommerceInsetSocialProof)`
	text-align: center;
	margin-bottom: -15px;
	margin-top: 20px;
`;

const CommerceInsetDiscDesignB = styled(CommerceInsetDisc)`
	font-weight: normal !important;
	color: ${props => props.theme.color.darkgray} !important;
	margin-top: 10px;
`;

export const CommerceInsetDiscLight = styled.span`
	&,
	a {
		font-family: ${props => props.theme.typography.utility.fontFamily};
		color: ${props => props.theme.color.darkgray};
		font-size: 15px;
		margin-top: 10px;
	}

	a {
		padding-bottom: 0.25rem;
		border-bottom: ${props => `1px solid ${props.theme.color.commerce}`};
	}
`;


const CommerceInsetElementDesignB = styled(CommerceInsetElement)`
	${props => props.image && css`
		min-width: 218px;
		max-width: 280px;
		margin: 10px 10px;
	`}
`;

const CommerceInsetMobileRow = styled.div`
	display: flex;
	align-items: center;
`;

/**
 * Component that renders a link preview inset for an amazon or similar third party vendor's url
 */
function CommerceLinkPreview(props: Props & KinjaMetaInjectedProps & {
	showDetails?: boolean // Whether to show details like image, CTA etc. True in the case of CommerceCondensed style
}) {
	const {
		link,
		showDetails,
		kinjaMeta,
		isRightRail,
		newDesignA,
		newDesignB,
		mobileDesign
	} = props;

	// CommerceUtils need a simpler version of blog for now, we need to make it accept magma model later
	const blog = {
		name: kinjaMeta.blogName,
		blogGroup: kinjaMeta.blogGroup,
		isGmgBlog: kinjaMeta.isGmgBlog
	};
	const { tag, subtag, asin, url: taggedUrl } = getAmazonData({
		url: link.url,
		postId: kinjaMeta.postId,
		authorId: kinjaMeta.authorId,
		postIsStarter: kinjaMeta.starterPost,
		blog,
		affiliateTag: kinjaMeta.amazonAffiliateTag,
		commerceLinkType: AmazonCommerceLink.CommerceInset
	});
	const preparedLink = prepareLink({ ...link }); // Adjust price information
	preparedLink.url = taggedUrl;
	const gaTrackingLabel = `${kinjaMeta.permalinkUrl || ''},${(asin) || ''}`;

	const gaTrackingData = (action, events?): string => JSON.stringify(
		[
			['Commerce Inset Clicks', `Commerce inset - ${action}`, gaTrackingLabel],
			['ns:unique', 'Commerce Inset Clicks', `Commerce inset - ${action}`, gaTrackingLabel],
			...events || []
		]
	);

	const mobileGaTrackingData = (action, events?): string => JSON.stringify(
		[
			['Mobile Commerce Inset Clicks', `Mobile commerce inset - ${action}`, gaTrackingLabel],
			['ns:unique', 'Mobile Commerce Inset Clicks', `Mobile commerce inset - ${action}`, gaTrackingLabel],
			...events || []
		]
	);

	const cleanedUrl = stripUriParams(preparedLink.url, ['kinja_price', 'kinja_promocode']);
	const amazonDataAttribures = kinjaMeta.isGmgBlog ? {
		'data-amazonsin': asin || '',
		'data-amazontag': tag || '',
		'data-amazonsubtag': subtag || ''
	} : {};
	const image: Image | null = preparedLink.images.length ? preparedLink.images[0] : null;
	const translate = createTranslate(translations, kinjaMeta.language);
	/**
	 * Helper component for links in the inset because they mostly do the same thing
	 *
	 * TODO: - move this & badge styled component defns out of this component
	 */
	const CommerceLink = ({ type, action, children, events, inline, isMobile, ...props }: {
		type: string,
		action: string,
		children: React.Node,
		events?: Events,
		inline?: boolean,
		isMobile?: boolean
	}) => (
		<a
			href={cleanedUrl || ''}
			data-linktype={`[t|mod-${type}`}
			data-ga={isMobile ? mobileGaTrackingData(action, events) : gaTrackingData(action, events)}
			target="_blank"
			rel="noopener noreferrer"
			{...amazonDataAttribures}
			{...props}
		>
			{children}
		</a>
	);


	const BadgeLink = styled(CommerceLink)`
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
		top: -19px;
		left: -17px;
		background: ${props => props.theme.color.commerce};
		height: 55px;
		width: 55px;
		min-width: 55px;
		border-radius: 50%;
		line-height: 55px;
		text-align: center;
		font-size: 20px;

		span {
			color: ${props => props.theme.color.white};
		}

		&:hover {
			text-decoration: none;
			color: ${props => props.theme.color.white};
		}

		svg {
			width: 34px;
			height: 34px;
			color: ${props => props.theme.color.white};
			margin: 0;
		}

		${props => props.inline && `
			position: relative;
			top: -3px;
			left: auto;
			font-size: 16px;
			height: 44px;
			width: 44px;
			min-width: 44px;
			line-height: 44px;
		`}
	`;

	const paddingBottom = image ? `${Math.floor(image.height / image.width * 1000) / 10}%` : 0;
	const buttonLabel = isRightRail ? translate('Buy on Amazon') : translate('Buy now');

	let price = '';
	if ((preparedLink.meta && preparedLink.meta.amazonPrice) || (preparedLink.meta && preparedLink.meta.priceV2)) {
		price =  preparedLink.meta.amazonPrice ? preparedLink.meta.amazonPrice : preparedLink.meta.priceV2;
	}

	const mobileCtaLabel = price ? translate('Buy on Amazon for ${price}', { price }) : translate('Buy on Amazon');

	if (newDesignA) {
		return (
			<EnsureDefaultTheme>
				<Wrapper>
					<NewCommerceInset asList={!showDetails} isRightRail={isRightRail}>
						{/* Image */}
						{showDetails && (
							<CommerceInsetElement image>
								<CommerceLink type="image" action="image click" events={props.events}>
									{image ? (
										<LazyImageWrapper paddingBottom={paddingBottom} className="js_lazy-image">
											<LazyResponsiveImage
												id={image.id}
												width={image.width}
												height={image.height}
												format={imageFormatFromString(image.format || '')}
												sizes="180px"
												transform="CommerceInset"
											/>
										</LazyImageWrapper>
									) : (
										<DealsBox24Icon />
									)}
								</CommerceLink>
							</CommerceInsetElement>
						)}
						{/* Content */}
						<ContentWrapper>
							<CommerceInsetElementDesignA>
								{/* Headline */}
								{preparedLink.headline && (
									<NewCommerceInsetHeader responsive small={!showDetails}>
										<h2>
											<CommerceLink type="title" action="product title click'" events={props.events}>
												{truncate(preparedLink.headline, 65, { truncateLastWord: false })}
											</CommerceLink>
										</h2>
									</NewCommerceInsetHeader>
								)}
								{/* Byline */}
								<CommerceInsetByline>
									{preparedLink.meta && preparedLink.meta.promocode && (
										<span>
											{translate('Use code {promocode}', { promocode: preparedLink.meta.promocode })}
										</span>
									)}
								</CommerceInsetByline>
								{/* Misc */}
								{showDetails && (
									<CommerceInsetMisc>
										{preparedLink.meta && preparedLink.meta.conversions && (
											<CommerceInsetSocialProof>
												{translate(`${preparedLink.meta.conversions} purchased by readers`)}
											</CommerceInsetSocialProof>
										)}
										<CommerceInsetDisc>
											{translate('G/O Media may get a commission')}
										</CommerceInsetDisc>
									</CommerceInsetMisc>
								)}
							</CommerceInsetElementDesignA>
						</ContentWrapper>
						{/* CTA */}
						{showDetails && (
							<CommerceInsetElement cta>
								<CommerceLink type="button" action="Add to Cart click" events={props.events}>
									{price ? (<AmazonButton19
										newDesign={true}
										smallText={translate('on Amazon')}
										largeText={translate('Buy for ${price}', { price })}
										isRightRail={isRightRail}
									/>) :
										(<AmazonButton19
											newDesign={true}
											label={translate('Buy on Amazon')}
											isRightRail={isRightRail}
										/>)}
								</CommerceLink>
							</CommerceInsetElement>
						)}
					</NewCommerceInset>
				</Wrapper>
			</EnsureDefaultTheme>
		);
	} else if (newDesignB) {
		return (
			<EnsureDefaultTheme>
				<Wrapper>
					<NewCommerceInset asList={!showDetails} isRightRail={isRightRail}>
						{/* Image */}
						{showDetails && (
							<CommerceInsetElementDesignB image>
								<CommerceLink type="image" action="image click" events={props.events}>
									{image ? (
										<LazyImageWrapper paddingBottom={paddingBottom} className="js_lazy-image">
											<LazyResponsiveImage
												id={image.id}
												width={image.width}
												height={image.height * 1.5}
												format={imageFormatFromString(image.format || '')}
												sizes="320px"
												transform="CommerceInset"
											/>
										</LazyImageWrapper>
									) : (
										<DealsBox24Icon />
									)}
								</CommerceLink>
							</CommerceInsetElementDesignB>
						)}
						{/* Content */}
						<ContentWrapper>
							<CommerceInsetElement>
								{/* Headline */}
								{preparedLink.headline && (
									<NewCommerceInsetHeader responsive small={!showDetails}>
										<h2>
											<CommerceLink type="title" action="product title click'" events={props.events}>
												{truncate(preparedLink.headline, 65, { truncateLastWord: false })}
											</CommerceLink>
										</h2>
									</NewCommerceInsetHeader>
								)}
								{/* Byline */}
								<CommerceInsetByline>
									{preparedLink.meta && preparedLink.meta.promocode && (
										<span>
											{translate('Use code {promocode}', { promocode: preparedLink.meta.promocode })}
										</span>
									)}
								</CommerceInsetByline>
								{/* Misc */}
								{showDetails && (
									<CommerceInsetMisc>
										{preparedLink.meta && preparedLink.meta.conversions && (
											<CommerceInsetSocialProofDesignB>
												{translate(`${preparedLink.meta.conversions} purchased by readers`)}
											</CommerceInsetSocialProofDesignB>
										)}
									</CommerceInsetMisc>
								)}
							</CommerceInsetElement>
						</ContentWrapper>
						{/* CTA */}
						{showDetails && (
							<CommerceInsetElement cta>
								<CommerceLink type="button" action="Add to Cart click" events={props.events}>
									{price ? (<AmazonButton19
										newDesign={true}
										smallText={translate('on Amazon')}
										largeText={translate('Buy for ${price}', { price })}
										isRightRail={isRightRail}
									/>) :
										(<AmazonButton19
											newDesign={true}
											label={translate('Buy on Amazon')}
											isRightRail={isRightRail}
										/>)}
								</CommerceLink>
							</CommerceInsetElement>
						)}
						{showDetails && (
							<CommerceInsetMisc>
								<CommerceInsetDiscDesignB>
									{translate('G/O Media may get a commission')}
								</CommerceInsetDiscDesignB>
							</CommerceInsetMisc>
						)}
					</NewCommerceInset>
				</Wrapper>
			</EnsureDefaultTheme>
		);
	} else if (mobileDesign) {
		return (
			<EnsureDefaultTheme>
				<Wrapper>
					<MobileCommerceInset asList={!showDetails} isRightRail={isRightRail}>
						<CommerceInsetMobileRow>
							{/* Image */}
							{showDetails && (
								<CommerceInsetElement nomargin image>
									<CommerceLink type="image" action="image click" events={props.events}>
										{image ? (
											<MobileLazyImageWrapper paddingBottom={paddingBottom} className="js_lazy-image">
												<LazyResponsiveImage
													id={image.id}
													width={image.width}
													height={image.height * 1.5}
													format={imageFormatFromString(image.format || '')}
													sizes="320px"
													transform="CommerceInset"
												/>
											</MobileLazyImageWrapper>
										) : (
											<DealsBox24Icon />
										)}
									</CommerceLink>
								</CommerceInsetElement>
							)}
							{/* Content */}
							<ContentWrapper margin>
								<CommerceInsetElement nomargin>
									{/* Headline */}
									{preparedLink.headline && (
										<NewCommerceInsetHeader responsive newMobile>
											<h2>
												<CommerceLink isMobile type="title" action="product title click'" events={props.events}>
													{truncate(preparedLink.headline, 65, { truncateLastWord: false })}
												</CommerceLink>
											</h2>
										</NewCommerceInsetHeader>
									)}
								</CommerceInsetElement>
							</ContentWrapper>
						</CommerceInsetMobileRow>

						{/* CTA */}
						{showDetails && (
							<CommerceInsetElement cta>
								<CommerceLink isMobile type="button" action="Add to Cart click" events={props.events}>
									<CommerceButton19
										label={mobileCtaLabel}
									/>
								</CommerceLink>
							</CommerceInsetElement>
						)}
						{showDetails && (
							<CommerceInsetMisc>
								<CommerceInsetDiscLight>
									{translate('G/O Media may get a commission')}
								</CommerceInsetDiscLight>
							</CommerceInsetMisc>
						)}
					</MobileCommerceInset>
				</Wrapper>
			</EnsureDefaultTheme>
		);
	} else {
		return (
			<EnsureDefaultTheme>
				<Wrapper>
					<CommerceInset asList={!showDetails} isRightRail={isRightRail}>
						{/* Badge */}
						{preparedLink.meta && price ? (
							<BadgeLink type="title" action="price click" inline={!showDetails} events={props.events}>
								<span>${price}</span>
							</BadgeLink>
						) : (
							<BadgeLink inline={!showDetails} events={props.events}>
								<DealsBox24Icon />
							</BadgeLink>
						)}
						{/* Image */}
						{showDetails && (
							<CommerceInsetElement image>
								<CommerceLink type="image" action="image click" events={props.events}>
									{image ? (
										<LazyImageWrapper paddingBottom={paddingBottom} className="js_lazy-image">
											<LazyResponsiveImage
												id={image.id}
												width={image.width}
												height={image.height}
												format={imageFormatFromString(image.format || '')}
												sizes="180px"
												transform="CommerceInset"
											/>
										</LazyImageWrapper>
									) : (
										<DealsBox24Icon />
									)}
								</CommerceLink>
							</CommerceInsetElement>
						)}
						{/* Content */}
						<ContentWrapper>
							<CommerceInsetElement>
								{/* Headline */}
								{preparedLink.headline && (
									<CommerceInsetHeader responsive small={!showDetails}>
										<h2>
											<CommerceLink type="title" action="product title click'" events={props.events}>
												{truncate(preparedLink.headline, 65, { truncateLastWord: false })}
											</CommerceLink>
										</h2>
									</CommerceInsetHeader>
								)}
								{/* Byline */}
								<CommerceInsetByline>
									{preparedLink.provider && <ProviderName dangerouslySetInnerHTML={{
										__html: translate('From  <span>{provider}</span>', { provider: preparedLink.provider })
									}} />}
									{preparedLink.meta && preparedLink.meta.promocode && (
										<CommerceInsetPromocode>
											{translate('Use code {promocode}', { promocode: preparedLink.meta.promocode })}
										</CommerceInsetPromocode >
									)}
								</CommerceInsetByline>
								{/* Misc */}
								{showDetails && (
									<CommerceInsetMisc>
										{preparedLink.meta && preparedLink.meta.conversions && (
											<CommerceInsetSocialProof>
												{translate(`${preparedLink.meta.conversions} purchased by readers`)}
											</CommerceInsetSocialProof>
										)}
										<CommerceInsetDisc>
											{translate('G/O Media may get a commission')}
										</CommerceInsetDisc>
									</CommerceInsetMisc>
								)}
							</CommerceInsetElement>
						</ContentWrapper>
						{/* CTA */}
						{showDetails && (
							<CommerceInsetElement cta>
								<CommerceLink type="button" action="Add to Cart click" events={props.events}>
									<AmazonButton19
										label={buttonLabel}
										isRightRail={isRightRail}
									/>
								</CommerceLink>
							</CommerceInsetElement>
						)}
					</CommerceInset>
				</Wrapper>
			</EnsureDefaultTheme>
		);
	}
}

export default withKinjaMeta(CommerceLinkPreview);
