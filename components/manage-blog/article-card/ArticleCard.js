/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import shortid from 'shortid';
import { darken } from 'polished';

import { getKinjaHost } from 'kinja-components/utils/url';
import Theme from '../../theme';
import ImageElement from '../../elements/image';

// ICONS
import BubbleIcon from '../../icon19/Bubble';
import FlameIcon from '../../icon19/Flame';
import WriteIcon from '../../icon19/Write';
import ChevronRightIcon from '../../icon19/ChevronRight';
import EmbiggenIcon from '../../icon19/Embiggen';
import EmbiggenFilledIcon from '../../icon19/EmbiggenFilled';

import Loading, { Spinner } from '../../elements/loader/load-indicator';
import DrawerMenu, { Container as DrawerMenuContainer, EmbiggenIconContainer } from '../drawer-menu';
import StoryTypeLabel from '../../story-type-label';
import media from '../../../style-utils/media';
import FormattedTime from '../../../utils/DateTime';
import Link from '../../elements/link';
import { StreamPostClick } from '../../stream/analytics';

import type { Post } from '../../types';


const PostInfo = styled.div`
	display: flex;
	flex-grow: 1;
	width: calc(100% - 540px);

	a:hover {
		text-decoration-color: ${props => props.theme.color.black};
	}
`;

const ImageContainer = styled.div`
	width: 170px;
	height: 100%;

	> div {
		height: 100%;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const PostDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: calc(100% - 170px);
	padding: 0 9px 0 13px;
`;

const TagContainer = styled.div`
	display: flex;
`;

const StoryTypeContainer = styled.span`
	width: 100%;
	font-size: 13px;
	font-weight: bold;
	line-height: 13px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	a:hover {
		text-decoration: none;
		color: ${props => darken(0.1, props.theme.color.primary)};
	}
`;

const Vertical = styled.span`
	font-size: 13px;
	line-height: 13px;
	color: ${props => props.theme.color.darkgray};
	text-transform: uppercase;
`;

const Headline = styled.h4`
	margin-bottom: 0;
	font-weight: bold;
	font-size: 20px;
	line-height: 23px;
	text-align: left;

	overflow: hidden;
	-webkit-line-clamp: 3;
	display: -webkit-box;
	-webkit-box-orient: vertical;
`;

export const PlainText = styled.div`
	margin: 0;
	font-size: 16px;
	font-family: ${props => props.theme.typography.serif.fontFamily};
	line-height: 20px;
	text-align: left;
	color: ${props => props.theme.color.black};

	overflow: hidden;
	-webkit-line-clamp: ${props => props.lines};
	display: -webkit-box;
	-webkit-box-orient: vertical;
`;

const AuthorWrapper = styled.span`
	position: relative;
	bottom: -2px;
	font-size: 13px;
	line-height: 13px;
	color: ${props => props.theme.color.gray};
	text-align: left;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

const Published = styled.p``;
const LastEdited = styled.div``;

const AnalyticsContainer = styled.div`
	display: grid;
	grid-template-columns: 67% 33%;
`;
const Comments = styled.p`
	svg {
		display: none;
	}
`;

const PageViews = styled.p`
	white-space: nowrap;

	svg {
		display: none;
	}
`;

const LastEditedTitle = styled.span`
	display: none;
`;

const PublishedTitle = styled.span`
	display: none;
`;

const LoadingWrapper = styled.div`
	margin-left: 12px;
`;

const PostData = styled.div`
	display: grid;
	grid-template-columns: 33% 42% 25%;
	flex-shrink: 0;
	width: 500px;
	height: auto;
	padding: 0 35px 0 20px;
	font-size: 16px;
	line-height: 19px;
	background-color: ${props => props.theme.color.whitesmoke};

	${Published},
	${LastEdited},
	${Comments},
	${PageViews} {
		display: flex;
		align-items: center;
		margin: 0;
		font-size: 16px;
		line-height: 19px;
		font-weight: 300;
	}

	${LastEdited} {
		justify-content: flex-start;

		${Spinner} {
			width: 100%;
			text-align: left;

			span {
				width: 7px;
				height: 7px;
			}
		}
	}
`;

const IconContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-shrink: 0;
	width: 40px;
	padding: 20px 0 20px 19px;

	a {
		svg {
			color: ${props => props.theme.color.gray};
		}
	}

	> svg {
		cursor: pointer;
	}

	svg {
		:hover {
			color: ${props => props.theme.color.primary};
		}
	}
`;

const SwipeIconContainer = styled.div`
	display: none;
`;

