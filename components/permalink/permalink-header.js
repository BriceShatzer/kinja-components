// @flow

import * as React from 'react';
import styled from 'styled-components';

import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';

import Headline from '../post-elements/headline/permalink-headline';
import PermalinkStoryType from './permalink-storytype';
import FeaturedHeader from 'kinja-components/components/featured-header';
import MagazineHeader from 'kinja-components/components/magazine-header';
import ImpactHeader from 'kinja-components/components/impact-header';
import media from 'kinja-components/style-utils/media';
import {SectionSponsorshipAd} from 'kinja-components/components/ad-slot/ads';
import SponsoredLabel from 'kinja-components/components/post-elements/sponsored-label';
import ImpactHeaderBlocknode from 'postbody/blockNodes/ImpactHeader';
import DraftNotification from './draft-notification';
import { parseFeaturedMedia } from 'postbody/BlockNode';

type PermalinkHeaderProps = {
	starterPost: Post,
	blog: Blog,
	isSecondScroll?: boolean,
	isPostDraftRoute?: boolean,
	isDraft?: ?boolean,
	wideRail?: boolean,
	featuredVideo?: ?VideoMeta,
	sponsorBadge?: boolean
};

const SponsoredLine = styled.div`
	margin-bottom: 10px;
`;

const PermalinkHeaderWrapper = styled.div`
	div[data-ad-unit="SECTION_SPONSORSHIP"] {
		float: right;
		${media.xlargeUp`
			padding-left: 1rem;
		`}
	}
	${media.largeDown`
		display: flex;
		flex-direction: column;

		${SponsoredLine}{ order: 1; }
		.permalink-story-type{ order: 2; }
		div[data-ad-unit="SECTION_SPONSORSHIP"]{ order: 3; padding:0.5rem 0 1rem; }
		header{ order: 4; }
	`}
`;

const PermalinkHeader = ({
	starterPost,
	blog,
	isSecondScroll,
	isDraft,
	wideRail,
	featuredVideo,
	sponsorBadge
}: PermalinkHeaderProps) => {

	const {
		permalinkPath,
		permalinkHost,
		formattedHeadline: headline,
		featuredMedia,
		isVideo,
		storyType,
		isFeatured,
		featuredHeaderLayout,
		impactHeader,
		sponsored,
		categoryData,
		subcategoryData
	} = starterPost;

	const isFeaturedHeader = Boolean(starterPost && isFeatured && headline);
	const permalink = permalinkHost && permalinkPath ? `${permalinkHost}${permalinkPath}` : '';

	if (!isFeaturedHeader) {
		return (
			<React.Fragment>
				{isDraft && <DraftNotification
					locale={blog.locale}
					isScheduled={starterPost.status === 'SCHEDULED'}
					publishTime={starterPost.publishTimeMillis || 0}
					timezone={blog.timezone}
				/>}
				<PermalinkHeaderWrapper>
					{sponsored && <SponsoredLine>
						<SponsoredLabel
							isEditorial={starterPost.editorial}
							isBranded={blog.isSatire}
							locale={blog && blog.locale}
						/>
					</SponsoredLine>}
					{sponsorBadge && <SectionSponsorshipAd />}
					{storyType && <PermalinkStoryType
						className={'permalink-story-type'}
						permalinkHost={permalinkHost}
						subcategoryData={subcategoryData}
						categoryData={categoryData}
						storyType={storyType}
					/>}
					{headline && <Headline
						isVideo={isVideo}
						isSecondScroll={isSecondScroll}
						headline={headline}
						permalink={permalink}
						wideRail={wideRail}
					/>}
				</PermalinkHeaderWrapper>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			{isDraft && <DraftNotification
				locale={blog.locale}
				isScheduled={starterPost.status === 'SCHEDULED'}
				publishTime={starterPost.publishTimeMillis || 0}
				timezone={blog.timezone}
			/>}
			{isFeaturedHeader && (featuredHeaderLayout === 'Default' || !featuredHeaderLayout) && <FeaturedHeader title={headline} featuredMedia={featuredMedia}
				permalinkHost={permalinkHost} permalink={permalink} storyTypeProperties={storyType} isSponsored={sponsored}
				subcategoryData={subcategoryData} categoryData={categoryData}
				featuredVideo={featuredVideo}
			/>}
			{isFeaturedHeader && featuredHeaderLayout === 'Magazine' && <MagazineHeader title={headline} featuredMedia={featuredMedia}
				permalinkHost={permalinkHost} permalink={permalink} storyTypeProperties={storyType} isSponsored={sponsored}
				subcategoryData={subcategoryData} categoryData={categoryData}
			/>}
			{isFeaturedHeader && featuredMedia && impactHeader && featuredHeaderLayout === 'Impact' &&
				<ImpactHeader
					impactHeader={
						new ImpactHeaderBlocknode({
							media: parseFeaturedMedia(featuredMedia),
							overlay: impactHeader.overlay,
							titleAlignment: impactHeader.titleAlignment
						})
					}
					isPromoted={false}
					isSponsored={sponsored}
					permalink={permalink}
					permalinkHost={permalinkHost}
					title={headline}
					storyType={storyType}
					categoryData={categoryData}
					subcategoryData={subcategoryData}
				/>}
		</React.Fragment>
	);
};

export default PermalinkHeader;
