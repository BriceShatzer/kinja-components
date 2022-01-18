/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import type TypedTagData from 'kinja-magma/models/TypedTagData';
import type StoryType from 'kinja-magma/models/StoryType';
import { EnsureDefaultTheme } from '../../theme';
import media from '../../../style-utils/media';
import Loading, { Spinner } from '../../elements/loader/load-indicator';
import { typeof LazyResponsiveImage } from '../../elements/image';
import Link, { Anchor } from '../../elements/link';
import { Label as StoryTypeLabel } from '../../story-type-label/story-type-label';
import { Wrapper as StoryTypeWrapper } from '../../story-type-label/story-type-label-wrapper';
import type { ReviewBoxJSON } from 'postbody/blockNodes/ReviewBox';

type ImageComponent = React.Element<'img'> | React.Element<typeof Loading> | React.Element<LazyResponsiveImage>;
export type Props = $Diff<ReviewBoxJSON, { type: string }> & {
	categoryData?: ?TypedTagData,
	subcategoryData?: ?TypedTagData,
	storyType?: ?StoryType,
	imageComponent?: ImageComponent,
};

const Title = styled.h2`
	margin-bottom: 15px;
	font-size: 24px;
	line-height: 28px;
	text-align: center;

	&:last-child {
		margin-bottom: 0;
	}
`;

const Score = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	margin: 0 auto 15px;
	border: 2px solid ${props => props.theme.color.whitesmoke};
	border-radius: 50%;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-size: 24px;
	line-height: 24px;
	color: ${props => props.theme.color.white};
	background-color: ${props => props.theme.color.primary};
`;

const Head = styled.div``;
const HeadContentWrapper = styled.div`
	display: none;
`;

const HeadContent = styled.div`
	${StoryTypeWrapper} {
		justify-content: center;
		margin-bottom: 20px;
	}
`;

const DataWrapper = styled.div``;
const DataItem = styled.div`
	padding-bottom: 15px;
`;

const DataLabel = styled.h2`
	margin-bottom: 0;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-size: 15px;
	font-weight: normal;
	line-height: 28px;
	color: ${props => props.theme.color.darkgray};
	text-transform: uppercase;
`;

const DataValue = styled.p`
	/* need to override PermalinkPostWrapper styles */
	&&& {
		margin-bottom: 0;
		max-width: none;
		font-size: 15px;
		font-family: ${props => props.theme.typography.serif.fontFamily};
		color: ${props => props.theme.color.bodytext};
	}
`;

const Content = styled.div`
	position: relative;
	padding: 15px 15px 1px 15px;
	background-color: ${props => props.theme.color.whitesmoke};
`;

const ImageWrapper = styled.div`
	position: relative;
	height: 0;
	padding-top: 56.25%;
`;

const ImageContainer = styled.div`
	position: absolute;
	width: 100%;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;

	img {
		min-height: 100%;
	}

	${Spinner} {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: ${props => props.theme.color.lightgray};
	}
