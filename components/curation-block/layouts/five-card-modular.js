// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import type { TopHeader } from 'kinja-magma/models/CurationBlock';
import TopHeaderComponent from '../top-header';
import {
	Container,
	LeadCard,
	SecondaryCard,
	LeadTabletColumn,
	SecondaryTabletColumn,
	DesktopVerticalSeparator,
	TabletVerticalSeparator,
	secondaryCardsImageSizes
} from './four-card-modular';

type Props = {|
	posts: Array<Post | void>,
	header?: TopHeader,
	index: number
|}

export default function FourCardModular(props: Props) {
	const { posts, header, index } = props;
	return (
		<section>
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
				<TabletVerticalSeparator order={2} />
				<SecondaryTabletColumn>
					<DesktopVerticalSeparator/>
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
			</Container>
		</section>
	);
}