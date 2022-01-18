# SaveBadge ![ready](status-images/ready.svg) ![new](status-images/new.svg)

[Storybook demo](http://localhost:8001/?selectedKind=3.%20Elements%7CPost%20Elements%2FBadge)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| saveCount | `number` |  |  | Intelligent count to display (999, 1K, 100K, 1M)
| iconOnly | `boolean` |  | `false` | Display the icon only
| isSaved | `boolean` |  | `false` | Display filled icon
| label | `string` |  |  | Display a label (overrides display of count)
| onClick | `function` |  |  | On click function

## Example

```jsx
<SaveBadge
  saveCount={number('saveCount', 1000000)}
  iconOnly={boolean('iconOnly', false)}
  isSaved={boolean('isSaved', false)}
  label={text('label', '')}
/>
```

The above will render:

```html
<div class="save-badge__Container-s29fik-0 cUdldo">
  <svg name="bookmark" class="icon__IconSVG-sc-1rlybe8-0 fRnxYa">
    <use xlink:href="#iconset-bookmark"></use>
  </svg>
  <div class="save-badge__Label-s29fik-1 jbaoYJ">1M</div>
</div>
```
