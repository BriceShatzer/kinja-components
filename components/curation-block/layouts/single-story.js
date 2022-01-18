// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import styled from 'styled-components';
import media from '../../../style-utils/media';
import { gridValue } from '../../grid-utils';
import Card from '../cards/card';
import {
	HorizontalLayout,
	VerticalLayout,
	ImageOnTheRight,
	LargeFontSize,
	MediumFontSize,
	SmallFontSize
} from '../cards/card-styles';
import { SpaceBetweenBlocks, OverhangBackground } from './layout-styles';
import type { TopHeader } from 'kinja-magma/models/CurationBlock';
import TopHeaderComponent from '../top-header';
import { CardImageWrapper as StaticCardImageWrapper } from '../cards/static-card';
import { CardImageWrapper as EditableCardImageWrapper } from '../cards/editable-card';
import { ReviewBadge, LargeSize } from 'kinja-components/components/review-score/review-score';

type Props = {|
	post: ?Post,
	header?: TopHeader,
	index: number
|}

const SingleStoryCard = styled(Card)`
	margin-bottom: ${SpaceBetweenBlocks};

	${media.smallOnly`
		${SmallFontSize}
	`}

	${media.mediumOnly`
		${MediumFontSize}
	`}

	${media.mediumDown`
		${VerticalLayout}
	`}

	${media.largeUp`
		${HorizontalLayout}
		${ImageOnTheRight}
		align-items: center;
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

	${StaticCardImageWrapper},
	${EditableCardImageWrapper} {
		${media.largeOnly`
			width: ${gridValue.large('5c')};
			margin-left: ${gridValue.large('1g')};
		`}
		${media.xlargeOnly`
			width: ${gridValue.xlarge('8c')};
			margin-left: ${gridValue.xlarge('1g')};
		`}
		${media.xxlargeUp`
			width: ${gridValue.xxlarge('8c')};
			margin-left: ${gridValue.xxlarge('1g')};
		`}
	}
`;

export default function SingleStory(props: Props) {
	const { post, header, index } = props;
	return (
		<OverhangBackground>
			{header && (
				<TopHeaderComponent
					header={header}
				/>
			)}
			<SingleStoryCard
				post={post}
				blockIndex={index}
				index={0}
				showExcerpt
			/>
		</OverhangBackground>
	);
}