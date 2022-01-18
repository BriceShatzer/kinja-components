# CommentBadge ![ready](status-images/ready.svg) ![new](status-images/new.svg)

[Demo](http://localhost:8001/?selectedKind=3.%20Elements%7CPost%20Elements%2FBadge)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| count | `number` |  |  | Intelligent count to display (999, 1K, 100K, 1M)
| iconOnly | `boolean` |  | `false` | Display the icon only
| label | `string` |  |  | Display a label (overrides display of count)
| space | `string` | | `4px` | Space label or count away from icon with unit of choice

## Example

```jsx
<CommentBadge
  count={number('count', 1000000)}
  iconOnly={boolean('iconOnly', false)}
  label={text('label', '')}
  space={text('space', '2px')}
/>
```

The above will render:

```html
<div class="comment-badge__Container-c7uluq-0 kLFKpj">
  <svg name="bubble" fill="true" class="icon__IconSVG-sc-1rlybe8-0 bZEcaB">
    <use xlink:href="#iconset-bubble"></use>
  </svg>
  <div class="comment-badge__Spacer-c7uluq-2 cPiVnd"></div>
  <div class="comment-badge__Label-c7uluq-1 hHUMMt">1M</div>
</div>
```
