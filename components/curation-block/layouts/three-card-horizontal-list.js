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
	SmallFontSize,
	Separator
} from '../cards/card-styles';
import { SpaceBetweenBlocks, OverhangBackground } from './layout-styles';
import { ImageWrapper } from '../cards/components/image';
import type { TopHeader } from 'kinja-magma/models/CurationBlock';
import TopHeaderComponent from '../top-header';
import { ReviewBadge, SmallSize } from 'kinja-components/components/review-score/review-score';

type Props = {|
	posts: Array<Post | void>,
	header?: TopHeader,
	index: number
|}

const Layout = styled.div`
	margin-bottom: ${SpaceBetweenBlocks};

	${ReviewBadge} {
		${SmallSize}
	}

	${media.largeUp`
		display: flex;
	`}
`;

const ThreeCardHorizontalListCard = styled(Card)`
	${SmallFontSize}

	${media.mediumDown`
		${HorizontalLayout}
		&:not(:last-child) {
			${Separator('bottom', '1rem')}
		}
	`}

	${media.largeOnly`
		${VerticalLayout}
		flex: 33%;
		&:not(:last-child) {
			${Separator('right', gridValue.large('0.5g'))}
		}
	`}

	${media.xlargeUp`
		${HorizontalLayout}
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('4c')};
		&:not(:last-child) {
			${Separator('right', gridValue.xlarge('0.5g'))}
		}
	`}

	${media.xxlargeUp`
		width: ${gridValue.xxlarge('4c')};
		&:not(:last-child) {
			${Separator('right', gridValue.xxlarge('0.5g'))}
		}
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

export default function ThreeCardHorizontalList(props: Props) {
	const { posts, header, index } = props;
	return (
		<OverhangBackground>
			{header && (
				<TopHeaderComponent
					header={header}
				/>
			)}
			<Layout>
				<ThreeCardHorizontalListCard
					post={posts[0]}
					blockIndex={index}
					index={0}
				/>
				<ThreeCardHorizontalListCard
					post={posts[1]}
					blockIndex={index}
					index={1}
				/>
				<ThreeCardHorizontalListCard
					post={posts[2]}
					blockIndex={index}
					index={2}
				/>
			</Layout>
		</OverhangBackground>
	);
}