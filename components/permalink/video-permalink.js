// @flow

import * as React from 'react';
import styled from 'styled-components';

import CommerceDisclaimer from '../post-elements/commerce-disclaimer';
import { VideoPermalinkHeader } from './video-permalink-player';
import PermalinkMeta from './permalink-meta';
import PermalinkHeader from './permalink-header';
import PermalinkContent from './permalink-content';
import FeaturedContentContainer from './featured-permalink-content-container';
import DraftNotification from './draft-notification';
import media from 'kinja-components/style-utils/media';

import type { PermalinkProps } from './';

const VideoHeadline = styled.div`
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	padding: 15px ${props => props.theme.columnPadding} 24px;
	${media.mediumUp`
		padding: 30px 0 24px;
	`}
`;

const VideoPermalink = (props: PermalinkProps) => {
	const {
		starterPost,
		blog,
		featuredVideo,
		isDraft
	} = props;
	const { featuredMedia } = starterPost;

	return (
		<React.Fragment>
			{isDraft && featuredMedia && blog && <DraftNotification
				locale={blog.locale}
				isScheduled={starterPost.status === 'SCHEDULED'}
				publishTime={starterPost.publishTimeMillis || 0}
				timezone={blog.timezone}
			/>}
			{featuredMedia &&
				<VideoPermalinkHeader
					featuredMedia={featuredMedia}
					featuredVideo={featuredVideo}
				/>
			}

			<VideoHeadline>
				<PermalinkHeader starterPost={starterPost} blog={blog} />
				<PermalinkMeta {...props}/>
			</VideoHeadline>

			<FeaturedContentContainer>
				{blog && blog.isCommerce && !starterPost.sponsored && <CommerceDisclaimer locale={blog.locale}/>}
				<PermalinkContent {...props}/>
			</FeaturedContentContainer>
		</React.Fragment>
	);
};

export default VideoPermalink;
