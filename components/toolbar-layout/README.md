# Layout Toolbar ![ready](status-images/ready.svg)

`Layout Toolbar` component takes `ToolbarIcon` components and builds a layout menu row depending on the amount of items passed.

[Storybook Demo](http://localhost:8001/?selectedKind=ToolbarModular)

<!-- STORY -->

## Props

### title

Type: string

The title is used as a unique identifier as well as the text shown under the icon

### active

Type: Boolean
Default: _false_

Expands or collapses the sub-menu

### icon

Type: string

Name of the icon that should be shown on the parent icon

### onClick

type: function

Will be triggered on click if the element is not disabled

### children

Type: Array

Array of objects that define child items, shown in the sub-menu
