/* @flow */

import * as React from 'react';
import autobind from 'autobind-decorator';
import classnames from 'classnames';
import styled, { css, keyframes } from 'styled-components';
import ReactSwipe from 'react-swipe';
import { debounce, isFunction } from 'lodash';

import media from '../../../style-utils/media';
import { EnsureDefaultTheme } from '../../theme';
import type { SlideType } from '../types';
import { type SlideshowAspectRatio } from 'postbody/blockNodes/Slideshow';
import type ImageNode from 'postbody/blockNodes/ImageNode';
import Slide from '../slide';
import {
	CaptionItem,
	SlideCaption,
	SlideImageContainer,
	SlideFullscreenIndicator,
	SlideImage,
	SlideContainer,
	SlideInner,
	KinjaSlide,
	SlideBlurBackground
} from '../slide';
import AdSlide from '../ad-slide';
import { SlideAdContainer } from '../ad-slide';
import Button from '../../buttons';

// ICONS
import FacebookIcon from '../../icon19/Facebook';
import TwitterIcon from '../../icon19/Twitter';
import SlideshowIcon from '../../icon19/Slideshow';
import FullscreenIcon from '../../icon19/Fullscreen';
import CloseIcon from '../../icon19/Close';
import ArrowLeft from '../../icon19/ArrowLeft';
import ArrowRight from '../../icon19/ArrowRight';


import insertAds from './insertAds';
import ImageAttribution from '../../image-attribution';
import InlineNodes from '../../postbody/inline-node';
import VibrancyBackground from '../../blurred-background';
import OnScreen from '../../hoc/on-screen';
import type { OnScreenInjectedProps } from '../../hoc/on-screen';

type Props = {
	slides: Array<ImageNode>,
	aspectRatio: SlideshowAspectRatio,
	preloadAmount: number,
	onNavigate?: (SlideType, number) => void,
	onForwardClick?: (SlideType, SlideType, number, boolean) => void,
	onBackClick?: (SlideType, SlideType, number, boolean) => void,
	onUpcomingAd?: (number) => void,
	adsEnabled?: boolean,
	adsFrequency: number,
	adDelay: number,
	language?: string,
	desktop: boolean,
	headline: string,
	facebookShareUrl: string,
	twitterShareUrl: string,
	onFullscreenAdLoad?: () => void,
	onFullscreenToggle?: (SlideType, number, boolean) => void,
	hideImageAttribution?: boolean,
	renderInlineDataForHydration?: boolean, // Whether to render data as attributes for hydrating server-render slideshows on client
	preLoadFirstSlide?: boolean // Enables hydration
} & OnScreenInjectedProps;

type DefaultProps = {
	preloadAmount: number,
	adsEnabled: boolean,
	adsFrequency: number,
	adDelay: number
};

type State = {
	currentSlideIndex: number,
	preloadUntil: number,
	completed: boolean,
	navigationEnabled: boolean,
	fullscreen: boolean,
	indexVisible: boolean,
	reactSwipeKey: number,
	navDirection: number
};

const SlideshowBlurBackgroundFullScreen = styled.div``;
const SlideshowSidebarAdWrap = styled.div``;
const SlideshowSidebarAdLabel = styled.span`
	text-transform: uppercase;
`;
const SlideshowSidebarHeadline = styled.h1`
	font-size: 19px;
	font-weight: 600;
	line-height: 24px;
	color: rgba(255, 255, 255, 0.6);
`;
const SlideshowSidebarPaging = styled.div`
	padding-bottom: 15px;
	border-bottom: 1px solid rgba(245, 245, 245, 0.2);
	margin-bottom: 15px;
	display: flex;
	align-items: center;

	svg {
		margin-right: 4px;
	}
`;
const SlideshowSidebarShareButton = styled.span`
	margin-right: 15px;
`;
export const SlideshowIndex = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 18px 15px;
	max-width: ${props => props.theme.postContentMaxWidth};
	margin: 0 auto;
	font-size: 16px;
	line-height: 21px;
	font-weight: normal;
	color: ${props => props.theme.color.gray};

	${media.largeUp`
		padding: 0 0 15px;
		margin: 0 82px;
	`}

	${props => props.fullscreen && css`
		color: ${props.theme.color.white};
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		max-width: none;
		margin: 0;
		padding: 15px 18px;
		transition: top ${props.theme.slideshowTransitionDuration} ease-out;

		${props => props.indexHidden && `
			top: -51px;
		`}

		${media.largeUp`
			left: auto;
			right: 0;
			width: auto;
			padding: 36px 25px;
			margin: 0;

			${props => props.indexHidden && `
				top: 0px;
			`}
		`}
	`}
