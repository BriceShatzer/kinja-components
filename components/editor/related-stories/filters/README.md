# Custom Filters

Button like filter tags and story types. The `FilterType` is a presentational one based on on `Tag`s and `StoryType`s.

<!-- STORY -->

## Tag Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|items | `Array<Tag>` | ✓ | x | tags to display
|onSelect | `(value: string) => void` | x | x | callback to react on when a tags is being selected

## StoryType Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|items | `Array<StoryType>` | ✓ | x | storytypes to display
|onSelect | `(value: string) => void` | x | x | callback to react on when a storytype is being selected

## Filter Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|items | `Array<FilterType>` | ✓ | x | filters to display
|onRemoveItem | `(itemId: string) => void` | x | x | callback to react on when a storytype is being removed
