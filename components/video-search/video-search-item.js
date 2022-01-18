// @flow

import * as React from 'react';
import { DateTime as DT, Duration } from 'luxon';
import styled from 'styled-components';

import createTranslate from 'kinja-components/components/translator';
import translations from './translations';
import type { Locale } from 'kinja-magma/models/Locale';
import type VideoSearchResult from 'kinja-magma/models/VideoSearchResult';
import { LazyResponsiveImage, MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH } from '../elements/image';
import placeholderImage from 'kinja-images/placeholderImage';
import Button from '../buttons';
import BlogAvatar, { BlogAvatarWrapper } from '../blog-avatar';
import ArrowRight from '../icon19/ArrowRight';
import ChevronDown from '../icon19/ChevronDown';
import { IconWrapper } from '../icon19/icon19';
import DateTime from '../../utils/DateTime';

type VideoSearchItemProps = {
	item: VideoSearchResult,
	onClick: (id: string) => void,
	locale?: Locale
};

type VideoSearchItemState = {
	postListOpen: boolean
};

const ItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding-bottom: 15px;
`;

const ItemPreview = styled.div`
	position: relative;
	height: 68px;
	min-width: 120px;
`;

const ItemPreviewInfo = styled.div`
	background: ${({theme}) => theme.color.blackOverlay};
	color: ${({theme}) => theme.color.white};
	display: flex;
	position: absolute;
	bottom: 1px;
	height: 21px;
	line-height: 21px;
	padding: 0 5px;
	font-size: 13px;

	${BlogAvatarWrapper} {
		margin-left: -5px;
		margin-right: 5px;
	}
`;

const ItemImage = styled.div`
	height: 68px;
	width: 120px;
`;

const ItemPreroll = styled(ItemPreviewInfo)`
	right: 0;
`;

const ItemDetails = styled.div`
	flex-grow: 10;
	margin: 0 16px;

	> div {
		font-size: 13px;
		color: ${({theme}) => theme.color.gray};
		margin-bottom: 10px;

		> * {
			::after {
				content: '●';
				padding: 0 4px;
			}
		}

		> *:last-child {
			::after {
				display: none;
			}
		}

		a {
			color: ${({theme}) => theme.color.gray};

			${IconWrapper} {
				svg {
					width: 9px;
					height: 9px;
				}
				margin-left: 5px;
				margin-top: 0;
				display: inline-block;
			}
		}

		a:hover {
			text-decoration: none;
		}
	}

	ul {
		font-size: 14px;
		list-style-type: disc;
		padding-left: 16px;

		a {
			color: ${({theme}) => theme.color.black};
			font-size: 14px;
		}

		a:hover {
			text-decoration: none;
		}
	}
`;

const ItemTitle = styled.h1`
	font-size: 18px;
	margin-bottom: 5px;
	display: flex;

	${IconWrapper} {
		opacity: 0.3;
		margin-right: 5px;
	}
`;

const getLogoName = network => {
	switch (network) {
		case 'a.v. club':
			return 'avclub';
		case 'the root':
			return 'theroot';
		case 'the onion':
			return 'theonion';
		case 'the takeout':
			return 'thetakeout';
		case 'deadspin':
		case 'clickhole':
		case 'earther':
		case 'gizmodo':
		case 'jalopnik':
		case 'jezebel':
		case 'kotaku':
		case 'lifehacker':
		case 'splinter':
			return network;
		default:
			return null;
	}
};

class VideoSearchItem extends React.Component<VideoSearchItemProps, VideoSearchItemState> {
	state = {
		postListOpen: false
	}

	static defaultProps = {
		locale: 'en-US'
	};

	togglePosts = () => {
		this.setState(prevState => ({
			postListOpen: !prevState.postListOpen
		}));
	}

	render() {
		const {item, onClick, locale} = this.props;
		const translate = createTranslate(translations, locale);

		const datetime = DT.fromISO(item.publishTime.replace(/\[.*/, ''));
		const timestamp = datetime.toMillis();
		const publishTime = new DateTime({ timestamp, locale });

		const duration = Duration
			.fromObject({minutes: 0, seconds: item.duration})
			.normalize()
			.toFormat('mm:ss');
		const blogName = getLogoName(item.network);

		return <ItemContainer>
			<ItemPreview>
				<ItemImage>
					{item.poster ? <LazyResponsiveImage
						alt={item.title}
						ariaLabel={item.title}
						format={item.poster.format}
						id={item.poster.id}
						width={MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH}
						transform="KinjaCenteredLargeAuto"
						croppedImage
						noLazy
					/> : <img src={placeholderImage(blogName)}/>}
				</ItemImage>
				<ItemPreviewInfo>
					{blogName && <BlogAvatar name={blogName} size={21} />}
					{duration}
				</ItemPreviewInfo>
				{item.monetizable && <ItemPreroll>PR</ItemPreroll>}
			</ItemPreview>
			<ItemDetails>
				<ItemTitle>
					{item.title}
				</ItemTitle>
				<div>
					<span>{publishTime.relativeDateTime}</span>
					{item.posts.length > 0 &&
						<a onClick={this.togglePosts}>
							{translate('This video appears in')}<ChevronDown/>
						</a>
					}
				</div>
				{this.state.postListOpen && <ul>
					{item.posts.map(post =>
						<li key={post.id}>
							<a
								href={post.permalink}
								target="_blank"
								rel="noopener noreferrer"
								dangerouslySetInnerHTML={{__html: post.headline}}
							/>
						</li>
					)}
				</ul>}
			</ItemDetails>
			<div>
				<Button
					icon={<ArrowRight/>}
					sort="circle"
					onClick={() => onClick(item.id)}
				/>
			</div>
		</ItemContainer>;
	}
}

export default VideoSearchItem;
