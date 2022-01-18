// @flow

import * as React from 'react';
import { type Video } from 'kinja-mantle/module/video/videoRequest';
import styled from 'styled-components';
import media from '../../style-utils/media';
import { gridValue } from '../grid-utils';
import VideoCard from './cards/video-card';
import { CardContainer } from './cards/static-card';
import {
	HorizontalLayout,
	VerticalLayout,
	LargeFontSize,
	MediumFontSize,
	SmallFontSize,
	Separator
} from './cards/card-styles';
import {
	VerticalSeparatorElement,
	SpaceBetweenBlocks,
	OverhangBackground
} from './layouts/layout-styles';
import type { TopHeader } from 'kinja-magma/models/CurationBlock';
import type StoryType from 'kinja-magma/models/StoryType';
import type { Category } from 'kinja-components/components/review/types';
import { Header, HeaderLink, ShowAllLink, ShortLinkText, LongLinkText } from './top-header';
import { Wrapper as VideoThumbnail } from 'kinja-components/components/video-thumbnail/video-thumbnail';
import { LeftTopAd } from 'kinja-components/components/ad-slot/ads';

type Props = {|
	videos: Array<Video>,
	header?: TopHeader,
	category?: Category,
	storyType?: StoryType,
	editMode?: boolean
|}

const SectionWrapper = styled.section`
	${({ editMode }) => editMode && `
		pointer-events: none;
	`}
`;

const Layout = styled.div`
	margin-bottom: ${SpaceBetweenBlocks};

	${({ editMode }) => editMode && `
		opacity: 0.4;
	`}

	${media.xlargeUp`
		display: flex;
	`}
`;

const LeadVideo = styled(VideoCard)`
	${VerticalLayout}

	${media.mediumDown`
		${SmallFontSize}
	`}

	${media.largeDown`
		${Separator('bottom', '1rem')}
	`}

	${media.largeOnly`
		${LargeFontSize}
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('7c')};
		${Separator('right', gridValue.xlarge('0.5g'))};
	`}

	${media.xlargeUp`
		${MediumFontSize}
		flex-shrink: 0;
	`}

	${media.xxlargeUp`
		width: ${gridValue.xxlarge('5c')};
		${Separator('right', gridValue.xxlarge('0.5g'))};
	`}
`;

const SecondaryGrid = styled.div`
	${media.largeOnly`
		display: flex;
		align-items: stretch;
	`}

	${media.xxlargeUp`
		${Separator('right', gridValue.xxlarge('0.5g'))};
	`}

	${CardContainer} {
		${SmallFontSize}

		${media.smallOnly`
			${HorizontalLayout}
			flex-wrap: inherit;

			${VideoThumbnail} {
				width: ${gridValue.small('2c')};
				margin-right: ${gridValue.small('1g')};
			}
		`}

		${media.mediumOnly`
			${HorizontalLayout}
			flex-wrap: inherit;

			${VideoThumbnail} {
				width: ${gridValue.medium('2c')};
				margin-right: ${gridValue.medium('1g')};
			}
		`}

		${media.mediumDown`
			&:not(:last-child) {
				${Separator('bottom', '1rem')}
			}
		`}

		${media.largeOnly`
			${VerticalLayout}
			width: 33%;
		`}

		${media.xlargeOnly`
			${HorizontalLayout}
			flex-wrap: inherit;

			${VideoThumbnail} {
				width: ${gridValue.xlarge('2c')};
				margin-right: 12px;
			}
		`}

		${media.xlargeUp`
			&:not(:last-child) {
				${Separator('bottom', '1rem')}
			}
		`}

		${media.xxlargeUp`
			${HorizontalLayout}
			flex-wrap: inherit;

			${VideoThumbnail} {
				width: ${gridValue.xxlarge('2c')};
				margin-right: 12px;
			}
		`}
	}

	${VerticalSeparatorElement} {
		height: auto;
		margin: 0 ${gridValue.medium('1g')};
	}
`;

const AdColumn = styled.div`
	${media.xlargeDown`
		display: none;
	`}

	${media.xxlargeUp`
		width: ${gridValue.xxlarge('3c')};
		flex-shrink: 0;
	`}
`;

export default function Videos(props: Props) {
	const { videos, category, storyType, editMode } = props;
	const defaultVideoPageUrl = '/c/video';
	let categoryUrl;
	let storyTypeUrl;

	// Video blocks with explicit category/story type info should use one of those URLs,
	// but the default is '/c/video'
	if (category) {
		categoryUrl = `/c/${category.canonicalName}`;
	}
	if (storyType) {
		storyTypeUrl = `/c/${storyType.canonical}`;
	}

	return (
		<OverhangBackground>
			<SectionWrapper editMode={editMode}>
				<Header editMode={editMode}>
					<h2>
						<HeaderLink href={storyTypeUrl || categoryUrl || defaultVideoPageUrl}>Videos</HeaderLink>
					</h2>
					<ShowAllLink href={storyTypeUrl || categoryUrl || defaultVideoPageUrl}>
						<ShortLinkText>Show all</ShortLinkText>
						<LongLinkText>Show all videos</LongLinkText>
					</ShowAllLink>
				</Header>
				<Layout editMode={editMode}>
					<LeadVideo video={videos[0]} />
					<SecondaryGrid>
						<VideoCard video={videos[1]} thumbnailOnly />
						<VerticalSeparatorElement/>
						<VideoCard video={videos[2]} thumbnailOnly />
						<VerticalSeparatorElement/>
						<VideoCard video={videos[3]} thumbnailOnly />
					</SecondaryGrid>
					<AdColumn>
						<LeftTopAd/>
					</AdColumn>
				</Layout>
			</SectionWrapper>
		</OverhangBackground>
	);
}
