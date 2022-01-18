// @flow
import * as React from 'react';
import { gridValue } from '../../grid-utils';
import type { QuotableData } from 'postbody/blockNodes/Quotable';
import imageUrl from 'kinja-images/imageUrl';
import InlineNodes from '../inline-node';
import styled, {css} from 'styled-components';
import media from '../../../style-utils/media';
import { EnsureDefaultTheme } from '../../theme';
import classnames from 'classnames';
import { withKinjaMeta, type KinjaMetaInjectedProps } from '../../hoc/context';
import { LazyResponsiveImage } from '../../elements/image';

// ICONS
import ImageIcon from '../../icon19/Image';

import type { ImageProperties } from 'postbody/Image';

export const fieldPlaceholderStrings = ['Header (Optional)',
	'Content (Optional)',
	'Attribution (Optional)'
];

/**
 * Component that wraps the whole quotable
 */
const QuotableWrapper = styled.section`
	display: flex;
	flex-direction: row;
	margin-top: 2rem;
	margin-bottom: 2rem;
	max-width: ${props => props.withStandardGrid ? '100%' : props.theme.postContentMaxWidth};
	margin-left: auto;
	margin-right: auto;

	${media.mediumUp`
		margin-top: 2.5rem;
		margin-bottom: 2.5rem;
	`}

	${media.largeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.large('6c') : props.theme.postContentMaxWidth};
	`}

	${media.xlargeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.xlarge('6c') : props.theme.postContentMaxWidth};
	`}

	${media.xxlargeUp`
		max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('6c') : props.theme.postContentMaxWidth};
	`}
`;

/**
 * Container containing all the text (the right side of the quotable)
 */
const QuotableMainContainer = styled.div`
	flex-grow: 1;
`;

const QuotableHeader = styled.h4`
	outline: 0;
	color: ${props => props.theme.color.black};
	font-family: ${props => props.theme.typography.headline.fontFamily};
	font-size: 1.312rem;
	font-weight: bold;
	margin-top: 0;
	margin-bottom: 1rem;

	&:last-child {
		margin-bottom: 0;
	}

	${props => props.isPlaceholder && css`
		color: ${props => props.theme.color.midgray};
	`}
`;

const QuotableContent = styled.p`
	outline: 0;
	&& {
		margin-bottom: 15px;
	}

	${props => props.isPlaceholder && css`
		color: ${props => props.theme.color.midgray};
	`}
`;

const QuotableAttribution = styled.p`
	outline: 0;
	&& { /* Overwriting default p styles */
		color: ${props => props.theme.color.gray};
		font-family: ${props => props.theme.typography.utility.fontFamily};
		font-weight: bold;
		text-transform: uppercase;
		margin-bottom: 0;
	}

	${props => props.isPlaceholder && css`
		&& {
			color: ${props => props.theme.color.midgray};
		}
	`}
`;

const QuotableThumbnail = styled.img`
	border-radius: 50%;
	cursor: pointer;
`;

const QuotableThumbnailPlaceholder = styled.figure`
	cursor: pointer;
	margin-bottom: 0;
	background-color: ${props => props.theme.color.lightgray};
	padding: 20px;

	&:hover {
		background-color: ${props => props.theme.color.midgray};
		box-shadow: 0 0 0 2px ${props => props.theme.color.midgray};
	}

	svg {
		width: 40px;
		height: 40px;
	}
`;

const ImageContainer = styled.div`
	flex: 0 0 2.5rem;
	position: relative;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 1rem;

	${media.smallOnly`
		flex-basis: ${props => props.withStandardGrid ? gridValue.small('1c') : '2.5rem'};
		height: ${props => props.withStandardGrid ? gridValue.small('1c') : '2.5rem'};
		margin-right: ${props => props.withStandardGrid ? gridValue.small('1g') : '1rem'};
	`}

	${media.mediumOnly`
		flex-basis: ${props => props.withStandardGrid ? gridValue.medium('1c') : '5rem'};
		height: ${props => props.withStandardGrid ? gridValue.medium('1c') : '5rem'};
		margin-right: ${props => props.withStandardGrid ? gridValue.medium('1g') : '1.5rem'};
	`}

	${media.largeOnly`
		flex-basis: ${props => props.withStandardGrid ? gridValue.large('1c') : '5rem'};
		height: ${props => props.withStandardGrid ? gridValue.large('1c') : '5rem'};
		margin-right: ${props => props.withStandardGrid ? gridValue.large('1g') : '2rem'};
	`}

	${media.xlargeOnly`
		flex-basis: ${props => props.withStandardGrid ? gridValue.xlarge('1c') : '5rem'};
		height: ${props => props.withStandardGrid ? gridValue.xlarge('1c') : '5rem'};
		margin-right: ${props => props.withStandardGrid ? gridValue.xlarge('1g') : '2rem'};
	`}

	${media.xxlargeUp`
		flex-basis: ${props => props.withStandardGrid ? gridValue.xxlarge('1c') : '5rem'};
		height: ${props => props.withStandardGrid ? gridValue.xxlarge('1c') : '5rem'};
		margin-right: ${props => props.withStandardGrid ? gridValue.xxlarge('1g') : '2rem'};
	`}
`;

