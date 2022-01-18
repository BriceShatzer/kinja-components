// @flow

import * as React from 'react';
import styled from 'styled-components';

import CommerceDisclaimer from '../post-elements/commerce-disclaimer';
import PermalinkHeader from './permalink-header';
import PermalinkMeta from './permalink-meta';
import PermalinkContent from './permalink-content';

import type { PermalinkProps } from './';

const MetaContainer = styled.div`
	margin-bottom: 24px;
`;

const Permalink = (props: PermalinkProps) => {
	const {
		starterPost,
		blog,
		isDraft,
		features
	} = props;

	const noHeader = !starterPost.isVideo && !starterPost.isFeatured;

	return (
		<div className="js_starterpost">
			{!noHeader && blog && blog.isCommerce && !starterPost.sponsored && <CommerceDisclaimer locale={blog.locale} />}
			{!noHeader && <PermalinkHeader
				starterPost={starterPost}
				blog={blog}
				isDraft={isDraft || null}
				wideRail={Boolean(features && features.wide_rail)}
				sponsorBadge={Boolean(features && features.sponsor_badge)}
			/>}
			<MetaContainer>
				<PermalinkMeta {...props}/>
			</MetaContainer>
			<PermalinkContent {...props}/>
		</div>
	);
};

export default Permalink;
