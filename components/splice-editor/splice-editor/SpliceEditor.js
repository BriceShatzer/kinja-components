/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import { DateTime } from 'luxon';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import FolderSelector, {
	BrowserContainer,
	BrowserWrapper,
	Wrapper as FolderWrapper
} from '../../folder-selector';
import {
	FolderTitle,
	InnerWrapper,
	Wrapper as FolderBrowserWrapper
} from '../../folder-selector/folder-browser';
import { Wrapper as FoldersWrapper } from '../../folder-selector/folder';
import { Wrapper as FooterWrapper } from '../../folder-selector/footer';
import DateTimePicker, { Container as DateTimePickerContainer } from '../../datetime-picker';
import { Container as DatePickerContainer, CalendarWrapper } from '../../datetime-picker/date-picker/DatePicker';
import { Container as TimePickerContainer, CalendarWrapper as TimePickerWrapper } from '../../datetime-picker/time-picker';
import FeedItem from 'kinja-components/components/stream-new/feed-item';
import { BylineContainer as CompactByline, HeadlineContainer as CompactHeadline, MobileMetaInfo } from '../../story-cards-stream/story-card-compact';
import { BylineContainer as EmbiggenedByline } from '../../story-cards-stream/story-card-embiggened';
import { HeadlineContainer, MetaInfoContainer } from '../../story-cards-stream/story-card-embiggened';
import Button, { ButtonWrapper as ButtonElement } from '../../buttons/Button';

// ICONS
import EmbiggenIcon from '../../icon19/Embiggen';
import EmbiggenFilledIcon from '../../icon19/EmbiggenFilled';

import LastSharedPanel, { Container as LastSharedContainer } from '../last-shared-panel';
import Confirmation, { Container as ConfirmationContainer } from '../confirmation';
import Modal, { ChildrenWrapper, ScrollableContainer } from 'kinja-components/components/modal/modal';
import trimExcerpt from 'postbody/utils/trimExcerpt';
import { parseNode } from 'postbody/BlockNode';

import Post from 'kinja-magma/models/Post';

import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';

import type User from 'kinja-magma/models/User';
import type Blog from 'kinja-magma/models/Blog';
import type { BlogId } from 'kinja-magma/models/Id';
import type PostType from 'kinja-magma/models/Post';
import type { PageType } from 'kinja-magma/models/PageType';
import type { Level } from 'kinja-components/components/folder-selector/types';
import type { LastSharedBlog, ParentBlogItem, ShareModel } from '../';


const StyledModal = styled(Modal)`
	justify-content: flex-start;
	transform: unset;
	top: 0;
	left: 0;

	${ChildrenWrapper} {
		width: 100vw;
	}

	${ScrollableContainer} {
		height: 100vh;
		padding: 20px 15px;
	}
`;

const TitleWrapper = styled.div``;
const Title = styled.h1`
	margin-bottom: 34px;
	font-size: 28px;
	font-weight: bold;
	text-align: center;
	line-height: 44px;
`;

const SplicingWrapper = styled.div`
	width: 100%;
`;

const ContentWrapper = styled.div`
	display: flex;
	justify-content: center;

	${SplicingWrapper} {
		display: block;
	}

	${ConfirmationContainer} {
		display: none;
	}

	${props => props.isConfirmationDisplayed && css`
		${SplicingWrapper} {
			display: none;
		}

		${ConfirmationContainer} {
			display: flex;
			justify-content: center;
		}
	`}
`;

const TopWrapper = styled.div`
	width: 100vw;
	padding-bottom: 26px;
	margin-left: -15px;
`;

const DateTimePickerWrapper = styled.div`
	position: relative;
	width: 100%;
`;

const FolderSelectorWrapper = styled.div`
	position: relative;
	width: 100%;
	padding: 0 15px;
`;

const CardWrapper = styled.div`
	position: relative;
	padding: 35px 0 10px;
	margin-bottom: 80px;
	border: 1px solid ${props => props.theme.color.midgray};

	${props => props.hasStoryType && css`
		padding-top: 10px;
	`}
`;

export const EmbiggenedWrapper = styled.div`
	position: absolute;
	display: flex;
	top: 10px;
	right: 10px;
	font-size: 14px;
	line-height: 17px;
	color: ${props => props.theme.color.gray};
	cursor: pointer;
	user-select: none;
	z-index: 44;

	svg {
		margin-left: 5px;
	}
`;

