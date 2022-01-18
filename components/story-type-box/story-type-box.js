/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import type { ImageProperties } from '../../../postbody/Image';

import imageUrl from 'kinja-images';
import media from '../../style-utils/media';

import { EnsureDefaultTheme } from '../theme';
import StoryTypeLabel from '../story-type-label';

export type StoryTypeBoxProps = {
	title: string;
	description?: string;
	image?: ImageProperties;
	label?: string;
};

const boxlike = css`
	margin-bottom: 2.5rem;
	background-color: ${props => props.theme.color.whitesmoke};
`;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: ${props => props.theme.columnPadding} 0;
	${props => props.boxlike ? boxlike : ''};
`;

const singleColumnStyles = css`
	flex-basis: 100%;
`;

const twoColumnStyles = css`
	${media.smallOnly`
		flex-basis: 100%;
	`}
	${media.mediumUp`
		flex-basis: 50%;
	`}
`;

const ContentWrapper = styled.div`
	padding: 0 ${props => props.theme.columnPadding};
	${props => props.twoColumn ? twoColumnStyles : singleColumnStyles};
`;

const LabelWrapper = styled.div`
	margin-bottom: 15px;
`;

const Title = styled.h2`
	margin: 0;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-weight: bold;
	${media.smallOnly`
		font-size: 1.125rem;
	`}
	${media.mediumUp`
		font-size: 1.75rem;
	`}
`;

const Description = styled.div`
	color: ${props => props.theme.color.darkgray};
	font-family: ${props => props.theme.typography.serif.fontFamily};
	font-size: 14px;
	line-height: 1.5;
	margin-top: 0.5rem;
	${media.smallOnly`
		margin-bottom: 1.5rem;
	`}
`;

const Image = styled.img`
	display: block;
	width: 100%;
`;

function StoryTypeBox(props: StoryTypeBoxProps) {

	const {title, description, image, label} = props;

	return (
		<EnsureDefaultTheme>
			<Wrapper boxlike={image || description}>
				<ContentWrapper twoColumn={Boolean(image)}>
					{label ? (
						<LabelWrapper>
							{/* TODO: add url prop to StoryTypeLabel */}
							<StoryTypeLabel outlined tag={label}/>
						</LabelWrapper>
					) : null}
					<Title>{title}</Title>
					<Description>{description}</Description>
				</ContentWrapper>
				{image ? (
					<ContentWrapper twoColumn>
						<Image src={imageUrl(image.id, 'KinjaCenteredMediumAuto', image.format)}/>
					</ContentWrapper>
				) : null}
			</Wrapper>
		</EnsureDefaultTheme>
	);

}

export default StoryTypeBox;