`;
export const SlideshowIndexPaging = styled.div`
	display: flex;
	align-items: center;

	svg {
		margin-right: 4px;
	}
`;
export const SlideshowIndexFullscreen = styled.div`
	cursor: pointer;
	${media.largeUp`
		display: none;
	`}
`;

const SlideshowSidebarIndex = styled.div`
	color: rgba(255, 255, 255, 0.6);
`;

const SlideshowSidebarCaption = styled.div`
	margin: 0 0 15px 0;
	padding-top: 84px;
	font-family: ${props => props.theme.typography.utility.fontFamily};
	font-size: 16px;
	line-height: 21px;
`;

const SlideshowSidebarAd = styled.div`
	height: 250px;
	background-color: ${props => props.theme.color.gray};
	margin-top: 5px;
`;

const SlideshowSidebar = styled.aside``;

export const SlideshowSwipeArea = styled.div``;

const buttonOpacity = (fullscreen, disabled) => {
	if (disabled) {
		return 0.3;
	}
	if (fullscreen) {
		return 0.9;
	}
	return 0.6;
};

export const SlideshowNavigateLeft = styled(Button)`
	display: none;
	position: absolute;
	top: 20px;
	margin-top: 66.6666%;
	left: 20px;

	${props => props.disabled && css`
		&:hover svg {
			color: ${props => props.theme.color.gray};
		}
	`}

	${media.largeUp`
		display: inherit;
	`}

	svg {
		color: ${({ theme, fullscreen, backButtonDisabled }) => fullscreen && !backButtonDisabled ? theme.color.white : theme.color.gray};
		opacity: ${({ fullscreen, backButtonDisabled }) => buttonOpacity(fullscreen, backButtonDisabled)};
	}
`;


export const SlideshowNavigateRight = styled(Button)`
	display: none;
	position: absolute;
	top: 20px;
	margin-top: 66.6666%;
	right: 20px;

	${media.largeUp`
		display: inherit;
	`}

	svg {
		color: ${({ theme, fullscreen }) => fullscreen ? theme.color.white : theme.color.gray};
		opacity: ${({ fullscreen, navigationEnabled }) => buttonOpacity(fullscreen, !navigationEnabled)};
	}
`;

const SlideshowDeck = styled(ReactSwipe)`
	display: flex;
`;

const slideWiggleAnimation = keyframes`
	50% {
		transform: translate3d(-10%, 0, 0);
	}
	80% {
		transform: translate3d(0%, 0, 0);
	}
