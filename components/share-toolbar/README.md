# ShareToolbar

The Share Toolbar is a simple component that uses render callbacks to build a horizontal or vertical social share toolbar.

[Storybook demo](http://localhost:8001/?selectedKind=ShareToolbar)

<!-- STORY -->

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
| isVertical | `boolean` |  | | Distribute toolbar vertically
| children | `Function` | ✓ |  | Callable render callback

## Example

```jsx
<ShareToolbar isVertical={...}>
    {({ ToolbarItem, ToolbarButton, ToolbarDrawer }) => {
      return (
        <React.Fragment>
          <ToolbarItem href='https://facebook.com'>
            <ToolbarButton>
              <Icon opacity='complete' fill color='primary' name='facebook' />
            </ToolbarButton>
          </ToolbarItem>
      );
    }}
  </ShareToolbar>
```
