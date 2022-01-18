/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../../theme';
import media from '../../../style-utils/media';
import { type SlideshowAspectRatio } from 'postbody/blockNodes/Slideshow';
import Button from '../../buttons';

// ICONS
import ArrowRightIcon from '../../icon19/ArrowRight';
import ArrowLeftIcon from '../../icon19/ArrowLeft';

import createTranslate from '../../translator';
import translations from '../translations';
import type { Locale } from 'kinja-magma/models/Locale';
import {
	SlideContainer,
	SlideInner,
	KinjaSlide
} from '../slide';

type Props = {
	aspectRatio: SlideshowAspectRatio,
	disabled?: boolean,
	onLeftClick?: () => void,
	onRightClick?: () => void,
	language?: Locale
};

export const KinjaAdSlide = styled(KinjaSlide)`
	${SlideInner} {
		margin: auto;
	}

	${media.mediumDown`
		${SlideContainer} {
			padding-bottom: 18px;
		}
	`}
`;

const SlideAdButtons = styled.div`
	display: flex;
	margin-top: 15px;
	justify-content: space-between;
	width: 300px;

	${media.largeUp`
		display: none;
	`}
`;

const SlideAdLabelMain = styled.span`
	text-transform: uppercase;
	${media.mediumDown`
		flex: 1;
	`}
`;

const SlideAdLabelSkip = styled.span`
	${media.largeUp`
		display: none;
	`}
	${props => props.enabled && `
		opacity: 0;
		transition: opacity 3s;
	`}
	${props => !props.enabled && `
		opacity: 1;
	`}
`;

const SlideAdLabel = styled.div`
	margin-bottom: 5px;
	margin-top: 15px;
	font-weight: normal;
	${media.mediumDown`
		width: 300px;
		display: flex;
	`}
`;

const SlideAdLabelBottom = styled.div`
	font-size: 16px;
	font-weight: normal;
	text-transform: none;
	line-height: 21px;
	padding-top: 5px;
	${media.mediumDown`
		display: none;
	`}
	${props => props.enabled && `
		opacity: 0;
		transition: opacity 3s;
	`}
	${props => !props.enabled && `
		opacity: 1;
	`}
`;

export const SlideAdContainer = styled.div`
	align-items: center;
	flex-direction: column;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	overflow: hidden;
	user-select: none;
	color: ${props => props.theme.color.gray};
	font-size: 14px;
	font-weight: bold;
	line-height: 17px;
	${media.largeUp`
		background: ${props => props.theme.color.darksmoke};
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	`}
	.ad-container {
		width: 300px;
		height: 250px;
		background-color: ${props => props.theme.color.white};
	}
`;

const AdSlide = (props: Props) => {
	const { aspectRatio, onLeftClick, onRightClick, disabled, language } = props;
	const translate = createTranslate(translations, language);
	return (
		<EnsureDefaultTheme>
			<KinjaAdSlide>
				<SlideInner>
					<SlideContainer wide={aspectRatio === 'Wide'}>

						<SlideAdContainer>

							<SlideAdLabel>
								<SlideAdLabelMain>{translate('Advertisement')}</SlideAdLabelMain>
								<SlideAdLabelSkip enabled={!disabled}>
									{translate('You can skip ad after 1 second')}
								</SlideAdLabelSkip>
							</SlideAdLabel>

							<React.Fragment>
								<div className="ad-container dfp" />
								<div className='bt-wrapper' style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
									<span className='bt-uid-tg' data-uid='5d1b8a8b47-384' style={{display: 'none !important', textAlign: 'center'}}></span>
								</div>
							</React.Fragment>

							<SlideAdLabelBottom enabled={!disabled}>
								{translate('You can go to the next slide after 1 second')}
							</SlideAdLabelBottom>

							<SlideAdButtons>
								<Button
									weight='tertiary'
									icon={<ArrowLeftIcon />}
									sort="circle"
									onClick={onLeftClick}
									disabled={disabled}
								/>
								<Button
									label={translate('Continue')}
									weight='tertiary'
									labelPosition="before"
									icon={<ArrowRightIcon />}
									onClick={onRightClick}
									disabled={disabled}
								/>
							</SlideAdButtons>

						</SlideAdContainer>

					</SlideContainer>
				</SlideInner>
			</KinjaAdSlide>
		</EnsureDefaultTheme>
	);
};

export default AdSlide;
