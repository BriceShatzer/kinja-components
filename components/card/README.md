# Card ![under-review](status-images/under-review.svg)

A `<Card />` component uses its `children` as a render prop, which provides sub-components for use as a convenience, like `<StoryCard />`. It is meant to act as a simple state machine (such as to defer loading; max ajax requests; etc). `<StoryCard />` can be used without `<Card />`.

[Storybook Demo](http://localhost:8001/?selectedKind=Card)

<!-- STORY -->

## Props

### children

Type: _Function_

`this.props.children` is used as a callback function to render the following props:
  - `StoryCard` (optional, defaults to `story-card.js`)
  - `isCondensed`
  - `isEditing`
  - `isLoading`
  - `onInput`
  - `onBlur`

#### StoryCard

Type: _Component_

See `StoryCard` section below.

#### isCondensed

Type: _Boolean_

Display in condensed mode. _(accompanying CSS is required. see `story.sass`)_

#### isEditing

Type: _Boolean_
#### isLoading

Type: _Boolean_

#### onInput

Type: _Function_

#### onBlur

Type: _Function_


# StoryCard

## Props

### model

Type: _Object_

A Post object which should at least contain:

```
{
  author: {}
  blogGroup: ''
  defaultBlogId: 0
  facebookImage: ''
  headline: ''
  id: 0
  images: []
  plaintext: ''
  securePermalink: ''
  storyType: {}
}
```

### children

Type: _Function_

`this.props.children` is used as a callback function to render the following props:

#### Author
##### Props

###### withPermalink

Type: _Boolean_

Renders a single `Author`.


#### Authors
##### Props

###### withPermalink

Type: _Boolean_

Renders a comma delimited list of `Author` elements


#### Excerpt
##### Props

###### truncateAt

Type: _Number_

Default: _0_

###### onInput

Type: _Function_

Callback when `onInput` event is fired.

###### onBlur

Type: _Function_

Callback when `onBlur` event is fired.


#### Headline
##### Props

###### withPermalink

Type: _Boolean_

###### onInput

Type: _Function_

Callback when `onInput` event is fired.

###### onBlur

Type: _Function_

Callback when `onBlur` event is fired.

#### Image
##### Props

###### attributionData

Type: _Object_

###### noAnimate

Type: _Boolean_

###### withAttribution

Type: _Boolean_

###### withBranding

Type: _Boolean_

###### withPermalink

Type: _Boolean_


#### LabelWhen
##### Props

###### label
Type: _String_

###### when
Type: _Function_


#### ReadMore
##### Props

###### title

Type: _String_

Default: _"Continue reading"_

###### href

Type: _String_


#### StoryType
##### Props

###### withPermalink

Type: _Boolean_

Should be linked to `href`
