// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import styled from 'styled-components';
import media from '../../../style-utils/media';
import { gridValue } from '../../grid-utils';
import { CardContainer } from '../cards/static-card';
import {
	VerticalLayout,
	HorizontalLayout,
	SmallFontSize,
	MediumFontSize,
	LargeFontSize,
	Separator
} from '../cards/card-styles';
import {
	VerticalSeparatorElement,
	SixThreeThreeGrid,
	SpaceBetweenBlocks,
	OverhangBackground
} from './layout-styles';
import type { TopHeader } from 'kinja-magma/models/CurationBlock';
import type StoryType from 'kinja-magma/models/StoryType';
import type { Category } from 'kinja-components/components/review/types';
import { ImageWrapper } from '../cards/components/image';
import { ReviewBadge, SmallSize, LargeSize } from 'kinja-components/components/review-score/review-score';
import List from './list';
import { Header } from '../top-header';
import MobileOnlyAd from '../cards/components/mobile-only-ad';

type Props = {|
	posts: Array<Post | void>,
	header?: TopHeader,
	category?: Category,
	storyType?: StoryType,
	index: number,
	showThumbnails?: boolean,
	showExcerpts?: boolean,
	showAuthors?: boolean
|}

const LeadList = styled(List)`
	${media.mediumDown`
		margin-bottom: ${SpaceBetweenBlocks};
	`}

	${CardContainer}:first-of-type {
		${VerticalLayout}

		${media.smallOnly`
			${SmallFontSize}
		`}
		${media.mediumOnly`
			${MediumFontSize}
		`}
		${media.largeOnly`
			${MediumFontSize}
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
	}

	${CardContainer}:not(:first-of-type) {
		${HorizontalLayout}

		${media.xlargeDown`
			${SmallFontSize}
		`}

		${media.xxlargeUp`
			${MediumFontSize}
		`}

		${ReviewBadge} {
			${SmallSize}
		}

		${ImageWrapper} {
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
			${media.xlargeOnly`
				width: ${gridValue.xlarge('2c')};
				margin-right: 12px;
			`}
			${media.xxlargeUp`
				width: ${gridValue.xxlarge('2c')};
				margin-right: 16px;
			`}
		}
	}
`;

const NewsList = styled(List)`
	${media.largeOnly`
		order: -1;
		grid-column-start: 3;
	`}

	${CardContainer} {
		${SmallFontSize}
		${media.largeDown`
			${HorizontalLayout}
		`}
		${media.xlargeUp`
			${VerticalLayout}
		`}
	}

	${ImageWrapper} {
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

const ReviewsList = styled(List)`
	${media.largeOnly`
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		margin-top: ${SpaceBetweenBlocks}
	`}

	${Header} {
		flex: 100%;
	}

	${media.mediumDown`
		${ReviewBadge} {
			${SmallSize}
		}
	`}
	
	${CardContainer} {
		${SmallFontSize}
		${media.mediumDown`
			${HorizontalLayout}
			&:not(:last-child) {
				${Separator('bottom', '1rem')}
			}
		`}
		${media.largeUp`
			${VerticalLayout}
		`}
		${media.largeOnly`
			flex: 1;
			&:not(:last-child) {
				${Separator('right', gridValue.large('0.5g'))}
			}
		`}
		${media.xlargeUp`
			&:not(:last-child) {
				${Separator('bottom', '1rem')}
			}
		`}
	}

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

export default function SixCardModularWithLatest(props: Props) {
	const { posts, index } = props;
	return (
		<OverhangBackground>
			<SixThreeThreeGrid>
				<LeadList
					index={index}
					posts={posts.slice(0, 3)}
					showExcerpts={[true, false, false]}
					header={{ title: 'Features' }}
					hasMainImage={true}
				/>
				<MobileOnlyAd />
				<VerticalSeparatorElement/>
				<ReviewsList
					index={index}
					cardIndexStart={3}
					posts={posts.slice(3, 6)}
					header={{ title: 'Reviews' }}
					hasMainImage={false}
					showSeparators={false}
				/>
				<VerticalSeparatorElement/>
				<NewsList
					index={index}
					cardIndexStart={6}
					posts={posts.slice(6, 13)}
					showThumbnails={false}
					showAuthors={false}
					showPublishTimes
					header={{
						title: 'News',
						customHeaderLink: {
							url: 'https://www.avclub.com/latest',
							text: 'View all'
						}
					}}
				/>
			</SixThreeThreeGrid>
		</OverhangBackground>
	);
}