export const Container = styled.div`
	display: flex;
	width: 100%;
	height: 95px;
	transition: margin 0.3s ease-out;

	${DrawerMenuContainer} {
		display: none;
	}

	${media.largeDown`
		${Headline},
		${PlainText} {
			font-size: 16px;
			line-height: 19px;
		}
	`}

	${media.mediumDown`
		display: grid;
		grid-template-columns: calc(100% - 29px) 29px;
		grid-template-rows: 81px 109px;
		height: 190px;

		${props => props.isOpen && css`
			overflow: auto;
			margin-left: -71px;
			width: calc(100% + 71px);
			grid-template-columns: calc(100% - 100px) 100px;
		`}

		${PostInfo} {
			width: 100%;
			grid-column: 1;
			grid-row: 1;
			padding-bottom: 14px;
		}

		${ImageContainer} {
			flex-shrink: 0;
			width: 118px;
			height: 67px;
		}

		${PostDetails} {
			width: 100%;
			padding-right: 0;

			> div:last-of-type {
				flex-grow: 1;
			}

			> a {
				position: relative;
				bottom: -2px;
			}
		}

		${TagContainer} {
			margin: -2px 0 0;
		}

		${StoryTypeContainer},
		${Vertical} {
			font-size: 13px;
			line-height: 16px;
		}

		${Headline} {
			margin-bottom: 0;
			font-size: 14px;
			line-height: 14px;
		}

		${PlainText} {
			font-size: 12px;
			line-height: 15px;
		}

		${AuthorWrapper} {
			font-size: 14px;
			line-height: 17px;
		}

		${PostData} {
			grid-column: 1;
			grid-row: 2;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr 1fr;
			grid-row-gap: 1px;
			background-color: ${props => props.theme.color.white};
			width: 100%;
			padding: 0;
			color: ${props => props.theme.color.darkgray};

			${Published},
			${LastEdited} {
				grid-column: 1 / 3;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 16px;
				font-weight: bold;
				color: ${props => props.theme.color.black};
				line-height: 18px;
				background-color: ${props => props.theme.color.whitesmoke};
			}

			${Published} {
				grid-row: 1;
			}

			${LastEdited} {
				grid-row: 2;

				${Spinner} {
					text-align: center;
				}
			}

			${LastEditedTitle},
			${PublishedTitle} {
				display: inline;
				color: ${props => props.theme.color.darkgray};
				font-weight: 300;
			}

			${AnalyticsContainer} {
				grid-row: 3;
				grid-template-columns: 1fr 1fr;
				background-color: ${props => props.theme.color.whitesmoke};
			}

			${Comments},
			${PageViews} {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				font-weight: bold;
				color: ${props => props.theme.color.black};

				svg {
					margin-right: 9px;
				}
			}

			${Comments} {
				font-size: 16px;

				svg {
					display: inline;
				}
			}

			${PageViews} {
				font-size: 16px;

				svg {
					display: inline;
				}
			}
		}

		${IconContainer} {
			display: none;
			position: relative;
			grid-column: 2;
			grid-row: 1 / 3;
			/* display: grid; */
			grid-template-rows: 1fr 1fr;
			grid-template-columns: 1fr;
			width: 100%;
			padding: 0;
			margin-left: 10px;
			border-left: 1px solid ${props => props.theme.color.lightgray};

			a {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			> svg {
				align-self: center;
				justify-self: center;
			}

			${SwipeIconContainer} {
				position: absolute;
				display: block;
				left: -9px;
				top: calc(50% - 12px);
				background-color: ${props => props.theme.color.white};
				transform: rotate(180deg);
			}
		}

		${DrawerMenuContainer} {
			display: flex;
			grid-column: 2;
			grid-row: 1 / 3;
			transition: width 0.3s ease-out;
		}
	`}
`;


type Props = {
	index: number,
	pageType: string,
	post: Post,
	onEmbiggenClick: (postId: number | string, isEmbiggened: boolean, permalink: string) => void,
	type: 'published' | 'scheduled' | 'drafts'
}

type State = {
	isOpen: boolean
}


class ArticleCard extends React.Component<Props, State> {
	static defaultProps = {
		pageType: 'manageblog'
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	setWidth(isOpen: boolean) {
		this.setState({
			isOpen
		});
	}

	render() {
		const { index, onEmbiggenClick, pageType, post, type } = this.props;
		const {
			authors,
			defaultBlog,
			featuredMedia,
			headline,
			id,
			images,
			lastEditedBy,
			lastUpdateTimeMillis,
			permalink,
			permalinkHost,
			permalinkPath,
			plaintext,
			properties,
			publishTimeMillis,
			replyCount,
			sharingMainImage,
			storyType,
			timezone,
			vertical,
			viewCount
		} = post;

		let image = sharingMainImage;
		if (featuredMedia) {
			image = featuredMedia;
		} else if (images && images.length) {
			image = images[0];
		}

		const embiggen = properties ? (JSON.parse(properties).isEmbiggened || !!post.aboveHeadline) : false;
		const timestamp = type === 'drafts' ? lastUpdateTimeMillis : publishTimeMillis;
		const securePermalink = (!permalinkHost || !permalinkPath) ? permalink : `${permalinkHost}${permalinkPath}`;

		const storyTypeMarkup = storyType
			? <StoryTypeContainer>
				{permalinkHost
					? <Link href={`${permalinkHost}/c/${storyType.canonical}`}>
						<StoryTypeLabel tag={storyType.title}/>
					</Link>
					: <StoryTypeLabel tag={storyType.title}/>
				}
			</StoryTypeContainer>
			: null;

		const verticalMarkup = vertical ? <Vertical>{vertical}</Vertical> : null;
		const tagContainer = storyType || vertical
			? <TagContainer>
				{storyTypeMarkup}
				{verticalMarkup}
			</TagContainer>
			: null;

		const embiggenIconProps = onEmbiggenClick && id
			? { onClick: () => onEmbiggenClick(id, !embiggen, securePermalink || '') }
			: null;

		let dateTitle = 'Published';
		if (type === 'scheduled') {
			dateTitle = 'Scheduled';
		} else if (type === 'drafts') {
			dateTitle = 'Last Saved';
		}

		return (
			// $FlowFixMe
			<Theme blog={defaultBlog ? defaultBlog.blogGroup : 'default'}>
				<Container isOpen={this.state.isOpen}>
					<PostInfo>
						<Link href={securePermalink}
							{...securePermalink ? { events: [StreamPostClick(index, securePermalink, pageType)]} : null}
						>
							<ImageContainer>
								{image && <ImageElement
									id={image.thumbnail ? image.thumbnail.id : image.id}
									format={image.thumbnail ? image.thumbnail.format : image.format}
									transform="KinjaCenteredMediumAutoFrozen"
								/>}
							</ImageContainer>
						</Link>

						<PostDetails>
							{tagContainer}
							<Link href={securePermalink}
								{...securePermalink ? { events: [StreamPostClick(index, securePermalink, pageType)]} : null}
							>
								{ headline
									? <Headline dangerouslySetInnerHTML={{ __html: headline }} />
									: <PlainText lines={3}>{plaintext}</PlainText>
								}
							</Link>
							<AuthorWrapper>{authors && authors.length && authors.map((author, index) => (
								<React.Fragment key={shortid.generate()}>
									{author.displayName}{index !== authors.length - 1 && ', '}
								</React.Fragment>
							))}</AuthorWrapper>
						</PostDetails>
					</PostInfo>

					<PostData>
						<Published>
							<PublishedTitle>{dateTitle}:&#160;</PublishedTitle>{timestamp && new FormattedTime({ timestamp, timezone }).fullDateTime}
						</Published>
						<LastEdited>
							<LastEditedTitle>Last Edited By:&#160;</LastEditedTitle>
							{lastEditedBy
								? lastEditedBy
								: <LoadingWrapper>
									<Loading />
								</LoadingWrapper>}
						</LastEdited>
						<AnalyticsContainer>
							<Comments>
								<BubbleIcon />
								{replyCount}
							</Comments>
							<PageViews>
								<FlameIcon />
								{viewCount}
							</PageViews>
						</AnalyticsContainer>
					</PostData>

					<IconContainer>
						{id
							? <Link data-ga={`[["Manage page click", "Posts - Edit post click", "${securePermalink ? securePermalink : ''}"]]`}
								href={`http://${getKinjaHost()}/write/${id}` }
							>
								<WriteIcon />
							</Link>
							: <WriteIcon />
						}
						<EmbiggenIconContainer isEmbiggened={embiggen}>
							{embiggen ?
								<EmbiggenFilledIcon {...embiggenIconProps} /> : <EmbiggenIcon {...embiggenIconProps} />}
						</EmbiggenIconContainer>
						<SwipeIconContainer>
							<ChevronRightIcon />
						</SwipeIconContainer>
					</IconContainer>
					<DrawerMenu
						isEmbiggened={embiggen}
						onDrawerMenuIconClick={isOpen => this.setWidth(isOpen)}
						onEmbiggenClick={(id, isEmbiggened) => onEmbiggenClick(id, isEmbiggened, securePermalink || '')}
						postId={id}
					/>
				</Container>
			</Theme>
		);
	}
}


export default ArticleCard;
