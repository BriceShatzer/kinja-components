// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import styled from 'styled-components';
import media from '../../../style-utils/media';
import { largeDown } from '../../../style-utils/breakpoints';
import { gridValue } from '../../grid-utils';
import Card from '../cards/card';
import { CardContainer } from '../cards/static-card';
import {
	HorizontalLayout,
	VerticalLayout,
	SmallFontSize,
	Separator
} from '../cards/card-styles';
import { VerticalSeparatorElement, SpaceBetweenBlocks, OverhangBackground } from './layout-styles';
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

	${VerticalSeparatorElement} {
		display: none;
	}

	${media.mediumDown`
		${ReviewBadge} {
			${SmallSize}
		}
	`}

	${media.largeOnly`
		display: grid;
		grid-template-columns: ${gridValue.large('4c')} 1px ${gridValue.large('4c')};
		grid-column-gap: ${gridValue.large('0.5g')};
		${CardContainer}:first-child,
		${CardContainer}:nth-child(3) {
			${Separator('bottom', '1rem')}
		}
		${VerticalSeparatorElement} {
			display: block;
		}
	`}

	${media.xlargeUp`
		display: flex;
	`}

	${CardContainer} {
		${SmallFontSize};

		${media.mediumDown`
			&:not(:last-child) {
				${Separator('bottom', '1rem')}
			}
		`}

		${media.largeDown`
			${HorizontalLayout}
		`}

		${media.xlargeUp`
			${VerticalLayout}
		`}

		${media.xlargeOnly`
			width: ${gridValue.xlarge('3c')};
			&:not(:last-child) {
				${Separator('right', gridValue.xlarge('0.5g'))}
			}
		`}

		${media.xxlargeUp`
			width: ${gridValue.xxlarge('3c')};
			&:not(:last-child) {
				${Separator('right', gridValue.xxlarge('0.5g'))}
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
		${media.largeOnly`
			width: ${gridValue.large('2c')};
			margin-right: 12px;
		`}
	}
`;

const imageSizes = `${largeDown} 320px, 470px`;

export default function HorizontalList(props: Props) {
	const { posts, header, index } = props;
	return (
		<OverhangBackground>
			{header && (
				<TopHeaderComponent
					header={header}
				/>
			)}
			<Layout>
				<Card
					post={posts[0]}
					blockIndex={index}
					index={0}
					imageSizes={imageSizes}
				/>
				<VerticalSeparatorElement/>
				<Card
					post={posts[1]}
					blockIndex={index}
					index={1}
					imageSizes={imageSizes}
				/>
				<Card
					post={posts[2]}
					blockIndex={index}
					index={2}
					imageSizes={imageSizes}
				/>
				<VerticalSeparatorElement/>
				<Card
					post={posts[3]}
					blockIndex={index}
					index={3}
					imageSizes={imageSizes}
				/>
			</Layout>
		</OverhangBackground>
	);
}