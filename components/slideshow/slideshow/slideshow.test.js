import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Slideshow } from './slideshow';
import {TextNode} from 'postbody/InlineNode';
import {
	SlideShowContainer,
	SlideshowIndexFullscreen,
	SlideshowNavigateRight,
	SlideshowNavigateLeft,
	SlideshowSwipeArea
} from './slideshow';
import AdSlide from '../ad-slide';

const SAMPLE_SLIDES = ',,,,'.split(',').map((_, index) => ({
	type: 'Image',
	caption: [
		new TextNode(`caption ${index}`)
	],
	id: `${index}`
}));

const noop = () => {};

const stubElement = ({
	slides = SAMPLE_SLIDES,
	aspectRatio = 'Photo',
	preloadAmount = 1,
	onNavigate = noop,
	onForwardClick = noop,
	onBackClick = noop,
	onUpcomingAd = noop,
	adsEnabled = false,
	adsFrequency = 2,
	adDelay = 1,
	desktop = true,
	headline = 'A jolly good article',
	permalink = 'https://gizmodo.com',
	facebookShareUrl = 'https://fb.com',
	twitterShareUrl = 'https://twitter.com',
	onFullscreenAdLoad = noop,
	onFullscreenToggle = noop,
	renderInlineDataForHydration = false
} = {}) => (
	<Slideshow
		slides={slides}
		aspectRatio={aspectRatio}
		preloadAmount={preloadAmount}
		onNavigate={onNavigate}
		onForwardClick={onForwardClick}
		onBackClick={onBackClick}
		onUpcomingAd={onUpcomingAd}
		adsEnabled={adsEnabled}
		adsFrequency={adsFrequency}
		adDelay={adDelay}
		desktop={desktop}
		headline={headline}
		permalink={permalink}
		facebookShareUrl={facebookShareUrl}
		twitterShareUrl={twitterShareUrl}
		onFullscreenAdLoad={onFullscreenAdLoad}
		onFullscreenToggle={onFullscreenToggle}
		renderInlineDataForHydration={renderInlineDataForHydration}
	/>
);

