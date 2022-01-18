/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import { getKinjaHost } from 'kinja-components/utils/url';
import typeof FeedItem from '../../stream-new/feed-item';
import { PostToolsContainerDesktop } from '../../story-cards-stream/post-tools-containers';
import DrawerMenu, { Container as DrawerMenuContainer } from '../drawer-menu';
import Link, { Anchor } from '../../elements/link';
import media from '../../../style-utils/media';

// ICONS
import EmbiggenIcon from '../../icon19/Embiggen';
import EmbiggenFilledIcon from '../../icon19/EmbiggenFilled';
import WriteIcon from '../../icon19/Write';

import type { PostId } from 'kinja-magma/models/Id';


export const PostWrapper = styled.div`
	padding-bottom: 35px;
	margin-bottom: 41px;
	border-bottom: 1px solid ${props => props.theme.color.lightgray};

	${props => props.isLastScheduledItem && css`
		border-bottom: none;
		margin-bottom: 0;
	`}
`;

const MetaToolWrapper = styled(PostToolsContainerDesktop)`
	flex-direction: column;
	align-items: center;
	top: 0;
	line-height: 18px;

	${Anchor} {
		margin-bottom: 24px;
	}

	svg {
		cursor: pointer;
		color: ${props => props.theme.color.gray};

		&:hover {
			color: ${props => props.theme.color.primary};
		}
	}
`;

const PostWrapperWithDrawerMenu = styled(PostWrapper)`
	position: relative;
	width: 100%;
	transition: margin 0.3s ease-out;

	${props => props.isLastScheduledItem && css`
		border-bottom: none;
		margin-bottom: 0;
	`}

	${DrawerMenuContainer} {
		display: none;
	}

	${media.mediumDown`
		display: grid;
		grid-template-columns: calc(100% - 19px) 29px;

		${props => props.isOpen && css`
			overflow: hidden;
			margin-left: -71px;
			width: calc(100% + 71px);
			grid-template-columns: calc(100% - 90px) 100px;
		`}

		${MetaToolWrapper} {
			display: none;
		}

		${DrawerMenuContainer} {
			display: flex;
			grid-column: 2;
			transition: width 0.3s ease-out;
		}
	`}
`;

const IconWrapper = styled.span`
	${({ theme, isEmbiggened }) => isEmbiggened && `
		svg {
			color: ${theme.color.primary};
		}
		&:hover {
			svg {
				color: ${theme.color.gray};
			}
		}
	`}
`;

type Props = {
	children: React.Element<FeedItem>,
	isEmbiggened: boolean,
	isLastScheduledItem?: boolean,
	permalink: string,
	postId: PostId,
	onEmbiggenClick: (value: PostId, isEmbiggened: boolean, permalink: string) => void
}

class FeedItemWrapper extends React.Component<Props, { isOpen: boolean }> {
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
		const {
			children,
			isEmbiggened,
			isLastScheduledItem,
			permalink,
			postId,
			onEmbiggenClick
		} = this.props;
		const { isOpen } = this.state;

		return (
			<PostWrapperWithDrawerMenu
				isOpen={isOpen}
				isLastScheduledItem={isLastScheduledItem}
			>
				{children}
				<MetaToolWrapper>
					<Link data-ga={`[["Manage page click", "Posts - Edit post click", "${permalink}"]]`}
						href={`http://${getKinjaHost()}/write/${postId}` }
					>
						<WriteIcon />
					</Link>
					<IconWrapper isEmbiggened={isEmbiggened} onClick={() => onEmbiggenClick(postId, !isEmbiggened, permalink)}>
						{isEmbiggened ? <EmbiggenFilledIcon /> : <EmbiggenIcon />}
					</IconWrapper>
				</MetaToolWrapper>
				<DrawerMenu
					isEmbiggened={isEmbiggened}
					onDrawerMenuIconClick={isOpen => this.setWidth(isOpen)}
					onEmbiggenClick={onEmbiggenClick}
					permalink={permalink}
					postId={postId}
				/>
			</PostWrapperWithDrawerMenu>
		);
	}
}


export default FeedItemWrapper;
