# Tooltip ![ready](status-images/ready.svg) ![new](status-images/new.svg)

`Tooltip` is a bare-bones component for displaying contextual information. Hovering over any children you wrap in your Tooltip will trigger it. Currently, the tooltip will always be positioned at the top of your trigger content offset by the amount set in the `offset` prop (if provided).
It requres an `elementRef` property that points to the hovered element to be able to calculate it's position.



<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| content | `string / React.Element<*>` | ✓ | | Content that displays inside the tooltip. Without it, the component simply returns the children.
| width | `number` | | | Optional width for the tooltip in pixels.
| maxWidth | `number` | | | Optional max-width for the tooltip in pixels.
| topOffset | `number` | ✓ | | Offsets the tooltip position by this pixel amount.
| leftOffset | `number` |  | | Offsets the tooltip position by this pixel amount.
| elementRef | `?HTMLElement` | ✓ | | Required refernce to the hovered element.

## Tooltip Wrapper

This wrapper allows you to wrap any number of components in it and pass the `toggleTooltip` render prop
to any of them that need a tooltip to be shown. This pattern allows for different behaviors to be implemeneted in the future,
but for now it's just toggleing on hover.

```
  type Props = {
    children: *
  };

  type State = {
    showTooltip: boolean,
    toolTipContent: string,
    tooltipRef?: HTMLElement,
    topOffset: number
  }
```

In order for the `toggleTooltip` to work you need to set data attributes and event handler functions on the component inside the wrapper that needs the tooltip, i.e.:

```
  data-shouldshowtooltip={this.state.hasTooltip}
  data-tooltipname={name}
  data-tooltipoffset={5}
  onMouseEnter={toggleTooltip}
  onMouseLeave={toggleTooltip}
```
