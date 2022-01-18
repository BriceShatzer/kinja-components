# Permalink Image Node ![under-review](status-images/under-review.svg)

Renders a single image for the permalink page with permalink image transforms from [`kinja-images/transforms/permalink`](../../../../kinja-images/transforms/permalink.js) caption and attribution, for the web renderer.

<!-- STORY -->

## Props from the [ImageNode](../../../../postbody/blockNodes/ImageNode.js)

Spread the node on the component to use as is.

```jsx
const image = new ImageNode({...})
<ImageNodeComponent {...image} />
```

### id

type: _string_

Cloudinary resource id

### format

Type: _ImageFormat_

### width

Type: _number_

### height

Type: _number_

### alignment

Type: _MediaAlignment_ | _Optional_ | Default: 'Center'

### lightbox

Type: _boolean_ | _Optional_ | Default: true

When false the image can't be shown as a lightbox.

### caption

Type: _Array<InlineNode>_ | _Optional_

### attribution

Type: _ImageAttribution_ | Optional

A list of labels that tell who owns rights of the image (like photographer, agency, etc.)

### syndicationRights

Type: _boolean_ | Optional | Default: false

Tells whether the author (or business entity) who uses the image has rights to syndicate (publish) it.

### altText

Type: _string_ | Optional

Alternative text for the image. (unused)

## Props

Additional diplay props to control image behavior.

```jsx
const image = new ImageNode({...})
<ImageNodeComponent {...image} hideImagePadding showCaption={false} />
```

### lazyload

Type: _boolean_ | _Optional_ | Default: undefined

Whether image should load as an inline placeholder and then be lazyloaded

### autoFormat

Type: _boolean_ | _Optional_ | Default: undefined

Check to use when we want an image URL that could be animated.

### allowAttribution

Type: _boolean_ | _Optional_ | Default: true

Render image attribution if true.

### hideImagePadding

Type: _boolean_ | _Optional_ | Default: false

Hide bottom padding used to have a placeholder before the image loads.

### canShowUltraLarge

Type: _boolean_ | _Optional_ | Default: false
Show ultra-large image at large breakpoints if the image is bleed aligned.

### showCaption

Type: _boolean_ | _Optional_ | Default: true

Render caption if true.
