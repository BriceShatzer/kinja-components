/* eslint-disable flowtype/no-types-missing-file-annotation */

import * as React from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import styled, {css} from 'styled-components';
import { gridValue } from '../../grid-utils';
import media from 'kinja-components/style-utils/media';
import { ActionIconWrapper } from 'kinja-components/components/post-elements/recommend-star';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import { LazyResponsiveImage, MAX_POST_IMAGE_WIDTH } from '../../elements/image';
import renderPlainText from 'postbody/utils/renderPlainText';
import createTranslate from '../../translator';
import translations from './translations';
import { stripHTMLWithRegex } from '../../../utils/string';
import CaptionContainer from '../../caption-container';
import ImageAttributionContainer from '../../image-attribution-container';
import { withKinjaMeta, type KinjaMetaInjectedProps } from '../../hoc/context';

import imageUrl from 'kinja-images/imageUrl';

import getTransforms from 'kinja-images/transforms/permalink';

// ICONS
import ZoomInIcon from '../../icon19/ZoomIn';

import type { ImageOptions } from 'postbody/blockNodes/ImageNode';
import type { MediaAlignment } from 'postbody/MediaAlignment';

type Props = ImageOptions & {
	// Whether image should load as an inline placeholder and then be lazyloaded
	lazyload?: boolean,
	// Check to use when we want an image URL that could be animated.
	autoFormat?: boolean,
	// Render image attribution if true. (defaults to true)
	allowAttribution?: boolean,
	// Hide bottom padding used to have a placeholder before the image loads. (defaults to false)
	hideImagePadding?: boolean,
	// Show ultra-large image at large breakpoints if the image is bleed aligned. (defaults to false)
	canShowUltraLarge?: boolean,
	// Render caption if true. (defaults to true)
	captionsEnabled?: boolean,
	// Render attribution if true. (defaults to true)
	attributionsEnabled?: boolean,
	// Whether we're in the editor and we need editor specific markup
	editable?: boolean,
	clientRendering?: boolean,
	// Alt text is backfilled with the post headline if caption and alt texts are unavailable
	postHeadline?: string,
	// Localization language
	language?: string,
	// Whether we are in a comment or starter post
	isStarterPost?: boolean
} & KinjaMetaInjectedProps;

export const IMAGE_HYDRATION_CLASS = 'image-hydration-wrapper';
export const toAlignmentClass = (alignment: MediaAlignment): string => `align--${alignment.toLowerCase()}`;
export const isAligned = (alignment, ...alignments) => alignments.includes(alignment);
const isAnimated = format => ['gif'].includes(format.toLowerCase());

// LIGHTBOX
const MagnifierButton = () => (
	<ActionIconWrapper noPointer className="magnifier js_lightbox lightbox hide">
		<ZoomInIcon />
	</ActionIconWrapper>
);

const LightboxWrapper = styled.span`
	clear: both;
	display: block;
	cursor: pointer;

	&:hover .lightbox {
		opacity: 1;
	}
`;

const Lightbox = ({ children }: { children: React.ChildrenArray<React.Element<'picture'>>}) => (
	<LightboxWrapper className="js_lightbox-wrapper">
		<MagnifierButton />
		{children}
	</LightboxWrapper>
);