`;

export const SlideShowContainer = styled.div`
	margin-bottom: 20px;
	position: relative;
	overflow: hidden;
	background-color: ${props => props.theme.color.whitesmoke};
	font-family: ${props => props.theme.typography.utility.fontFamily};

	${media.smallOnly`
		&.wiggle {
			${KinjaSlide}:first-child {
				${SlideContainer},
				${SlideCaption} {
					animation: ${slideWiggleAnimation} 0.6s ease-in-out both;
				}
			}
		}
	`}

	${props => props.wide && `
		${SlideshowNavigateLeft},
		${SlideshowNavigateRight} {
			margin-top: 56.25%;
		}
	`}

	${props => props.fullscreen && css`
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 10000;
		overflow: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 0;
		background: ${props => props.theme.color.black};
		@media only screen and (orientation: landscape) {
			justify-content: flex-start;
		}

		${SlideshowBlurBackgroundFullScreen} {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			overflow: hidden;
		}

		${CaptionItem} {
			padding: 0;
			margin: 0;
			color: ${props => props.theme.color.white};
		}

		${SlideCaption} {
			min-height: 0;
			max-width: none;
			margin: 0;
			padding: 18px;
			opacity: 1;
			transition: opacity ${props => props.theme.slideshowTransitionDuration} linear;
			${props => props.toggle && `
				opacity: 0;
			`}
		}

		${SlideImageContainer},
		${SlideImage},
		${SlideAdContainer} {
			position: static;
		}

		${SlideBlurBackground},
		${SlideFullscreenIndicator} {
			display: none;
		}

		${SlideContainer} {
			padding-bottom: 0;
		}

		${SlideInner} {
			margin: auto;
		}

		${KinjaSlide} {
			display: flex;
			flex-direction: column;
			justify-content: center;
			overflow: auto;
		}

		${SlideshowIndexPaging},
		${SlideshowIndexFullscreen} {
			filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5));
		}

		${SlideshowSidebar} {
			display: none;
		}

		${SlideshowSwipeArea} {
			height: 100%;
		}

		${SlideshowNavigateLeft},
		${SlideshowNavigateRight} {
			display: none;
			span {
				width: 100%;
			}
		}

		${SlideshowDeck} {
			height: 100%;
		}

		${media.largeUp`
			flex-direction: row;

			${SlideCaption} {
				display: none;
			}

			${SlideImageContainer} {
				cursor: inherit;
				height: 100%;
				background: none;
			}

			${SlideImage} {
				height: 100%;

				img {
					align-self: flex-start;
				}
			}

			${SlideContainer},
			${SlideInner} {
				height: 100%;
			}

			${KinjaSlide} {
				overflow: hidden;
			}

			${SlideAdContainer} {
				background-color: none;
				cursor: inherit;
			}

			${SlideshowSidebarAdWrap} {
				margin-top: 30px;
			}

			${SlideshowIndexPaging} {
				display: none;
			}

			${SlideshowIndexFullscreen} {
				display: inherit;
			}

			${SlideshowSidebar} {
				display: flex;
				flex-basis: 50%;
				flex-direction: column;
				flex: 0 0 350px;
				justify-content: space-between;
				position: relative;
				overflow: auto;
				padding: 25px;
				color: ${props => props.theme.color.white};
			}

			${SlideshowSwipeArea} {
				flex-basis: 50%;
				flex: 1 1;
				padding: 25px 0 25px 25px;
				overflow: hidden;
			}

			${SlideshowNavigateLeft},
			${SlideshowNavigateRight} {
				display: inherit;
				margin-top: 0;
				svg {
					width: 100%;
				}
			}

			${SlideshowNavigateLeft} {
				top: 25px;
				left: auto;
				right: 283px;
			}

			${SlideshowNavigateRight} {
				top: 25px;
				right: 226px;
			}

		`}
	`}
