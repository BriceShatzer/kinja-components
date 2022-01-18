// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import CardImage, { ImageWrapper } from './components/image';
import Headline from './components/headline';
import Link from '../../elements/link';
import Excerpt from './components/excerpt';
import MultipleAuthorsStatic, {
	MultipleAuthorsStaticElement,
	Span
} from 'kinja-components/components/post-elements/multiple-authors-static/multiple-authors-static';
import { parseNode } from 'postbody/BlockNode';
import { Label } from  '../../story-type-label/story-type-label';
import CategorizationLabel, { StyledLabel, NoLinkLabel, LabelLink } from './components/categorization-label';
import simpleInlineNodes from './components/simple-inlinenode-renderer';
import Paragraph from 'postbody/blockNodes/Paragraph';
import trimExcerpt from 'postbody/utils/trimExcerpt';
import getEventAction from '../utils/analytics';
import ReviewScore, { ReviewBadge, MediumSize } from 'kinja-components/components/review-score/review-score';
import StandardBlockDataContext from '../standard-block-data-context';
import DateTime from 'kinja-components/utils/DateTime';
import type { CurationBlockLayout } from 'kinja-magma/models/CurationBlock';
import type { NonEmptyCardProps } from './card';
import cx from 'classnames';

export const Timestamp = styled.time`
	display: block;
`;

export const MultipleAuthorsContainer = styled.div`
	color: ${props => props.theme.color.gray};
`;

export const TextContainer = styled.div`
	${props => props.whiteText ? css`
		color: ${props => props.theme.color.white};

		${Headline},
		${Excerpt},
		${MultipleAuthorsContainer},
		${MultipleAuthorsStaticElement} a,
		${Span},
		${Timestamp},
		${StyledLabel},
		${NoLinkLabel},
		${LabelLink} {
			color: ${props => props.theme.color.white};
		}

		${MultipleAuthorsContainer},
		${MultipleAuthorsStaticElement} a,
		${Span},
		${Timestamp},
		${StyledLabel},
		${NoLinkLabel},
		${LabelLink} {
			:active {
				color: ${props => props.theme.color.lightgray};
			}
		}
	` : css`
		${Headline},
		${Excerpt} {
			color: ${props => props.theme.color.darksmoke};
		}
		${MultipleAuthorsStaticElement} a,
		${Span},
		${Timestamp} {
			color: ${props => props.theme.color.gray};
		}
	`};
`;

export const CardImageWrapper = styled.div`
	position: relative;

	${ReviewBadge} {
		${MediumSize}
	}
`;

export const BlockLink = styled(Link)`
	display: block;

	${ImageWrapper} {
		position: relative;
	}

	${ImageWrapper}::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.175) 100%);
		opacity: 0;
		transition: opacity 0.2s ease-out;
		z-index: 2;
	}

	:hover,
	:focus {
		text-decoration: none;
		outline: none;

		${Headline} {
			color: ${props => props.whiteText ? props.theme.color.whitesmoke : props.theme.color.darkgray};
		}

		${Excerpt} {
			color: ${props => props.whiteText ? props.theme.color.whitesmoke : props.theme.color.darkgray};
		}

		${ImageWrapper}::after {
			opacity: 1;
		}
	}

	:active {
		${Headline} {
			color: ${props => props.whiteText ? props.theme.color.lightgray : props.theme.color.primary};
		}

		${Excerpt} {
			color: ${props => props.whiteText ? props.theme.color.lightgray : props.theme.color.primary};
		}

		${ImageWrapper}::after {
			opacity: 1;
		}
	}
`;

export const MonochromeLabel = styled(Label)`
	color: ${props => props.whiteText ? props.theme.color.white : props.theme.color.darksmoke};
	&:hover {
		cursor: text;
		color: ${props => props.whiteText ? props.theme.color.white : props.theme.color.darksmoke};
	}
`;

export const BigStoryLabel = styled(MonochromeLabel)`
	background-color: ${props => props.whiteText ? props.theme.color.darksmoke : props.theme.color.white};
	padding: 2px 0.5rem 0 0.5rem;
`;

