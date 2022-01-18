// @flow

import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import CommerceDisclaimer from '../post-elements/commerce-disclaimer';
import CaptionAndAttribution, { ImageAttributionWrapper } from './caption-and-attribution';
import PermalinkHeader from './permalink-header';
import PermalinkMeta from './permalink-meta';
import PermalinkContent from './permalink-content';
import FeaturedContentContainer from './featured-permalink-content-container';
import media from 'kinja-components/style-utils/media';
import { AuthorContainer } from '../post-elements/permalink-byline/permalink-byline';
import { TagName } from '../post-elements/permalink-byline/tag-dropdown';
import { Toolbar, Item } from '../share-toolbar/share-toolbar';

import type { PermalinkProps } from './';

const Container = styled.div`
	width: 100%;
`;

const MetaContainer = styled.div`
	width: 100%;
	padding: 30px 0;

	> div {
		max-width: ${props => props.theme.postContentMaxWidth};
		margin: 0 auto;
	}

	${media.largeDown`
		padding: 30px 1.125rem;
	`}
`;

const MetaAndCaptionContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	${ImageAttributionWrapper} {
		order: 1;
	}
	${MetaContainer} {
		order: 2;
	}

	${media.largeDown`
		margin-bottom: 30px;
		${ImageAttributionWrapper} {
			order: 2;
		}
		${MetaContainer} {
			order: 1;
			background: ${props => props.theme.color.black};
		}

		${AuthorContainer} {
			a,
			a:hover {
				color: ${props => props.theme.color.white};
			}
		}

		${ImageAttributionWrapper} {
			a,
			a:hover {
				color: ${props => props.theme.color.white};
			}
		}

		${TagName} {
			color: ${props => props.theme.color.white};
		}

		${Toolbar} {
			background: ${props => props.theme.color.gray};
			border: 1px solid ${props => props.theme.color.gray};
		}

		${Item} {
			background: ${props => props.theme.color.black};
			color: ${props => props.theme.color.gray};

			&:hover {
				color: ${props => darken(0.2, props.theme.color.gray)};
			}
		}
	`}
`;

const FeaturedPermalink = (props: PermalinkProps) => {
	const {
		starterPost,
		blog,
		isDraft,
		features,
		featuredVideo
	} = props;
	const { featuredMedia, featuredHeaderLayout } = starterPost;
	const ByLineContainer = featuredHeaderLayout === 'Impact' ? React.Fragment : MetaAndCaptionContainer;

	return (
		<Container className="js_starterpost">
			<PermalinkHeader starterPost={starterPost} blog={blog} isDraft={isDraft || null} featuredVideo={featuredVideo}/>
			<ByLineContainer>
				{featuredMedia &&
					<CaptionAndAttribution featuredMedia={featuredMedia}/>}
				<MetaContainer>
					<PermalinkMeta {...props}/>
				</MetaContainer>
			</ByLineContainer>
			<FeaturedContentContainer withStandardGrid={features && features.grid_standard}>
				{blog && blog.isCommerce && !starterPost.sponsored && <CommerceDisclaimer locale={blog.locale}/>}
				<PermalinkContent {...props}/>
			</FeaturedContentContainer>
		</Container>
	);
};

export default FeaturedPermalink;
