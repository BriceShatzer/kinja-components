# Image cropper ![ready](status-images/ready.svg)

Component for defining an area where the image should be cropped.
You can set to confine the selection to a fixed aspect ratio, or use a custom selection.
Displays the dimensions of the selected area, as well as a warning message when the image is too small, and it wouldn't look nice when using it on shares.
We use a third party component for the cropping behavior itself. [GitHub](https://github.com/DominicTobias/react-image-crop)

<!-- STORY -->

## Props

### src

Type: string

Url of the image you want to use. Required.

### language

Type: string

For localization purposes. Can be `en` or `es`, same as for the Localized component.

### widthWarningThreshold

Type: number | _Optional_

Crops with pixel widths smaller than this number will display a warning. If not specified, no warnings will be given.

### heightWarningThreshold

Type: number | _Optional_

Crops with pixel heights smaller than this number will display a warning. If not specified, no warnings will be given.

### minWidth

Type: number | _Optional_

Minimum crop width in pixels (won't let you go below that)

### minHeight

Type: number | _Optional_

Minimum crop height in pixels (won't let you go below that)

### aspectRatios | _Optional_

Type: { [string]: number }

An object containing various allowed aspect ratios. By default the only one is 16:9. A custom option will always be available.
Sample object:
```javascript
{ '3:2': 3 / 2 }
```

### onChange

Type: Function | _Optional_

Called on every change event, meaning it's called quite often while the user is dragging

### onComplete

Type: Function | _Optional_

Called when a mutation (drag, resize) has ended. Better than onChange when you only care about the end results.

### onImageLoad

Type: Function | _Optional_

Called after the image we are cropping is loaded, with initial crop parameters. Use this to set up initial state.

### onAspectChange

Type: Function | _Optional_

Called when the user switches between 16:9 and custom aspect ratios.
