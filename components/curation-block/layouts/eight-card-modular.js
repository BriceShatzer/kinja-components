// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import styled from 'styled-components';
import media from '../../../style-utils/media';
import { mediumDown } from '../../../style-utils/breakpoints';
import { gridValue } from '../../grid-utils';
import Card from '../cards/card';
import { CardContainer } from '../cards/static-card';
import {
	VerticalLayout,
	HorizontalLayout,
	ImageOnTheRight,
	LargeFontSize,
	MediumFontSize,
	SmallFontSize,
	Separator
} from '../cards/card-styles';
import {
	VerticalSeparatorElement,
	SixThreeThreeGrid,
	OverhangBackground
} from './layout-styles';
import type { TopHeader } from 'kinja-magma/models/CurationBlock';
import TopHeaderComponent from '../top-header';
import { CardImageWrapper as StaticCardImageWrapper } from '../cards/static-card';
import { CardImageWrapper as EditableCardImageWrapper } from '../cards/editable-card';
import { ReviewBadge, SmallSize, MediumSize, LargeSize } from 'kinja-components/components/review-score/review-score';
import MobileOnlyAd from '../cards/components/mobile-only-ad';

type Props = {|
	posts: Array<Post | void>,
	header?: TopHeader,
	index: number
|}

const SideColumn = styled.div`
	${media.xlargeUp`
		grid-row: span 3;
	`}

	${CardContainer} {
		${VerticalLayout}
		${SmallFontSize}
		&:not(:last-child) {
			${Separator('bottom', '1rem')};
		}
	}
`;

const TextColumn = styled(SideColumn)`
	${media.mediumDown`
		${CardContainer}:last-child {
			${Separator('bottom', '1rem')};
		}
	`}
	${media.largeOnly`
		grid-row: span 9;
	`}
	${media.largeUp`
		grid-column: 3 / 4;
	`}
`;

const ImageColumn = styled(SideColumn)`
	${media.largeOnly`
		grid-column: 1 / 2;
		grid-row: span 8;
	`}

	${media.xlargeUp`
		grid-column: 5 / 6;
	`}

	${media.xlargeDown`
		${ReviewBadge} {
			${SmallSize}
		}
	`}

	${CardContainer} {
		${media.largeDown`
			${HorizontalLayout}
		`}

		${media.xlargeUp`
			${VerticalLayout}
		`}
	}

	${StaticCardImageWrapper},
	${EditableCardImageWrapper} {
		${media.smallOnly`
			width: ${gridValue.small('2c')};
			margin-right: ${gridValue.small('1g')};
		`}

		${media.mediumOnly`
			width: ${gridValue.medium('2c')};
			margin-right: ${gridValue.medium('1g')};
		`}

		${media.largeOnly`
			width: ${gridValue.large('2c')};
			margin-right: 12px;
		`}
	}
`;

const LeadCard = styled(Card)`
	${VerticalLayout}

	${media.smallOnly`
		${SmallFontSize}
	`}

	${media.mediumOnly`
		${MediumFontSize}
	`}

	${media.largeDown`
		${Separator('bottom', '1rem')}
	`}

	${media.largeOnly`
		grid-row: span 4;
		${MediumFontSize}
	`}

	${media.largeUp`
		grid-column: 1 / 2;
	`}

	${media.xlargeUp`
		${Separator('bottom', '1.5rem')}
	`}

	${media.xlargeOnly`
		${MediumFontSize}
	`}

	${media.xxlargeUp`
		${LargeFontSize}

		${ReviewBadge} {
			${LargeSize}
		}
	`}
`;

const SecondStory = styled(Card)`
	${media.mediumDown`
		${HorizontalLayout}
	`}

	${media.largeDown`
		${Separator('bottom', '1rem')}
	`}

	${media.largeOnly`
		grid-column: 3 / 4;
		grid-row: span 3;
		${VerticalLayout}
	`}

	${media.xlargeUp`
		${HorizontalLayout}
		${ImageOnTheRight}
		grid-column: 1 / 2;
		order: 2;
	`}

	${media.xlargeDown`
		${SmallFontSize}

		${ReviewBadge} {
			${SmallSize}
		}
	`}

	${media.xxlargeUp`
		${MediumFontSize}

		${ReviewBadge} {
			${MediumSize}
		}
	`}

	${StaticCardImageWrapper},
	${EditableCardImageWrapper} {
		${media.smallOnly`
			width: ${gridValue.small('2c')};
			margin-right: ${gridValue.small('1g')};
		`}

		${media.mediumOnly`
			width: ${gridValue.medium('2c')};
			margin-right: ${gridValue.medium('1g')};
		`}

		${media.xlargeOnly`
			width: ${gridValue.xlarge('3c')};
			margin-left: 12px;
		`}

		${media.xxlargeUp`
			width: ${gridValue.xxlarge('3c')};
			margin-left: 16px;
		`}
	}
`;

const DesktopVerticalSeparator = styled(VerticalSeparatorElement)`
	grid-row: span 3;
	${media.largeDown`
		display: none;
	`}
`;

const TabletVerticalSeparator = styled(VerticalSeparatorElement)`
	${media.mediumDown`
		display: none;
	`}
	${media.largeOnly`
		grid-row: span 12;
	`}
	${media.xlargeUp`
		grid-row: span 3;
	`}
`;

const secondaryCardsImageSizes = `${mediumDown} 320px, 470px`;

export default function EightCardModular(props: Props) {
	const { posts, header, index } = props;
	return (
		<OverhangBackground>
			{header && (
				<TopHeaderComponent
					header={header}
				/>
			)}
			<SixThreeThreeGrid>
				<LeadCard
					post={posts[0]}
					showExcerpt
					blockIndex={index}
					index={0}
					imageSizes={'800px'}
				/>
				<SecondStory
					post={posts[1]}
					blockIndex={index}
					index={1}
					imageSizes={secondaryCardsImageSizes}
				/>
				<MobileOnlyAd />
				<TabletVerticalSeparator/>
				<TextColumn>
					<Card
						post={posts[2]}
						showThumbnail={false}
						showExcerpt
						blockIndex={index}
						index={2}
					/>
					<Card
						post={posts[3]}
						showThumbnail={false}
						showExcerpt
						blockIndex={index}
						index={3}
					/>
					<Card
						post={posts[4]}
						showThumbnail={false}
						showExcerpt
						blockIndex={index}
						index={4}
					/>
				</TextColumn>
				<DesktopVerticalSeparator/>
				<ImageColumn>
					<Card
						post={posts[5]}
						blockIndex={index}
						index={5}
						imageSizes={secondaryCardsImageSizes}
					/>
					<Card
						post={posts[6]}
						blockIndex={index}
						index={6}
						imageSizes={secondaryCardsImageSizes}
					/>
					<Card
						post={posts[7]}
						blockIndex={index}
						index={7}
						imageSizes={secondaryCardsImageSizes}
					/>
				</ImageColumn>
			</SixThreeThreeGrid>
		</OverhangBackground>
	);
}
