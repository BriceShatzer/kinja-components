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
import {
	VerticalSeparatorElement,
	SixThreeThreeGrid
} from './layout-styles';
import { ImageWrapper } from '../cards/components/image';
import type { TopHeader } from 'kinja-magma/models/CurationBlock';
import TopHeaderComponent from '../top-header';
import { ReviewBadge, SmallSize, LargeSize } from 'kinja-components/components/review-score/review-score';
import { OverhangBackground } from 'kinja-components/components/curation-block/layouts/layout-styles';

type Props = {|
	posts: Array<Post | void>,
	header?: TopHeader,
	index: number
|}

export const Container = styled(SixThreeThreeGrid)`
	${media.mediumDown`
		display: flex;
		flex-direction: column;
	`}
`;

export const LeadCard = styled(Card)`
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
		grid-row: span 2;
	`}
	${media.xxlargeUp`
		${LargeFontSize}

		${ReviewBadge} {
			${LargeSize}
		}
	`}
`;

export const SecondaryCard = styled(Card)`
	${SmallFontSize}

	${media.mediumDown`
		${HorizontalLayout}
		order: ${props => props.index};

		&:not(:last-of-type) {
			${Separator('bottom', '1rem')};
		}

		${ReviewBadge} {
			${SmallSize}
		}
	`}

	${media.largeOnly`
		${VerticalLayout}
	`}

	${media.xlargeUp`
		${VerticalLayout}
		order: ${props => props.index};
		
		${props => !props.showExcerpt && props.index < 3 && css`
			${Separator('bottom', '1rem')}
		`};

		${props => props.showExcerpt && css`
			grid-row: span 2;
		`};
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
	}
`;

export const LeadTabletColumn = styled.div`
	${media.mediumDown`
		display: contents;
	`}

	${media.largeOnly`
		${SecondaryCard} {
			${HorizontalLayout}
			${ImageWrapper} {
				width: ${gridValue.large('2c')};
				margin-right: 12px;
			}
			&:not(:last-child) {
				${Separator('bottom', '1rem')}
			}
		}
	`}

	${media.xlargeUp`
		display: contents;
	`}
`;

export const SecondaryTabletColumn = styled.div`
	${media.mediumDown`
		display: contents;
		${SecondaryCard}:last-child {
			${Separator('bottom', '1rem')}
		}
	`}

	${media.largeOnly`
		${SecondaryCard}:not(:last-child) {
			${Separator('bottom', '1rem')}
		}
	`}

	${media.xlargeUp`
		display: contents;
	`}
`;

export const DesktopVerticalSeparator = styled(VerticalSeparatorElement)`
	${media.largeDown`
		display: none;
	`}

	${media.xlargeUp`
		grid-row: span 2;
		order: 1;
	`}
`;

export const TabletVerticalSeparator = styled(VerticalSeparatorElement)`
	${media.mediumDown`
		display: none;
	`}

	${media.xlargeUp`
		grid-row: span 2;
		order: ${props => props.order};
	`}
`;

export const secondaryCardsImageSizes = `${mediumDown} 320px, 470px`;

export default function FourCardModular(props: Props) {
	const { posts, header, index } = props;
	return (
		<OverhangBackground>
			{header && (
				<TopHeaderComponent
					header={header}
				/>
			)}
			<Container>
				<LeadTabletColumn>
					<LeadCard
						post={posts[0]}
						showExcerpt
						blockIndex={index}
						index={0}
						imageSizes={'800px'}
					/>
					<SecondaryCard
						post={posts[1]}
						blockIndex={index}
						index={1}
						imageSizes={secondaryCardsImageSizes}
					/>
					<SecondaryCard
						post={posts[3]}
						blockIndex={index}
						index={3}
						imageSizes={secondaryCardsImageSizes}
					/>
				</LeadTabletColumn>
				<TabletVerticalSeparator order={0} />
				<SecondaryTabletColumn>
					<DesktopVerticalSeparator/>
					<SecondaryCard
						post={posts[2]}
						blockIndex={index}
						showExcerpt
						index={2}
						imageSizes={secondaryCardsImageSizes}
					/>
				</SecondaryTabletColumn>
			</Container>
		</OverhangBackground>
	);
}