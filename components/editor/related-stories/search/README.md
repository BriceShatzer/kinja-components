# Search Field

Custom search input with icon.

<!-- STORY -->

## Search Field Props
| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|icon | `React.Element<typeof Icon>` | ✓ | `<IconElem name='search' size='normal' />` | custom icon to indicate search
|typeahead | `boolean` | ✓ | `true` | sets the search bar to render without a search button and typeahead mode
|placeholder | `string` | ✓ | `Choose story types or tags` | placeholder to indicate the search
|onSearch | `(value: string) => void` | ✓ | `() => {}` | callback to react on input changes
