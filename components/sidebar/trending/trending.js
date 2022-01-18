// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../../theme';

import createTranslate from '../../translator';
import type { TranslateFunction } from '../../translator';
import translations from './translations';
import SidebarPost from 'kinja-magma/models/SidebarPost';
import type Blog from 'kinja-magma/models/Blog';
import TrendingItem from './trending-item';
import TrendingProgressBar, { Segment } from './trending-progressbar';
import TrendingThumbnails from './trending-thumbnails';

const ReelWrap = styled.div`
	box-sizing: border-box;
	overflow: hidden;
`;

const Reel = styled.div`
	width: ${props => `${props.count * 100}%`};
	transform: translate3d(0, 0, 0);
`;

const TrendingReel = styled.div`
	contain: content;

	&:hover ${Segment} > div {
		animation-play-state: paused;
	}
`;

const TrendingContainer = styled.div.attrs({
	id: 'trending-module'
})`
	header {
		margin: 5px 0 16px;

		h2 {
			margin: 0;
			font-weight: normal;
			font-size: 20px;
			font-family: ${props => props.theme.typography.utility.fontFamily};
			color: ${props => props.theme.color.darkgray};

			a {
				color: ${props => props.theme.color.darkgray};
			}

			strong {
				color: ${props => props.theme.color.black};
			}
		}
	}
`;

export type Props = {
	posts: Array<SidebarPost>,
	currentBlog: Blog,
	maxPosts: number
};
type State = {
	selectedItem: number,
	activeItem: number,
	resetLoop: boolean
};


export class Trending extends Component<Props, State> {
	translate: TranslateFunction;
	static defaultProps = {
		maxPosts: 3
	};

	constructor(props: Props) {
		super(props);

		const language = props.currentBlog && props.currentBlog.locale;
		this.translate = createTranslate(translations, language);
	}

	state = {
		selectedItem: 0,
		activeItem: 0,
		resetLoop: false
	}

	setItem = (index: number) => {
		this.setState({
			selectedItem: index,
			activeItem: index
		});
	}

	componentWillReceiveProps(newProps: Props) {
		// restart loop if number of posts changes
		const numberOfPosts = Math.min(this.props.posts.length, this.props.maxPosts);
		const newNumberOfPosts = Math.min(newProps.posts.length, newProps.maxPosts);

		if (numberOfPosts !== newNumberOfPosts) {
			this.setItem(0);
			this.setState({
				resetLoop: true
			});
		}
	}

	componentDidUpdate() {
		if (this.state.resetLoop) {
			// this is to force a rerender on loop reset
			setTimeout(() => {
				this.setState({
					resetLoop: false
				});
			}, 0);
		}
	}

	onMouseEnter = (index: number) => {
		this.setState({
			selectedItem: index
		});
	}

	onMouseLeave = () => {
		this.setState({
			selectedItem: this.state.activeItem
		});
	}

	nextTick = () => {
		const next = (this.state.activeItem + 1) % this.props.maxPosts;

		if (next === 0) {
			this.setState({
				resetLoop: true
			});
		}

		this.setItem(next);
	}

	render() {
		const { maxPosts, currentBlog } = this.props;
		let { posts } = this.props;
		posts = posts && posts.slice(0, maxPosts);

		if (!posts || !posts.length) {
			return null;
		}

		const title = this.translate('<strong>You</strong> may also like');

		return (
			<EnsureDefaultTheme>
				<TrendingContainer>
					<header>
						<h2 dangerouslySetInnerHTML={{ __html: title }} />
					</header>

					<TrendingReel
						onMouseLeave={this.onMouseLeave}
						className="trending-reel"
					>
						{posts.length > 1 && <TrendingThumbnails
							posts={posts}
							selectedItem={this.state.selectedItem}
							onMouseEnter={this.onMouseEnter}
							blogGroup={currentBlog.blogGroup}
						/>}

						{posts.length > 1 && <TrendingProgressBar
							count={posts.length}
							activeItem={this.state.activeItem}
							resetLoop={this.state.resetLoop}
							onNextTick={this.nextTick}
						/>}

						<ReelWrap>
							<Reel count={posts.length}>
								{posts.map((post, index) =>
									<TrendingItem
										key={post.id}
										index={index}
										count={posts.length}
										post={post}
										currentBlog={currentBlog}
										active={index === this.state.selectedItem}
									/>
								)}
							</Reel>
						</ReelWrap>

					</TrendingReel>
				</TrendingContainer>
			</EnsureDefaultTheme>
		);
	}
}

export default Trending;
