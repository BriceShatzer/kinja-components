# AdSlide ![ready](status-images/ready.svg)

Slide for slideshow that contains an ad container. Note that this component only provides an area where the ad can be rendered into, doesn't handle the ad initialization itself, you need to take care of that yourself. Currently the ad will be 300x250.
On mobile devices it will have buttons for advancing the slide, since you can't swipe over the iframe and on smaller devices there is no room where you can swipe.

<!-- STORY -->

## Props

### aspectRatio

Type: _'Photo' (default) | 'Wide'_

Photo means a 3:2, Wide means a 16:9 aspect ratio. Currently these are the only supported ones.

### disabled

Type: _boolean_ | _Optional_

Whether the buttons on mobile should be disabled

### onLeftClick

Type: _() => void_ | _Optional_

Event fired when the user clicks the left button on mobile

### onRightClick

Type: _() => void_ | _Optional_

Event fired when the user clicks the right button on mobile