export const ImageNodeWrapper = styled.figure`
	position: relative;
	margin: 0 0 1.5rem;

	&:hover {
		${ActionIconWrapper} {
			opacity: 1;
		}
	}

	${media.smallOnly`
		${({ alignment, theme }) => alignment && alignment === 'bleed' && css`
			margin: 0 -${theme.columnPadding} ${theme.columnGutter19.largeUp} -${theme.columnPadding};
		`}
		${({ alignment, theme }) => alignment && alignment !== 'bleed' && css`
			max-width: 100% !important;
			margin: 0 auto ${theme.columnGutter19.largeUp} !important;
		`}
	`}

	${media.mediumUp`
		${({alignment}) => alignment && alignment === 'center' && css`
			max-width: 636px;
			margin-left: auto;
			margin-right: auto;
		`}

		${({alignment}) => alignment &&
			alignment !== 'center' &&
			alignment !== 'bleed' && css`
			max-width: ${props => props.withStandardGrid ? '' : '400px'};
			float: ${alignment};
			clear: ${alignment};
			margin-${alignment}: 0;
		`}
	`}

	${media.mediumOnly`
		${({alignment}) => alignment && alignment === 'left' && css`
			margin-right: ${props => props.theme.columnGutter19.largeUp};
			max-width: ${props => props.withStandardGrid ? gridValue.medium('3c') : ''};
		`}

		${({alignment}) => alignment && alignment === 'right' && css`
			margin-left: ${props => props.theme.columnGutter19.largeUp};
			max-width: ${props => props.withStandardGrid ? gridValue.medium('3c') : ''};
		`}
	`}

	${media.largeOnly`
			${({alignment}) => alignment && alignment === 'left' && css`
			max-width: ${props => props.withStandardGrid ? gridValue.large('3c') : ''};
		`}

		${({alignment}) => alignment && alignment === 'right' && css`
			max-width: ${props => props.withStandardGrid ? gridValue.large('3c') : ''};
		`}
	`}

	${media.xlargeOnly`
			${({alignment}) => alignment && alignment === 'left' && css`
			max-width: ${props => props.withStandardGrid ? gridValue.xlarge('3c') : ''};
		`}

		${({alignment}) => alignment && alignment === 'right' && css`
			max-width: ${props => props.withStandardGrid ? gridValue.xlarge('3c') : ''};
		`}
	`}

	${media.xxlargeUp`
			${({alignment}) => alignment && alignment === 'left' && css`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('3c') : ''};
		`}

		${({alignment}) => alignment && alignment === 'right' && css`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('3c') : ''};
		`}
	`}

	${media.largeUp`
		${({alignment}) => alignment && alignment === 'left' && css`
			margin-right: ${props => props.theme.columnGutter19.xlargeUp};
		`}

		${({alignment}) => alignment && alignment === 'right' && css`
			margin-left: ${props => props.theme.columnGutter19.xlargeUp};
		`}
	`}

	${({editable}) => editable && css`
		position: relative;
		width: auto;
		text-align: center;
		margin-top: 0;
		margin-bottom: 1.5rem;

		img {
			&:hover {
				outline: 1px solid ${props => props.theme.color.white};
				outline-offset: -1px;
			}
		}

		${media.largeUp`
			max-width: 800px;
		`}
	`}
`;

export const ImageWrapper = styled.div`
	${({editable}) => !editable && css`
		position: relative;
		overflow: hidden;
		max-width: 100%;
		margin-left: auto;
		margin-right: auto;
	`}

	${({editable, animated}) => !editable && animated && css`
		cursor: pointer;
		display: block;
	`}

	${({editable}) => editable && css`
		display: inline-block;
		max-width: 100%;
	`}
`;

const ImagePermalinkSubWrapper = styled.div`
	position: relative;
	background-color: #f5f5f5;

	video {
		position: absolute;
		width: 100%;
		height: auto;
	}

	img {
		position: absolute;
		width: 100%;
	}

	${({noBackground}) => noBackground && css`
		background: none;

		img {
			background: none;
		}
	`}
`;

const calcImageMaxWidth = (width: number, alignment: MediaAlignment) => {
	if (isAligned(alignment, 'Left', 'Right')) {
		return width < MAX_POST_IMAGE_WIDTH ? width : MAX_POST_IMAGE_WIDTH;
	} else {
		return width;
	}
};

