// @flow

import * as React from 'react';
import styled from 'styled-components';

import FeedStream from 'kinja-components/components/stream-new/feed-stream';
import LoadMore from 'kinja-components/components/stream/load-more';

import type { ProfilePagePostsViewProps } from './';

export const EmptyMessage = styled.p`
	text-align: center;
	color: ${({theme}) => theme.color.bodytext};
`;

/*
	Displays a stream of posts on the profile page,
	used by 'saved', 'discussions' and 'posts' views.
*/
export const ProfilePagePostsView = ({
	authors,
	posts,
	repostBlogs,
	pagination,
	emptyMessage,
	feature
}: ProfilePagePostsViewProps) => {
	const contents = posts.length
		? <FeedStream
			pageType='profilepage'
			authors={authors}
			posts={posts}
			feature={feature}
			withPostTools={!feature.isOn('kinja3_cards_phase2')}
			isV2={feature.isOn('kinja3_cards_phase2')}
			isV3={feature.isOn('kinja3_cards_phase3')}
			withAuthorAvatar={feature.isOn('kinja3_cards_phase2_avatars')}
			withExcerpt={true}
			simpleEmbiggen={feature.isOn('recommend_recommends')}
			repostBlogs={repostBlogs}
		/>
		: <EmptyMessage>{emptyMessage}</EmptyMessage>;

	return (
		<React.Fragment>
			{contents}
			{pagination && <LoadMore
				pageType={'profilepage'}
				pagination={pagination}
			/>}
		</React.Fragment>
	);
};
