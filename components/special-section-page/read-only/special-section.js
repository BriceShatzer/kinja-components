/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import ImpactHeader from '../../impact-header';
import SpecialSectionStream from './special-section-stream';
import { LazyResponsiveImage } from '../../elements/image';
import { SpecialSectionTopAd, SpecialSectionBottomAd } from '../../ad-slot/ads';
import InlineAdContainer from '../../ad-slot/inline-ad-container';
import { RelatedStories } from '../../editor/related-stories';
import { EnsureDefaultTheme } from '../../theme';
import type { SpecialSectionProps } from '../types';
import { StoryItem } from '../../editor/related-stories/stories/relatedStoryItem';
import media from '../../../style-utils/media';
import Lunchbox from 'kinja-magma/models/Lunchbox';

const SpecialSectionContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	button,
	#Headline {
		font-family: ${props => props.theme.typography.headline.fontFamily};
	}

	p,
	#Paragraph {
		font-family: ${props => props.theme.typography.body.fontFamily};
	}
`;

export const SponsoredLogoWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20px 0;
	img {
		max-width: 280px;
	}
`;
const EditorialSectionHeading = styled.h3`
	color: ${({ theme }) => theme.color.darkgray};
	font-size: 22px;
	font-weight: normal;
	line-height: 1.3;
`;

export const RelatedStoriesContainer = styled.div`
	max-width: 1216px;
	margin: auto;
	padding: 48px 20px;
	${media.largeUp`
		padding: 48px;
	`}
	h6 {
		font-size: 20px;
		line-height: 1.2;
		margin: 10px 0 1px;
		text-rendering: optimizeLegibility;
	}
	${StoryItem} {
		/* override flex value to resize story items */
		flex: 0 1 100%;
		flex-direction: column;
		margin-bottom: 1.5em;
		img {
			width: 100%;
		}
		a:hover {
			color: ${({ theme }) => theme.color.black};
			text-decoration: underline;
		}
		${media.largeUp`
			flex: 0 1 31.5%;
			flex-direction: row;
		`}
	}
`;

export default function SpecialSection(props: SpecialSectionProps) {
	const { impactHeader, blog, customContent, editorialPosts, editorialSectionHeading, adsEnabled } = props;
	return (
		<EnsureDefaultTheme>
			<SpecialSectionContainer
				className="js_special-section"
				data-commerce-source={'specialsection'}
			>
				<div className="js_publishing-tools" />

				{impactHeader && impactHeader.media && <ImpactHeader impactHeader={impactHeader} title={blog ? blog.displayName : ''} />}
				{blog && blog.logo && (
					<SponsoredLogoWrapper>
						<LazyResponsiveImage id={blog.logo.id} noLazy />
					</SponsoredLogoWrapper>
				)}
				{adsEnabled && (
					<InlineAdContainer>
						<SpecialSectionTopAd />
					</InlineAdContainer>
				)}
				<section className="js_edit-region" />
				{customContent && customContent.length ? (
					<SpecialSectionStream
						customContent={customContent.map(lunchboxOrCuration => new Lunchbox({ ...lunchboxOrCuration, blogId: blog ? blog.id : undefined }))}
					/>
				) : null}
				{editorialPosts && editorialPosts.length ? (
					<RelatedStoriesContainer>
						{editorialSectionHeading && editorialSectionHeading.length && (
							<EditorialSectionHeading>{editorialSectionHeading}</EditorialSectionHeading>
						)}
						<RelatedStories
							stories={editorialPosts.map(post => {
								if (blog) {
									post.customKinjaId = blog.id;
								}
								return post;
							})}
							maxRows={8}
						/>
					</RelatedStoriesContainer>
				) : null}
				{adsEnabled && (
					<InlineAdContainer>
						<SpecialSectionBottomAd />
					</InlineAdContainer>
				)}
			</SpecialSectionContainer>
		</EnsureDefaultTheme>
	);
}
