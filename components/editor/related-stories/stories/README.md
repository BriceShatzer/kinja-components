# Stories

Story items and list components

<!-- STORY -->

## Editable Story Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|className | `string` | x | x | class names to pass down for style purposes
|itemIndex | `string` | x | x | positional index in the grid
|isInvalid | `boolean` | x | x | indicates if the entered url is not valid
|errorMessage | `string` | x | x | custom error message
|post | `FauxPost` | x | x | stripped down version of `Post` type
|setItemsOnPaste | `(url: string, itemIndex: string) => void` | x | x | callback to react on url paste

## Story Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|className | `string` | x | x | class names to pass down for style purposes
|post | `Post \| FauxPost` | ✓ | x | placeholder post data or real post data
|imageSize | `string` | x | `KinjaCenteredLargeAuto` | image size in the post
|view | `string` | x | x | `manual` or `search` view
|withControls | `boolean` | x | x | render the item with delete and edit controls
|dragEvents | `any` | x | x | set of callbacks and other props to pass down if the item is drag and drop enabled
|onSetCardSwapState | `(draggedItemIndex: number, droppedItemIndex: number) => void` | x | x | callback for the controller to react on drag and drop events
|removeItem | `(value: string) => void` | x | x | callback to react on post removal
|editItem | `(value: string) => void` | x | x | callback to set the post to be replaced by an editable item

## Story Row Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|post | `Post \| FauxPost` | ✓ | x | placeholder post data or real post data
|currentCount | `number` | ✓ | x | the number of rows rendered in the current grid
|view | `string` | x | x | `manual` or `search` view
|removeItem | `(value: string) => void` | x | x | callback to react on post removal
|editItem | `(value: string) => void` | x | x | callback to set the post to be replaced by an editable item
|setItemsOnPaste | `(url: string, itemIndex: string) => void` | x | x | callback to react on url paste
|withControls | `boolean` | x | x | render the items with delete and edit controls
|maxRows | `number` | ✓ | x | maximum number of rows to be rendered in the grid

## Story Row Control Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|currentCount | `number` | ✓ | x | the number of rows rendered in the current grid
|index | `number` | ✓ | x | the index of the actual row the controls are attached to
|maxRows | `number` | ✓ | x | maximum number of rows to be rendered in the grid
|addRow | `( => void` | x | x | callback to add a row
|deleteRow | `(index: number) => void` | x | x | callback to remove a row

## Story List Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|stories | `Array<Array<Post \| FauxPost>>` | ✓ | x | placeholder posts or real posts
|view | `string` | ✓ | `search` | `manual` or `search` view
|maxRows | `number` | ✓ | 3 | maximum number of rows to be rendered in the grid
|minRows | `number` | ✓ | 1 | minimum number of rows to be rendered in the grid
|itemsPerRow | `number` | ✓ | 3 | maximum number of stories to be rendered in a grid row
|withControls | `boolean` | x | `true` | render the items with delete and edit controls
|setItemsOnPaste | `(url: string, itemIndex: string) => void` | x | x | callback to react on url paste
|onRemoveStory | `(key: string) => void` | x | x | callback for the controller to remove a story from the story list
|onEditStory | `(key: string) => void` | x | x | callback for the controller to set the edit state for a story
|onSetCardSwapState | `(draggedItemIndex: number, droppedItemIndex: number) => void` | x | x | callback for the controller to react on drag and drop events
|onAddStoryRow | `() => void` | x | x | callback for the controller to react on a manual addition of a row to the grid
|onRemoveStoryRow | `(index: number) => void` | x | x | callback for the controller to react on a manual removal of a row from the grid
