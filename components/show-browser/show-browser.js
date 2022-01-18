// @flow

import * as React from 'react';
import styled from 'styled-components';
import Analytics from '../hoc/analytics';
import BlurredBackground from '../blurred-background';
import Button from '../buttons';
import ChevronRightIcon from '../icon19/ChevronRight';
import getBlogGroupMeta from '../../utils/getBlogGroupMeta';
import ShowBrowserListItem from './show-browser-list-item';
import Theme, { matchBlogGroupToTheme } from '../theme';

import type { ShowBrowserData, VideoTab, VideoPostLink } from 'module/video/videoRequest';
import type { AnalyticsInjectedProps } from '../hoc/analytics';

type Props = {
	maxLinks?: number,
	getData: () => Promise<ShowBrowserData>,
	blogGroup: string
} & AnalyticsInjectedProps;

type State = {
	tab: ?VideoTab,
	links: Array<VideoPostLink>
}

const Header = styled.div`
	height: 50px;
	flex: 0 0 auto;
	text-transform: uppercase;
	font-size: 15px;
	color: rgba(255, 255, 255, 0.6);
	line-height: 50px;

	& > strong {
		color: ${props => props.theme.color.white};
	}
`;

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 18px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: space-evenly;
	overflow: hidden;
	flex: 0 1 auto;
`;

const ShowMoreButton = styled(Button)`
	margin: 25px 0;
	flex: 0 0 auto;
	width: 100%;
`;

class ShowBrowser extends React.Component<Props, State> {
	state = {
		tab: null,
		links: []
	}

	componentDidMount() {
		this.props.getData().then(data => {
			this.setState(data);
		});
	}

	onVideoClick(e: SyntheticMouseEvent<HTMLAnchorElement>, index: number, permalink: string) {
		const href = e.currentTarget.href;
		const isSimpleClick = !(e.shiftKey || e.ctrlKey || e.metaKey);

		if (isSimpleClick) {
			e.preventDefault();
		}

		this.props.ga(
			'Video Player Interaction',
			`Sidebar Video click - position ${index}`,
			permalink,
			{
				hitCallback: () => {
					if (isSimpleClick) {
						window.location.href = href;
					}
				}
			}
		);
	}

	onShowMoreClick = () => {
		if (!this.state.tab) {
			return;
		}

		const { name, canonicalPath } = this.state.tab;
		const host = getBlogGroupMeta().hostName;
		const href = `https://${host}${canonicalPath}`;

		this.props.ga(
			'Video Player Interaction',
			'Sidebar View More click',
			`${name}`,
			{
				hitCallback: () => {
					window.location.href = href;
				}
			}
		);
	}

	getTabLabel(name) {
		return name.toLowerCase() === 'video' ? getBlogGroupMeta().blogName : name;
	}

	render() {
		if (this.state.tab) {
			const { maxLinks, blogGroup } = this.props;
			const { tab, links } = this.state;

			const tabLabel = this.getTabLabel(tab.name);
			const backgroundImage = links[0] ? links[0].thumbnail.id : '';
			const showMoreButton = !maxLinks || links.length >= maxLinks;
			const linksToShow = maxLinks ? links.slice(0, maxLinks) : links;
			const moreVideosLabel = `More videos from ${tabLabel}`;

			return (
				<Theme blog={matchBlogGroupToTheme(blogGroup)}>
					<BlurredBackground background={backgroundImage}>
						<Container>
							<Header>Latest videos on <strong>{tabLabel}</strong></Header>
							<Content>
								{linksToShow.map((link, index) =>
									<ShowBrowserListItem
										key={link ? link.id : index}
										videoPostLink={link}
										onClick={e => this.onVideoClick(e, index, link.permalink)}
									/>
								)}
							</Content>
							{showMoreButton &&
								<ShowMoreButton
									variant='primary'
									label={moreVideosLabel}
									weight="primary"
									fullwidth
									icon={<ChevronRightIcon />}
									onClick={this.onShowMoreClick}
								/>
							}
						</Container>
					</BlurredBackground>
				</Theme>
			);
		} else {
			return null;
		}
	}
}

export default Analytics(ShowBrowser);