const ButtonWrapper = styled.div`
	position: relative;
	left: -15px;
	display: flex;
	justify-content: center;
	background-color: ${props => props.theme.color.white};
	width: 100vw;
	padding: 20px;
	border-top: 1px solid ${props => props.theme.color.midgray};
	user-select: none;
	z-index: 99;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;

	${ButtonElement}:first-child {
		margin-right: 25px;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 800px;

	${LastSharedContainer} {
		margin-bottom: 30px;
	}

	${DateTimePickerContainer} {
		align-items: flex-end;
		justify-content: center;
		margin-bottom: 40px;
	}

	${DatePickerContainer} {
		position: static;
	}

	${TimePickerContainer} {
		position: static;
		align-items: flex-end;
	}

	${FolderWrapper},
	${BrowserContainer} {
		position: static;
	}

	${FolderBrowserWrapper} {
		border-radius: 3px;
	}

	${BrowserWrapper} {
		top: unset;
		left: -1px;
	}

	${InnerWrapper} {
		width: calc(100vw - 2px);
	}

	${FolderTitle},
	${FoldersWrapper} {
		flex: 0 0 50%;
	}

	${FooterWrapper} {
		display: none;
	}

	${CompactByline},
	${EmbiggenedByline},
	${HeadlineContainer},
	${MetaInfoContainer},
	${CompactHeadline},
	${MobileMetaInfo} {
		padding-left: 10px;
		padding-right: 10px;
	}

	${ConfirmationContainer} {
		padding-bottom: 100px;
	}

	${media.mediumUp`
		padding: 0;

		${props => props.inModal && css`
			&::before {
				content: '';
				height: 20%;
				min-height: 60px;
			}
		`}

		${Title} {
			font-size: 34px;
		}

		${TopWrapper} {
			display: flex;
			justify-content: space-between;
			width: auto;
			padding-bottom: 33px;
			margin-left: 0;
		}

		${LastSharedContainer} {
			margin-bottom: 70px;
		}

		${FolderSelectorWrapper} {
			width: auto;
			padding: 0;
		}

		${BrowserContainer} {
			position: relative;
		}

		${BrowserWrapper} {
			top: -1px;
			left: unset;
		}

		${InnerWrapper} {
			width: 400px;
		}

		${FolderTitle},
		${FoldersWrapper} {
			flex: 0 0 200px;
		}

		${FooterWrapper} {
			display: flex;
		}

		${DateTimePickerContainer} {
			margin: 0;
		}

		${DateTimePickerWrapper} {
			order: 2;
			display: flex;
			flex-shrink: 1;
			align-items: flex-end;
			justify-content: flex-end;
			max-width: 220px;
		}

		${DatePickerContainer},
		${TimePickerContainer} {
			position: relative;
		}

		${CalendarWrapper} {
			left: -230px;
		}

		${TimePickerContainer} {
			position: relative;
		}

		${CardWrapper} {
			padding: 45px;
		}

		${EmbiggenedWrapper} {
			top: 12px;
			right: 12px;
		}

		${CompactByline},
		${EmbiggenedByline},
		${HeadlineContainer},
		${MetaInfoContainer},
		${CompactHeadline} {
			padding-left: 0;
			padding-right: 0;
		}

		${ButtonWrapper} {
			position: fixed;
			left: 0;
			bottom: 0;
		}
	`}

	${media.xlargeUp`
		${CalendarWrapper} {
			left: -120px;
		}
	`}

	@media only screen and (min-width: 37.4376em) and (max-width: 75em) {
		${TimePickerWrapper} {
			left: -295px;
		}
	}
`;

type State = {
	isConfirmationDisplayed: boolean,
	isEmbiggened: boolean,
	lastSharedBlogs: ?Array<LastSharedBlog>,
	selectedBlogs: Array<ParentBlogItem>,
	timemillis: number
}

type Props = {
	authors: Array<User>,
	blog: Blog,
	inModal: boolean,
	lastSharedBlogs?: Array<LastSharedBlog>,
	levels: Array<Level>,
	locale?: string,
	onCancel: () => void,
	onShare: (shareModel: ShareModel) => void,
	onUnshare: (blogId: BlogId, displayName: string) => void,
	pageType: PageType,
	post: PostType,
	timemillis: number,
	timezone: string,
	simpleEmbiggen?: boolean
}

type DefaultProps = {
	locale: string
}


class SpliceEditor extends React.Component<Props, State> {
	static defaultProps: DefaultProps = {
		inModal: true,
		locale: 'en-US',
		pageType: 'permalink',
		timezone: 'America/New_York'
	};

	state = {
		isConfirmationDisplayed: false,
		isEmbiggened: this.props.post.isEmbiggened,
		lastSharedBlogs: this.props.lastSharedBlogs,
		selectedBlogs: [],
		timemillis: this.props.timemillis
	}

	getSelectedBlogs(selectedBlogs: ?Array<ParentBlogItem>) {
		const blogArray = [];
		if (selectedBlogs && selectedBlogs.length) {
			selectedBlogs.map(parentBlog => {
				if (parentBlog.isParentSelected) {
					blogArray.push(parentBlog);
				}
				parentBlog.selectedChildren && parentBlog.selectedChildren.length && parentBlog.selectedChildren.map(vertical => {
					vertical.icon = parentBlog.icon;
					blogArray.push(vertical);
				});
			});
		}

		return blogArray;
	}

