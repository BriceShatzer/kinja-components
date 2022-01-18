# ImageAttributionEditor ![ready](status-images/ready.svg)

ImageAttributionEditor description.

A component for adding attributions and captions to an image within the editor.

A `<ImageAttribution />` component uses the `<StoryCard />`component to render an image, caption, and attribution.
The `<AttributionForm />` child component can add and remove attribution rows and adjusts the parent state which will populate the `<StoryCard />`.

<!-- STORY -->

## Props

### parentContainer

Type: _Element_

### image

Type: _Element_

### attribution

Type: _Array_

```
[{
    label: String,
    credit: TextNode,
    source: TextNode
}]
```

### caption

Type: _String_

Html formatted string

### syndicationRights

Type: _Boolean_

### onComplete

Type: _Function_

[Storybook Demo](http://localhost:8001/?selectedKind=ImageAttribution)

<!-- STORY -->
