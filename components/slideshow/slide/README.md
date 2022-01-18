# Slide ![ready](status-images/ready.svg)

One slide in a slideshow, showing an image and its caption.

<!-- STORY -->

## Props

### image

Type: _{ url: string, smallUrl: string, caption: string }_

The representation of the image. `url` is for the normal image, `smallUrl` is the url for mobile devices.

### aspectRatio

Type: _'Photo' (default) | 'Wide'_

Photo means a 3:2, Wide means a 16:9 aspect ratio. Currently these are the only supported ones. Note that this is not the aspect ratio of the image, but rather the aspect ratio of the slide itself that contains the image.

### load

Type: _boolean_ | _Optional_

The default for this is true. The reason you might want to set it to false is because images that are in the DOM will be loaded, so this is the mechanism to control lazy loading.

### load

Type: _() => void_ | _Optional_

Fired after the image inside the slide is loaded
