// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';

import { EnsureDefaultTheme } from '../../theme';
import { gridValue } from '../../grid-utils';
import media from '../../../style-utils/media';
import SectionItems from '../../category-stream/subcomponents/category-stream-section-items';
import { Headline } from '../../category-stream/subcomponents/category-stream-section-item';
import type { PageType } from 'kinja-magma/models/PageType';
import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';
import PermalinkBelowPostSubtitle from 'kinja-components/components/post-elements/permalink-below-post-subtitle';
import { RelatedPostClick } from '../../permalink/analytics';

type Props = {
	headline: ?string,
	posts: ?Array<Post>,
	pageType: PageType,
	relatedBlogs: Array<Blog>,
	withStandardGrid: boolean,
	wideRail: boolean
}

const Container = styled.div`
	position: relative;
	max-width: ${props => props.withStandardGrid ? '100%' : props.theme.postContentMaxWidth};
	margin: 2.5rem auto 0;

	${media.largeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.large('6c') : props.theme.postContentMaxWidth};
	`}

	${media.xlargeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.xlarge('6c') : props.theme.postContentMaxWidth};
	`}

	${media.xxlargeUp`
		max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('6c') : props.theme.postContentMaxWidth};
	`}

	${props => props.wideRail ? css`
		${media.xxlargeOnly`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('6c') : props.theme.postContentMaxWidth};
		`}
		${media.xxxlargeUp`
			max-width: ${props => props.withStandardGrid ? gridValue.xxxlarge('6c') : props.theme.postContentMaxWidth};
		`}
	` : css`
		${media.xxlargeUp`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('6c') : props.theme.postContentMaxWidth};
		`}
	`}
`;

const ItemsContainer = styled.div`
	${Headline} {
		font-size: 1rem;
		line-height: 1.2;
	}

	${media.smallOnly`
		margin-left: -${props => props.theme.columnPadding};
		margin-right: -${props => props.theme.columnPadding};

		${Headline} {
			font-size: 0.938rem;
		}
	`}
`;

const Header = styled.div`
	margin-bottom: 10px;

	${media.smallOnly`
		padding: 0;
	`}
`;

const PermalinkRelatedStories = ({
	headline,
	posts,
	pageType,
	relatedBlogs,
	withStandardGrid,
	wideRail
}: Props) =>
	<EnsureDefaultTheme>
		<Container
			withStandardGrid={withStandardGrid}
			data-commerce-source={'recommendationmodule'}
			wideRail={wideRail}
		>
			<Header>
				<PermalinkBelowPostSubtitle>
					{headline}
				</PermalinkBelowPostSubtitle>
			</Header>
			<ItemsContainer>
				<SectionItems
					posts={posts}
					pageType={pageType}
					withBranding
					relatedBlogs={relatedBlogs}
					noLazy
					eventFunctions={[RelatedPostClick]}
				/>
			</ItemsContainer>
		</Container>
	</EnsureDefaultTheme>;

PermalinkRelatedStories.defaultProps = {
	headline: 'Related stories'
};

export default PermalinkRelatedStories;
