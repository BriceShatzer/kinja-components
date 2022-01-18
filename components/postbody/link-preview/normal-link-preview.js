// @flow
import * as React from 'react';
import { gridValue } from '../../grid-utils';
import BlogAvatar from '../../blog-avatar';
import { LazyResponsiveImage } from 'kinja-components/components/elements/image';
import truncate from 'html-truncate';
import createTranslate from '../../translator';
import translations from './translations';
import type { KinjaMetaInjectedProps } from '../../hoc/context';
import { withKinjaMeta } from '../../hoc/context';
import { imageFormatFromString } from 'postbody/Image';
import styled, {css} from 'styled-components';
import media from 'kinja-components/style-utils/media';
import LinkElement from 'kinja-components/components/elements/link';
import { Theme, matchBlogGroupToTheme } from 'kinja-components/components/theme';
import type { LinkPreviewJSON } from 'postbody/blockNodes/LinkPreview';
import type Link from 'kinja-magma/models/Link';
import { type Events } from 'kinja-components/components/elements/link';

const BLOG_AVATAR_SIZE = 20;

export type Props = $Diff<LinkPreviewJSON, { type: 'LinkPreview' }> & {
	link: Link,
	isInternal?: boolean,
	lazyload?: boolean,
	isRightRail?: boolean,
	events?: Events,
	newDesignA?: boolean,
	newDesignB?: boolean,
	mobileDesign?: boolean
} & KinjaMetaInjectedProps;

const InsetStoryReadmore = styled(LinkElement)`
	font-family: ${props => props.theme.typography.headline.fontFamily};
	font-size: 16px;

	.hostname {
		font-weight: bold;
	}

	${props => props.blogGroup && css`
		color: ${props => props.theme.color.black};
		box-shadow: inset 0 -2px 0 ${props => props.theme.color.primary};
		line-height: 18px;

		&:hover {
			color: ${props => props.theme.color.primary};
			text-decoration: none;
		}
	`}
`;

const ImageFigure = styled.div`
	padding-bottom: 56.2%;

	video,
	img,
	amp-img {
		position: absolute;
		width: 100%;
	}
`;

const InsetStoryThumb = styled(LinkElement)`
	display: block;
	position: relative;
	margin: -${props => props.theme.columnPadding} -${props => props.theme.columnPadding} 1rem;

	${media.mediumUp`
		width: 25%;
		min-width: 25%;
		padding: ${({ theme }) => `${theme.columnPadding} 0 0 ${theme.columnPadding}`};
		margin: 0;
		float: left;
	`}

	${media.mediumDown`
		margin: auto;

		${ImageFigure} {
			img {
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
			}
		}
	`}

	${ImageFigure} {
		margin: 0;
		position: relative;
		${props => props.blogGroup ? `border-bottom: 5px solid ${props.theme.color.logo};` : ''}
	}

	> span {
		position: relative;
		top: -${BLOG_AVATAR_SIZE /* this is override for mantle css for now */}px;
	}
`;

const InsetStoryHeadline = styled.h6`
	font-size: 20px;
	line-height: 24px;
	margin-bottom: 10px;
`;

const InsetStoryContent = styled.p`
	&& {
		font-size: 15px;
		line-height: 25px;
		margin-bottom: 0.6rem;
	}
`;

const AsideWrapper = styled(LinkElement)`
	clear: both;
	margin: 2rem auto;
	border: ${props => props.theme.color.lightgray} 1px solid;
	border-radius: 5px;
	box-shadow: ${props => props.theme.color.lightgray} 0 2px 5px;
	max-width: ${props => props.withStandardGrid ? '100%' : props.theme.postContentMaxWidth};

	${media.largeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.large('6c') : props.theme.postContentMaxWidth};
	`}

	${media.xlargeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.xlarge('6c') : props.theme.postContentMaxWidth};
	`}

	${media.xxlargeUp`
		max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('6c') : props.theme.postContentMaxWidth};
	`}

	${media.mediumUp`
		display: flex;
	`}
`;

const RightSideWrapper = styled.div`
	padding: ${props => props.theme.columnPadding};
	a,
	a:hover {
		color: ${props => props.theme.color.black};
	}
`;

function NormalLinkPreview(props: Props) {
	const { link, isInternal, kinjaMeta, lazyload } = props;
	const blogGroup = link.meta && link.meta.blogGroup;
	const firstImage = link.images.length && link.images[0].id ? link.images[0] : null;
	const linkType = isInternal ? 'Internal' : 'External';
	const translate = createTranslate(translations, kinjaMeta.language);

	return (
		<Theme blog={matchBlogGroupToTheme(blogGroup)}>
			<AsideWrapper
				as="aside"
				className={`inset--story branded-item branded-item--${blogGroup || 'kinja'}`}
				events={[['Embedded Url', `${linkType} inset`, link.url, { metric25: 1 }]]}
				data-commerce-source={'inset'}
				withStandardGrid={kinjaMeta.features && kinjaMeta.features.grid_standard}
			>
				{firstImage &&
					<InsetStoryThumb
						blogGroup={blogGroup}
						className="inset--story__thumb"
						events={[['Permalink page click', 'Permalink page click - inset photo']]}
						href={link.url}
						rel="noopener noreferrer"
						target="_blank"
					>
						<ImageFigure className={lazyload ? 'js_lazy-image' : ''}>
							<LazyResponsiveImage
								croppedImage
								id={firstImage.id}
								width={firstImage.width}
								height={firstImage.height}
								format={imageFormatFromString(firstImage.format || '')}
								sizes="(max-width: 480px) 200px, 260px"
								transform="KinjaCenteredLargeAuto"
								noLazy={!lazyload}
							/>
						</ImageFigure>
						<BlogAvatar name={blogGroup} size={BLOG_AVATAR_SIZE} />
					</InsetStoryThumb>
				}
				<RightSideWrapper>
					{link.headline &&
						<LinkElement
							events={[['Permalink page click', 'Permalink page click - inset headline']]}
							href={link.url}
							rel="noopener noreferrer"
							target="_blank"
						>
							<InsetStoryHeadline dangerouslySetInnerHTML={{ __html: truncate(link.headline, 100, { truncateLastWord: false }) }} />
						</LinkElement>
					}
					<InsetStoryContent>{link.shortDescription ? link.shortDescription : null}</InsetStoryContent>
					<InsetStoryReadmore
						blogGroup={blogGroup}
						className="js_readmore inset--story__readmore"
						events={[['Permalink page click', 'Permalink page click - inset read more link']]}
						href={link.url}
						rel="noopener noreferrer"
						target="_blank"
					>
						{translate('Read more')}
					</InsetStoryReadmore>
				</RightSideWrapper>
			</AsideWrapper>
		</Theme>
	);
}

export default withKinjaMeta(NormalLinkPreview);
