# Related Stories Module 

This module adds manually selectable and automatically generated lists of posts in the editor based on either story types & tags or manual url pasting.

<!-- STORY -->

## Related Stories Controller Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|stories | `Array<Post>` | x | x | stories to display
|tags | `Array<Tag>` | x | x | selected tags to display
|storyTypes | `Array<StoryType>` | x | x | selected StoryTypes to display
|headline | `string` | x | x | headline for the module
|view | `string` | x | x | `manual` or `search` view
|maxRows | `number` | x | x | maximum number of rows to be rendered in the grid
|minRows | `number` | ✓ | 1 | minimum number of rows to be rendered in the grid
|itemsPerRow | `number` | ✓ | 3 | maximum number of stories to be rendered in a grid row
|externalAPI | `ExternalAPI` | ✓ | x | external functions to be called for data retrieval

## Related Stories Renderer Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|stories | `Array<Post>` | x | x | stories to display
|tags | `Array<Tag>` | x | x | selected tags to display
|storyTypes | `Array<StoryType>` | x | x | selected StoryTypes to display
|filters | `Array<FilterType>` | x | x | selected filters to display
|headline | `string` | x | x | headline for the module
|defaultTabIndex | `number` | x | x | `1` or `0` based on the view
|view | `string` | x | x | `manual` or `search` view
|isStatic | `boolean` | ✓ | `true` | if `true` the renderer will omit editing functions
|maxRows | `number` | ✓ | 3 | maximum number of rows to be rendered in the grid
|minRows | `number` | ✓ | 1 | minimum number of rows to be rendered in the grid
|itemsPerRow | `number` | ✓ | 3 | maximum number of stories to be rendered in a grid row
|isEmptySearchField | `boolean` | x | x | an option for the controller to clear the search field
|hideFilters | `boolean` | x | x | an option for the controller to hide the selected filters (tags etc.)
|onTabChange | `(index: number) => void` | x | x | callback for the controller to react on tab changes
|onSearch | `(term: string) => void` | x | x | callback for the controller to react on search field changes
|onManualHeadlineEdit | `(value: string) => void` | x | x | callback for the controller to react on headline changes
|onStorySelect | `(itemId: string) => void` | x | x | creates filters based on the selected story types
|onTagSelect | `(itemId: string) => void` | x | x | creates filters based on the selected tags
|onRemoveFilter | `(itemId: string) => void` | x | x | removes a filter from the filter list
|onRemoveStory | `(key: string) => void` | x | x | callback for the controller to remove a story from the story list
|onEditStory | `(key: string) => void` | x | x | callback for the controller to set the edit state for a story
|onSetItemsOnPaste | `(url: string, key: string) => void` | x | x | callback for the controller to react on a manual edit
|onAddStoryRow | `() => void` | x | x | callback for the controller to react on a manual addition of a row to the grid
|onRemoveStoryRow | `(index: number) => void` | x | x | callback for the controller to react on a manual removal of a row from the grid
|onStoryRowsRendered | `(storyRows: Array<Array<Post \| FauxPost>>)` | x | x | callback for the controller to react on finishing rendering a specific set of stories
|onUpdateStorySuggestions | `(filters: Array<*>)` | x | x | callback for the controller to react on filter changes
|onSetCardSwapState | `(draggedItemIndex: number, droppedItemIndex: number) => void` | x | x | callback for the controller to react on drag and drop events
