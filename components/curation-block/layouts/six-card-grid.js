// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import styled from 'styled-components';
import media from '../../../style-utils/media';
import { gridValue } from '../../grid-utils';
import Card from '../cards/card';
import {
	HorizontalLayout,
	SmallFontSize,
	Separator
} from '../cards/card-styles';
import {
	VerticalSeparatorElement,
	SpaceBetweenBlocks,
	OverhangBackground
} from './layout-styles';
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
		display: grid;
		grid-auto-flow: dense;
	`}

	${media.largeOnly`
		/* 0 width colums are for VerticalSeparators */
		grid-template-columns: ${gridValue.large('4c')} 0 ${gridValue.large('4c')};
		grid-column-gap: ${gridValue.large('0.5g')};
	`}

	${media.xlargeOnly`
		grid-template-columns: ${gridValue.xlarge('4c')} 0 ${gridValue.xlarge('4c')} 0 ${gridValue.xlarge('4c')};
		grid-column-gap: ${gridValue.xlarge('0.5g')};
	`}

	${media.xxlargeUp`
		grid-template-columns: ${gridValue.xxlarge('4c')} 0 ${gridValue.xxlarge('4c')} 0 ${gridValue.xxlarge('4c')};
		grid-column-gap: ${gridValue.xxlarge('0.5g')};
	`}
`;

const SixCardGridCard = styled(Card)`
	${SmallFontSize}
	${HorizontalLayout}

	${media.mediumDown`
		&:not(:last-of-type) {
			${Separator('bottom', '1rem')}
		}
	`}
	${media.largeOnly`
		&:nth-of-type(-n+4) {
			${Separator('bottom', '1rem')}
		}
	`}
	${media.xlargeUp`
		&:nth-of-type(-n+3) {
			${Separator('bottom', '1rem')}
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
			margin-right: 12px;
		`}
	}
`;

const TabletVerticalSeparator = styled(VerticalSeparatorElement)`
	${media.mediumDown`
		display: none;
	`}
	${media.largeOnly`
		grid-row: span 3;
	`}
	${media.xlargeUp`
		grid-row: span 2;
	`}
`;

const DesktopVerticalSeparator = styled(VerticalSeparatorElement)`
	${media.largeDown`
		display: none;
	`}
	${media.xlargeUp`
		grid-row: span 2;
	`}
`;

export default function SixCardGrid(props: Props) {
	const { posts, header, index } = props;
	return (
		<OverhangBackground>
			{header && (
				<TopHeaderComponent
					header={header}
				/>
			)}
			<Layout>
				<SixCardGridCard
					post={posts[0]}
					blockIndex={index}
					index={0}
				/>
				<TabletVerticalSeparator/>
				<SixCardGridCard
					post={posts[1]}
					blockIndex={index}
					index={1}
				/>
				<DesktopVerticalSeparator/>
				<SixCardGridCard
					post={posts[2]}
					blockIndex={index}
					index={2}
				/>
				<SixCardGridCard
					post={posts[3]}
					blockIndex={index}
					index={3}
				/>
				<SixCardGridCard
					post={posts[4]}
					blockIndex={index}
					index={4}
				/>
				<SixCardGridCard
					post={posts[5]}
					blockIndex={index}
					index={5}
				/>
			</Layout>
		</OverhangBackground>
	);
}