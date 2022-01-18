# Slideshow ![ready](status-images/ready.svg)

A slideshow to show a collection of images and captions. It is a block node in mantle.
For swiping and moving the slides it uses a 3rd party library called [react-swipe](https://github.com/voronianski/react-swipe).

<!-- STORY -->

## Props

### slides

Type: _Array<{ type: 'image', url: string, caption: string }>_

The slides in the slideshow. Note that caption will be an array of inline nodes later.

### aspectRatio

Type: _string_

The aspect ratio of the slideshow. Possible values are `16:9` and `3:2`.

### preloadAmount

Type: _number_ | _Optional_

How many images to preload in advance? If you specify 2, the images will start loading when you reach the slide 2 slides behind them.

### onNavigate

Type: _(Slide, index: number) => void_ | _Optional_

Will trigger on every navigation, with the slide data and the index of the new slide

### onForwardClick

Type: _(currentSlide: Slide, upcomingSlide: Slide, index: number) => void_ | _Optional_

Will trigger when the user clicks on the forward button, where the index is the index of the slide where the user is going to, discounting ads

### onBackClick

Type: _(currentSlide: Slide, upcomingSlide: Slide, index: number) => void_ | _Optional_

Will trigger when the user clicks on the back button, where the index is the index of the slide where the user is going to, discounting ads

### adsEnabled

Type: _boolean_

Whether to show ads in between slides

### adFrequency

Type: _number_ | _Optional_

How often should ads appear. A value of 3 means that an ad will appear after every 3 slides

### adDelay

Type: _number_ | _Optional_

How much time should buttons be disabled for when the user reaches an ad slide, in milliseconds

### onUpcomingAd

Type: _number => void_ | _Optional_

This event fires when an ad slide is coming up, so you can initialize the ad zone inside it.

### onFirstSlideLoaded

Type: () => void_ | _Optional_

Fired after the image inside the first slide is loaded and displayed.

### language

Type: _string_ | _Optional_

Language of the slideshow to enable UI translations.

### desktop

Type: _boolean_

Prop that decides whether or not ad slides should appear in fullscreen mode. On desktop fullscreen mode, we don't show ad slides as there's only a single ad in the sidebar. In mobile fullscreen mode, ad slides appear just as in non-fullscreen mode.

### headline

Type: _string_

Headline of the post that contains the slideshow (it appears in the sidebar displayed in fullscreen mode).

### facebookShareUrl

Type: _string_

Facebook full share button URL.

### twitterShareUrl

Type: _string_

Twitter full share button URL.

### onFullscreenAdLoad

Type: _() => void_

Callback fired before entering fullscreen mode and displaying sidebar ad.

### onFullscreenToggle

Type: _(Slidetype, currentSlideNumber: number, toggledFrom: boolean) => void_

Callback fired after toggling fullscreen mode on or off. Third argument contains the state which we transitioned from (`true`: fullscreen, `false`: non-fullscreen).

### hideImageAttribution

Type: _boolean_ | _Optional_

Option to hide image attributions.