	onDateChange = (timemillis: number) => {
		this.setState({ timemillis });
	}

	onSelectedBlogsChange = (selectedBlogs: Array<ParentBlogItem>) => {
		this.setState({ selectedBlogs });
	};

	onEmbiggenClick = () => {
		this.setState({ isEmbiggened: !this.state.isEmbiggened });
	}

	onShare = () => {
		if (!this.state.isConfirmationDisplayed) {
			this.setState({ isConfirmationDisplayed: true });
		} else {
			this.props.onShare({
				isEmbiggened: this.state.isEmbiggened,
				selectedBlogs: this.getSelectedBlogs(this.state.selectedBlogs),
				timemillis: this.state.timemillis
			});
		}
	}

	onUnshare = (blogId: BlogId, displayName: string) => {
		if (this.state.lastSharedBlogs && this.state.lastSharedBlogs.length) {
			this.setState({
				lastSharedBlogs: this.state.lastSharedBlogs.filter(blog => blog.id !== blogId)
			}, () => {
				this.props.onUnshare(blogId, displayName);
			});
		}
	}

	onCancel = () => {
		if (this.state.isConfirmationDisplayed) {
			this.setState({ isConfirmationDisplayed: false });
		} else {
			this.props.onCancel();
		}
	}

	getFeedItemProps = () => {
		const {
			authors,
			blog,
			pageType,
			post,
			simpleEmbiggen
		} = this.props;

		return {
			authors,
			blog,
			embiggenPosts: true,
			excerpt: post.firstParagraph ? trimExcerpt([parseNode(post.firstParagraph)], 320) : [],
			index: 0,
			pageType,
			// $FlowFixMe
			post: Post.fromJSON({
				...post,
				properties: JSON.stringify({
					...JSON.parse(post.properties || ''),
					isEmbiggened: this.state.isEmbiggened
				})
			}),
			sponsored: Boolean(post.sponsored),
			simpleEmbiggen: Boolean(simpleEmbiggen)
		};
	}

	render() {
		const translate = createTranslate(translations, this.props.locale);
		const isFuture = this.state.timemillis > DateTime.local().toMillis();

		const SpliceEditor = (
			<Container inModal={this.props.inModal}>
				<TitleWrapper>
					<Title>{translate('Share This Post To Kinja')}</Title>
				</TitleWrapper>

				<ContentWrapper isConfirmationDisplayed={this.state.isConfirmationDisplayed}>
					<Confirmation
						isFuture={isFuture}
						selectedBlogs={this.getSelectedBlogs(this.state.selectedBlogs)}
						timemillis={this.state.timemillis}
						timezone={this.props.timezone}
					/>

					<SplicingWrapper>
						{/* LAST SHARED PANEL */}
						{this.state.lastSharedBlogs && this.state.lastSharedBlogs.length && this.props.onUnshare
							? <LastSharedPanel
								lastSharedBlogs={this.state.lastSharedBlogs}
								onUnshare={this.onUnshare}
								timezone={this.props.timezone}
							/> : null
						}

						{/* SPLICING TOOL */}
						<TopWrapper>
							<DateTimePickerWrapper>
								<DateTimePicker
									timemillis={this.props.timemillis}
									timezone={this.props.timezone}
									onDateChange={this.onDateChange}
								/>
							</DateTimePickerWrapper>
							<FolderSelectorWrapper>
								<FolderSelector
									levels={this.props.levels}
									multipleSelection
									onChange={this.onSelectedBlogsChange}
									placeholder="Choose target blogs"
								/>
							</FolderSelectorWrapper>
						</TopWrapper>
						<CardWrapper hasStoryType={Boolean(this.props.post.storyType)}>
							<EmbiggenedWrapper onClick={this.onEmbiggenClick}>
									Embiggened
								{this.state.isEmbiggened
									? <EmbiggenFilledIcon />
									: <EmbiggenIcon />
								}
							</EmbiggenedWrapper>
							<FeedItem {...this.getFeedItemProps()} />
						</CardWrapper>
					</SplicingWrapper>
				</ContentWrapper>

				<ButtonWrapper>
					<ButtonContainer>
						<Button label="Cancel" weight="secondary" onClick={this.onCancel} />
						<Button
							label={isFuture ? 'Schedule' : 'Share'}
							disabled={this.state.selectedBlogs && !this.state.selectedBlogs.length}
							onClick={this.onShare}
						/>
					</ButtonContainer>
				</ButtonWrapper>
			</Container>
		);

		return (
			<EnsureDefaultTheme>
				{this.props.inModal
					? <StyledModal fullscreen scrollable isOpen>{SpliceEditor}</StyledModal>
					: SpliceEditor
				}
			</EnsureDefaultTheme>
		);
	}
}


export default SpliceEditor;
