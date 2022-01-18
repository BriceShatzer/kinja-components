// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import styled from 'styled-components';
import media from '../../../style-utils/media';
import { smallOnly } from '../../../style-utils/breakpoints';
import Card from '../cards/card';
import { CardContainer } from '../cards/static-card';
import { Separator } from '../cards/card-styles';
import { SpaceBetweenBlocks } from './layout-styles';
import type { TopHeader } from 'kinja-magma/models/CurationBlock';
import TopHeaderComponent from '../top-header';

type Props = {|
	posts: Array<Post | void>,
	header?: TopHeader,
	index: number,
	cardIndexStart?: number,
	className?: string,
	showThumbnails?: boolean,
	showExcerpts?: boolean | Array<boolean>,
	showAuthors?: boolean,
	showPublishTimes?: boolean,
	separatorBetweenCards?: string,
	hasMainImage?: boolean
|}

const ListContainer = styled.aside`
	${media.mediumDown`
		margin-bottom: ${SpaceBetweenBlocks};
	`}

	${CardContainer}:not(:last-child) {
		${props => props.showSeparators && Separator('bottom', '1rem')}
	}
`;

export default function List(props: Props) {
	const {
		posts,
		header,
		index,
		cardIndexStart = 0,
		className,
		showThumbnails = true,
		showExcerpts = false,
		showAuthors = true,
		showSeparators = true,
		showPublishTimes = false,
		hasMainImage = false
	} = props;

	return (
		<ListContainer className={className} showSeparators={showSeparators}>
			{header && (
				<TopHeaderComponent
					header={header}
				/>
			)}
			{posts.map((post, i) => {
				const imageSizes = hasMainImage ? (i === 0 ? '800px' : '320px') : `${smallOnly} 320px, 470px`;
				const cardIndex = cardIndexStart + i;
				return (
					<Card
						key={post ? `${post.id}-${cardIndex}` : `empty-${cardIndex}`}
						post={post}
						blockIndex={index}
						index={cardIndex}
						showThumbnail={showThumbnails}
						showExcerpt={Array.isArray(showExcerpts) ? showExcerpts[i] : showExcerpts}
						showAuthors={showAuthors}
						showPublishTime={showPublishTimes}
						imageSizes={imageSizes}
					/>
				);
			})}
		</ListContainer>
	);
}