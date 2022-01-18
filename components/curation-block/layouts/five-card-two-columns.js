// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import styled, { css } from 'styled-components';
import media from '../../../style-utils/media';
import { mediumDown } from '../../../style-utils/breakpoints';
import { gridValue } from '../../grid-utils';
import Card from '../cards/card';
import {
	HorizontalLayout,
	VerticalLayout,
	LargeFontSize,
	MediumFontSize,
	SmallFontSize,
	Separator
} from '../cards/card-styles';
import { SpaceBetweenBlocks, VerticalSeparatorElement } from './layout-styles';
import { ImageWrapper } from '../cards/components/image';
import { ReviewBadge, SmallSize, MediumSize, LargeSize } from 'kinja-components/components/review-score/review-score';
import type { TopHeader } from 'kinja-magma/models/CurationBlock';
import TopHeaderComponent from '../top-header';
import MobileOnlyAd, { MobileAdWrapper } from '../cards/components/mobile-only-ad';

type Props = {|
	posts: Array<Post | void>,
	header?: TopHeader,
	index: number
|};

const Layout = styled.div`
	margin-bottom: ${SpaceBetweenBlocks};

	${media.mediumDown`
		display: flex;
		flex-direction: column;
	`}
	${media.largeUp`
		display: grid;
		grid-auto-flow: dense;
	`}
	${media.largeOnly`
		/* 0 width colums are for VerticalSeparators */
		grid-template-columns: ${gridValue.large('5c')} 0 ${gridValue.large('3c')};
		grid-column-gap: ${gridValue.large('0.5g')};
	`}
	${media.xlargeOnly`
		grid-template-columns: ${gridValue.xlarge('6c')} 0 ${gridValue.xlarge('6c')};
		grid-column-gap: ${gridValue.xlarge('0.5g')};
	`}
	${media.xxlargeUp`
		grid-template-columns: ${gridValue.xxlarge('6c')} 0 ${gridValue.xxlarge('6c')};
		grid-column-gap: ${gridValue.xxlarge('0.5g')};
	`}

	${MobileAdWrapper} {
		order: 5;
		margin-top: 2rem;
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
	${media.mediumDown`
		${Separator('bottom', '1rem')}
	`}
	${media.largeOnly`
		${MediumFontSize}
		${Separator('bottom', '1rem')}
	`}
	${media.xlargeOnly`
		${MediumFontSize}
	`}
	${media.xlargeUp`
		grid-row: span 6;
	`}
	${media.xxlargeUp`
		${LargeFontSize}
	`}

	${ReviewBadge} {
		${media.xlargeDown`
			${MediumSize}
		`}
		${media.xxlargeUp`
			${LargeSize}
		`}
	}
`;

const SecondaryCard = styled(Card)`
	${media.mediumDown`
		${HorizontalLayout}
		${SmallFontSize}
		${props => props.index < 4 && css`
			${Separator('bottom', '1rem')}
		`};
		order: ${props => props.index};
	`}

	${media.xlargeOnly`
		${SmallFontSize}
	`}

	${media.xlargeUp`
		${HorizontalLayout}
		${props => props.index < 4 && css`
			${Separator('bottom', '1rem')}
		`};
		order: ${props => props.index};
	`}

	${media.xxlargeUp`
		${MediumFontSize}
	`}

	${ImageWrapper} {
		${media.smallOnly`
			width: ${gridValue.small('2c')};
			margin-right: ${gridValue.small('1g')};
		`}
		${media.mediumOnly`
			width: ${gridValue.medium('2c')};
			margin-right: ${gridValue.medium('1g')};
		`}
		${media.xlargeOnly`
			width: ${gridValue.xlarge('2c')};
			margin-right: 12px;
		`}
		${media.xxlargeUp`
			width: ${gridValue.xxlarge('2c')};
			margin-right: 12px;
		`}
	}
`;

const LeadTabletColumn = styled.div`
	${media.mediumDown`
		display: contents;
	`}

	${media.xlargeUp`
		display: contents;
	`}

	${SecondaryCard} {
		${media.largeOnly`
			${HorizontalLayout}
			${SmallFontSize}

			&:not(:last-child) {
				${Separator('bottom', '1rem')}
			}
		`}

		${ImageWrapper} {
			${media.largeOnly`
				width: ${gridValue.large('2c')};
				margin-right: 12px;
			`}
		}

		${ReviewBadge} {
			${media.xlargeDown`
				${SmallSize}
			`}
			${media.xxlargeUp`
				${MediumSize}
			`}
		}
	}
`;

const SecondaryTabletColumn = styled.div`
	${media.mediumDown`
		display: contents;
	`}

	${media.xlargeUp`
		display: contents;
	`}

	${SecondaryCard} {
		${media.largeOnly`
			${VerticalLayout}
			${SmallFontSize}

			&:not(:last-child) {
				${Separator('bottom', '1rem')}
			}
		`}
	}

	${ReviewBadge} {
		${media.mediumDown`
			${SmallSize}
		`}
		${media.largeOnly`
			${MediumSize}
		`}
		${media.xlargeOnly`
			${SmallSize}
		`}
		${media.xxlargeUp`
			${MediumSize}
		`}
	}
`;

const VerticalSeparator = styled(VerticalSeparatorElement)`
	${media.xlargeUp`
		grid-row: span 6;
	`}
`;


const secondaryCardsImageSizes = `${mediumDown} 320px, 470px`;

export default function FiveCardTwoColumn(props: Props) {
	const { posts, header, index } = props;
	return (
		<section>
			{header && (
				<TopHeaderComponent
					header={header}
				/>
			)}
			<Layout>
				<LeadTabletColumn>
					<LeadCard
						post={posts[0]}
						showExcerpt
						blockIndex={index}
						index={0}
						imageSizes={'800px'}
					/>
					<SecondaryCard
						post={posts[3]}
						blockIndex={index}
						index={3}
						imageSizes={secondaryCardsImageSizes}
					/>
					<SecondaryCard
						post={posts[4]}
						blockIndex={index}
						index={4}
						imageSizes={secondaryCardsImageSizes}
					/>
				</LeadTabletColumn>
				<VerticalSeparator/>
				<SecondaryTabletColumn>
					<SecondaryCard
						post={posts[1]}
						blockIndex={index}
						index={1}
						imageSizes={secondaryCardsImageSizes}
					/>
					<SecondaryCard
						post={posts[2]}
						blockIndex={index}
						index={2}
						imageSizes={secondaryCardsImageSizes}
					/>
				</SecondaryTabletColumn>
				<MobileOnlyAd />
			</Layout>
		</section>
	);
}