`;

export const ReviewBoxWrapper: React.ComponentType<$Diff<ReviewBoxJSON, { type: string }>> = styled.section`
	width: 100%;
	max-width: 470px;
	margin: 0 auto;

	${StoryTypeWrapper} {
		${Anchor}:hover {
			text-decoration: none;
		}
	}

	${props => props.alignment === 'Left' && css`
		${HeadContent} {
			display: none;
		}
	`}

	${props => props.alignment === 'Fullbleed' && css`
		${Score},
		${Head} {
			background-color: ${props.theme.color.primary};
		}

		${HeadContentWrapper} {
			position: relative;
			display: block;
			width: 100%;

			&::before {
				content: "";
				width: 1px;
				margin-left: -1px;
				float: left;
				height: 0;
				padding-top: 100%;
			}

			&::after {
				content: "";
				display: table;
				clear: both;
			}

			${StoryTypeLabel} {
				color: ${props.theme.color.white};
				border-color: ${props.theme.color.white};

				&:hover {
					background-color: ${props.theme.color.white};
					color: ${props.theme.color.primary};
				}
			}

			${Score} {
				color: ${props.theme.color.primary};
			}
		}

		${DataItem} {
			break-inside: avoid;
			page-break-inside: avoid;
		}

		${!props.imageComponent && css`
			${Head} {
				padding-left: 0;
			}

			${HeadContentWrapper} {
				&::before {
					padding-top: 36%;
				}
			}
		`}
	`}

	${props => !!props.imageComponent && css`
		${Score} {
			position: absolute;
			margin: 0;
			top: -38px;
			left: calc(50% - 24px);
		}
	`}

	${props => (!props.text || !props.text.length) && css`
		${Content} {
			padding: 15px;

			${Title} {
				margin-bottom: 0;
			}

			${DataWrapper} {
				display: none;
			}
		}
	`}

	${media.mediumDown`
		${props => props.alignment === 'Fullbleed' && css`
			${HeadContentWrapper} {
				display: none;
			}
		`}
	`}

	${media.mediumUp`
		${props => props.alignment === 'Left' && css`
			width: 320px;
			margin: 0;
		`}

	`}

	${media.largeUp`
		${props => props.alignment === 'Fullbleed' && css`
			max-width: 100%;

			> ${StoryTypeWrapper} {
				display: none;
			}

			${Head} {
				position: relative;
				display: flex;
				align-items: start;

				${props.imageComponent && css`
					padding-left: 64%;
				`}
			}

			${HeadContent} {
				position: absolute;
				display: flex;
				flex-grow: 1;
				flex-direction: column;
				justify-content: center;
				max-width: 100%;
				padding: 15px;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;

				${Score} {
					position: unset;
					margin: 0 auto;
					background: #fff;
					border-color: #fff;
				}

				${Title} {
					color: ${props.theme.color.white};
				}
			}

			${ImageWrapper} {
				position: absolute;
				flex-basis: 64%;
				width: 64%;
				height: auto;
				padding: 0;
				padding-top: 36%;
				top: 0;
				right: 36%;
				bottom: 0;
				left: 0;
			}

			${Content} {
				${Score},
				${Title} {
					display: none;
			}
		}

			${props => props.text.length > 1 && css`
				${DataWrapper} {
					column-count: 2;
					column-gap: 30px;
				}
			`}

			${props => (!props.text || !props.text.length) && css`
				${Content} {
					display: none;
				}
			`}
		`}
	`}
`;


const ReviewBox = (props: Props) => {
	const {
		categoryData,
		subcategoryData,
		storyType,
		imageComponent,
		text,
		score,
		title,
		alignment
	} = props;

	const typedTags = [];

	if (storyType && categoryData) {
		typedTags.push({
			label: categoryData.valueDisplay,
			url: `/c/${storyType.canonical}/${categoryData.canonicalName}`
		});
	}

	if (storyType && categoryData && subcategoryData) {
		typedTags.push({
			label: subcategoryData.valueDisplay,
			url: `/c/${storyType.canonical}/${categoryData.canonicalName}/${subcategoryData.canonicalName}`
		});
	}

	const tags = (
		<StoryTypeWrapper margin="small" variant="top">
			{typedTags.map(tag => (
				<Link href={tag.url} key={tag.label}>
					<StoryTypeLabel outlined tall>
						{tag.label}
					</StoryTypeLabel>
				</Link>
			))}
		</StoryTypeWrapper>
	);

	const leadImage = imageComponent
		? (
			<ImageWrapper>
				<ImageContainer>
					{imageComponent}
				</ImageContainer>
			</ImageWrapper>
		) : null;

	const reviewScore = score ?
		<Score><span>{score}</span></Score> : null;

	const FullBleedHeader = (
		<HeadContentWrapper>
			<HeadContent>
				<StoryTypeWrapper margin="small" variant="head">
					{typedTags.map(tag => (
						<Link href={tag.url} key={tag.label}>
							<StoryTypeLabel outlined tall>
								{tag.label}
							</StoryTypeLabel>
						</Link>
					))}
				</StoryTypeWrapper>
				<Title>{title}</Title>
				{reviewScore}
			</HeadContent>
		</HeadContentWrapper>
	);

	const header = (
		<Head>
			{leadImage}
			{alignment === 'Fullbleed' ? FullBleedHeader : null}
		</Head>
	);

	const reviewText = text && text.length > 0 && text.map(({ label, value }, index) => {
		return (
			// eslint-disable-next-line react/no-array-index-key
			<DataItem key={`${label}-${value}-${index}`}>
				<DataLabel>{label}</DataLabel>
				<DataValue>{value}</DataValue>
			</DataItem>
		);
	});

	return (
		<EnsureDefaultTheme>
			<ReviewBoxWrapper
				{...props}
				hide={props.hide}
				text={props.text}
				score={props.score}
				alignment={props.alignment}
				image={props.image}
				title={props.title}
				className={'reviewbox-inset'}
			>
				{tags}
				{header}
				<Content>
					{reviewScore}
					<Title>{title}</Title>
					<DataWrapper>{reviewText}</DataWrapper>
				</Content>
			</ReviewBoxWrapper>
		</EnsureDefaultTheme>
	);
};


export default ReviewBox;