export function ImageNodeComponent({
	id,
	format,
	width,
	height,
	alignment,
	lightbox,
	caption,
	attribution,
	autoFormat,
	lazyload = true,
	captionsEnabled = true,
	attributionsEnabled = true,
	hideImagePadding = false,
	syndicationRights,
	editable,
	altText,
	postHeadline,
	language,
	isStarterPost = true,
	isRecommended = false,
	kinjaMeta
}: Props) {
	const constrainWidth = isAligned(alignment, 'Left', 'Right') || width < MAX_POST_IMAGE_WIDTH ? { width } : null;
	const constrainMaxWidth = kinjaMeta.features && kinjaMeta.features.grid_standard ? {} : { maxWidth: width };
	const paddingBottom = Math.round(height / width * 1000) / 10;
	const wrapperPadding = hideImagePadding ? null : { paddingBottom: `${paddingBottom}%` };
	const transforms = getTransforms(width, format, { autoFormat });
	const animated = isAnimated(format);
	const showAttribution = attributionsEnabled && !isEmpty(attribution);
	const showCaption = captionsEnabled && !isEmpty(caption);
	const isLargerThan100 = width > 100;
	const useLightbox = isLargerThan100 && lightbox && !editable;
	const alt = altText || (showCaption && renderPlainText(caption)) || (() => {
		const translate = createTranslate(translations, language);
		if (isStarterPost && postHeadline) {
			return translate('Illustration for article titled {postHeadline}', { postHeadline: stripHTMLWithRegex(postHeadline) });
		} else if (!isStarterPost) {
			return translate('Illustration for comment');
		}
	})();

	// Data attributes on the figure in the editor
	const attributes = {
		'data-id': id,
		'data-recommend-id': `image://${id}`,
		'data-format': format,
		'data-width': width,
		'data-height': height,
		'data-lightbox': lightbox,
		'data-alt': altText,
		'data-recommended': isRecommended
	};

	const finalImage = editable ? (
		<img src={imageUrl(id, 'OriginalAuto', format)} draggable={false} {...attributes} />
	) : <LazyResponsiveImage
		id={id}
		format={format}
		width={calcImageMaxWidth(width, alignment)}
		height={height}
		transform={transforms.default}
		noLazy={!lazyload}
		alt={alt}
	/>;

	const SubWrapper = ({ children }: { children: React.Node }) => (editable ? children : (
		<ImagePermalinkSubWrapper style={wrapperPadding} className={IMAGE_HYDRATION_CLASS}>
			{children}
		</ImagePermalinkSubWrapper>
	));

	const editorClassNames = {
		'js_lazy-image': lazyload,
		'js_marquee-assetfigure': !editable, // Used for GA tracking
		'has-image': editable
	};
	const alignmentClass = toAlignmentClass(alignment);

	return (
		<React.Fragment>
			<EnsureDefaultTheme>
				<ImageNodeWrapper
					alignment={alignment && alignment.toLowerCase()}
					className={classNames(alignmentClass, editorClassNames)}
					{...attributes}
					style={constrainWidth}
					contentEditable={false}
					draggable={false}
					editable={editable}
					withStandardGrid = {kinjaMeta.features && kinjaMeta.features.grid_standard}
				>
					<ImageWrapper
						className={editable ? '' : 'img-wrapper'}
						editable={editable}
						animated={animated}
						contentEditable={false}
						style={constrainMaxWidth}
						data-syndicationrights={String(syndicationRights)}>
						{useLightbox ? <Lightbox>
							<SubWrapper>
								{finalImage}
							</SubWrapper>
						</Lightbox> : <SubWrapper>
							{finalImage}
						</SubWrapper>}
						{showCaption ?
							<CaptionContainer
								caption={caption}
								editable={editable}
							/>
							: null}
						{showAttribution ?
							<ImageAttributionContainer
								hasCaption={Boolean(caption && caption.length)}
								attribution={attribution}
								editable={editable}
								language={language}
							/>
							: null}
					</ImageWrapper>
					{!editable && isLargerThan100 && <span {...attributes} className="js_recommend"></span>}
				</ImageNodeWrapper>
			</EnsureDefaultTheme>
		</React.Fragment>
	);
}

export default withKinjaMeta(ImageNodeComponent);
