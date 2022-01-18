/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import EnsureDefaultTheme from '../theme/ensureDefaultTheme';
import media from '../../style-utils/media';
import { gridValue } from '../grid-utils';
import Button, { ButtonWrapper } from '../buttons';
import { ShareToolbarContainer } from '../share-toolbar';
import { Item } from '../share-toolbar/share-toolbar';
import ChevronLeft from '../icon19/ChevronLeft';
import ChevronRight from '../icon19/ChevronRight';
import getShareToolsContents from 'kinja-magma/client/hydration/post-tools/utils/get-share-tools-contents';

type Props = {|
	currentSlideIndex: number,
	numberOfSlides: number,
	onNextClick: () => void,
	onPreviousClick: () => void,
	postShareUrls: {
		permalink: string,
		emailShareUrl: string,
		facebookShareUrl: string,
		twitterShareUrl: string
	}
|};

const FullWidthContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: ${props => props.theme.color.darksmoke};
	padding: 16px 0;
	color: ${props => props.theme.color.midgray};
	display: flex;
	justify-content: center;
	z-index: 1;

	${media.smallOnly`
		display: none;
	`}
`;

const Container = styled.div`
	display: flex;
	justify-content: space-between;

	${media.smallOnly`
		width: ${gridValue.small('6c')};
	`}

	${media.mediumOnly`
		width: ${gridValue.medium('6c')};
	`}

	${media.largeOnly`
		width: ${gridValue.large('8c')};
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('12c')};
	`}

	${media.xxlargeUp`
		width: ${gridValue.xxlarge('12c')};
	`}

	${Item} {
		color: ${props => props.theme.color.midgray};
		background: ${props => props.theme.color.darksmoke};

		&:hover {
			color: ${props => props.theme.color.white};
		}
	}

	${ButtonWrapper} {
		color: ${props => props.theme.color.midgray};
		background: ${props => props.theme.color.darksmoke};
		border-radius: 3px;
		border: 1px solid ${props => props.theme.color.midgray};
		padding: 0 14px;

		&:hover {
			color: ${props => props.theme.color.white};
			border: 1px solid ${props => props.theme.color.white};
		}
	}
`;

const Navigation = styled.nav`
	display: flex;
	align-items: center;
`;

const Index = styled.div`
	margin: 0 16px;
`;

function SlideshowNavigation(props: Props) {
	const shareToolsPosition = 'top';
	return (
		<EnsureDefaultTheme>
			<FullWidthContainer>
				<Container>
					<Navigation>
						<Button
							label="Previous"
							icon={<ChevronLeft />}
							labelPosition="after"
							onClick={props.onPreviousClick}
						/>
						<Index>{props.currentSlideIndex + 1} / {props.numberOfSlides}</Index>
						<Button
							label="Next"
							icon={<ChevronRight />}
							onClick={props.onNextClick}
						/>
					</Navigation>
					<ShareToolbarContainer position={shareToolsPosition}>
						{getShareToolsContents(
							{...props.postShareUrls, emailShareUrl: `${props.postShareUrls.emailShareUrl}%26utm_campaign=${shareToolsPosition}`},
							shareToolsPosition
						)}
					</ShareToolbarContainer>
				</Container>
			</FullWidthContainer>
		</EnsureDefaultTheme>
	);
}

export default SlideshowNavigation;