describe('<Slideshow />', () => {
	it('should render with Photo aspect ratio by default', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with Wide aspect ratio if set', () => {
		expect(stubElement({
			aspectRatio: 'Wide'
		})).toMatchSnapshot();
	});

	it('should render with inlined data attributes if set', () => {
		expect(mount(stubElement({
			renderInlineDataForHydration: true
		})).find(SlideShowContainer).prop('data-slides')).toMatchSnapshot();
	});

	it('should display the number of slides', () => {
		const wrapper = shallow(stubElement());
		wrapper.setState({ currentSlideIndex: 2 });
		expect(wrapper).toMatchSnapshot();
	});

	describe('Back button', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = shallow(stubElement());
		});

		it('should be disabled on the first slide', () => {
			expect(wrapper).toMatchSnapshot();
		});
		it('unless the user completed the slideshow at least once', () => {
			wrapper.setState({ completed: true });
			expect(wrapper).toMatchSnapshot();
		});
		it('should not be disabled on subsequent slides', () => {
			wrapper.setState({ currentSlideIndex: 2 });
			expect(wrapper).toMatchSnapshot();
		});
		it('unless explicitly disabled', () => {
			wrapper.setState({ navigationEnabled: false });
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Forward button', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = shallow(stubElement());
		});

		it('should not be disabled on the first slide', () => {
			expect(wrapper).toMatchSnapshot();
		});
		it('should not be disabled on subsequent slides', () => {
			wrapper.setState({ currentSlideIndex: 2 });
			expect(wrapper).toMatchSnapshot();
		});
		it('unless explicitly disabled', () => {
			wrapper.setState({ navigationEnabled: false });
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Navigation', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = shallow(stubElement());
			wrapper.instance().deck = {
				next: jest.fn(),
				prev: jest.fn(),
				slide: jest.fn()
			};
		});

		it('should navigate to the right', () => {
			wrapper.find(SlideshowNavigateRight).simulate('click');
			expect(wrapper.instance().deck.slide).toHaveBeenCalled();
		});

		it('should navigate to the left', () => {
			wrapper.setState({ currentSlideIndex: 2 });
			wrapper.find(SlideshowNavigateLeft).simulate('click');
			expect(wrapper.instance().deck.slide).toHaveBeenCalled();
		});

		it('should wrap around to the right', () => {
			wrapper.setState({
				currentSlideIndex: SAMPLE_SLIDES.length - 1
			});
			wrapper.find(SlideshowNavigateRight).simulate('click');
			expect(wrapper.instance().deck.slide).toHaveBeenCalledWith(0);
		});

		it('should wrap around to the left if completed', () => {
			wrapper.setState({
				completed: true
			});
			wrapper.find(SlideshowNavigateLeft).simulate('click');
			expect(wrapper.instance().deck.slide).toHaveBeenCalledWith(SAMPLE_SLIDES.length - 1);
		});

		it('fires onNavigate events', () => {
			const handler = jest.fn();
			wrapper = shallow(stubElement({
				onNavigate: handler
			}));
			wrapper.instance().didNavigate(1);
			expect(handler).toHaveBeenCalledWith(SAMPLE_SLIDES[1], 1);
		});

		it('should fire onForwardClick events', () => {
			const handler = jest.fn();
			wrapper = mount(stubElement({
				onForwardClick: handler
			}));
			wrapper.instance().deck = { slide: noop };
			wrapper.find(SlideshowNavigateRight).simulate('click');
			expect(handler).toHaveBeenCalledWith(SAMPLE_SLIDES[0], SAMPLE_SLIDES[1], 1, false);
		});

		it('should fire onBackClick events', () => {
			const handler = jest.fn();
			wrapper = mount(stubElement({
				onBackClick: handler
			}));
			// for unknown reasons, the plugin doesn't trigger didNavigate when navigating
			// from slide 1 to 0 (only in tests) - hence we're starting from 2
			wrapper.setState({ currentSlideIndex: 2 });
			wrapper.instance().deck = { slide: noop };
			wrapper.find(SlideshowNavigateLeft).simulate('click');
			expect(handler).toHaveBeenCalledWith(SAMPLE_SLIDES[2], SAMPLE_SLIDES[1], 1, false);
		});

		it('should preload images', () => {
			expect(wrapper).toMatchSnapshot();
			wrapper.instance().didNavigate(1);
			expect(wrapper).toMatchSnapshot();
		});

		it('should set completed', () => {
			wrapper.instance().didNavigate(2);
			expect(wrapper).toMatchSnapshot();
			wrapper.instance().didNavigate(SAMPLE_SLIDES.length - 1);
			expect(wrapper).toMatchSnapshot();
			wrapper.instance().didNavigate(2);
			expect(wrapper).toMatchSnapshot();
		});

		it('allows navigation with ad slide buttons', () => {
			wrapper.setProps({
				adsEnabled: true
			});
			wrapper.setState({
				currentSlideIndex: 3
			});
			wrapper.find(AdSlide).at(0).simulate('leftClick');
			expect(wrapper.instance().deck.slide).toHaveBeenCalled();
			wrapper.find(AdSlide).at(0).simulate('rightClick');
			expect(wrapper.instance().deck.slide).toHaveBeenCalled();
		});
	});

	describe('Ads', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = shallow(stubElement({
				adsEnabled: true,
				adsFrequency: 2,
				adDelay: 1000
			}));
		});

		it('should insert ad slides and display them', () => {
			expect(wrapper).toMatchSnapshot();
		});

		it('hitting an ad should disable the buttons for a second', () => {
			const timeout = window.setTimeout;
			window.setTimeout = jest.fn();
			wrapper.instance().didNavigate(2);
			expect(window.setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
			expect(wrapper).toMatchSnapshot();
			window.setTimeout = timeout;
		});

		it('fires onUpcomingAd event', () => {
			const handler = jest.fn();
			wrapper = shallow(stubElement({
				adsEnabled: true,
				adsFrequency: 2,
				onUpcomingAd: handler
			}));
			wrapper.instance().didNavigate(2);
			expect(handler).toHaveBeenCalledWith(expect.any(Number));
		});

		it('does not fire after just mounting', () => {
			const handler = jest.fn();
			wrapper = mount(stubElement({
				adsEnabled: true,
				adsFrequency: 2,
				onUpcomingAd: handler
			}));
			expect(handler).not.toHaveBeenCalled();
		});

		it('doesn\'t fire event if the ad has been seen', () => {
			const handler = jest.fn();
			wrapper = shallow(stubElement({
				adsEnabled: true,
				adsFrequency: 2,
				onUpcomingAd: handler
			}));
			wrapper.instance().slidesWithAds[2].seen = true;
			wrapper.instance().didNavigate(1);
			expect(handler).not.toHaveBeenCalled();
		});

		it('shows correct index with ads', () => {
			wrapper.setState({ currentSlideIndex: 2 });
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Fullscreen mode', () => {
		let wrapper;
		let handler;
		let handleFullscreenToggle;

		beforeEach(() => {
			handler = jest.fn();
			handleFullscreenToggle = jest.fn();
			wrapper = shallow(stubElement({
				desktop: true,
				onFullscreenToggle: handleFullscreenToggle,
				onNavigate: handler,
				onForwardClick: handler,
				onBackClick: handler
			}));
			wrapper.instance().deck = {
				swipe: {
					setup: noop
				},
				slide: handler
			};

			wrapper.find(SlideshowIndexFullscreen).simulate('click');
		});

		it('should toggle between minimized and fullscreen mode', () => {
			expect(wrapper).toMatchSnapshot();
		});

		it('should fire onFullScreenToggle event', () => {
			expect(handleFullscreenToggle).toHaveBeenCalledTimes(1);
		});

		it('should fire onNavigate events', () => {
			wrapper.instance().didNavigate(1);

			expect(handler).toHaveBeenCalledWith(SAMPLE_SLIDES[1], 1);
		});

		it('should navigate to the right', () => {
			wrapper.find(SlideshowNavigateRight).simulate('click');

			expect(handler).toHaveBeenCalledWith(1);
			expect(wrapper).toMatchSnapshot();
		});

		it('should navigate to the left', () => {
			wrapper.setState({ currentSlideIndex: 2 });
			wrapper.find(SlideshowNavigateLeft).simulate('click');

			expect(handler).toHaveBeenCalledWith(1);
			expect(wrapper).toMatchSnapshot();
		});

		it('should wrap around to the right', () => {
			wrapper.setState({
				currentSlideIndex: SAMPLE_SLIDES.length - 1
			});
			wrapper.find(SlideshowNavigateRight).simulate('click');

			expect(handler).toHaveBeenCalledWith(0);
		});

		it('should wrap around to the left if completed', () => {
			wrapper.find(SlideshowNavigateLeft).simulate('click');
			expect(handler).not.toHaveBeenCalled();

			wrapper.setState({ completed: true });
			wrapper.find(SlideshowNavigateLeft).simulate('click');
			expect(handler).toHaveBeenCalledWith(SAMPLE_SLIDES.length - 1);
		});

		it('should fire onForwardClick events', () => {
			wrapper.setState({ currentSlideIndex: 0, navDirection: 1 });
			wrapper.instance().didNavigate(1);

			expect(handler).toHaveBeenCalledWith(SAMPLE_SLIDES[0], SAMPLE_SLIDES[1], 1, true);
		});

		it('should fire onBackClick events', () => {
			wrapper.setState({ currentSlideIndex: 1, navDirection: -1 });
			wrapper.instance().didNavigate(0);

			expect(handler).toHaveBeenCalledWith(SAMPLE_SLIDES[1], SAMPLE_SLIDES[0], 0, true);
		});

		it('should display ad slides', () => {
			wrapper.setState({ currentSlideIndex: 1 });
			wrapper.find(SlideshowNavigateRight).simulate('click');

			expect(handler).toHaveBeenCalledWith(2);
		});

		it('should preload images', () => {
			expect(wrapper).toMatchSnapshot();
			wrapper.instance().didNavigate(1);
			expect(wrapper).toMatchSnapshot();
		});

		it('should hide pagination info when tapping on the image', () => {
			expect(wrapper).toMatchSnapshot();
			wrapper.find(SlideshowSwipeArea).simulate('click');
			expect(wrapper).toMatchSnapshot();
		});

		it('should open Facebook share window', () => {
			wrapper.find({ onClick: wrapper.instance().shareOnFacebook }).simulate('click');

			expect(window.open).toHaveBeenCalledWith(
				wrapper.instance().props.facebookShareUrl,
				'shareFacebook',
				`toolbar=0,status=0,width=${Slideshow.shareWindowWidth},height=${Slideshow.shareWindowHeight}`
			);
		});

		it('should open Twitter share window', () => {
			wrapper.find({ onClick: wrapper.instance().shareOnTwitter }).simulate('click');

			expect(window.open).toHaveBeenCalledWith(
				wrapper.instance().props.twitterShareUrl,
				'shareTwitter',
				`toolbar=0,status=0,width=${Slideshow.shareWindowWidth},height=${Slideshow.shareWindowHeight}`
			);
		});

		describe('on mobile', () => {
			beforeEach(() => {
				wrapper = shallow(stubElement({
					adsEnabled: true,
					adsFrequency: 2,
					adDelay: 1000,
					desktop: false,
					onFullscreenAdLoad: handler,
					onNavigate: handler
				}));
				wrapper.instance().deck = {
					swipe: {
						setup: noop
					},
					slide: handler
				};

				wrapper.find(SlideshowIndexFullscreen).simulate('click');
			});

			it('should\'t fire fullscreen ad load callback', () => {
				expect(handler).not.toHaveBeenCalled();
			});

			it('should display ad slides', () => {
				wrapper.setState({ currentSlideIndex: 1 });
				wrapper.find(SlideshowNavigateRight).simulate('click');

				expect(handler).toHaveBeenCalledWith(2);
			});
		});

		describe('with ads', () => {
			window.open = jest.fn();

			beforeEach(() => {
				wrapper = shallow(stubElement({
					adsEnabled: true,
					onFullscreenAdLoad: handler,
					facebookShareUrl: 'url',
					twitterShareUrl: 'url'
				}));
				wrapper.instance().deck = {
					swipe: {
						setup: noop
					},
					slide: handler
				};
				wrapper.find(SlideshowIndexFullscreen).simulate('click');
			});

			it('should display an ad in the sidebar', () => {
				expect(wrapper).toMatchSnapshot();
			});

			it('should skip ad slides when navigating right', () => {
				wrapper.setState({ currentSlideIndex: 1 });
				wrapper.find(SlideshowNavigateRight).simulate('click');

				expect(handler).toHaveBeenCalledWith(3);
			});

			it('should skip ad slides when navigating left', () => {
				wrapper.setState({ currentSlideIndex: 3 });
				wrapper.find(SlideshowNavigateLeft).simulate('click');

				expect(handler).toHaveBeenCalledWith(1);
			});

			it('should fire onFullscreenAdLoad event', () => {
				expect(handler).toHaveBeenCalled();
			});
		});
	});
});