export function QuotableImage({ image, editable, withStandardGrid }: {
	image: ?ImageProperties, editable?: boolean, withStandardGrid?: ?boolean
}) {
	if (image) {
		if (editable) {
			const imageProps = image && {
				'data-thumb-id': image.id,
				'data-thumb-format': image.format,
				src: imageUrl(image.id, 'AvatarLargeAuto', image.format)
			};
			return (
				<QuotableThumbnail
					{...imageProps}
					className={'js_quotable-thumbnail'}
					title={'Change image'}
				/>
			);
		}

		return (
			<ImageContainer className="js_lazy-image" withStandardGrid={withStandardGrid}>
				<LazyResponsiveImage
					id={image.id}
					format={image.format}
					width={80}
					height={80}
					sizes='80px'
				/>
			</ImageContainer>
		);
	}

	if (editable) {
		return (
			<ImageContainer withStandardGrid={withStandardGrid}>
				<QuotableThumbnailPlaceholder className="js_quotable-thumbnail" title="Insert image">
					<ImageIcon />
				</QuotableThumbnailPlaceholder>
			</ImageContainer>
		);
	}

	return null;
}

function QuotableComponent(props: QuotableData & KinjaMetaInjectedProps & { editable?: boolean }) {
	const {
		attribution,
		content,
		header,
		image,
		editable,
		thumbnail,
		kinjaMeta
	} = props;

	const withStandardGrid = kinjaMeta.features && kinjaMeta.features.grid_standard;

	const HeaderComponent = editable ? QuotableHeader.withComponent('div') : QuotableHeader;
	const headerComponent = (
		<HeaderComponent
			isPlaceholder={!header.length}
			className={editable && classnames('js_quotable-header')}
			data-placeholder={editable && fieldPlaceholderStrings[0]}
		>
			{header.length ? <InlineNodes nodes={header} /> : fieldPlaceholderStrings[0]}
		</HeaderComponent>
	);

	const HeaderContentComponent = editable ? QuotableContent.withComponent('div') : QuotableContent;
	const contentComponent = (
		<HeaderContentComponent
			isPlaceholder={!content.length}
			className={editable && classnames('js_quotable-content')}
			data-placeholder={editable && fieldPlaceholderStrings[1]}
		>
			{content.length ? <InlineNodes nodes={content} /> : fieldPlaceholderStrings[1]}
		</HeaderContentComponent>
	);

	const AttributionComponent = editable ? QuotableAttribution.withComponent('div') : QuotableAttribution;
	const attributionComponent = (
		<AttributionComponent
			isPlaceholder={!attribution.length}
			className={editable && classnames('js_quotable-attribution')}
			data-placeholder={editable && fieldPlaceholderStrings[2]}
		>
			{attribution.length ? <InlineNodes nodes={attribution} /> : fieldPlaceholderStrings[2]}
		</AttributionComponent>
	);

	const quotable = (
		<QuotableWrapper withStandardGrid={withStandardGrid}>
			<QuotableImage image={image} editable={editable} withStandardGrid={withStandardGrid} />
			<QuotableMainContainer>
				{(!!header.length || editable) && headerComponent}
				{(!!content.length || editable) && contentComponent}
				{(!!attribution.length || editable) && attributionComponent}
			</QuotableMainContainer>
		</QuotableWrapper>
	);
	if (!editable) {
		return (
			<EnsureDefaultTheme>
				{quotable}
			</EnsureDefaultTheme>
		);
	}
	return (
		<EnsureDefaultTheme>
			<aside
				className="quotable-inset js_quotable"
				contentEditable={false}
				data-thumb-id={thumbnail && thumbnail.id}
				data-thumb-format={thumbnail && thumbnail.format}
			>
				{quotable}
			</aside>
		</EnsureDefaultTheme>
	);
}

export default withKinjaMeta(QuotableComponent);
