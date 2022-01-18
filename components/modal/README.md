# Modal ![ready](status-images/ready.svg)

The basic Modal component renders react children and stops click and drag event propagation to its parent.

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| children | `React.Node` | | | Children
| onClose | `() => void` | | | Close handler
| isOpen | `boolean` | | `false` | Start opened?
| fullscreen | `boolean` | | `false` | Cover the whole viewport?
| regular | `boolean` | | `false` | Sets the modal width to 50% and height to 75%
| contentPadding | `boolean` | | `false` | Unsets the modal height and sets it's padding (top and bottom) to 100px. Can be combined with `regular` prop which will result in `padding: 100px 0` and `width: 50%`
| blur | `boolean` | | `false` | Add a dark semi-transparent background?
| transparent | `boolean` | | `false` | Add light transparency?
| scrollable | `boolean` |  | `false` | Is the content scrollable? (Only works when `fullscreen` is also enabled)
