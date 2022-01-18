// @flow

import React from 'react';
import styled from 'styled-components';
import Theme from 'kinja-components/components/theme';
import SidebarImage, { Image16by9Container } from '../sidebar-image';
import MultipleAuthorsStatic from 'kinja-components/components/post-elements/multiple-authors-static';
import Link, { Anchor } from 'kinja-components/components/elements/link';
import LinkPreview from 'kinja-components/components/postbody/link-preview';
import Headline, { SimpleHeadline } from 'kinja-components/components/post-elements/headline/headline';
import createTranslate from 'kinja-components/components/translator';
import translations from './translations';
import type Blog from 'kinja-magma/models/Blog';
import type { Locale } from 'kinja-magma/models/Locale';
import type { PageType } from 'kinja-magma/models/PageType';
import type { CommerceModulePost } from './commerce-module-post';

const Header = styled.h3`
	padding-bottom: 3px;
	margin-bottom: 16px;
	font-size: 20px;
	line-height: 1.3;
	font-weight: 700;
	color: ${({ theme }) => theme.color.darksmoke};
	border-bottom: 1px solid ${({ theme }) => theme.color.lightgray};
`;

const CardWrapper = styled.div`
	${({ isLargeCommerceRail, theme }) => isLargeCommerceRail ? `
		border: 1px solid ${theme.color.commerce};
		padding: 10px 20px;
	` : `
		display: flex;

		> ${Anchor} {
			flex: 1 1 0%;
			float: left;
			max-width: 80px;
			margin-right: 15px;
		}
	`};
	margin-bottom: 16px;
	&:last-of-type {
		margin-bottom: 0;
	}

	${Anchor}:hover {
		color: inherit;
	}
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 2.162 1 0%;
`;

const Container = styled.div`
	width: 100%;

	${Image16by9Container} {
		${({ isLargeCommerceRail }) => isLargeCommerceRail ? '' : 'padding-bottom: 45px;'}
		margin-bottom: 12px;
	}

	${SimpleHeadline} {
		margin-bottom: 8px;
		font-size: 18px;
		line-height: 23px;
	}
`;

const AsSeenOn = styled.span`
	color: ${props => props.theme.color.commerce};
	font-size: 15px;
	font-weight: bold;
	text-transform: uppercase;
`;

const AsSeenOnWrapper = styled.div`
	margin: -45px 0 20px 20px;
`;


type Props = {
	blog: Blog,
	locale: Locale,
	pageType: PageType,
	posts: Array<CommerceModulePost>,
	isLargeCommerceRail: boolean,
	useAmazonLinks: boolean,
	newDesignA?: boolean,
	newDesignB?: boolean,
	newDesignShowPost?: boolean
}

export default function CommercePermalinkModule(props: Props) {
	const {
		blog,
		locale,
		pageType,
		posts,
		isLargeCommerceRail,
		useAmazonLinks,
		newDesignA,
		newDesignB,
		newDesignShowPost
	} = props;
	const translate = createTranslate(translations, locale);
	// this is needed for updating the amazon subtags in the post
	const kinjaSource = 'commercerecirc_permalink';
	if (posts.length < 1) { return (null);	}
	const CommerceItems = posts.map((postObj,i) => {
		const post = postObj.post;
		const authors = postObj.authors;
		const link = postObj.link;
		const securePermalinkWithSubtag = `${post.securePermalink}?ks=${kinjaSource}`;
		const customEvent = ['Popular commerce click', `position ${i}`, post.securePermalink];

		const hasLinkData = link && link.url;
		if (useAmazonLinks && hasLinkData) {
			if (post.amazonPrice) {
				link.meta.amazonPrice = post.amazonPrice;
			}

			if (post.amazonPromoCode) {
				link.meta.promocode = post.amazonPromoCode;
			}


			if (newDesignA || newDesignB) {
				let event = '';
				if (newDesignA) {
					event = 'Design A';
				} else {
					event = 'Design B';
				}

				if (newDesignShowPost) {
					event = event + ' with Post';
				}
				customEvent.push(event);
			}

			return (
				<React.Fragment key={post.id}>
					<LinkPreview
						style="CommerceCondensed"
						link={link}
						url={link.url}
						isRightRail={true}
						events={[customEvent]}
						newDesignA={newDesignA}
						newDesignB={newDesignB} />
					{newDesignShowPost && (
						<AsSeenOnWrapper>
							<AsSeenOn>As Seen on The Inventory</AsSeenOn>
							<Link href={securePermalinkWithSubtag} events={[customEvent]}>
								<Headline level={3} isExternalNativeAd={false}>{post.headline}</Headline>
							</Link>
						</AsSeenOnWrapper>
					)}
				</React.Fragment>
			);
		} else {
			return (
				<CardWrapper isLargeCommerceRail={isLargeCommerceRail} key={post.id}>
					<Link href={securePermalinkWithSubtag} events={[customEvent]}>
						<SidebarImage post={post} blogGroup={blog.blogGroup} />
					</Link>
					<ContentContainer>
						<Link href={securePermalinkWithSubtag} events={[customEvent]}>
							<Headline level={4} isExternalNativeAd={false}>{post.headline}</Headline>
						</Link>
						{!isLargeCommerceRail &&
							<span>
								<MultipleAuthorsStatic
									index={i}
									authors={authors}
									blog={blog}
									postPermalinkRedirect={post.securePermalink}
									postIsDeals={true}
									pageType={pageType}
									hideTime
								/>
							</span>
						}
					</ContentContainer>
				</CardWrapper>
			);
		}
	});

	return (
		<Theme blog={blog.blogTheme}>
			<Container isLargeCommerceRail={isLargeCommerceRail}>
				<Header>{translate('Popular Deals on The Inventory')}</Header>
				{CommerceItems}
			</Container>
		</Theme>
	);
}

CommercePermalinkModule.defaultProps = {
	locale: 'en-US'
};
