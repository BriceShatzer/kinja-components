// @flow

import * as React from 'react';
import cx from 'classnames';
import styled, { css } from 'styled-components';

import type { IframeProperties } from 'postbody/blockNodes/Iframe';
import { VideoPlayerWrapper } from '../../permalink/video-permalink-player';
import { HeaderWrapper } from '../../featured-header/header-wrapper';
import { MagazineHeaderWrapper } from '../../magazine-header/magazine-header-wrapper';
import { ImpactHeaderContainer } from '../../impact-header/impact-header-container';
import { EnsureDefaultTheme } from '../../theme';
import media from '../../../style-utils/media';
import imageUrl from 'kinja-images/imageUrl';
import { ASPECT_RATIOS } from 'postbody/blockNodes/Iframe';
import ExternalLinkIcon from '../../icon19/ExternalLink';
import {
	withPlatform,
	type PlatformInjectedProps
} from '../../hoc/context';

const WIDE_MEDIA_WIDTH = 800;

export const NonSecureIframeEmbed = styled.div`
	position: relative;
	padding-bottom: 56.25%;
	display: block;
	width: 100%;
	z-index: 1;

	${ImpactHeaderContainer} & {
		height: 100%;
	}
`;

export const IframeContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: block;
`;

export const Message = styled.span`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	text-align: center;
	position: absolute;
	max-width: 300px;
	padding: 2rem;

	${media.smallOnly`
		padding: 1rem;
	`}

	svg {
		color: ${({ theme, thumbnail }) => thumbnail ? theme.color.white : theme.color.darkgray};
	}
`;

export const ExternalSource = styled.a`
	background-color: ${props => props.theme.color.whitesmoke};
	color: ${props => props.theme.color.darkgray};
	box-shadow: none;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	line-height: 1.5;
	font-family: ${props => props.theme.typography.headline.fontFamily};

	${props => props.isDark && css`
		${Message} {
			background-color: ${props => props.theme.color.black};
			border-radius: 5px;
			color: ${props => props.theme.color.white};
			transition: opacity 0.25s ease-in-out;
			opacity: .8;
			z-index: 1;
		}
	`}

	${media.smallOnly`
		position: relative;
	`}

	img,
	amp-img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;

		${media.smallOnly`
			position: relative;
		`}
	}

	svg {
		margin-bottom: 1rem;

		${media.smallOnly`
			width: 18px;
			height: 18px;
			margin-bottom: 0.5rem;
		`}
	}

	${props => !props.isUnsupported && css`
		:hover,
		:active,
		:focus {
			color: ${props => props.theme.color.bodytext};
			text-decoration: none;

			svg {
				color: ${props => props.isDark ? props.theme.color.white : props.theme.color.bodytext};
			}

			${Message} {
				opacity: 1;
			}
		}
	`}

	${props => props.isUnsupported && css`
		background-color: ${props => props.theme.color.white};
		border: 1px dashed ${props => props.theme.color.midgray};
	`}

	${HeaderWrapper} &,
	${VideoPlayerWrapper} &,
	${ImpactHeaderContainer} &,
	${MagazineHeaderWrapper} & {
		background-color: ${props => props.theme.color.darksmoke};
		border: none;
		color: ${props => props.theme.color.white};

		svg {
			color: ${props => props.theme.color.white};
		}
	}

	${HeaderWrapper} & {
		border-bottom: 1px dashed ${props => props.theme.color.darkgray};

		${media.xlargeUp`
			border: 1px dashed ${props => props.theme.color.darkgray};
		`}
	}

	${MagazineHeaderWrapper} & {
		border-bottom: 1px dashed ${props => props.theme.color.darkgray};

		${media.xlargeUp`
			border-bottom: none;
			border-left: 1px dashed ${props => props.theme.color.darkgray};
		`}
	}
`;

const IframePlaceholder = ({
	source,
	domain,
	width,
	aspectRatio,
	thumbnail,
	platform
}: IframeProperties & PlatformInjectedProps & {
	domain: string
}) => {
	const widthValue = width ? width.value : 0;

	return (
		<EnsureDefaultTheme>
			<div className={cx({'has-media has-embed': aspectRatio === ASPECT_RATIOS.fixed, 'has-video media-large': widthValue >= WIDE_MEDIA_WIDTH })}>
				<NonSecureIframeEmbed>
					<IframeContainer>

						<ExternalSource href={source} target="_blank" rel="noopener noreferrer" isDark={thumbnail}>
							{thumbnail && platform === 'amp' && <amp-img layout="responsive"
								width="800" height="450" src={imageUrl(thumbnail.id, 'CenteredWideExtraLarge', thumbnail.format)} />}
							{thumbnail && platform !== 'amp' && <img src={imageUrl(thumbnail.id, 'CenteredWideExtraLarge', thumbnail.format)} />}

							<Message thumbnail={thumbnail}>
								<ExternalLinkIcon />
								<span>
									Open <em>{domain}</em>
								</span>
							</Message>

						</ExternalSource>

					</IframeContainer>
				</NonSecureIframeEmbed>
			</div>
		</EnsureDefaultTheme>
	);
};

export default withPlatform(IframePlaceholder);
