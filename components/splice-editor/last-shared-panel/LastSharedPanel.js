/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import UnshareModal from './UnshareModal';

// ICONS
import CloseIcon from '../../icon19/Close';
import ChevronUpIcon from '../../icon19/ChevronUp';
import ChevronDownIcon from '../../icon19/ChevronDown';
import BlogAvatar from '../../blog-avatar';

import Button, { ButtonWrapper } from 'kinja-components/components/buttons/Button';
import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';

import type { BlogId } from 'kinja-magma/models/Id';
import type { LastSharedBlog } from '../';


const LastShare = styled.div`
	display: flex;
`;

const TitleText = styled.div`
	text-align: center;
	margin-bottom: 8px;
`;

const TitleTime = styled.div`
	display: flex;
	justify-content: center;
`;

export const Title = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 0;
	font-size: 20px;
	line-height: 22px;
	color: ${props => props.theme.color.black};
	cursor: pointer;

	${LastShare} {
		color: ${props => props.theme.color.primary};
	}
`;

const Offset = styled.div`
	font-size: 16px;
	line-height: 18px;
	align-self: flex-end;
`;

const BlogContainer = styled.div`
	width: 100%;
	padding-top: 30px;
`;

const IconOnDesktop = styled.div`
	margin-right: 10px;
	margin-bottom: 2px;
`;

const IconOnMobile = styled.div`
	position: relative;
	top: -1px;
	margin-right: 10px;
	cursor: pointer;
`;

export const BlogItem = styled.div`
	display: flex;
	align-items: center;
	height: 34px;

	&:not(:last-child) {
		margin-bottom: 10px;
	}

	${IconOnDesktop} {
		display: none;
	}

	${ButtonWrapper} {
		display: none;
		position: relative;
		top: 4px;
	}
`;

const BlogName = styled.span`
	width: 160px;
	font-size: 16px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const BlogSharedTime = styled.div`
	flex: 1;
	line-height: 19px;
	user-select: none;

	${LastShare} {
		justify-content: flex-end;
	}

	${Offset} {
		font-size: 14px;
	}
`;

export const Container = styled.div`
	width: 100%;
	text-align: left;

	${media.mediumUp`
		${Title} {
			flex-direction: row;
		}

		${TitleText} {
			margin: 0;
		}

		${BlogItem} {
			align-items: flex-end;

			&:hover {
				${ButtonWrapper} {
					display: block;
				}
			}
		}

		${BlogName} {
			font-size: 20px;
		}

		${BlogSharedTime} {
			align-self: flex-end;
		}

		${IconOnMobile} {
			display: none;
		}

		${IconOnDesktop} {
			display: block;
		}

		${LastShare} {
			justify-content: flex-start;
		}

		${BlogSharedTime} {
			flex: unset;
			margin-right: 60px;

			${LastShare} {
				width: 180px;
			}
		}
	`}
`;


type Props = {
	locale: string,
	lastSharedBlogs: Array<LastSharedBlog>,
	onUnshare: (blogId: BlogId, displayName: string) => void,
	timezone: string
};

type State = {
	isOpen: boolean,
	lastSharedBlogs: Array<LastSharedBlog>,
	lastSharedMillis: number,
	showUnshareModal: boolean,
	unshareBlogDisplayName: ?string,
	unshareBlogId: ?BlogId
}

class LastSharedPanel extends React.Component<Props, State> {
	static defaultProps = {
		locale: 'en-US'
	}

	state = {
		isOpen: false,
		lastSharedBlogs: this.props.lastSharedBlogs,
		lastSharedMillis: this.getLastSharedMillis(this.props.lastSharedBlogs),
		showUnshareModal: false,
		unshareBlogDisplayName: '',
		unshareBlogId: null
	}

	getLastSharedMillis(lastSharedBlogs: Array<LastSharedBlog>) {
		return Math.max(...lastSharedBlogs.map(blog => blog.createTimeMillis));
	}

	getSharedTimeElement(timemillis: number) {
		const { timezone: zone } = this.props;
		const year = DateTime.fromMillis(timemillis, { zone }).toFormat('y');
		const month = DateTime.fromMillis(timemillis, { zone }).toFormat('L');
		const day = DateTime.fromMillis(timemillis, { zone }).toFormat('dd');
		const date = `${month}/${day}/${year}`;
		const hour = DateTime.fromMillis(timemillis, { zone }).toFormat('h');
		const minute = DateTime.fromMillis(timemillis, { zone }).toFormat('mm');
		const meridiem = DateTime.fromMillis(timemillis, { zone }).toFormat('a').toLowerCase();
		const offset = DateTime.fromMillis(timemillis, { zone }).toFormat('ZZZZ');

		return <LastShare>&#160;{date} {this.translate('at')} {hour}:{minute}{meridiem}&#160;<Offset>{offset}</Offset></LastShare>;
	}

	onTitleClick = () => {
		this.setState({ isOpen: !this.state.isOpen });
	}

	onUnshare = (id: BlogId, displayName: string) => {
		this.setState({
			showUnshareModal: true,
			unshareBlogDisplayName: displayName,
			unshareBlogId: id
		});
	}

	onUnshareConfirm = () => {
		if (this.state.unshareBlogDisplayName && this.state.unshareBlogId) {
			this.setState({
				lastSharedBlogs: this.state.lastSharedBlogs.filter(blog => blog.id !== this.state.unshareBlogId)
			}, () => {
				if (this.state.unshareBlogId && this.state.unshareBlogDisplayName) {
					this.props.onUnshare(this.state.unshareBlogId, this.state.unshareBlogDisplayName);
					this.onModalClose();
				}
			});
		}
	}

	onModalClose = () => {
		this.setState({
			showUnshareModal: false,
			unshareBlogDisplayName: '',
			unshareBlogId: null
		});
	}

	translate = createTranslate(translations, this.props.locale);
	render() {
		return (
			<EnsureDefaultTheme>
				<React.Fragment>
					<Container>
						<Title onClick={this.onTitleClick}>
							<TitleText>{this.translate('Was last shared on')}</TitleText>
							<TitleTime>
								{this.getSharedTimeElement(this.state.lastSharedMillis)}
								{this.state.isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
							</TitleTime>
						</Title>
						{this.state.isOpen &&
							<BlogContainer>
								{this.state.lastSharedBlogs.map(blog => {
									return (
										<BlogItem key={blog.id}>
											<IconOnMobile onClick={() => this.onUnshare(blog.id, blog.displayName)}><CloseIcon /></IconOnMobile>
											{blog.blogGroup
												? <IconOnDesktop><BlogAvatar name={blog.blogGroup} size={20} /></IconOnDesktop>
												: <IconOnDesktop><BlogAvatar name="kinja" size={18} /></IconOnDesktop>
											}
											<BlogName>{blog.displayName}</BlogName>
											<BlogSharedTime>{this.getSharedTimeElement(blog.repostTimeMillis)}</BlogSharedTime>
											<Button weight="secondary" label="Unshare" small
												onClick={() => this.onUnshare(blog.id, blog.displayName)} />
										</BlogItem>
									);
								})}
							</BlogContainer>
						}
					</Container>

					{this.state.showUnshareModal && this.state.unshareBlogDisplayName &&
						<UnshareModal
							displayName={this.state.unshareBlogDisplayName}
							isOpen={this.state.showUnshareModal}
							locale={this.props.locale}
							onClose={this.onModalClose}
							onSubmit={this.onUnshareConfirm}
						/>
					}
				</React.Fragment>
			</EnsureDefaultTheme>
		);
	}
}

export default LastSharedPanel;