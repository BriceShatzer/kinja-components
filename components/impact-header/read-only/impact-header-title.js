/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import media from '../../../style-utils/media';
import FeaturedPermalinkStoryType from '../../featured-permalink-storytype';
import Link from '../../elements/link';
import { ImpactHeaderTitleAlignments, ImpactHeaderTitleOverlays } from '../consts';

import type StoryType from 'kinja-magma/models/StoryType';
import type TypedTagData from 'kinja-magma/models/TypedTagData';
import type { ImpactHeaderOverlay, ImpactTitleAlignment } from 'postbody/blockNodes/ImpactHeader';

const getTitleAlignment = titleAlignment => {
	switch (titleAlignment) {
		case ImpactHeaderTitleAlignments.Left: {
			return 'align-items: flex-start; left: 40px; text-align: left;';
		}
		case ImpactHeaderTitleAlignments.Right: {
			return 'align-items: flex-end; right: 40px; text-align: right;';
		}
		case ImpactHeaderTitleAlignments.CenterBottom: {
			return;
		}
		case ImpactHeaderTitleAlignments.CenterCenter: {
			return 'bottom: auto; text-align: center;';
		}
		case ImpactHeaderTitleAlignments.Below: {
			return 'width: 100%;';
		}
		default: {
			return;
		}
	}
};

const getColor = ({ overlay, theme }) => {
	return overlay === ImpactHeaderTitleOverlays.Black ? theme.color.white : theme.color.black;
};

// base class for impact header title wrapper that includes media queries
const TitleWrapper = styled.div`
	h1 {
		line-height: 1.1;
		margin: 0 auto;
		max-width: 1180px;
		padding: 0;
		width: 100%;
		font-size: 10vw;
		font-weight: 800;
	}
	${media.mediumUp`
		h1 {
			font-size: 7vw;
		}
	`}
	${media.xlargeUp`
		h1 {
			font-size: 4.5vw;
		}
	`}
`;

// the title wrapper for all layouts except the title below
const ImpactHeaderTitleWrapper = styled(TitleWrapper)`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0;
	pointer-events: auto;
	position: relative;
	text-align: center;
	width: 90%;
	z-index: 10;

	a {
		color: ${getColor};
		&:hover {
			color: ${getColor};
		}
		h1 {
			color: inherit;
		}
	}

	${media.mediumUp`
		bottom: 40px;
		position: ${({ titleAlignment }) => (titleAlignment === ImpactHeaderTitleAlignments.CenterCenter ? 'relative' : 'absolute')};
		width: 80%;
		${({ titleAlignment }) => getTitleAlignment(titleAlignment)}
	`}
	${media.largeUp`
		bottom: 45px;
		width: 62%;
	`}
`;

const ImpactHeaderBelowTitleWrapper = styled(TitleWrapper)`
	margin-top: 40px;
	position: relative;
	text-align: center;
	width: 100%;
	h1 {
		color: ${({ theme }) => theme.color.black};
	}
`;

const FeaturedPostSponsoredLabel = styled.div`
	color: ${({ theme }) => theme.color.gray};
	font-size: 13px;
	text-transform: uppercase;
`;

type ImpactHeaderTitleProps = {
	isPromoted?: boolean,
	isSponsored?: boolean,
	overlay: ImpactHeaderOverlay,
	permalink?: string,
	permalinkHost?: string,
	storyType?: ?StoryType,
	categoryData: ?TypedTagData,
	subcategoryData: ?TypedTagData,
	title: ?string,
	titleAlignment: ImpactTitleAlignment
};

const ImpactHeaderTitle = (props: ImpactHeaderTitleProps) => {
	const { title, isPromoted, isSponsored, storyType, permalink, permalinkHost,
		titleAlignment, overlay, categoryData, subcategoryData } = props;
	const WrapperComponent = titleAlignment === ImpactHeaderTitleAlignments.Below ? ImpactHeaderBelowTitleWrapper : ImpactHeaderTitleWrapper;
	return (
		<WrapperComponent titleAlignment={titleAlignment} overlay={overlay}>
			{isSponsored && <FeaturedPostSponsoredLabel>Sponsored</FeaturedPostSponsoredLabel>}
			{storyType && permalinkHost &&
				<FeaturedPermalinkStoryType
					permalinkHost={permalinkHost}
					storyType={storyType}
					categoryData={categoryData}
					subcategoryData={subcategoryData}
					background={overlay}
				/>
			}
			{permalink ? (
				<Link href={permalink} rel={isPromoted ? 'nofollow' : undefined}>
					<h1 dangerouslySetInnerHTML={{ __html: title }} />
				</Link>
			) : (
				<h1 dangerouslySetInnerHTML={{ __html: title }} />
			)}
		</WrapperComponent>
	);
};

export default ImpactHeaderTitle;