`;

const getSlidesWithAds = (props: Props): Array<SlideType> => {
	const { adsEnabled, adsFrequency } = props;
	let slides = [...props.slides];
	// Insert ads
	if (adsEnabled) {
		slides = insertAds(props.slides, adsFrequency);
	}
	return slides;
};

export class Slideshow extends React.Component<Props, State> {

	slidesWithAds: Array<SlideType>;

	deck: ReactSwipe;

	element: HTMLDivElement | null;

	state: State = {
		currentSlideIndex: 0,
		preloadUntil: 1,
		completed: false,
		navigationEnabled: true,
		fullscreen: false,
		indexVisible: true,
		reactSwipeKey: 0,
		navDirection: 0
	};

	static defaultProps: DefaultProps = {
		preloadAmount: 4,
		adsEnabled: true,
		adsFrequency: 4,
		adDelay: 1000
	};

	static shareWindowWidth = 480;
	static shareWindowHeight = 360;

	constructor(props: Props) {
		super(props);
		this.slidesWithAds = getSlidesWithAds(props);
	}

	componentDidMount() {
		this.fireUpcomingAdEvent();
		document.addEventListener('keydown', this.onKeydown);
	}

	componentWillReceiveProps(nextProps: Props) {
		this.slidesWithAds = getSlidesWithAds(nextProps);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.onKeydown);
	}

	@autobind
	onKeydown(event: KeyboardEvent) {
		const { fullscreen, navigationEnabled } = this.state;

		if (!fullscreen || !navigationEnabled) {
			return;
		}

		switch (event.code) {
			case 'ArrowRight':
			case 'KeyD':
				this.navigateRight();
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this.navigateLeft();
				break;
			case 'Escape':
				this.toggleFullscreen();
				break;
			default:
				return;
		}
	}

	/**
	 * When clicking the navigate left button, going from the first slide to the last
	 * is disabled until you finish the slideshow at least once
	 */
	@autobind
	navigateLeft(event?: SyntheticEvent<>) {
		if (!this.state.navigationEnabled) {
			return;
		}

		const newSlideIndex = this.getPrevSlideIndex();

		if (newSlideIndex === -1) {
			return;
		}

		if (event) {
			event.stopPropagation();
		}

		this.setState({ navDirection: -1 }, () => {
			this.deck.slide(newSlideIndex);
		});
	}

	/**
	 * When clicking the navigate right button, if you are at the end of the slideshow,
	 * you return to the start.
	 */
	@autobind
	navigateRight(event?: SyntheticEvent<>) {
		if (!this.state.navigationEnabled) {
			return;
		}

		const newSlideIndex = this.getNextSlideIndex();

		if (event) {
			event.stopPropagation();
		}

		this.setState({ navDirection: 1 }, () => {
			this.deck.slide(newSlideIndex);
		});
	}

	getNextSlideIndex() {
		const { currentSlideIndex, fullscreen } = this.state;
		const { desktop } = this.props;
		let newSlideIndex;

		if (currentSlideIndex < this.slidesWithAds.length - 1) {
			const nextSlideIndex = currentSlideIndex + 1;

			// We're skipping ads in desktop fullscreen mode; there is only one in the sidebar
			if (desktop && fullscreen) {
				newSlideIndex = this.slidesWithAds[nextSlideIndex].type === 'ad' ? currentSlideIndex + 2 : nextSlideIndex;
			} else {
				newSlideIndex = nextSlideIndex;
			}
		} else {
			newSlideIndex = 0;
		}

		return newSlideIndex;
	}

	getPrevSlideIndex() {
		const { currentSlideIndex, completed, fullscreen } = this.state;
		const { desktop } = this.props;
		let newSlideIndex = -1;

		if (currentSlideIndex > 0) {
			const previousSlideIndex = currentSlideIndex - 1;

			// We're skipping ads in desktop fullscreen mode; there should be only one in the sidebar
			if (desktop && fullscreen) {
				newSlideIndex = this.slidesWithAds[previousSlideIndex].type === 'ad' ? currentSlideIndex - 2 : previousSlideIndex;
			} else {
				newSlideIndex = previousSlideIndex;
			}
		} else if (completed) {
			newSlideIndex = this.slidesWithAds.length - 1;
		}

		return newSlideIndex;
	}

	fireNavigateEvent() {
		const { onNavigate } = this.props;
		if (onNavigate) {
			const { currentSlideIndex } = this.state;
			onNavigate(this.slidesWithAds[currentSlideIndex], currentSlideIndex);
		}
	}

	/**
	 * Fire onUpcomingAd event if an ad slide is coming up in `adPreload` slides
	 */
	fireUpcomingAdEvent() {
		const { onUpcomingAd, adsEnabled } = this.props;

		if (!adsEnabled) {
			return;
		}

		const { currentSlideIndex, navDirection } = this.state;
		const upcomingSlide = this.slidesWithAds[currentSlideIndex + navDirection];
		const currentSlide = this.slidesWithAds[currentSlideIndex];
		/* The 'upcomingSlide' logic expects us to load the ad when scrolling in non-fullscreen
			mode. However you can scroll through in fullscreen mode and shrink down on after 3rd
			slide, and we won't get the 'upcomingSlide'. We'll need the currentslide to load the ad */
		if ((upcomingSlide && upcomingSlide.type === 'ad' && !upcomingSlide.seen && onUpcomingAd)) {
			const adIndex = this.slidesWithAds.filter(slide => slide.type === 'ad').indexOf(upcomingSlide);
			onUpcomingAd(adIndex);
		} else if (currentSlide && currentSlide.type === 'ad' && !currentSlide.seen && onUpcomingAd) {
			// current slide
			const adIndex = this.slidesWithAds.filter(slide => slide.type === 'ad').indexOf(currentSlide);
			onUpcomingAd(adIndex);
		}
	}

	fireFullscreenAdEvent() {
		const { onFullscreenAdLoad, adsEnabled } = this.props;

		if (isFunction(onFullscreenAdLoad) && adsEnabled) {
			onFullscreenAdLoad();
		}
	}

	/**
	 * Fired every time the slides are moved either with the navigation buttons or swiping.
	 * We set the state of the app based on the new slide index, which is controlled by the plugin.
	 */
	@autobind
	didNavigate(newSlideIndex: number) {
		const { preloadUntil, completed, fullscreen, navDirection, currentSlideIndex } = this.state;
		const { preloadAmount, onBackClick, onForwardClick, desktop } = this.props;
		const slide = this.slidesWithAds[newSlideIndex];
		const isUnseenAdSlide = slide.type === 'ad' && !slide.seen;
		this.setState({
			currentSlideIndex: newSlideIndex,
			preloadUntil: Math.max(newSlideIndex + preloadAmount, preloadUntil),
			completed: completed || newSlideIndex === this.slidesWithAds.length - 1,
			navigationEnabled: !isUnseenAdSlide
		}, () => {
			const { adDelay } = this.props;

			/* Regular (non-fullscreenn) slideshow OR Mobile (non-desktop) always fires ad */
			if (!fullscreen || !desktop) {
				this.fireUpcomingAdEvent();
			}

			this.fireNavigateEvent();

			// Disable navigation for `adDelay` milliseconds if the new slide is an ad
			if (isUnseenAdSlide) {
				setTimeout(() => {
					if (slide.type === 'ad') {
						slide.seen = true;
					}
					this.setState({
						navigationEnabled: true
					});
				}, adDelay);
			}

			if (navDirection === -1 && onBackClick) {
				onBackClick(
					this.slidesWithAds[currentSlideIndex],
					this.slidesWithAds[newSlideIndex],
					this.getNonAdSlideIndex(newSlideIndex),
					fullscreen
				);
			} else if (navDirection === 1 && onForwardClick) {
				onForwardClick(
					this.slidesWithAds[currentSlideIndex],
					this.slidesWithAds[newSlideIndex],
					this.getNonAdSlideIndex(newSlideIndex),
					fullscreen
				);
			}
		});
	}

	/**
	 * Get the index of the current slide as if there were no ads in the slide
	 */
	getCurrentNonAdSlideIndex(): number {
		const { currentSlideIndex } = this.state;
		return this.getNonAdSlideIndex(currentSlideIndex);
	}

	/**
	 * Get the index of a slide as if there were no ads in the slide
	 */
	getNonAdSlideIndex(indexWithAds: number): number {
		let nonAdSlide = this.slidesWithAds[indexWithAds];
		if (nonAdSlide.type === 'ad') {
			nonAdSlide = this.slidesWithAds[indexWithAds - 1];
			if (nonAdSlide.type === 'Image') { // This is just to make flow happy
				// We actually know there won't be two ad slides next to each other
				return this.props.slides.indexOf(nonAdSlide);
			}
			return 0; // This should never be reached
		}
		return this.props.slides.indexOf(nonAdSlide);
	}

	renderSlides(): React.ChildrenArray<React.Element<typeof Slide> | React.Element<typeof AdSlide>> {
		const { aspectRatio, language, preLoadFirstSlide, headline } = this.props;
		const { navigationEnabled } = this.state;
		return this.slidesWithAds.map((slide, index) => {
			if (slide.type === 'ad') {
				return (
					<AdSlide
						aspectRatio={aspectRatio}
						// eslint-disable-next-line react/no-array-index-key
						key={index}
						index={index}
						onLeftClick={this.navigateLeft}
						onRightClick={this.navigateRight}
						disabled={!navigationEnabled}
						language={language}
					/>
				);
			}
			const load = index < this.state.preloadUntil;
			const preLoad = preLoadFirstSlide && index === 0;
			return (
				<Slide
					image={slide}
					aspectRatio={aspectRatio}
					load={load}
					// We don't actually have any other identifier.
					// The same image can appear multiple times
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					index={index}
					onImageClick={this.toggleFullscreen}
					hideAttribution={this.props.hideImageAttribution}
					preLoad={preLoad}
					laguage={language}
					postHeadline={headline}
				/>
			);
		});
	}

	@autobind
	toggleFullscreen() {
		const { onFullscreenToggle, desktop } = this.props;
		const { fullscreen, reactSwipeKey, currentSlideIndex } = this.state;

		this.setState({
			fullscreen: !fullscreen,
			indexVisible: true,
			// Since the `fullscreen` property affects swipeOptions, but swipeOptions
			// doesn't trigger an update in the ReactSwipe component, a re-mount
			// is forced through changing ReactSwipe's `key` attribute.
			reactSwipeKey: reactSwipeKey + 1
		}, () => {
			if (this.state.fullscreen) {
				// Remove unnecessary scrollbar on <body> while in fullscreen mode
				document.getElementsByTagName('body')[0].style.overflow = 'hidden';

				// Load sidebar ad if on desktop. On mobile view, do not load sidebar ad
				if (desktop) {
					this.fireFullscreenAdEvent();
				}
			} else {
				// Re-enable scroll on body
				document.getElementsByTagName('body')[0].style.removeProperty('overflow');
			}

			if (onFullscreenToggle) {
				onFullscreenToggle(
					this.slidesWithAds[currentSlideIndex],
					this.getNonAdSlideIndex(currentSlideIndex),
					!this.state.fullscreen
				);
			}

			// Re-render slide deck based on new container width
			this.deck.swipe.setup();
		});
	}

	@autobind
	toggleIndex() {
		if (this.state.fullscreen) {
			this.setState({ indexVisible: !this.state.indexVisible });
		}
	}

	@autobind
	onSwipe(amount: number) {
		if (amount < 0) {
			// Swiping back
			this.setState({ navDirection: -1 });

		} else if (amount > 0) {
			// Swiping forward
			this.setState({ navDirection: 1 });
		}
	}

	@autobind
	shareOnFacebook() {
		const { facebookShareUrl } = this.props;
		window.open(facebookShareUrl, 'shareFacebook', `toolbar=0,status=0,width=${Slideshow.shareWindowWidth},height=${Slideshow.shareWindowHeight}`);
	}

	@autobind
	shareOnTwitter() {
		const { twitterShareUrl } = this.props;
		window.open(twitterShareUrl, 'shareTwitter', `toolbar=0,status=0,width=${Slideshow.shareWindowWidth},height=${Slideshow.shareWindowHeight}`);
	}

	render() {
		const {
			currentSlideIndex,
			completed,
			navigationEnabled,
			fullscreen,
			indexVisible,
			reactSwipeKey
		} = this.state;
		const {
			slides,
			aspectRatio,
			headline,
			renderInlineDataForHydration,
			hideImageAttribution
		} = this.props;
		const swipeOptions = {
			continuous: false,
			callback: this.didNavigate,
			speed: fullscreen ? 300 : 150,
			swiping: debounce(this.onSwipe, 1000, { leading: true, trailing: false }),
			startSlide: currentSlideIndex
		};

		const backButtonDisabled = !navigationEnabled || (currentSlideIndex === 0 && !completed);
		const displayIndex = this.getCurrentNonAdSlideIndex() + 1;
		const dataForHydration = renderInlineDataForHydration ? {
			'data-slides': JSON.stringify(slides),
			'data-aspect': aspectRatio
		} : {};
		const currentSlide = this.slidesWithAds[currentSlideIndex];

		return (
			<EnsureDefaultTheme>
				<SlideShowContainer
					className={classnames('kinja-slideshow', {
						'wiggle': this.props.isVisible
					})}
					fullscreen={fullscreen}
					wide={aspectRatio === 'Wide'}
					toggle={!this.state.indexVisible}
					ref={e => { this.element = e; }}
					{...dataForHydration}
				>

					{fullscreen && (
						<SlideshowBlurBackgroundFullScreen>
							<VibrancyBackground background={
								this.slidesWithAds[currentSlideIndex].type === 'Image' ?
									this.slidesWithAds[currentSlideIndex].id : null
							}/>
						</SlideshowBlurBackgroundFullScreen>
					)}

					<SlideshowSwipeArea onClick={fullscreen ? this.toggleIndex : null}>
						<SlideshowDeck
							swipeOptions={swipeOptions}
							ref={c => { this.deck = c; }}
							style={{
								wrapper: {
									overflow: 'hidden',
									display: 'flex',
									height: '100%',
									width: '100%'
								}
							}}
							// "key" is used to force a re-render when swipeOptions change.
							// https://github.com/voronianski/react-swipe/issues/125
							key={reactSwipeKey}
						>
							{this.renderSlides()}
						</SlideshowDeck>
					</SlideshowSwipeArea>

					{fullscreen && (
						<SlideshowSidebar>

							<SlideshowSidebarCaption>
								{currentSlide.type === 'Image' && currentSlide.caption && (
									<CaptionItem>
										<InlineNodes nodes={currentSlide.caption} />
									</CaptionItem>
								)}
								{!hideImageAttribution && currentSlide.attribution && currentSlide.attribution instanceof Array ?
									<CaptionItem>
										<ImageAttribution attributions={currentSlide.attribution} />
									</CaptionItem> : null
								}
							</SlideshowSidebarCaption>

							<SlideshowSidebarIndex>
								<SlideshowSidebarPaging>
									<SlideshowIcon /> <span>{displayIndex} / {slides.length}</span>
								</SlideshowSidebarPaging>

								<SlideshowSidebarHeadline dangerouslySetInnerHTML={{ __html: headline }} />

								<SlideshowSidebarShareButton onClick={this.shareOnFacebook}>
									<Button
										icon={<FacebookIcon />}
										variant="facebook"
										sort='share'
										label="Share"
										labelPosition="after"
										small
									/>
								</SlideshowSidebarShareButton>

								<SlideshowSidebarShareButton onClick={this.shareOnTwitter}>
									<Button
										icon={<TwitterIcon />}
										variant="twitter"
										sort='share'
										label="Tweet"
										labelPosition="after"
										small
									/>
								</SlideshowSidebarShareButton>

								<SlideshowSidebarAdWrap>
									<SlideshowSidebarAdLabel>
										Advertisement
									</SlideshowSidebarAdLabel>
									<SlideshowSidebarAd>
										<React.Fragment>
											<div className="kinja-slideshow__sidebar-ad dfp" />
											<div className='bt-wrapper' style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
												<span className='bt-uid-tg' data-uid='5d1b8a9186-384'
													style={{display: 'none !important', textAlign: 'center'}}></span>
											</div>
										</React.Fragment>
									</SlideshowSidebarAd>
								</SlideshowSidebarAdWrap>
							</SlideshowSidebarIndex>

						</SlideshowSidebar>
					)}

					<SlideshowNavigateLeft
						icon={<ArrowLeft />}
						fullscreen={fullscreen}
						backButtonDisabled={backButtonDisabled}
						disabled={backButtonDisabled}
						sort='circle'
						weight={fullscreen ? 'primary' : 'tertiary'}
						onClick={this.navigateLeft}
					/>

					<SlideshowNavigateRight
						icon={<ArrowRight />}
						fullscreen={fullscreen}
						navigationEnabled={navigationEnabled}
						disabled={!navigationEnabled}
						sort='circle'
						weight={fullscreen ? 'primary' : 'tertiary'}
						onClick={this.navigateRight}
					/>

					<SlideshowIndex
						indexHidden={!indexVisible}
						fullscreen={fullscreen}
					>
						<SlideshowIndexPaging>
							<SlideshowIcon /> <span>{displayIndex} / {slides.length}</span>
						</SlideshowIndexPaging>
						<SlideshowIndexFullscreen onClick={this.toggleFullscreen}>
							{fullscreen ? <CloseIcon /> : <FullscreenIcon />}
						</SlideshowIndexFullscreen>
					</SlideshowIndex>

				</SlideShowContainer>
			</EnsureDefaultTheme>
		);
	}
}

export default OnScreen(Slideshow, { once: true, partialVisibility: false });