export const CardContainer = styled.article`
	box-sizing: content-box;

	${Label} {
		display: inline-block;
		font-size: ${props => props.theme.typography.utility.fontSizes.xsmall};
		line-height: ${props => props.theme.typography.utility.lineHeights.xsmall};
	}

	/* Remove this rule once onion frontpage is released */
	${Headline} {
		font-family: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.fontFamily :
		props.theme.typography.headline.fontFamily};
	}

	${MultipleAuthorsStaticElement},
	${Span},
	${Timestamp} {
		font-family: ${props => props.theme.typography.utility.fontFamily};
		font-size: ${props => props.theme.typography.utility.fontSizes.xsmall};
		line-height: ${props => props.theme.typography.utility.lineHeights.xsmall};
	}
`;

type StaticCardProps = { ...NonEmptyCardProps, ...{| blockLayout: CurationBlockLayout |} };

export default function StaticCard(props: StaticCardProps) {
	const {
		post,
		showExcerpt,
		showThumbnail = true,
		categorizedPost,
		className,
		customStoryLabel,
		customHeadline,
		customExcerpt,
		customThumbnail,
		blockLayout,
		blockIndex,
		index,
		showAuthors,
		showPublishTime,
		imageSizes,
		whiteText,
		bigStory
	} = props;
	const { isSatire, authors, indexesForNonLazyloadedImages } = React.useContext(StandardBlockDataContext);
	const storyType = categorizedPost ? categorizedPost.storyType : undefined;
	const category = categorizedPost ? categorizedPost.category : undefined;
	const subCategory = categorizedPost ? categorizedPost.subcategory : undefined;
	const renderedCustomHeadline = customHeadline && customHeadline.length && simpleInlineNodes(customHeadline);
	const headline = renderedCustomHeadline || post.formattedHeadline;
	const renderedCustomExcerpt = customExcerpt && customExcerpt.length && simpleInlineNodes(customExcerpt);
	const firstParagraph = post.firstParagraph ? trimExcerpt([parseNode(post.firstParagraph)], 250)[0] : null;
	const firstParagraphValue = firstParagraph instanceof Paragraph ? firstParagraph.value : null;
	const defaultExcerpt = firstParagraphValue ? simpleInlineNodes(firstParagraphValue) : '';
	const excerpt = renderedCustomExcerpt || defaultExcerpt;
	const eventAction = getEventAction(blockLayout.type, blockIndex, index);
	const event = [['Home page click', eventAction, post.permalink]];
	const kalaEvent = ['STREAM_CLICK', 'POST', post.id];
	const allAuthors = authors[post.id];
	const timestamp = post.publishTimeMillis;
	const noLazyImage = indexesForNonLazyloadedImages.includes(blockIndex);

	return (
		<CardContainer className={cx(className, 'js_post_item')} data-id={post.id}>
			{showThumbnail &&
				<CardImageWrapper>
					<BlockLink href={post.permalink} events={event} whiteText={whiteText} kalaEvent={kalaEvent}>
						{post.reviewScore && <ReviewScore score={post.reviewScore} />}
						<CardImage
							post={post}
							aboveHeadline
							sizes={imageSizes}
							customImage={customThumbnail}
							noLazy={noLazyImage}
						/>
					</BlockLink>
				</CardImageWrapper>
			}
			<TextContainer whiteText={whiteText}>
				{post.sponsored ? (
					<MonochromeLabel whiteText={whiteText}>Sponsored</MonochromeLabel>
				) : (bigStory ? (
					<BigStoryLabel whiteText={whiteText}>{customStoryLabel || 'The Big Story'}</BigStoryLabel>
				) : (storyType &&
					<CategorizationLabel
						permalinkHost={post.permalinkHost}
						storyType={storyType}
						category={category}
						subcategory={subCategory}
						events={[['Home page click', getEventAction(blockLayout.type, blockIndex, index, 'Story Type'), post.permalink]]}
					/>
				))}
				<BlockLink href={post.permalink} events={event} whiteText={whiteText} kalaEvent={kalaEvent}>
					<Headline dangerouslySetInnerHTML={{ __html: headline }} />
					{showExcerpt && excerpt.length > 0 && (
						<Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
					)}
				</BlockLink>
				{!isSatire && showAuthors && (
					<MultipleAuthorsContainer>
						{post.byline || (allAuthors && allAuthors.length && (
							<MultipleAuthorsStatic authors={allAuthors} index={index} pageType={'frontpage'} truncated />
						))}
					</MultipleAuthorsContainer>
				)}
				{showPublishTime && timestamp &&  (
					<Timestamp>
						{new DateTime({ timestamp }).relativeDateTime}
					</Timestamp>
				)}
			</TextContainer>
		</CardContainer>
	);
}