/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import ArticleCard, { Container as PostItem} from '../article-card/ArticleCard';

// ICONS
import BubbleIcon from '../../icon19/Bubble';
import FlameIcon from '../../icon19/Flame';

import Button from '../../buttons';
import { Loading } from '../../elements/loader';
import { EnsureDefaultTheme } from '../../theme';
import media from '../../../style-utils/media';


const TitlesWrapper = styled.div`
	display: none;
`;

const Title = styled.span`
	display: flex;
	font-size: 15px;
	color: ${props => props.theme.color.darkgray};
	text-align: left;

	&:last-of-type {
		text-align: right;
	}

	svg {
		vertical-align: sub;
	}
`;

const PostContainer = styled.div`
	width: 100%;

	${PostItem} {
		margin-bottom: 30px;
	}
`;

export const MessageBox = styled.span`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 40px 0;
	font-size: 17px;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 34px;
	margin-top: 26px;
`;

const Container = styled.div`
	${media.largeUp`
		${TitlesWrapper} {
			display: grid;
			grid-template-columns: 33% 42% 12% 13%;
			width: 500px;
			float: right;
			padding: 0 35px 17px 20px;
			margin-right: 40px;
			font-weight: 600;
		}

		${PostContainer} {
			border-bottom: 1px solid ${props => props.theme.color.lightgray};
			overflow-x: unset;

			&:not(:first-of-type) {
				margin-top: 19px;
			}

			${PostItem} {
				margin-bottom: 19px;
			}
		}
	`}
`;


type Props = {
	children?: Array<React.Element<typeof ArticleCard>>,
	hasMore: boolean,
	isLoading?: boolean,
	onLoadMoreClick: () => void,
	status: 'published' | 'scheduled' | 'drafts'
}

const PostListContainer = (props: Props) => {
	const statusTitle = {
		published: 'Published',
		scheduled: 'Scheduled',
		drafts: 'Last Saved'
	};

	const { children, hasMore, isLoading, onLoadMoreClick, status } = props;

	return (
		<EnsureDefaultTheme>
			{children && children.length
				? <Container>
					<TitlesWrapper>
						<Title>{statusTitle[status]}:</Title>
						<Title>Last Edited By:</Title>
						<Title><BubbleIcon />#s:</Title>
						<Title><FlameIcon />PVs:</Title>
					</TitlesWrapper>
					{children.map(child => <PostContainer key={child.key}>{child}</PostContainer>)}
					{hasMore &&
						<ButtonWrapper>
							{isLoading
								? <Loading />
								: <Button small weight="tertiary" label="Load More" onClick={onLoadMoreClick} />
							}
						</ButtonWrapper>
					}
				</Container>
				: <MessageBox>No posts to display.</MessageBox>
			}
		</EnsureDefaultTheme>
	);
};

PostListContainer.defaultProps = {
	isLoading: false
};

export default PostListContainer;
