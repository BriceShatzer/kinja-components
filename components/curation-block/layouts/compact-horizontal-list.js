// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import styled from 'styled-components';
import media from '../../../style-utils/media';
import { gridValue } from '../../grid-utils';
import Card from '../cards/card';
import { CardContainer } from '../cards/static-card';
import {
	HorizontalLayout,
	XSmallFontSize,
	Separator
} from '../cards/card-styles';
import { OverhangBackground } from './layout-styles';
import { Label as CategorizationLabel } from  '../../story-type-label/story-type-label';
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
	display: flex;
	${Separator('bottom', '1rem')};

	&::-webkit-scrollbar {
		display: none;
	}

	${media.smallOnly`
		margin-left: -${gridValue.small('1g')};
		margin-right: -${gridValue.small('1g')};
	`}

	${media.mediumOnly`
		margin-left: -${gridValue.medium('1g')};
		margin-right: -${gridValue.medium('1g')};
	`}

	${media.largeOnly`
		margin-left: -${gridValue.large('1g')};
		margin-right: -${gridValue.large('1g')};
	`}

	${media.largeDown`
		flex-wrap: nowrap;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
	`}

	${CardContainer} {
		flex-shrink: 0;
		flex-grow: 0;
		${XSmallFontSize};
		${HorizontalLayout};

		${media.smallOnly`
			width: ${gridValue.small('5c')};

			&:not(:last-child) {
				${Separator('right', gridValue.small('1g'))}
			}
			&:first-child {
				padding-left: ${gridValue.small('1g')};
			}
			&:last-child {
				padding-right: ${gridValue.small('1g')};
			}
		`}

		${media.mediumOnly`
			width: ${gridValue.medium('3c')};

			&:not(:last-child) {
				${Separator('right', gridValue.medium('1g'))}
			}
			&:first-child {
				padding-left: ${gridValue.medium('1g')};
			}
			&:last-child {
				padding-right: ${gridValue.medium('1g')};
			}
		`}

		${media.largeOnly`
			width: ${gridValue.large('3c')};
			&:not(:last-child) {
				${Separator('right', gridValue.large('0.5g'))}
			}
			&:first-child {
				padding-left: ${gridValue.large('1g')};
			}
			&:last-child {
				padding-right: ${gridValue.large('1g')};
			}
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
		margin-right: 12px;

		${media.smallOnly`
			width: 85px;
		`}
		${media.mediumOnly`
			width: ${gridValue.medium('1c')};
		`}
		${media.largeOnly`
			width: ${gridValue.large('1c')};
		`}
		${media.xlargeOnly`
			width: ${gridValue.xlarge('1c')};
		`}
		${media.xxlargeUp`
			width: ${gridValue.xxlarge('1c')};
		`}
	}

	${ReviewBadge} {
		${SmallSize}
	}

	${CategorizationLabel}${CategorizationLabel} {
		display: none;
	}
`;

const imageSizes = '320px';

export default function CompactHorizontalList(props: Props) {
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
					showAuthors={false}
					imageSizes={imageSizes}
				/>
				<Card
					post={posts[1]}
					blockIndex={index}
					index={1}
					showAuthors={false}
					imageSizes={imageSizes}
				/>
				<Card
					post={posts[2]}
					blockIndex={index}
					index={2}
					showAuthors={false}
					imageSizes={imageSizes}
				/>
				<Card
					post={posts[3]}
					blockIndex={index}
					index={3}
					showAuthors={false}
					imageSizes={imageSizes}
				/>
			</Layout>
		</OverhangBackground>
	);
}